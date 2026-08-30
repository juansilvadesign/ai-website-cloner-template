# Component spec: Pricing section

**Target:** `src/clones/reflect-app/components/PricingSection.astro`  
**Reference:** `original-section-pricing.png`

## Overview

A quiet, trust-building conversion section: a centred pricing heading and one large plan card that makes the price immediately legible.

## DOM structure

- `section#pricing` with descriptive heading and supporting copy.
- One plan article containing plan name, large price, cadence, included benefits, and a primary CTA.

## Styling contract

- The source gives this section roughly 1,256 px of vertical air; retain the spacious reveal rather than compressing it into a generic pricing grid.
- Price is the dominant visual token: about 72 px / 80 px on desktop in display type.
- Plan panel uses a dark translucent surface, a 1 px lavender-white border, large corner radius, and a restrained purple glow.
- Benefits are short and scannable, with check-like indicators that do not overpower the text.

## States and responsive behavior

- CTA is a real link styled as a lavender-filled rounded control; hover and focus add contrast without changing layout.
- There are no tabs, billing toggles, or plan selector in this clone because the source evidence presents a single primary plan.
- On mobile the card uses 16 px gutters and price steps down without becoming a multi-line visual break.
