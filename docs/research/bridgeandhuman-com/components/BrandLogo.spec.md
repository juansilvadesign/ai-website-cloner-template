# BrandLogo Specification

## Overview

- Target file: src/clones/bridgeandhuman-com/components/BrandLogo.astro
- Screenshot: docs/design-references/bridgeandhuman-com/original-1440.png
- Interaction model: static

## DOM Structure

A semantic decorative SVG appears before the text name. The SVG has a 22 by 22
viewBox and one open-stroke geometric path. The text is supplied by the parent
wordmark link/button rather than baked into the SVG.

## Computed Styles

- Icon source path: M 8.143 1 L 8.143 8.143 L 1 8.143 L 1 13.857 L 8.143
  13.857 L 8.143 21 M 8.143 1 L 13.857 1 M 8.143 1 L 1 1 M 13.857 1 L
  13.857 8.143 L 21 8.143 L 21 13.857 L 13.857 13.857 L 13.857 21 M
  13.857 1 L 21 1 M 13.857 21 L 8.143 21 M 13.857 21 L 21 21 M 8.143 21 L 1 21.
- Stroke: rgb(17, 17, 17); square line cap; 22px square source geometry.
- Desktop rendered wordmark text: IBM Plex Sans 16px, 500 weight, 19.2px line
  height, -0.615px letter spacing, rgb(17,17,17).
- Mobile wordmark matches the desktop text geometry; icon remains approximately
  24px with a 7px gap.

## States & Behaviors

N/A. The source exposes pointer cursor on the wordmark but no visual state or
navigation destination was present in the sweep.

## Assets

Inline semantic SVG; no external image asset.

## Text Content

Bridge & Human

## Responsive Behavior

- Desktop: centered in the header’s middle column.
- Tablet/mobile: aligned to the header’s left content cluster.
