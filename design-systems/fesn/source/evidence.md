# FESN Carteirinha — Extraction Evidence

**Target:** `https://carteirinha.fesn.org.br` — routes `/`, `/vendas`, `/student-card`
**Extracted:** 2026-07-27
**Ownership:** the target is the operator's own application
(`github.com/juansilvadesign/student-id`, package name `fesn`).

## Method

Two independent sources, cross-checked:

1. **Authored CSS.** The app serves one stylesheet chunk,
   `/_next/static/chunks/5b7d3ecb351a2e21.css`. Its `:root` block is emitted **twice** — first
   as sRGB hex, then as a `lab()` progressive-enhancement block. The hex block is authored
   ground truth and is cited directly for every token that originates in `:root`.
2. **Computed styles.** Everything not declared in `:root` (the brand palette, the type ramp,
   layout rhythm, interaction states) was read with `getComputedStyle()` in headless Chromium at
   1440×900, 768×1024 and 390×844, `locale: pt-BR`, `deviceScaleFactor: 1`, after a full scroll
   pass and `document.fonts.ready`.

### Colour conversion caveat

Chromium **re-serializes** `lab()` / `oklab()` values rather than returning `rgb()`, and setting
a value on a probe element and reading it back returns the same `lab()` string. Two conversion
attempts were discarded before a correct one was found:

- A hand-rolled CIE-Lab→sRGB conversion using a **D65** white point produced values 1–3 per
  channel off on chromatic colours (`#09172b` where the palette says `#0f172b`). CSS Color 4
  Lab uses **D50**.
- Reading `getComputedStyle().color` off a probe element returned the `lab()` string, whose
  numeric components were then mis-parsed as RGB — producing nonsense (`--background: #640000`).

The accepted method is a **1×1 canvas readback**: `ctx.fillStyle = <value>; fillRect; getImageData`
returns true sRGB bytes. Every converted value below round-trips exactly onto a hex declared in
the stylesheet's Tailwind palette, which is the correctness check.

| Measured `lab()` | Canvas → hex | Palette match |
| --- | --- | --- |
| `lab(7.78673% 1.82345 -15.0537)` | `#0f172b` | `--color-slate-900` |
| `lab(26.9569% -1.47016 -15.6993)` | `#314158` | `--color-slate-700` |
| `lab(35.5623% -1.74978 -15.4316)` | `#45556c` | `--color-slate-600` |
| `lab(48.0876% -2.03595 -16.5814)` | `#62748e` | `--color-slate-500` |
| `lab(36.9089% 35.0961 -85.6872)` | `#1447e6` | `--color-blue-700` |
| `lab(91.7353% -0.998765 -4.76968)` | `#e2e8f0` | `--color-slate-200` |
| `lab(96.492% -1.14644 -5.11479)` | `#eff6ff` | `--color-blue-50` |
| `lab(1.76974% 1.32743 -9.28855)` | `#020618` | `--color-slate-950` |

## Confidence summary

**56/56 slots carry a value: 53 `high`, 3 `derived`, 0 `fallback`.**

The three derived values are the only ones not directly observable on the target:

| Token | Value | Why derived |
| --- | --- | --- |
| `--accent-on` | `#ffffff` | The target never renders a filled-accent surface — `--accent` is only ever used as *text* colour. White is the only pairing that clears AA against `#1447e6` (6.9:1). |
| `--accent-active` | `#1e3a8a` | No pressed accent state exists on the target. Taken one step below the observed `--accent-hover` (`#193cb8`). |
| `--elev-ring` | `0 0 0 1px var(--border)` | The target draws its card edge as a real 1px `border`, not a ring. Expressed as a ring for schema parity; visually identical. |

Everything else was either read from the authored `:root` or measured on a rendered element.

## Findings worth acting on

### 1. Geist is declared but never delivered

The stylesheet sets `--font-geist-sans: Geist, "Segoe UI", …` and applies it globally, but:

- font file requests (`.woff2 | .woff | .ttf | .otf`) across a full page load: **0**
- `@font-face` rules across all stylesheets: **0**
- `document.fonts.size`: **0**

