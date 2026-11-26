# $0 MRR Club — design system

Extracted 2026-11-26 from https://zeromrr.club/ (the drop "game") and
https://playbook.zeromrr.club/playbook (the AI Reel Playbook landing page).

## Personality

The brand is a streetwear label that makes fun of pre-revenue founders, and it presents itself as
a 2003 PS2-era console game. The home page is a boot screen, a main menu, a character-select
panel and a "memory card" save dialog, set in a dark low-poly garage. The tone is deadpan and
self-aware: "Streetwear for builders with zero MRR and infinite aura", an MRR meter stuck at $0
and an Aura meter pinned at ∞. Everything should read as a game UI first and a shop second.

## Color roles

| Role | Token | Value | Notes |
| --- | --- | --- | --- |
| Ground | `--bg` | `#070a12` | "night", also the three.js clear colour. There is no light theme. |
| Panel | `--surface` | `#13151c` | Playbook cards. Game panels use the translucent `rgba(7,11,24,.8)` and a 6px backdrop blur. |
| Warm panel | `--surface-warm` | `#1b1612` | Featured pricing tier, anchor callout. |
| Ink | `--fg` | `#ece4d0` | Cream "print ink", the colour of the screen-printed tees. |
| Fog | `--fg-2` | `#8fa3c9` | Secondary text, labels, hint rows. |
| Dim | `--muted` | `#6f7891` | Tertiary text. |
| Memory-card blue | `--border` | `#5d7fe0` | Modal frames, inputs, ghost buttons. The deep variant is `#0b1330`. |
| Hairline | `--border-soft` | `rgba(143,163,201,.3)` | Every HUD control. |
| Sodium | `--accent` | `#ef8a4e` | Sodium street light. Used for the `$0`, the selected menu item, the CTA and links. |
| HUD green | `--success` | `#a6e36b` | Aura meter, checklists, the guarantee, the "made with" sticker. |
| Salmon | `--danger` | `#ffb08a` | Form errors only. |

The controller glyphs keep their PlayStation colours: ✕ is `#7fa6ff` and ○ is `#ff7b7b`.

## Typography

- **Anton** (`--font-display`): every headline, the wordmark and the menu items. Always uppercase,
  tracked +0.01em, set solid (line-height .9–1.0), and given a hard black offset shadow
  (`2px 2px 0`, `3px 3px 0` or `4px 4px 0 #000`).
- **Press Start 2P** (`--font-mono`): the `.px` utility. 9–11px, uppercase, +0.06em. Used for HUD
  labels, button labels, tags, hints, prices and the language switch.
- **Chakra Petch 500** (`--font-body`): game body and UI text at 15px/1.5. The CTA is 700 16px uppercase.
- **Inter** on the playbook: body is 18px/1.65, and card titles are 700 at 17–21px.

Scale: the boot wordmark is `clamp(56px,12vw,128px)`, the title card `clamp(60px,13vw,150px)`,
menu items `clamp(44px,7vw,82px)`, the tee name 34px, playbook h1 `clamp(42px,6.6vw,76px)` and
playbook h2 `clamp(30px,4.6vw,46px)`.

## Spacing and layout

- The game is a single fixed viewport with no page scroll. Layers stack as: background image (z0),
  WebGL canvas, scanline and vignette overlay, the UI shell grid (`auto / 1fr / auto` rows), then
  the boot screen and modals at z8–9.
- The tee panel is 400px wide and sits on the right. Its corners are cut with a 14px chamfer
  `clip-path`. At 760px and below it becomes a full-width bottom sheet.
- The playbook uses a 1080px column with 18px gutters, 72px between sections, 14px grid gaps and
  one breakpoint at 860px where all grids collapse to one column.

## Components and states

- **Menu item** (`.mi`): Anton display text. The current item turns sodium, moves 6px right and
  shows a rotated sodium diamond bullet with a glow. Selection works by arrow keys, hover and tap.
- **Start button**: a pixel label inside a hairline box that blinks with `steps(2)` every 1.1s.
  Hover stops the blink and turns it sodium.
- **CTA**: a full-width sodium bar, label left and price right. Hover is `brightness(1.08)`. On
  desktop it is sticky to the panel bottom.
- **Size chips**: square, 52px min-width, 44px min-height. Pressed is a cream fill with a night
  label. A missing size flashes them twice.
- **Meters**: 7px bars with a 1px hairline frame, a green fill and a glow. The full meter pulses.
- **Memory card modal**: a blue gradient box with a 2px blue frame, a black keyline, a blue bloom
  and a spinning 3D "$0/MRR" cube.
- **Playbook buttons**: cream solid, sodium "hot" and blue "ghost". Hover lifts them 2px and adds an
  orange-tinted shadow.
- **Playbook cards and tiers**: hairline panels. Hover turns the border sodium and lifts the card
  3–4px. The main tier has a 2px sodium border and a pulsing glow.

## Motion

- Boot: the title card fades from blur(14px)/scale 1.06 to sharp over 1–1.6s. The garage
  background fades in over 1.2s.
- Pixel labels blink with stepped `steps(2)` animations. The tee photo floats 7px on a 3.4s cycle.
- The 3D scene (three.js) spins the character on drag, zooms from 1.0× to 2.4× and frames each tee.
- Playbook: elements reveal 24px upward over .7s at a 15% intersection. Stats count up over 1.2s
  with ease-out-cubic. The reel strip marquee takes 38s. The phone floats over 6s, the hero
  emphasis wobbles over 3.2s and the phone videos rotate every 6s.
- Both pages turn off all animation under `prefers-reduced-motion`.

## Accessibility

- Focus is always visible: a 2px sodium outline offset 3px.
- Touch targets were raised to 44px in the 2026-11-07 UI pass.
- Live regions announce the tee name, the status line and form errors.
- Dialogs use `role="dialog"` with `aria-modal`. Decorative layers are `aria-hidden`.
- Contrast: cream on night is about 15:1, fog on night about 7.6:1, and dim on night only
  about 4.3:1, so keep dim for short, non-essential text.

## Anti-patterns

- Do not round the game controls. The console look depends on square edges and chamfered panels.
- Do not use a soft blurred drop shadow under display type. It is always a hard black offset.
- Do not add a second accent colour. Sodium carries all emphasis, and green means success only.
- Do not set long body copy in Press Start 2P. It is for labels of a few words.
- Do not lighten the ground or add a light theme. The site is committed to a single night look.
