# Website Inspection Guide

Use this checklist with `.claude/skills/clone-website/SKILL.md`. The skill owns
the full execution protocol; this guide defines the evidence an inspection must
leave behind before an OpenDesign package or page clone can be accepted.

## 0. Establish the run

- [ ] Parse `--build astro|nextjs|none` and the optional single-site `--slug`.
- [ ] Resolve one slug and one isolated artifact folder per URL.
- [ ] Select a browser backend: browser MCP by default; ego-browser only after
      explicit opt-in.
- [ ] Resolve a compatible OpenDesign checkout through `OPEN_DESIGN_ROOT` or
      `--od-root`.
- [ ] Record the source URL, inspection date, browser, device scale, and any
      authentication or consent state that changes what is visible.

For a single site, use these durable outputs:

```text
docs/research/
  PAGE_TOPOLOGY.md
  BEHAVIORS.md
  components/<name>.spec.md
docs/design-references/<slug>/
design-systems/<slug>/
```

For multiple sites, nest research and references by slug so no evidence or
component name can collide.

## 1. Capture master references

Before interacting with the page, capture full-page screenshots at exact
viewport widths:

- [ ] Desktop: 1440px
- [ ] Mobile: 390px
- [ ] Tablet inspection: 768px (a final comparison composite is not required)
- [ ] Dark/light theme variants when the target exposes them
- [ ] Any consent, loading, empty, error, modal, menu, or authenticated state in
      scope

Save the untouched original captures under
`docs/design-references/<slug>/`. Record the viewport height and device scale so
the clone can be captured identically during final QA.

## 2. Reconnaissance and behavior

### Global appearance

- [ ] Fonts: family, file/source, weight, style, computed usage, and license
      signal
- [ ] Colors: background, surface, foreground, muted, accent, semantic, border,
      focus, and state roles
- [ ] Type scale: size, line height, letter spacing, weight, and casing
- [ ] Spacing and section rhythm
- [ ] Radius, border, elevation, and focus treatment
- [ ] Containers, grids, breakpoints, sticky/fixed layers, overflow, and z-index
- [ ] Favicons, metadata, locale, social images, and webmanifest

Values come from `getComputedStyle()` or a source artifact, never visual
estimation.

### Mandatory interaction sweep

- [ ] Scroll slowly from top to bottom before clicking anything.
- [ ] Record sticky changes, reveal triggers, parallax, scroll snap, active-item
      changes, and smooth-scroll libraries.
- [ ] Click every button, tab, pill, card, menu, and control; extract every state
      and its real content.
- [ ] Hover and focus every likely interactive element; record before/after
      properties, duration, and easing.
- [ ] Observe timed behavior such as autoplay, carousels, cycling copy, and
      delayed entrance motion.
- [ ] Repeat responsive inspection at 1440px, 768px, and 390px.

Write the result to `BEHAVIORS.md`, including the exact trigger and transition
for each state.

### Motion triage

Classify the page at the top of `BEHAVIORS.md`:

- **Light:** CSS transitions and small hover states.
- **Moderate:** scroll reveals, sticky transitions, a carousel, or one prominent
  hero animation.
- **Heavy:** WebGL/canvas, chained GSAP timelines, particles, or many staggered
  effects.

Inventory Framer Motion, GSAP/ScrollTrigger, Lenis/Locomotive, canvas/WebGL,
Lottie, particles, and native video signals. For heavy pages, define the static
skeleton first and identify which irreducible effects will use a documented
video or screenshot fallback.

## 3. Map page topology

Write `PAGE_TOPOLOGY.md` from top to bottom:

- [ ] Every distinct section and sub-component
- [ ] Flow, fixed, sticky, overlay, and portal relationships
- [ ] Grid/column structure and container widths
- [ ] Section dependencies and shared UI
- [ ] Interaction model: static, click-driven, scroll-driven, hover-driven,
      time-driven, or combined
- [ ] Responsive reorder, hide/show, stack, and breakpoint behavior

This topology is the assembly blueprint. Do not begin page components yet.

## 4. Build the OpenDesign evidence

Map extracted values into
`design-systems/<slug>/source/tokens.source.json`. Each source entry needs:

