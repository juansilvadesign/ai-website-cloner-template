# Component spec: Reflect logo

**Target:** `src/clones/reflect-app/components/ReflectLogo.astro`  
**Reference:** header and footer marks in `original-1440-top.png` and `original-section-footer.png`

## Overview

A compact white wordmark used as the primary brand anchor in the fixed header and at larger scale in the footer.

## DOM structure

- Brand link when used in navigation, named `Reflect home`.
- Local image at `/clones/reflect-app/images/logo.png`.
- The image itself has empty alt text because the enclosing brand link supplies the accessible name.

## Styles

- Preserve the source asset’s high-contrast white-on-transparent mark.
- Keep its rendered header height around 20 px; allow the footer context to use a larger but still restrained presentation.
- Never recolour, crop, or add a card behind the mark.

## States and responsive behavior

- Link has a clear focus ring supplied by the shared style layer.
- On mobile, it remains visible at the left of the menu trigger and does not shrink below legibility.

## Assets and implementation notes

- Source-derived asset: `/clones/reflect-app/images/logo.png`.
- This is visual branding, not a background decoration; expose one accessible brand name through the link and avoid duplicate announcement of the image.
