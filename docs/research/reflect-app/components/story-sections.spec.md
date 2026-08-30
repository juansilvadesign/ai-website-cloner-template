# Component spec: Product-story sections

**Target:** `src/clones/reflect-app/components/StorySections.astro`  
**Reference:** `original-section-connected.png`, `original-section-research.png`, `original-section-meetings.png`, and `original-section-integrations.png`

## Overview

Five linked content modules demonstrate connected notes, research, encryption, meeting capture, and integrations. Each uses a text-first story beside or above a distinctive dark illustrative panel.

## DOM structure

- Semantic sections for Connected, Research, Encryption, Meetings, and Integrations; the final one owns `id="integrations"`.
- Each module contains an eyebrow or feature label, H2/H3, explanatory paragraph, and a visual panel.
- Decorative note nodes, grid, lock, calendar, integration marks, and radar layers are hidden from assistive technology.

## Styling contract

- Preserve wide vertical pacing: large whitespace before the Connected story and 110–290 px section padding through the series.
- Body background never changes from the near-black indigo canvas. Illustration panels build depth with 1 px translucent borders, subtle inner grids, and lavender glows.
- Connected uses linked node cards; Research uses a dim radar/search visual; Encryption uses a protected core; Meetings uses a calendar / meeting-note composition; Integrations uses a neat logo ecosystem.
- Type hierarchy follows the site system: bright Aeonik display headings, muted Inter explanatory paragraphs, no oversized decorative labels.

## States and behavior

- These are reading modules, not interactive carousels. Do not give the graphics fake controls.
- Minor glow and float effects are optional decorative enhancement only; reduced-motion must remove them.
- The Integrations section is the header destination for the integrations navigation item.

## Responsive behavior

- On desktop, arrange copy and diagram as balanced two-column compositions with a roomy centre gap.
- At 780 px and below, stack copy then visual, reduce section gutters to 16 px, and keep diagrams within the viewport.
- Visual labels must remain readable or be removed when purely decorative; never rely on a diagram to convey the heading’s core claim.
