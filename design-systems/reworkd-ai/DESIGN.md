# Reworkd Design System

## 1. Personality

Reworkd makes a complex engineering task feel calm, legible, and inevitable. The page is white and spacious rather than aggressively futuristic: technical density appears inside small browser-like demonstrations, while the surrounding brand language stays precise, quiet, and human.

## 2. Color Roles

`--bg` is a clean white canvas. `--surface` is the soft gray product-paper used for inactive controls and technical panels; `--surface-warm` is the pale-blue atmosphere that carries hero and problem transitions. Charcoal `--fg` owns reading and display text. Azure is an intentionally scarce signal for a primary action, the hero word treatment, data status, and the central closing card.

## 3. Typography

Selecta Medium is the display face: it renders a compact 80/76 hero and 40/44 desktop section titles with negative tracking. Suisse Intl is the body and control face at 16/24. Geist Mono labels technical domains, questions, counters, and small system UI at 12/20. Do not replace the contrast between editorial display type and sober product UI with a single generic sans-serif.

## 4. Spacing and Layout

At desktop, a 1344px outer container yields a 1216px content band after its 64px inset. The page alternates full-bleed atmospheric bands with centered editorial headers and exact grid frames. White space is structural: each major story begins after 136px of breathing room. On phones, the layout keeps a 16px gutter, collapses cards vertically, and uses generous rather than cramped stacking.

## 5. Surfaces and Components

The vocabulary consists of a narrow top announcement, a restrained fixed navigation rail, square-ish azure action buttons, tiny selected tabs, faint table dividers, browser/dashboard mockups, three-column benefit cells, compact analytics pills, and a deep charcoal proof zone. Corners are mostly 6–8px; the final data-different card alone gets a larger presentation radius and blue atmospheric sweep.

## 6. States and Interaction

The hero browser uses click-selected data-source tabs. Its selected tab changes from pale `--surface` to a slightly darker surface with a `--border` edge. Buttons brighten within a 200ms state change. The problem browser gains a low-opacity blurred veil on hover. At narrow widths, the desktop links compact to an explicit menu button and a vertically stacked drawer.

## 7. Motion

The original contains multiple canvases inside otherwise static product scenes, including typewriter, table scan, waveform, chart, and footer-line effects. The clone treats this as a heavy-motion source: it preserves the readable static system frames, a small selected-tab/scan enhancement, and button transitions while using CSS mockups for canvas-only decoration. Motion never hides source copy and is disabled for reduced-motion users.

## 8. Responsive Behavior

The 1440px reference uses a centered desktop nav, broad 3-column benefits, a 2×3 feature grid, and a three-value proof rail. At 768px visual panels become narrower but retain hierarchy. At 390px the hero display becomes a 40px two-line statement, the browser mockup crops into a safe single-column board, all feature cards become stacked, and proof metrics become a vertical sequence.

## 9. Accessibility

All interactions use native buttons or anchors. The header menu exposes its `aria-expanded` state, tab controls use `aria-selected`, and the mockup data table remains textual rather than canvas-only. System illustrations are decorative and hidden from assistive technology. The blue focus ring is visible on white and dark surfaces.

## 10. Anti-Patterns

- Do not make every background blue; blue is the extraction signal, not page wallpaper.
- Do not turn the source into a generic rounded-card SaaS landing page.
- Do not lose the narrow mono labels or soften the display hierarchy with oversized body type.
- Do not use a live canvas for decorative dashboards when a durable CSS or static fallback gives the same reading hierarchy.
- Do not leave a raw root-relative URL that bypasses the clone namespace.
