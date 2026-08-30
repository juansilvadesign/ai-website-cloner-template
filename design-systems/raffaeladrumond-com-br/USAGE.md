# Dra. Raffaela Drumond — Usage Notes

## Read Order

1. Read `DESIGN.md` for the identity and component language.
2. Import `tokens.css` before any clone-local CSS.
3. Use `components.html` as the visual vocabulary reference.
4. Check the preview pages before inventing a new layout treatment.

## Design Highlights

- Low-contrast off-white canvas with a dark olive editorial ink.
- IvyPresto display typography for headings; Poppins for all supporting text.
- A limited sage/olive accent reserved for emphasized words, icons, and CTAs.
- 20px rounded panels, large photography, and broad reading columns.
- Warm white accordion interiors and whisper-level shadows add tactility without looking glossy.

## Do

- Use `var(--font-display)` for page titles and treatment categories.
- Use `var(--font-body)` for copy, labels, links, and controls.
- Compose major layouts with generous `--section-y-*` padding.
- Keep CTAs olive with `--accent-on` content and a dark-olive hover state.
- Use native semantic elements for menu, accordion, and card structures.

## Avoid

- Do not replace the display font with a geometric sans serif.
- Do not use `--accent` as a general background for every card or section.
- Do not square off the rounded 20px surfaces.
- Do not introduce a second saturated action color.
- Do not compress editorial image/text pairings into a dense dashboard grid.
