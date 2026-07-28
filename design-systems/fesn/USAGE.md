# FESN Carteirinha — Usage

How to consume this package when building or extending FESN surfaces.

## Read Order

1. **`tokens.css`** — the contract. Import it first; every other file assumes these 56 custom
   properties are declared. It is emitted, never hand-edited.
2. **`DESIGN.md`** — why the values are what they are. Read *Color roles* and *Components and
   states* before writing any component.
3. **`components.html`** — the token-wired fixture. Copy these patterns rather than inventing
   new ones; every rule references only declared tokens.
4. **`preview/colors.html`, `preview/typography.html`, `preview/spacing.html`** — visual
   reference for the ramps when you need to pick a tier.
5. **`source/evidence.md`** — provenance and confidence per token. Read this before changing a
   value; three tokens are derived rather than measured and are the only safe ones to revisit.
6. **`source/tokens.source.json`** — the editable source. Change values here, then re-run the
   emitter. Never edit `tokens.css`, `design-tokens.json`, `tailwind-v4.css`, or
   `components.manifest.json` directly.

## Design Highlights

- **56/56 slots carry a real value** — 53 measured at high confidence, 3 derived, zero schema
  fallbacks. This package describes the brand rather than inheriting defaults.
- **Light theme only.** The target has no dark mode: adding `.dark` to the document root changes
  nothing on any route, and the source stylesheet has no token override block. There is no
  `[data-theme="dark"]` section, and inventing one would be fabrication.
- **A four-tier foreground ramp** (`--fg` → `--fg-2` → `--muted` → `--meta`) does the hierarchy
  work that most systems hand to color or weight.
- **Two shadows, total.** `--elev-raised` is a 1px hairline on form controls; one *tinted slate*
  lift is reserved for the hero side card and has no schema slot. Every other card uses
  `--border` alone.
- **Neutral primary, chromatic label.** Actions are near-black; `--accent` blue marks steps,
  links, and informational panels.
- **Two durations, one curve.** `--motion-fast` 150ms, `--motion-base` 200ms, both on
  `--ease-standard`.
- **`--tracking-display: 0em`** is measured. Wide `.1em` tracking belongs to uppercase eyebrows
  only.

## Do

- Import `tokens.css` once at the root and reference `var(--…)` everywhere below it.
- Separate surfaces with `--border`; reach for `--elev-raised` only on form controls.
- Use the foreground ramp positionally: heading `--fg`, lead `--fg-2`, card body `--muted`,
  footnote `--meta`.
- Keep `--accent` for labelling — eyebrows, links, icons, informational panels.
- Cap content at `--container-max` (1152px) and step gutters 16px → 24px at 640px.
- Use `--section-y-phone`/`--section-y-tablet` (64px) and open to `--section-y-desktop` (80px)
  at ≥1024px.
- Build accordions with native `<details name="…">` — it reproduces the target's single-open,
  collapsible behavior with no JavaScript.
- Keep `--focus-ring` on every focusable control.
- Round with the measured tiers: `--radius-sm` controls, `--radius-md` cards, `--radius-lg` the
  hero-scale card, `--radius-pill` badges and pill links.

## Avoid

- Editing any emitted file. Change `source/tokens.source.json` and re-run
  `scripts/emit-design-system.ts`.
- Adding a dark theme "for completeness" — the brand does not have one.
- Putting shadows on cards, or making the primary button `--accent` blue.
- Tightening `--tracking-display`, or applying `.1em` tracking to sentence-case text.
- Using `--danger` for inline field validation; this system surfaces failure as a whole page.
- Collapsing `--fg-2` into `--fg` or `--meta` into `--muted`.
- Dropping `--meta` below 14px — it sits at 4.8:1 and is the only tier near the AA floor.
- Introducing a third transition duration or a second easing curve.
- Carrying the `/student-card` pink/lavender credential palette onto marketing pages.
- Hydrating static sections. The only interactive element in the entire system is the accordion,
  and it needs no client JavaScript.
