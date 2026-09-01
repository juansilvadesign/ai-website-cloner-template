# LinkCardStack Specification

## Overview

- **Target file:** `src/clones/bio-nutriruama-com-br/components/LinkCardStack.astro`
- **Screenshot:** `docs/design-references/bio-nutriruama-com-br/original-1440.png`, `original-390.png`
- **Interaction model:** static cards with direct external-link navigation and hover elevation

## DOM Structure

`section.link-card-stack > a.link-card × 4`. Each anchor contains a responsive image/picture, absolute text layers, and a small external-arrow affordance. The eBook card adds `emagrecer-com-sabor.svg`; Reset adds an inline mark, small caption, and decorative square; the other cards have display titles.

## Computed Styles (exact values from getComputedStyle)

### Stack container

- 1440px: `419.672×665.875px`, flex column, `gap: 18px`, no top margin.
- 390px: `358×761.719px`, flex column, `gap: 13.91px`, `margin-top: 8px`.

### Card container

- 1440px: width 419.672px, height 152.969px, `aspect-ratio: 513 / 187`, `border-radius: 24px`, 1px edge, overflow hidden.
- 390px: `358×180px`, `border-radius: 18.6px`; natural image bounds are 356×178px inside the edge.
- Transition: `box-shadow 0.15s cubic-bezier(.4,0,.2,1)`.

### Card copy

- Mobile display headings: Roxborough black, 20px, line-height 20px, tracking -0.02em.
- Mobile body: Degular 16px, 16px leading, tracking -0.04em; `strong`/emphasized spans use 600 weight.
- Desktop headings use 4.37cqw and left/top placement relative to each card container; desktop body is 16px with 1.08 leading and -0.02em tracking.
- Card action labels use light Degular; Consulta/Reset/Parcerias mobile labels are 14.66px / 22.8px, eBook is 12.31px / 19.15px.

## States & Behaviors

### Card hover

- **Trigger:** hover over any card.
- **Before:** `box-shadow: none`.
- **After:** `box-shadow: 0 8px 30px rgba(0,0,0,.10)`.
- **Transition:** 150ms cubic-bezier(.4,0,.2,1).
- **Implementation approach:** CSS `:hover` and `:focus-visible`; all content stays in server-rendered anchors.

## Per-State Content

### Consulta Nutricional

- URL: `https://wa.me/message/KMWPSVOPAHHSD1`
- Title: `Consulta Nutricional`
- Copy: `Um acompanhamento individualizado e personalizado para destravar seus resultados, respeitando seu corpo e sua rotina.`
- Action: `Saiba Mais`

### 100 Receitas Rápidas para Emagrecer

- URL: `https://ebook.nutriruama.com.br`
- Logo alt: `100 Receitas Rápidas para Emagrecer com sabor!`
- Copy: `Emagreça sem passar fome com receitas fáceis e estratégicas. Transforme sua rotina com uma alimentação leve e prazerosa.`
- Action: `Garantir meu eBook`

### Desafio Reset

- URL: `https://form.respondi.app/wEYdOHTX`
- Caption: `Corpo mais leve, mente mais calma.`
- Copy: `Reduza o inchaço e retome o controle da sua alimentação. Em 14 dias, você terá um plano prático e suporte diário para criar hábitos reais.`
- Action: `Lista de Espera`

### Parcerias & Publicidade

- URL: `https://wa.me/message/RSHXP5MRNY7QC1`
- Title: `Parcerias & Publicidade`
- Copy: `Conexões autênticas com marcas que compartilham dos meus valores, gerando valor real para uma audiência engajada. Vamos conversar?`
- Action: `Saiba Mais`

## Assets

- Consulta: `images/card-consulta.webp`, `images/card-consulta-mobile.webp`
- eBook: `images/card-emagreca.webp`, `images/card-emagreca-mobile.webp`, `images/emagrecer-com-sabor.svg`
- Reset: `images/card-reset.webp`, `images/card-reset-mobile.webp`
- Parcerias: `images/card-parceria-novo.png`
- Icons: inline external-arrow, Reset wordmark/bubble mark.

## Text Content (verbatim)

All text is listed under the four card states above. Image alt text: `Ruama Cori atendendo em consulta com notebook`, `E-book 100 Receitas para emagrecer com sabor`, `Desafio Reset 14 dias`, and `Ruama Cori com produtos de marcas parceiras`.

## Responsive Behavior

- **Desktop (1440px):** four 513:187 cards with 18px gap; desktop card images/crops are selected.
- **Tablet (768px):** 736×180px cards with mobile crops; 13.91px gaps.
- **Mobile (390px):** 358×180px cards; titles/body/action positions follow the extracted absolute mobile coordinates.
- **Breakpoint:** image source, aspect ratio, card radius, placement, and gap change at 1024px.
