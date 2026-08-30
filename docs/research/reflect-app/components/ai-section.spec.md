# Component spec: Reflect AI section

**Target:** `src/clones/reflect-app/components/AiSection.astro`  
**Reference:** `original-section-ai.png` and `original-section-ai-active.png`

## Overview

The AI section introduces the product’s assistant through a centred title, an interactive prompt card, and a capability matrix. It is the page’s important in-place interaction after the hero video.

## DOM structure

- `section#ai` with badge, H2, and explanatory paragraph.
- Decorative star field and beam, both hidden from assistive technology.
- One native button containing prompt heading, question, response, and action chips.
- Capability sub-section with H3 and five feature articles.

## Styling contract

- Desktop heading uses 56 px / 64 px display typography and sits on a broad star field.
- Prompt card is about 560 px wide and at least 140 px tall, with a 24 px radius, one-pixel translucent rule, and subtle inset border.
- An angled lavender beam / grid rises behind the card. It is atmospheric rather than explanatory.
- Capability grid begins after a large gap (~120 px), in three columns with the fourth item spanning the left two columns at desktop width.

## Interaction states

- Default: prompt question and “Click to see magic” are visible; response and shortcut chips are hidden.
- Active: clicking toggles the parent `is-active` class, moves the question out, reveals the answer and action chips, brightens the beam, and updates `aria-expanded=true`.
- Toggling a second time restores the default state and hides the answer from the accessibility tree.
- Hover uses only a low-contrast surface / border increase; keyboard focus follows the global focus treatment.

## Responsive behavior

- At 780 px and below, the display heading is 40 px / 44 px and the prompt grows vertically instead of clipping text.
- Capability grid becomes one column; text changes from centred to left aligned; chips may wrap.
