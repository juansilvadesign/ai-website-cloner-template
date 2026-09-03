# Reworkd extraction evidence

## Source and capture conditions

- Target: `https://www.reworkd.ai/`
- Extraction date: 2026-09-02
- Browser: Playwright Chromium
- Desktop master: 1440 × 1000 CSS pixels, full-page capture
- Tablet inspection: 768 × 1024 CSS pixels
- Phone master: 390 × 844 CSS pixels, full-page capture
- Authentication: none; public marketing home page

## Global evidence

The live body resolves to Suisse Intl at 16px/24px with `rgb(39, 44, 48)` foreground. Selecta Medium is the hero and section display face: the desktop H1 measures 80px with a 76px line-height and -2px tracking. Geist Mono supplies 12px/20px technical labels. The source hosts seven downloadable first-party font files beneath `/_next/static/media/`; the asset profile copies them into this clone’s namespace.

At 1440px, the live outer container is 1344px with 64px horizontal inner padding, yielding a 1216px visual content band. On the 390px source it is 390px wide with 16px padding. The opening field uses a `#F1F6FF → #E3EDFF → #FFF` vertical gradient; the problem zone uses a white / cool-gray / pale-blue / white transition; the proof zone begins at y≈4053px with `#272C30` and a dark vertical fade.

## Asset evidence

The clone-local asset profile contains the three investor portraits, the hoverable source browser and its modal overlay, a product-card photograph, the customer portrait, favicon, apple icon, Open Graph image, and all source-loaded font resources. There are no native video elements on this page. Nine source canvases render decorative scanlines, charts, or text effects; those are documented as static-first CSS fallbacks rather than a copied runtime dependency.

## Interaction evidence

The hero mock browser is click-driven. Its three controls switch between Careers, Public Government Regulations, and YC Startup Directory content; the selected control has `rgb(227, 232, 234)` fill and `rgb(203, 211, 214)` border while inactive controls use `rgb(244, 247, 247)`. The analytics mini-panel has three click-selected source pills. The hero CTA hover adds a 10% white top overlay over its blue gradient in 200ms. The problem browser’s hover overlay changes opacity 0→1 over 700ms and uses a 2.5px backdrop blur.

The header is fixed below a fixed announcement. At desktop, it shifts from 8px to 24px vertically after scroll; the source’s mobile menu trigger sits visually beneath the announcement hit area, so the clone preserves the presentation while raising the trigger above it to retain usable keyboard and pointer access.

## Token confidence

All identity and structural tokens are taken from live computed styles, first-party class declarations, or exact capture geometry. Semantic `--success`, `--warn`, `--danger`, and the focus ring complete the portable OpenDesign contract; source evidence for success/cancelled status chips informed the semantic mapping and these deliberate derived values are marked in `tokens.source.json`.
