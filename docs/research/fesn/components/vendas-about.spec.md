# VendasAbout Specification

## Overview
- **Target file:** `src/clones/fesn/components/VendasAbout.astro`
- **Screenshot:** `docs/design-references/fesn/vendas-1440.png` (y 1168–1508)
- **Interaction model:** static

## DOM Structure
`<section>` → `<h2>` → a single `<p>` containing two paragraphs separated by `<br><br>`, then
`<br><br>` and an attribution line of `<b>` + `<i>`.

## Computed Styles

### section
- max-width 1152px; margin-inline auto; padding 0 24px 80px (`pb-16 lg:pb-20`)

### h2
- 30px / 600 / lh 36px / colour #0f172b; max-width 896px (24px below 640px)

### p
- 16px / lh 26px (`leading-relaxed`) / colour #314158; max-width 1024px; margin-top 16px
- `<b>` weight 700, same colour · `<i>` font-style italic, weight 400, same colour

## States & Behaviours
None.

## Assets
None.

## Text Content (verbatim)
- H2: `Sobre a FESN`
- Para 1: `A FESN é uma entidade estudantil independente, comprometida com representação responsável e ética dos estudantes brasileiros. Com atuação nacional, trabalha para fortalecer os direitos da classe estudantil, sem vinculação partidária e com foco em transparência.`
- Para 2: `Com anos de experiência, a instituição desenvolve iniciativas voltadas ao acesso à educação e ao uso correto de benefícios estudantis como a meia-entrada.`
- Attribution: **`Wander Freitas`** ` - ` *`Presidente da FESN`*

## Responsive Behaviour
- **1440 / 768:** identical, text reflows within max-widths.
- **390:** h2 drops to 24px; gutter 16px.
