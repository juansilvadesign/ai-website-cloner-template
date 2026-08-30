# SiteHeader Specification

## Overview

- **Target file:** `src/clones/consultadeprocessos-com-br/components/SiteHeader.astro`
- **Screenshot:** `docs/design-references/consultadeprocessos-com-br/original-1440.png` (top) and `original-390.png` (top)
- **Interaction model:** click-driven dropdown on desktop; click-driven menu on phone

## DOM Structure

`header.site-header > .container > a.logo + nav.desktop-nav + .desktop-actions`; phone layout replaces the desktop nav/actions with `Entrar` plus menu toggle, followed by `nav.mobile-menu` when open.

## Computed Styles

### Header container

- `position: fixed; inset-inline: 0; top: 0; z-index: 60`
- desktop height: `70px`; 390px height: `68px`
- background: `rgb(255, 255, 255)`; bottom border: `1px solid #e2e8f0`
- desktop inner width: `1336px` with `52px` gutters; phone inner padding: `16px`

### Desktop controls

- nav actions: `font-size: 14px`, `font-weight: 500`, slate-600, 36px high
- header CTA: teal-500 background, white 13px/600 copy, 9px horizontal padding, 8px radius
- dropdown trigger: 188×36px including chevron, left aligned.

### Dropdown

- wrapper: `position:absolute; top:100%; left:0; padding-top:12px; width:420px; z-index:70`
- panel: white, 1px `#e2e8f0`, `border-radius:16px`, `padding:8px`, shadow `0 20px 25px -5px rgba(148,163,184,.6), 0 8px 10px -6px rgba(148,163,184,.6)`
- item: flex, 12px padding, 12px radius; title 14px/600 slate-800; description 12px/normal slate-500.

### Mobile controls

- menu toggle: 36×36px, 6px radius, 1px `#e2e8f0`, slate-600.
- expanded menu: white full-width panel under header, 12px top and 20px bottom padding; product label 11px uppercase; product items 65px high; utility items 47px high; registration CTA 40px high, teal-500, 8px radius.

## States & Behaviors

- **Desktop dropdown:** click trigger. Closed `opacity:0`, invisible, slight upward transform; open `opacity:1`, visible, `translateY(0)`; 200ms standard easing. Close on outside/Escape.
- **Mobile menu:** `Abrir menu` becomes `Fechar menu`; toggle is synchronized with `aria-expanded`; the panel is server-rendered and hidden with `hidden`.
- **Hover:** nav links use a 150ms slate/soft-surface transition; dropdown item uses `#f8fafc` surface.

## Text Content (verbatim)

- Consulta Processual
- Consulta por CPF — Todos os tipos de processo pelo CPF.
- Consulta por CNPJ — Due diligence e análise de risco por empresa.
- Processos criminais — Ações criminais em todos os tribunais.
- Processos trabalhistas — Reclamações em todos os 24 TRTs e no TST.
- Para empresas; Planos; Blog; Entrar; Cadastre-se; Cadastre-se grátis.

## Assets

- `public/clones/consultadeprocessos-com-br/images/logo.svg`, shown at 164×55px.

## Responsive Behavior

- **Desktop 1440px:** logo + full nav/action row; dropdown sits at x≈264.
- **Tablet 768px:** retain fixed light shell; switch when space is insufficient.
- **Phone 390px:** logo at x=16; only Entrar and menu remain visible; expanded menu is full width.
- **Breakpoint:** desktop navigation at `>=1024px`.
