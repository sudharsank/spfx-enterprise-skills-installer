# Host support matrix

This document explains the v1 support philosophy for the public SPFx Enterprise Skills installer.

## Support levels

### Full

The installer writes directly into a stable destination.

Use this only when the target path is predictable enough that the CLI can safely create and maintain it.

### Guided

The installer stages skills into a safe host-specific location and writes an `INSTALL-<HOST>.md` file with next steps.

Use this when:

1. the host can benefit from the skills,
2. but the host does not expose a stable public skill location that the CLI should claim as automatic.

## Current v1 matrix

| Host | Project | Global | Why |
| --- | --- | --- | --- |
| `generic` | full | full | A portable `skills/` folder is predictable and safe. |
| `copilot` | guided | guided | The installer can stage reusable skill docs safely, but should not pretend to auto-wire every GitHub Copilot workflow. |
| `vscode` | guided | guided | VS Code workflows vary by extension and repo setup, so staging is safer than overclaiming automatic integration. |
| `cursor` | guided | guided | Cursor can use the skills, but the packaging story is still best handled as staged content plus instructions. |
| `claude` | guided | guided | Claude Code can consume the skills, but v1 should not hard-code a public global install contract. |
| `codex` | guided | guided | The staged install is safe; repo-specific instructions remain the right place to wire the skills into workflows. |
| `kiro` | guided | guided | Kiro can use the docs, but a stable public skill path should be confirmed before direct auto-install is claimed. |
| `antigravity` | guided | guided | Agent-based setups vary, so staged skills plus explicit next steps are safer in v1. |
| `opencode` | guided | guided | The installer can prepare the content, while workspace-level wiring remains user-controlled. |

## Why the matrix is conservative

This package is meant to build trust:

1. it should install safely,
2. it should be honest about what is automated,
3. it should avoid writing files into locations that may be wrong for a user's actual tool setup.

That is why v1 prefers guided support over fragile pseudo-automation.
