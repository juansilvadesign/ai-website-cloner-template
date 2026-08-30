# Component spec: Hero section

**Target:** `src/clones/reflect-app/components/HeroSection.astro`  
**Reference:** `original-section-hero.png`, `original-1440-top.png`, and `original-390.png`

## Overview

The hero is the visual thesis of the page: a small release pill, a single centered promise, a black-hole / orbit atmosphere, and a wide framed product-video preview.

## DOM structure

- Hero section with labelled H1.
- Announcement link, H1, and supporting sentence.
- Decorative orbit and black-hole layers marked `aria-hidden`.
- Product-preview image and an explicitly labelled play button.
- Native `<dialog>` containing the local video and close button.

## Styling contract

- Desktop: 1,339 px minimum section height with copy beginning near 173 px from the top.
- Display heading: Aeonik medium, 72 px / 80 px, center aligned, max width roughly 960 px.
- Supporting line: 18 px / 28 px with muted lavender opacity.
- Product frame: approximately 1,216 px wide, starts near 572 px, uses 24 px corners, a 1 px translucent border, inset ring, and a bottom fade into the page background.
- Background is `#030014`; the atmosphere uses indigo/purple glow, thin orbit paths, sparse stars, and a bright white-lavender horizon surrounding the dark centre.

## States and behavior

- The announcement link routes to `#ai`.
- Play opens the native dialog, begins local playback when the browser permits it, and supports close button, backdrop click, and Escape dismissal.
- Hovering play adds a small scale and purple surface lift. Reduced-motion users still receive the same affordance without animated movement.

## Responsive behavior

- At 780 px and below: top padding about 126 px; H1 becomes 40 px / 44 px; overall hero becomes about 770 px tall.
- Product preview becomes `calc(100vw - 32px)` and begins around 402 px.
- Decorative geometry is reduced in scale but remains centred; it must never create horizontal scrolling.

## Assets

- `/clones/reflect-app/images/hero-preview.png`
- `/clones/reflect-app/videos/hero-demo.webm`
