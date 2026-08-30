# Reflect extraction evidence

## Source and capture conditions

- Target: `https://reflect.app/`
- Date: 2026-08-29
- Browser: Playwright Chromium
- Desktop reference: 1440 × 900, CSS pixels, full-page capture
- Tablet inspection: 768px wide
- Phone reference: 390 × 844, CSS pixels, full-page capture
- Authentication: none; public marketing page only

## Global evidence

The live page has a fixed 88px `.header` with `backdrop-filter: blur(16px)` and
an `rgba(3, 0, 20, 0.08)` background. The body declares `#030014`. Computed
heading styles identify AeonikPro Medium at 72/80, 56/64, 48/56, and 32/40;
Inter V is the 16/24 reading, 14/20 navigation, badge, and control face.

The live stylesheet provides first-party font sources under `/home/fonts/` and
the logo, hero preview, hero video, favicon, and social image under public
Reflect hosts. The asset manifest in `scripts/download-assets.mjs` downloads
those files to the clone-local public tree.

## Interaction evidence

The header remains fixed and visually stable between `scrollY = 0` and `720`.
The AI showcase is click-driven: “Click to see magic” changes the visible prompt
to a generated answer and reveals action controls. The original hero play target
opens a modal; the static clone preserves a lightweight accessible modal fallback.
Buttons and links use short lavender color/background transitions. The original
also contains canvas elements and long-running star/ring/radar/tetris animation;
those are documented as decorative fallback motion in `docs/research/reflect-app/BEHAVIORS.md`.

## Token confidence

Every A1 token is taken from a computed value or a direct CSS declaration except
for `--tracking-display`, which is a visual interpolation from the Aeonik hero.
Derived surface, semantic, focus, and elevation values are deliberately marked in
`tokens.source.json`; they support a complete portable contract where the live
marketing page exposes no distinct semantic states.
