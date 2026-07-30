# FESN — Page Topology

Assembly blueprint for three routes. Source: `https://carteirinha.fesn.org.br`, inspected
2026-07-27 at 1440 / 768 / 390.

> Route paths below are the **source site's**. The clone serves them under its own
> slug prefix — `/` → `/fesn/`, `/vendas` → `/fesn/vendas/`, `/student-card` →
> `/fesn/student-card/` plus `/fesn/student-card-nao-encontrada/` for the second
> server state. The authoritative mapping is `src/clones/fesn/clone.config.ts`.

## Global facts

- **No header, no nav, no sticky or fixed layer anywhere** (`position: sticky|fixed` count = 0
  on every route). Content begins at the top of the document on all three pages.
- **No z-index stacking beyond the decorative background** on `/student-card`.
- **Page shell** (`/` and `/vendas`): `<main>` carries
  `background: linear-gradient(to bottom, #f8fafc 0%, #ffffff 50%, rgba(241,245,249,.7) 100%)`
  (`from-slate-50 via-white to-slate-100/70`) and `color: #0f172b`.
- **Container:** `max-width: 1152px` (`max-w-6xl`), centered, gutters `16px` → `24px` at ≥640px.
- **Section rhythm:** `padding-bottom: 64px`, `80px` at ≥1024px.
- Interaction model per route: `/` static + uncontrolled form · `/vendas` static + one
  click-driven accordion · `/student-card` static, two server states.

---

## Route `/` — Consulta

Height == viewport at all widths (no scroll). One centered card, vertically and horizontally
centered in a `min-height: 100vh` flex wrapper with `padding: 32px 16px` (`sm:px-6`).

| # | Section | Component | Notes |
| --- | --- | --- | --- |
| 1 | Lookup card | `ConsultaCard.astro` | `max-width: 512px`, radius 18px, border `#e2e8f0`, bg `#ffffff`, `padding: 24px 0` with inner `px-6 sm:px-8` |

Card internals, top to bottom:

1. Badge `CONSULTA RÁPIDA` — pill, bg `#f5f5f5`, color `#314158`, 12px/600, `letter-spacing: .1em`, uppercase, `margin: 0 auto`
2. FESN logo — `/logo-fesn-short.svg`, rendered ~104×54
3. `h1` **Encontrar carteirinha** — 30px/700, `#0f172b`, centered
4. Lead `<p>` — 14px, `#62748e`, centered, max ~2 lines
5. `<label>` **CPF ou código de uso (Nº da CIE)** — 14px/500, `#1d293d`
6. `<input>` — height 44px, radius 8px, border `#e5e5e5`, `padding: 4px 12px`, shadow-xs, placeholder `000.000.000-00`
7. Helper `<p>` — 12px, `#62748e`
8. Submit `<button>` **Buscar carteirinha** — full width, height 40px, bg `#171717`, color `#fafafa`, radius 8px, 14px/500
9. `<hr>` separator — `#e5e5e5`
10. Footer note — 12px, `#62748e`, centered, 2 lines

**Single component** — 10 flat children, no sub-component repeats. One spec, one build.

---

## Route `/vendas` — Landing page

3457px @1440 · 4816px @768 · 6520px @390. Seven flow sections, no overlays.

| # | y@1440 | h | Section | Component | Interaction |
| --- | --- | --- | --- | --- | --- |
| 1 | 0 | 775 | Hero | `VendasHero.astro` | static |
| 2 | 815 | 353 | Benefit cards ×3 | `VendasBenefits.astro` | static (no hover) |
| 3 | 1168 | 340 | Sobre a FESN | `VendasAbout.astro` | static |
| 4 | 1508 | 362 | Como tirar (steps ×3) | `VendasSteps.astro` | static |
| 5 | 1870 | 599 | FAQ | `VendasFaq.astro` | **click-driven accordion** |
| 6 | 2469 | 337 | CTA band | `VendasCta.astro` | static |
| 7 | 2806 | 651 | Footer | `SiteFooter.astro` | static (link hovers) |

### 1. Hero — `grid-template-columns: 1.15fr 0.85fr` at ≥1024px, gap 48px; stacks below

**Left column** (`space-y-7`, width 607px):
badge `Emissão oficial FESN` (blue pill) → `h1` 48px/700 `leading-tight` max-w 672px →
lead `<p>` 18px `#314158` max-w 576px with `<strong>` emphasis and an amber
(`#dd7400`) highlighted clause → button row (primary `/checkout` + outline `/`) →
pill-link row ×3 (`#como-funciona`, `#faq`, `/`) → feature list ×4 in a 2-col grid, each a
check icon + 14px label.

**Right column** (width 449px): card, radius 24px (`rounded-3xl`), containing the hero
image (`/fesn-mkt-com-reclame-aqui-01.png`) → 14px `<p>` → nested info box
(bg `#eff6ff`, border `#bedbff`, radius 14px, padding 16px) with a 14px/600 title and 14px body.

### 2. Benefit cards — `md:grid-cols-3`, gap 20px, `margin-top: 40px`

Each: bg `#ffffff`, radius 14px, border `#e2e8f0`, `padding: 24px 0` + inner `px-6`; blue
icon (24px) → `h2` 18px/600 `#0a0a0a` → `<p>` 14px `#45556c`.

### 3. Sobre a FESN

`h2` 30px/600 → two `<p>` 16px `#314158` `leading-relaxed` max-w 1024px → attribution line
`<strong>Wander Freitas</strong> - <em>Presidente da FESN</em>`.

