# FeaturesGrid specification

## Overview

- **Target file:** `src/clones/reworkd-ai/components/FeaturesGrid.astro`
- **Screenshot:** `docs/design-references/reworkd-ai/original-section-features.png`
- **Interaction model:** click-driven local analytics pills; otherwise static / light hover

## DOM structure

- Centered feature title and supporting paragraph.
- Desktop 3-column grid: dark extractor panel spanning two columns, a white scraper card, then three white cards beneath.
- Each card pairs a compact visual mockup with heading and real source paragraph.

## Computed styles

- Section starts at y≈2884; heading uses Selecta 40px / 44px, max 576px, centered.
- Grid content runs x=112 to 1328 and begins at y≈3168. Dark extractor card is 811×425px; regular desktop cards are 405px wide.
- Feature titles are Selecta 18px / 24px. Body is 14px–16px visual support copy in muted charcoal.
- Main dark panel is `#272c30` with white heading, rounded 8px frame, fine blue code/editor accents.

## States and behaviors

- **Analytics pills:** `irs.com/us-tax-law`, `usa.gov/pensions`, and `irs.com/us-tax` are native buttons. Selected button becomes dark and updates `aria-pressed`; chart semantics remain visible in the DOM.
- **Extractor button:** “Extract Next” receives a brief pressed/scan presentation; source canvases are static CSS fallback.
- **Card hover:** faint surface/border lift over 200ms; no hidden information.

## Text content

- “Futuristic features. About time.”
- “Reworkd makes it easier than ever to extract web data at scale. Spend less time worrying about data infrastructure – and more time running your business.”
- Automated extraction; Self-healing scrapers; No hallucinations; Any datatype, any day; Deep Analytics and their source paragraphs.
- Demo source strings: `usa.gov/pensions`, `brightideas.com/tax-advise`, `usa.gov/pharma-contracts`, `irs.com/us-tax-law`, `ycombinator.com/companies`, `indeed.com/companies`.

## Assets

- `/clones/reworkd-ai/images/everything-data-photo.png` for the “Any datatype, any day” product card.

## Responsive behavior

- **Desktop:** named mosaic as above.
- **Tablet:** two-column cards where readable; wide extractor remains the visual anchor.
- **Mobile:** title left-aligns at 16px inset; dark extractor first, then all other cards vertically with no horizontal overflow.
