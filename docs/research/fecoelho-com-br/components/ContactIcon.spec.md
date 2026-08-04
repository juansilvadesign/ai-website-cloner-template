# ContactIcon Specification

## Overview

- **Target file:** `src/clones/fecoelho-com-br/components/ContactIcon.astro`
- **Screenshot:** `docs/design-references/fecoelho-com-br/contact-links-1440.png`
- **Interaction model:** static decorative SVG; parent anchor owns states
- **Allowed names:** `contact`, `whatsapp`, `linkedin`, `website`, `email`

## DOM Structure

The component accepts `name: ContactIconName` and returns exactly one `svg` with `aria-hidden="true"`, `viewBox="0 0 24 24"`, and the matching original geometry. It does not output the 40px icon tile; `ContactLinks` owns that wrapper.

## Computed Styles (exact values from getComputedStyle)

### Shared SVG

- display: block
- width / height: 21px
- max-width: 100% from shared reset
- color: inherited from the icon tile

### Stroke icons: contact, website, email

- fill: none
- stroke: currentColor
- stroke-width: 2
- stroke-linecap: round where present in source
- stroke-linejoin: round where present in source

### Filled icons: WhatsApp, LinkedIn

- fill: currentColor
- stroke: none

## States & Behaviors

N/A. The icon itself has no state or transition. Parent link press/hover effects do not mutate SVG geometry.

## Per-State Content

- `contact`: person outline, shoulder arc, and plus sign.
- `whatsapp`: exact single-path WhatsApp glyph from source HTML line 205.
- `linkedin`: exact single-path LinkedIn glyph from source HTML line 213.
- `website`: globe circle, equator, and longitude path.
- `email`: rounded envelope rectangle and flap path.

## Assets

No external file. Paths are extracted verbatim from `docs/research/fecoelho-com-br/source.html:197-229` and emitted semantically in Astro.

## Text Content (verbatim)

N/A — decorative; accessible names come from parent link labels.

## Responsive Behavior

- **Desktop / tablet / mobile:** always 21×21px.
- **Breakpoint:** none.
