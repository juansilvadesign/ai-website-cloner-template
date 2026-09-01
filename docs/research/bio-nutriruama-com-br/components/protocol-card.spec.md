# ProtocolCard Specification

## Overview

- **Target file:** `src/clones/bio-nutriruama-com-br/components/ProtocolCard.astro`
- **Screenshot:** `docs/design-references/bio-nutriruama-com-br/original-1440.png`, `original-390.png`
- **Interaction model:** decorative time-driven CTA sheen; click produces no observed navigation or state change

## DOM Structure

`section.protocol-card > img + top-tab SVG/label + bottom-action div`. The card asset owns the tablet/food typography composition. The overlay adds only the white “Gratuito” top tab, green CTA button, and small supporting line.

## Computed Styles (exact values from getComputedStyle)

### Container

- 1440px: `372.234×665.875px`, `position: relative`, `height: 100%`, `background: rgb(78,89,68)`, `border-radius: 27px`, overflow hidden.
- 390px: `358×631.797px`, `aspect-ratio: 455 / 803`, `border-radius: 24px`.
- Source image fills the full panel: absolute inset 0; `object-fit: cover`.

### CTA

- 1440px: `326.438×48.125px`, `padding: 13.0282px 0`, `border-radius: 8.18916px`, `background: rgb(171,204,142)`, `color: rgb(78,89,68)`, `font-size: 14.7405px`, weight 600, `line-height: 22.1107px`, tracking -0.147405px.
- 390px: `313.953×46.281px`, `padding: 12.53px 0`, `border-radius: 7.876px`, font 14.1768px / 21.2652px.
- Shadow: `0 11px 4.85px rgba(0,0,0,.19)`.

### Supporting copy

- Desktop: 9.82699px / 14.7405px, tracking -0.393079px, `#F8F8F8`.
- Phone: scales from container query to 2.64cqw.

## States & Behaviors

### CTA sheen

- **Trigger:** time, with no user action required.
- **Before/after:** a 12%-wide white translucent skewed pseudo-element is offscreen/opaque 0, crosses left to right with peak opacity .82, then resets.
- **Timing:** `4.5s linear infinite`; source keyframe is `protocol-shine`.
- **Reduced motion:** sheen animation is disabled under `prefers-reduced-motion: reduce`.

### CTA hover and click

- **Hover:** opacity transitions 1 → .9 over 150ms cubic-bezier(.4,0,.2,1).
- **Click:** live clean-browser test found no popup, current-window navigation, or content state change. Preserve as `type="button"` without a synthetic destination.

## Per-State Content

N/A — the content never switches.

## Assets

- Artwork: `public/clones/bio-nutriruama-com-br/images/card-protocolo.webp`
- Top tab: semantic inline SVG/CSS shape, no downloadable separate asset.

## Text Content (verbatim)

- `Gratuito`
- `Garantir meu Protocolo`
- `Esse é um presente para você • 100% gratuito para seu progresso`
- Image alt: `Protocolo anti-inflamatório exibido em um tablet`

## Responsive Behavior

- **Desktop (1440px):** third grid column fills the 665.875px mosaic; 27px corners; bottom action is constrained to 87.7cqw.
- **Tablet (768px):** follows the single-column center-stack output; 736×1299px source aspect ratio.
- **Mobile (390px):** `455/803` panel aspect ratio with 24px corners; CTA stays inset at 87.7cqw.
- **Breakpoint:** desktop fill/27px corners activates at 1024px.
