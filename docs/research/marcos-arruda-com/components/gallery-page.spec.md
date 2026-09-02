# GalleryPage specification

## Overview

- **Target file:** `src/clones/marcos-arruda-com/components/GalleryPage.astro`
- **Screenshots:** `portfolio-original-1440.png`, `portfolio-original-390.png`, `branding-original-1440.png`, `branding-original-390.png`, `branding-copy-original-1440.png`
- **Interaction model:** static media gallery with small media-hover affordance

## DOM structure

`main.gallery-page` renders `SiteHeader` in neutral/gallery mode, an optional centred page title/subtitle, then a CSS mosaic of local image tiles. `/blank-1` additionally prints card title/subtitle labels beneath tiles. `/blank` includes a play-mark overlay on motion-source tiles.

## Computed styles

- Gallery header is neutral grey, roughly 100px high at desktop, with black identity text and a white menu icon (`portfolio-original-1440.png`).
- `/portfolio` title uses black display type, `Visual Design`, centred above `Digital Design`.
- Tile layout is square-edged with narrow light-grey gaps; white canvas begins directly after the header/title.
- `/blank-1` uses four 150–160px square-ish cards per desktop row with bold 16–18px black titles and small muted labels.

## States and behaviors

- Static image tiles retain their source image; a play marker is decorative only in the clone.
- Gallery tiles use a light opacity/scale hover at pointer devices; no custom viewer/modal is added because the source does not expose one in the route topology.

## Assets

- `images/portfolio-*`
- `images/branding-*`
- `images/branding-copy-*`

## Text content

- `/portfolio`: `Visual Design`, `Digital Design`.
- `/blank-1`: `Album cover sax`, `Album cover jazz`, `Album cover`, `Fjazz`, `Krychek branding`, `Krychek` with their published subtitles.

## Responsive behavior

- **1440px:** 3–4 column irregular mosaic.
- **768px:** 2–3 columns with the same flat gaps.
- **390px:** one/two columns, preserve asset aspect ratio and labels.
