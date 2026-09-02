# ListsPage specification

## Overview

- **Target file:** `src/clones/medium-com/components/ListsPage.astro`
- **Screenshot:** `docs/design-references/medium-com/public-lists-reference.png`
- **Interaction model:** click-driven tabs and native modal

## DOM Structure

`section > heading/actions + tablist + live status + list-card grid + dialog/form`.

## Computed Styles (reconstruction values)

### Heading and tabs

- content width: 1180px max
- heading: 48px Inter bold, tight tracking
- New list: green, 50px high, pill radius, 20px label
- tabs: 16px, gray inactive / black active, 2px black underline, 24px gaps

### List cards

- 1px #e6e6e6 border; 8px radius; min-height 260px
- desktop columns: text `1fr`, cover collage `43%`
- text inset: 32px; title 32px bold
- view list: 40px outline pill; metadata gray 16px

## States & Behaviors

- Tab click: active class/`aria-selected` moves, polite status changes.
- New list: `showModal()` opens the native dialog.
- Dialog close/cancel: native `method=dialog` close behavior.
- View list has black-fill/white-text hover.

## Assets

No saved-story images from the account are copied. Three CSS gradient covers substitute structure only.

## Text Content (verbatim UI labels)

`Your lists`, `New list`, `Saved`, `Highlights`, `Recently viewed`, `View list`, and dialog labels.

## Responsive Behavior

- **Desktop:** large two-column cards.
- **Tablet:** 38% cover column and 24px content inset.
- **Mobile:** each card stacks cover over copy; tab list scrolls horizontally.