### 4. Como tirar — `md:grid-cols-3`, gap 20px

Each card: eyebrow `PASSO N` 12px/600 `#1447e6` `letter-spacing: .1em` uppercase →
`h3` 16px/600 → `<p>` 14px `#45556c`.

### 5. FAQ

`h2` 30px/600 max-w 896px → `<p>` 16px `#314158` max-w 896px → card (bg `#ffffff`, radius 14px,
border `#e2e8f0`) wrapping 6 accordion rows separated by `#e5e5e5` hairlines. Trigger height
56px, `padding: 16px 0`, 16px/500, chevron right-aligned.

### 6. CTA band

Full-bleed: `border-top: 1px #e2e8f0`, `background: linear-gradient(to bottom, #ffffff, rgba(239,246,255,.5))`.
Inner container `padding: 56px 24px`. `h2` 30px/600 (two lines) → `<p>` 16px `#314158` →
button row (primary + outline), same pair as hero.

### 7. Footer — full-bleed `background: #020618`, `border-top: 1px #1d293d`

Upper zone: container grid, `padding: 48px 24px`, 4 zones —

- **Brand:** `/logo-fesn-white.svg` (~100×52) → 14px `#cad5e2` blurb → "Credibilidade e
  segurança" box (bg `rgba(16,23,43,.7)`, border `#1d293d`, radius 14px, padding 16px) with 2 bullets
- **INSTITUCIONAL:** heading 12px/600 uppercase `letter-spacing: .1em` + 5 links
- **CONTATO:** heading + 3 icon links (2 `mailto:`, 1 WhatsApp) + `REDES OFICIAIS` sub-heading
  + 4 social pills in a 2-col grid
- **TRANSPARÊNCIA:** heading + Reclame Aqui card (bg `rgba(16,23,43,.8)`, border `#314158`,
  hover border `#62748e`) holding `/reclame-aqui-otimo.png` + caption → "Confirmação oficial" box

Lower bar: `border-top: 1px #1d293d`, `padding: 24px`, two 12–14px `#62748e` lines.

Footer links: `#cad5e2` → `#ffffff` on hover.

**Build split:** 7 components. The footer is the only one near the complexity ceiling (4 zones,
~20 links) and gets its own spec; the CTA band is trivial but is a distinct section from the
footer and is not bundled with it.

---

## Route `/student-card` — Card result

Fixed-width centered column (~350px) at every viewport; no responsive reflow.

**Layer stack (bottom → top):**

1. Page wrapper: base fill `#d6d9ea`-family lavender
2. `background-image: url(/bg-student-card-2026.png)` — decorative pink/magenta ribbon,
   `background-size: cover`
3. Content column, centered, `z-index: auto`

### State A — found (`StudentCardFound.astro`)

| # | Element | Notes |
| --- | --- | --- |
| 1 | `h1` `MINHA CARTEIRINHA DE ESTUDANTE` | 13px/700, `#000000`, uppercase, centered |
| 2 | Logo row | `/logo-dne-color.png` (~150×44) + `/logo-fesn-short.svg` (~96×50) |
| 3 | Photo card + QR card | side by side, gap ~8px; white, radius 8px, padding 8px. Photo 150×190, QR 130×130 + `Nº DA CIE` 11px + code 11px/700 |
| 4 | Data card | white, radius 8px, padding 12px. Name 11px/700 then 6 `LABEL: value` rows at 11px (label 700, value 400) |
| 5 | Year `2026` | 22px/700, `background: linear-gradient(to right, #3080ff, #4f39f6)` clipped to text, right-aligned |
| 6 | Federation lines | `FEDERACAO DOS ESTUDANTES NACIONAL` 13px + `Valide seu DNE em: validadordnefesn.org.br` 10px |
| 7 | `✓ Certificado` pill | white bg, radius pill, full width |
| 8 | `Buscar outra carteirinha` | primary button → `/` |

### State B — not found (`StudentCardNotFound.astro`)

Centered card on the same background: badge `RESULTADO` → `h1` **Carteirinha não encontrada** →
`<p>` explanation → button row (`Tentar novamente` primary, `Voltar para inicio` secondary) →
`<p>` support note. Full verbatim copy in `components/student-card-notfound.spec.md`.

**Build split:** 2 components (one per state) + 1 page that selects between them.

---

## Component inventory

| Component | Route | Spec |
| --- | --- | --- |
| `ConsultaCard.astro` | `/` | `components/consulta-card.spec.md` |
| `VendasHero.astro` | `/vendas` | `components/vendas-hero.spec.md` |
| `VendasBenefits.astro` | `/vendas` | `components/vendas-benefits.spec.md` |
| `VendasAbout.astro` | `/vendas` | `components/vendas-about.spec.md` |
| `VendasSteps.astro` | `/vendas` | `components/vendas-steps.spec.md` |
| `VendasFaq.astro` | `/vendas` | `components/vendas-faq.spec.md` |
| `VendasCta.astro` | `/vendas` | `components/vendas-cta.spec.md` |
| `SiteFooter.astro` | `/vendas` | `components/site-footer.spec.md` |
| `StudentCardFound.astro` | `/student-card` | `components/student-card-found.spec.md` |
| `StudentCardNotFound.astro` | `/student-card` | `components/student-card-notfound.spec.md` |

10 components, 10 specs, 3 pages.
