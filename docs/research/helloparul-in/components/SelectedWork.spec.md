# SelectedWork Specification

## Overview

- **Target file:** `src/clones/helloparul-in/components/SelectedWork.astro`
- **Reference:** master desktop/mobile captures; `source.html:177-307`
- **Interaction model:** static wrapper delegating card interaction to `WorkCard`

## DOM Structure

`section#work.parul-shell` starts with a flexible heading row, followed by three `WorkCard` instances. The unused source mini-project grid is omitted because it contains no content.

## Computed Styles

- Section: `padding:40px 0 20px`.
- Heading row: flex, baseline aligned, wrap enabled, 12px gap, 36px bottom margin.
- Heading: Bricolage 800, `clamp(34px,5vw,64px)`, `-.03em` tracking.

## Text Content

- Heading: `Selected work`
- All body copy, metrics, labels, image alt text, and prompts are provided verbatim to each `WorkCard` data entry.

## Responsive Behavior

- Heading remains a single line in the 390px reference at 26px-ish computed clamp outcome.
- Card spacing stays 28px on desktop and phone.
