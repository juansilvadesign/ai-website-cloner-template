# Fernanda Coelho Contact Card — Extraction Evidence

**Target:** `https://fecoelho.com.br/card/`  
**Inspected:** 2026-08-04  
**Browser:** Chromium headless through Chrome DevTools Protocol  
**Viewports:** 1440×1000, 768×1024, 390×844 at device scale 1  
**Themes:** light and `prefers-color-scheme: dark`

## Sources and method

The target is a static GitHub Pages document with its complete CSS embedded in the HTML. `docs/research/fecoelho-com-br/source.html` is the fetched source snapshot and supplies line-stable authored values. `browser-evidence.json` contains independent `getComputedStyle()` trees, bounding rectangles, metadata, asset inventory, link inventory, motion signals, and interaction-state samples for every inspected viewport/theme.

Master captures are stored in `docs/design-references/fecoelho-com-br/` as `original-1440.png`, `original-768.png`, `original-390.png`, `original-dark-1440.png`, and `original-dark-390.png`. The page was captured after `document.fonts.ready` and a settling delay.

## Palette evidence

All light and dark palette values are authored custom properties in `source.html:24-55` and were byte-for-byte confirmed through computed background, foreground, border, gradient, and shadow styles. The schema mapping is role-based:

- source `--bg-elev` → OpenDesign `--surface`
- source `--bg-soft` → OpenDesign `--surface-warm`
- source `--ink` → OpenDesign `--fg`
- source `--ink-soft` → OpenDesign `--fg-2`
- source `--ink-mute` → both `--muted` and `--meta`
- source `--line` → both `--border` and `--border-soft`
- source `--accent-2` → `--accent-hover`, preserving the target's second accent in a shared schema slot

The target does not render a filled-accent hover color. `--accent-active` is consequently marked derived and is not used by the clone's observed states.

## Typography and font provenance

`source.html:19-21` requests Inter 400/500/600 and Space Grotesk 500/600/700 through Google Fonts. Computed styles show Inter 400/500/600 and Space Grotesk 700 actually rendered; unused Space Grotesk weights were not declared locally. Chrome receives one variable WOFF2 Latin subset per family, so the clone mirrors those two exact files and declares only the four used faces under `public/clones/fecoelho-com-br/fonts/`.

The Latin subset includes U+2193 (`↓`) but not U+2197 (`↗`). Preserving the original `unicode-range` is load-bearing: it makes the external-link arrows fall back to the same system glyph as the target. A first QA capture using full TTF files differed in exactly those four glyphs; the Chrome-specific WOFF2 subset removed that discrepancy.

The target's Google Fonts distribution is the license signal. Exact family, weight, size, line-height, and tracking were verified from the rendered DOM. Six sizes are observed. The OpenDesign contract requires eight monotonic tiers, so 20px and 24px are explicitly marked derived bridge values and are not used to reproduce the card.

## Spacing, radius, and elevation evidence

The source uses 1, 3, 4, 8, 12, 14, 15, 18, 20, 21, 26, 28, 40, 124, 132, and 420px values. Reusable spacing slots capture the eight base intervals that recur or compose the rest: 1, 4, 8, 12, 14, 20, 28, and 40px. Component-only dimensions (portrait/image size and 21px SVG size) remain scoped layout facts.

There are exactly two non-none shadows. Default contact links use the smaller shadow and the portrait/hover state use the larger shadow. They map to `--elev-ring` and `--elev-raised` respectively. This intentionally prioritizes observed tiers over the generic “ring” label.

## Interaction evidence

The browser sweep found zero scripts, animations, canvases, videos, smooth-scroll libraries, timed states, and scroll transitions. `browser-evidence.json.interaction` records default, hover, active, focus-visible, and scroll samples. Headless Chromium reports `(hover: none)`; to resolve the desktop-only rule, the authored declaration from `source.html:144-146` was temporarily promoted to an equivalent class, after which `getComputedStyle()` returned the final shadow and mixed border value. No production DOM or screenshot contains that inspection class.

## Confidence summary

All required A1 identity and structure slots are sourced from observed values except the two unused type bridge slots (`--text-2xl`, `--text-3xl`), which are derived. Three A2 slots are also derived because the source lacks those semantic states: `--accent-active`, `--radius-lg`, and `--focus-ring`. OpenDesign defaults supply the unused semantic success/warn/danger colors and monospace stack during emission. Every other authored source entry is high confidence.

## Asset inventory

- `images/fernanda-avatar.jpg` — exact 512×512 target portrait.
- `seo/og-image.jpg` — exact 1200×630 Open Graph image.
- `fernanda-coelho.vcf` — exact 325-byte contact card.
- `fonts/inter-latin.woff2`, `space-grotesk-latin.woff2` — exact Chrome-delivered Latin subsets used by four declared font faces.
- `seo/favicon.svg` — decoded equivalent of the source data-URL star favicon.
- Five inline semantic SVG glyphs — contact, WhatsApp, LinkedIn, globe, and mail.

The download harness lives at `docs/research/fecoelho-com-br/download-assets.mjs`; it uses batches of four and fails explicitly on any missing response.
