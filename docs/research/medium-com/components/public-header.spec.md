# PublicHeader specification

## Overview

- **Target file:** `src/clones/medium-com/components/PublicHeader.astro`
- **Screenshot:** `docs/design-references/medium-com/public-home-reference.png`
- **Interaction model:** click-driven on mobile, hover-driven on desktop

## DOM Structure

`header > wordmark anchor + desktop nav anchors + mobile details > summary + nav anchors`.

## Computed Styles (reconstruction values)

### Container

- display: flex; align-items: center; justify-content: space-between
- min-height: 72px desktop / 56px phone
- padding-inline: `7vw` desktop / `20px` phone
- background: `#f7f4ed`; border-bottom: `1px solid #242424`

### Wordmark

- font family: Newsreader Variable / Georgia fallback
- font size: 32px desktop / 20px phone
- font weight: 760; tracking: -0.045em

### Nav and primary action

- link: Inter 14px, near-black; gap 24px
- primary action: 40px minimum height, black fill, white text, full pill radius

## States & Behaviors

- Desktop link hover: opacity `1 → .58`, `150ms cubic-bezier(.2,0,0,1)`.
- Public action hover: translate Y `0 → -2px`, opacity `.9`.
- Phone summary click: native `<details>` menu opens below right edge; no animated clipping.

## Assets

None. The wordmark is text to preserve a crisp serif silhouette.

## Text Content (verbatim UI labels)

`Our story`, `Membership`, `Write`, `Sign in`, `Get started`.

## Responsive Behavior

- **Desktop:** all links visible as a row.
- **Tablet:** unchanged until 760px.
- **Mobile:** link row hides and details menu is shown.
