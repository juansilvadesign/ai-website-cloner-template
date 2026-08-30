# FaqSection Specification

## Overview

- **Target file:** `src/clones/consultadeprocessos-com-br/components/FaqSection.astro`
- **Screenshot:** `docs/design-references/consultadeprocessos-com-br/original-1440.png` y=9174 and `original-390.png` y=10403
- **Interaction model:** click-driven accordion

## DOM Structure

`section.faq > .container > .support-aside + .accordion-list`; aside has eyebrow, h2, description, and contact anchor. Every `article.faq-item` owns `button[aria-expanded]` followed by a hidden/expanded answer region.

## Computed Styles

- desktop section: `height:829px`, `padding:128px 0`; aside width 320px and sticky at `top:128px`; accordion width 752px.
- FAQ row: 63px high for short desktop questions (up to 85px where wrapping occurs), top/bottom pale-slate borders; 15px/600 slate-800 label; 16px chevron.
- open first desktop row is 130px; answer 65.5px high, 14–15px slate-500 line-height 24px.
- phone: section `padding:96px 0`, support block 350×189px, accordions 350px wide; rows range 63–85px before expansion.

## States & Behaviors

- clicking a question toggles its own `aria-expanded` state; multiple answers may remain independently open or implementation may use a single open item only if the source behavior permits. Preserve button access.
- label uses teal-700 (`#0f766e`) when open; chevron rotates 180°.
- answer expansion: 150ms standard transition + 200ms ease-out `accordion-down` visual.

## Text Content (verbatim)

1. A plataforma abrange todos os tribunais do Brasil? — Sim! Nossa plataforma oferece dados de todos os tribunais brasileiros, incluindo 1ª e 2ª instâncias, STF e tribunais militares.
2. O que significa o número CNJ de um processo? — O número CNJ é uma identificação padronizada para processos em todo o país. Ele possui 20 dígitos que indicam detalhes como o tribunal responsável e o ano de início. Se você não souber o número CNJ, peça ao seu advogado ou faça a consulta pelo seu CPF. Exemplo de formato: 0000000-00.0000.0.00.0000.
3. Quanto tempo leva para o acesso ser ativado após o pagamento? — Seu acesso é liberado imediatamente assim que o pagamento for confirmado, seja por cartão de crédito ou Pix.
4. Quais tipos de processos estão disponíveis para consulta? — Permitimos a consulta de vários tipos de processos, como os cíveis, trabalhistas, criminais e administrativos. Nossa cobertura abrange uma ampla gama de informações judiciais.
5. A plataforma permite o acompanhamento de processos? — Sim! Você pode acompanhar seus processos e receber alertas automáticos sempre que houver atualizações ou novas movimentações.
6. O sistema de pagamento é confiável? — Sim, totalmente! Usamos um sistema de pagamento com alto nível de segurança, e todas as transações são processadas pelo Stripe, um dos provedores mais confiáveis do mercado.
7. Posso cancelar minha assinatura quando quiser? — Você pode cancelar sua assinatura a qualquer momento, sem taxas extras. Após o cancelamento, seu acesso continua válido até o final do período já pago.
8. Como proceder para cancelar a assinatura? — Você pode fazer o cancelamento de forma simples e sem custos adicionais. Basta acessar sua conta e clicar em 'Assinatura e Planos' dentro do menu lateral.
9. Como remover meus dados da plataforma segundo a lei LGPD? — A solicitação é feita em /privacidade/ocultar-dados: você preenche nome, CPF e e-mail, baixa a declaração gerada pelo sistema, assina no gov.br e envia o PDF assinado. Depois, acompanhe pelo protocolo em /privacidade/ocultar-dados/acompanhar.

## Responsive Behavior

- **Desktop:** sticky aside beside accordions.
- **Phone:** aside precedes a full-width accordion sequence.
- **Breakpoint:** 1024px.
