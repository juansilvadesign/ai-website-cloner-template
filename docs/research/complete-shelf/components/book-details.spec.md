# BookDetails Specification

## Overview

- **Target file:** `src/clones/complete-shelf/components/BookDetails.astro`
- **Screenshot:**
  `docs/design-references/complete-shelf/original-inspect-1440.png`
- **Interaction model:** selected-state projection with Back, Reset view, and
  scrollable editorial content

## DOM Structure

- details aside
  - Back button
  - position counter
  - scrollable copy
    - collection eyebrow
    - title
    - author
    - description
    - quotation and citation
    - format/year metadata
  - inspection controls
    - input hints
    - Reset view

## Exact Visual Values

- Desktop width: `min(620px, 41vw)`.
- Hidden transform: `translateX(44px)` and opacity `0`.
- Visible transition: opacity `420ms 80ms`; transform `620ms` editorial ease.
- Inner padding:
  `27px clamp(28px, 4vw, 68px) 30px clamp(52px, 6vw, 98px)`.
- Title: serif, `clamp(42px, 4.35vw, 70px)`, line-height `.91`,
  tracking `-.055em`.
- Body: serif, `clamp(16px, 1.25vw, 20px)`, line-height `1.38`.
- Controls: uppercase sans, 8–10px with hairline separators.

## States

- `aria-hidden` matches focus mode.
- Content always exists in initial HTML.
- Back and Escape produce the same close intent.
- Reset reframes the selected book without leaving inspection mode.

## Responsive Behavior

- Tablet width: `min(570px, 48vw)`.
- At `760px`, panel becomes a bottom sheet:
  - width `100%`
  - height `min(49dvh, 500px)`
  - hidden transform `translateY(100%)`
  - top fade of 55px
  - independently scrollable copy
  - safe-area-aware lower padding

