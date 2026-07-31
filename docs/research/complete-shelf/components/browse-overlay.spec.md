# BrowseOverlay Specification

## Overview

- **Target file:** `src/clones/complete-shelf/components/BrowseOverlay.astro`
- **Screenshot:** `docs/design-references/complete-shelf/original-1440.png`
- **Interaction model:** state-projected HTML controls

## DOM Structure

- semantic header
  - wordmark, divider, subtitle
  - edition count
- browse caption
  - position eyebrow
  - selected short title
  - author
  - Inspect button
- previous/next buttons
- marker navigation
  - nineteen marker buttons
  - desktop input hint
- ready/loading status

## Exact Visual Values

- Header padding: `26px clamp(22px, 3.4vw, 56px)`.
- Wordmark: 10px sans, weight 650, tracking `.185em`.
- Caption width: `min(430px, 36vw)`.
- Caption lower offset: `clamp(178px, 23vh, 228px)`.
- Title: serif, `clamp(37px, 4.4vw, 72px)`, line-height `.9`.
- Author: serif italic, 16px, soft ink.
- Arrow control: 50px circle, 1px hairline, translucent paper backdrop.
- Index: lower offset 34px; 19 equal columns; active marker 18px.

## States

- Current marker has `aria-current="true"`.
- Boundary arrow uses the native disabled state.
- Inspect arrow translates `2px, -2px` on hover.
- Browse controls become non-interactive during focus.

## Responsive Behavior

- At `760px`, header padding becomes `20px 18px`.
- Caption becomes full-width with lower gradient and 20px side padding.
- Arrow controls become 42px and move to bottom 60px.
- Index sits between arrows; desktop hints and edition count are hidden.

