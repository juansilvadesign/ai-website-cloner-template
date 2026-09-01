# SiteFooter Specification

## Overview

- **Target file:** `src/clones/bio-nutriruama-com-br/components/SiteFooter.astro`
- **Screenshot:** `docs/design-references/bio-nutriruama-com-br/original-1440.png`, `original-390.png`
- **Interaction model:** static

## DOM Structure

`footer > p`, centered in normal document flow after the main mosaic.

## Computed Styles (exact values from getComputedStyle)

### Container

- 1440px: `1440×80px`, `padding: 32px 16px`, text centered, transparent background.
- 390px: `390×64px`, `padding: 16px 16px 32px`.
- In light mode: primary source ink `#280814`; in dark mode the inherited foreground follows the dark token values.

### Text

- Source body family: Degular/Figtree fallback stack.
- Base inherited size is 16px / 24px; rendered footer copy is visually compact and centered.

## States & Behaviors

N/A — the footer has no click, hover, timed, or scroll-driven state.

## Per-State Content

N/A.

## Assets

`created-by-dudes.svg` appears as a compact right-aligned credit on desktop; it is omitted below the desktop breakpoint.

## Text Content (verbatim)

`Todos os Direitos Reservados © Ruama Cori · 2026`

## Responsive Behavior

- **Desktop (1440px):** 80px vertical slot below the main composition.
- **Tablet (768px):** follows the normal stacked document flow.
- **Mobile (390px):** 64px slot with 16px top and 32px bottom padding.
- **Breakpoint:** source switches its footer vertical padding at 1024px.
