# SocialProof Specification

## Overview

- **Target file:** `src/clones/consultadeprocessos-com-br/components/SocialProof.astro`
- **Screenshot:** `docs/design-references/consultadeprocessos-com-br/original-1440.png` y=7695 and `original-390.png` y=9173
- **Interaction model:** static

## DOM Structure

`section.social-proof > .container > quote-panel + stat-grid`; quote panel contains decorative teal dot row, blockquote, overlapping avatar group, and small caption. Stats are four tiles in a row / 2×2 on phone.

## Computed Styles

- desktop section: `height:781px`, `padding:128px 0`, background `rgba(#f8fafc, .6)`.
- quote block: 896px wide, centered; blockquote 768px wide, 36px display-like hierarchy, centered.
- stats: four 223px tiles around 159px high; thin border/surface contrast and muted descriptions.
- phone section: 530px total, quote 350×272px, stat tiles 174×108px in two columns.

## States & Behaviors

- no controls. Avatar stack uses negative horizontal overlap and 3px white rings.

## Text Content (verbatim)

- “É como ter acesso a múltiplas fontes de informação em um único lugar, disponível sempre que você precisar.”
- Utilizado por mais de 2.000 profissionais
- +600 MILHÕES de processos judiciais
- +250 MILHÕES de dados de pessoas
- +60 MILHÕES de dados de empresas
- +20 MILHÕES de atualizações por dia

## Assets

- `images/user1.webp`, `user2.webp`, `user4.webp`, `user5.webp`, `user6.webp`; 44×44px desktop/phone display in a negative-overlap stack.

## Responsive Behavior

- **Desktop:** centered quote above four equal stats.
- **Phone:** quote narrows to 350px and stats become two columns.
