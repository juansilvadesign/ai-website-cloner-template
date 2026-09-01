# Ruama Cori · Nutricionista — Page Topology

## Source and capture state

- **Source URL:** `https://bio.nutriruama.com.br/`
- **Locale:** `pt-BR`
- **Viewports inspected:** 1440×1000, 768×1000, 390×844 at DPR 1
- **Motion classification:** Light
- **Root flow:** `min-height: 100vh` column. Header and footer are normal flow; `main` flexes only when the viewport is taller than the content.

## 1. Header — flow, click-driven

The header is centered in a 1745px max-width frame. It has a 42px menu button at the left, the source logo centered, and a 42px theme button at the right. At desktop its height is 112px (`padding-block: 32px`); below 1024px it is 74px (`padding: 16px 20px`). It is never sticky.

The menu control opens a fixed full-viewport overlay. The theme control toggles the source dark variant. Both controls have 11px rounded soft borders and 150ms color/background/border transitions.

## 2. Main mosaic — normal flow

At 1024px and above, the page uses a 3-column grid with `714fr 513fr 455fr` and a 32px gap. Its height is governed by the four center cards: each keeps an aspect ratio of 513:187, separated by 18px. At 1440px, the rendered grid columns are 584.094px, 419.672px, and 372.234px; grid height is 665.875px.

Below 1024px, the grid stacks in this order with 20px row gaps: hero, card stack, protocol. The mobile content column is full width inside 16px page gutters.

## 3. HeroSection — time-driven video, hover-driven social links

The first desktop column is a rounded media hero. It contains the public muted `hero.mp4`, plays inline automatically, and does not loop. A coral-to-wine overlay reaches opaque coral at 77% of its height. Copy is bottom-aligned, white, and centered: eyebrow, `h1` “processo”, supporting line, then a row of four social anchors. At desktop the hero fills the center-stack height and has 38px corners; on mobile/tablet it is exactly 460px high with 24px corners.

The small down-chevron that breaks the mobile hero’s lower edge is decorative (`pointer-events: none`). Social links are direct external anchors; their hover moves them up 4px and changes the circular background from 14% to 30% white over 300ms.

## 4. LinkCardStack — static/external-link cards

The center column contains four independent anchors in this exact order:

1. Consulta Nutricional → `https://wa.me/message/KMWPSVOPAHHSD1`
2. E-book “100 Receitas” → `https://ebook.nutriruama.com.br`
3. Desafio Reset → `https://form.respondi.app/wEYdOHTX`
4. Parcerias & Publicidade → `https://wa.me/message/RSHXP5MRNY7QC1`

Each is a media-backed composition with no state-specific content. At 390px they are 180px high with 18.6px corners and 13.91px gaps; at 1024px and above they use the 513:187 ratio, 24px corners, and 18px gaps. Cards use their own supplied desktop/mobile crops as appropriate and gain only a 150ms `0 8px 30px rgba(0,0,0,.10)` hover shadow.

## 5. ProtocolCard — decorative action button

The third desktop column is an olive `card-protocolo.webp` composition, including the tablet artwork and white rule decoration. A white center tab at its top reads “Gratuito.” The bottom contains a green “Garantir meu Protocolo” button and small white supporting copy. The source button has no observed popup, navigation, or DOM state transition after click; its sheen is decorative and repeats every 4.5 seconds. On phone it follows a fixed 455:803 aspect ratio.

## 6. SiteFooter — static

The page ends with a centered line: “Todos os Direitos Reservados © Ruama Cori · 2026”. It is normal flow, with 80px height desktop and 64px height on phone.

## 7. Menu overlay — click-driven modal

Opening the header control inserts an interactive fixed scrim/panel over all page content (`z-index: 50`). The 1440px panel measures 1035×643.688px, uses a 44px radius, 70px horizontal / 44px vertical padding, an off-white 62% glass surface, 27px backdrop blur, a white outline, and `0 4px 34px rgba(0,0,0,.25)` shadow. It is a two-column desktop composition: navigation/content on the left and a `menu-card.webp` promo on the right. At 768px the panel becomes 400px wide, top-aligned and single-column.

The menu closes from either close button or the scrim. It transitions between `opacity: 0; pointer-events: none; transform: translateY(-16px)` and its visible state over 300ms.
