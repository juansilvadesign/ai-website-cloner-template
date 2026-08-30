# Component spec: Site footer

**Target:** `src/clones/reflect-app/components/SiteFooter.astro`  
**Reference:** `original-section-footer.png`

## Overview

The footer resolves the page in the same dark visual environment, with a prominent wordmark, grouped product/company/resource links, and legal context.

## DOM structure

- Footer landmark with brand block, multiple labelled link columns, and legal/meta row.
- Links use standard anchors; decorative stars or divider glows are hidden from assistive technology.

## Styling contract

- Retain a tall footer cadence (about 760 px in the desktop source) so the end of the page does not feel abruptly compressed.
- Use a large white wordmark as the visual anchor, then muted smaller navigation labels beneath / beside it.
- Rules are thin and low opacity. Background remains the page base colour rather than switching to a distinct gray footer.

## States and responsive behavior

- Link hover increases foreground brightness; keyboard focus remains visibly outlined.
- Desktop uses columns. At mobile width, stack brand first, then each link group, then legal content.
- Legal and external link copy must wrap naturally and never force horizontal scrolling.
