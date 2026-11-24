# Faixa Specification

## Overview
- **Target file:** `src/clones/capia/components/Faixa.astro` (data-driven: 2 lines × 7 words × 4 repeats)
- **Styles:** `src/clones/capia/styles/sections/faixa.css` · **Behaviour:** `scripts/faixa.ts`
- **Screenshot:** `docs/design-references/capia/original-1440-full.png` (y≈1524–1864)
- **Interaction model:** scroll-driven

## DOM Structure
`section.faixa[data-faixa] > span.rasgo.rasgo--topo + .faixa__tela(container) > .faixa__linha--1/2 > .faixa__trilho[data-trilho-faixa] > span.faixa__palavra--{cor}×28` + `span.rasgo.rasgo--pe.faixa__pe`.

## Computed Styles (source values)
- `.faixa`: height `clamp(240px, 23.6vw, 470px)` (340 at 1440), bg `--carvao`, color `--carvao` (top torn edge inherits charcoal), z 2.
- `.faixa__linha`: 800 `clamp(40px, 4cqw, 80px)`/1, tracking −.022em, `opsz 96, wdth 94`; line 1 top 35% `translate 0 −100%`, line 2 top 40.5%.
- `.faixa__trilho`: flex, gap .66em, padding-right .66em, transform `translate3d(calc(--base + --anda), 0, 0)`.
- Words: cheddar `#f8b21b`, tomate `--tomate-claro #ff6b4d`, pão `#f5eddf`, mate `--mate-claro #93cf74`.
- `.rasgo`: height `--rasgo = clamp(17px, 2.4vw, 38px)`, `mask: var(--borda) center / 100% 100% no-repeat`, bg currentColor; `--topo` bottom `calc(100% − 1px)`, `--pe` bottom −1px in `--primeiro-painel` (cheddar).

## States & Behaviors
- `--base` = start offset (−13.4% / 1.6% of width) − ¼ track width; `--anda` = −d × 14.5vw (30vw ≤575px), same for both lines. No hover states.

## Text Content (verbatim)
Line 1: Suculento · Tostado · Na chapa · Derretido · Crocante · Defumado · Sem pressa. Line 2: Caseiro · Fresco · Dourado · Cremoso · Picante · Na calma · Quentinho. Section label "Como é o burger do Capiá".

## Assets
Torn-edge mask `--borda` (data URI in `styles/base.css`).

## Responsive Behavior
- **≤767px:** height 224px, words 38px.
