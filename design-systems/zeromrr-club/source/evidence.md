# Evidence — zeromrr-club

- **Sources:** `https://zeromrr.club/` (home game, script v3.45, catalog `tees.js` v3.45,
  `i18n.js` v3.42) and `https://playbook.zeromrr.club/playbook`. Captured 2026-11-26 in Playwright
  Chromium at device scale 1, 1440×900 and 390×844.
- **Method:** Both pages are hand-written static HTML with inline `<style>` blocks, so every token
  comes from reading the first-party stylesheet directly. Each value's `:root` declaration or rule
  is cited in `tokens.source.json`. The game's own comments name the roles ("cream print ink =
  primary text", "sodium street light = accent", "HUD green = success").
- **High confidence (50):** colours, fonts, the type scale, spacing, radii, shadows, focus and
  motion durations, all read verbatim from the CSS.
- **Derived (3):** `--warn` (no warning hue exists; sodium does the nudging) and
  `--section-y-tablet` / `--section-y-phone` (the playbook never overrides its 72px section rhythm).
- **Two grounds:** the playbook declares its own palette (`--bg:#0a0b0f`, `--panel:#13151c`,
  `--ink:#f3efe6`, `--dim:#a9afbf`, `--fog:#c3cbe0`, `--edge:#5d7fe0`) and uses Inter instead of
  Chakra Petch. The package takes the game's values as canonical and the playbook's panel, warm
  panel, container and section rhythm as its editorial surface. `DESIGN.md` records the difference.
- **Uncertainty:** the game's rendered look depends on a WebGL scene (three.js r1xx, minified) and
  30 inline webp images: the garage backgrounds and per-tee character renders. Those are assets,
  not tokens. `--radius-sm: 0` is true for the game, while playbook buttons are also square, so it
  holds for both pages.
