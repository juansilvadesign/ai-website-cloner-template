# ProfileHeader Specification

## Overview

- **Target file:** `src/clones/fecoelho-com-br/components/ProfileHeader.astro`
- **Desktop screenshot:** `docs/design-references/fecoelho-com-br/profile-header-1440.png`
- **Mobile reference:** `docs/design-references/fecoelho-com-br/original-390.png`
- **Interaction model:** static; system color scheme changes token values only
- **Evidence:** `browser-evidence.json` card trees for `light-1440`, `light-390`, and `dark-1440`

## DOM Structure

`header.profile-header` contains, in this order:

1. `div.avatar-wrap`
2. `img.avatar`
3. `h1.name`
4. `p.role`
5. `p.tagline`

The image is the only child of `avatar-wrap`. No decorative element or pseudo-element is needed.

## Computed Styles (exact values from getComputedStyle)

### Header flow

- display: block
- width: 420px desktop/tablet; 350px mobile through parent width
- total visible span: 242.15625px (avatar top through tagline bottom)
- text-align: center (inherited from page card)

### `.avatar-wrap`

- width / height: 132px
- margin: `0 auto 20px`
- padding: 4px
- border-radius: 50%
- background: `linear-gradient(135deg, rgb(209,85,59), rgb(107,75,214))`
- box-shadow: `rgba(25,20,16,.04) 0 1px 2px, rgba(25,20,16,.08) 0 12px 32px`
- dark background endpoint colors: `rgb(240,113,79)` → `rgb(156,133,240)`
- dark shadow: `rgba(0,0,0,.3) 0 1px 2px, rgba(0,0,0,.45) 0 16px 40px`

### `.avatar`

- rendered width / height: 124px
- display: block
- border: 3px solid rgb(255,255,255); dark rgb(26,22,20)
- border-radius: 50%
- object-fit: cover
- object-position: 50% 50%
- background: rgb(242,238,232); dark rgb(32,27,24)

### `.name`

- margin / padding: 0
- font-family: `"Space Grotesk", Inter, system-ui, sans-serif`
- font-size: 29.6px
- font-weight: 700
- line-height: 32.56px (1.1)
- letter-spacing: -0.592px (-0.02em)
- color: rgb(25,20,16); dark rgb(244,239,233)
- rendered height: 32.546875px

### `.role`

- margin: `8px 0 0`
- font-family: Inter stack
- font-size: 16px
- font-weight: 500
- line-height: 24px
- color: rgb(74,66,59); dark rgb(201,191,180)

### `.tagline`

- margin: `4px 0 0`
- font-family: Inter stack
- font-size: 14.4px
- font-weight: 400
- line-height: 21.6px
- color: rgb(138,127,116); dark rgb(143,132,120)
- rendered height: 21.609375px

## States & Behaviors

- No hover, click, focus, scroll, or timed behavior.
- The operating-system dark preference changes only values supplied by the design-system theme.
- No transition accompanies a theme change.

## Per-State Content

N/A — the text and portrait do not change.

## Assets

- Portrait: `public/clones/fecoelho-com-br/images/fernanda-avatar.jpg`
- Public URL: `/clones/fecoelho-com-br/images/fernanda-avatar.jpg`
- Intrinsic image: 512×512 JPEG
- Alt text: `Fernanda Coelho`

## Text Content (verbatim)

- Heading: `Fernanda Coelho`
- Role: `IA aplicada ao negócio`
- Tagline: `Dados · Produtos · Inovação`

## Responsive Behavior

- **Desktop (1440px):** header width 420px; avatar centered with computed horizontal margins 144px.
- **Tablet (768px):** byte-identical layout and sizes; header width remains 420px.
- **Mobile (390px):** header width 350px; avatar remains 132px and centers with computed horizontal margins 109px.
- **Breakpoint:** none. Only the parent's fluid width changes.
