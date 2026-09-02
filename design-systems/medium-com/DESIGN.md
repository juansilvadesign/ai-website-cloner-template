# Medium UI Design System

## Personality

Medium pairs a literary, human editorial voice with an extremely restrained product interface. The marketing entry point feels like printed paper; signed-in surfaces are brighter, quieter, and organized by thin rules rather than visible containers.

## Color roles

Warm paper `var(--bg)` is for the public landing page, while `var(--surface)` is the reading and account canvas. Near-black `var(--fg)` supplies almost all hierarchy. Medium green `var(--accent)` is intentionally scarce: one affirmative action or positive metric at a time.

## Typography

`var(--font-display)` is an editorial serif proxy for the marketing headline and long-form story titles. `var(--font-body)` handles navigation, author metadata, lists, metrics, and controls. Use tight tracking only at display scale; body copy prioritizes line length and reading cadence.

## Spacing and layout

The public page uses a broad, almost poster-like 7vw desktop gutter. Product routes use a 72px desktop rail plus a centered, max-width content column. Product cards are light-outline panels with broad vertical breathing room rather than dense grids.

## Components and states

Primary actions are black pills on the public page and green pills in signed-in product views. Secondary actions are outlined pills. Product tabs use a 1px active underline. Lists use large bordered rows. Story tools are plain icon buttons that only gain a faint hover circle.

## Motion

The scoped screens are light-motion: 150ms hover colors and 220ms tab/dialog transitions. No entrance sequences, parallax, autoplay, or continuously animated decoration are required for the UI-only reconstruction.

## Accessibility

All icon-only controls need an accessible name; focus is a visible green ring. Large editorial text may use the serif display stack, but UI labels and status values retain the higher-legibility body stack. The visual hit area of compact icons expands to at least 40px.

## Anti-patterns

Do not turn the product into a card-heavy dashboard. Avoid gradients, excessive green, heavy shadows, rounded rectangular icon backgrounds, or all-caps navigation. Do not use the warm marketing canvas inside the reading/product routes.
