# Fork Plan — Astro pages + standalone OpenDesign design systems

> Direction for `juansilvadesign/ai-website-cloner-template`, forked from
> `JCodesMore/ai-website-cloner-template`. This plan turns a Next.js-only,
> 13-agent website cloner into a **design-system-first** tool that emits a
> portable [OpenDesign](../../../skills/open-design/) design system on every run
> and can build the page in **Astro** (default) or Next.js — driven only by
> Claude Code.

## Locked decisions (interview, 2026-07-20)

| Axis | Decision |
| --- | --- |
| **Pipeline** | **Design-system-first** — always extract → emit the design system → *optionally* build a page from it |
| **Astro CSS** | **Vanilla CSS consuming `tokens.css`** — no Tailwind; static-first; the DS's own CSS variables |
| **Platforms** | **Prune to Claude Code only** — delete the other 12 agent targets + both sync scripts |
| **DS fidelity** | **Full OpenDesign v1 rich profile** — drops into `design-systems/` and passes `pnpm guard` |

## The one insight this whole plan rests on

The cloner's pipeline already splits cleanly into two halves:

- **Extraction** (SKILL.md Phase 1 + Phase 3 Step 1) — screenshots, the
  interaction sweep, `getComputedStyle()` dumps, asset download, real content.
  **Stack-agnostic. This is the asset we keep and harden.**
- **Emission** (Phases 2, 3 Step 2–3, 4) — writes Next.js + shadcn + Tailwind.
  **Stack-specific. This is what we fork.**

Both goals are new **emission targets** hanging off the same extraction engine.
Goal #2 (design system) is not extra work bolted on — it *is* the reconnaissance
output, re-serialized into OpenDesign's package contract instead of dumped into
`globals.css`. Goal #1 (Astro) is a second page-builder that reads the design
system we just emitted.

```
                 ┌─────────────────────────────┐
   URL  ───────▶ │  EXTRACT  (browser MCP)      │   keep + harden (PRs #56, #60)
                 │  screenshots · interaction   │
                 │  sweep · getComputedStyle ·  │
                 │  assets · real content       │
                 └──────────────┬──────────────┘
                                │  extraction artifacts
                                ▼
                 ┌─────────────────────────────┐
   ALWAYS ─────▶ │  EMIT DESIGN SYSTEM          │   ← NEW (Milestone C, keystone)
                 │  design-systems/<slug>/      │      OpenDesign v1 rich package
                 │  manifest·DESIGN·tokens.css· │
                 │  USAGE·components·derived·   │
                 │  preview·source evidence     │
                 └──────────────┬──────────────┘
                                │  tokens.css (+ derived tailwind-v4.css)
                 ┌──────────────┴──────────────┐
                 ▼                             ▼
   --build astro (default)          --build nextjs (retained)
   ┌────────────────────┐           ┌────────────────────┐
   │  BUILD ASTRO PAGE  │  ← NEW    │  BUILD NEXT PAGE   │  refactor to
   │  vanilla CSS uses  │  (Mstn D) │  consumes derived  │  read the DS
   │  tokens.css        │           │  tailwind-v4.css   │
   └────────────────────┘           └────────────────────┘
```

## Target skill surface

Keep the `/clone-website` name; make it design-system-first:

```
/clone-website <url> [<url2> ...] [--build astro|nextjs|none] [--slug <name>]
```

- **Always** emits `design-systems/<slug>/` (the OpenDesign package).
- `--build astro` *(default)* — also build the page as an Astro site.
- `--build none` — design system only (pure "extract a brand's DS" mode).
- `--build nextjs` — also build the page in the retained Next.js scaffold.
- `--slug` — name the design system (default: normalized hostname).

## Milestones

Sequence: **A → C → D** on the critical path; **B** parallels A; **E** closes.
**C is the keystone** — validate it on one site before touching Astro.

### Milestone A — Prune to Claude Code + re-baseline

Strip the multi-platform baggage so there's one instruction file and one skill.

- **Delete** the non-Claude agent targets: `.cursor/`, `.windsurf/`,
  `.windsurfrules`, `.gemini/`, `GEMINI.md`, `.codex/`, `.amazonq/`,
  `.continue/`, `.clinerules`, `.opencode/`, `.augment/`, `.aider.conf.yml`,
  and the non-Claude copies under `.github/skills/`.
- **Delete** `scripts/sync-agent-rules.sh` + `scripts/sync-skills.mjs` (their
  only job was regenerating the deleted copies).
