# AI Website Cloner

A design-system-first website reverse-engineer for Claude Code. Give it one or
more URLs and `/clone-website` extracts the target's visual language, real
content, assets, responsive behavior, and interaction states into a validated
[OpenDesign](https://github.com/nexu-io/open-design) package. It can then rebuild
the page as static-first Astro or in the retained Next.js target.

This is version **0.4.0** of
[`juansilvadesign/ai-website-cloner-template`](https://github.com/juansilvadesign/ai-website-cloner-template),
a hard fork of
[`JCodesMore/ai-website-cloner-template`](https://github.com/JCodesMore/ai-website-cloner-template).
The fork is Claude-Code-only, uses Astro by default, and selectively harvests
upstream improvements instead of merging upstream.

## What every run produces

The design system is the primary artifact, not a side effect:

```text
design-systems/<slug>/
  DESIGN.md
  USAGE.md
  tokens.css
  design-tokens.json
  tailwind-v4.css
  components.html
  components.manifest.json
  manifest.json
  preview/
  source/
```

The package must pass OpenDesign's manifest, token-parity, component-cache, and
quality guards before page construction begins. If a page is requested, the
same package becomes its single styling source:

- **Astro (default):** static HTML, scoped vanilla CSS, and variables from
  `tokens.css`, served at `/<slug>/` and listed on the [clone
  hub](#the-clone-hub).
- **Next.js (retained):** an isolated app under `templates/nextjs/` that syncs
  `tokens.css` and the derived `tailwind-v4.css` into an ignored build cache.
- **No page:** `--build none` emits and validates only the portable package.

## Requirements

- Node.js 24
- Claude Code with a browser automation backend
  - Chrome/browser MCP is the default.
  - Playwright MCP is also supported with `npx @playwright/mcp@latest`.
  - ego-browser is opt-in only.
- A compatible local OpenDesign checkout

The emitter and guard load OpenDesign's own TypeScript contracts at runtime.
Point `OPEN_DESIGN_ROOT` at an absolute checkout path:

```bash
git clone https://github.com/nexu-io/open-design.git ../open-design
export OPEN_DESIGN_ROOT=/absolute/path/to/open-design
```

Lookup order is `--od-root`, `OPEN_DESIGN_ROOT`, then the Notes-workspace
fallback at `knowledge/skills/open-design`. CI pins the contract checkout used
to validate the included `psiativa` reference package.

## Quick start

```bash
git clone https://github.com/juansilvadesign/ai-website-cloner-template.git
cd ai-website-cloner-template
nvm use
npm ci
claude --chrome
```

Then run the Claude Code skill:

```text
/clone-website <url1> [<url2> ...] [--build astro|nextjs|none] [--slug <name>]
```

Common forms:

```text
# Emit the design system and build the Astro page at /example-com/
/clone-website https://example.com

# Emit and validate only
/clone-website https://example.com --build none

# Build the isolated retained Next.js target
/clone-website https://example.com --build nextjs

# Choose the package folder explicitly
/clone-website https://example.com --slug example-brand
```

Install the second dependency graph before selecting Next.js:

```bash
npm ci --prefix templates/nextjs
```

`--slug` is valid only for a single URL. Multiple URLs are processed as
independent extractions with isolated research and screenshot folders.

## The clone hub

Clones coexist. `npm run dev` serves a hub at `http://localhost:4321/` listing
every registered clone — its routes, source URL, emitted design system, and
extraction date. Each clone serves from its own `/<slug>/` prefix, so a new run
never contends for the root URL.

That namespacing is load-bearing. Before it, every run wrote the same
`src/pages/index.astro`, `src/components/`, `public/images/`, and single
design-system import, so only the most recent clone had a page — the repo still
carries a `design-systems/appcie/` package whose page never survived.

A clone owns exactly five paths and nothing else:

```text
src/clones/<slug>/        src/pages/<slug>/        public/clones/<slug>/
design-systems/<slug>/    docs/research/<slug>/
```

Registering it in `src/data/clones/index.ts` is what puts it on the hub; an
unregistered clone still serves its routes, it is just not listed.

## The workflow

1. **Reconnaissance** — capture full-page 1440px and 390px references; inspect
   computed styles, content, assets, responsive changes, and every scroll,
   click, hover, and timed state.
2. **Design-system emission** — map evidence to OpenDesign slots, author the
   rich package, emit derived caches through OpenDesign's renderers, and run the
   guard.
3. **Target foundation** — connect Astro or retained Next.js to the validated
   package before section work.
4. **Specification and construction** — write one evidence-backed component
   spec before dispatching each focused builder in its own git worktree.
5. **Assembly** — compose sections, preserve server-rendered content, then add
   only the interactions the page needs.
6. **Visual QA** — compare the final clone with the original side-by-side at
   1440px and 390px, correct discrepancies, and recapture the final evidence.
7. **Acceptance** — rerun the design-system guard after the last edit, run the
   selected target's production check, and verify the visual and behavior
   evidence.

See the operational
[`Inspection Guide`](docs/research/INSPECTION_GUIDE.md) and the full
[`/clone-website` skill`](.claude/skills/clone-website/SKILL.md).

## Definition of done

A clone is complete only when every applicable gate passes:

- A fresh final guard run succeeds:

  ```bash
  npm run check:design-system -- --brand <slug>
  ```

- The selected page target is green:

  ```bash
  npm run check
  # or
  DESIGN_SYSTEM_SLUG=<slug> npm run check:nextjs
  ```

- Final `comparison-1440.png` and `comparison-390.png` artifacts place the
  original and clone side-by-side at matching viewport settings.
- Interactive behavior has been replayed against the clone; any deliberate
  motion fallback is recorded in `BEHAVIORS.md`.

For `--build none`, only the final design-system guard applies.

## Artifact layout

Clones are namespaced by slug and coexist. The root URL is a hub listing every
clone; each clone serves from `/<slug>/`.

```text
src/
  pages/
    index.astro                  # The hub — never written by a clone run
    <slug>/                      # One clone's routes
  clones/<slug>/                 # One clone: config, components, layout, styles, types
  components/hub/                # Hub UI
  data/clones/                   # Clone registry
  layouts/HubLayout.astro
  styles/
    reset.css                    # Shared, token-free
    hub.css                      # Hub-only palette
public/
  clones/<slug>/                 # One clone's images, videos, seo
design-systems/<slug>/           # Validated portable OpenDesign package
docs/
  research/
    INSPECTION_GUIDE.md          # Shared guide
    <slug>/                      # Topology, behaviors, component specs, evidence
  design-references/<slug>/
    qa/
      original-1440.png
      clone-1440.png
      comparison-1440.png
      original-390.png
      clone-390.png
      comparison-390.png
templates/nextjs/                # Isolated retained Next.js target
scripts/                         # Emission, validation, and asset tooling
```

A clone owns exactly five paths: `src/clones/<slug>/`, `src/pages/<slug>/`,
`public/clones/<slug>/`, `design-systems/<slug>/`, and `docs/research/<slug>/`.
Adding one to `src/data/clones/index.ts` is what makes it appear on the hub.

Generated caches such as `design-tokens.json`, `tailwind-v4.css`, and
`components.manifest.json` are never hand-edited. Change extraction evidence
and re-emit instead.

## Development commands

```bash
npm run dev                       # Astro dev server on 4321 (hub at /)
npm run build                     # Static Astro build
npm run lint                      # Astro/TypeScript lint
npm run typecheck                 # Astro typecheck
npm run typecheck:scripts         # Emitter/guard TypeScript check
npm run check                     # Lint + all typechecks + Astro build
npm run check:design-system -- --brand psiativa
npm run check:nextjs              # Retained Next lint + typecheck + build
npm run check:release             # Astro + reference DS guard + retained Next
```

`npm run check:release` requires `OPEN_DESIGN_ROOT` outside the Notes workspace
and installed dependencies in both the root and `templates/nextjs/`.

## Static-first output

Astro sections ship as semantic HTML by default. Small interactions use
progressive enhancement; framework islands are reserved for genuine
interactivity and must keep their initial content server-rendered. Content
sections never use `client:only`.

Motion-heavy targets start from a pixel-accurate static skeleton. Irreducible
WebGL, chained GSAP, or similar effects may use a documented video or screenshot
fallback so visual ambition never leaves the build broken.

## Docker

```bash
docker compose up app --build
docker compose up dev --build
```

The production image serves Astro's static `dist/` output with nginx. The dev
service exposes Astro on port 3001 by default.

## Appropriate use

Use this project for sites you own, authorized migrations, recovery work,
design-system research, and learning. Do not use it for phishing,
impersonation, rights infringement, or scraping/reproduction prohibited by a
site's terms. Extracted brand assets and design-system output are not official
assets and remain subject to their owners' rights.

## Project documentation

- [`ROADMAP.md`](ROADMAP.md) — shipped milestones and hard-fork policy
- [`TASKS.md`](TASKS.md) — living checklist
- [`docs/FORK-PLAN.md`](docs/FORK-PLAN.md) — architecture decisions and rationale
- [`AGENTS.md`](AGENTS.md) — repository rules
- [`CHANGELOG.md`](CHANGELOG.md) — release history

## License

MIT — see [`LICENSE`](LICENSE). The original project and attribution are
preserved in the repository history and license.
