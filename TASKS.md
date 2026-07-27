# Tasks

The living checklist. Strategy and milestone definitions live in
**[`ROADMAP.md`](ROADMAP.md)**; the deep rationale lives in
**[`docs/FORK-PLAN.md`](docs/FORK-PLAN.md)**.

_Last reviewed: 2026-07-27_

---

## Completed — Milestone B: harden extraction ✅

Pure `SKILL.md` edits harvested from upstream PRs that will never be merged there.
One file, low risk, benefits every emission target. Get the diff hunk with the
`gh pr diff | awk` recipe in [ROADMAP](ROADMAP.md#harvesting-from-upstream).

### Harvest PR #56 — graceful degradation for motion-heavy sites

- [x] Add **Principle 10 — Graceful Degradation Beats Total Failure** after Principle 9
      (`SKILL.md` ~L121): static skeleton first → layer motion in priority order,
      verifying the build after each → fallback to looping muted video or screenshot
      for WebGL / chained GSAP / Lottie → record every substitution.
- [x] Add the **motion budget rule** (~1 rebuilt-from-scratch effect per section;
      the rest are fallback candidates).
- [x] Add the **Motion Complexity Triage** subsection after the interaction sweep
      (`SKILL.md` ~L173): the library-detection signal table (Framer Motion / GSAP /
      Lenis / canvas-WebGL / Lottie / particles / native video) and the
      **Light / Moderate / Heavy** tiering, recorded at the top of `BEHAVIORS.md`.
- [x] Add the 2 matching **What NOT to Do** bullets (~L506).
- [x] Reconcile with our existing L513 bullet about video/Lottie mockups — don't
      leave two near-duplicate rules.

### Harvest PR #68 — ego-browser (opt-in only)

- [x] Add a **Browser Backend (pick one)** section: Option A browser MCP (default,
      unchanged) / Option B ego-browser.
- [x] Port the MCP→ego **translation table** (`js()`, `captureScreenshot()` returning
      a temp PNG path, CDP `Emulation.setDeviceMetricsOverride` for viewports,
      click/hover/scroll).
- [x] Keep the gotchas verbatim — they're the value: timeouts in **seconds**, no state
      between heredocs (re-open the task space each round), `cliLog` is the only
      output channel, builder agents never touch the browser.
- [x] Frame as **opt-in, never default** — external dependency on `lite.ego.app`.

### Harvest PR #60 — Playwright MCP (trimmed)

- [x] Add only the `npx @playwright/mcp@latest` install hint to Pre-Flight item 1.
      **Do not** port the full section — the base already lists Playwright MCP as an
      acceptable backend, so the PR's section is ~90% redundant.

### Close out B

- [x] Record the harvest in `CHANGELOG.md` under `[Unreleased]`.
- [x] Mark **B ✅** in `ROADMAP.md` and move the verdicts to "harvested" in
      `.github/upstream-triage.json`.

---

## Completed — Milestone D: Astro page builder ✅

The structural milestone. The root is the Astro default; `templates/nextjs/` is
a complete retained target with an independent manifest and lockfile.

- [x] **Decide the layout first**: what exactly moves to `templates/nextjs/`
      (`src/app/`, `components.json`, `next.config.ts`, `postcss.config.mjs`, the
      shadcn deps?) and what stays at root for Astro.
- [x] Scaffold Astro at root: `astro.config.mjs`, `src/pages/index.astro`,
      `src/components/*.astro`, `src/styles/` importing the DS's `tokens.css` globally.
- [x] Move the Next scaffold to `templates/nextjs/` for `--build nextjs`.
- [x] Write the Astro builder-agent prompt variant: one `.astro` component per
      section, vanilla CSS referencing DS variables (`var(--surface)`, `var(--fg)`),
      no Tailwind, no shadcn. Same worktree + parallel-dispatch pattern.
- [x] Islands **static-first** — hydrate only interactive sections
      (`client:visible` / `client:load`); everything else ships as static HTML so
      AI crawlers see the content.
- [x] Refactor the retained Next target to consume the DS's derived
      `tailwind-v4.css` instead of a hand-written `globals.css`, so both targets
      share one source of truth.
- [x] Wire the `--build astro|nextjs|none` and `--slug` flags through `SKILL.md`.
- [x] Update `package.json`, `Dockerfile*`, `docker-compose.yml`, eslint/tsconfig
      for the Astro toolchain — and keep `npm run check` green in CI.

---

## Completed — Milestone E: QA, docs, release ✅

- [x] Make the DS guard check part of "done", not optional.
- [x] Keep Phase 6 visual QA diff (1440 / 390 side-by-side vs original).
- [x] Rewrite `README.md` and `docs/research/INSPECTION_GUIDE.md` for the new flow.
- [x] `CHANGELOG.md` entry + version bump (`0.4.0` — "Astro + design-system-first,
      Claude-Code-only").

### Known drift (accumulated, safe to fix any time)

- [x] Replace `package.json`'s upstream name, author, repository, homepage, bugs,
      and `v0.3.1` metadata as part of E's version bump.
- [x] Add the missing Milestone A and C entries to `CHANGELOG.md`.

### Dependency hygiene (upstream #48 / #38)

- [x] Evaluate `next 16.2.1 → 16.2.7` + audit fixes after D. The queued patch was
      superseded by the July security line: the retained target now uses Next.js
      16.2.12 with matching ESLint config and scoped PostCSS, sharp, and Hono
      overrides. Its production audit is clean.

### Follow-up

- [ ] Remove the retained target's dev-only `brace-expansion` audit finding once
      Next's ESLint plugin set accepts ESLint 10. `npm audit fix --force` currently
      creates an invalid peer tree, so it is not a safe release fix.

---

## Upstream watch

Automated: [`.github/workflows/upstream-watch.yml`](.github/workflows/upstream-watch.yml)
runs Mondays 09:00 UTC and maintains one `upstream-watch` issue. Run it by hand
any time with `node scripts/check-upstream.mjs`.

**When it flags a PR:** judge it, add the verdict to
[`.github/upstream-triage.json`](.github/upstream-triage.json), and add the
reasoning to the table in [`ROADMAP.md`](ROADMAP.md#verdicts-on-the-current-open-prs).
Until you do, it will report the same PR every week.

### Log

| Date | Upstream `master` | Result |
| --- | --- | --- |
| 2026-07-24 | `58e00d5` (2026-07-04) | Baseline audit. No drift since the fork. 20 open PRs, all triaged. 3 flagged to harvest (#56, #68, #60). |