- **Keep** `.claude/skills/clone-website/SKILL.md` as the *single* source of
  truth. `AGENTS.md` stays as the human-readable project brief; `CLAUDE.md`
  keeps importing it (`@AGENTS.md`). Remove the two "after editing, run
  sync-*" notes from `AGENTS.md`.
- **Rewrite** `README.md` + `AGENTS.md` "What This Is" for the new identity
  (design-system-first, Astro default, Claude Code only). Drop the Supported
  Platforms table.
- Net effect: ~11 dot-dirs + 2 scripts gone, zero drift surface.

### Milestone B — Harden extraction (harvest upstream PRs)

Pure SKILL.md edits, benefit every target. (Parallel with A.)

- **Adopt PR #56** — graceful degradation for motion-heavy sites: build the
  static, compiling version first, then re-add animations in priority order
  checking the build after each; for un-rebuildable effects (WebGL, huge GSAP
  timelines, Lottie) fall back to a looping muted video or screenshot and
  record the substitution. Prevents "one hard section breaks the whole clone."
- **Adopt PR #60** — document Playwright MCP as an alternative browser backend
  alongside Chrome MCP (you already run MCP servers; keep MCP the default).
- **Optional — PR #68** — note ego-browser as an opt-in backend that composes
  extraction into a single JS pass (far fewer tool calls / less context per
  clone). External dep; document, don't default.
- **Skip PR #25** (replaces MCP wholesale with Vercel `agent-browser`) — fights
  the MCP-native setup and conflicts with #60/#68.

### Milestone C — Design-system emitter (the keystone, goal #2)

A new phase (or a dedicated sub-skill the SKILL.md calls) that serializes the
extraction artifacts into an OpenDesign **v1 rich package** at
`design-systems/<slug>/`. Mapping from what we already extract:

| Extraction artifact | → OpenDesign package file |
| --- | --- |
| Color / type / spacing / radius / shadow from `getComputedStyle` | `tokens.css` (`:root` semantic slots + `[data-theme="dark"]`) |
| — derived from `tokens.css` | `design-tokens.json`, `tailwind-v4.css` (caches, must agree) |
| `BEHAVIORS.md` + component specs | `DESIGN.md` (≥7 substantive H2: theme, color roles, type, spacing/layout, components+states, motion, a11y, anti-patterns) |
| Component specs → real controls | `components.html` (≥10 selectors, ≥8 declared tokens, ≥4 groups) → `components.manifest.json` (derived) |
| Token dumps + screenshots | `source/evidence.md`, `source/tokens.source.json`, `source/token-contract.report.json` |
| Generated from tokens | `preview/{colors,typography,spacing}.html` (≥3 pages) |
| Run metadata | `manifest.json` (`schemaVersion: od-design-system-project/v1`, `id`==slug, name, category, description, `source.type` local/imported, `files`, `usage`, `componentsManifest`, `preview`, `sourceFiles`) |
| Read-order router | `USAGE.md` (required H2s: Read Order, Design Highlights, Do, Avoid) |

**Token-contract gotcha (must handle or `pnpm guard` fails):** OpenDesign's
slots are **not** shadcn's. Its `tokens.css` uses `--bg`, `--surface`, `--fg`,
`--fg-2`, `--muted`, `--accent`, `--accent-on`, `--text-xs…4xl`,
`--space-1…N`, `--font-display/body/mono`, etc. — while the current scaffold's
`globals.css` uses `--background`, `--primary`, oklch, `@theme inline`. The
emitter must map extracted values onto OpenDesign's **required A1/A2/B-slot
vocabulary**, read from
[`open-design/packages/contracts/src/design-systems/token-schema.ts`](../../../skills/open-design/packages/contracts/src/design-systems/token-schema.ts)
at build time. Do **not** hardcode a slot list — read the schema.

**Acceptance:** copy `design-systems/<slug>/` into the OpenDesign repo's
`design-systems/`, run `pnpm guard` + `pnpm typecheck` → green. That is the
definition of done for this milestone.

### Milestone D — Astro page builder (goal #1)

Second page-emitter that reads the design system from Milestone C.

