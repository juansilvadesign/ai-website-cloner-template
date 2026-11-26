# MemoryCard Specification

## Overview
- **Target file:** `src/clones/zeromrr-club/components/home/MemoryCard.astro`
- **Source:** zeromrr.club/ — markup copied verbatim from the served HTML (ids/classes are script hooks)
- **Screenshot:** `docs/design-references/zeromrr-club/qa/original-1440.png`
- **Interaction model:** click-driven dialog

## DOM Structure
.mc > .mc-box (.mc-top .cube, h2, #mc-body filled by script)

## Computed Styles
Exact values live in the ported first-party stylesheet (`game.css` §memory card); nothing was re-measured or approximated. Brand variables alias the OpenDesign tokens (`--sodium → --accent`, `--ink → --fg`, …).

## States & Behaviors
See `../BEHAVIORS.md` (driven by the original script, unchanged).

## Text Content
Verbatim in the component file.

## Responsive Behavior
From the ported media queries: game ≤760px bottom sheet, ≤420px, ≤360px, ≤900px tall; playbook ≤860px single column.
