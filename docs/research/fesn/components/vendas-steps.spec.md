# VendasSteps Specification

## Overview
- **Target file:** `src/clones/fesn/components/VendasSteps.astro`
- **Screenshot:** `docs/design-references/fesn/vendas-1440.png` (y 1508–1870)
- **Interaction model:** static
- **Anchor:** `id="como-funciona"` (hero pill links here)

## DOM Structure
`<section id="como-funciona">` → `<h2>` → grid → three cards, each: eyebrow `<p>`, `<h3>`, `<p>`.

## Computed Styles

### section
- max-width 1152px; margin-inline auto; padding 0 24px 80px

### h2
- 30px / 600 / lh 36px / #0f172b (24px below 640px)

### grid
- display grid; repeat(3, 1fr) ≥768px, 1 below; gap 20px; margin-top 32px

### card
- background #ffffff; border 1px #e2e8f0; radius 14px; padding 24px 0
- inner wrapper padding 24px, `space-y-2` (8px)

### eyebrow
- 12px / 600 / lh 16px / letter-spacing 1.2px (`tracking-[0.1em]`) / uppercase / colour **#1447e6**; margin-bottom 8px

### h3
- 16px / 600 / lh 24px / colour #0a0a0a; margin-bottom 8px

### body p
- 14px / lh 20px / colour #45556c

## States & Behaviours
None.

## Assets
None.

## Text Content (verbatim)
1. `Passo 1` — **Inicie seu cadastro** — `Informe seus dados principais e aceite os termos para registrar seu pedido com segurança.`
2. `Passo 2` — **Complete o cadastro** — `Preencha os dados acadêmicos e envie foto e comprovante estudantil diretamente no checkout.`
3. `Passo 3` — **Análise e liberação** — `A equipe oficial da FESN conclui a validação para liberar a carteirinha digital para uso.`

H2: `Como tirar sua carteirinha de estudante online`

## Responsive Behaviour
- **1440 / 768:** three columns.
- **390:** single column; h2 24px.
