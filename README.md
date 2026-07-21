# AI Website Cloner — design-system-first (Claude Code fork)

A tool for reverse-engineering any website into a **portable design system** and a clean, modern codebase — driven **only by [Claude Code](https://docs.anthropic.com/en/docs/claude-code)** (Opus 4.8 recommended).

Point it at one or more URLs, run `/clone-website`, and Claude inspects the site, extracts design tokens, assets, and real content, writes component specs, and dispatches parallel builder agents in git worktrees to reconstruct every section.

> **This is a fork** of [`JCodesMore/ai-website-cloner-template`](https://github.com/JCodesMore/ai-website-cloner-template), being reshaped into a design-system-first, Astro-default, Claude-Code-only tool. Direction and milestones live in **[`docs/FORK-PLAN.md`](docs/FORK-PLAN.md)**.
>
> **Status:** the platform prune (Claude-Code-only) is complete. The OpenDesign design-system emitter and the Astro page-builder are in progress — today's `/clone-website` builds the pre-scaffolded **Next.js + shadcn/ui + Tailwind v4** base.

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
   /clone-website <target-url1> [<target-url2> ...]
   ```
5. **Customize** (optional) — after the base clone is built, modify as needed.

Project instructions for the agent live in [`AGENTS.md`](AGENTS.md); [`CLAUDE.md`](CLAUDE.md) imports it.

## Prerequisites

- [Node.js](https://nodejs.org/) 24+
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) (Opus 4.8 recommended), with Chrome MCP or Playwright MCP available for live inspection

## Tech Stack

- **Next.js 16** — App Router, React 19, TypeScript strict (current build target)
- **shadcn/ui** — Radix primitives + Tailwind CSS v4
- **Tailwind CSS v4** — oklch design tokens
- **Lucide React** — default icons (replaced by extracted SVGs during cloning)
- **Astro** — the fork's target default builder (in progress; see [`docs/FORK-PLAN.md`](docs/FORK-PLAN.md))

## How It Works

The `/clone-website` skill runs a multi-phase pipeline:

1. **Reconnaissance** — screenshots, design-token extraction, interaction sweep (scroll, click, hover, responsive)
2. **Foundation** — updates fonts, colors, globals, downloads all assets
3. **Component Specs** — writes detailed spec files (`docs/research/components/`) with exact computed CSS values, states, behaviors, and content
4. **Parallel Build** — dispatches builder agents in git worktrees, one per section/component
5. **Assembly & QA** — merges worktrees, wires up the page, runs a visual diff against the original

Each builder agent receives the full component specification inline — exact `getComputedStyle()` values, interaction models, multi-state content, responsive breakpoints, and asset paths. No guessing.

> **Where the fork is headed:** every run also emits a portable **OpenDesign** design system (`design-systems/<slug>/`), and the page can be built in **Astro** (default) or Next.js from that shared source of truth. See [`docs/FORK-PLAN.md`](docs/FORK-PLAN.md).

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
  app/              # Next.js routes
  components/       # React components
    ui/             # shadcn/ui primitives
    icons.tsx       # Extracted SVG icons
  lib/utils.ts      # cn() utility
  types/            # TypeScript interfaces
  hooks/            # Custom React hooks
public/
  images/           # Downloaded images from target
  videos/           # Downloaded videos from target
  seo/              # Favicons, OG images
docs/
  research/         # Extraction output & component specs
  design-references/ # Screenshots
  FORK-PLAN.md      # Fork direction & milestones
.claude/skills/clone-website/SKILL.md  # The /clone-website skill (single source of truth)
AGENTS.md           # Agent instructions
CLAUDE.md           # Claude Code config (imports AGENTS.md)
```

## Commands

```bash
npm run dev    # Start dev server
npm run build  # Production build
npm run lint   # ESLint check
npm run typecheck # TypeScript check
npm run check  # Run lint + typecheck + build
```

### If using docker

```bash
docker compose up app --build # build and run the app
docker compose up dev --build # run the app in dev mode on port 3001
```

## License

MIT — see [LICENSE](LICENSE). Forked from [`JCodesMore/ai-website-cloner-template`](https://github.com/JCodesMore/ai-website-cloner-template).
