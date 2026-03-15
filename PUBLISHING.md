# Publishing and update workflow

This package is designed to live in its own repository once you are ready to publish it publicly.

If you need a step-by-step first-time npm runbook, start with `docs/npm-first-publish-workflow.md`.

## First publish

1. Move `spfx-enterprise-skills-installer/` into a dedicated repository.
2. Confirm the final npm package name is available.
3. Update `package.json`:
   - `name`
   - `version`
   - `repository`
   - `homepage`
   - `bugs`
4. Run a local smoke test:
   - `node ./bin/spfx-enterprise-skills.js --list-skills`
   - `node ./bin/spfx-enterprise-skills.js --list-hosts`
5. Publish with your standard npm workflow.

For the detailed command-by-command flow, use `docs/npm-first-publish-workflow.md`.

## When the skills repo changes

1. Add or update skill entries in `src/skills.js`.
2. Update the pinned source ref if you want the published installer to target a newer skills revision.
3. If the support story changed, update:
   - `README.md`
   - `src/hosts.js`
   - `docs/host-support-matrix.md`
4. Bump the package version.
5. Republish.

## Adding a new skill

1. Add the new skill folder to the source skills repository.
2. Add a matching entry in `src/skills.js` with:
   - `id`
   - `title`
   - `description`
   - `repoPath`
3. Verify it appears in:
   - `--list-skills`
   - interactive install prompts
4. Smoke test at least one install path.
5. Republish the package.

## Evolving support levels

If a tool later exposes a stable public skill location:

1. Update the relevant host entry in `src/hosts.js`.
2. Change its support level from `guided` to `full`.
3. Adjust the guidance text so the CLI summary and generated install notes stay accurate.
4. Document the change in the README before publishing.
