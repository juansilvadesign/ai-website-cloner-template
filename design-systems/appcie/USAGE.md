# CIE Validação DNE — Usage

How to consume this package when building or extending CIE verification surfaces.

## Read Order

1. **`tokens.css`** — the contract. Import first; all 56 custom properties are declared there.
   It is emitted, never hand-edited.
2. **`source/evidence.md`** — read this *before* `DESIGN.md` for this package specifically.
   The target declares no tokens of its own, so 20 of 56 slots are derived rather than observed.
   Knowing which is which changes how much you should trust a given value.
3. **`DESIGN.md`** — the reasoning. *Color roles* and *Components and states* are the sections
   that matter before writing anything.
4. **`components.html`** — the token-wired fixture; copy these patterns.
5. **`preview/{colors,typography,spacing}.html`** — visual reference for the ramps.
6. **`source/tokens.source.json`** — the editable source. Change values here and re-run the
   emitter; never edit `tokens.css`, `design-tokens.json`, `tailwind-v4.css` or
   `components.manifest.json`.

## Design Highlights

- **56/56 slots carry a value — 36 measured, 20 derived, 0 schema fallbacks.** The derived share
  is high because the target is Angular Material with **zero declared CSS custom properties**;
  every value had to be read back from rendered output.
- **One accent, label-only.** `--accent` teal marks section headings and nothing else.
- **No muted text tier exists.** Label vs value hierarchy is weight (400 vs 700) at a single
  `--fg`. `--muted` and `--meta` here are placeholders.
- **The real base size is `--text-sm` (14px)**, not `--text-base`. The ramp tops out at 24px.
- **Zero motion.** No transition or animation is declared anywhere on the target.
- **`--container-max` is 772px** with a constant 16px gutter at every breakpoint.
- **One shadow** (`--elev-raised`) on the single content shell; everything else is flat.
- `--space-8` is **30px**, not 32 — the target's spacing is Bootstrap-flavoured, not a 4px grid.

## Do

- Import `tokens.css` once at the root and reference `var(--…)` below it.
- Keep field rows as label/value pairs: 120px label column, 400 weight; value 700, both `--fg`.
- Use `--accent` only as heading text.
- Reserve `--surface-warm` + `--success` for genuine verification results.
- Cap content at `--container-max` (772px) and keep the 16px gutter constant.
- Use `--radius-sm` for stacked rows, `--radius-md` for heading chips, `--radius-lg` for the shell.
- Adopt the derived `--focus-ring` — the target has no focus treatment, and shipping without one
  would carry a real accessibility gap forward.
- Give the credential photo real alt text; the target ships it empty.
- Treat `--text-sm` as your base size.

## Avoid

- Editing any emitted file — change `source/tokens.source.json` and re-emit.
- Introducing a grey for field labels, or otherwise replacing the weight-based hierarchy.
- Filling buttons, banners or chips with `--accent`.
- Adding transitions or animation "to modernise it".
- Widening `--container-max` past 772px.
- Using `--surface-warm` as a decorative tint — on this surface it asserts a passed check.
- Trusting `--muted`, `--meta`, `--warn`, `--danger`, `--font-mono`, `--text-3xl`/`--text-4xl`,
  `--radius-pill` or the motion tokens as observed brand values. They are derived placeholders
  for slots this target never exercises.
- Merging these tokens into `design-systems/fesn/` — different brand, typeface, palette and stack.
