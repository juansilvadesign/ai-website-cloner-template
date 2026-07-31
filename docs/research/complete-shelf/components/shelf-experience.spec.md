# ShelfExperience Specification

## Overview

- **Target file:** `src/clones/complete-shelf/components/ShelfExperience.astro`
- **Screenshot:** `docs/design-references/complete-shelf/original-1440.png`
- **Interaction model:** combined pointer, wheel, keyboard, click, and
  state-driven WebGL presentation

## DOM Structure

`main.press-experience` owns the canvas, semantic header, browse overlay,
previous/next controls, position index, details panel, status, loading/error
surface, independent note, accessible live region, and no-WebGL catalog.

## Computed Styles

### Root

- position: `relative`
- isolation: `isolate`
- width: `100%`
- height: `100dvh`
- overflow: `hidden`
- background: cream radial highlight over paper
- color: ink
- font: sans

### Canvas

- position: `absolute`
- inset: `0`
- width/height: `100%`
- z-index: `1`
- touch-action: `none`
- cursor: `grab` / `grabbing`
- opacity: `0` until ready, then `1`
- transition: opacity `900ms` editorial ease

## States and Behaviors

- `.is-loading`: loading screen visible, controls disabled.
- `.is-browsing`: caption/index/arrows available.
- `.is-transitioning`: command input constrained.
- `.is-focused`: browse chrome hidden and details active.
- `.has-error`: error copy and Retry action replace progress.
- `.is-unsupported`: canvas is hidden and semantic catalog is visible.

## Accessibility

- Canvas has `role="application"`, `tabindex="0"`, and concise controls help.
- All essential commands also exist as semantic buttons.
- Live region announces selected book and mode changes.
- All nineteen catalog entries exist in server-rendered HTML.

## Responsive Behavior

- **1440px:** full desktop overlays and side inspection panel.
- **768px:** narrow desktop/tablet panel and simplified hints.
- **390px:** mobile caption, lower arrows/index, and inspection bottom sheet.
- **Breakpoint:** mobile topology at `760px`.

