# Ruama Cori · Nutricionista — Usage Notes

## Read Order

1. Read `DESIGN.md` for the composition, voice, and responsive rules.
2. Import `tokens.css` through the clone-local stylesheet before any component CSS.
3. Use `components.html` for the hero, action-card, protocol, and menu vocabulary.
4. Review the three preview pages before adding a new visual pattern.

## Design Highlights

- Soft off-white canvas, wine ink, and concentrated coral emphasis.
- Roxborough display typography with Degular UI/body copy.
- A desktop three-column mosaic that becomes an intentional phone sequence.
- Real photo/video artwork rather than decorative gradients or stock imagery.
- Small controls, very rounded media panels, and one green conversion action.

## Do

- Use `var(--font-display)` for the hero word and editorial card titles.
- Use `var(--font-body)` for all copy, controls, and action labels.
- Preserve the `1024px` layout switch and 16px mobile page gutter.
- Reuse the source photo/video assets from `/clones/bio-nutriruama-com-br/`.
- Keep white text only where it overlays media or coral/olive treatments.

## Avoid

- Do not use coral as a full-page background in light mode.
- Do not square the 18–38px media cards or modal panel.
- Do not replace the actual social/menu controls with text-only placeholders.
- Do not stack desktop content in a different order on phone.
- Do not create a second token palette in component CSS.
