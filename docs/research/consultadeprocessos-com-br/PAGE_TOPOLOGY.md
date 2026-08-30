# Consulta de Processos — Page Topology

**Source:** `https://consultadeprocessos.com.br/`  
**Route:** `/consultadeprocessos-com-br/`  
**Inspected:** 2026-08-29 with Playwright at 1440×960, 768×900, and 390×844.

## Global shell

1. Fixed white header (`z-index: 60`): desktop brand, product dropdown, three nav links, login, and CTA; phone brand, login, and menu control.
2. Main flow starts below the 70px desktop / 68px phone header. `html` has smooth scrolling.
3. Footer is independent after the 10 main sections.

## Main flow, top to bottom

| # | Section | Desktop topology | Phone topology | Interaction model |
| --- | --- | --- | --- | --- |
| 1 | Hero | 1336px container; 560px copy column plus layered 260px person/status illustration | Copy then 350×400 illustration | time-driven profile/status visual only; CTAs navigate |
| 2 | Court trust rail | 16 repeated court logos in an overflow-hidden 90px marquee | hidden below `md` | time-driven marquee |
| 3 | Attention / risk deck | 480px copy beside 500×240 overlapping four-card deck | copy then 350×200 deck | auto-rotating and dot-clickable deck |
| 4 | Hidden risks | 340px sticky narrative beside 2×2 illustrated cards | narrative then four stacked cards | desktop sticky narrative; static cards |
| 5 | Features | centered intro and 3×2 feature grid | centered intro and six stacked feature cards | hover-only icon/card detail |
| 6 | Workflow | centered intro; 340px step rail beside wide dashboard mockup | step rail then dashboard mockup | static demo and CTA |
| 7 | Industries | centered intro; 260px sticky vertical navigation beside 5 vertical cards | intro and five consecutive cards | scroll-driven active rail; button smooth-scroll on desktop |
| 8 | Social proof | quote/avatar group over four statistic tiles | quote/avatar group then 2×2 stats | static |
| 9 | Conversion CTA | 1176×570 patterned teal panel with centered copy/actions | 302×381 panel with stacked actions | links |
| 10 | FAQ | 320px sticky support narrative beside 9 accordion rows | support narrative then full accordion stack | click-driven accordion |
| 11 | Footer | two-level desktop footer and Instagram icon | stacked navigation/footer text | static links |

## Containment and fixed/sticky relationships

- Header: `position: fixed`, `top: 0`, full width, 70px at desktop and 68px at phone.
- Hidden-risks intro: desktop `position: sticky; top: 128px; width: 340px`.
- Industries rail: desktop `position: sticky; top: 112px; width: 260px`; teal 2px progress bar maps active section.
- FAQ intro: desktop `position: sticky; top: 128px; width: 320px`.
- All teal sections include a low-opacity patterned absolute layer behind content.

## Breakpoints

- `< 768px`: court-logo rail is hidden; large page groups stack into a single column; CTA actions become full-width; footer nav stacks.
- `768–1023px`: logo rail returns and interior sections have tablet density; header still uses mobile-oriented behavior where space is constrained.
- `>= 1024px`: desktop layout is active: full header nav, sticky sidebars, 2–3 column grids, 48/42/36px heading tiers, and larger paddings.

## Asset layering

- Hero uses a person image in a 3px white bordered 16px card, thin radial rays/marks, and small status chips over the photo.
- Hidden-risk cards use `effect-bg1.svg`, `effect-bg2.svg`, and `effect-bg3.svg` as decorative data/diagram layers.
- Workflow, risk deck, and industry cards are authored CSS product representations rather than bitmap screenshots.
- The social proof row uses the five local `user*.webp` avatars in an overlapping stack.
