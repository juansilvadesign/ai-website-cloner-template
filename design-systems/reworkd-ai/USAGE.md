# Using the Reworkd Design System

## Read Order

1. Read `DESIGN.md` for hierarchy, motion constraints, and responsive rules.
2. Import `tokens.css` as the sole shared visual contract.
3. Inspect `components.html` for the compact action, data-browser, grid, and proof vocabulary.
4. Use the preview pages to verify colour, type, and spacing changes.
5. Consult `source/evidence.md` before changing any evidence-backed value.

## Design Highlights

- A nearly white product-paper field is interrupted only by one pale-blue narrative atmosphere and one dark proof zone.
- Selecta display type and Geist Mono labels make the page feel editorial and technical at the same time.
- Azure is reserved for extraction, a selected data signal, and conversion moments.
- Faint rules, compact radii, and dense mock UI make the product believable without overwhelming the story.

## Do

- Use `var(--...)` values for reusable colour, type, spacing, elevation, and motion values.
- Keep large headings tightly tracked and keep operational labels in the mono face.
- Preserve textual, server-rendered data inside every UI mockup.
- Collapse grids before shrinking type below the source’s readable phone scale.
- Use a low-contrast border or inset ring before introducing a heavy drop shadow.

## Avoid

- Hardcoding an independent blue, gray, or typography scale in clone components.
- Filling every technical mockup with charts or generic placeholder text.
- Replacing the hero’s disciplined blue word treatment with a broad rainbow gradient.
- Letting mobile navigation sit beneath the announcement overlay.
- Making browser-demo controls depend on a framework hydration boundary.
