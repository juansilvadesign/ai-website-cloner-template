# SiteHeader Specification

## Overview
- **Target file:** `src/clones/capia/components/SiteHeader.astro` (markup verbatim)
- **Styles:** `src/clones/capia/styles/sections/topo.css` (complete rule set, ported from the source sheet)
- **Behaviour:** `src/clones/capia/scripts/topo.ts`
- **Screenshot:** `docs/design-references/capia/original-768-top.png`, `qa/clone-390-drawer.png`
- **Interaction model:** hover + click (dropdown), click (drawer)

## DOM Structure
`a.pular` → `header.topo[data-topo] > .topo__faixa > (a.topo__marca > svg.topo__capi(use #capi-em-pe) + span.topo__nome) + nav.topo__nav(.topo__grupo[data-suspenso] > button.topo__link--suspenso + .topo__suspenso > a.topo__opcao×4) + a.topo__link×2) + button.topo__abre(span×3)` · `div.gaveta#gaveta[role=dialog][inert]` (topo + nav with nested submenu) · `div.gaveta__fundo[hidden]`.

## Computed Styles (source values)
- `.topo`: absolute, top/left 0, width 100%, z 50, color `--pao`, `--foco: --cheddar`.
- `.topo__faixa`: flex space-between, width `min(100% − 44px, 1500px)`, height `clamp(84px, 7.6vw, 110px)`; ≤899px width `calc(100% − 36px)`.
- `.topo__capi`: width `clamp(64px, 6vw, 84px)`, transform-origin 50% 92%. `.topo__nome`: 800, `clamp(34px, 3.1vw, 44px)`/.8, tracking −.045em, `opsz 96, wdth 88`.
- `.topo__nav`: gap `clamp(26px, 3.1vw, 46px)`. `.topo__link`: 16px/700, uppercase, tracking .08em, min-height 44px; `::after` 2px cheddar underline at bottom 8px, `scale 0 1`.
- `.topo__suspenso`: bg `--pao`, min-width 236px, padding 10px, gap 2px, radius `22px 26px 20px 24px/22px 20px 26px 22px`, shadow `0 16px 38px #00000052`, top `calc(100% + 6px)`, left −20px. `.topo__opcao`: 16px/700, padding 11px 14px, radius 14px.
- `.topo__abre` (≤899px): 50×50 circle `--pao`, 3 bars 20×2.5 `--carvao`, gap 5px.
- `.gaveta`: fixed right, width `min(420px, 100%)`, 100dvh, bg `--carvao`, padding 0 24px 32px, z 120. `.gaveta__link`: 30px/700, min-height 64px, border-bottom `1px solid #f5eddf29`. `.gaveta__opcao`: 20px/600 cheddar, padding 12px 0 12px 18px. `.gaveta__fecha`: 46px tomato circle with a white ×.

## States & Behaviors
- **Dropdown:** closed `opacity 0; visibility hidden; translate 0 −7px` → `.aberto` `opacity 1; visible; translate 0`; transition `opacity .17s, translate .23s var(--sai), visibility 0s .23s`. Trigger: mouse enter (close 160ms after leave), click/tap toggle, Escape, outside press, focus-out, link click.
- **Underline:** `scale 0 1 → 1`, `.22s var(--sai)` on hover/focus-visible. **Logo:** hover `rotate −5deg; translate 0 −2px`, active `translate 0 1px`.
- **Option hover:** bg `--carvao`, color `--cheddar`, `.15s`.
- **Drawer:** `transform translate(100%) → none`, `.32s ease-in-out`; backdrop `#00000080` opacity 0→1 .32s; scroll locked (html overflow hidden + Lenis stop); `+` → 45deg on the submenu row.

## Text Content (verbatim)
Pular para o cardápio · Capiá · Cardápio · Lanches · Acompanhamentos · Bebidas · Sobremesas · O Capiá · Contato · aria: "Capiá, início", "Principal", "Abrir o menu", "Fechar o menu", "Menu".

## Assets
`#capi-em-pe` symbol from `CapiSprite.astro`.

## Responsive Behavior
- **≥900px:** inline nav + dropdown. **≤899px:** hamburger + drawer (desktop composition otherwise). **≤767px:** no further change.
