# ContactFooter Specification

## Overview

- **Target file:** `src/clones/fecoelho-com-br/components/ContactFooter.astro`
- **Screenshot:** `docs/design-references/fecoelho-com-br/contact-footer-1440.png`
- **Mobile reference:** `docs/design-references/fecoelho-com-br/original-390.png`
- **Interaction model:** ordinary browser link navigation

## DOM Structure

One `footer.contact-footer` (or semantically equivalent `p` inside a footer) contains a decorative `✦`, one space, and an anchor to `https://fecoelho.com.br`. Keep the star in the rendered text; it is part of the source signature.

## Computed Styles (exact values from getComputedStyle)

### Footer

- display: block
- width: 420px desktop/tablet; 350px mobile through parent width
- height: 19.6875px
- margin: `26px 0 0`
- padding: 0
- font-family: Inter stack
- font-size: 13.12px
- font-weight: 400
- line-height: 19.68px
- text-align: center
- color: rgb(138,127,116); dark rgb(143,132,120)

### Anchor

- color: rgb(209,85,59); dark rgb(240,113,79)
- font-weight: 600
- text-decoration: none (inherited global anchor rule)
- no custom transition

## States & Behaviors

- Clicking the link navigates to `https://fecoelho.com.br` in the current tab, matching the source.
- No custom hover, active, focus, scroll, or timed style. Native focus remains available.

## Per-State Content

N/A — static signature.

## Assets

None.

## Text Content (verbatim)

`✦ fecoelho.com.br`

## Responsive Behavior

- **Desktop / tablet:** 420px containing line, centered.
- **Mobile:** 350px containing line, centered.
- **Breakpoint:** none; type and margin do not change.
