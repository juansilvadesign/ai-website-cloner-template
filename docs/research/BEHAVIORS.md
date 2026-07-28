# FESN — Behavior Bible

**Motion tier: LIGHT.**

Inventory of the animation stack, checked against the triage table:

| Signal | Present | Evidence |
| --- | --- | --- |
| Framer Motion (`data-framer-*`, `data-projection-id`) | No | 0 matching nodes on all 3 routes |
| GSAP / ScrollTrigger | No | absent from bundle chunk list |
| Lenis / Locomotive smooth scroll | No | no `.lenis`, `[data-lenis]`, `[data-scroll]` |
| `<canvas>` / WebGL / three | No | `document.querySelector('canvas')` → null |
| Lottie (`.lottie`, `lottie-player`) | No | 0 nodes |
| Particles / cursor trails | No | none observed |
| Native `<video>` | No | 0 `<video>` elements on all routes |
| Sticky / fixed layers | **No** | `position: sticky\|fixed` count = **0** on all 3 routes |

Everything that moves is a **CSS transition or a Radix accordion height animation**. There is no
scroll-driven behavior of any kind, no reveal-on-scroll, no parallax, no scroll-snap, and no
sticky header — the pages have **no header or nav at all**. Nothing here needs a fallback
substitution, and nothing is deferred.

- **Global transition:** `--default-transition-duration: .15s`,
  `--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1)`.
- **Elements carrying a transition:** 37 on `/vendas`, 3 on `/` and `/student-card` — all hover/focus.

---

## Extraction environment

| Field | Value |
| --- | --- |
| Inspected | 2026-07-27 |
| Browser | Chromium (Playwright, headless), deviceScaleFactor 1 |
| Locale / TZ | `pt-BR` / `America/Sao_Paulo`, `colorScheme: light` |
| Viewports | 1440×900, 768×1024, 390×844 |
| Auth / consent | None. No cookie banner, no login, no consent gate. |
| Test document | `?documento=19651595752` (owner-supplied, resolves to a real card) |

---

## Theme

**There is no dark theme.** Adding `.dark` to `<html>` changes nothing — probed on all three
routes, `--background` and `body` background are byte-identical before and after. The stylesheet
contains `.dark` only inside stock shadcn utility variants
(e.g. `dark:aria-invalid:ring-destructive/40`); there is **no `.dark { --background: … }` token
override block**. The emitted package is therefore **light-only** (`themes.dark` omitted).

---

## Typeface delivery (defect worth reporting)

The site declares `Geist, "Segoe UI", "Helvetica Neue", Arial, sans-serif` but **never loads
Geist**:

- font file requests (`.woff2|.woff|.ttf|.otf`): **0**
- `@font-face` rules across all stylesheets: **0**
- `document.fonts.size`: **0**

So the page renders in **Segoe UI** on Windows, **Helvetica Neue** on macOS, and a generic
sans on Linux — Geist appears only for visitors who happen to have it installed locally. The
clone reproduces the declared stack verbatim (faithful emulation), which also means clone and
original fall back identically and compare cleanly in QA. Flagged in
`design-systems/fesn/source/evidence.md`.

---

## Route: `/` — Consulta

Single centered card, no scroll (page height == viewport at every width).

### Interaction model: **static + one uncontrolled form**

**The form performs no client-side validation.** Any value — including `123` — submits and
navigates to `/student-card?documento=<value>`. There is no inline error, no disabled state,
no loading spinner on this route. Confirmed by submitting three values:

| Input | Result |
| --- | --- |
| `123` | navigates → `/student-card?documento=123` → **not-found** state |
| `11111111111` | navigates → `/student-card?documento=11111111111` → **not-found** state |
| `19651595752` | navigates → `/student-card?documento=19651595752` → **found** state |

All error handling lives on `/student-card`, not here.

### States

| Element | Trigger | State A → State B | Transition |
| --- | --- | --- | --- |
| Input | `:focus-visible` | `border-color: #e5e5e5 → #a1a1a1`; adds `box-shadow: 0 0 0 3px rgba(161,161,161,.5)`; `outline-width: 3px → 1px` | `.15s cubic-bezier(.4,0,.2,1)` |
| Submit button | `:hover` | `background: #171717 → #171717 @ 90% alpha` | `.15s cubic-bezier(.4,0,.2,1)` |

Input keeps a persistent `box-shadow: 0 1px 2px 0 rgba(0,0,0,.05)` (shadow-xs) in both states.

---

## Route: `/vendas` — Landing page

Longest route: 3457px @1440, 4816px @768, 6520px @390. No sticky anything.

### Interaction model: **static + click-driven accordion**

### Hover states (all `.15s cubic-bezier(.4,0,.2,1)`)

| Element | Property | From → To |
| --- | --- | --- |
| Primary CTA (`Quero minha carteirinha digital`) | `background-color` | `#171717` → `#171717 @ 90%` |
| Outline CTA (`Consultar carteirinha existente`) | `background-color` | `#ffffff` → `#f5f5f5` |
| Outline CTA | `color` | `#0f172b` → `#171717` |
| Pill link (`Como tirar sua carteirinha`) | `color` | `#314158` → `#0f172b` |
| Pill link | `border-color` | `#cad5e2` → `#90a1b9` |
| Footer link (`Site oficial FESN`) | `color` | `#cad5e2` → `#ffffff` |
| Reclame Aqui card | `border-color` | `#314158` → `#62748e` |
| Feature cards | — | **no hover change** (verified: empty diff) |

### FAQ accordion (Radix)

- **Trigger:** click on `button[data-slot="accordion-trigger"]`; `aria-expanded false → true`,
  `data-state closed → open`.
