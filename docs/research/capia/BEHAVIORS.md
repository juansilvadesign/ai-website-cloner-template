# Capiá — behaviours

**Motion tier: Moderate → Heavy.** The page uses Lenis smooth scroll, six scroll-linked effects
on one rAF loop, a CSS float loop, a time-driven orbit loop, Web Animations item swaps and a
cursor image trail. It has **no** canvas, WebGL, Lottie or video, so every effect was
reimplemented and none needed a fallback.

The original behavior script (`assets/index-DrOw2l_V.js`) was unminified with esbuild and read
in full. The clone's `src/clones/capia/scripts/*.ts` is a line-for-line port with the same
constants, triggers and init order. The motion verdicts below come from that code plus the live
checks listed at the end.

## Global

- **Lenis 1.3.27:** `{ autoRaf, anchors, allowNestedScroll, smoothWheel, syncTouch: false, lerp:
  .094, wheelMultiplier: .96, touchMultiplier: 1 }`. It resizes on `load`, `pageshow` and
  `fonts.ready`. Anchor links scroll through Lenis.
- **Frame loop:** a single `requestAnimationFrame` is coalesced from Lenis `scroll`, native
  `scroll`, `resize` and `fonts.ready`. Each effect registers with `aoRolar(fn)` and receives the
  viewport height.
- **Reduced motion:** an inline head script adds `html.reduzido`. JS then skips Lenis and every
  scroll and time effect, and CSS cuts animations to .001ms.

## Header (`scripts/topo.ts`)

- **Dropdown "Cardápio":** it opens on `pointerenter` with a mouse and closes 160ms after
  `pointerleave`. A mouse click (detail > 0) only opens; touch and keyboard toggle it. It closes
  on Escape (returning focus to the button), on a press outside, on focus leaving and on clicking
  a link. The transition is `opacity .17s, translate .23s var(--sai)`, from -7px to 0, and the
  caret rotates 180°.
- **Nav link hover:** a cheddar underline goes `scale 0→1`, `.22s var(--sai)`, from the left.
- **Logo hover:** the capybara goes `rotate -5deg`, `translate 0 -2px`, `.23s`.
- **Drawer (<900px):** the hamburger sets `.gaveta.aberta`. The drawer slides in from
  `translate(100%)` with `transform .32s ease-in-out`. The backdrop fades over .32s, `html`
  overflow is hidden and Lenis stops. Focus moves to the logo. Escape, the backdrop, links and
  the close button all close it. The nested "Cardápio" row toggles its submenu (the `+` rotates
  45°). Widening past 900px closes it.

## Hero

- **Float loop (CSS):** `@keyframes flutua`, 6.6–9.8s, with negative delays. Each ingredient
  translates by its own `--fx/--fy` and rotates by `--fr`. Pieces 3 and 6 are blurred.
- **Hover:** the CTA lifts 4px and turns cheddar. The red tag lifts 4px. Both press to
  `scale .97` on active.

## Nicknames (`scripts/apelidos.ts`), scroll-driven

- **Progress:** `p = clamp((vh − top) / (vh + height))`, with `d = (smoothstep(p) − .5) × 2`.
- **Bubbles:** `--ax/--ay/--ar = [33,-43,9] / [-32,44,-10] / [24,45,9] / [-28,-37,-7] × d`, times
  0.72 at ≤575px.
- **Scooter:** `t = clamp((p − .05) / .9)`. `--voo-x` runs -106vw → 106vw, `--voo-y = −52·sin(πt)`
  (27 on phones) and `--voo-r` runs 6.2° → −4.8°.

## Marquee (`scripts/faixa.ts`), scroll-driven

- **Starting offset:** each track gets `--base = [−13.4%, 1.6%] × section width − (track width / 4)`.
  This is recomputed on resize and when fonts load.
- **Slide:** both tracks get the same `--anda = −d × 14.5vw` (30vw at ≤575px). **They move
  together.**

## Menu (`scripts/cardapio.ts`)

- **Stack:** sticky panels with a spacer between them. The active panel is the last one whose top
  has crossed 42% of the viewport. It sets `data-ativo`/`data-cor` on `.cardapio`, the `.ativo`
  dot and `aria-current`. A panel whose successor has reached the top becomes `inert`.
- **Dot rail:** sticky at 50svh, with a 220px top margin. JS adds a negative offset so it stops at
  the end of the stack. Clicking a dot scrolls to that category's anchor through Lenis.
- **Stage entrance (scroll):** `e = smoothstep(clamp((vh − top) / (.76 vh)))`. The product gets
  `--entra-y = (1−e)·132px` and `--entra-s = .88 + .12e`, and the CTA gets `--botao-y = (1−e)·186px`.
- **Ingredient drift (scroll):** each of the 7 slots has its own `x, y, giro, dx, dy` (cycled per
  panel). Drift is ±those values times d across anchor, panel and spacer (×0.62 at ≤575px).
- **Ingredient orbit (time):** `--fx = sin(φ)·fx`, `--fy = cos(.77φ)·fy`, `--fr = sin(.61φ+.5)·fr`,
  with periods of 4.7–7.1s. It runs only while the panel is within 96px of the viewport and the
  tab is visible.
