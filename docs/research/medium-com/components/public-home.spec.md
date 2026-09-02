# PublicHome specification

## Overview

- **Target file:** `src/clones/medium-com/components/PublicHome.astro`
- **Screenshot:** `docs/design-references/medium-com/public-home-reference.png`
- **Interaction model:** static with action hover

## DOM Structure

`main.home > copy block (eyebrow, display heading, CTA) + decorative art block; footer utility links`.

## Computed Styles (reconstruction values)

### Desktop layout

- display: grid; columns `1fr 44vw`
- minimum hero height: viewport minus 72px header and 64px footer
- warm paper background: `#f7f4ed`
- copy inset: `7vw` left and 80px vertical

### Headline and CTA

- display: Newsreader/Georgia, 112px desktop, 64px tablet, 48px+ phone via clamp
- line-height: `.95`; letter-spacing: `-.045em`
- action: 190px minimum width, 50px minimum height, black fill, pill radius

### Illustration

- CSS-only bright green flower, mathematical rule construction, green window, black star field
- all decorative nodes use the declared ink/paper/accent palette

## States & Behaviors

- CTA hover: `translateY(-2px)` plus `.9` opacity, 150ms standard ease.
- Decorative illustration has no motion.

## Assets

No copied source media. CSS shapes replace original illustration layers.

## Text Content (verbatim UI labels)

`Human stories & ideas`, `A place to read, write, and deepen your understanding`, `Start reading`, plus the utility footer labels.

## Responsive Behavior

- **Desktop:** two columns with artwork right.
- **Tablet:** artwork drops below copy; flower scales to 82%.
- **Mobile:** compact copy/CTA followed by a 280px illustration band and wrapping footer links.
