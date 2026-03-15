import path from "node:path";

import { colorize, emphasize, mute, styleText } from "./format.js";
import { getHost, listHosts } from "./hosts.js";
import { installSkills, printInstallSummary } from "./install.js";
import { promptForHost, promptForMode, promptForProjectPath, promptForSkillIds } from "./prompts.js";
import { findSkills, SKILL_RECOMMENDATIONS, SKILLS, SOURCE_REPOSITORY } from "./skills.js";

function printHelp() {
  console.log(`SPFx Enterprise Skills installer

Usage:
  npx spfx-enterprise-skills-installer install [options]
  npx spfx-enterprise-skills-installer --list-skills
  npx spfx-enterprise-skills-installer --list-hosts

Options:
  --host <id>           Target host id
  --mode <project|global>
  --project-path <path> Project root for project installs
  --global-path <path>  Override the default global install root
  --skills <ids>        Comma-separated skill ids or "all"
  --source-root <path>  Read skills from a local folder instead of GitHub
  --source-ref <ref>    Git ref or commit to download from
  --force               Overwrite conflicting skill files
  --dry-run             Show what would happen without writing files
  --yes                 Accept defaults for omitted values when possible
  --list-skills         Print available skill ids
  --list-hosts          Print supported hosts and support levels
  --help                Show this help
`);
}

function printSkills() {
  const recommendationColors = {
    foundation: "green",
    specialized: "yellow",
    optional: "magenta"
  };
  const recommendationIcons = {
    foundation: "★",
    specialized: "◆",
    optional: "○"
  };

  console.log(emphasize("SPFx Enterprise Skills Catalog"));
  console.log("Choose a small starting set based on what your repo actually needs.\n");
  console.log("🚀 Recommended first install:");
  console.log("  - spfx-enterprise-ux-hub");
  console.log("  - plus 1-2 skills that match your project surface area\n");
  console.log("🎨 Color guide:");
  Object.entries(SKILL_RECOMMENDATIONS).forEach(([key, metadata]) => {
    const badge = colorize(`[${recommendationIcons[key]} ${metadata.label}]`, recommendationColors[key]);
    console.log(`  ${badge} ${metadata.description}`);
  });
  console.log("");

  ["foundation", "specialized", "optional"].forEach((recommendation) => {
    const metadata = SKILL_RECOMMENDATIONS[recommendation];
    const badge = colorize(
      `[${recommendationIcons[recommendation]} ${metadata.label}]`,
      recommendationColors[recommendation]
    );
    console.log(`${badge} ${metadata.description}`);
    console.log("");

    SKILLS
      .filter((skill) => skill.recommendation === recommendation)
      .forEach((skill) => {
        const skillColor = recommendationColors[skill.recommendation];
        const skillIcon = recommendationIcons[skill.recommendation];
        const heading = `${skillIcon} ${skill.id} (${skill.title})`;
        const label = (text) => colorize(text, skillColor);

        console.log(styleText(heading, { color: skillColor, bold: true }));
        console.log(`  ${label("◦ Category:")} ${skill.category}`);
        console.log(`  ${label("◦ What it covers:")} ${skill.description}`);
        console.log(`  ${label("◦ Install when:")} ${skill.whenToInstall}`);
        console.log(`  ${label("◦ Pairs well with:")} ${skill.goodWith.join(", ")}`);
        console.log("");
      });
  });

  console.log("⚡ Install examples:");
  console.log("  npx spfx-enterprise-skills-installer install --skills spfx-enterprise-ux-hub,spfx-enterprise-code-and-performance");
  console.log("  npx spfx-enterprise-skills-installer install --skills all");
}

function printHosts() {
  const supportColors = {
    full: "green",
    guided: "yellow"
  };

  const supportBadge = (support) => colorize(`[${support}]`, supportColors[support] || "cyan");

  console.log(emphasize("Supported Hosts"));
  console.log("Pick the host that matches where you want these skills to live.\n");

  listHosts().forEach((host) => {
    console.log(styleText(`${host.icon} ${host.id} (${host.label})`, { color: "cyan", bold: true }));
    console.log(`  ${colorize("◦ Description:", "cyan")} ${host.description}`);
    console.log(`  ${colorize("◦ Project support:", "cyan")} ${supportBadge(host.modes.project.support)}`);
    console.log(`  ${colorize("◦ Global support:", "cyan")} ${supportBadge(host.modes.global.support)}`);
    console.log("");
  });
}

function parseArgs(argv) {
  const parsed = {
    command: "install",
    flags: {}
  };

  const args = [...argv];
  if (args[0] && !args[0].startsWith("-")) {
    parsed.command = args.shift();
  }

  while (args.length > 0) {
    const token = args.shift();

    switch (token) {
      case "--host":
      case "--mode":
      case "--project-path":
      case "--global-path":
      case "--skills":
      case "--source-root":
      case "--source-ref":
        parsed.flags[token.slice(2)] = args.shift();
        break;
      case "--force":
      case "--dry-run":
      case "--yes":
      case "--list-skills":
      case "--list-hosts":
      case "--help":
        parsed.flags[token.slice(2)] = true;
        break;
      default:
        throw new Error(`Unknown argument: ${token}`);
    }
  }

  return parsed;
}

async function resolveInstallOptions(flags) {
  const hostId = flags.host || (flags.yes ? "generic" : await promptForHost());
  const host = getHost(hostId);

  const mode = flags.mode || (flags.yes ? "project" : await promptForMode());
  if (!["project", "global"].includes(mode)) {
    throw new Error(`Unsupported mode: ${mode}`);
  }

  const projectPath =
    mode === "project"
      ? path.resolve(flags["project-path"] || (flags.yes ? process.cwd() : await promptForProjectPath()))
      : undefined;

  const skillIds = flags.skills
    ? flags.skills.split(",").map((item) => item.trim()).filter(Boolean)
    : flags.yes
      ? ["spfx-enterprise-ux-hub"]
      : await promptForSkillIds();

  const skills = findSkills(skillIds);

  return {
    host,
    hostId,
    mode,
    projectPath,
    globalPath: flags["global-path"],
    sourceRoot: flags["source-root"] ? path.resolve(flags["source-root"]) : undefined,
    sourceRef: flags["source-ref"] || SOURCE_REPOSITORY.ref,
    skills,
    force: Boolean(flags.force),
    dryRun: Boolean(flags["dry-run"])
  };
}

export async function run(argv) {
  const parsed = parseArgs(argv);
  const { command, flags } = parsed;

  if (flags.help || command === "help") {
    printHelp();
    return;
  }

  if (flags["list-skills"]) {
    printSkills();
    return;
  }

  if (flags["list-hosts"]) {
    printHosts();
    return;
  }

  if (command !== "install") {
    throw new Error(`Unsupported command: ${command}`);
  }

  const options = await resolveInstallOptions(flags);
  const summary = await installSkills(options);

  printInstallSummary(summary);

  if (summary.results.conflicts.length > 0 && !options.force) {
    throw new Error("One or more target files already exist with different content. Re-run with --force to overwrite them.");
  }
}
