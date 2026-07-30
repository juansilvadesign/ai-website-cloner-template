# StudentCardFound Specification

## Overview
- **Target file:** `src/clones/fesn/components/StudentCardFound.astro`
- **Screenshot:** scratchpad only — the live capture contains real PII and is **not** committed
- **Interaction model:** static

## DOM Structure
`<main>` (decorative background) → `<header>` (h1) → `<section>`: logo row, photo+QR row, data card,
year, federation lines, Certificado pill, primary button.

## Computed Styles

### main
- min-height 100vh; overflow-y auto; padding 12px 16px 20px (`px-3 pb-5 pt-3 sm:px-4`)
- background-color **rgb(214, 212, 236)**
- background-image `url(/images/bg-student-card-2026.png)`; background-size cover; background-position 50% 50%

### header / h1
- max-width 350px; margin-inline auto; text-align center
- h1 13px / 700 / lh 19.5px / colour #000000

### section
- max-width 350px; margin-inline auto; padding-top 16px

### logo row
- display flex; align-items center; justify-content space-between; gap 12px; margin-bottom 32px (`sm:mb-10` → 40px)
- both `<img>`: `height auto; max-height 50px; width 44%; object-fit contain`

### photo + QR row
- display flex; align-items flex-start; justify-content space-between; gap 12px; margin-bottom 20px
- **photo**: 148x197; border-radius 10px; background rgb(255 255 255 / .7); aspect-ratio 3/4; overflow hidden; `<img>` object-fit cover
- **QR box**: width 46%; max-width 160px; min-width 132px; border-radius 10px; padding 12px (`sm:p-5`); background #ffffff
  - inner QR 120x120; border-radius 6px; `<img>` object-fit contain
  - caption `margin-top 8px; text-align center; font-size 11px; line-height 15.125px; colour rgb(0 0 0 / .9)` — two `<p>`

### data card
- width 100%; border-radius 10px; padding 16px (`sm:p-5`); background #ffffff
- inner: font-size 11px; line-height 15.125px; colour rgb(0 0 0 / .9)
  - name `<p>` font-weight 700
  - `<div class="h-[10px]">` spacers between groups
  - each row `<p>`: `<span>` label at weight 700 + `<span>` value at weight 400
  - `<div class="h-5">` (20px) spacer before the year row

### year
- wrapper display flex; align-items flex-end; justify-content flex-end
- 22px / 700 / lh 30.25px
- `background-image: linear-gradient(to right, #3080ff 0%, #4f39f6 100%)`
- `-webkit-background-clip: text; color: transparent`

### federation block
- padding-top 10px; text-align center; colour #000000
- line 1 13px / lh 19.5px; line 2 10px / lh 15px

### Certificado pill
- `<a href="https://fesn.appcie.org/<CIE>">` display inline-flex; height 40px; width 100%
- align/justify center; gap 8px; border-radius 30px; background #ffffff; font-size 14px; colour #000000
- margin-top 20px; leading `<span>` `✓` at colour **#00a544**

### primary button
- width 100%; height 40px; background #171717; colour #fafafa; border-radius 8px
- font-size 14px / 500; margin-top 16px; href `/`

## States & Behaviours
Button hover: background `#171717` → `rgb(23 23 23 / .9)`, 150ms cubic-bezier(0.4,0,0.2,1). Nothing else moves.

## Assets
- `public/clones/fesn/images/bg-student-card-2026.png` (decorative background)
- `public/clones/fesn/images/logo-dne-color.png` (alt `Logo DNE`), `public/clones/fesn/images/logo-fesn-short.svg` (alt `Logo FESN`)
- `public/clones/fesn/images/mock-student-photo.svg`, `public/clones/fesn/images/mock-qr.svg` — **mock**, see below

## Mock data (PII substitution — mandatory)
The live route renders a real student. The clone ships:
`ESTUDANTE MODELO` · CIE `FESN2026X` · `INST. DE ENSINO: IFRS` ·
`CURSO: GERENCIAMENTO DE RESÍDUOS` · `TIPO DE CURSO: TÉCNICO` · `CPF: 000.000.000-00` ·
`DATA DE NASC: 01/01/2000` · `VALIDADE: 31/03/2027` · year `2026`.
Photo and QR use the generated placeholders at the same intrinsic dimensions (300x400, 256x256).

## Text Content (verbatim, non-PII)
- H1: `MINHA CARTEIRINHA DE ESTUDANTE`
- QR caption: `Nº DA CIE` + code
- Labels: `INST. DE ENSINO:` · `CURSO:` · `TIPO DE CURSO:` · `CPF:` · `DATA DE NASC:` · `VALIDADE:`
- Federation: `FEDERACAO DOS ESTUDANTES NACIONAL` · `Valide seu DNE em: validadordnefesn.org.br`
- Pill: `✓ Certificado` · Button: `Buscar outra carteirinha`

## Responsive Behaviour
Fixed 350px column at every viewport; only the outer gutter (12→16px) and the inner card padding
(`p-4 → sm:p-5`) change. No reflow at 768 or 390.
