# ContactFooter Specification

## Overview

- **Target file:** `src/clones/helloparul-in/components/ContactFooter.astro`
- **Reference:** master desktop/mobile captures; `source.html:308-326`
- **Interaction model:** external links and local file download

## DOM Structure

`footer#contact` contains `div.parul-shell.footer-inner`, an eyebrow, large h2, action list, and a lower signature line.

## Computed Styles

- Footer: full-bleed `#181510` background, cream ink, 40px top margin.
- Inner shell: `padding:88px 32px 40px` desktop.
- Eyebrow: Space Mono 13px, `#8F8A7C`, 22px bottom margin.
- Heading: Bricolage 800, `clamp(40px,8vw,108px)`, `.95` line-height, `-.035em`, 16ch maximum. “awkward” uses transparent cream `#F2EEE31A`.
- Actions: flex wrap, 14px gap, 44px top margin. Every action uses Space Mono 700 15px, `16px 26px`, full pill.
- Primary email action: red surface and cream text. Secondary items: 1.5px `rgba(242,238,227,.35)` outline.
- Bottom: flex wrap space-between, 16px gap, 80px top margin, 24px top padding, 1px translucent top line, Space Mono 12px, `#A8A293`.

## States & Behaviors

- Primary hover: red → cream, cream ink → ink.
- Secondary hover: border opacity → solid cream.
- Resume downloads `/clones/helloparul-in/documents/Parul-Aggarwal-Resume.pdf`.
- External targets keep `target="_blank" rel="noopener"`.

## Text Content

- `Probably tweaking this footer again.`
- `That's the work. Here's the awkward reaching out part.`
- `Drop an Email`, `Download resume ↓`, `Medium ↗`, `LinkedIn ↗`
- `🧿` and `No templates were harmed`

## Responsive Behavior

- **≤760px:** inner padding `56px 22px 80px`; heading `clamp(38px,10vw,64px)`; action top margin 28px; each action fills its own row with centered 13px label; bottom starts 36px later with 16px top padding.
