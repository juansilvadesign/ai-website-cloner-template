# ConsultaCard Specification

## Overview
- **Target file:** `src/components/ConsultaCard.astro`
- **Screenshot:** `docs/design-references/fesn/home-1440.png`
- **Interaction model:** static + one uncontrolled form (no client validation)

## DOM Structure
`<main>` (full-viewport flex centre) → card `<div>` → header block (badge, logo, title, lead)
→ body block (`<form>` → label + input + helper, submit button) → `<hr>` → footnote.

## Computed Styles

### main
- display: flex; align-items: center; justify-content: center; min-height: 100vh
- padding: 32px 24px (`px-4 py-8 sm:px-6` → 16px at <640px)
- background-image: linear-gradient(#f8fafc 0%, #ffffff 50%, rgb(241 245 249 / 0.4) 100%)

### card
- max-width: 512px; width: 100%; background: #ffffff
- border: 1px solid #e2e8f0; border-radius: 18px
- padding: 24px 0; display: flex; flex-direction: column; gap: 24px

### header block
- padding: 32px 32px 0 (`px-6 pt-7 sm:px-8 sm:pt-8`); text-align: center

### badge "Consulta Rápida"
- font-size: 11px; font-weight: 500; line-height: 16.5px; letter-spacing: 1.54px
- text-transform: uppercase; color: #314158; background: #f5f5f5
- border-radius: 9999px; padding: 4px 12px; border: 1px solid transparent
- display: inline-flex; margin: 0 auto 20px; height: 26.5px

### logo
- `/images/logo-fesn-short.svg`, rendered 104x53.5, `margin: 0 auto 20px`, alt "Logo FESN"

### title "Encontrar carteirinha"
- font-size: 30px (24px below 640px); font-weight: 600; line-height: 36px
- letter-spacing: -0.75px (`tracking-tight`); color: #0f172b; margin-bottom: 8px

### lead
- font-size: 14px; line-height: 22.75px; color: #45556c
- max-width: 384px; margin-inline: auto; text-align: center

### body block
- padding: 0 32px 32px (`px-6 pb-7 sm:px-8 sm:pb-8`)

### label
- font-size: 14px; font-weight: 500; line-height: 20px; color: #1d293d; margin-bottom: 8px

### input
- height: 44px; width: 100%; border: 1px solid #e5e5e5; border-radius: 8px
- padding: 4px 12px; font-size: 14px; color: #0a0a0a
- box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)
- placeholder "000.000.000-00", placeholder colour #737373

### helper
- font-size: 12px; line-height: 16px; color: #62748e; margin-top: 8px

### submit button
- width: 100%; height: 40px; background: #171717; color: #fafafa
- border-radius: 8px; font-size: 14px; font-weight: 500

### separator + footnote
- `<hr>` 1px #e5e5e5, then footnote 12px / #62748e / centred

## States & Behaviours

### Input focus (`:focus-visible`)
- **Trigger:** keyboard/pointer focus
- **A → B:** border-color `#e5e5e5` → `#a1a1a1`; adds `box-shadow: 0 0 0 3px rgb(161 161 161 / .5)` on top of the resting shadow
- **Transition:** 150ms cubic-bezier(0.4, 0, 0.2, 1)

### Submit hover
- background `#171717` → `rgb(23 23 23 / .9)`, 150ms cubic-bezier(0.4, 0, 0.2, 1)

### Form submit
- **No client-side validation.** Any value navigates to `/student-card?documento=<value>`.
- Verified with `123`, `11111111111`, `19651595752` — all navigate; errors render on the target route.
- Clone uses `<form method="get" action="/student-card">` with `name="documento"`.

## Assets
- `public/images/logo-fesn-short.svg`

## Text Content (verbatim)
- Badge: `Consulta Rápida`
- Title: `Encontrar carteirinha`
- Lead: `Digite o CPF ou o código de uso (Nº da CIE) para localizar a carteirinha do estudante.`
- Label: `CPF ou código de uso (Nº da CIE)`
- Placeholder: `000.000.000-00`
- Helper: `Informe o CPF (com ou sem pontuação) ou o código de uso.`
- Button: `Buscar carteirinha`
- Footnote: `Problemas para encontrar? Verifique se o CPF ou o código de uso foi informado corretamente.`

## Responsive Behaviour
- **1440 / 768:** identical; card capped at 512px, centred, page never scrolls.
- **390:** card fluid to the 16px gutter; title drops to 24px. No layout reflow.
- **Accessibility fix:** the target renders the title as a `<div>`; the clone uses `<h1>`.
