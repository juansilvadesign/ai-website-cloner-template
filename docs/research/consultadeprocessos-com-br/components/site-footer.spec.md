# SiteFooter Specification

## Overview

- **Target file:** `src/clones/consultadeprocessos-com-br/components/SiteFooter.astro`
- **Screenshot:** final region of `original-1440.png` and `original-390.png`
- **Interaction model:** static navigation links

## DOM Structure

`footer.site-footer > .container > .footer-top + .footer-bottom`; top has brand description and nav links. Bottom has copyright left and small Instagram icon anchor right.

## Computed Styles

- desktop footer: 232px tall, white surface; 20px horizontal outer gutter; top 170px and bottom 61px separated by `#e2e8f0` rule.
- descriptions/nav use slate-400/500 at 12–14px; desktop links stay in a horizontal row with 24px-ish gaps.
- phone footer: 325px tall, 20px gutters; top is 273px; link list stacks into 20px rows with 11px vertical gaps; lower copyright / Instagram row is 51px.

## States & Behaviors

- text links gain a teal/slate hover treatment over 150ms. Instagram is an external link and gets `rel="noopener noreferrer"`.

## Text Content (verbatim)

- Informação jurídica e cadastral para decisões estratégicas.
- Planos; Consulta Processual; Blog; Termos de Uso; Privacidade.
- © 2026 Consulta de Processos. Todos os direitos reservados.
- Instagram.

## Responsive Behavior

- **Desktop:** horizontal link list and copyright/action ends.
- **Phone:** vertical link list, then a two-column copyright/action bar.
