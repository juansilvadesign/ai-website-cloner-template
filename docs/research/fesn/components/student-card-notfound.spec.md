# StudentCardNotFound Specification

## Overview
- **Target file:** `src/clones/fesn/components/StudentCardNotFound.astro`
- **Screenshot:** `docs/design-references/fesn/card-notfound-1440.png`
- **Interaction model:** static

## DOM Structure
`<main>` (same gradient shell as `/`) → card → header block (badge, icon circle, title, body)
→ body block (two buttons, support note).

## Computed Styles

### main
- display flex; align-items center; justify-content center; min-height 100vh; padding 32px 24px
- background-image linear-gradient(#f8fafc 0%, #ffffff 50%, rgb(241 245 249 / 0.4) 100%)

### card
- max-width 512px; background #ffffff; border 1px solid #e2e8f0; border-radius 18px
- padding 24px 0; display flex; flex-direction column; gap 24px

### header block
- padding 32px 32px 0; text-align center

### badge "Resultado"
- 11px / 500 / lh 16.5px / letter-spacing 1.54px / uppercase
- colour #314158; background #f5f5f5; border-radius 9999px; padding 4px 12px; margin-bottom 16px

### icon circle
- 48x48; border-radius 9999px; background #f1f5f9; colour #314158
- display flex; align-items/justify center; margin: 0 auto 16px
- contains a 20x20 icon (search-x style: two paths + a circle + a path)

### title
- 30px / 600 / lh 36px / letter-spacing -0.75px (`tracking-tight`) / colour #0f172b; margin-bottom 16px
- 24px below 640px

### body p
- 14px / lh 22.75px / colour #45556c; max-width 448px; margin-inline auto; text-align center

### body block
- padding 0 32px 32px; `space-y-3` (12px)
- **Tentar novamente**: full width, h 40px, background #171717, colour #fafafa, radius 8px → `/`
- **Voltar para inicio**: full width, h 40px, background #f5f5f5, colour #171717, border 1px #e5e5e5, radius 8px → `/`
- support note: 12px, colour #62748e, centred

## States & Behaviours
- Primary hover: background `#171717` → `rgb(23 23 23 / .9)`.
- Secondary hover: background `#f5f5f5` → slightly darker (`--action-soft` hover), 150ms.

## Assets
Icon: `globe` substituted is **incorrect** — use a search-x glyph built inline (two paths, one
circle, one path) matching the 20x20 geometry observed.

## Text Content (verbatim)
- Badge: `Resultado`
- Title: `Carteirinha não encontrada`
- Body: `A carteirinha pode não existir ou podemos estar enfrentando um problema técnico no momento.`
- Buttons: `Tentar novamente` · `Voltar para inicio` (typo is in the original — preserved)
- Note: `Se o problema persistir, entre em contato com o suporte da FESN.`

## Responsive Behaviour
- **1440 / 768:** card capped 512px, centred.
- **390:** card fluid to a 16px gutter; title 24px; buttons already full width.
