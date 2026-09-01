# Ruama Cori · Nutricionista — Extraction Evidence

**Target:** `https://bio.nutriruama.com.br/`  
**Inspected:** 2026-09-01  
**Method:** Playwright browser capture and computed-style extraction at 1440×1000, 768×1000, and 390×844; source CSS, metadata, DOM state, and public first-party asset inventory.

## Evidence boundary

The target is a public Brazilian Portuguese Next.js link hub. Untouched full-page source captures are stored at `docs/design-references/bio-nutriruama-com-br/original-1440.png`, `original-768.png`, and `original-390.png`. Menu evidence is stored at `menu-open-1440.png` and `menu-open-768.png`; the source’s exposed dark variant is captured in `original-dark-768.png`.

## Visible system

Computed source values identify `#F8F8F8` as the default canvas, `#280814` as main ink, `#C64B4B` as coral accent, `#DFDFDF`/`#ECECEC` as edges, and `#4E5944`/`#ABCC8E` as the protocol pairing. The live page uses Roxborough for display content, Adobe Typekit Degular for body/UI copy, and first-party Figtree, Montserrat, and Questrial fallback files. The public source CSS explicitly maps seven locally delivered Roxborough weights from 300 through 900.

## Layout evidence

At 1440px, the main grid is `584.094px 419.672px 372.234px` with 32px gaps; those widths derive from the source’s 714:513:455 fractional columns. The four center cards are 152.969px tall with 18px gaps, yielding a 665.875px high mosaic. At 390px, the grid is 358px wide with 20px inter-section gaps; the hero is 460px high, each center card is 180px high, and the protocol card uses a 455:803 aspect ratio.

## Interaction evidence

The page has light motion. A card’s hover shadow changes from `none` to `0 8px 30px rgba(0,0,0,.10)` over 150ms. The menu opens as a click-driven full-viewport overlay: its scrim is black at 20%, its panel is `rgba(248,248,248,.62)` with 27px backdrop blur and a 300ms opacity/transform transition. The theme control toggles the source’s `.dark` class; in dark mode the body becomes `#280814` with `#F7E9EC` ink. Scroll testing at 0px, 650px, and page bottom found no sticky, scroll-snap, or scroll-driven state changes. The public muted hero video autoplays but does not loop.

## Asset inventory

The clone mirrors 26 first-party assets under `public/clones/bio-nutriruama-com-br/`: 14 display/menu/card images, one hero video, favicon/OG image, three fallback WOFF2 fonts, and seven Roxborough OTF weights. The original Adobe Typekit `dpc3nvx` stylesheet is referenced rather than copied or rehosted, respecting its delivered license boundary.

## Confidence

The token source records high-confidence values directly observed from live `getComputedStyle()` or source-delivered CSS. Values required solely by the OpenDesign contract are noted as derived. The screenshot references and component specs document all visible layout, content, asset, responsive, and interaction states in scope.