- [ ] OpenDesign slot name
- [ ] Exact value
- [ ] Confidence: `high`, `derived`, or `fallback`
- [ ] Reason
- [ ] Source citation such as selector, stylesheet, or evidence line
- [ ] Light/dark theme ownership

Author the rich package evidence:

- [ ] `DESIGN.md` covers personality, color, typography, spacing/layout,
      components/states, motion, accessibility, and anti-patterns.
- [ ] `USAGE.md` contains Read Order, Design Highlights, Do, and Avoid.
- [ ] `components.html` demonstrates at least four component groups and uses
      only declared variables.
- [ ] `preview/colors.html`, `preview/typography.html`, and
      `preview/spacing.html` exist.
- [ ] `source/evidence.md` records provenance and uncertainty.

Emit and validate before page construction:

```bash
npx tsx scripts/emit-design-system.ts \
  --brand <slug> \
  --name "<Display name>" \
  --category "<Category>" \
  --od-root <open-design-root>

npm run check:design-system -- \
  --brand <slug> \
  --od-root <open-design-root>
```

Do not hand-edit `tokens.css`, `design-tokens.json`, `tailwind-v4.css`,
`components.manifest.json`, or other derived caches.

## 5. Inventory components, content, and assets

Write one `docs/research/components/<name>.spec.md` before dispatching each
builder. Every spec includes:

- [ ] Target file and screenshot path
- [ ] Semantic DOM hierarchy
- [ ] Exact computed styles by element
- [ ] Interaction model and all before/after states
- [ ] Trigger mechanism, threshold, transition, duration, and easing
- [ ] Verbatim text, labels, placeholders, alt text, and ARIA text
- [ ] Per-state content for tabs, accordions, menus, and carousels
- [ ] Desktop, tablet, and mobile layout behavior
- [ ] Exact asset paths, including layered backgrounds and overlays
- [ ] Fallbacks or deferred motion, if any

Asset inventory must cover images, `srcset`, CSS backgrounds, inline SVGs,
fonts, video sources/posters, favicons, OG images, and manifests. Download into
the selected target's `public/` tree with meaningful names.

Split a spec when its inline builder prompt would exceed roughly 150 lines.
Builders receive the complete spec inline and do not browse the target.

## 6. Inspect target fidelity

### Astro

- [ ] `src/styles/global.css` imports the selected package's `tokens.css`.
- [ ] Sections are semantic `.astro` components with scoped vanilla CSS.
- [ ] Static content ships without client JavaScript.
- [ ] Interactive content remains server-rendered and is progressively enhanced;
      no content-bearing `client:only` islands.
- [ ] All reusable visual values resolve through OpenDesign variables.

### Retained Next.js

- [ ] Work stays under `templates/nextjs/`.
- [ ] `DESIGN_SYSTEM_SLUG=<slug>` selects and syncs the emitted package.
- [ ] Components consume the synced OpenDesign Tailwind cache.
- [ ] Server Components remain the default; `"use client"` is interaction-only.
- [ ] No second token source appears in `globals.css` or component styles.

## 7. Final visual QA

After assembly, capture the original and clone at matching page state, device
scale, viewport height, and exact widths. Create these final artifacts:

```text
docs/design-references/<slug>/qa/
  original-1440.png
  clone-1440.png
  comparison-1440.png
  original-390.png
  clone-390.png
  comparison-390.png
```

Each `comparison-*.png` places the original and clone side-by-side. Review every
section top to bottom, fix the spec or implementation at the source, then
recapture both composites after the last correction.

Replay the interaction sweep against the clone: scroll, click, hover, focus,
timed motion, and responsive transitions. Record every deliberate difference
or fallback in `BEHAVIORS.md`.

## 8. Acceptance gates

Run these after the final visual correction:

```bash
# Always required, including --build none
npm run check:design-system -- \
  --brand <slug> \
  --od-root <open-design-root>

# Astro page
npm run check

# Retained Next.js page
DESIGN_SYSTEM_SLUG=<slug> npm run check:nextjs
```

The work is not done unless the fresh design-system guard passes. Page builds
also require a green selected-target check, final 1440px and 390px comparison
artifacts, a completed behavior replay, and explicit reporting of remaining
gaps.
