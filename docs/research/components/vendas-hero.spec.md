# VendasHero Specification

## Overview
- **Target file:** `src/components/VendasHero.astro`
- **Screenshot:** `docs/design-references/fesn/vendas-1440.png` (y 0–775)
- **Interaction model:** static (hover only)

## DOM Structure
`<section>` grid → left column (`space-y-7`: badge, h1, lead, button row, pill row, feature `<ul>`)
+ right column (card → image, paragraph, info box).

## Computed Styles

### section
- display: grid; grid-template-columns: 1.15fr 0.85fr (→ 607.19px / 448.81px at 1440); single column below 1024px
- gap: 48px (40px below 1024px); max-width: 1152px; margin-inline: auto
- padding: 64px 24px 0 (`pt-12 sm:px-6 lg:pt-16`; 16px gutter below 640px)

### left column
- `space-y-7` → 28px gap between children

### badge
- 11px / 500 / lh 16.5px / letter-spacing 1.54px / uppercase
- color #193cb8; background #dbeafe; border-radius 9999px; padding 4px 12px; border 1px transparent; height 26.5px

### h1
- font-size: 48px (36px ≥640, 30px below); font-weight 700; line-height 60px (`leading-tight`)
- letter-spacing: normal; color #0f172b; max-width 672px

### lead `<p>`
- 18px / lh 29.25px (`leading-relaxed`) / color #314158; max-width 576px; 16px below 640px
- contains three `<b>` at weight 700 (same colour) and one `<span>` at weight 600, colour **#dd7400**

### button row
- display flex; gap 16px; column below 640px, row above
- Primary `<a href="/checkout">`: h 40px, padding 0 24px, background #171717, color #fafafa, radius 8px, 14px/500
- Outline `<a href="/">`: background #ffffff, color #0f172b, border 1px #e5e5e5, box-shadow 0 1px 2px 0 rgb(0 0 0 / .05)

### pill row
- display flex; flex-wrap wrap; gap 8px; font-size 14px (12px below 640px)
- Each `<a>`: height 30px, padding 4px 12px, border 1px #cad5e2, radius 9999px, color #314158

### feature list
- `<ul>` display grid; grid-template-columns 1fr 1fr ≥640px, 1 below; gap 16px
- `<li>` display flex; align-items flex-start; gap 8px; font-size 14px; color #314158
- icon: `circle-check`, 16x16, colour #1447e6, margin-top 2px

### right card
- background rgb(255 255 255 / .95); border 1px rgb(226 232 240 / .8); border-radius 22px
- padding 24px 0; display flex; flex-direction column; gap 24px
- **box-shadow: 0 10px 15px -3px rgb(226 232 240 / .6), 0 4px 6px -4px rgb(226 232 240 / .6)** — the only card in the system with a shadow
- inner wrapper padding 32px (`p-7 sm:p-8`), `space-y-6` (24px)

### right card contents
- image row: display flex; align-items center; justify-content center; gap 12px; margin-bottom 24px
  - `<img>` 256x259 intrinsic, `h-auto w-auto`
- `<p>` 14px / lh 22.75px / #314158; margin-bottom 24px
- info box: background #eff6ff; border 1px #bedbff; radius 14px; padding 16px
  - title `<p>` 14px / 600 / lh 20px / #0f172b
  - body `<p>` 14px / lh 20px / #314158; margin-top 4px

## States & Behaviours
| Element | Property | From → To | Transition |
| --- | --- | --- | --- |
| Primary CTA | background-color | `#171717` → `rgb(23 23 23 / .9)` | 150ms cubic-bezier(.4,0,.2,1) |
| Outline CTA | background-color | `#ffffff` → `#f5f5f5` | same |
| Outline CTA | color | `#0f172b` → `#171717` | same |
| Pill link | color | `#314158` → `#0f172b` | same |
| Pill link | border-color | `#cad5e2` → `#90a1b9` | same |

## Assets
- `public/images/fesn-mkt-hero.png` (alt `Solicitar carteira de estudante digital FESN`)
- Icon: `circle-check` x4 from `Icon.astro`

## Text Content (verbatim)
- Badge: `Emissão oficial FESN`
- H1: `Carteirinha de Estudante Digital válida para pagar meia-entrada em todo o Brasil`
- Lead: `Solicitação ` **simples** `, emissão ` **rápida** ` e carteirinha digital no seu celular ` **em poucos minutos.** ` ` *(amber span)* `Economize em cinemas, shows e eventos durante todo o ano com documento estudantil oficial.`
- Buttons: `Quero minha carteirinha digital` → `/checkout`; `Consultar carteirinha existente` → `/`
- Pills: `Como tirar sua carteirinha` → `#como-funciona`; `Dúvidas frequentes` → `#faq`; `Validar carteirinha` → `/`
- Features: `Carteirinha digital no seu celular` · `Validação por QR Code` · `Processo de compra 100% online` · `Entidade confiável`
- Card body: `Solicitação simples, validação oficial e autenticação digital em um fluxo seguro. A FESN garante um documento consistente e pronto para uso.`
- Info title: `Benefício financeiro recorrente`
- Info body: `Em cinemas, shows e eventos, a meia-entrada pode gerar economia constante ao longo do ano letivo.`

## Responsive Behaviour
- **1440:** two columns 1.15fr/0.85fr, gap 48px, h1 48px.
- **768:** single column, gap 40px, h1 36px, features still 2-up (≥640px).
- **390:** single column, gap 40px, h1 30px, features 1-up, buttons stack full-width, gutter 16px.
