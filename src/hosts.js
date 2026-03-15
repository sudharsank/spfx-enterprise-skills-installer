import os from "node:os";
import path from "node:path";

const home = os.homedir();

export const HOSTS = {
  generic: {
    id: "generic",
    icon: "🧰",
    label: "Generic workspace",
    description: "Installs directly into a portable skills folder.",
    modes: {
      project: {
        support: "full",
        relativeRoot: "skills"
      },
      global: {
        support: "full",
        absoluteRoot: path.join(home, ".spfx-enterprise-skills", "skills")
      }
    },
    guidance: {
      project: [
        "Commit the installed `skills/` folder into your repository.",
        "Open the relevant `SKILL.md` files in your editor so your assistant can pull them into context.",
        "Reference the installed skills in prompts, comments, PRs, or repo-level instructions."
      ],
      global: [
        "Keep this global skills folder as your personal source of reusable SPFx guidance.",
        "Reference the installed path from your tool-specific setup or copy selected skills into new projects when needed."
      ]
    }
  },
  copilot: {
    id: "copilot",
    icon: "🤖",
    label: "GitHub Copilot / Copilot CLI",
    description: "Stages skills and emits host-specific guidance without claiming unsupported auto-wiring.",
    modes: {
      project: {
        support: "guided",
        relativeRoot: path.join(".spfx-enterprise-skills", "copilot", "skills")
      },
      global: {
        support: "guided",
        absoluteRoot: path.join(home, ".spfx-enterprise-skills", "hosts", "copilot", "skills")
      }
    },
    guidance: {
      project: [
        "Keep the staged skills in the repo and reference them from `AGENTS.md` or `.github/copilot-instructions.md`.",
        "Open the relevant `SKILL.md` files while working so Copilot gets the right context.",
        "Avoid merging these docs into unrelated instruction files until you know which skills your repo actually needs."
      ],
      global: [
        "Use this staged location as your personal Copilot skill library.",
        "Copy or reference only the skills you need into each repository-level instruction setup."
      ]
    }
  },
  vscode: {
    id: "vscode",
    icon: "📝",
    label: "VS Code",
    description: "Stages skills for VS Code-based workflows and prints next steps.",
    modes: {
      project: {
        support: "guided",
        relativeRoot: path.join(".spfx-enterprise-skills", "vscode", "skills")
      },
      global: {
        support: "guided",
        absoluteRoot: path.join(home, ".spfx-enterprise-skills", "hosts", "vscode", "skills")
      }
    },
    guidance: {
      project: [
        "Keep the staged skills in the workspace and open the relevant `SKILL.md` files beside your SPFx code.",
        "Reference those skills from project instructions, prompts, or chat requests so the model follows your standards."
      ],
      global: [
        "Use this folder as a reusable VS Code skill library and pull the needed skills into each project workflow."
      ]
    }
  },
  cursor: {
    id: "cursor",
    icon: "➤",
    label: "Cursor",
    description: "Stages skills for Cursor workflows and prints manual wiring guidance.",
    modes: {
      project: {
        support: "guided",
        relativeRoot: path.join(".spfx-enterprise-skills", "cursor", "skills")
      },
      global: {
        support: "guided",
        absoluteRoot: path.join(home, ".spfx-enterprise-skills", "hosts", "cursor", "skills")
      }
    },
    guidance: {
      project: [
        "Open the staged skills in Cursor and reference them from repo rules or task instructions.",
        "Use the hub skill first, then only pull in the specialized skills needed for the current task."
      ],
      global: [
        "Use this staged folder as a reusable Cursor skill library and copy only the skills you need into repo-specific rules."
      ]
    }
  },
  claude: {
    id: "claude",
    icon: "✳",
    label: "Claude Code",
    description: "Stages skills and emits Claude Code next steps.",
    modes: {
      project: {
        support: "guided",
        relativeRoot: path.join(".spfx-enterprise-skills", "claude", "skills")
      },
      global: {
        support: "guided",
        absoluteRoot: path.join(home, ".spfx-enterprise-skills", "hosts", "claude", "skills")
      }
    },
    guidance: {
      project: [
        "Open the staged skills in the repo and reference them explicitly in Claude Code prompts.",
        "Ask Claude Code to start from the UX hub and summarize which skills it applied."
      ],
      global: [
        "Use this staged folder as your personal Claude Code skill library and bring selected skills into each repo."
      ]
    }
  },
  codex: {
    id: "codex",
    icon: "⚙",
    label: "Codex / Codex CLI",
    description: "Stages skills and prints Codex-friendly usage guidance.",
    modes: {
      project: {
        support: "guided",
        relativeRoot: path.join(".spfx-enterprise-skills", "codex", "skills")
      },
      global: {
        support: "guided",
        absoluteRoot: path.join(home, ".spfx-enterprise-skills", "hosts", "codex", "skills")
      }
    },
    guidance: {
      project: [
        "Reference the staged skills from `AGENTS.md` or adjacent repo instructions rather than flattening all content into one file.",
        "Load the hub first, then only the specialized skills the task actually needs."
      ],
      global: [
        "Use this as a personal Codex skill library and copy or reference the selected skills per project."
      ]
    }
  },
  kiro: {
    id: "kiro",
    icon: "🪄",
    label: "Kiro",
    description: "Stages skills and prints Kiro-specific next steps.",
    modes: {
      project: {
        support: "guided",
        relativeRoot: path.join(".spfx-enterprise-skills", "kiro", "skills")
      },
      global: {
        support: "guided",
        absoluteRoot: path.join(home, ".spfx-enterprise-skills", "hosts", "kiro", "skills")
      }
    },
    guidance: {
      project: [
        "Open the staged `SKILL.md` files in Kiro and reference them in the task brief so the model follows the SPFx standards.",
        "Prefer the hub skill as the entry point, then add specialized skills selectively."
      ],
      global: [
        "Use this staged folder as a reusable Kiro skill library for future projects."
      ]
    }
  },
  antigravity: {
    id: "antigravity",
    icon: "🛰",
    label: "Antigravity",
    description: "Stages skills for Antigravity-style agent workflows.",
    modes: {
      project: {
        support: "guided",
        relativeRoot: path.join(".spfx-enterprise-skills", "antigravity", "skills")
      },
      global: {
        support: "guided",
        absoluteRoot: path.join(home, ".spfx-enterprise-skills", "hosts", "antigravity", "skills")
      }
    },
    guidance: {
      project: [
        "Point your project agent at the staged skills and ask it to start with the hub skill.",
        "Have the agent report which specialized skills it applied in its plan or output."
      ],
      global: [
        "Use this staged folder as a reusable Antigravity skill library and load only the skills needed for each workspace."
      ]
    }
  },
  opencode: {
    id: "opencode",
    icon: "💻",
    label: "Opencode",
    description: "Stages skills and emits Opencode-friendly guidance.",
    modes: {
      project: {
        support: "guided",
        relativeRoot: path.join(".spfx-enterprise-skills", "opencode", "skills")
      },
      global: {
        support: "guided",
        absoluteRoot: path.join(home, ".spfx-enterprise-skills", "hosts", "opencode", "skills")
      }
    },
    guidance: {
      project: [
        "Keep the staged skills in the workspace and reference them from the prompt or any repo instruction mechanism your Opencode setup uses.",
        "Prefer the hub skill first so the context stays small and targeted."
      ],
      global: [
        "Use this staged folder as your reusable Opencode skill library and pull the needed skills into each project."
      ]
    }
  }
};

export function listHosts() {
  return Object.values(HOSTS);
}

export function getHost(hostId) {
  const host = HOSTS[hostId];

  if (!host) {
    throw new Error(`Unknown host: ${hostId}`);
  }

  return host;
}

export function resolveDestination({ hostId, mode, projectPath, globalPath }) {
  const host = getHost(hostId);
  const modeConfig = host.modes[mode];

  if (!modeConfig) {
    throw new Error(`Unsupported mode "${mode}" for host "${hostId}"`);
  }

  if (mode === "project" && !projectPath) {
    throw new Error("A project path is required for project installs.");
  }

  const rootPath =
    mode === "project"
      ? path.resolve(projectPath, modeConfig.relativeRoot)
      : path.resolve(globalPath || modeConfig.absoluteRoot);

  return {
    host,
    mode,
    support: modeConfig.support,
    rootPath,
    instructionsPath: path.join(rootPath, `INSTALL-${host.id.toUpperCase()}.md`)
  };
}
