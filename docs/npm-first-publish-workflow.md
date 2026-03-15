# First-time npm publishing workflow

Use this guide when you are ready to publish `spfx-enterprise-skills-installer` as a public npm package for the first time.

This is written as a practical runbook, assuming:

1. you want a public package,
2. you want the package to live in its own repository,
3. you want the package to be installable through `npx`.

## 1. Move the package into its own repository

This folder was intentionally built as a portable workspace. Before publishing:

1. create a new GitHub repository for the package
2. move the contents of `spfx-enterprise-skills-installer/` into that repository root
3. make sure the repository contains at least:
   - `package.json`
   - `README.md`
   - `PUBLISHING.md`
   - `docs/`
   - `bin/`
   - `src/`

Recommended result:

```text
spfx-enterprise-skills-installer/
  bin/
  docs/
  src/
  .gitignore
  package.json
  README.md
  PUBLISHING.md
```

## 2. Decide the final npm package name

The current `package.json` uses:

```json
"name": "spfx-enterprise-skills-installer"
```

Before first publish:

1. confirm the name is available on npm
2. decide whether you want:
   - an unscoped package, for example `spfx-enterprise-skills-installer`
   - a scoped package, for example `@your-scope/spfx-enterprise-skills-installer`

Useful checks:

```bash
npm view spfx-enterprise-skills-installer version
npm search spfx-enterprise-skills-installer
```

If you choose a scoped package and you want it to be public, remember that scoped packages usually need:

```json
"publishConfig": {
  "access": "public"
}
```

## 3. Update `package.json` for public publishing

Before publishing, review and complete the package metadata.

At minimum, confirm or add:

```json
{
  "name": "spfx-enterprise-skills-installer",
  "version": "0.1.0",
  "description": "Public npx installer for the SPFx Enterprise Skills Pack.",
  "license": "MIT",
  "type": "module",
  "bin": {
    "spfx-enterprise-skills": "./bin/spfx-enterprise-skills.js"
  },
  "engines": {
    "node": ">=18"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/<your-account>/<your-repo>.git"
  },
  "homepage": "https://github.com/<your-account>/<your-repo>#readme",
  "bugs": {
    "url": "https://github.com/<your-account>/<your-repo>/issues"
  }
}
```

Checklist:

1. confirm the final package `name`
2. keep the `bin` entry intact so `npx` works
3. keep the `files` array accurate so npm publishes only what you need
4. confirm `license`
5. set the correct `repository`, `homepage`, and `bugs`
6. update `version` if needed before the first publish

## 4. Verify the executable entrypoint

Make sure the CLI file is executable:

```bash
chmod +x ./bin/spfx-enterprise-skills.js
```

Then run quick checks:

```bash
node ./bin/spfx-enterprise-skills.js --list-skills
node ./bin/spfx-enterprise-skills.js --list-hosts
```

If either command fails, fix that before publishing.

## 5. Verify the package contents before publish

Use npm’s packing workflow to inspect what will be published.

First do a dry run:

```bash
npm pack --dry-run
```

Then create the tarball for inspection:

```bash
npm pack
```

Check that the tarball contains the expected files and does not include junk such as:

1. `node_modules/`
2. local temp files
3. editor-specific artifacts
4. test output folders

If the tarball contents are wrong:

1. adjust the `files` array in `package.json`, or
2. update `.gitignore` and any future `.npmignore` strategy as needed

## 6. Run a local smoke test before publishing

The safest first publish includes at least one local smoke test.

### Basic command checks

```bash
node ./bin/spfx-enterprise-skills.js --list-skills
node ./bin/spfx-enterprise-skills.js --list-hosts
```

### Local-source install check

Use `--source-root` so you do not depend on live GitHub fetches while validating locally:

```bash
node ./bin/spfx-enterprise-skills.js install \
  --host generic \
  --mode project \
  --project-path ./smoke-test-output \
  --skills spfx-enterprise-ux-hub \
  --source-root ../spfx-enterprise-skills
```

Expected result:

1. the target install folder is created
2. the selected `SKILL.md` file is copied
3. an `INSTALL-GENERIC.md` file is written

Clean up any local smoke-test output before publishing.

## 7. Prepare your npm account

If this is your first public publish from this machine:

1. make sure you have an npm account
2. verify the account email is confirmed
3. log in from the terminal

```bash
npm login
```

Then verify:

```bash
npm whoami
```

If `npm whoami` fails, do not continue until authentication is working.

## 8. Commit and push the publishing-ready repository

Before `npm publish`:

1. commit the final package state
2. push to GitHub
3. confirm the README is correct
4. confirm the repository is the one you want users to discover from npm

This matters because npm will link back to the repository metadata you publish.

## 9. Publish the package

### Unscoped package

If the package is unscoped:

```bash
npm publish
```

### Scoped public package

If the package is scoped and intended to be public:

```bash
npm publish --access public
```

If you already added this to `publishConfig`, you can still use the explicit command above for the first publish to make the intent obvious.

## 10. Verify the published package

After publish succeeds:

1. open the npm package page
2. confirm the README rendered correctly
3. confirm the package name and version are correct
4. validate the CLI through `npx`

Example checks:

```bash
npx spfx-enterprise-skills-installer --list-hosts
npx spfx-enterprise-skills-installer --list-skills
```

If you changed the final package name, use that name in the `npx` command instead.

## 11. Tag the first release

After the package is public:

1. create a git tag that matches the published version
2. create a GitHub release if you use releases
3. note the publish event in your changelog or release notes

Example:

```bash
git tag v0.1.0
git push origin v0.1.0
```

## 12. First update after launch

When you later add new skills or adjust support levels:

1. update `src/skills.js` or `src/hosts.js`
2. update docs as needed
3. bump the version
4. run smoke tests again
5. publish the new version

## Common first-publish pitfalls

### Package name already taken

Fix:

1. choose a new package name
2. update `package.json`
3. rerun `npm view <name> version`

### Scoped package publishes as private by default

Fix:

1. add `publishConfig.access = "public"` to `package.json`, or
2. publish with `npm publish --access public`

### `npx` command name is unclear

Fix:

1. keep the package name simple
2. keep the `bin` command easy to remember
3. document the final public command clearly in `README.md`

### Wrong files appear in the npm tarball

Fix:

1. inspect `npm pack --dry-run`
2. adjust `files`
3. rerun the pack check before publishing

### Runtime fetch issues after publish

Fix:

1. verify the source repository paths in `src/skills.js`
2. verify the pinned source ref
3. test with `--source-root` locally to separate packaging issues from remote fetch issues