The site therefore renders in **Segoe UI** on Windows, **Helvetica Neue** on macOS, and a
generic sans elsewhere. Geist appears only for visitors who happen to have it installed locally.
The package reproduces the declared stack verbatim, because self-hosting Geist would change what
every real visitor sees. If the intent was to ship Geist, that is a genuine bug in the target.

### 2. There is no dark theme

`.dark` appears 25 times in the stylesheet, but only inside stock shadcn utility variants
(`dark:aria-invalid:ring-destructive/40` and similar). There is **no `.dark { --background: … }`
token override block**, and adding `.dark` to `<html>` on all three routes leaves both
`--background` and the computed `body` background byte-identical. `themes.dark` is therefore
omitted rather than invented.

### 3. The semantic layer is stock; the brand lives in utilities

`:root` carries shadcn's untouched **neutral** theme (`--primary: #171717`,
`--accent: #f5f5f5`, `--muted-foreground: #737373`). None of that is the brand. The actual FESN
expression — slate ramp, blue-700 accent, amber highlight — is applied through Tailwind utility
classes on individual elements.

This package maps the **observed** roles, not the declared shadcn names. Two deliberate
divergences:

- `--accent` is `#1447e6` (blue-700, the real emphasis colour), **not** shadcn's
  `--accent: #f5f5f5`, which is a hover-grey.
- `--border` is `#e2e8f0` (slate-200, the visible card edge used everywhere), while shadcn's
  `--border: #e5e5e5` is mapped to `--border-soft`, matching its actual use on form controls and
  row separators.

### 4. Tailwind scale-name offset

The schema's eight type slots are mapped to the eight sizes the target actually renders, which
are **not** name-aligned with Tailwind's:

| Schema slot | Value | Tailwind class |
| --- | --- | --- |
| `--text-xs` … `--text-lg` | 12 / 14 / 16 / 18px | `text-xs` … `text-lg` |
| `--text-xl` | 24px | `text-2xl` |
| `--text-2xl` | 30px | `text-3xl` |
| `--text-3xl` | 36px | `text-4xl` |
| `--text-4xl` | 48px | `text-5xl` |

`text-xl` (20px) is never used by the target — it is absent from the compiled `--text-*`
variables, which Tailwind v4 emits only on demand. The slots are therefore packed to real,
monotonically increasing tiers rather than left with a hole.

### 5. Two shadows exist, and only one fits the schema

Enumerating every distinct `box-shadow` across `/vendas` returns exactly two:

| Shadow | Applied to | Disposition |
| --- | --- | --- |
| `0 1px 2px 0 rgb(0 0 0 / .05)` | buttons, the CPF input | `--elev-raised` |
| `0 10px 15px -3px rgb(226 232 240 / .6)`, `0 4px 6px -4px rgb(226 232 240 / .6)` | the hero side card, and nothing else | component-scoped; no slot |

The second is `shadow-lg shadow-slate-200/60` — a **tinted** lift rather than a black one. The
schema's three elevation slots (`--elev-flat`, `--elev-ring`, `--elev-raised`) are all already
bound to observed values, so promoting it would mean displacing a more broadly used one. It is
documented in `DESIGN.md` as a one-off hero treatment instead.

An earlier draft of this package claimed the system had exactly one shadow. That was wrong and
is corrected here and in `DESIGN.md`/`USAGE.md`.

### 6. `/student-card` is a separate visual register

The credential page abandons the marketing palette for a pink/magenta ribbon
(`/bg-student-card-2026.png`) over lavender, with a blue→indigo text gradient on the year.
None of that is promoted into the token set — it is documented in `DESIGN.md` as scoped
styling, because hoisting it would misrepresent the system.

### 7. Accessibility gap in the target

`/` ships **no `<h1>`** — "Encontrar carteirinha" is a styled `<div>`. Not reproduced; the clone
promotes it to a real heading.

## PII handling

The owner supplied `?documento=19651595752`, which resolves to a real card (name, photo, CPF,
date of birth, CIE code). This package and the tracked `docs/` tree are committed to a **public**
repository, so:

- No screenshot containing the real card was written into the repository. Those captures live
  only in the session scratchpad.
- The clone ships mock values and a placeholder portrait and QR.
- The only card-derived values recorded here are structural (layout, type sizes, radii, colours).
