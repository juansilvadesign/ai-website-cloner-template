# VendasBenefits Specification

## Overview
- **Target file:** `src/components/VendasBenefits.astro`
- **Screenshot:** `docs/design-references/fesn/vendas-1440.png` (y 815–1168)
- **Interaction model:** static — **no hover change** (verified: empty computed diff)

## DOM Structure
`<section>` → grid `<div>` → three card `<article>`s, each: icon, `<h2>`, `<p>`.

## Computed Styles

### section
- max-width 1152px; margin-inline auto; padding: 0 24px 64px (`pb-16`, 16px gutter below 640px)

### grid
- display grid; grid-template-columns repeat(3, 1fr) ≥768px, 1 below; gap 20px; margin-top 40px

### card
- background #ffffff; border 1px #e2e8f0; border-radius 14px
- padding 24px 0; display flex; flex-direction column; gap 24px
- box-shadow: none
- inner wrapper: padding 24px, `space-y-3` (12px)

### icon
- 20x20; colour #1447e6; margin-bottom 12px

### h2
- 18px / 600 / lh 28px / colour #0a0a0a; margin-bottom 12px

### p
- 14px / lh 22.75px (`leading-relaxed`) / colour #45556c

## States & Behaviours
None. Hovering a card produced an empty style diff.

## Assets
Icons from `Icon.astro`: `wallet`, `shield-check`, `lock` (in order).

## Text Content (verbatim)
1. **Economia concreta com meia-entrada** — `A meia-entrada deixa de ser pontual e passa a gerar economia em cinemas, shows, teatros e eventos durante todo o ano.`
2. **Segurança institucional** — `Emissão oficial com autenticação verificável e validação segura, gerando credibilidade para estudantes e estabelecimentos.`
3. **Processo online rápido** — `Solicitação 100% digital, com menos burocracia e mais agilidade para emitir sua carteira de estudante.`

## Responsive Behaviour
- **1440 / 768:** three columns (grid switches at 768px).
- **390:** single column, cards full width, gap 20px unchanged.
