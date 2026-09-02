# AboutPage specification

## Overview

- **Target file:** `src/clones/marcos-arruda-com/components/AboutPage.astro`
- **Screenshots:** `about-original-1440.png`, `about-original-390.png`
- **Interaction model:** static plus local/external links

## DOM structure

The page starts with `SiteHeader` over a split hero. The left side is the portrait; the right side is a black reading panel with an `h1`, biography paragraphs, and CV action. A white interstitial contains Branding & Visual Design, followed by `SiteFooter`.

## Computed styles

- At 1440 the split hero fills 1162px: the portrait is roughly 50% and the reading column begins at x≈814px (`about-original-1440.png`).
- Display statement is Space Grotesk bold, large, white, with highlighted `Experience Designer` in `#eeff03`.
- Reading text is Avenir/Space Grotesk-like body, about 20px with 1.6 leading, white on black.
- The white interstitial is an unshadowed square band with a compact acid-yellow action.

## States and behaviors

- CV opens the real published PDF in a new tab.
- Branding action routes locally to `/marcos-arruda-com/blank/`.

## Assets

- `images/about-portrait.jpg`

## Text content

- `Experience Designer: from strategy to implementation.`
- Published biography paragraphs from `/about` are stored verbatim in the clone route data.
- `CV`, `Branding & Visual Design`.

## Responsive behavior

- **1440px:** two equal visual/reading columns.
- **768px:** retain split composition where space permits.
- **390px:** portrait becomes a top visual panel and biography stacks below; preserve the black reading surface.
