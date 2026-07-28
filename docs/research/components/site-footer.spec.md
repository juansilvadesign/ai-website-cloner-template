# SiteFooter Specification

## Overview
- **Target file:** `src/components/SiteFooter.astro`
- **Screenshot:** `docs/design-references/fesn/vendas-1440.png` (y 2806–3457)
- **Interaction model:** static (link + card hovers)

## DOM Structure
`<footer>` → upper container grid (4 zones: brand, Institucional, Contato, Transparência)
→ bottom bar `<div>` with two lines.

## Computed Styles

### footer
- background #020618; border-top 1px solid #1d293d; colour #e2e8f0

### upper container
- display grid; `grid-template-columns: 1.2fr 1fr 1fr 1fr` ≥1024px (→ 281.14 / 234.28 ×3), single column below
- gap 40px; max-width 1152px; margin-inline auto; padding 48px 24px

### brand column (`space-y-5` → 20px)
- logo wrapper: display flex; align-items center; gap 12px; `<img>` `/images/logo-fesn-white.svg` at 180x92.6
- blurb `<p>`: 14px / lh 22.75px / colour #cad5e2; max-width 384px
- box: background rgb(16 23 43 / 0.7); border 1px solid #1d293d; border-radius 14px; padding 16px; `space-y-3`
  - title `<p>` 14px / 600 / colour #f1f5f9
  - `<ul>` `space-y-2`, 14px, colour #cad5e2

### link columns (`space-y-4` → 16px)
- heading `<p>`: 14px / 600 / lh 20px / letter-spacing 1.12px (`tracking-[0.08em]`) / uppercase / colour #f1f5f9
- `<ul>` `space-y-2` (Contato uses `space-y-3`), font-size 14px
- `<li>` line-height 20px
- `<a>` colour #cad5e2, `transition: color 150ms cubic-bezier(0.4,0,0.2,1)`
- Contato rows: icon 16x16 + label, display flex, gap 8px, row height 23px

### Transparência column
- Reclame Aqui `<a>`: display block; background rgb(16 23 43 / 0.8); border 1px solid #314158;
  border-radius 14px; padding 16px; contains `<img>` `/images/reclame-aqui-otimo.png` + caption
- "Confirmação oficial" box: same treatment as the brand box

### bottom bar
- border-top 1px solid #1d293d; padding 24px; container max-width 1152px
- two `<p>` at 12–14px, colour #62748e

## States & Behaviours
| Element | Property | From → To | Transition |
| --- | --- | --- | --- |
| Footer link | color | `#cad5e2` → `#ffffff` | 150ms cubic-bezier(.4,0,.2,1) |
| Reclame Aqui card | border-color | `#314158` → `#62748e` | same |

## Assets
- `public/images/logo-fesn-white.svg` (alt `Logo FESN`)
- `public/images/reclame-aqui-otimo.png` (alt `Selo de avaliação Reclame Aqui da FESN`)
- Icons: `mail` ×2, `message-circle`, `instagram`, `facebook`, `linkedin`, `youtube`, `globe`, `shield-check` ×2

## Text Content (verbatim)
- Brand blurb: `Emissão de carteirinha digital com autenticação por QR Code, foco em segurança de dados e suporte ao estudante.`
- Box title: `Credibilidade e segurança`; bullets: `Processo com validação de autenticidade e orientações institucionais.` · `Canais oficiais para atendimento, suporte e acompanhamento.`
- **Institucional**: `Site oficial FESN` → `https://carteirinha.fesn.org.br` · `Solicitar carteirinha digital` → `/vendas` · `Consultar carteirinha existente` → `/` · `Política de privacidade` → `/politica-de-privacidade` · `Termos de uso` → `/termos-de-uso`
- **Contato**: `contato@fesn.org.br` → `mailto:` · `suporte@fesn.org.br` → `mailto:` · `Atendimento comercial` → `https://wa.me/5587996313344?text=Quero%20carteirinha%20de%20estudante%2C%20pode%20me%20ajudar%3F`
- Sub-heading: `Redes oficiais`; socials: `Instagram` → `https://www.instagram.com/fesnoficial` · `Facebook` → `https://www.facebook.com/profile.php?id=61564335405545` · `LinkedIn` → `https://www.linkedin.com/company/fesnoficial/` · `YouTube` → `https://www.youtube.com/@FESN-FederacaodosEstudan-jd2wy`
- **Transparência**: caption `Acompanhe a reputação da FESN no Reclame Aqui.`; box `Confirmação oficial` — `Utilize sempre canais com domínio oficial e valide sua carteirinha por QR Code para garantir autenticidade.` + `www.fesn.org.br`
- Bottom: `© 2026 FESN. Todos os direitos reservados.` · `Carteirinha digital com fluxo de emissão e validação orientado por segurança institucional.`

## Responsive Behaviour
- **1440:** four zones on one row.
- **768:** grid collapses to a single column (the 4-col rule is `lg:`), zones stack in DOM order.
- **390:** same single column; gutter 16px; social pills go 2-up.
