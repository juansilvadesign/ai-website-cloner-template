# Casa (story) Specification

## Overview
- **Target file:** `src/clones/capia/components/Casa.astro` (markup verbatim)
- **Styles:** `src/clones/capia/styles/sections/casa.css` · **Behaviour:** `scripts/casa.ts`
- **Screenshot:** `docs/design-references/capia/original-1440-s7300-casa.png`
- **Interaction model:** scroll-driven (cascade reveal)

## DOM Structure
`section.casa#casa[data-casa] > span.rasgo.rasgo--topo.casa__rasgo + svg.so-leitor(clipPath #forma-a/b/c, objectBoundingBox) + .casa__tela > ul.casa__selos(li.casa__selo--1…5[data-selo]) + .casa__texto(h2 + p) + figure.casa__foto--1…5[data-foto](img srcset 640w/1200w; #4 also holds span.casa__carimbo seal)`.

## Computed Styles (source values; su = min(1px, 100vw/1280))
- `.casa`: padding `112su 0 104su`, bg/color `--pao` (torn top edge cream), z 3. `.casa__tela`: `min(100% − 48px, 1220px)`, height 800su.
- Stickers: flex gap 50su, centred at top 0; each min-width 124su, padding `15su 24su 16su`, 800 22su/.95 uppercase, `opsz 96, wdth 80`, radius `33% 31% 35% 29%/37% 31% 39% 33%`; 1 cheddar −7.2deg · 2 tomato/branco 3.4deg · 3 mate/branco −4.4deg · 4 charcoal/pão 3.6deg · 5 branco/charcoal with `inset 0 0 0 3su` ring −2.6deg.
- Text: top 146su, width 580su, centred; h2 800 58su/1.05 −.03em (margin-bottom 20su); p 18su/1.5 `text-wrap: pretty`.
- Photos (top, width, left, rotate, accent, shape): 1 196su 20.4% 1.5% 4deg tomato A · 2 134su 20.8% 77% −10.4deg cheddar B · 3 530su 26.6% .5% 1deg mate C (3/2.05) · 4 492su 34% 33% −.6deg cheddar B · 5 506su 25.4% 73.6% 2.1deg charcoal A (3/2.2). Accent stone `::before` same clip, offset + counter-rotated.
- Seal on photo 4: width 33%, top −12%, right −14%, cream disc inset 10%.

## States & Behaviors
- `--vis` (opacity), `--sobe` (translate y), `--cresce` (scale) per item — formula in BEHAVIORS.md → Story. No hover states.

## Text Content (verbatim)
Stickers "Pão do dia", "Carne fresca", "Feito na chapa", "Pinhão da serra", "Sem pressa" · H2 "Deixa a chapa falar por si" · paragraph "O Capiá nasceu numa esquina de Curitiba com uma ideia simples: pão que sai do forno de manhã, carne moída no dia e chapa bem quente. Quando o frio chega, o pinhão da serra entra no cardápio. No resto do ano a gente segue igual, sem pressa: cada lanche é montado na hora, do jeito que você pediu." · photo alts verbatim in the component.

## Assets
`img/fotos/{parque,pinhao,pao,chapa,casa}-{640,1200}.webp`, `#capi-sentado`.

## Responsive Behavior
- **≤767px:** padding 84px 0 96px; 2-column grid (gap 26px 16px, width `100% − 40px`); stickers wrap (gap 14px 12px, 18px, padding 12px 16px 13px); text full-width (h2 38px, p 16px); photos relative full-cell (photo 4 full-row 92% placed last, photo 5 before it); seal 34% at −18%/−6%.
