# Capiá — extraction evidence

- **Target:** <https://capia-eta.vercel.app/>, the home page and only route (`lang="pt-BR"`).
- **Inspected:** 2026-11-24 with Playwright Chromium at device scale 1. Captures were taken at
  1440 × 900, 768 × 1024 and 390 × 844. No consent wall, login or theme toggle.
- **Stack signals:** a Vite build (`assets/index-*.js`, one `assets/index-*.css`), the Lenis smooth
  scroll library (`html.lenis`), vanilla JS and no framework. No canvas, WebGL, Lottie or video.
- **Primary evidence:** the first-party stylesheet `assets/index-Cl1L7_-h.css` (41 KB,
  hand-authored, Portuguese BEM class names) and script `assets/index-DrOw2l_V.js` (Lenis plus
  about 430 lines of page logic, including the full menu data model). Both were unminified with
  esbuild for reading only. Values in `tokens.source.json` cite the rule they come from.
- **Spot checks:** the live computed `body` background (`rgb(245, 237, 223)`), color
  (`rgb(22, 19, 15)`) and font stack matched the source declarations.

## Confidence notes

- **High:** every color, font stack, type size, radius, shadow, duration and easing is a literal
  declaration in the source stylesheet.
- **Derived:** `--muted` is charcoal at 60%, taken from the placeholder color. `--border` is the
  charcoal ring treatment. `--fg-2` and `--surface-warm` use the unused `--carvao-2`. The semantic
  slots `--success` (mate), `--warn` (cheddar) and `--danger` (tomate) are mapped onto brand hues
  because the site has no dedicated state colors. `--section-y-tablet` is interpolated from
  `--su`. `--focus-ring` restates the outline as a box shadow.
- **Fallback:** `--accent-hover` and `--accent-active` keep the OpenDesign defaults. No element on
  the site has a hover state while sitting on cheddar.

## Values outside the schema (kept as clone-local extensions)

The OpenDesign schema has no slot for these, so the page clone declares them in its own
`clone.css`, documented there:

- `tomate-claro` `#ff6b4d` and `mate-claro` `#93cf74`, the marquee words on charcoal.
- Mr Dafoe, the brush script, as a second font family.
- `pão-b` and `pão-c`, the second and third bread radii (`pão-a` is `--radius-sm`).
- `--su` (story unit), `--u` (menu stage unit) and `--rasgo` (torn-edge height): layout math,
  not tokens.
- The torn-edge mask (a 1440 × 44 SVG path data URI) and three river-stone clip paths.

## Licences

Bricolage Grotesque and Mr Dafoe are both SIL Open Font License fonts, distributed via
Google Fonts and Fontsource. The photographs, product renders, ingredient cut-outs and mascot
drawings belong to the site owner. The clone reuses them for emulation only.
