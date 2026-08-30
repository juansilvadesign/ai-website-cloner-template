# FeaturesSection Specification

## Overview

- **Target file:** `src/clones/consultadeprocessos-com-br/components/FeaturesSection.astro`
- **Screenshot:** `docs/design-references/consultadeprocessos-com-br/original-1440.png` y=2701 and `original-390.png` y=3575
- **Interaction model:** static grid with hover-only icon rotation

## DOM Structure

`section.features > .container > centered intro + .feature-grid`; six `article.feature-card` values each contain an icon tile, h3, and description.

## Computed Styles

- desktop section: `height:896px`, `padding:128px 32px`; intro is 576px wide and 149px tall; grid begins around y=3042.
- desktop grid: three 424px columns, two rows; each card ~204px tall, white, 1px `#e2e8f0`, 12px radius, 24px padding.
- icon tile: 48×48px; a conic teal/indigo ring sits behind a white center; article hover rotates the ring 90° in 500ms ease-out.
- phone: section `padding:32px 20px 64px`; six 350×226px cards in one column, with 20–29px interior margins.

## States & Behaviors

- hover rotates only the decorative ring; card content stays still.
- focus is visible on no interactive card elements because cards are informational.

## Text Content (verbatim)

- FUNCIONALIDADES
- Tudo o que você precisa em um só lugar
- Consulta por CPF — Busque processos em tribunais de justiça, federais e superiores vinculados a uma pessoa física.
- Consulta por CNPJ — Encontre a consulta jurídica de qualquer empresa em poucos segundos com cobertura nacional.
- Dados cadastrais (PF) — Acesse informações básicas como endereço, situação do nome e outros dados cadastrais.
- Dados cadastrais (PJ) — Quadro societário, porte da empresa, capital social e situação cadastral detalhada.
- Consultas ultra rápidas — Resultados em segundos. A plataforma foi feita para não te fazer esperar por dados essenciais.
- Monitoramento processual — Acompanhe processos com alertas automáticos e resumos simplificados por inteligência artificial.

## Responsive Behavior

- **Desktop:** 3 columns with two rows.
- **Tablet:** 2 columns when space permits.
- **Phone:** single column with 20px gutters.
