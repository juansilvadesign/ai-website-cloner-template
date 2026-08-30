# Using the Consulta de Processos System

## Read Order

1. Read `DESIGN.md` for the hierarchy, responsive contract, motion, and fidelity boundaries.
2. Load generated `tokens.css` before clone CSS; it is the single reusable token source.
3. Inspect `components.html` for the header action, eyebrow, feature card, product chip, CTA, and FAQ conventions.
4. Use `source/evidence.md` and `source/tokens.source.json` to audit any value or its confidence.

## Design Highlights

- Inter-only type system with tightly tracked 48px hero display.
- White/slate legal-data interface, punctuated by teal conversion/product states.
- 1336px desktop container and 20px phone gutter.
- Alternating information surfaces and patterned teal product sections.
- Fine card borders, restrained elevation, and 8–16px radii.
- Moderate native interaction: mobile navigation, dropdown, deck rotation, sticky scroll rail, and FAQ accordion.

## Do

- Use the real local assets under `/clones/consultadeprocessos-com-br/`.
- Keep primary teal actions visually dominant and section descriptions understated.
- Preserve the desktop/mobile section transformations defined in the evidence.
- Use real Portuguese labels and semantic, server-rendered content.
- Keep motion progressive and honor reduced-motion preferences.

## Avoid

- Do not add an independent token palette, Tailwind utility layer, or UI library to the Astro clone.
- Do not copy remote account, payment, or legal-search behavior.
- Do not replace layered product/data mockups with generic stock imagery.
- Do not make all sections teal or give every card a strong shadow.
- Do not leave root-relative assets or navigation URLs outside the clone namespace.
