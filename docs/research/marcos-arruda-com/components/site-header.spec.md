# SiteHeader specification

## Overview

- **Target file:** `src/clones/marcos-arruda-com/components/SiteHeader.astro`
- **Screenshots:** `original-1440.png`, `about-original-1440.png`, `menu-open-1440.png`
- **Interaction model:** click-driven menu dialog

## DOM structure

`header.site-header` contains an identity link (`Marcos Arruda` + role line), a labelled menu button with three decorative strokes, and a native `dialog` holding the close button plus the Work, About, Contact link list.

## Computed styles

- Visible home strip identity at 1440: the source heading block begins at x=72px, is 186px wide, and uses `roboto-bold` at about 17.5px/24.5px; its `Designer` word is acid yellow (`root-computed-desktop.json`).
- The hidden/hero header button inspected at 1440 is 34.5312px × 25.1094px, transparent, with `transition: all` (`root-header-inspection.json`).
- Desktop shell side edge is `5vw` / 72px at 1440; phone edge is 12px.
- Header foreground is `var(--surface)` on dark media and `var(--fg)` on the white bar. It has no radius, shadow, or filled button background.

## States and behaviors

- **Closed:** compact identity plus three-stroke trigger; `aria-expanded="false"`.
- **Open:** `dialog[open]` covers the viewport, is black, displays a faint hero image behind a dark layer, and shows `WORK`, `ABOUT`, `CONTACT` centred at desktop. `aria-expanded="true"`; focus moves inside.
- **Trigger:** menu button click.
- **Close:** close button, Escape, or a menu item selection. Restore trigger focus.
- **Transition:** opacity/visibility `var(--motion-base) var(--ease-standard)`.

## Text content

- `Marcos Arruda`
- `Product & Service Designer` (case and gallery shell) or `UX & Service Designer` (home strip)
- `WORK`, `ABOUT`, `CONTACT`

## Responsive behavior

- **1440px:** header overlays hero media or sits in a 111px white strip.
- **768px:** preserve horizontal identity/button alignment.
- **390px:** use a 64–68px bar/overlay padding; logo remains two lines and menu hit target stays at least 44px.
