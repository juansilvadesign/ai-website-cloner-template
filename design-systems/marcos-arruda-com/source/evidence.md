# Extraction evidence

## Origin and browser setup

- Source: `https://www.marcos-arruda.com/`
- Inspected: 2026-09-01 using the session Playwright browser backend.
- Master screenshots: `original-1440.png`, `original-768.png`, and `original-390.png`.
- Route discovery: `sitemap-inspection.json`, `route-sitemaps.json`, `static-route-inventory.json`, and `dynamic-project-inventory.json`.

## Verified visual values

- Accent: `rgb(238, 255, 3)` / `#eeff03`, captured in `root-color-evidence.json` for highlighted hero and footer spans.
- Muted dark-surface text: `rgb(227, 227, 227)` / `#e3e3e3`, captured in the home case-card descriptions.
- View Project action: `rgb(179, 191, 10)` / `#b3bf0a`, captured in `root-color-evidence.json`.
- Home name: Space Grotesk Wix display file, `38px` at 1440px; case-card title: `45px`; collaboration heading: `48px`.
- Reading copy: Avenir Light, `20px / 32px` on desktop; the long case-study pages follow the same family and high leading.
- Desktop content gutter: 72px at 1440px, represented as 5vw. Mobile primary text edge: about 12px at 390px.

## Asset and route provenance

- Font request evidence is recorded by Playwright network items 13–23: Avenir Light/Heavy, Space Grotesk Light/Medium/Bold, Poppins, and Roboto.
- The root includes one native looping fashion video, retained in the clone as a native muted loop.
- Case hero imagery, gallery items, favicon, and company marks are downloaded from published `static.wixstatic.com` / `video.wixstatic.com` URLs into the clone namespace.
- The source sitemap exposes `/about`, `/case1`, `/case2`, `/case3`, `/blank`, `/home-1`, `/portfolio`, `/blank-1`, and twelve `/portfolio/project-name-*` detail routes.

## Confidence notes

Several spacing tiers and the 64px display bridge are derived because Wix's individual layout wrappers make them difficult to expose as named CSS properties. They are explicitly marked `derived` in `tokens.source.json`; colors, font families, observed type sizes, and desktop/mobile gutters have direct browser evidence.
