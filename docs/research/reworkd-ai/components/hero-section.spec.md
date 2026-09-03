# HeroSection specification

## Overview

- **Target file:** `src/clones/reworkd-ai/components/HeroSection.astro`
- **Screenshot:** `docs/design-references/reworkd-ai/original-section-hero.png`
- **Interaction model:** click-driven tabs plus light time-driven scan fallback

## DOM structure

- Pale-blue hero field with centered H1, supporting paragraph, and CTA.
- Mock-browser figure: source buttons, filter bar, data rows, code callout, and scanline.
- Investor proof with three local portraits and a compact monochrome logo rail.

## Computed styles

- Hero wrapper gradient: `#F1F6FF → #E8F1FF 40% → #E6E8FF 50% → #E3EDFF 60% → #FFF`; desktop top padding 148px.
- H1: Selecta 500, 80px / 76px, -2px tracking; bounding box 573px wide at 1440px. Mobile: 40px / 40px, centered in a 358px content width.
- Supporting copy: Suisse 16px / 24px; CTA box 147×38px with 6px radius.
- Browser outer frame: desktop y=506, 1088px visible content width / local 1216px band; 8px frame radius, 1px border, low shadow.
- Source tabs: 240×27px desktop, 6px radius; selected surface/border values recorded in `BEHAVIORS.md`.

## States and behaviors

- **Tabs:** button selection changes rendered heading, headers, rows, and active tab class. Default: Public Government Regulations.
- **CTA hover:** 10% white overlay over azure gradient in 200ms.
- **Scan fallback:** decorative CSS line moves across only the visible mock table; reduced-motion freezes it.

## Assets

- `/clones/reworkd-ai/images/paul-graham.png`
- `/clones/reworkd-ai/images/nat-friedman.png`
- `/clones/reworkd-ai/images/daniel-gross.png`

## Text content

- “End-to-end data extraction” (the second line is a blue treatment)
- “Effortlessly extract web data at scale. No code. No maintenance. No worries.”
- “Book an intro call”
- “Backed by the best”; Paul Graham / Co-founder, Y Combinator; Nat Friedman / Ex-CEO, GitHub; Daniel Gross / Co-founder, SSI.

## Responsive behavior

- **Desktop:** centered 573px text and broad browser table.
- **Tablet:** browser frame narrows without changing reading order.
- **Mobile:** top content begins below the notice, browser becomes a scroll-safe compact list, investor proof stays three across, and the logo rail wraps.
