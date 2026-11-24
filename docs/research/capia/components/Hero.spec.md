# Hero Specification

## Overview
- **Target file:** `src/clones/capia/components/Hero.astro` (markup verbatim)
- **Styles:** `src/clones/capia/styles/sections/hero.css`
- **Screenshot:** `docs/design-references/capia/original-1440-full.png` (top), `public/clones/capia/seo/cover.png` (clone)
- **Interaction model:** time-driven (CSS float loop) + hover

## DOM Structure
`section.hero#inicio > .hero__tela(container) > [.hero__texto > h1.hero__titulo(span.hero__forte, span.hero__mao, span.so-leitor) + a.hero__botao] + .hero__selo(svg ring text + svg.selo__capi) + img.hero__peca--1…6 + .hero__produto(img + a.hero__etiqueta)` + `svg.hero__onda` (cream wave).

## Computed Styles (source values)
- `.hero`: height `clamp(600px, 54vw, 930px)` (778px at 1440), bg `--carvao`, overflow hidden. `.hero__tela`: `min(100%, 1920px)`, `container-type: inline-size`.
- `.hero__texto`: width 46%, top 10.6cqw, left 7.1%. `.hero__titulo` height `max(186px, 14.4cqw)`.
- `.hero__forte`: 800 `max(58px, 6.7cqw)`/.86, tracking −.03em, `opsz 96, wdth 92`, left 13%, rotate −2.4deg. `.hero__mao`: Mr Dafoe `max(60px, 7.3cqw)`/.8 cheddar, top 43%, rotate −2.4deg.
- `.hero__botao`: bg `--branco`, ink `--carvao`, 700 `max(17px, 1.46cqw)`, padding 1.02em 1.7em .82em, radius `--pao-b`, top `max(232px, 18.9cqw)`, left 15.2%, rotate −3.6deg.
- `.hero__selo`: width 11.3%, top 6.1cqw, left 80.2%; ring text 20px/800 uppercase, `textLength 452`; inner circle r52 stroke 5.
- `.hero__produto`: width 28.4%, top 18.8cqw, left 60.6%, img `drop-shadow(0 1.5cqw 2cqw #0000006b)`. `.hero__etiqueta`: tomato, width 50%, aspect 5/2.2, radius `19% 15% 18% 21%/32% 34% 30% 38%`, top 61%, left −29%, rotate 2.6deg; text 20cqw/800.
- Pieces: `--1` 9% @ 12.6cqw/57.6% · `--2` 9.6% @ 11.2cqw/68.9% · `--3` 5.9% @ 21cqw/89.8% blur .26cqw op .88 · `--4` 8% @ 31.2cqw/50.6% · `--5` 7.8% @ 20.8cqw/52.9% · `--6` 4.7% @ 41.2cqw/46.9% blur .31cqw op .83.

## States & Behaviors
- **Float:** `flutua` keyframes 0/100% rest → 30% `translate3d(fx, −fy) rotate(fr)` → 70% the inverse; durations 7.9/8.2/7.3/9.8/8.6/6.6s, negative delays.
- **CTA hover:** bg → cheddar, `translate 0 −4px` (.19s); active `scale .97`. **Tag hover:** `translate 0 −4px`; arrow `translate 3px`.

## Text Content (verbatim)
"Meu Capiá," · "minha calma." · (sr) "Hamburgueria em Curitiba." · "Ver o cardápio ›" · "Clássico da Casa ›" · ring "feito na chapa · sem pressa · na calma ·" · product alt "O Clássico da Casa: dois smash, cheddar derretido, picles e molho da casa no pão brioche".

## Assets
`img/produtos/hero.webp` (900×790, fetchpriority high), `img/pecas/{tomate,alface,picles,cebola-roxa,cheddar,picles}.webp`, `#capi-sentado`.

## Responsive Behavior
- **≤767px:** height `max(660px, 100svh)`; text top 112px/left 6%/width 88%, title height 124px; `.hero__forte` `clamp(46px, 14.4cqw, 64px)`, `.hero__mao` `clamp(50px, 15.6cqw, 70px)`; CTA 17px at top 168px; seal 23% at bottom 47%; product 76% (max 430px) at bottom 6%; pieces re-anchored to the bottom (5 hidden); wave height 46%.
