# Adspirer page topology

Source: `https://www.adspirer.com/`, captured 2026-08-28 at 1440px, 768px, and 390px widths. Raw measurements and state captures live in `raw/`.

| Order | Region | Desktop shape | Phone shape | Primary evidence |
| --- | --- | --- | --- | --- |
| 1 | Header | 97px light header; logo, centered nav, two CTAs | 72px header; logo and menu button | `raw/adspirer-component-styles-1440.json`, `raw/adspirer-responsive-390.json` |
| 2 | Hero | Soft peach/lilac/blue field, centered copy, AI workspace demo | Copy narrows to 40px heading; fixed visual demo below CTA | `original-1440.png`, `original-390.png` |
| 3 | Social proof | Three equal logo columns on white | Three vertically stacked logo groups | responsive captures |
| 4 | Featured work | Intro with a 2×2 asymmetric product-card grid | Intro then four stacked cards | original screenshots |
| 5 | Agent workspace | Centered title, platform pill-tabs, large framed guide panel | Horizontally scrollable tabs and compact guide panel | `raw/adspirer-workspace-codex-state.json` |
| 6 | Ad platforms | Quiet gray section with continuous logo marquee | Same visual rhythm, compressed vertically | `raw/adspirer-global.json` |
| 7 | Benefits | Three large, alternating illustrated step cards | Static three-card vertical sequence | original screenshots |
| 8 | Setup | Three pale-blue cards describing activation steps | Cards stack with generous gap | original screenshots |
| 9 | Ask AI | Full-width saturated blue rounded card | Same card, copy wraps to two lines | original screenshots |
| 10 | Pricing | Billing toggle, four plan cards, Enterprise callout | Toggle then four stacked cards and callout | `raw/adspirer-pricing-monthly-state.json` |
| 11 | Final CTA | Oversized offset headline on airy gradient field | Centered compact rendition | original screenshots |
| 12 | Footer | Multi-column links, contact detail, oversized wordmark | Link groups stack, then oversized wordmark | original screenshots |

## Layout invariants

- Desktop content aligns to a 1280px maximum container with approximately 80px outer gutters at 1440px.
- The responsive breakpoint is 992px: desktop navigation is replaced by a menu control below it.
- Phone gutters are 20px. Sections deliberately retain large vertical pauses rather than collapsing into a dense document.
- `#f6f8fa` is the page field; white alternates it for proof and setup blocks. Panels use white with soft gray-blue borders.
- The page has no canvas or video dependency. All necessary visual material can be rebuilt as HTML, CSS, SVG, and captured public assets.
