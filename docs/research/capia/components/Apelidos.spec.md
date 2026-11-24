# Apelidos Specification

## Overview
- **Target file:** `src/clones/capia/components/Apelidos.astro` (markup verbatim)
- **Styles:** `src/clones/capia/styles/sections/apelidos.css` · **Behaviour:** `scripts/apelidos.ts`
- **Screenshot:** `docs/design-references/capia/original-1440-s420-apelidos.png`
- **Interaction model:** scroll-driven (rAF → CSS variables)

## DOM Structure
`section.apelidos#capia[data-apelidos] > .apelidos__tela(container) > .apelidos__bloco(h2.apelidos__titulo(span×2) + span.apelido--1…4[data-apelido]) + p.apelidos__mao(span×2) + a.botao.botao--tomate.apelidos__botao + .apelidos__voo[data-voo](svg.apelidos__lambreta use #capi-lambreta)`.

## Computed Styles (source values)
- `.apelidos`: height `clamp(610px, 52vw, 800px)` (749 at 1440), bg `--pao`, margin-top −2px. `.apelidos__tela`: `--em: clamp(44px, 5cqw, 72px)`, padding-top `clamp(68px, 6.8cqw, 106px)`, column centred.
- `.apelidos__titulo`: 800 `var(--em)`/.92, tracking −.03em, `opsz 96, wdth 92`.
- `.apelido`: absolute, top `--t × --em`, left `--l`, height `.52em`, min-height 30px, 800 `max(12px, .19em)` uppercase tracking .04em, ink `--branco`, organic radius, tail `clip-path: polygon(0 0,100% 6%,63% 100%,40% 76%)` 21×14 at bottom −9px; transform `translate3d(--ax, --ay, 0) rotate(--giro + --ar)`.
  - `--1` tomato t −.43 l 61.5% 7.4deg · `--2` mate t .6 l −25% −8.5deg · `--3` charcoal/cream t 1.09 l 82.5% 2.6deg · `--4` cheddar/charcoal t 1.76 l 23.5% −2.1deg.
- `.apelidos__mao`: Mr Dafoe `clamp(22px, 2.05cqw, 32px)`/1.32, margin-top `clamp(24px, 2.4cqw, 38px)`.
- `.apelidos__botao`: `.botao--tomate`, font `clamp(16px, 1.25cqw, 18px)`, margin-top `clamp(22px, 2.35cqw, 36px)`.
- `.apelidos__voo`: absolute top 63.5%, width 100%, transform from `--voo-*`; scooter width `clamp(184px, 19.6cqw, 310px)`.

## States & Behaviors
- **Scroll drift / flight:** see BEHAVIORS.md → Nicknames (exact formulas). Off-screen ±240px: no updates.
- **CTA hover:** tomato → charcoal bg, cheddar ink, `translate 0 −3px`, arrow +3px; active `scale .97`.

## Text Content (verbatim)
"Chame como" / "quiser," · bubbles "Capi", "Seu Capiá", "Capivarão", "O piá" · "ele sempre deu um jeito de deixar" / "a fome de bom humor." · "Conheça o Capiá ›".

## Assets
`#capi-lambreta` symbol.

## Responsive Behavior
- **≤767px:** height `clamp(590px, 152vw, 680px)`; `--em: clamp(38px, 11cqw, 46px)`, padding-top 74px; bubbles re-placed (t/l: −.7/60%, 1.06/−15%, 1.14/77%, 2.08/34%); tagline `clamp(21px, 6cqw, 25px)` with 20px inline padding; flight at top 67%, scooter 43cqw.
