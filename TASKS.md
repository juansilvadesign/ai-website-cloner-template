# Tasks

The living checklist. Strategy and milestone definitions live in
**[`ROADMAP.md`](ROADMAP.md)**; the deep rationale lives in
**[`docs/FORK-PLAN.md`](docs/FORK-PLAN.md)**.

_Last reviewed: 2026-07-24_

---

## Now — Milestone B: harden extraction

Pure `SKILL.md` edits harvested from upstream PRs that will never be merged there.
One file, low risk, benefits every emission target. Get the diff hunk with the
`gh pr diff | awk` recipe in [ROADMAP](ROADMAP.md#harvesting-from-upstream).

### Harvest PR #56 — graceful degradation for motion-heavy sites

- [ ] Add **Principle 10 — Graceful Degradation Beats Total Failure** after Principle 9
      (`SKILL.md` ~L121): static skeleton first → layer motion in priority order,
      verifying the build after each → fallback to looping muted video or screenshot
      for WebGL / chained GSAP / Lottie → record every substitution.
- [ ] Add the **motion budget rule** (~1 rebuilt-from-scratch effect per section;
      the rest are fallback candidates).
- [ ] Add the **Motion Complexity Triage** subsection after the interaction sweep
      (`SKILL.md` ~L173): the library-detection signal table (Framer Motion / GSAP /
      Lenis / canvas-WebGL / Lottie / particles / native video) and the
      **Light / Moderate / Heavy** tiering, recorded at the top of `BEHAVIORS.md`.
- [ ] Add the 2 matching **What NOT to Do** bullets (~L506).
- [ ] Reconcile with our existing L513 bullet about video/Lottie mockups — don't
      leave two near-duplicate rules.

### Harvest PR #68 — ego-browser (opt-in only)

- [ ] Add a **Browser Backend (pick one)** section: Option A browser MCP (default,
      unchanged) / Option B ego-browser.
- [ ] Port the MCP→ego **translation table** (`js()`, `captureScreenshot()` returning
      a temp PNG path, CDP `Emulation.setDeviceMetricsOverride` for viewports,
      click/hover/scroll).
- [ ] Keep the gotchas verbatim — they're the value: timeouts in **seconds**, no state
      between heredocs (re-open the task space each round), `cliLog` is the only
      output channel, builder agents never touch the browser.
- [ ] Frame as **opt-in, never default** — external dependency on `lite.ego.app`.

### Harvest PR #60 — Playwright MCP (trimmed)

- [ ] Add only the `npx @playwright/mcp@latest` install hint to Pre-Flight item 1.
      **Do not** port the full section — the base already lists Playwright MCP as an
      acceptable backend, so the PR's section is ~90% redundant.

### Close out B

- [ ] Record the harvest in `CHANGELOG.md` under `[Unreleased]`.
- [ ] Mark **B ✅** in `ROADMAP.md` and move the verdicts to "harvested" in
      `.github/upstream-triage.json`.

---

## Next — Milestone D: Astro page builder

The structural milestone. **Interview before scaffolding** — risk #3 in the fork
plan is that the `templates/` layout gets locked in wrong.

- [ ] **Decide the layout first**: what exactly moves to `templates/nextjs/`
      (`src/app/`, `components.json`, `next.config.ts`, `postcss.config.mjs`, the
      shadcn deps?) and what stays at root for Astro.
- [ ] Scaffold Astro at root: `astro.config.mjs`, `src/pages/index.astro`,
      `src/components/*.astro`, `src/styles/` importing the DS's `tokens.css` globally.
- [ ] Move the Next scaffold to `templates/nextjs/` for `--build nextjs`.
- [ ] Write the Astro builder-agent prompt variant: one `.astro` component per
      section, vanilla CSS referencing DS variables (`var(--surface)`, `var(--fg)`),
      no Tailwind, no shadcn. Same worktree + parallel-dispatch pattern.
- [ ] Islands **static-first** — hydrate only interactive sections
      (`client:visible` / `client:load`); everything else ships as static HTML so
      AI crawlers see the content.
- [ ] Refactor the retained Next target to consume the DS's derived
      `tailwind-v4.css` instead of a hand-written `globals.css`, so both targets
      share one source of truth.
- [ ] Wire the `--build astro|nextjs|none` and `--slug` flags through `SKILL.md`.
- [ ] Update `package.json`, `Dockerfile*`, `docker-compose.yml`, eslint/tsconfig
      for the Astro toolchain — and keep `npm run check` green in CI.

---

## Backlog

### Milestone E — QA, docs, release

- [ ] Make the DS guard check part of "done", not optional.
- [ ] Keep Phase 5 visual QA diff (1440 / 390 side-by-side vs original).
- [ ] Rewrite `README.md` and `docs/research/INSPECTION_GUIDE.md` for the new flow.
- [ ] `CHANGELOG.md` entry + version bump (`0.4.0` — "Astro + design-system-first,
      Claude-Code-only").

### Known drift (accumulated, safe to fix any time)

- [ ] **`AGENTS.md` is stale** — still says "the design-system emitter and Astro
      builder are still in progress." C shipped; only the Astro builder is pending.
- [ ] **`README.md` status paragraph** has the same stale claim.
- [ ] **`package.json` still carries upstream identity** — name
      `ai-website-clone-template`, `author`/`repository`/`homepage`/`bugs` all
      pointing at JCodesMore, `v0.3.1`, and a Next-only description. Fold into E's
      version bump.
- [ ] **`CHANGELOG.md`** has no entries for Milestones A or C.

### Dependency hygiene (upstream #48 / #38)

- [ ] Evaluate `next 16.2.1 → 16.2.7` + audit fixes — **after** D decides where the
      Next scaffold lives, so the bump lands in `templates/nextjs/` rather than root.

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
