# AI Website Cloner — design-system-first (Claude Code fork)

A tool for reverse-engineering any website into a **portable design system** and a clean, modern codebase — driven **only by [Claude Code](https://docs.anthropic.com/en/docs/claude-code)** (Opus 4.8 recommended).

Point it at one or more URLs, run `/clone-website`, and Claude inspects the site, extracts design tokens, assets, and real content, writes component specs, and dispatches parallel builder agents in git worktrees to reconstruct every section.

> **This is a hard fork** of [`JCodesMore/ai-website-cloner-template`](https://github.com/JCodesMore/ai-website-cloner-template), being reshaped into a design-system-first, Astro-default, Claude-Code-only tool. We cherry-pick from upstream rather than sync.
>
> - **[`ROADMAP.md`](ROADMAP.md)** — milestone status, the hard-fork stance, upstream verdicts
> - **[`TASKS.md`](TASKS.md)** — the living checklist of what's actually undone
> - **[`docs/FORK-PLAN.md`](docs/FORK-PLAN.md)** — the deep rationale and file-by-file change map
>
> **Status:** the Claude-Code-only prune, OpenDesign emitter, and Astro page
> builder are shipped. `/clone-website` always validates
> `design-systems/<slug>/`, then builds Astro by default, retained Next.js on
> request, or no page with `--build none`.

## Demo

[![Watch the demo](docs/design-references/comparison.png)](https://youtu.be/O669pVZ_qr0)

> Click the image above to watch the full demo on YouTube.

## Quick Start

1. **Get the repo on your machine**
   ```bash
   git clone https://github.com/juansilvadesign/ai-website-cloner-template.git
   cd ai-website-cloner-template
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start Claude Code with a browser** (for live inspection):
   ```bash
   claude --chrome
   ```
4. **Run the skill**:
   ```
   /clone-website <url1> [<url2> ...] [--build astro|nextjs|none] [--slug <name>]
   ```
5. **Customize** (optional) — after the base clone is built, modify as needed.

Project instructions for the agent live in [`AGENTS.md`](AGENTS.md); [`CLAUDE.md`](CLAUDE.md) imports it.

## Prerequisites

- [Node.js](https://nodejs.org/) 24+
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) (Opus 4.8 recommended), with Chrome MCP or Playwright MCP available for live inspection

## Tech Stack

- **Astro 7** — default static page target, TypeScript strict
- **Vanilla CSS** — Astro consumes the emitted `tokens.css`; no Tailwind or shadcn
- **OpenDesign v1** — portable rich design-system package emitted on every run
- **Next.js 16 + React 19** — retained target under `templates/nextjs/`
- **Tailwind CSS v4 + shadcn** — Next-only, consuming emitted `tailwind-v4.css`

## How It Works

The `/clone-website` skill runs a multi-phase pipeline:

1. **Reconnaissance** — screenshots, design-token extraction, interaction sweep (scroll, click, hover, responsive)
2. **Design-system emission** — writes and validates `design-systems/<slug>/`
3. **Target foundation** — wires Astro to `tokens.css` or Next to the derived Tailwind cache
4. **Component specs + parallel build** — writes exact specs and dispatches one focused worktree builder per section/component
5. **Assembly** — composes Astro sections or retained Next components
6. **Visual QA** — runs desktop/mobile comparisons and interaction checks

Each builder agent receives the full component specification inline — exact `getComputedStyle()` values, interaction models, multi-state content, responsive breakpoints, and asset paths. No guessing.

Astro sections are static HTML by default. Only genuinely interactive sections
ship browser JavaScript, using progressive enhancement or a server-rendered island
with `client:visible` / `client:load`.

## Use Cases

- **Platform migration** — rebuild a site you own from WordPress/Webflow/Squarespace into a modern codebase
- **Lost source code** — your site is live but the repo is gone, the developer left, or the stack is legacy. Get the code back in a modern format
- **Design-system extraction** — capture a brand's tokens, type, spacing, and components as a portable design system
- **Learning** — deconstruct how production sites achieve specific layouts, animations, and responsive behavior by working with real code

## Not Intended For

- **Phishing or impersonation** — this project must not be used for deceptive purposes, impersonation, or any activity that breaks the law.
- **Passing off someone's design as your own** — logos, brand assets, and original copy belong to their owners. An extracted design system is aesthetic *inspiration*, not an official asset.
- **Violating terms of service** — some sites explicitly prohibit scraping or reproduction. Check first.

## Project Structure

```
src/
  pages/            # Astro routes
  components/       # Static-first Astro sections
  styles/           # Global reset + selected tokens.css import
public/
  images/           # Downloaded images from target
  videos/           # Downloaded videos from target
  seo/              # Favicons, OG images
docs/
  research/         # Extraction output & component specs
  design-references/ # Screenshots
  FORK-PLAN.md      # Fork direction & milestones
design-systems/     # Validated OpenDesign packages
templates/nextjs/   # Retained Next.js target and independent dependencies
.claude/skills/clone-website/SKILL.md  # The /clone-website skill (single source of truth)
AGENTS.md           # Agent instructions
CLAUDE.md           # Claude Code config (imports AGENTS.md)
```

## Commands

```bash
npm run dev           # Start Astro on port 4321
npm run build         # Build static Astro output
npm run lint          # Lint Astro source
npm run typecheck     # Check .astro and TypeScript files
npm run check         # Lint + typecheck + Astro build
npm run check:nextjs  # Check the retained Next.js target
```

### If using docker

```bash
docker compose up app --build # build and run the app
docker compose up dev --build # run the app in dev mode on port 3001
```

## License

MIT — see [LICENSE](LICENSE). Forked from [`JCodesMore/ai-website-cloner-template`](https://github.com/JCodesMore/ai-website-cloner-template).
