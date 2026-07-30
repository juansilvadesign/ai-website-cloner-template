# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Added a **clone hub** at the root URL listing every registered clone with its
  routes, source URL, emitted design system, and extraction date. Pure Astro with
  scoped vanilla CSS (`src/layouts/HubLayout.astro`,
  `src/components/hub/CloneHub.astro`, `src/components/hub/CloneCard.astro`), with
  its own neutral light/dark palette in `src/styles/hub.css` so it never depends on
  a clone's tokens
- Added a **clone registry** — `src/data/clones/types.ts` and
  `src/data/clones/index.ts` (`allClones`, `getCloneBySlug`, `builtClones`) — fed by
  one `src/clones/<slug>/clone.config.ts` per clone
- Added `src/clones/appcie/clone.config.ts`, registering the CIE Validação DNE
  design system as a `build: "none"` entry. Its package was emitted in `1933e48` but
  its page never existed, which the hub now shows explicitly
- Added `scripts/check-nextjs-audit.mjs` and `npm run check:nextjs-audit`, which
  re-run the retained target's dev-only advisory experiment and return a
  `RESOLVED` / `UNBLOCKED` / `BLOCKED` verdict instead of leaving it to be
  re-derived by hand
- Added a `dependency-watch` job to the weekly workflow that publishes that
  verdict to the run summary and opens an issue the day the advisory becomes
  actionable

### Fixed
- Fixed CI failing on `typecheck:scripts` with `TS2688: Cannot find type
  definition file for 'node'`. The script passes `--types node`, but `@types/node`
  was only present as an optional peer transitive that a clean `npm ci` does not
  guarantee; it is now a direct root devDependency
- Fixed the weekly upstream watch going red while upstream was quiet. Issues were
  disabled on the fork, so `gh issue list` exited non-zero and failed the
  close-the-issue step; Issues are re-enabled and the requirement is documented

### Changed
- **Clones are now namespaced by slug and coexist.** Previously every
  `/clone-website` run overwrote `src/pages/index.astro`, `src/components/`,
  `public/images/`, and the single design-system `@import` in
  `src/styles/global.css`, so the repository could only ever hold one clone's page.
  A clone now owns exactly five paths — `src/clones/<slug>/`, `src/pages/<slug>/`,
  `public/clones/<slug>/`, `design-systems/<slug>/`, `docs/research/<slug>/` — and
  the root URL belongs to the hub
- Replaced the single-tenant `src/styles/global.css` with a three-way split: a
  shared token-free `src/styles/reset.css`, a hub-only `src/styles/hub.css`, and a
  per-clone `src/clones/<slug>/styles/clone.css` that owns the `tokens.css` import
  and every token-dependent global rule
- Migrated the FESN clone into the namespaced layout: 4 routes now under `/fesn/`,
  11 components and its layout/types under `src/clones/fesn/`, 9 assets under
  `public/clones/fesn/`, and evidence under `docs/research/fesn/`. 18
  root-relative references were rewritten, including a CSS `url()` background and
  four hrefs declared inside data arrays
- Rewrote the `/clone-website` write-target contract in `SKILL.md` and
  `docs/research/INSPECTION_GUIDE.md` around the namespaced layout, with an
  ownership table, the registry-append step, and two new "What NOT to Do" rules
  covering shared-path writes and unprefixed root-relative references
- Corrected the Milestone E follow-up: the `brace-expansion` advisory does **not**
  clear once Next's plugin set accepts ESLint 10. Forcing `eslint@^10` resolves but
  only takes the finding from 9 to 6, since `eslint-config-next` bundles its own
  `eslint-plugin-import` / `-jsx-a11y` / `-react`, each pulling `minimatch@3.x`.
  Recorded the measured evidence, including that an `overrides` pin to the sole
  patched release breaks lint at runtime

## [0.4.0] - 2026-07-27

### Added
- Added an always-on OpenDesign v1 rich-package emitter, targeted guard runner,
  evidence contract, derived cache generation, and a validated PsiAtiva reference
  package
