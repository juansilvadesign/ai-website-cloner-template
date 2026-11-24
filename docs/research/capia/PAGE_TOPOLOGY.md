# Capiá — page topology

- **Source:** <https://capia-eta.vercel.app/>, inspected 2026-11-24 with Playwright Chromium at
  device scale 1. Viewports were 1440 × 900, 768 × 1024 and 390 × 844. There is no consent wall,
  login or theme toggle.
- **Stack:** a static Vite build. It ships one hand-written stylesheet and one vanilla module
  script (Lenis 1.3.27 plus the page logic). All markup is server-rendered HTML, `lang="pt-BR"`.
- **Clone:** `/capia/` (Astro). Every section height and offset matches the original at 1440
  and 390: the page is 9714px tall at 1440 and 8678px at 390, on both.

## Layers

| z | Layer | Position | Notes |
| --- | --- | --- | --- |
| 200 | `.pular` skip link | absolute | Hidden off-screen until focused |
| 120 / 110 | `.gaveta` drawer / `.gaveta__fundo` backdrop | fixed | Below 900px only, `inert` while closed |
| 100 | `.cardapio__nav` dot rail | sticky (`top: 50svh`) | Inside `.cardapio`, desktop only |
| 50 | `.topo` header | **absolute** (scrolls away) | Transparent over the hero |
| flow | `main` sections, `footer` | relative | Each section raises its z-index by 1 to sit over the previous one's torn edge |

## Sections (top to bottom)

| # | Section | Component | Height at 1440 / 390 | Interaction model |
| --- | --- | --- | --- | --- |
| 0 | SVG sprite (four capybara poses) | `CapiSprite.astro` | 0 | static |
| 1 | Header, dropdown, mobile drawer | `SiteHeader.astro` | 109 (absolute) | hover + click (dropdown), click (drawer) |
| 2 | Hero canvas `#inicio` | `Hero.astro` | 778 / 844 | time-driven (CSS float loop), hover |
| 3 | Nicknames `#capia` | `Apelidos.astro` | 749 / 593 | scroll-driven (rAF + CSS variables) |
| 4 | Word marquee `.faixa` | `Faixa.astro` | 340 / 224 | scroll-driven |
| 5 | Menu `#cardapio` (4 sticky panels) | `Cardapio.astro` + `Painel.astro` | 5616 / 4456 | scroll-driven (stack, stage) + click/keyboard/swipe (carousel) + time-driven (ingredient orbit) |
| 6 | Story `#casa` | `Casa.astro` | 1016 / 1179 | scroll-driven (cascade reveal) |
| 7 | Footer `#contato` | `Rodape.astro` | 1218 / 1384 | pointer-driven (image trail), tap (card stack), form submit |

## Layout systems

- **Canvas sections** (hero, nicknames, marquee) have `container-type: inline-size` with a maximum
  width of 1920px. Their children are absolutely positioned in `cqw` and `%`.
- **Menu panels:** `.painel` is `position: sticky; top: 0; height: 100svh`, followed by a
  `.cardapio__folga` spacer of 56svh (32svh on phones). Each later panel slides over the previous
  one. Inside, `.painel__palco` is a fixed design frame of 1440 × 750 (390 × 780 on phones) scaled
  by `--u`.
- **Story:** an absolute collage in `--su` units (1px at 1280+) on desktop, and a 2-column grid
  below 768px.
- **Footer:** the mural is a grid with its headline centered, and the trail layer covers the zone
  above the newsletter (`--zona`). Below that sit the newsletter row, the legal lines and a giant
  wordmark.

## Breakpoints

- **≤767px:** the mobile layouts for every section.
- **≤899px:** the header nav becomes a hamburger and drawer.
- **≤575px (JS only):** smaller motion amplitudes (nicknames ×0.72, marquee 30vw, menu drift
  ×0.62, float ×0.72).
- `(hover: hover)` gates every hover rule. `(hover: hover) and (pointer: fine)` gates the cursor
  trail.
