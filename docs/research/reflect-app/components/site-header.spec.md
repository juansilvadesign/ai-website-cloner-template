# Component spec: Site header

**Target:** `src/clones/reflect-app/components/SiteHeader.astro`  
**Reference:** `original-1440-top.png`; mobile top crop in `original-390.png`

## Overview

A permanently fixed, low-emphasis navigation bar that floats above the site instead of dividing it from the hero.

## DOM structure

- Header landmark with an inner content row.
- Brand link, primary navigation list, authentication link, and primary action link.
- Mobile-only menu button controlling a labelled navigation drawer.

## Styling contract

- Desktop height: 88 px; horizontal padding approximately 20 px.
- Background: very dark indigo at low opacity, with `backdrop-filter: blur(16px)`.
- A faint bottom rule may be visible only through contrast; it must not look like a solid toolbar.
- Navigation is Inter medium at roughly 14 px / 20 px. CTA is a lavender filled pill; secondary actions are quiet text links.

## States and behavior

- Navigation stays fixed as the document scrolls.
- Link hover brightens foreground contrast without shifting layout.
- Mobile button toggles the drawer. Its `aria-expanded` value must always match the drawer’s visibility.
- Source anchor destinations are retained for `#ai`, `#integrations`, `#pricing`, and `#about`.

## Responsive behavior

- At 780 px and below, hide the desktop navigation and place the compact menu trigger at the trailing edge.
- The opened drawer stacks each navigation item and both actions in a touch-friendly vertical layout.
- Keep the header visually light even when the drawer is open; the page background supplies the panel contrast.
