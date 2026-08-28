# MobileNavigation Specification

## Overview

- **Target file:** `src/clones/helloparul-in/components/MobileNavigation.astro`
- **Reference:** `docs/design-references/helloparul-in/original-390.png`; `source.html:326-342`
- **Interaction model:** click-driven route navigation

## DOM Structure

`nav.mobile-navigation[aria-label="Primary"]` contains four equal-width icon anchors: home, work, about, and play. Icons are inline semantic SVGs with accessible labels on their anchors.

## Computed Styles

- Container: `position:fixed; bottom:0; left:0; right:0; z-index:70; height:56px; background:#181510; border-top:2px solid #181510`.
- Children: flex, full height, equal flex share, centered icons, transparent backgrounds, no border.
- Default icon color: `#F2EEE3`; active home icon: `#7CFFB2`.

## States & Behaviors

- Links target home, `#work`, local about, and local play routes.
- Only rendered at `max-width:760px`; desktop state is `display:none`.

## Responsive Behavior

- At phone width, the footer remains above a body-reserved 80px lower safe area.
