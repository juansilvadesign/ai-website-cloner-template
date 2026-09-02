# HomeExperience specification

## Overview

- **Target file:** `src/clones/marcos-arruda-com/components/HomeExperience.astro`
- **Screenshots:** `original-1440.png`, `original-768.png`, `original-390.png`
- **Interaction model:** static plus native looping video

## DOM structure

`main.home` renders: portrait hero; white identity strip is supplied by `SiteHeader`; Manifest video/project teaser; selected-work records; collaboration proof/brand marks; then `SiteFooter` in the route assembly.

## Computed styles

- Hero is 981px tall in the inspected desktop layout. The image is full-bleed and the desktop copy column is x≈767px, y≈143px, width≈596px (`root-computed-desktop.json`).
- Home name: Space Grotesk bold, 38px at desktop. Hero reading copy: Space Grotesk, 28.6px / 37.18px at desktop; key spans are `#eeff03`.
- Selected Projects heading: Space Grotesk medium, 20px / 24px. Project title: Space Grotesk bold, 45px. Card descriptions: Avenir Light, 20px / 32px, `#e3e3e3`.
- Collaboration heading: Space Grotesk bold, 48px / 62.4px. Its centred body is 20px / 32px and width≈858px at desktop.

## States and behaviors

- Native fashion video: muted, loop, autoplay; poster fallback must be present.
- Project cards navigate locally to `case1`, `case2`, and `case3`. On hover only their link emphasis changes; no hidden carousel/tab state exists.

## Assets

- `images/home-portrait.jpg`
- `images/home-fashion-poster.jpg`
- `videos/home-fashion.mp4`
- `images/logo-pvh.png`, `images/logo-city.png`, `images/logo-tidy.png`, `images/logo-adidas.png`, `images/logo-jacobs.jpg`, `images/logo-local-digital.png`

## Text content

- `MARCOS ARRUDA`
- `Product and service designer with expertise in visual communication, strategic design, media studies, and UX research. Passionate about creating impactful experiences and fostering innovation.`
- `01 > MANIFEST`, `02 > FIT POINTS`, `03 > VIBRANT STREETS`, `04 > EMPLOYEE EXPERIENCE`
- Source descriptions and collaboration paragraph are stored verbatim in the route data module.

## Responsive behavior

- **1440px:** portrait occupies the left half; copy occupies a 596px right column. Manifest teaser is a 635px visual band plus right copy.
- **768px:** same editorial ordering with proportional gutters.
- **390px:** copy starts at 12px and precedes/overlays a crop of the portrait; selected records stack; the collaboration block uses a centred narrow text column.
