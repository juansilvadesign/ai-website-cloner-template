# HeroSection Specification

## Overview

- **Target file:** `src/clones/bio-nutriruama-com-br/components/HeroSection.astro`
- **Screenshot:** `docs/design-references/bio-nutriruama-com-br/original-1440.png`, `original-390.png`
- **Interaction model:** time-driven video; hover-driven social anchors

## DOM Structure

`section.hero > video + overlay div + copy div`. The copy div contains an eyebrow span, `h1`, a supporting span, and a social-nav with four external anchors. A decorative downward chevron overlaps the bottom on screens below 1024px.

## Computed Styles (exact values from getComputedStyle)

### Container

- 1440px: `584.094×665.875px`, `display: flex`, `position: relative`, `justify-content: flex-end`, `overflow: hidden`, `border-radius: 38px`.
- 390px: `358×460px`, `border-radius: 24px`.
- Desktop background terminal: `linear-gradient(#C64B4B 64.5%, #602424 100%)`.

### Hero media and overlay

- Video: absolute, inset -1px, `width/height: calc(100% + 2px)`, `object-fit: cover`.
- Overlay: absolute inset 0; `linear-gradient(180deg, transparent 29%, #C64B4B 77%)`.
- Video attributes: `autoplay`, `muted`, `playsinline`, no loop; poster is `hero-poster.jpg`.

### Copy

- Copy wrapper desktop: relative z-index 10, bottom padding 64px, horizontal content width 473px.
- Top line at 1440px: `font-size: 39px`, `font-weight: 500`, `line-height: 42.9px`, `letter-spacing: -0.78px`, white, `font-family: degular`.
- `h1` desktop: `font-family: roxborough`, `font-size: 103px`, `font-weight: 700`, `line-height: 97.85px`, `letter-spacing: -2.06px`, margin-top -25px, white.
- `h1` phone: `font-size: 72px`, `line-height: 68.4px`, `letter-spacing: -1.44px`, margin-top -16px.
- Supporting line desktop: 25px / 25px / -0.5px; phone: 17px / 17px / -0.34px.

### Social links

- Desktop: `48×48px`; phone: `28×28px`.
- Default background `rgba(255,255,255,.14)`, white icon/text, full-pill radius, white 30% outline.
- Desktop row gap: 16px; phone row gap: 8px.

## States & Behaviors

### Video

- **Trigger:** immediate page load.
- **State:** browser autoplay progresses through the source video; no loop and no user control.
- **Fallback:** poster image for reduced motion/autoplay failure.

### Social hover

- **Trigger:** pointer hover.
- **Before:** `transform: none`, translucent white 14% surface.
- **After:** `translateY(-4px)`, 30% white surface.
- **Transition:** 300ms `cubic-bezier(0,0,.2,1)`.

## Per-State Content

N/A — every state carries the same hero text and external social destinations.

## Assets

- Video: `public/clones/bio-nutriruama-com-br/videos/hero.mp4`
- Poster: `public/clones/bio-nutriruama-com-br/images/hero-poster.jpg`
- Icons: inline LinkedIn, Instagram, YouTube, TikTok, and decorative chevron SVGs.

## Text Content (verbatim)

- `Apaixone-se pelo`
- `processo`
- `de se tornar sua Melhor Versão!`
- Social labels: `LinkedIn`, `Instagram`, `YouTube`, `TikTok`

## Responsive Behavior

- **Desktop (1440px):** fills the first grid column at the center-card-stack height; 38px corners; 103px display word.
- **Tablet (768px):** first stacked panel, 736×460px; copy centered toward bottom; mobile-size typography.
- **Mobile (390px):** 358×460px; 24px corners; 72px display word; 28px social controls; decorative lower chevron appears.
- **Breakpoint:** desktop media/layout at 1024px.
