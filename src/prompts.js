import readline from "node:readline/promises";
import path from "node:path";

import { listHosts } from "./hosts.js";
import { colorize, mute, styleText } from "./format.js";
import { SKILL_RECOMMENDATIONS, SKILLS } from "./skills.js";

function createPrompter() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

function requireInteractive(flagName) {
  if (!process.stdin.isTTY) {
    throw new Error(`Missing ${flagName}. Re-run with explicit flags in non-interactive mode.`);
  }
}

export async function promptForHost() {
  requireInteractive("--host");

  const hosts = listHosts();
  const rl = createPrompter();

  try {
    console.log("\nSelect the target host:");
    hosts.forEach((host, index) => {
      console.log(`  ${index + 1}. ${host.id} - ${host.label}`);
    });

    const answer = await rl.question("\nHost number or id: ");
    const trimmed = answer.trim();
    const numericIndex = Number.parseInt(trimmed, 10);

    if (Number.isInteger(numericIndex) && numericIndex >= 1 && numericIndex <= hosts.length) {
      return hosts[numericIndex - 1].id;
    }

    return trimmed;
  } finally {
    rl.close();
  }
}

export async function promptForMode() {
  requireInteractive("--mode");

  const rl = createPrompter();

  try {
    const answer = await rl.question("\nInstall mode (`project` or `global`) [project]: ");
    const trimmed = answer.trim().toLowerCase();
    return trimmed || "project";
  } finally {
    rl.close();
  }
}

export async function promptForProjectPath() {
  requireInteractive("--project-path");

  const rl = createPrompter();

  try {
    const answer = await rl.question(`\nProject path [${process.cwd()}]: `);
    return path.resolve(answer.trim() || process.cwd());
  } finally {
    rl.close();
  }
}

export async function promptForSkillIds() {
  requireInteractive("--skills");

  const rl = createPrompter();
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

  try {
    console.log("\nAvailable skills:");
    SKILLS.forEach((skill, index) => {
      const skillColor = recommendationColors[skill.recommendation];
      const skillIcon = recommendationIcons[skill.recommendation];
      const badge = colorize(
        `[${skillIcon} ${SKILL_RECOMMENDATIONS[skill.recommendation].label}]`,
        skillColor
      );
      console.log(`  ${index + 1}. ${styleText(`${skillIcon} ${skill.id}`, { color: skillColor, bold: true })} ${badge}`);
      console.log(`     ${colorize(skill.description, skillColor)}`);
      console.log(`     ${mute(`Install when: ${skill.whenToInstall}`)}`);
    });
    console.log("  all - install every skill");

    const answer = await rl.question("\nEnter comma-separated numbers, ids, or `all`: ");
    const selections = answer
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (selections.includes("all")) {
      return ["all"];
    }

    return selections.map((selection) => {
      const numericIndex = Number.parseInt(selection, 10);
      if (Number.isInteger(numericIndex) && numericIndex >= 1 && numericIndex <= SKILLS.length) {
        return SKILLS[numericIndex - 1].id;
      }

      return selection;
    });
  } finally {
    rl.close();
  }
}
