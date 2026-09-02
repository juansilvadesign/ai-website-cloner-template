# Using the Medium UI Design System

## Read Order

1. Read `DESIGN.md` for the visual language.
2. Load `tokens.css` before any clone-specific stylesheet.
3. Inspect `components.html` for control patterns.
4. Use the preview pages to verify color, typography, and rhythm.
5. Read `source/evidence.md` before treating a derived reference value as exact.

## Design Highlights

- Editorial serif is reserved for the human-facing story hierarchy.
- Product UI is mostly white, black, gray, and hairline borders.
- Medium green is an affirmative signal, not a decoration.
- Whitespace replaces heavy card treatment.

## Do

- Use the declared tokens rather than reintroducing palette or spacing literals.
- Keep a single primary action visible in each bounded product section.
- Preserve generous story column width and strong vertical dividers.
- Pair icon-only controls with an accessible label and a reliable focus state.

## Avoid

- Large shadows, gradients, vivid status colors, or gratuitous border radii.
- More than one green primary button in a local action group.
- Dense dashboard tiles for audience metrics.
- Copying private account values or unscoped article body text into the static UI demo.
