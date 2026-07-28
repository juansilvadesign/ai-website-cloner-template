# FESN Carteirinha — Design System

Extracted from `https://carteirinha.fesn.org.br` on 2026-07-27 (routes `/`, `/vendas`,
`/student-card`). The target is a Next.js + Tailwind v4 + shadcn application for issuing and
verifying Brazilian digital student ID cards (*carteirinha de estudante* / DNE).

## Personality

**Institutional plainness.** This is a document-issuing service for a student federation, and
the design reads like paperwork done well rather than a consumer product: near-black type on
white, hairline borders instead of shadows, one chromatic accent used sparingly, and zero
decorative motion. Trust is communicated through restraint and specificity — verifiable QR
codes, named officers, a Reclame Aqui reputation badge — not through visual excitement.

The one deliberate exception is `/student-card`, which abandons the restrained system entirely
for a saturated pink-on-lavender ribbon. That page is a *credential*, not a webpage: it imitates
a physical card so it reads as an artifact when shown on a phone at a cinema counter. Treat it
as a separate visual register that borrows the type and radius scale but not the palette.

Three rules define the voice:

1. **Borders, not shadows.** The whole system contains exactly two box-shadows: `--elev-raised`,
   a 1px hairline on form controls, and one soft slate lift reserved for the single hero side
   card. Every other card is separated by a `--border` edge alone.
2. **Neutral action, chromatic emphasis.** The primary button is near-black, not blue. Blue is
   reserved for *labelling* things (step eyebrows, links, informational panels).
3. **No motion beyond feedback.** Transitions exist only to acknowledge hover and focus.

## Color roles

The neutral spine is a cool slate ramp; the chromatic layer is a single blue with one amber and
one green for semantics.

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#ffffff` | Page canvas. Both marketing shells paint a faint gradient over it (slate-50 → white → slate-100/70) — the base stays white. |
| `--surface` | `#ffffff` | Every card. Surface and background are intentionally identical; separation comes from `--border`. |
| `--surface-warm` | `#eff6ff` | Informational panels only — the "Benefício financeiro recorrente" box and the CTA band tail. |
| `--fg` | `#0f172b` | Page ink and all headings. |
| `--fg-2` | `#314158` | Lead paragraphs and long-form body copy. |
| `--muted` | `#45556c` | Card descriptions. |
| `--meta` | `#62748e` | Helper text, footnotes, footer legal lines. |
| `--border` | `#e2e8f0` | The visible card edge. |
| `--border-soft` | `#e5e5e5` | Quieter hairline: form controls, FAQ row separators. |
| `--accent` | `#1447e6` | Step eyebrows, inline links, section icons. |
| `--accent-hover` | `#193cb8` | Deeper accent tier — the hero badge label on a pale blue pill. |
| `--success` | `#00a544` | The `✓` on the Certificado pill. |
| `--warn` | `#dd7400` | The highlighted savings clause in the hero lead. |
| `--danger` | `#e40014` | Declared, never rendered — see anti-patterns. |

**The four-tier foreground ramp is the most load-bearing decision here.** `--fg` → `--fg-2` →
`--muted` → `--meta` is a real hierarchy the target uses consistently: heading, lead, card body,
footnote. Collapsing it flattens the whole system.

Contrast on white: `--fg` 17.4:1, `--fg-2` 9.4:1, `--muted` 7.0:1, `--meta` 4.8:1, `--accent`
6.9:1. All pass WCAG AA for their sizes; `--meta` is at the edge and must not go below 14px.

## Typography

One family for everything: `--font-display` and `--font-body` are the same stack. There is no
serif, no secondary voice.

```
Geist, "Segoe UI", "Helvetica Neue", Arial, sans-serif
```

**Geist is declared but never delivered** — the target ships no `@font-face` and makes zero font
requests. In practice this renders as Segoe UI on Windows and Helvetica Neue on macOS. The stack
is reproduced verbatim rather than "fixed", because self-hosting Geist would change the rendered
result on every real user's machine.

| Token | Value | Used for |
| --- | --- | --- |
| `--text-xs` | 12px | Uppercase eyebrows, helper text, legal lines |
| `--text-sm` | 14px | Buttons, labels, card body, footer links |
| `--text-base` | 16px | Long-form body, FAQ triggers |
| `--text-lg` | 18px | Hero lead, benefit-card titles |
| `--text-xl` | 24px | Section headings, phone/tablet step |
| `--text-2xl` | 30px | Section headings, desktop |
| `--text-3xl` | 36px | Hero display, tablet step |
| `--text-4xl` | 48px | Hero display, desktop |

Weights are only 400 / 500 / 600 / 700. Body is 400, controls and labels 500, section headings
and card titles 600, hero display and the card credential 700.

