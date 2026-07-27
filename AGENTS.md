<!-- BEGIN:nextjs-agent-rules -->
# The retained Next.js target is version-specific

Before editing `templates/nextjs/`, read the relevant guide in
`templates/nextjs/node_modules/next/dist/docs/`. APIs and conventions may differ
from training data. This rule does not apply to the Astro root.
<!-- END:nextjs-agent-rules -->

# Website Reverse-Engineer Template

## What This Is
A **design-system-first** website reverse-engineer, driven **only by Claude Code**. Point it at one or more URLs; it extracts the target's design system — screenshots, computed styles, assets, real content — and serializes that into a portable **OpenDesign** package, then (optionally) rebuilds the page from it in **Astro** (the target default) or **Next.js** (retained).

This is version 0.4.0 of a hard fork of [`JCodesMore/ai-website-cloner-template`](https://github.com/JCodesMore/ai-website-cloner-template), reshaped per [`docs/FORK-PLAN.md`](docs/FORK-PLAN.md). The Claude-Code-only workflow, OpenDesign emitter and final guard, Astro default, retained Next.js target, and 1440px/390px visual-QA contract are shipped. Run `/clone-website <url1> [<url2> ...] [--build astro|nextjs|none] [--slug <name>]`.

## Tech Stack
- **Default framework:** Astro 7, static output, TypeScript strict
- **Default styling:** vanilla scoped CSS consuming `design-systems/<slug>/tokens.css`
- **Retained target:** Next.js 16 + React 19 + shadcn + the emitted `tailwind-v4.css`
- **Design system:** OpenDesign v1 rich package, always emitted and validated
- **Deployment:** static Astro output in `dist/` (Docker serves it with nginx)

## Commands
- `npm run dev` — Start the Astro dev server
- `npm run check` — Lint + Astro/script typechecks + static production build
- `npm run check:design-system -- --brand <slug>` — Run OpenDesign's guard
  checks against one emitted package
- `npm run check:nextjs` — Validate the retained Next.js target
- `npm run check:release` — Check Astro, the PsiAtiva reference package, and
  retained Next.js
- `npm run build` — Build Astro into `dist/`
- `npm run preview` — Preview the Astro production build

## Code Style
- TypeScript strict mode, no `any`
- PascalCase components, camelCase utilities
- Astro: semantic HTML, scoped vanilla CSS, OpenDesign variables, no Tailwind
- Next.js: utilities from the synced OpenDesign Tailwind cache; no duplicate tokens
- Static-first: hydrate only genuinely interactive islands
- 2-space indentation
- Responsive: mobile-first

## Design Principles
- **Pixel-perfect emulation** — match the target's spacing, colors, typography exactly
- **No personal aesthetic changes during emulation phase** — match 1:1 first, customize later
- **Real content** — use actual text and assets from the target site, not placeholders
- **Beauty-first** — every pixel matters

## Project Structure
```
src/
  pages/            # Astro routes
  components/       # Static-first Astro sections
  styles/           # Global reset + selected tokens.css import
public/
  images/           # Downloaded images from target site
  videos/           # Downloaded videos from target site
  seo/              # Favicons, OG images, webmanifest
docs/
  research/         # Inspection output (design tokens, components, layout)
  design-references/ # Screenshots and visual references
scripts/            # Asset download scripts
design-systems/     # Validated OpenDesign packages
templates/nextjs/   # Complete retained Next.js target + independent lockfile
```

## MOST IMPORTANT NOTES
- When launching Claude Code agent teams, ALWAYS have each teammate work in their own worktree branch and merge everyone's work at the end, resolving any merge conflicts smartly since you are basically serving the orchestrator role and have full context to our goals, work given, work achieved, and desired outcomes.

@docs/research/INSPECTION_GUIDE.md
