# SiteFooter specification

## Overview

- **Target file:** `src/clones/marcos-arruda-com/components/SiteFooter.astro`
- **Screenshots:** `original-1440.png`, `about-original-1440.png`, `original-390.png`
- **Interaction model:** static with link hover states

## DOM structure

Black `footer` contains a contact introduction/identity column, a Menu link column, a Social link column, and a final copyright row.

## Computed styles

- Desktop contact title: Poppins semibold around 22px / 31.9px; contact details are Poppins and 16px / 29.6px (`root-inspection.json`).
- Footer navigation labels: Avenir Light 16px / 32px at desktop (`root-computed-desktop.json`).
- Copyright: Avenir Light 12px / 19.2px, white.
- Content spans exactly 1296px at 1440 with a 72px outer gutter.
- Surface: `var(--bg)`; heading and links use `var(--surface)`, `var(--muted)`, and `var(--accent)`.

## States and behaviors

- Footer links are real `tel:`, `mailto:`, local, or external links.
- Hover colour transition is 0.2–0.3s `ease-in-out`; preserve keyboard focus.

## Text content

- `Want to get in touch? I love meeting new people.`
- `Marcos Arruda`
- `+55 61 993370685`
- `marcos17design@gmail.com`
- Menu: Home, Projects, About
- Social: LinkedIn, Medium
- `Marcos Arruda UX Designer 2024 © All rights reserved. ⭐️ Team is Everything`

## Responsive behavior

- Desktop: three columns with wide breathing room.
- Tablet: retains a contact-led grid with reduced gaps.
- Phone: contact content first, then Menu and Social in two compact columns, then copyright.