- **Panel:** `overflow: hidden`, animated by keyframes **`accordion-down`** (and `accordion-up`
  on close) driving `height: 0 → var(--radix-accordion-content-height)`. Measured open panel
  height 38.75px for item 1.
- **Chevron:** rotates 180° when open, `transition: transform .2s cubic-bezier(.4,0,.2,1)`.
- **Single-open + collapsible:** verified by probing `aria-expanded` across all six triggers —
  opening #1 sets #0 back to `false`, and re-clicking an open item closes it
  (`initial false×6` → `open#0: true,false…` → `open#1: false,true…` → `re-click#1: false×6`).
  This is Radix `type="single" collapsible`.
- **Trigger metrics:** height 56px, `padding: 16px 0`, `font-size: 16px`, `font-weight: 500`,
  `border-radius: 8px` on the focus ring target.

Six items, all six questions and answers captured verbatim in
`components/vendas-faq.spec.md`.

### Astro implementation note

The accordion is the **only** interactive element on `/vendas`. It is rebuilt with
`<details name="faq">/<summary>` + a CSS `grid-template-rows: 0fr → 1fr` height animation.
The `name` attribute gives native **single-open + collapsible** semantics — an exact match for
the Radix behavior probed above — so the rebuild needs **zero JavaScript** and no hydration
island. Fully server-rendered, works with JS disabled.

---

## Route: `/student-card` — Card result

### Interaction model: **static, two mutually exclusive server states**

Selected by whether `?documento=` resolves.

#### State A — found

Renders the DNE card over a decorative background. Layers, bottom to top:

1. `background-image: url(/bg-student-card-2026.png)` on the page wrapper (pink/magenta ribbon).
2. Base fill `#d6d9ea`-family lavender.
3. Content column, max ~350px wide, centered.

Content: `MINHA CARTEIRINHA DE ESTUDANTE` (13px/700, uppercase) → DNE + FESN logos → photo card
+ QR card side by side → data card → federation footer text → `✓ Certificado` pill →
`Buscar outra carteirinha` (primary button).

The `2026` validity year uses `linear-gradient(to right, #3080ff, #4f39f6)` (blue-500 →
indigo-600) as a text gradient.

**Photo and QR are proxied** through `/api/student-card/image?url=…` (Azure blob for the photo,
`api.qrserver.com` for the QR). Both are per-student and **replaced with mock assets in the
clone** — see the PII note below.

#### State B — not found

Triggered by any unresolvable `documento`. Verbatim content:

- Badge `RESULTADO` — `#314158` on `#f5f5f5`, pill radius.
- Heading **Carteirinha não encontrada**.
- Body: *A carteirinha pode não existir ou podemos estar enfrentando um problema técnico no momento.*
- Primary button **Tentar novamente** (`#171717` bg, `#fafafa` text, radius 8px).
- Secondary button **Voltar para inicio** (`#f5f5f5` bg, `#171717` text, radius 8px).
- Footer note: *Se o problema persistir, entre em contato com o suporte da FESN.*

Both states are built. **The clone emits them as two routes, not one.** The target branches
server-side on whether `?documento=` resolves; this clone is a static build with no backend
(explicitly out of scope), and `Astro.url.searchParams` is empty at build time — so a
single-route branch would always collapse to State B and the credential design would never
render. The states therefore ship as:

- `/student-card` → State A (found, mock credential)
- `/student-card-nao-encontrada` → State B (not found)

The lookup form on `/` still posts to `/student-card?documento=…`; the query string is simply
ignored by the static page.

---

## Responsive behavior

Breakpoints are Tailwind defaults: `sm` 640px, `md` 768px, `lg` 1024px.

| Route | 1440 | 768 | 390 |
| --- | --- | --- | --- |
| `/` | card centered, `max-width: 512px` | identical, card fluid | identical, card fluid, `px-4` |
| `/vendas` hero | 2-col grid `1.15fr 0.85fr`, gap 48px | **stacks to 1 col**, gap 40px | 1 col |
| `/vendas` feature cards | `md:grid-cols-3` | 3 → **1 col** at <768px | 1 col |
| `/vendas` step cards | `md:grid-cols-3` | 3 → **1 col** at <768px | 1 col |
| `/vendas` footer | `lg:grid-cols-[…]` 4 zones | stacks | stacks |
| `/student-card` | fixed ~350px column, centered | identical | identical |

Type ramps: h1 `text-3xl` (30px) → `sm:text-4xl` (36px) → `lg:text-5xl` (48px); section h2
`text-2xl` (24px) → `sm:text-3xl` (30px); lead paragraph `text-base` (16px) → `sm:text-lg` (18px).

Section padding: `pb-16` (64px) → `lg:pb-20` (80px). Gutters `px-4` (16px) → `sm:px-6` (24px).

---

## Deliberate differences in the clone

| # | Original | Clone | Why |
| --- | --- | --- | --- |
| 1 | Real student photo + live QR via `/api/student-card/image` | Mock portrait + static QR placeholder | PII. `design-systems/` and `docs/` are tracked in a public repo. |
| 2 | Real name / CPF / DOB / CIE | Mock values (`ESTUDANTE MODELO`, `000.000.000-00`, …) | Same. Skill default puts real backends out of scope. |
| 3 | Form POSTs to a live lookup | Static GET navigation to `/student-card?documento=` | No backend in scope. |
| 3b | One route branches server-side into two states | Two static routes (`/student-card`, `/student-card-nao-encontrada`) | Static build has no request-time query string. |
| 4 | Radix accordion (JS) | `<details>` + CSS, progressively enhanced | Astro static-first; no content-bearing island. |
| 5 | Declares Geist, never loads it | Identical declared stack, also not loaded | Faithful emulation of actual behavior. |

Nothing was deferred for motion reasons — the light tier was reproduced in full.