`--leading-tight` (1.25) applies to display type; `--leading-body` (1.625) to everything read in
paragraphs. `--tracking-display` is **`0em`** — this brand does not tighten large type. Wide
tracking (`.1em`) is reserved exclusively for uppercase eyebrows and badges, which is what makes
those small labels read as institutional rather than shouty.

## Spacing and layout

The scale is a strict 4px grid (`--space-1` … `--space-12`), inherited from a `--spacing: .25rem`
base.

- `--container-max` is **1152px**, centered.
- Gutters step once: `--container-gutter-phone` 16px → 24px at ≥640px, and stay 24px to desktop.
- Section rhythm is `--section-y-tablet` / `--section-y-phone` 64px, opening to
  `--section-y-desktop` 80px at ≥1024px. **Phone and tablet are the same** — the brand does not
  compress vertical rhythm on small screens.

Grids collapse at a single breakpoint. The hero is `1.15fr 0.85fr` at ≥1024px and stacks below;
the benefit and step grids are 3-up at ≥768px and 1-up below. There is no 2-up intermediate
state anywhere, which keeps the responsive behavior trivial to reason about.

## Components and states

**Buttons** come in exactly two weights plus a pill link.

- *Primary*: `--fg`-adjacent near-black `#171717` on white text, `--radius-sm`, 40px tall,
  24px horizontal padding, 14px/500. Hover drops the background to 90% alpha.
- *Outline*: white on `--border-soft`, carries `--elev-raised`. Hover fills to `#f5f5f5` and
  darkens the label.
- *Pill link*: `--radius-pill`, 30px tall, `--border-soft` edge, `--fg-2` label. Hover moves the
  border one slate step darker and the label to `--fg`.

**Cards** are white, `--radius-md` (14px), `--border`, `--space-6` padding, no shadow. The one
consulta card on `/` is `--radius-lg` (18px) and capped at 512px.

**Input** is 44px tall, `--radius-sm`, `--border-soft`, with `--elev-raised` in the resting
state. Focus swaps the border to `#a1a1a1` and adds `--focus-ring`.

**One card breaks the flat rule** — the hero side panel on `/vendas`. It is 22px
(`rounded-3xl`), `rgb(255 255 255 / .95)`, bordered `rgb(226 232 240 / .8)`, and carries
`0 10px 15px -3px rgb(226 232 240 / .6), 0 4px 6px -4px rgb(226 232 240 / .6)` — a *tinted*
slate lift, never a black one. There is no schema slot for it (all three elevation slots are
spoken for), so it lives as a component-scoped value. Treat it as a one-off accent for a hero
panel, not a reusable card elevation.

**Badges** are `--radius-pill`, 12px/600, uppercase, `.1em` tracking — either neutral (`#f5f5f5`
on `--fg-2`) or accent (pale blue on `--accent-hover`).

**Accordion** is single-open and collapsible. Triggers are 56px tall, 16px/500, with a chevron
that rotates 180° over `--motion-base`.

## Motion

Deliberately minimal, and worth preserving as a constraint rather than an omission.

- `--motion-fast` (150ms) with `--ease-standard` governs every hover and focus transition.
- `--motion-base` (200ms) governs only the accordion chevron and panel height.
- There is **no** scroll-driven behavior, no reveal-on-scroll, no parallax, no sticky layer, no
  carousel, and no autoplay anywhere in the system.

If you extend this system, new motion should stay inside these two durations and this one easing
curve. A third timing would be visible as inconsistency.

## Accessibility

- All four foreground tiers clear WCAG AA on `--surface`; keep `--meta` at 14px or larger.
- `--focus-ring` is a 3px neutral halo, not an accent color, so it stays visible against both
  white surfaces and the near-black primary button. Never remove it without a replacement.
- The accordion must keep `aria-expanded` semantics; the native `<details name>` pattern
  provides these for free along with correct single-open behavior.
- Uppercase eyebrows are styled with `text-transform`, not authored in caps, so screen readers
  announce them normally.
- Known gap in the target, not reproduced as a virtue: `/` ships **no `<h1>`** — its heading is
  a styled `<div>`. The clone promotes it to a real `h1`.

## Anti-patterns

- **Do not add shadows to cards.** The system separates surfaces with `--border`. A shadow on a
  card immediately reads as a different product.
- **Do not make the primary button blue.** Blue labels things; near-black acts. Swapping these
  inverts the whole hierarchy.
- **Do not tighten display tracking.** `--tracking-display: 0em` is measured, not an oversight.
- **Do not use `--danger` for form validation.** The target deliberately has no inline error
  state — a failed lookup produces a full not-found *page*. Inline red field errors would be a
  new pattern, not an extension of this one.
- **Do not collapse `--fg-2` into `--fg`, or `--meta` into `--muted`.** The four-tier ramp is
  the system's main instrument for hierarchy given how little color it uses.
- **Do not carry the `/student-card` palette into the marketing pages.** The pink/lavender
  credential styling is scoped to the card artifact only.
