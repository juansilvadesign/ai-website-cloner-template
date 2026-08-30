# HiddenRisksSection Specification

## Overview

- **Target file:** `src/clones/consultadeprocessos-com-br/components/HiddenRisksSection.astro`
- **Screenshot:** `docs/design-references/consultadeprocessos-com-br/original-1440.png` y=1653 and `original-390.png` y=1703
- **Interaction model:** scroll layout with desktop sticky introduction; static illustrated cards

## DOM Structure

`section.hidden-risks > .container > .intro-aside + .risk-grid`; intro contains eyebrow, h2, description, contact anchor; grid contains four `article.risk-panel`, each with a diagram layer, title, and description.

## Computed Styles

- desktop section: `height:1048px`, `padding:128px 0 64px`, white.
- desktop aside: width 340px, `position:sticky; top:128px`; h2 36px/1.2, description 15px/24px, contact link 41px high teal.
- desktop grid: 916px wide, two 457px columns, 414–440px row cards.
- phone section: `padding:64px 20px`, intro height 274px; four full-width cards 343–369px high.
- cards: 1px soft slate border, 12px radius, white surface, centered content, restrained grid/ray decoration.

## States & Behaviors

- intro stays at 128px top only on desktop while the 2×2 card grid passes.
- cards have no click state. Diagram elements may float subtly but must not affect reading order.

## Text Content (verbatim)

- RISCOS OCULTOS
- Riscos ocultos que podem impactar sua decisão
- Mesmo após uma consulta comum, dados importantes podem não aparecer e isso pode gerar decisões erradas.
- Falar com especialista
- Histórico jurídico oculto — Ações judiciais e padrões de litígio que não aparecem em buscas comuns. Parte relevante do histórico pode ficar fora da análise.
- Dados desatualizados — Informações antigas podem não refletir a situação atual e levar a conclusões equivocadas.
- Informações em múltiplas fontes — Dados fragmentados em diferentes tribunais e bases dificultam uma visão completa e confiável.
- Decisão baseada em informação incompleta — Sem acesso a todos os dados, a análise pode parecer segura, mas esconder riscos relevantes.

## Assets

- `images/effect-bg1.svg`, `effect-bg2.svg`, and `effect-bg3.svg` are diagram-layer source assets.

## Responsive Behavior

- **Desktop:** 340px sticky aside + 2×2 card grid.
- **Phone:** no sticky behavior; intro then four stacked 348px-wide panels.
- **Breakpoint:** 1024px.
