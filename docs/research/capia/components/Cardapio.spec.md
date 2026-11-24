# Cardapio (menu stack) Specification

## Overview
- **Target files:** `src/clones/capia/components/Cardapio.astro` (stack + dot rail), `Painel.astro` (one panel, see Painel.spec.md)
- **Data:** `src/clones/capia/data/cardapio.ts` (4 categories, 18 items — verbatim from the original data model)
- **Styles:** `src/clones/capia/styles/sections/cardapio.css` · **Behaviour:** `scripts/cardapio.ts`
- **Screenshots:** `docs/design-references/capia/original-1440-s2100-lanches.png`, `…-lanches-bacon.png`
- **Interaction model:** scroll-driven stack + click (dots)

## DOM Structure
`div.cardapio#cardapio[data-cardapio][data-cor] > nav.cardapio__nav[data-nav](style --n:4) > button.cardapio__ponto[data-ir]×4` then, per category: `span.cardapio__ancora#<id>[data-ancora]` + `section.painel…` + `div.cardapio__folga`.

## Computed Styles (source values)
- `.cardapio`: bg `var(--primeiro-painel, --cheddar)`, flow-root, z 2. `[data-cor=tomate|mate]` → `--foco: --branco`; `[data-cor=carvao]` → `--foco: --cheddar`.
- `.cardapio__folga`: height 56svh (32svh ≤767px).
- `.cardapio__nav`: sticky top 50svh, `translateY(−50%)`, width 38px, height `30px + n × 43px`, margin `220px 0 calc(−220px − height) min(4.7vw, 94px)`, bg `#ffffff3d`, `backdrop-filter: blur(8px)`, radius 999px, z 100; hidden ≤767px.
- `.cardapio__ponto`: 22px circle `--branco`, shadow `0 1px 6px #16130f29`, hit area inset −11px; `.ativo` → `--carvao` (cheddar on the charcoal panel), `scale 1.12`; hover `scale 1.2`, active `.9`, `.23s`.
- `.painel`: sticky top 0, 100svh, min-height 520px, z `--ordem`; panel variables per colour field (see DESIGN.md §2).

## States & Behaviors
- Active panel / dot / `data-cor` / inert-when-covered / rail clamp / dot scroll — see BEHAVIORS.md → Menu.

## Per-State Content
Categories in order: Lanches (cheddar, 6 items), Acompanhamentos (tomate, 4), Bebidas (mate, 4), Sobremesas (carvao, 4). Full per-item names, sublines, ingredients, seals and 7 ingredient cut-outs: `data/cardapio.ts`.

## Assets
`img/produtos/<id>.webp` (720×720) and `<id>-p.webp` (200×200) for all 18 items; 30 ingredient cut-outs in `img/pecas/`.

## Responsive Behavior
- **≤767px:** dot rail hidden, spacer 32svh, panel frame 390×780 (`--u = min(100vw/390, 100svh/780)`), min-height 0.