- **Scaffold:** make the repo root an **Astro** app (`astro.config.mjs`,
  `src/pages/index.astro`, `src/components/*.astro`, `src/styles/` importing the
  design system's `tokens.css` globally). This replaces the Next.js-is-the-repo
  model; move the old Next scaffold to `templates/nextjs/` for `--build nextjs`.
- **Builder-agent prompt variant:** emit one `.astro` component per section,
  styled with **vanilla CSS classes that reference the DS's CSS variables**
  (`background: var(--surface); color: var(--fg);`) — no Tailwind, no shadcn.
  Same worktree + parallel-dispatch pattern the skill already uses.
- **Islands, static-first:** hydrate only interactive sections
  (`client:visible`/`client:load`); everything else ships as static HTML — your
  standing rule that islands must be static-first/SSR so AI crawlers see content.
- **Assembly:** `src/pages/index.astro` composes the sections; global
  `tokens.css` provides the foundation. Behaviors (scroll-driven, tabs, smooth
  scroll) come across from the interaction sweep as small island scripts.
- **Retained Next.js target:** refactor its foundation to consume the DS's
  derived `tailwind-v4.css` instead of hand-writing `globals.css`, so both
  targets share one source of truth (the design system) and never diverge.

### Milestone E — QA, docs, release

- Keep **Phase 5 visual QA diff** (side-by-side vs original at 1440/390).
- Add a **DS-acceptance step**: the guard check from Milestone C is part of
  "done," not optional.
- Rewrite `README.md`, `QUICKSTART` (if kept), `docs/research/INSPECTION_GUIDE.md`
  for the new flow; refresh `docs/FORK-PLAN.md` status.
- `CHANGELOG.md` entry + fork version bump (e.g. `0.4.0` — "Astro +
  design-system-first, Claude-Code-only").

## File-by-file change map

| Path | Action |
| --- | --- |
| `.cursor/ .windsurf/ .windsurfrules .gemini/ GEMINI.md .codex/ .amazonq/ .continue/ .clinerules .opencode/ .augment/ .aider.conf.yml` | **delete** (A) |
| `scripts/sync-agent-rules.sh`, `scripts/sync-skills.mjs` | **delete** (A) |
| `.claude/skills/clone-website/SKILL.md` | **edit** — new pipeline, flags, PR #56/#60 (A/B/C/D) |
| `AGENTS.md`, `CLAUDE.md`, `README.md` | **edit** — new identity, drop sync notes (A) |
| `design-systems/<slug>/…` | **new** — emitted OpenDesign package (C) |
| `astro.config.mjs`, `src/pages/`, `src/components/*.astro`, `src/styles/` | **new** — Astro scaffold (D) |
| `templates/nextjs/` (old `src/app`, `components.json`, `next.config.ts`, …) | **move** — retained Next target (D) |
| `docs/research/`, `docs/design-references/` | **keep** — extraction artifacts (unchanged) |
| `package.json`, `Dockerfile*`, `docker-compose.yml`, `eslint/tsconfig` | **edit** — Astro toolchain (D) |

## Risks & dependencies to resolve during build

1. **Token contract (highest).** `tokens.css` must satisfy OpenDesign's
   required slots or `pnpm guard` fails. Read `token-schema.ts` +
   `derived-token-outputs.ts` first; build a value→slot mapper, not a guess.
2. **Derived-file parity.** `design-tokens.json`, `tailwind-v4.css`,
   `components.manifest.json` are *caches* that must agree with `tokens.css`.
   Generate them from `tokens.css`, never hand-author.
3. **Structure shift.** Moving from "repo *is* the app" to "repo emits into
   `design-systems/` + an Astro app" is the biggest structural change — confirm
   the `templates/` layout before writing scaffolds.
4. **Importer vs direct emit.** We emit the v1 package directly rather than via
   `od design-systems import-local`. Confirm a hand-authored `source.type`
   (`local`?) is accepted by the guard, or set `importMode` accordingly.
5. **Legal / ToS.** A design system extracted from a brand is, like the cloner's
   own output, an *aesthetic inspiration, not an official asset* — fine for
   sites you own, migrations, and learning; keep the README's existing
   not-intended-for note and extend it to DS output.
6. **Housekeeping.** This fork lives at `knowledge/projects/ai-website-cloner-template/`
   as a standalone git repo (its origin is your fork) but is **not** registered
   as a submodule of the notes repo. Decide: register it as a submodule (like
   `docker`/`pos`) or keep it standalone. Until then the parent repo sees a
   nested `.git`.

## Recommended first bite

**Milestone A (prune) + a Milestone C skeleton against one simple test site**,
then drop the emitted `design-systems/<slug>/` into OpenDesign and get
`pnpm guard` green. That proves the keystone (design-system emission) end-to-end
before any Astro scaffolding — the riskiest, highest-value piece first. Astro
(D) becomes almost mechanical once a validated `tokens.css` exists to build on.
