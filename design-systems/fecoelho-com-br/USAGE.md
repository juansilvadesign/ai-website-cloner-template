# Using the Fernanda Coelho Contact Card System

## Read Order

1. Read `DESIGN.md` for the intent, exact visual hierarchy, responsive contract, and fidelity boundaries.
2. Load `tokens.css`; it is the generated source of reusable color, type, spacing, radius, elevation, motion, and layout values.
3. Inspect `components.html` for token-wired examples of the identity block, contact cards, icons, footer, and page layout.
4. Consult `source/evidence.md` and `source/tokens.source.json` when a value or confidence level needs to be audited.

## Design Highlights

- Warm near-white/near-black system themes with authored dark overrides.
- Terracotta primary accent plus violet gradient endpoint.
- Space Grotesk name paired with compact Inter labels and metadata.
- One centered 420px fluid column and a 20px phone gutter.
- Layered circular portrait and five tactile 18px-radius contact actions.
- Light motion only: hover elevation and a 150ms press scale.

## Do

- Use the real portrait, contact labels, subtitles, destinations, and vCard.
- Keep the name as the only `h1` and the actions inside a labelled `nav`.
- Use the token roles, including the evidence-shaped spacing scale and theme shadows.
- Preserve native focus behavior and limit hover styling to hover-capable pointers.
- Let the card contract fluidly rather than introducing a mobile breakpoint.

## Avoid

- Do not invent sections, controls, theme toggles, copy, or social metrics.
- Do not replace local fonts with approximations or remote runtime dependencies.
- Do not apply corporate brand colors to individual icons.
- Do not merge the portrait gradient, image border, and shadow into one flat treatment.
- Do not create a parallel palette or spacing scale in component styles.
