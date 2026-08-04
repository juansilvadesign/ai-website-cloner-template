# Fernanda Coelho Contact Card — Page Topology

## Run record

- **Source:** `https://fecoelho.com.br/card/`
- **Resolved slug:** `fecoelho-com-br`
- **Inspected:** 2026-08-04
- **Browser:** Chromium headless through Chrome DevTools Protocol
- **Device scale:** 1
- **Master viewports:** 1440×1000, 768×1024, 390×844
- **Consent/authentication state:** none
- **Theme states:** light and `prefers-color-scheme: dark`
- **Durable evidence:** `source.html`, `browser-evidence.json`, and `docs/design-references/fecoelho-com-br/original-*.png`

## Overall layout

The document has no application shell, header, fixed layer, portal, or JavaScript root. `body` is the page canvas and a flex centering container. It is at least `100dvh`, carries `28px 20px` safe-area-aware padding, and centers one `main.card` both horizontally and vertically. The card is `width: 100%` with a `420px` maximum and no background of its own.

At 1440 and 768 pixels wide, the card is exactly `420px` wide and `747.125px` tall. At 390 pixels wide, the `20px` body gutters leave a `350px` card. There is no layout breakpoint: width collapses fluidly. All captured viewport heights are taller than the padded card, so `scrollY` remains `0`; short viewports naturally scroll because body padding contributes to the document height.

## Visual order and ownership

1. **Page canvas** — flow root, flex centering, system-theme surface, radial accent glow. Interaction model: system/time-independent state (`prefers-color-scheme` only).
2. **Profile header** — flow content containing the gradient-ring portrait, `h1`, role, and tagline. Interaction model: static.
3. **Contact navigation** — flow content, five vertically stacked anchors. The first downloads a vCard; the remaining anchors open WhatsApp, LinkedIn, the website, or e-mail. Interaction model: hover + active + ordinary browser navigation/download.
4. **Brand footer** — flow text line containing a star and source-domain link. Interaction model: ordinary link activation; no custom transition.

## Layering and dependencies

- The radial glow is a body background layer: a `1200px × 600px` radial gradient centered at `50% -10%`, above the page background color.
- The portrait composition has two layers: a gradient `.avatar-wrap` and the local portrait image with a `3px` surface-colored border.
- Contact icons are inline SVGs colored through `currentColor`; no icon sprite, image font, or external icon library exists.
- The primary contact link uses an accent-to-purple gradient. Its child icon uses an 18% white tint.
- The design is token-dependent throughout; light and dark values switch together through the operating-system color preference.

## Responsive behavior

- **1440×1000:** `420px` card centered at x=510 and y≈126.44.
- **768×1024:** `420px` card centered at x=174 and y≈138.44.
- **390×844:** `350px` card centered at x=20 and y≈48.44.
- No elements hide, reorder, stack differently, or change type size at any inspected width.
- There is no tablet/mobile media query. Only the available inline width changes.

## Assembly blueprint

`src/pages/fecoelho-com-br/index.astro` composes `ProfileHeader`, `ContactLinks`, and `ContactFooter` inside one semantic `main.contact-card`. `ContactLinks` delegates the five exact glyphs to `ContactIcon`. `BaseLayout` owns the centered canvas, metadata, local fonts, color-scheme mirroring, and safe-area padding.
