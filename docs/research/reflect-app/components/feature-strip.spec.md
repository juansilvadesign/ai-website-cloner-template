# Component spec: Feature strip

**Target:** `src/clones/reflect-app/components/FeatureStrip.astro`  
**Reference:** lower portion of `original-section-hero.png`

## Overview

A concise grid of product capabilities immediately after the hero preview. It converts the dramatic introduction into quick scannable proof points.

## DOM structure

- Section with an accessible heading or label context.
- Repeated feature articles, each containing a compact symbolic icon, short title, and one-line explanation.

## Styling contract

- Desktop container sits near 1,200 px wide and overlaps / follows the hero transition with a dark glass-like surface.
- Use a faint 1 px grid rule and generous 24–32 px internal padding.
- Icons are small white/lavender line treatments, never dominant illustrations.
- Title and description rely on contrast hierarchy: bright text first, muted text second.

## States and responsive behavior

- Cards are informational, not buttons; do not invent click behavior.
- At narrow widths, use two columns where viable and ultimately a single stack, preserving cell borders and reading order.
- Maintain at least 44 px of comfortable tap clearance around adjacent actionable content even though these cards themselves are static.
