# SplashOverlay Specification

## Overview

- **Target file:** `src/clones/helloparul-in/components/SplashOverlay.astro`
- **Reference:** source first-load state in `source.html:88-99`; resting-page master at `docs/design-references/helloparul-in/original-1440.png`
- **Interaction model:** time-driven

## DOM Structure

`div.parul-splash[aria-hidden=true]` contains the avatar image, name, rotating status caption, progress track, and progress fill. It is rendered before all page content so it can cover the fixed navigation.

## Computed Styles

- Container: `position:fixed; inset:0; z-index:9999; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:26px; background:#F2EEE3`.
- Avatar: 120×120px, `object-fit:contain`, `splashBob 1.6s ease-in-out infinite`.
- Name: Bricolage Grotesque, 800, 22px, `letter-spacing:-.02em`.
- Caption: Space Mono, 13px, `#7A7468`, centered, minimum 20px high.
- Track: 220×6px, full pill radius, `rgba(24,21,16,.12)` background.
- Fill: full track height, `#FF3B1F`, `splashProgress 6s linear forwards`.

## States & Behaviors

- **Initial:** overlay accepts pointer input, opacity 1, no translation.
- **Completion trigger:** 6000ms after load.
- **Exit:** source moves/fades through `transform .6s cubic-bezier(.6,0,.2,1)` and disables pointer events. Clone may remove the node after the same delay.
- **Caption:** source runtime rotates playful descriptions; clone’s initial caption must be `Politely arguing with a PM about spacing…`.

## Assets

- `public/clones/helloparul-in/images/splash-avatar.png`
- Public URL: `/clones/helloparul-in/images/splash-avatar.png`

## Responsive Behavior

- Identical visual structure at all widths.
- Caption never exceeds `88vw`; the rest is centered.
