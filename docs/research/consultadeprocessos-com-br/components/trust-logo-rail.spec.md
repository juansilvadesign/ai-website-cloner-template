# TrustLogoRail Specification

## Overview

- **Target file:** `src/clones/consultadeprocessos-com-br/components/TrustLogoRail.astro`
- **Screenshot:** `docs/design-references/consultadeprocessos-com-br/original-1440.png` immediately after hero
- **Interaction model:** time-driven decorative marquee

## DOM Structure

`section.logo-rail > .container > p + .rail-mask > .rail-track > repeated logo cells`; two absolute white fades sit at the rail edges.

## Computed Styles

- desktop section: `display:block`, `height:198px`, `padding:32px 0`, white background, top/bottom `#e2e8f0` borders.
- label: 11px uppercase / semibold slate-500; centered.
- rail: 90px high; each cell `250×90px`, flex centered; image has `object-fit:contain`, max height 90px.
- side fades: 96px wide, white-to-transparent, `z-index:10`.

## States & Behaviors

- rail continuously translates horizontally at a slow, linear rate; duplicate the 8 source logos so looping has no gap.
- pause/disable animation under `prefers-reduced-motion`.

## Text Content (verbatim)

- FONTES DE DADOS CONFIÁVEIS E ATUALIZADAS DE TRIBUNAIS E ÓRGÃOS OFICIAIS

## Assets

- `images/logo-stf.webp`, `logo-stj.webp`, `logo-tjdft.webp`, `logo-pjerj.webp`, `logo-tjes.webp`, `logo-tjpr.webp`, `logo-tjrs.webp`, `logo-tjsc.webp`.

## Responsive Behavior

- **Desktop/Tablet:** visible and horizontally clipped.
- **Phone:** `display:none` below 768px.
