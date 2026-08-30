# AttentionSection Specification

## Overview

- **Target file:** `src/clones/consultadeprocessos-com-br/components/AttentionSection.astro`
- **Screenshot:** `docs/design-references/consultadeprocessos-com-br/original-1440.png` around y=966 and `original-390.png` around y=965
- **Interaction model:** time-driven deck with click-driven dot controls

## DOM Structure

`section.attention > patterned-overlay + .container > .copy + .risk-deck`. Deck owns four `.risk-card` layers and four button dots; only the front index is active.

## Computed Styles

- desktop section: `height:687px`, `padding:136px 32px`, teal-500→teal-600 vertical gradient, white foreground.
- desktop copy: 480px wide; eyebrow 108×32; h2 42px/1.15; paragraph 440px, 16px/24px; CTA 196×56px.
- desktop deck: 500×240px; front card 500×220px. Back cards offset +15px horizontally/vertically and reduce size/opacity.
- phone: section height 738px, `padding:56px 20px`; copy is 350px wide; deck 350×200px; front card 350×180px, 10px offsets.

## States & Behaviors

- every 2.4–3s, selected index advances. Dots call the same selection function.
- front card becomes z-index 4; non-front cards keep their textual content and are visible as layered depth.
- dot: inactive 6×6px `rgba(255,255,255,.4)`; active 24×6px white; `transition: all 300ms`.
- `prefers-reduced-motion` stops auto-play.

## Text Content (verbatim)

- ATENÇÃO
- Você pode estar fechando negócios com risco sem saber
- Consulte processos, riscos e histórico completo de pessoas e empresas em segundos.
- Consultar agora
- Utilizado por empresas em todo o Brasil
- 01 Você pode estar assumindo riscos sem perceber — Sem acesso ao histórico completo, decisões simples podem virar prejuízos.
- 02 Processos que você não está vendo — Uma pessoa ou empresa pode ter ações em andamento que não aparecem em buscas comuns.
- 03 Risco financeiro invisível — Dívidas, histórico judicial e comportamento podem impactar diretamente sua decisão.
- 04 Parceiros sem verificação de idoneidade — Fechar contratos sem consultar antecedentes pode expor sua empresa a fraudes e inadimplência.

## Responsive Behavior

- **Desktop 1440px:** copy and deck form two columns inside 1312px working area.
- **Phone 390px:** copy first, deck below; no layout scroll/overflow beyond the cards.
