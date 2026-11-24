# Painel (menu panel) Specification

## Overview
- **Target file:** `src/clones/capia/components/Painel.astro` (data-driven from `data/cardapio.ts`)
- **Styles:** `src/clones/capia/styles/sections/cardapio.css` · **Behaviour:** `scripts/cardapio.ts`
- **Screenshot:** `docs/design-references/capia/original-1440-s2100-lanches.png`
- **Interaction model:** click / keyboard / swipe (carousel) + scroll-driven (stage) + time-driven (ingredient orbit)

## DOM Structure
`section.painel.painel--{cor}[data-painel][data-cor][data-cena](style --ordem[, --cor-de-tras]) > span.painel__borda + .painel__recorte > .painel__palco > h2.painel__titulo + .seletor[.seletor--laco][data-seletor] (button.seletor__seta[data-anterior] + .seletor__janela > .seletor__trilho[role=tablist] > button.pilula--{a|b|c}[role=tab]×n + button.seletor__seta[data-proximo]) + .cena[role=tabpanel] (p.cena__marca + span.cena__peca--1…7 + span.cena__produto + ul.cena__selos li×2) + p.painel__ingredientes + a.botao.botao--painel + p.so-leitor[role=status]`.

## Computed Styles (source values; u = min(100vw/1440, 100svh/750))
- Colour fields: cheddar (ink carvão, pill `#fffaf152`/hover `#fffaf185`, active carvão/pão, watermark .4) · tomate (ink branco, pill `#fffaf133`/`#fffaf157`, watermark .2) · mate (as tomate, watermark .17) · carvão (ink pão, pill `#f5eddf24`/`#f5eddf42`, active cheddar/carvão, watermark .06).
- Torn top: `.painel__borda` mask `--borda` height `--rasgo` in `--cor`, `::before` paints `--cor-de-tras` behind it. `.painel__recorte` inset `calc(--rasgo − 1px) 0 0`.
- Stage `.painel__palco` 1440u × 750u centred. Title: top 50u, 800 `min(54u, 64px)`/1.02, −.03em.
- `.seletor`: top 128u, left 150u, width 1140u, height 104u, grid `52u 1fr 52u`; arrows Arial 300 54u; track gap 12.5u, `transform .41s var(--sai)`.
- `.pilula`: flex-basis `(100% − 3 gaps)/4`; plate `::before` inset `12% 0 10% 13%`, radius `--pao-a/b/c`, `backdrop-filter: blur(5px) saturate(106%)`; thumb 100u at left; text margin `0 5% 0 42.5%`, name 700 `max(12px, 15u)`/1.1, subline 500 `max(12px, 12u)` op .8.
- `.cena`: top 202u, left 205u, 1030u × 424u. Watermark Mr Dafoe 380u, rotate −6.2deg. Product 36% × 80% at 12%/32%, rotate `--inclina` (−2.6deg; mate 2.6deg with 91% height; carvão 1.7deg), shadow `drop-shadow(0 15u 20u #16130f47)`.
- Ingredient slots (x, y, w, giro): 1 4.2% 17.5% 22% −7 · 2 58.5% −3% 19% 12.5 blur 5.5u · 3 70.5% 7% 22% 8 · 4 65.5% 58.5% 14.5% −12.5 · 5 79% 46.5% 20% 6.8 · 6 12% 61.5% 16.5% 10.5 · 7 25.5% 54.5% 16% −5.6 blur 6.5u (2 and 7 at opacity .86).
- Seals: height `max(28px, 37u)`, 800 `max(12px, 13u)` uppercase; #1 at 18.5%/23.5% −6.2deg (active colours), #2 at 81.5%/61.5% 4.4deg (branco/carvão).
- Ingredients line: top 618u, width 780u, 600 `max(13px, 17u)`/1.3. CTA: top 682u, min-height `max(46px, 50u)`, padding `3px max(26px, 36u) 0`, radius `--pao-b`, active colours, rotate .5deg.

## States & Behaviors
- Pill hover: plate → `--pilula-forte`, thumb `translate 0 calc(−50% − 4px) rotate −3deg` (.23s var(--sai)). Active pill: ink `--ativo-tinta`, plate `--ativo`. Arrow hover ±3px, active `scale .86`.
- Carousel, item swap, entrance, drift and orbit — exact numbers in BEHAVIORS.md → Menu.

## Per-State Content
Server-rendered: item 0 of each category (Clássico da Casa · Fritas da Casa · Shake de Morango · Brownie com Sorvete). Every other state: `data/cardapio.ts`.

## Text Content (verbatim)
Titles Lanches / Acompanhamentos / Bebidas / Sobremesas · CTAs "Pedir lanches|acompanhamentos|bebidas|sobremesas ›" · arrows aria "Anterior"/"Próximo" · watermark "Capiá" · status "<nome>: <ingredientes>." / "As imagens deste item não carregaram. Tente de novo.".

## Responsive Behavior
- **≤767px (u = min(100vw/390, 100svh/780)):** stage 390u × 780u; title top 70u, 38u; selector top 126u, full width, columns `max(44px, 44u)`, height 88u, arrows always visible, pills 220u wide, thumbs 82u, carousel centred and looping; scene top 228u, 390u × 362u, watermark 144u, product 68% × 78% at 9%/16%; ingredient slots re-placed (see cardapio.css); seals at 2%/28% and 87.5%/36%; ingredients top 612u width 330u `max(13px, 14u)`; CTA top 684u, min-height 48px.
