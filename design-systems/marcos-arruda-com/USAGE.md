# Using the Marcos Arruda Portfolio System

## Read Order

1. Read `DESIGN.md` for the visual intent, surface alternation, responsive constraints, and interaction model.
2. Load `tokens.css`; it is the emitted token contract for all Astro clone styles.
3. Inspect `components.html` for the header, case hero, statement band, project record, media tile, and contact footer patterns.
4. Audit provenance in `source/evidence.md` and `source/tokens.source.json` before changing a verified value.

## Design Highlights

- Pure black and white editorial bands, rather than neutral app surfaces.
- Space Grotesk display headings paired with wide Avenir reading text.
- `#eeff03` is an annotation/highlight accent, not a page background.
- A 5vw desktop gutter and 12px phone gutter keep the composition aligned.
- Square image edges, flat elevation, and clear full-bleed media.
- A real full-screen Work / About / Contact menu dialog.

## Do

- Use `var(--surface)` for text on black and `var(--fg)` for text on white.
- Keep case-study titles and visual gallery media square-edged.
- Preserve the route-local asset and link prefixes when adding content.
- Use the local font mirrors and responsive section rhythm.
- Keep the menu button, dialog semantics, Escape close, and visible keyboard focus intact.

## Avoid

- Do not create a second palette or a Tailwind token layer.
- Do not introduce pills, rounded cards, glows, or decorative shadows.
- Do not fill large regions with the acid-yellow accent.
- Do not point local project links back to the source origin.
- Do not delete the historic portfolio detail route template merely because its source copy is generic.
