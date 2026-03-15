# SPFx Enterprise Skills Installer

This standalone folder contains a portable npm CLI that can be moved into its own repository and published as a public `npx` installer.

The installer downloads selected skills from the source repository and places them into either:

1. a project-local destination, or
2. a user-level/global destination.

## Why this package exists

The original `spfx-enterprise-skills` repository is a content repo. It contains the skill folders and `SKILL.md` files, but it does not yet expose a public installer command.

This package adds that missing distribution layer:

1. interactive skill selection
2. scriptable CLI flags
3. project vs global installs
4. host-aware support levels
5. a safe path for future skill additions and republishing
6. optional local-source installs for development and offline validation

## Current support model

This installer intentionally distinguishes between support levels:

1. **Full support**
   - the installer writes directly to a stable destination
2. **Guided support**
   - the installer stages the selected skills in a safe location and writes host-specific next steps

Current status:

| Host | Project | Global |
| --- | --- | --- |
| `generic` | full | full |
| `copilot` | guided | guided |
| `vscode` | guided | guided |
| `cursor` | guided | guided |
| `claude` | guided | guided |
| `codex` | guided | guided |
| `kiro` | guided | guided |
| `antigravity` | guided | guided |
| `opencode` | guided | guided |

This keeps v1 honest. The package avoids claiming automatic wiring when a host does not expose a well-defined public skill location.

## Usage

### List skills

```bash
npx spfx-enterprise-skills-installer --list-skills
```

The command prints a richer catalog grouped by recommendation level so users can quickly see:

1. which skills are the best starting point
2. which ones are situation-specific
3. which ones are optional or style-driven
4. what each skill is for and when to install it

### List hosts

```bash
npx spfx-enterprise-skills-installer --list-hosts
```

### Interactive install

```bash
npx spfx-enterprise-skills-installer install
```

### Scripted project install

```bash
npx spfx-enterprise-skills-installer install \
  --host generic \
  --mode project \
  --project-path . \
  --skills spfx-enterprise-ux-hub,spfx-enterprise-code-and-performance
```

### Scripted global install

```bash
npx spfx-enterprise-skills-installer install \
  --host generic \
  --mode global \
  --skills all
```

### Dry run

```bash
npx spfx-enterprise-skills-installer install \
  --host copilot \
  --mode project \
  --project-path . \
  --skills spfx-enterprise-ux-hub \
  --dry-run
```

### Local source override for development

```bash
npx spfx-enterprise-skills-installer install \
  --host generic \
  --mode project \
  --project-path . \
  --skills spfx-enterprise-ux-hub \
  --source-root ../spfx-enterprise-skills
```

## How installs are written

### Full support hosts

`generic` installs directly into:

- project mode: `<project>/skills/<skill-id>/SKILL.md`
- global mode: `~/.spfx-enterprise-skills/skills/<skill-id>/SKILL.md`

### Guided support hosts

Guided hosts stage the skills under a safe host-specific location, for example:

- project mode: `<project>/.spfx-enterprise-skills/<host>/skills/<skill-id>/SKILL.md`
- global mode: `~/.spfx-enterprise-skills/hosts/<host>/skills/<skill-id>/SKILL.md`

The installer also writes an `INSTALL-<HOST>.md` file with exact next steps.

## Publish and update workflow

### Before first publish

1. Confirm the final npm package name is available.
2. Rename the package in `package.json` if needed.
3. Move this folder into its own repository when you are ready.
4. Publish with your normal npm workflow.

For the fuller maintenance workflow, see `PUBLISHING.md`.

### When adding new skills later

1. Add the new skill entry to `src/skills.js`.
2. Point `repoPath` to the new source folder in the skills repo.
3. Update README examples if the support story changes.
4. Bump the package version.
5. Republish the package.

## Additional docs

1. `PUBLISHING.md` - release and republish workflow
2. `docs/host-support-matrix.md` - rationale behind full vs guided support
3. `docs/npm-first-publish-workflow.md` - first-time public npm publishing runbook

## Notes

1. The installer currently downloads `SKILL.md` files from the source repository at runtime.
2. For development and local testing, you can override the source with `--source-root`.
3. The source ref is pinned in `src/skills.js` and can be overridden with `--source-ref`.
4. If you want fully offline installs later, the next iteration can vendor the skill assets into the package tarball.