- Hardened `/clone-website` for motion-heavy sites with static-first graceful degradation, a motion budget, complexity triage, and documented video/screenshot fallbacks (upstream PR #56)
- Added an explicit opt-in ego-browser extraction backend with an MCP translation table while keeping Browser MCP as the default (upstream PR #68)
- Added the Astro 7 static page target at the repository root, with vanilla CSS consuming emitted OpenDesign variables
- Added `--build astro|nextjs|none` and `--slug` routing to the design-system-first clone workflow
- Added a separately buildable retained Next.js target under `templates/nextjs/` with a prebuild design-system sync bridge
- Added final acceptance gates requiring a fresh design-system guard, the selected
  target's production check, behavior replay, and final 1440px/390px side-by-side
  comparison artifacts
- Added `OPEN_DESIGN_ROOT`, `check:design-system`, and `check:release` support so
  the package contract can be validated both in the Notes workspace and in a
  standalone checkout

### Changed
- Recast the project as the Claude-Code-only, design-system-first
  `juansilvadesign/ai-website-cloner-template` hard fork and bumped both package
  manifests to `0.4.0`
- Documented `npx @playwright/mcp@latest` as the Playwright MCP server command without duplicating the existing browser-backend workflow (upstream PR #60)
- Raised the project Node.js baseline to 24 across local development, CI, Docker, and contributor-facing documentation
- Made OpenDesign emission and validation a gate before page construction, with static-first Astro builder prompts
- Rewrote the README and inspection guide around the emitted package, isolated
  build targets, durable evidence, and release acceptance flow
- Updated CI and Docker to build the Astro default; CI also validates the
  reference design system and retained Next.js target
- Locked Astro's `js-yaml` and `sharp` transitives to patched releases, leaving the root production audit clean

### Removed
- Removed the 12 non-Claude agent targets and both instruction-sync scripts,
  leaving `.claude/skills/clone-website/SKILL.md` as the only executable workflow

### Security
- Updated the retained target from Next.js 16.2.1 to 16.2.12 and
  `eslint-config-next` to match, superseding the originally queued 16.2.7 bump
- Patched Next's pinned PostCSS and optional sharp transitives and the shadcn MCP
  server transitive through scoped overrides; the retained production dependency
  audit now reports zero vulnerabilities

## [0.3.1] - 2026-03-29

### Fixed
- `sync-agent-rules.sh` failing to resolve `@file` imports on Windows due to CRLF line endings — platform instruction files now correctly inline the Inspection Guide content

## [0.3.0] - 2026-03-29

### Added
- Multi-URL support for `/clone-website` — clone multiple sites in a single command with parallel processing and isolated output
- CI quality gates via GitHub Actions — automated lint, typecheck, and build on every push and PR
- `npm run typecheck` and `npm run check` scripts for local quality validation
- `.gitattributes` for cross-platform line ending normalization
- `.nvmrc` to pin Node.js 20 for contributor consistency

### Changed
- Streamlined PR template — removed redundant checklist items and screenshots section
- Improved project description and README — clearer use cases, limitations, and modern wording
- Refined documentation and agent rules across all platforms for clarity and consistency
- Fixed CRLF handling in `sync-skills.mjs` for reliable Windows operation

### Removed
- Outdated use case from README documentation

## [0.2.0] - 2026-03-28

### Added
- Multi-platform AI agent support: Claude Code, Codex CLI, OpenCode, GitHub Copilot, Cursor, Windsurf, Gemini CLI, Cline/Roo Code, Continue, Amazon Q, Augment Code, Aider
- Platform-specific instruction files and `/clone-website` skill for each supported agent
- `scripts/sync-agent-rules.sh` to regenerate platform instruction files from AGENTS.md
- `scripts/sync-skills.mjs` to regenerate `/clone-website` skill across all platforms
- GEMINI.md for Gemini CLI configuration
- Supported Platforms table in README
- "Updating for Other Platforms" documentation section in README

### Changed
- README now describes the project as multi-agent (Claude Code recommended, not required)
- AGENTS.md updated with sync script reminders

## [0.1.1] - 2026-03-28

### Added
- Bug report and feature request issue templates
- Pull request template with checklist
- CHANGELOG.md following Keep a Changelog format
- Package.json metadata (description, repository, homepage, keywords, engines)

### Fixed
- LICENSE copyright holder now attributed to JCodesMore

## [0.1.0] - 2026-03-28

### Added
- Initial template scaffold for website reverse-engineering with Claude Code
- `/clone-website` skill for full-site cloning pipeline
- `/build-from-spec` and `/customize` skills
- Parallel builder agents with git worktree isolation
- Chrome MCP integration for design token extraction
- Comprehensive inspection guide and project structure documentation
- Next.js 16 + shadcn/ui + Tailwind CSS v4 base scaffold
- MIT license
- README with badges, demo section, quick start, and star history

[Unreleased]: https://github.com/juansilvadesign/ai-website-cloner-template/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/juansilvadesign/ai-website-cloner-template/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/juansilvadesign/ai-website-cloner-template/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/juansilvadesign/ai-website-cloner-template/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/juansilvadesign/ai-website-cloner-template/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/juansilvadesign/ai-website-cloner-template/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/juansilvadesign/ai-website-cloner-template/releases/tag/v0.1.0
