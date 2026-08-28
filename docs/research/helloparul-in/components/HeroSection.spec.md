# HeroSection Specification

## Overview

- **Target file:** `src/clones/helloparul-in/components/HeroSection.astro`
- **Reference:** master desktop/mobile captures; `source.html:124-142`
- **Interaction model:** static with anchor-link hover

## DOM Structure

`header#top.hero.parul-shell` contains `h1`, metadata paragraph, and CTA row. The last word of the h1 is a relative inline wrapper whose child underline sits behind the text.

## Computed Styles

- Header: `padding:88px 0 56px` desktop; width equals the centered shell.
- Heading: Bricolage 800; `font-size:clamp(44px,8.4vw,118px)`; `line-height:.94`; `letter-spacing:-.035em`; `max-width:14ch`; balanced wrapping.
- Underline: absolute `left:-4px; right:-4px; bottom:.1em; height:.34em; background:rgb(255,200,61); transform:rotate(-1.5deg); z-index:-1`.
- Metadata: Space Mono 14px, `#7A7468`, `.01em` tracking, 22px top margin.
- CTA: inline flex; `padding:16px 26px`; 999px radius; `#FF3B1F` background; cream foreground; Space Mono 700 14px; 40px top margin.

## States & Behaviors

- CTA scrolls to `#work`.
- CTA hover background: `#FF3B1F` → `#181510`.

## Text Content

- Heading: `Designer. Thinker. who removes friction.`
- Metadata: `Product Designer · 5+ years · Consumer Products · Growth & Conversion`
- CTA: `See the work ↓`

## Responsive Behavior

- **Desktop:** source max is 118px and hero height is 612.719px after the sticky nav.
- **≤760px:** top padding 48px; heading `clamp(54px,13.5vw,118px)` with `max-width:11ch`; metadata 12.5px, 16px top margin; CTA margin 28px, `13px 20px`, 12.5px label.
