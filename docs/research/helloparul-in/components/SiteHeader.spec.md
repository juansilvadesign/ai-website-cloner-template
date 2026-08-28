# SiteHeader Specification

## Overview

- **Target file:** `src/clones/helloparul-in/components/SiteHeader.astro`
- **Reference:** `docs/design-references/helloparul-in/original-1440.png`, `original-390.png`; `source.html:103-123`
- **Interaction model:** click-driven navigation; sticky on scroll

## DOM Structure

`nav.site-header.parul-shell` contains a wordmark anchor, mobile-only availability status, desktop navigation links, and desktop availability status. The nav is inside the first centered shell so its width follows the shell.

## Computed Styles

- Desktop nav: `position:sticky; top:0; z-index:50; display:flex; align-items:center; justify-content:space-between; padding:18px 0; height:73px`.
- Surface: `rgba(242,238,227,.82)`, `backdrop-filter:blur(10px)`, bottom line `1px solid rgba(24,21,16,.12)`.
- Wordmark: Bricolage 800, 19px, `-.02em`, transparent background, no border.
- Desktop actions: Space Mono 13px, `padding:8px 12px`, 999px radius, 8px group gap.
- Availability: inline flex; red 7px dot; Space Mono 13px; `6px 12px` padding; 1.5px `#FF3B1F` border; full pill.

## States & Behaviors

- **Sticky:** same visual state at scroll top and after scrolling; no compact transition.
- **Wordmark hover:** ink → `#FF3B1F`.
- **Nav hover:** transparent → `rgba(24,21,16,.07)`.
- **Destinations:** work → `#work`; about → `/helloparul-in/about/`; play → `/helloparul-in/play/`; wordmark → `/helloparul-in/`.

## Text Content

- `Parul Aggarwal`
- `work`
- `about`
- `play with parul`
- `Open to work`

## Responsive Behavior

- **Desktop/tablet:** wordmark, links, and outlined availability pill are visible.
- **≤760px:** desktop links hide; centered red filled availability pill appears; shell has 22px gutter.
- **≤480px:** work/play links would be hidden upstream, but prior ≤760px hide means only wordmark + availability remain.
