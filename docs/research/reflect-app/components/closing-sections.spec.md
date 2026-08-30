# Component spec: Closing stories and CTA

**Target:** `src/clones/reflect-app/components/ClosingSections.astro`  
**Reference:** `original-section-about.png`, `original-section-academy.png`, and `original-section-cta.png`

## Overview

The final narrative block contains three distinct conversion-supporting stories: company context, an educational academy offer, and a direct start-using-Reflect call to action.

## DOM structure

- `section#about` with about copy and decorative globe field.
- Academy section with learning copy, tiled game-like graphic, and action link.
- Closing CTA panel with final headline, short support line, and primary action.

## Styling contract

- About remains spacious and editorial, using an illuminated wireframe / node globe pushed into the surrounding darkness.
- Academy is playful but still aligned to the primary palette: thin white/lavender tile outlines, a large display heading, and no rainbow game UI.
- Final CTA is a broad, high-contrast lavender panel or glow field approximately 600 px in vertical impact, intentionally more conversion-forward than the preceding sections.

## States and behavior

- Academy and closing actions are links with clear labels, not inert buttons.
- Globe and tile motion is decorative only; CSS static/floating fallback is sufficient and must respect reduced motion.
- `#about` remains the destination for the header’s About link.

## Responsive behavior

- Stack each section’s copy and visual composition into one column at 780 px and below.
- Academy tiles may simplify but need to preserve their rectangular rhythm.
- The closing CTA must retain roomy vertical padding and a comfortably sized action control at 390 px.
