# Spaceship extraction evidence

## Source and constraints

- Target: [https://www.spaceship.com/](https://www.spaceship.com/)
- Captured: 2026-08-28
- Browser constraint: direct Playwright navigation returned Cloudflare HTTP 403.
- Alternate source: a read-only public renderer returned the page’s rendered HTML,
  CSS bundle, public asset URLs, and a 1280px full-page screenshot.

## Retained evidence

- `docs/design-references/spaceship-com/original-pageshot.png` — full public
  desktop pageshot.
- `docs/design-references/spaceship-com/raw/reference-search-alt.png` — readable
  desktop hero comparison reference.
- `docs/research/spaceship-com/raw/homepage.css` — source homepage styles,
  including sticky/scroll transitions and breakpoints.
- `docs/research/spaceship-com/raw/global-tokens.css` — Spaceship color,
  typography, radius, elevation, and spacing variables.
- `docs/research/spaceship-com/raw/global.css` — source @font-face declarations.
- `docs/research/spaceship-com/raw/homepage.js` — source bundle asset inventory.

## Asset provenance

The clone stores supplied public CDN assets below `public/clones/spaceship-com/`:
hero backgrounds and figures, three benefit portraits, the security portrait,
product artwork, the Alf video, favicon, and Spaceship Sans weights. The
download list is reproducible with `node scripts/download-assets.mjs`.

## Confidence notes

Exact color, typography, radius, spacing, media, and motion values are high
confidence because they come from public CSS or rendered HTML. Scroll trigger
thresholds are inferred from source section heights because the direct browser
session was blocked before interaction replay. The implementation records that
limitation in `docs/research/spaceship-com/BEHAVIORS.md`.
