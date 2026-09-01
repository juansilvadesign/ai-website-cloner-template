# SiteHeader Specification

## Overview

- **Target file:** `src/clones/bio-nutriruama-com-br/components/SiteHeader.astro`
- **Screenshot:** `docs/design-references/bio-nutriruama-com-br/original-1440.png`, `menu-open-1440.png`, `menu-open-768.png`
- **Interaction model:** click-driven menu and click-driven theme state

## DOM Structure

`header > button[aria-label="Abrir menu"] + img[alt="Ruama Cori · Nutricionista"] + button[aria-label="Alternar tema"] + fixed menu overlay`. The overlay contains a scrim close button and panel. The panel has a MENU label, a close icon button, four external navigation anchors, a supporting paragraph, an eBook promo anchor with `menu-card.webp`, four social anchors, and the Dudes Becker attribution anchor.

## Computed Styles (exact values from getComputedStyle)

### Header

- 1440px: `display: flex`, `width: 1440px`, `max-width: 1745px`, `height: 112px`, `padding: 32px 0`, `justify-content: space-between`, `align-items: center`, `background: transparent`.
- 390px: `height: 74px`, `padding: 16px 20px`.
- Font: `degular, Figtree, "Figtree Fallback", Figtree, system-ui, sans-serif`; color `rgb(40, 8, 20)` in default mode.

### Controls

- 390px: `42×42px`, `display: grid`, `border: 1px solid rgb(236,236,236)`, `border-radius: 11px`, background `rgb(248,248,248)`.
- Desktop: `48×48px` with the same 11px radius.
- Transition: color/background/border 150ms `cubic-bezier(.4,0,.2,1)`.
- Logo: default `84.094×34px` on phone; `141×57px` intrinsic / 48px rendered height on desktop.

### Menu panel

- 1440px: `1035×643.688px`, `padding: 44px 70px`, `border-radius: 44px`, `outline: 1.5px solid white`, `background: rgba(248,248,248,.62)`, `backdrop-filter: blur(27px)`, `box-shadow: 0 4px 34px rgba(0,0,0,.25)`.
- 768px: `400px` wide, `padding: 21px 21px 40px`, `border-radius: 24px`, top aligned with 24px inset.
- Menu list at desktop: `548px` wide, 18px row gaps. Individual nav rows have a bottom border with 30% ink and 18px bottom padding.

## States & Behaviors

### Menu open/close

- **Trigger:** menu control, close icon, or scrim click.
- **Before:** overlay `opacity: 0`, `pointer-events: none`; panel `translateY(-16px)`.
- **After:** overlay `opacity: 1`, `pointer-events: auto`; panel transform none.
- **Transition:** `opacity 0.3s cubic-bezier(.4,0,.2,1)`; panel transform 0.3s same curve.
- **Implementation approach:** server-rendered overlay with an Astro `<script>` toggling `hidden`/data attributes and focus returning to the trigger.

### Theme toggle

- **Trigger:** theme control click.
- **State A:** light `#F8F8F8` canvas / `#280814` text, logo no filter, moon icon.
- **State B:** `[data-theme="dark"]`; `#280814` canvas / `#F7E9EC` text, logo `brightness(0) invert(1)`, sun icon.
- **Transition:** source controls transition colors over 150ms.
- **Implementation approach:** update `document.documentElement.dataset.theme` and store `bio-nutriruama-theme` in local storage.

### Hover states

- Header controls: background becomes white in default mode; 150ms control transition.
- Menu anchors: source arrow nudges right 2px and the row preserves its external-link destination.

## Per-State Content

### Menu links

- Site Oficial — `https://nutriruama.com`
- Achadinhos da Nutri — `https://www.amazon.com.br/shop/nutriruama`
- Blog da Nutri — `https://blog.nutriruama.com`
- Parcerias & Publicidade — `https://wa.me/message/RSHXP5MRNY7QC1`

## Assets

- Logo: `public/clones/bio-nutriruama-com-br/images/logo.svg`
- Menu promo: `public/clones/bio-nutriruama-com-br/images/menu-card.webp`
- Attribution: `public/clones/bio-nutriruama-com-br/images/created-by-dudes.svg`
- Icons: inline semantic SVGs for nine-dot menu, X, moon, sun, external arrows, social brands.

## Text Content (verbatim)

- `MENU`
- `Saiba Mais` (each menu row)
- `Eu estou aqui para fazer você se apaixonar pelo processo de se tornar a sua melhor versão!`
- `Se você tem dúvidas do que fazer, tenha 100 receitas rápidas, práticas e saudáveis.`

## Responsive Behavior

- **Desktop (1440px):** centered two-column 1035px panel; 48px controls; 48px logo height.
- **Tablet (768px):** 42px controls, 34px logo, 400px single-column panel.
- **Mobile (390px):** header stays 74px high with 20px side padding; overlay panel occupies the safe horizontal center with 12px outer inset.
- **Breakpoint:** desktop changes at 1024px.