- **Carousel (click, keyboard, swipe):**
  - **Looping:** it loops with one cloned set of pills on each side when there are more than 4
    items (Lanches, 6 items) and always on phones. Otherwise the pills are centered and the
    arrows are hidden on desktop.
  - **Position:** the desktop track puts the active pill second. Phones center it. The track
    transitions `transform .41s var(--sai)`. After 480ms, or on `transitionend`, a clone position
    snaps back to its original without a transition.
  - **Input:** Arrow keys move the selection. A 42px pointer drag swipes. A mouse drag that ends
    on the same pill fires a click that re-selects that pill, and the original does the same.
- **Item swap (click):**
  - **Load:** the 7 ingredient images and the product image are preloaded (12s timeout, then
    decoded), with `aria-busy` set while it runs.
  - **Fade out:** each of the 10 targets fades `opacity → 0` and scales `scale → .95` (composite
    add) over 145ms, ease-in, with a 12ms cascade.
  - **Swap:** the image sources, the product alt text, the two seals and the ingredients change.
  - **Fade in:** 440ms opacity and 560ms scale on `cubic-bezier(.16,1,.3,1)`, with a 32ms cascade.
  - **Announce:** `role=status` reads "<nome>: <ingredientes>.". If an image fails, the selection
    reverts and an error message is shown.
- **Warm-up:** hovering or focusing a pill preloads that item. When a panel comes within 240px,
  its neighbor items are preloaded.

## Story (`scripts/casa.ts`), scroll-driven cascade

Each sticker and photo reveals as it crosses from 97% to 58% of the viewport. The timing is
staggered by 30px (stickers) or 20px (photos) per index. `--vis` is a smoothstep. `--sobe` (112 or
168px) and `--cresce` (.92 or .895) follow a back-out curve, `1 + 2.42(t−1)³ + 1.42(t−1)²`.

## Footer (`scripts/rodape.ts`)

- **Cursor trail** (fine pointer, ≥768px), inside the zone between 56px below the footer's top
  and the newsletter row:
  - **Spawn:** a new 9:16 card spawns when the pointer has moved at least 52px and 70ms since the
    last one. Cards cycle through `mural/01–06`.
  - **Animation:** each card lives 3.8s on `cubic-bezier(.2,.84,.3,1)`. It goes from scale .2,
    rotated +14°, to the overshoot scale ×1.07 at 20%, rests from 20% to 80%, then falls 30px
    while fading.
  - **Limits:** at most 22 cards are alive (9 without a fine pointer).
  - **Tooltip:** "mexa o mouse" follows the pointer, offset +82px and −30px, but only while no
    card is alive. It is restored on wheel scroll under a resting mouse.
  - **Cleanup:** all cards are cleared when the footer leaves the viewport or the tab is hidden.
- **Touch on wide screens:** a tap (under 600ms, under 10px of movement, no scroll) drops one card.
  "toca aqui" drops one at the headline.
- **Phones (≤767px):** the trail is hidden and the six cards become a stack (`frente`, `perto`,
  `longe` and `fundo`). A tap, or "toca aqui", advances it with a 380ms rise-and-rotate, and a
  status reads "Foto n de 6".
- **Newsletter:** the form validates the e-mail on the front end only. It shows "Anotado. Calma,
  que a gente escreve." and resets, or shows "Confere o e-mail e tenta de novo." and refocuses
  the field. **There is no backend**, so wire one when using this as a client template.
- **Hover:** footer links turn cheddar. Social icons lift 2px and turn cheddar. "toca aqui" goes
  to rotate -1.5deg and scale 1.07.

## Responsive sweep (live)

- **1440:** every composition is as designed.
- **768:** the desktop compositions stay. The hamburger replaces the nav (below 900px) and the
  dot rail stays.
- **390:** every section switches to its mobile layout. The carousels center their active pill,
  the dot rail is hidden, the story becomes a grid and the mural becomes a stack.

## Deliberate differences and deferrals

- **Removed:** none. Every effect was reimplemented and nothing was deferred.
- **Asset paths:** prefixed `/clones/capia/…`, as the clone namespace requires.
- **Error message:** the console message for a failed image now points to `data/cardapio.ts` and
  `public/clones/capia/img/`, because the original's `src/config.js` doesn't exist in this
  project.

## Live verification (clone, 2026-11-24)

- **Layout:** section offsets and heights equal the original at 1440 and 390. There is no
  horizontal overflow at 390.
- **Static pixels:** the full-page SSIM is **0.972** at 1440 and **0.994** at 390. The
  difference maps are black everywhere except the clock-driven pieces (the hero float and the
  menu ingredient orbit), whose phase depends on time since load.
- **Marquee:** at a fixed scroll position its values are identical to the original's.
- **Desktop replay:** dropdown hover and close; the item swap, with the same text and status and
  the same track offset (-1573px); next arrow; dot nav, which lands on the same anchor (4672) and
  sets cor `mate` and inert; trail spawn, 9 cards from the same path as the original; form
  invalid and valid.
- **Phone replay:** the drawer opens with focus moved, overflow locked and Lenis stopped, and
  Escape closes it; the submenu toggles; the carousels center; the card stack advances to
  "Foto 2 de 6".
