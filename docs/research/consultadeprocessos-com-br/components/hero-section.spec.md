# HeroSection Specification

## Overview

- **Target file:** `src/clones/consultadeprocessos-com-br/components/HeroSection.astro`
- **Screenshot:** `docs/design-references/consultadeprocessos-com-br/original-1440.png` (top 768px) and `original-390.png` (top 965px)
- **Interaction model:** static content with a low-priority timed profile/status visual

## DOM Structure

`section.hero > patterned-background + .container > .hero-copy + .hero-visual`. The copy contains eyebrow, `h1`, paragraph, and two anchors. The visual holds a photo card with two floating data/status chips and decorative radial marks.

## Computed Styles

### Section/container

- desktop: top starts after 70px header, `height:698px`, `padding:24px 0`, background `linear-gradient(#f8fafc, #fff)` and overflow hidden.
- inner desktop layout: `min-height:650px`, align-items center; copy width `560px`; visual card `260px` wide.
- phone: section `height:897px`, inner width `350px`; copy is 429px high and visual follows at 350×400px.

### Typography

- eyebrow: 11px/600 uppercase, slate-600, pale border/surface pill at 158×34px.
- `h1`: desktop `48px`, `55.2px` line-height, 700, `-0.96px` tracking, slate-900; phone `30px`/about 34.5px with same weight/tracking.
- body: desktop 16px/24px, 480px max width, slate-500; phone 16px/26px.

### Actions

- desktop anchors are 56px high in a row: primary teal (`#14b8a6`, white) and quiet white/slate secondary.
- phone anchors stack, each `350×56px`, 12px radius, 12px gap.

### Hero visual

- photo frame: desktop ~260×280px, 16px radius, 3px white border, raised slate shadow; phone 350×400px.
- photo uses `object-fit:cover`; status cards use white surface, 8px radius, small 11–12px fonts, green/teal and coral indicators.

## States & Behaviors

- **Profile visual:** source rotates candidate/person details over time; clone may show a stable visual and a subtle 6s status-chip fade. This never changes layout.
- **Hover:** CTAs darken/soften over 150ms.
- **Motion fallback:** radial marks are static CSS lines; no canvas is required.

## Text Content (verbatim)

- Plataforma segura
- Consulta de processos por CPF e CNPJ para decisões inteligentes
- Consulte processos judiciais e dados cadastrais utilizando CPF ou CNPJ em uma plataforma desenvolvida para análises rápidas, organizadas e confiáveis.
- Criar conta gratuita
- Falar com especialista
- Example visual: Marcos Blando; 36 anos; 3 processos criminais; PEP; Pessoa politicamente exposta.

## Assets

- `images/hero-person.webp` and optional `images/hero-person-alt.webp`.

## Responsive Behavior

- **Desktop 1440px:** 560px left copy and photo visual around x=872; min-height 650px.
- **Tablet 768px:** compact two-column hero when space allows.
- **Phone 390px:** columns stack, CTAs stack full-width, visual becomes 350×400px.
- **Breakpoint:** `1024px` for the full hero row.
