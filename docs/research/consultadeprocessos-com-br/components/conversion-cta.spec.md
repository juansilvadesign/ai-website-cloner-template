# ConversionCta Specification

## Overview

- **Target file:** `src/clones/consultadeprocessos-com-br/components/ConversionCta.astro`
- **Screenshot:** `docs/design-references/consultadeprocessos-com-br/original-1440.png` y=8476 and `original-390.png` y=9830
- **Interaction model:** static links with hover treatment

## DOM Structure

`section.conversion > .container > .cta-panel > patterned-overlay + centered h2, p, action row, assurance row`.

## Computed Styles

- desktop panel: 1176×570px at x=132, 24px radius, teal gradient, `padding:112px 80px`, white centered content.
- desktop h2: 48px/1.08, wide 1176px visual area; body 512px/59px; action row has 222×56px primary and 272×56px secondary.
- phone panel: 302×381px at x=44, 16px radius, `padding:56px 24px`; heading 24px/32px; actions stack at 302×48px with 12px gap; assurance labels stack.

## States & Behaviors

- source CTA links are normal anchors. Primary white action softens to teal-50 on hover; outline/quiet action uses transparent white treatment.
- patterned plus background is decorative and has no interaction.

## Text Content (verbatim)

- Comece a consultar em menos de 2 minutos
- Crie sua conta gratuita e tenha acesso imediato a processos judiciais e dados cadastrais de todo o Brasil.
- Criar conta gratuita
- Falar com um especialista
- Dados conforme LGPD
- Resultados em segundos

## Responsive Behavior

- **Desktop:** action row centered and assurance labels inline.
- **Phone:** two full-width stacked actions and assurance labels on separate lines.
