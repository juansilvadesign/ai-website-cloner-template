# CIE Validação DNE — Design System

Extracted 2026-07-28 from `https://fesn.appcie.org/<codigo>`, the credential-verification
endpoint reached from the QR code and the "Certificado" action on a FESN student card. Operated
by FESN on a separate domain and a separate stack: **Angular + Angular Material**, with a
handful of Bootstrap-derived utility classes (`alert-*`, `list-group`, `col-12`).

## Personality

**Bureaucratic legibility.** This page has one job — let a stranger decide whether a document is
genuine — and its design is subordinated entirely to that. There is no marketing voice, no
imagery beyond the credential photo, no motion, and exactly one chromatic colour. Information is
presented as labelled fields in a fixed 772px column, the way a printed certificate would be.

The restraint is not minimalism as taste; it is evidentiary. Pure black text on near-white,
Material's default typography, and a single teal used only to name the sections. When something
is coloured here, the colour is carrying meaning: teal groups fields, green asserts a passed
verification. Nothing is coloured for emphasis alone.

Three defining rules:

1. **One accent, used only as a label.** `--accent` teal appears on section headings and
   nowhere else — never as a fill, a button, or a link.
2. **Fields, not cards.** Data is a two-column label/value grid, not a set of panels. A single
   shell holds the entire document.
3. **Zero motion.** No transition or animation is declared anywhere on the page.

## Color roles

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#ffffff` | Page and sticky header canvas |
| `--surface` | `#f9f9f9` | The one content shell holding the whole document |
| `--surface-warm` | `#c3e6cb` | The success-alert fill behind the verification output |
| `--fg` | `#000000` | All body ink — labels and values alike |
| `--fg-2` | `rgb(0 0 0 / .87)` | Material's primary-text alpha, used by the toolbar |
| `--border` | `#e0e0e0` | The PEM container hairline |
| `--border-soft` | `rgb(0 0 0 / .12)` | Header divider and list-row separators |
| `--accent` | `#24858d` | CIE teal — section headings only |
| `--success` | `#155724` | Verification-result text |

**The palette is deliberately impoverished.** Four ink values, three surfaces, one accent. Note
what is *absent*: there is no muted text tier at all. Field labels and field values are the same
`#000000` — the hierarchy between them is carried entirely by **weight** (400 vs 700), not
colour. `--muted` and `--meta` in this package are derived placeholders, not observed roles;
treat any use of them as an extension beyond what the target does.

Contrast on `--surface`: `--fg` 20.1:1, `--accent` 4.6:1, `--success` on `--surface-warm` 8.6:1.

## Typography

One family for everything, at Material's defaults:

```
Roboto, "Helvetica Neue", sans-serif
```

**Roboto is declared but never delivered** — every `@font-face` entry reports status
`unloaded` and no font file is requested. The page renders in Helvetica Neue or a system sans.
This is the same defect found on the FESN carteirinha target, and the clone reproduces the
declared stack rather than correcting it.

| Token | Value | Used for |
| --- | --- | --- |
| `--text-xs` | 12.6px | The PEM certificate block (0.9 × base) |
| `--text-sm` | **14px** | The document's real base — body, labels, values, alerts, links |
| `--text-lg` | 18px | Teal section headings |
| `--text-xl` | 20px | Sticky-header toolbar |
| `--text-2xl` | 24px | All three document titles |

The ramp stops at 24px. `--text-base`, `--text-3xl` and `--text-4xl` are derived continuations —
this page has no display tier and never uses 16px in visible content.

Weights are only 400, 500 and 700. The load-bearing pair is **400 for a field label, 700 for its
value** — that single contrast does all the work a colour ramp would do elsewhere. `h1` is 400,
`h2` is 500, `h3` is 400: the titles are differentiated by weight, not size.

`--leading-body` is 1.43 (14→20px); `--leading-tight` is 1.33 (24→32px);
`--tracking-display` is `0em`.

## Spacing and layout

`--container-max` is **772px** — narrow, and identical for the header logo row and the content
column. Gutters are a constant 16px at every breakpoint.

The spacing scale is Bootstrap-flavoured rather than a strict 4px grid: the observed values are
4, 12, 15, 16, 20 and 30px. `--space-8` is **30px**, not 32 — that is the real `.texto` section
separation and is preserved rather than rounded.

Layout is a single centred column with a fixed two-part data region: a 424px field block beside
a 348px photo block. Radii step 4 → 6 → 8px (`--radius-sm` rows, `--radius-md` heading chips,
`--radius-lg` the shell).

## Components and states

**Section heading (`.grupo`)** — the signature element. 18px/700 in `--accent`, `--space-3`
padding, `--radius-md`, sized to its text rather than full width. It reads as a chip without a
fill.

**Field row** — `display: flex`, `3px 15px` padding. Label column is a fixed **120px**, value
column takes the rest with a 10px inset. Label 400, value 700, both `--fg`.

**Verification alert** — `--surface-warm` fill, `--success` text, `12px 20px` padding, no border,
no radius, `text-align: justify`, `word-break: break-all`. It contains a pre-formatted, tab-indented
chain-of-trust tree.

**PEM container** — 1px `--border`, `--text-xs`, `white-space: pre-wrap`, `word-break: break-all`,
`text-align: center`, `10px 20px` padding.

**Download rows** — Bootstrap `list-group`: stacked `li` at `12px 20px`, 1px `rgb(0 0 0 / .125)`
borders with `-1px` margin collapse so adjacent borders overlap, `--radius-sm` on the outer corners.

**Links** — left at the UA default `#0000ee` with an underline. The target authors no link
colour, no hover, and no focus style.

**Sticky header** — `position: sticky`, white, 85px: a 64px toolbar holding two logos in a
`space-between` row capped at `--container-max`, then a `--border-soft` divider.

## Motion

**There is none.** No `transition`, no `animation`, no scroll behaviour, no hover state anywhere
on the page. `--motion-fast`, `--motion-base` and `--ease-standard` are Material defaults recorded
so the schema slots resolve; they describe nothing the target actually does.

If you extend this system, adding motion would be a genuine departure from its character, not a
refinement of it.

## Accessibility

- `--fg` on `--surface` is 20.1:1 — the body text is far above AA, appropriate for a document
  read under bad lighting at a ticket counter.
- **The heading order is sound but the sizes are not distinguishable**: `h1`, `h2` and `h3` are
  all 24px, separated only by weight (400/500/400). Screen-reader users get the structure;
  sighted users get almost no visual hierarchy between the three title lines.
- **`--focus-ring` is derived, not observed.** The target authors no focus treatment at all; its
  links rely on the UA outline. Any real use of this system should adopt the derived ring.
- The credential photo carries an **empty `alt`** on the target. The clone supplies a real
  alt text.
- `word-break: break-all` on the alert and PEM blocks will hyphenate mid-word for screen
  magnifier users; it is preserved for fidelity but is a poor pattern to copy forward.

## Anti-patterns

- **Do not introduce a muted grey for field labels.** The label/value distinction is weight-only
  by design. A grey label would read as "secondary information" on a document where every field
  is load-bearing.
- **Do not fill anything with `--accent`.** It is a text colour here. A teal button or banner
  would be a new pattern, not an extension.
- **Do not add motion.** See above.
- **Do not widen `--container-max`.** 772px is what makes the page read as a document rather
  than an app screen.
- **Do not reuse `--surface-warm` decoratively.** `#c3e6cb` means "verification passed" on this
  surface. Using it as a neutral tint would overload a semantic signal.
- **Do not treat this as the FESN design system.** Different owner-facing brand, different
  typeface, different palette, different stack. The two packages are deliberately separate.
