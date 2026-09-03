# Reworkd page topology

Source: <https://www.reworkd.ai/>  
Captured: 2026-09-02  
Clone route: `/reworkd-ai/`

## Evidence set

- Desktop master: `docs/design-references/reworkd-ai/original-1440.png` — 1440 × 1000 CSS px viewport
- Tablet inspection: `docs/design-references/reworkd-ai/original-768.png` — 768 × 1024 CSS px viewport
- Phone master: `docs/design-references/reworkd-ai/original-390.png` — 390 × 844 CSS px viewport
- Section captures: `original-section-{hero,problem-solution,features,proof,footer}.png`

## Desktop map

| Order | Source landmark | Approx. y-range | Structure and interaction | Clone component |
| --- | --- | ---: | --- | --- |
| 1 | Fixed sunset notice | 0–56 | Black fixed announcement, mail link | `SiteHeader.astro` |
| 2 | Fixed navigation | 72–124 | Logo, five desktop links, sign-up; shifts lower on scroll | `SiteHeader.astro` |
| 3 | Hero | 0–1,156 | 80/76 display, azure word treatment, CTA, click-selected mock-browser data sources | `HeroSection.astro` |
| 4 | Backing proof | 1,213–1,339 | Three investor portraits and five-logo rail | `HeroSection.astro` |
| 5 | Problem | 1,491–2,161 | Centered issue statement, animated-looking question fragments | `ProblemSolution.astro` |
| 6 | Solution + benefits | 2,161–2,884 | Left story, hoverable browser image on right, three benefit cells | `ProblemSolution.astro` |
| 7 | Futuristic features | 2,884–4,045 | Centered copy then a desktop 3-column/2-row feature grid | `FeaturesGrid.astro` |
| 8 | Proof, quote, CTA | 4,053–5,686 | Dark stage, three metrics, Axis quote, blue closing card | `TrustAndCta.astro` |
| 9 | Footer | 5,686–6,111 | Brand/address, three link groups, legal/status row | `SiteFooter.astro` |

## Layout rules

- The source’s live document is one regular scroll column; announcement and header are the only fixed layers.
- The 1344px desktop container has 64px inner padding and yields a 1216px working band. A 48px outer visual margin remains at 1440px.
- Hero and feature zones begin full-bleed; their content centers within the shared container.
- The problem/solution transition is a full-width cool gradient. The right browser illustration is absolutely positioned at desktop and removed from normal reading order.
- The feature grid uses a 3-column desktop mosaic: the dark extractor card spans two columns on the first row, then three ordinary cards complete the lower row.
- The proof stage is dark from y≈4053px through the CTA card, which projects below the dark background into the white footer.

## Responsive topology

| Width | Header | Main content | Grid / proof | Footer |
| --- | --- | --- | --- | --- |
| 1440px | Logo, desktop links, sign-up | Hero browser wide; solution is copy + visual | 3 benefits; 2×3 feature mosaic; horizontal metrics | Brand left, links in three columns right |
| 768px | Compact container; desktop content begins simplifying | Content band narrows; visual frames remain readable | Benefits and feature cells start reducing density | Link columns stay grouped |
| 390px | Logo + menu trigger; announcement wraps to 100px | Display becomes 40px; browser and solution stack | One-column benefits and a five-card stack; metrics vertical | Navigation / Other then Social stack below |

## Asset provenance

All fetchable source assets live below `public/clones/reworkd-ai/`: portraits, source-browser art and overlay, product card photo, customer portrait, fonts, favicon, apple icon, and Open Graph image. Canvas-based scanline, analytics, and waveform details are decorative source effects; the Astro target uses CSS/static fallbacks recorded in `BEHAVIORS.md`.
