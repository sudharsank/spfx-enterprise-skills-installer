import fs from "node:fs/promises";
import path from "node:path";

import { resolveDestination } from "./hosts.js";
import { SOURCE_REPOSITORY } from "./skills.js";

function createSkillUrls(skill, sourceRef) {
  const ref = sourceRef || SOURCE_REPOSITORY.ref;

  return [
    `https://raw.githubusercontent.com/${SOURCE_REPOSITORY.owner}/${SOURCE_REPOSITORY.repo}/${ref}/${skill.repoPath}/SKILL.md`,
    `https://cdn.jsdelivr.net/gh/${SOURCE_REPOSITORY.owner}/${SOURCE_REPOSITORY.repo}@${ref}/${skill.repoPath}/SKILL.md`
  ];
}

async function ensureDirectory(directoryPath, dryRun) {
  if (dryRun) {
    return;
  }

  await fs.mkdir(directoryPath, { recursive: true });
}

async function readExistingFile(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

async function fetchSkillContent(skill, sourceRef) {
  const urls = createSkillUrls(skill, sourceRef);
  const failures = [];

  for (const url of urls) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          Accept: "text/plain",
          "User-Agent": "spfx-enterprise-skills-installer"
        }
      });

      if (!response.ok) {
        failures.push(`${url} (${response.status} ${response.statusText})`);
        continue;
      }

      return await response.text();
    } catch (error) {
      const reason =
        error?.name === "AbortError"
          ? "request timed out"
          : error?.cause?.message || error?.message || "unknown network error";
      failures.push(`${url} (${reason})`);
    } finally {
      clearTimeout(timeout);
    }
  }

  const hasCertificateFailure = failures.some((failure) =>
    failure.toLowerCase().includes("certificate")
  );

  throw new Error(
    [
      `Failed to download ${skill.id} from the configured source repository.`,
      "Tried:",
      ...failures.map((failure) => `- ${failure}`),
      "",
      hasCertificateFailure
        ? "Your environment appears to be intercepting TLS certificates. If you use a corporate proxy or custom CA, configure Node trust first (for example with `NODE_EXTRA_CA_CERTS`) or install from a local checkout with `--source-root <path>`."
        : "If you are behind a firewall or offline, re-run with `--source-root <path>` to install from a local checkout of the skills repository."
    ].join("\n")
  );
}

async function readSkillContentFromLocalRoot(skill, sourceRoot) {
  const sourcePath = path.resolve(sourceRoot, skill.repoPath, "SKILL.md");

  try {
    return await fs.readFile(sourcePath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`Could not find ${skill.id} at local source path ${sourcePath}`);
    }

    throw error;
  }
}

function buildInstructionDocument({ destination, installedSkills, sourceRef }) {
  const lines = [
    `# ${destination.host.label} install notes`,
    "",
    `Support level: **${destination.support}**`,
    `Install mode: **${destination.mode}**`,
    `Installed path: \`${destination.rootPath}\``,
    `Source repo ref: \`${sourceRef || SOURCE_REPOSITORY.ref}\``,
    "",
    "## Installed skills",
    ""
  ];

  installedSkills.forEach((skill) => {
    lines.push(`- \`${skill.id}\` - ${skill.description}`);
  });

  lines.push("", "## Next steps", "");

  destination.host.guidance[destination.mode].forEach((step, index) => {
    lines.push(`${index + 1}. ${step}`);
  });

  lines.push(
    "",
    "## Important note",
    "",
    "This installer deliberately distinguishes between fully automated installs and guided installs. If this host does not yet expose a stable public skill location, the files are staged safely and you can wire them in manually."
  );

  return `${lines.join("\n")}\n`;
}

export async function installSkills({
  hostId,
  mode,
  projectPath,
  globalPath,
  sourceRoot,
  sourceRef,
  skills,
  force = false,
  dryRun = false
}) {
  const destination = resolveDestination({
    hostId,
    mode,
    projectPath,
    globalPath
  });

  const results = {
    installed: [],
    skipped: [],
    conflicts: []
  };

  await ensureDirectory(destination.rootPath, dryRun);

  for (const skill of skills) {
    const skillDirectory = path.join(destination.rootPath, skill.id);
    const filePath = path.join(skillDirectory, "SKILL.md");
    const content = sourceRoot
      ? await readSkillContentFromLocalRoot(skill, sourceRoot)
      : await fetchSkillContent(skill, sourceRef);
    const existing = await readExistingFile(filePath);

    if (existing === content) {
      results.skipped.push({ skill, reason: "already up to date" });
      continue;
    }

    if (existing !== null && !force) {
      results.conflicts.push({ skill, filePath });
      continue;
    }

    if (!dryRun) {
      await ensureDirectory(skillDirectory, false);
      await fs.writeFile(filePath, content, "utf8");
    }

    results.installed.push({ skill, filePath });
  }

  const instructionDocument = buildInstructionDocument({
    destination,
    installedSkills: skills,
    sourceRef
  });

  if (!dryRun) {
    await fs.writeFile(destination.instructionsPath, instructionDocument, "utf8");
  }

  return {
    destination,
    results
  };
}

export function printInstallSummary(summary) {
  const { destination, results } = summary;

  console.log(`\nHost: ${destination.host.label}`);
  console.log(`Mode: ${destination.mode}`);
  console.log(`Support level: ${destination.support}`);
  console.log(`Destination: ${destination.rootPath}`);
  console.log(`Instructions: ${destination.instructionsPath}`);

  console.log("\nInstalled:");
  if (results.installed.length === 0) {
    console.log("  - none");
  } else {
    results.installed.forEach((entry) => {
      console.log(`  - ${entry.skill.id} -> ${entry.filePath}`);
    });
  }

  console.log("\nSkipped:");
  if (results.skipped.length === 0) {
    console.log("  - none");
  } else {
    results.skipped.forEach((entry) => {
      console.log(`  - ${entry.skill.id} (${entry.reason})`);
    });
  }

  console.log("\nConflicts:");
  if (results.conflicts.length === 0) {
    console.log("  - none");
  } else {
    results.conflicts.forEach((entry) => {
      console.log(`  - ${entry.skill.id} (${entry.filePath})`);
    });
  }
}
