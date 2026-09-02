# AppShell specification

## Overview

- **Target file:** `src/clones/medium-com/components/AppShell.astro`
- **Screenshot:** `docs/design-references/medium-com/public-story-ui-reference.jpeg`, `public-lists-reference.png`, and `public-audience-reference.png`
- **Interaction model:** static navigation shell with hover/focus states

## DOM Structure

`app shell > fixed topbar (wordmark/search/actions) + fixed rail (brand/nav/compose/profile) + flowing main slot + mobile bottom nav`.

## Computed Styles (reconstruction values)

### Product shell

- canvas: white `#fff`; ink `#242424`; 1px soft-gray dividers
- desktop rail: fixed 72px wide
- topbar: fixed, 56px high, backdrop blur 8px, starts after rail
- main: top padding 80px, desktop horizontal gutter `7vw`

### Controls

- search: 240px max, 40px high, pale-gray pill
- utility icons: 40px visual hit area; 24px line icon
- avatar: 32px black circle, white monogram

## States & Behaviors

- Rail active state: muted ink becomes primary ink and icon fills.
- Icon hover: soft-gray circular background or ink color, 150ms standard ease.
- Mobile breakpoint: rail hides; wordmark appears in topbar and fixed bottom navigation appears.

## Assets

Inline SVG line icons only; no external icon asset.

## Text Content (verbatim UI labels)

`Search`, `Write`, `Home`, `Library`, `Stories`, `Stats`.

## Responsive Behavior

- **Desktop:** left rail + topbar.
- **Tablet:** rail absent; topbar and 64px bottom navigation.
- **Mobile:** search/Write text collapse while accessible labels remain.
