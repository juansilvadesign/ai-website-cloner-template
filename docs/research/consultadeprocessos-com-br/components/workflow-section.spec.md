# WorkflowSection Specification

## Overview

- **Target file:** `src/clones/consultadeprocessos-com-br/components/WorkflowSection.astro`
- **Screenshot:** `docs/design-references/consultadeprocessos-com-br/original-1440.png` y=3597 and `original-390.png` y=5276
- **Interaction model:** static product walkthrough and CTA

## DOM Structure

`section.workflow > patterned-overlay + centered intro + .workflow-layout`; left is ordered four-step content plus CTA, right is a white dashboard mockup including filter sidebar, result list, small flags, and process rows.

## Computed Styles

- desktop section: `height:1042px`, `padding:128px 0 64px`, teal gradient; intro width 672px.
- desktop layout: working width 1336px, left about 340px, dashboard about 924×694px; dashboard radius 12px, white surface, thin slate edge, raised shadow.
- phone: section height 1283px; intro 350px wide; step rail is 350×526px; dashboard 350×457px below.
- numbered steps: 16px numeric teal tier, white 16px/600 title, white/70 14px description; 4 vertical items with a thin white/20 connector.

## States & Behaviors

- dashboard is display-only; controls are not real search/filter inputs.
- white CTA gets a teal-50 hover softening over 200ms.

## Text Content (verbatim)

- Veja como funciona na prática
- Interface intuitiva projetada para entregar resultados rápidos
- 01 Crie sua conta — Comece em segundos, sem burocracia.
- 02 Informe o CPF ou CNPJ — Consulte qualquer pessoa ou empresa com rapidez.
- 03 Acesse todos os processos — Veja histórico completo, atualizado e organizado.
- 04 Exporte o relatório completo — Baixe os dados prontos para análise e tomada de decisão.
- Consultar agora
- consultadeprocessos.com.br; 123.456.789-10; Consultar
- Tipo do processo; Cível 2; Criminal 4; Trabalhista 1; Tributário 0; Administrativo 0
- Tipo de parte; Autor 0; Réu 6; Outros 1
- Maria Silva dos Santos; 7 PROCESSOS ENCONTRADOS; Atualizado há 2 min
- Maria Silva dos Santos x Banco Nacional S.A.; AÇÃO DE INDENIZAÇÃO POR DANOS MORAIS; São Paulo - SP
- Maria Silva dos Santos x Comércio Ltda.; RECURSO ORDINÁRIO TRABALHISTA; Rio de Janeiro - RJ

## Assets

- `images/sp.png` and `images/rj.png` appear in source-style process rows.

## Responsive Behavior

- **Desktop:** 340px instructions beside a large dashboard.
- **Phone:** instructions and CTA first, then the compact dashboard; no horizontal scroll.
