# ContactLinks Specification

## Overview

- **Target file:** `src/clones/fecoelho-com-br/components/ContactLinks.astro`
- **Desktop screenshot:** `docs/design-references/fecoelho-com-br/contact-links-1440.png`
- **Mobile reference:** `docs/design-references/fecoelho-com-br/original-390.png`
- **Interaction model:** browser navigation/download + CSS hover and active states
- **Dependency:** `ContactIcon.astro` and `types/contact.ts`

## DOM Structure

`nav.links[aria-label="Meus contatos"]` contains five `a.link` elements. Each anchor contains:

1. `span.ico[aria-hidden="true"]` → `ContactIcon`
2. `span.txt` → label text and nested `span.sub`
3. `span.arr[aria-hidden="true"]`

The first anchor also has class `primary` and the `download` attribute.

## Computed Styles (exact values from getComputedStyle)

### `.links`

- display: flex
- flex-direction: column
- gap: 12px
- margin: `28px 0 0`
- width: 420px desktop/tablet; 350px mobile
- height: 431.28125px at all inspected widths

### `.link` (secondary)

- display: flex; align-items: center
- width: 420px desktop/tablet; 350px mobile
- height: 76.65625px
- gap: 14px
- padding: 15px 18px
- background: rgb(255,255,255); dark rgb(26,22,20)
- border: 1px solid rgb(230,221,210); dark rgb(44,38,34)
- border-radius: 18px
- box-shadow light: `rgba(25,20,16,.05) 0 1px 2px, rgba(25,20,16,.06) 0 6px 16px`
- box-shadow dark: `rgba(0,0,0,.3) 0 1px 2px, rgba(0,0,0,.35) 0 8px 20px`
- font: Inter 600 16.32px / 24.48px
- color: rgb(25,20,16); dark rgb(244,239,233)
- transition: `transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease`

### `.ico`

- flex: `0 0 40px`; width / height: 40px
- display: grid; place-items: center
- border-radius: 12px
- background: rgb(242,238,232); dark rgb(32,27,24)
- color: rgb(209,85,59); dark rgb(240,113,79)

### `.txt`, `.sub`, `.arr`

- `.txt`: flex 1; text-align left; 299.609375px desktop / 229.609375px mobile
- `.sub`: display block; margin-top 1px; Inter 400 12.8px / 19.2px; muted/meta color
- `.arr`: flex 0 0 auto; inherited 16.32px / 24.48px; muted color

### `.link.primary`

- background: 135deg gradient from accent to the 70% accent / 30% violet mixture
- color: rgb(255,255,255); dark rgb(23,17,13)
- border-color: transparent
- icon background: rgba(255,255,255,.18); icon color: primary foreground
- subtitle: primary foreground at 82% alpha
- arrow: primary foreground at 75% alpha

## States & Behaviors

### Pointer hover

- **Trigger:** `.link:hover` inside `@media (hover: hover)`.
- **Shadow:** default → raised (`0 1px 2px rgba(...,.04), 0 12px 32px rgba(...,.08)` in light).
- **Secondary border:** line → `color-mix(in srgb, accent 45%, line)`; computed `color(srgb .864902 .626667 .557059)` in light.
- **Primary border:** remains transparent because `.link.primary` is later at equal specificity.
- **Transition:** 150ms ease on transform, shadow, and border color.

### Active press

- **Trigger:** `:active` on any anchor.
- **State A:** transform none.
- **State B:** `scale(.985)`.
- **Transition:** 150ms ease.

### Focus

- No custom rule. Preserve native `outline: auto`; never set `outline: none`.

### Activation

- No in-page mutation. External links navigate in new tabs with `rel="noopener"`; e-mail invokes the mail client; vCard downloads locally.

## Per-State Content

1. `Salvar contato` / `Adicionar à agenda do celular` / ↓ / `/clones/fecoelho-com-br/fernanda-coelho.vcf`
2. `WhatsApp` / `Mandar mensagem` / ↗ / `https://wa.me/5521998669695`
3. `LinkedIn` / `fernanda-c-dreilich` / ↗ / `https://www.linkedin.com/in/fernanda-c-dreilich`
4. `Site` / `fecoelho.com.br` / ↗ / `https://fecoelho.com.br`
5. `E-mail` / `fernandadreilich@gmail.com` / ↗ / `mailto:fernandadreilich@gmail.com`

## Assets

- vCard: `public/clones/fecoelho-com-br/fernanda-coelho.vcf`
- Icons: `ContactIcon` variants; no external images.

## Text Content (verbatim)

All content is listed in “Per-State Content”; do not paraphrase, normalize the LinkedIn handle, or alter the e-mail.

## Responsive Behavior

- **Desktop (1440px):** 420px links, 299.609375px flexible text block.
- **Tablet (768px):** identical to desktop.
- **Mobile (390px):** 350px links, 229.609375px flexible text block; all heights, spacing, type, and icon sizes remain identical.
- **Breakpoint:** none.
