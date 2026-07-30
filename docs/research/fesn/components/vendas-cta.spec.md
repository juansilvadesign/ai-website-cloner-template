# VendasCta Specification

## Overview
- **Target file:** `src/clones/fesn/components/VendasCta.astro`
- **Screenshot:** `docs/design-references/fesn/vendas-1440.png` (y 2469–2806)
- **Interaction model:** static (button hovers only)

## DOM Structure
Full-bleed `<section>` → centred container `<div>` → `<h2>` (two lines via `<br>`), `<p>`, button row.

## Computed Styles

### section (full-bleed, 1440px wide)
- border-top: 1px solid #e2e8f0
- background-image: linear-gradient(#ffffff 0%, rgb(239 246 255 / 0.5) 100%)

### container
- max-width 1152px; margin-inline auto; padding 64px 24px (`py-14 sm:py-16`)
- display flex; flex-direction column; gap 24px

### h2
- 30px / 600 / lh 36px / #0f172b; max-width 768px (24px below 640px)
- second line forced by `<br>`

### p
- 16px / lh 24px / #314158; max-width 768px

### button row
- display flex; gap 12px; column below 640px, row above
- Primary and outline buttons identical to the hero pair

## States & Behaviours
| Element | Property | From → To |
| --- | --- | --- |
| Primary CTA | background-color | `#171717` → `rgb(23 23 23 / .9)` |
| Outline CTA | background-color | `#ffffff` → `#f5f5f5` |
| Outline CTA | color | `#0f172b` → `#171717` |

Transition 150ms cubic-bezier(0.4, 0, 0.2, 1).

## Assets
None.

## Text Content (verbatim)
- H2 line 1: `Não pague inteira no seu próximo evento.`
- H2 line 2: `Garanta sua carteirinha digital agora.`
- P: `Solicitação 100% online, com autenticação verificável e processo simples para economizar no próximo ingresso.`
- Buttons: `Quero minha carteirinha digital` → `/checkout`; `Consultar carteirinha existente` → `/`

## Responsive Behaviour
- **1440 / 768:** buttons side by side, h2 30px.
- **390:** buttons stack full width, h2 24px, padding 56px 16px.
