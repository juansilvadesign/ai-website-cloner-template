# TrustAndCta specification

## Overview

- **Target file:** `src/clones/reworkd-ai/components/TrustAndCta.astro`
- **Screenshot:** `docs/design-references/reworkd-ai/original-section-proof.png`
- **Interaction model:** static, hover-driven CTA

## DOM structure

- Dark full-bleed proof stage with a centered title and supporting copy.
- Three metrics with a large central azure number card.
- Axis testimonial, customer image/name, then an azure radial-gradient closing CTA card.

## Computed styles

- Source dark stage begins y≈4053; visible base `#272c30` with `rgba(0,0,0,.6)` terminal fade at desktop.
- Title: Selecta 40px / 44px, transparent text filled with `#FFF → #A6B4BA` 92-degree gradient.
- Metrics span the 1216px band. Central metric is 520×244px with `#284DCD → #1B2550` radial atmosphere; large number is 86px at xl.
- Quote is 696px wide on desktop, 40px-ish display reading scale, and has a 1px low-contrast divider before the attribution.
- Closing CTA surface is 1216px wide / 400px desktop with blue radial sweep, 16px corners, and a 36px pale call button.

## States and behaviors

- **Closing CTA hover:** pale call button changes raised shadow over 200ms ease-out.
- **Metrics:** source canvas wave lines are decorative fallback; static line texture preserves contrast without canvas.

## Assets

- `/clones/reworkd-ai/images/mishaal-al-gergawi.jpg`

## Text content

- “Rely on Reworkd” and “We've worked on application layer LLM agents since before their rise in 2023. Nearly every part of our technology stack has been built in house.”
- “30k” / Stars on GitHub; “533,029,180” / Rows of data extracted; “1M” / Users across our product suite.
- “Reworkd helps us download hundreds of thousands of regulation PDFs every month, saving us hundreds of hours in engineering time.” — Mishaal Al Gergawi, CEO of Axis.
- “It’s time to do data different” / “Book a call now”.

## Responsive behavior

- **Desktop:** metrics travel horizontally; quote remains right-weighted; CTA projects into footer.
- **Tablet:** metric card and quote compress safely.
- **Mobile:** metrics stack 30k → 533,029,180 → 1M, quote follows, CTA becomes an inset 358px panel with 40px display heading.
