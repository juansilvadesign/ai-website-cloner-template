# The Complete Shelf — Extraction Evidence

**Target:** `https://play.mint.gg/_experiences/complete-shelf/index.html`  
**Extracted:** 2026-07-31  
**Theme:** light only  
**Motion tier:** heavy WebGL experience

## Sources

1. The embedded experience's server-rendered DOM, metadata, and nineteen
   catalog-position controls.
2. Its authored stylesheet
   `/_experiences/complete-shelf/_next/static/chunks/1jwqp2nxu7487.css`.
3. A Chromium capture at 1440×900 with device scale factor 1.
4. The public 1200×630 social card for material and camera-art-direction
   cross-checking.

## Authored Ground Truth

The source declares:

```css
--paper: #eee8db;
--paper-deep: #e4dccd;
--paper-light: #f6f1e7;
--ink: #25231f;
--ink-soft: #25231f9e;
--hairline: #25231f30;
--accent: #a74735;
--serif: "Newsreader Variable", "Iowan Old Style", Georgia, serif;
--sans: "Inter Variable", Inter, Helvetica, Arial, sans-serif;
```

The package maps these authored values to the nearest shared OpenDesign roles.
Opaque secondary text and border tiers are composited equivalents over the
paper background because OpenDesign tokens must remain useful as standalone
colors.

## Responsive Evidence

- Default details panel: `min(620px, 41vw)`.
- Tablet details panel at 1020px: `min(570px, 48vw)`.
- Mobile switch at 760px.
- Mobile details sheet: `min(49dvh, 500px)`.
- Desktop browse title: `clamp(37px, 4.4vw, 72px)`.
- Desktop inspection title: `clamp(42px, 4.35vw, 70px)`.

## Motion Evidence

- Canvas reveal: `900ms cubic-bezier(.22, 1, .36, 1)`.
- Caption focus handoff: `420ms` opacity plus `520ms` transform.
- Details focus handoff: `420ms` opacity plus `620ms` transform.
- Marker and control hover: `220–260ms`.
- Reduced motion collapses animations and transitions to approximately `1ms`.

## Confidence

High-confidence values are direct authored declarations or exact CSS values.
Derived values are clearly labeled in `tokens.source.json`; none are visual
guesses required to imitate an absent dark theme or unsupported state.

Per-book cover colors and Mint-generated PBR materials are deliberately absent
from the design-system tokens. They belong to catalog and asset data, while the
package owns the application shell.

