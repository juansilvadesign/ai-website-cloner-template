# Using the Reflect Design System

## Read Order

1. Read `DESIGN.md` for visual hierarchy and interaction constraints.
2. Import `tokens.css`; it is the only shared token source.
3. Inspect `components.html` for the representative component vocabulary.
4. Open the preview pages to compare color, typography, and spacing.
5. Check `source/evidence.md` before revising evidence-backed decisions.

## Design Highlights

- Midnight violet is continuous; elevated surfaces are subtle glass, not opaque cards.
- AeonikPro creates only the major display hierarchy; Inter V handles everything else.
- Purple is a reserved signal for action and intelligent-system moments.
- Fine vertical and horizontal rules make grids feel technical without becoming busy.
- Atmosphere is delivered by one halo or glow per section, then supported by restrained copy.

## Do

- Use `var(--...)` values in every Astro component.
- Keep navigation, labels, and controls compact at 14px/20px.
- Use real semantic buttons for the AI demo and give them a focus treatment.
- Collapse grids to a readable single column before content becomes cramped.
- Honor reduced motion and keep all copy visible in the static markup.
- Use a border-plus-inset-ring before adding a conventional box shadow.

## Avoid

- Hardcoding a second purple, black, or neutral palette in component CSS.
- Adding gradients behind ordinary body-copy panels.
- Giving every section both stars and a glow effect.
- Making the static page depend on a canvas, video, or client-only island.
- Shrinking text rather than changing grid layout for mobile.
- Replacing the calm Inter V body rhythm with dense dashboard typography.
