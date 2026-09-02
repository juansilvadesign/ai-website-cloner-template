# AudiencePage specification

## Overview

- **Target file:** `src/clones/medium-com/components/AudiencePage.astro`
- **Screenshot:** `docs/design-references/medium-com/public-audience-reference.png`
- **Interaction model:** click-driven secondary action feedback

## DOM Structure

`section > heading/action row + live notice + metrics grid + growth intro/chart + explanatory info`.

## Computed Styles (reconstruction values)

### Header/actions

- heading: 48px Inter bold, tight tracking
- update label: 14px gray
- action: 40px outlined pill, 14px label

### Metrics

- grid: three columns desktop, 48px gaps
- label: 12px uppercase gray
- value: 48px bold, tight tracking
- delta: 14px green linked text
- section separation: 1px soft-gray divider and 56px bottom padding

### Chart

- two columns: 25% description / remainder SVG
- gridlines: soft gray; line/circle: Medium green
- SVG min-height: 180px

## States & Behaviors

- Action click updates an `aria-live` UI-only notice.
- Outlined action hover fills black and swaps to white text.
- Delta links underline on hover or focus.

## Assets

No analytics payload, real chart data, or private audience values. SVG is static sample visualization.

## Text Content (verbatim UI labels)

`Your audience`, `Updated daily`, `Partner Program earnings`, `Story stats`, `Followers`, `Email subscribers`, `Referred members`, `Monthly growth`.

## Responsive Behavior

- **Desktop:** three metrics and two-column chart row.
- **Tablet:** metrics become two columns; chart intro stacks over visual.
- **Mobile:** one metric per row; chart labels simplify.
