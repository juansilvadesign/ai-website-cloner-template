# Using the Adspirer Design System

## Read Order

1. Read `DESIGN.md` for the visual and interaction principles.
2. Import `tokens.css`; it is the emitted source of shared values.
3. Inspect `components.html` for representative states.
4. Use previews to verify color, type, and spacing decisions.
5. Consult `source/evidence.md` before changing a token’s rationale.

## Design Highlights

- Cool gray canvas and white product surfaces establish a clean operational mood.
- Geist carries confident display hierarchy; Inter keeps product instructions practical.
- Saturated blue has a deliberate job: primary action and selected state.
- Soft rings and large spacing do more work than drop shadows.
- A responsive 992px navigation shift preserves legibility without shrinking controls.

## Do

- Use semantic headings and `var()` tokens in all clone components.
- Keep primary actions blue and make secondary actions outlined or neutral.
- Make selected tabs, billing options, and navigation controls keyboard operable.
- Retain 20px minimum phone gutters and stack complex grids early.
- Honor `prefers-reduced-motion` for marquee, reveal, and press transitions.
- Use small metadata to support—not compete with—headlines.

## Avoid

- Hardcoded color, radius, font, or spacing values that duplicate the token system.
- A blue gradient as a default card treatment.
- More than one prominent blue call-to-action in a local visual group.
- Dense metrics dashboards, fake terminal screens, or decorative AI sparkles.
- Thin or low-contrast interactive borders without a focus state.
- Hiding plan, navigation, or workspace information behind motion-only behavior.
