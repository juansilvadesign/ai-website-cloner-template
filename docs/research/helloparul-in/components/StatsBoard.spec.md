# StatsBoard Specification

## Overview

- **Target file:** `src/clones/helloparul-in/components/StatsBoard.astro`
- **Reference:** master desktop/mobile captures; `source.html:157-175`
- **Interaction model:** static

## DOM Structure

`section.stats-board.parul-shell` holds four `div.stat-cell` elements, each with a numeric `strong` and Space Mono label.

## Computed Styles

- Board: grid `repeat(4,1fr)`, 1px gap, `rgba(24,21,16,.14)` background and 1px border, 18px radius, overflow hidden, `margin:64px 0`.
- Cells: `#F2EEE3` background and `padding:30px 26px`.
- Number: Bricolage 800, 46px, `-.03em` tracking.
- Label: Space Mono 12px, `#3A352C`, 4px top margin.

## Text Content

- `5+` — `years shipping` — red
- `25+` — `features shipped` — blue `#1E37D8`
- `15Cr+` — `consumer served` — green `#35B86B`
- `0` — `px left unaligned` — ink

## Responsive Behavior

- **≤760px:** 2 columns, `margin:36px 0`; cells use `16px 10px`; numbers use `clamp(20px,7vw,30px)`; labels are 9.5px / 1.3 line-height.
