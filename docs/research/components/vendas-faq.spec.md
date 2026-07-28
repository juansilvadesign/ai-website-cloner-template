# VendasFaq Specification

## Overview
- **Target file:** `src/components/VendasFaq.astro`
- **Screenshot:** `docs/design-references/fesn/vendas-1440.png` (y 1870–2469)
- **Interaction model:** **click-driven accordion**, single-open + collapsible
- **Anchor:** `id="faq"`

## DOM Structure
`<section id="faq">` → `<h2>` → `<p>` → card `<div>` → inner padding wrapper → six rows, each a
`<details name="faq">` with `<summary>` (question + chevron) and a panel `<p>` (answer).

## Computed Styles

### section
- max-width 1152px; margin-inline auto; padding 0 24px 80px

### h2
- 30px / 600 / lh 36px / #0f172b (24px below 640px)

### intro p
- 16px / lh 24px / #314158; max-width 896px; margin-top 12px

### card
- background #ffffff; border 1px #e2e8f0; radius 14px; margin-top 32px; padding 0
- inner wrapper padding 24px (`p-5 sm:p-6`)

### row
- `border-bottom: 1px solid #e5e5e5`; last row `border-bottom: none`

### trigger (`<summary>`)
- height 56px; padding 16px 0; font-size 16px; font-weight 500; colour #0a0a0a
- display flex; align-items flex-start; justify-content space-between; gap 16px
- cursor pointer; border-radius 8px for the focus target; text-align left

### chevron
- `chevron-down`, 16x16, colour inherited, flex none, margin-top 2px
- rotates 180° when open; `transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1)`

### panel
- font-size 14px; line-height 20px; colour #45556c; padding-bottom 16px
- `overflow: hidden`

## States & Behaviours

### Accordion open/close
- **Trigger:** click on the summary.
- **Original:** Radix `type="single" collapsible`; `aria-expanded false → true`,
  `data-state closed → open`; panel animated by `accordion-down` / `accordion-up` keyframes
  driving height `0 → var(--radix-accordion-content-height)`.
- **Verified single-open:** probing all six triggers gives
  `false×6` → open#0 `true,false…` → open#1 `false,true…` → re-click#1 `false×6`.
- **Clone:** `<details name="faq">` reproduces single-open **and** collapsible natively, with
  **zero JavaScript**. Height animated with `grid-template-rows: 0fr → 1fr` over
  `var(--motion-base)`.

### Hover
- Summary colour → `--accent` on hover (clone addition consistent with the system; the target
  shows no measurable trigger hover change).

## Assets
Icon: `chevron-down`.

## Text Content (verbatim — all six captured with each panel open)
1. **A carteirinha de estudante digital é válida para pagar meia-entrada?** — `Sim. A FESN é uma entidade autorizada para emissão de carteirinha estudantil, seja ela física ou digital.`
2. **Posso usar a carteirinha digital em cinemas e shows?** — `Sim. A carteirinha digital pode ser apresentada no celular, com validação por QR Code para facilitar a conferência em eventos e estabelecimentos.`
3. **Quanto tempo leva para receber a carteirinha digital?** — `Depois de enviar os dados no checkout e confirmar o pagamento, a análise acontece rapidamente e a liberação costuma sair em poucos minutos.`
4. **É necessário comprovar matrícula?** — `Sim. Para manter a legitimidade do documento, a FESN pode solicitar comprovação de vínculo estudantil durante a emissão.`
5. **Como a autenticidade da carteirinha é verificada?** — `A carteirinha possui QR Code e código de uso exclusivo. A conferência deve ser feita em ambiente oficial de validação.`
6. **Meus dados pessoais estão protegidos?** — `A FESN adota boas práticas de segurança e tratamento responsável de dados para proteger as informações durante todo o processo.`

- H2: `Perguntas frequentes sobre carteira de estudante digital`
- Intro: `Reunimos as dúvidas mais comuns para ajudar você a decidir com segurança antes de solicitar sua carteirinha.`

## Responsive Behaviour
- **1440 / 768:** identical; inner padding 24px.
- **390:** inner padding 20px (`p-5`); questions wrap to multiple lines, trigger grows past 56px.
