# Using the Hello Parul Portfolio System

## Read Order

1. Read `DESIGN.md` for the hierarchy and visual intent.
2. Import `tokens.css`; it is the sole source for reusable colors, typography, spacing, radius, elevation, motion, and layout values.
3. Review `components.html` and the three preview pages for the component vocabulary.
4. Consult `source/evidence.md` before changing a value that appears unusually specific.

## Design Highlights

- Warm cream canvas, almost-black editorial ink, and one urgent red action color.
- Bricolage Grotesque display text paired with Instrument Sans body and Space Mono metadata.
- A wide, quiet desktop shell punctuated by intentionally full-bleed dark bands.
- Evidence-based cards with a strict 2px outline and red offset hover, not standard shadow-heavy UI.
- Mobile is a true reflow: cards stack, compact card detail hides, and bottom navigation appears.

## Do

- Use display tokens for headings and Space Mono only where the source uses compact labels or technical voice.
- Keep primary content server-rendered and use ordinary anchors for work navigation.
- Use real local source screenshots under `/clones/helloparul-in/images/`.
- Use `--radius-lg` for featured work cards and `--radius-pill` for actions/chips.
- Reproduce the red hover offset only on hover-capable devices.

## Avoid

- Do not hardcode a second color or typography scale in component CSS.
- Do not add a universal card shadow, blurred glass surfaces, or rounded soft-gray dashboard aesthetic.
- Do not let a small mobile viewport shrink the cards into a desktop two-column layout.
- Do not replace the marquee with a static row of generic tags.
- Do not introduce client-only content or fabricate case-study visuals.
