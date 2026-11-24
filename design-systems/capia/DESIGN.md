# Capiá — Design System

Extracted 2026-11-24 from <https://capia-eta.vercel.app/> (a single-page site for a neighbourhood
burger bar in Curitiba). The source is one hand-authored Vite stylesheet and one vanilla script, so
almost every value below was read from source, not measured. Provenance: `source/evidence.md`.

## 1. Personality

Unhurried, local and hand-made. The copy repeats *na calma* ("no rush"). The visuals match it:
nothing sits exactly level. Headings, buttons, seals and photos are each rotated a few degrees. The
corners are cut like torn bread. The edges between sections are ragged paper tears. A capybara
mascot drawn in one continuous line shows up four times (standing, sitting, lying down, riding a
scooter). The page feels like a hand-pasted menu board, not a SaaS grid.

## 2. Color Roles

| Role | Name in source | Value | Token |
| --- | --- | --- | --- |
| Canvas | `pão` (bread) | `#f5eddf` | `--bg` |
| Lifted light surface | `branco` | `#fffaf1` | `--surface` |
| Ink + dark canvases | `carvão` (charcoal) | `#16130f` | `--fg` |
| Second charcoal | `carvão-2` | `#231e19` | `--fg-2`, `--surface-warm` |
| Brand accent | `cheddar` | `#f8b21b` | `--accent` (text on it: `--accent-on` = charcoal) |
| Secondary CTA / red | `tomate` | `#dc4126` | `--danger` |
| Green | `mate` (yerba-mate) | `#3f8040` | `--success` |
| Light red on charcoal | `tomate-claro` | `#ff6b4d` | clone-local extension |
| Light green on charcoal | `mate-claro` | `#93cf74` | clone-local extension |

The menu runs through four color fields in order: cheddar, then tomato, then mate, then charcoal.
Each field changes its own ink and pill tints. Cheddar, for example, uses charcoal ink with pills at
`#fffaf152`, and its active pill is charcoal with cream text. Charcoal inverts this: cream ink, and
the active pill turns cheddar. A watermark of the word "Capiá" in the script font sits behind each
menu stage, at opacity .4, .2, .17 and .06 for the four fields in turn.

## 3. Typography

- **Bricolage Grotesque Variable** (Google Fonts, OFL; self-hosted via Fontsource, 200–800 weight,
  75–100% width). Display lines are weight 800 with `"opsz" 96` and a condensed `"wdth"` (88 for
  the wordmark, 92 for headings, 94 for the marquee and footer). The tracking is `-0.03em`, or
  `-0.045em` for the wordmark. Body text uses `"opsz" 14` at 16px/1.5.
- **Mr Dafoe** (Google Fonts, OFL) is a brush script for the "calma" voice: the second hero line,
  the nickname tagline and the menu watermark. Weight 400 only.
- Scale: 12, 14, 16, 18 for text, then fluid display sizes. Those are `clamp(34px, 3.9vw, 56px)`,
  `clamp(44px, 5vw, 72px)`, `max(58px, 6.7cqw)` and `10.3vw` for the footer wordmark.
- Small labels use uppercase at weight 800 with `+.04em` to `+.08em` tracking: nav links,
  nickname bubbles and menu seals.

## 4. Spacing and Layout

- Many sections are **container-query canvases**: `container-type: inline-size` with a maximum
  width of 1920px. Children are placed absolutely in `cqw` and `%`, so the composition scales as one
  picture.
- The menu panels use a **design-pixel unit**, `--u = min(100vw/1440, 100svh/750)` (390 × 780 on
  phones). Every element in the stage is `calc(N * var(--u))`, which reproduces a 1440 × 750 frame
  at any size.
- The story section uses `--su = min(1px, 100vw/1280)` (`100vw/390` on phones).
- The containers are 1500px (header), 1220px (story) and 1290px (footer). The page margin is
  `clamp(20px, 4vw, 64px)`.
- There are three breakpoints. At **767px** the layout goes to mobile. At **899px** the header nav
  becomes a drawer. At **575px** the scroll-motion amplitudes are reduced (JS only).

## 5. Surfaces and Components

- **Torn edge** (`.rasgo`): a 1440 × 44 jagged SVG path used as a CSS `mask` on a `currentColor`
  strip, `clamp(17px, 2.4vw, 38px)` tall. It joins color fields without a straight line.
- **Buttons** use the bread radius (`pão-a/b/c`), 52px minimum height, weight 700, and a `›` arrow
  glyph. They come in charcoal, tomato and cream (hero) versions.
- **Speech bubbles** (nickname tags and menu seals) are uppercase pills with four-corner organic
  radii. A small clipped tail is drawn with `clip-path: polygon(...)`, and each bubble is rotated
  2–8°.
- **Seal** (`selo`): an SVG ring of text on a path, "feito na chapa · sem pressa · na calma ·",
  with the sitting capybara in the middle.
- **Menu pill** (`pilula`): a frosted tinted plate (`backdrop-filter: blur(5px)`), with a product
  thumbnail that overflows the plate on its left and a name and subline.
- **Story stickers** (`casa__selo`): bold two-line uppercase badges in each palette color.
- **River-stone photos**: images clipped by `clipPathUnits="objectBoundingBox"` paths. Each has a
  colored stone of the same shape behind it, offset and rotated.

## 6. States and Interaction

- Buttons lift `translateY(-3px)` on hover and press to `scale(.97)` on active. The arrow nudges
  `+3px`. The tomato button turns charcoal on hover, with cheddar text.
- Nav links get a cheddar underline that grows from the left with `scale 0→1` over 220ms on the
  `sai` curve. The dropdown opens on mouse hover and on click. It closes on Escape, on an outside
  pointer press or when focus leaves.
- Menu pills: hovering a pill that isn't selected strengthens its tint, and its thumbnail tilts
  `-3deg` and rises 4px. The active pill takes the field's `--ativo` color.
- The menu carousel is click and keyboard driven (arrow keys) and also responds to a 42px swipe.
  It loops infinitely with cloned pills when a field has more than 4 items, and always on phones.
- Focus is a 3px solid outline with a 3px offset, charcoal on light grounds and cheddar on dark
  ones (`--foco`).

## 7. Motion

- **Lenis** smooth scroll: `lerp .094`, wheel multiplier .96, anchors enabled.
- Scroll-linked transforms are written as CSS variables on one shared rAF loop. The nickname
  bubbles drift, the scooter capybara crosses the screen in a parabola, and the two marquee lines
  slide sideways together from different start offsets. The menu product rises and scales in, the
  side ingredients drift,
  and the story stickers and photos fade, rise and scale in a cascade.
- **Time-driven** motion: hero ingredients float on a CSS `@keyframes` loop (6.6–9.8s). Menu
  ingredients orbit on sine waves at 4.7–7.1s periods.
- Switching menu items is a Web Animations cross-fade: out over 145ms, ease-in, with a 12ms
  stagger. In over 440ms (scale 560ms) with a 32ms stagger on `cubic-bezier(.16,1,.3,1)`.
- The footer image trail follows the cursor with photo cards that live 3.8s, at most 22 at a time.
  On phones it becomes a tap-to-cycle card stack.
- `prefers-reduced-motion` adds `html.reduzido`, which disables Lenis, the scroll transforms and
  the animations.

## 8. Responsive Behavior

- **1440px:** the hero product sits on the right, there is a side dot rail for the menu, the story
  is a scattered collage, and the footer is a mural with a cursor trail.
- **768–899px:** the desktop compositions stay, and the header becomes a hamburger with a 420px
  right-hand drawer.
- **≤767px:** the hero is restacked, with the product at the bottom and the title at 112px. The
  menu stage switches to the 390 × 780 frame, its carousel is centered, and the dot rail is hidden.
  The story becomes a 2-column grid with the main photo full-width. The mural becomes a card stack,
  and the footer wordmark breaks onto two lines.

## 9. Accessibility

- `lang="pt-BR"` with a skip link to the menu. The menu carousel is a `role="tablist"`, the stages
  are `role="tabpanel"`, and an `aria-live` status reads out the selected item's ingredients.
- Decorative art is `aria-hidden`. Pills that are covered by a later sticky panel are made `inert`.
- Contrast: charcoal on cheddar is strong. Cream text on tomato (`#fffaf1` on `#dc4126`) is about
  4.2:1, so keep it to bold or large text. The pill sublines at 80% opacity on the tinted plate
  are the weakest pairing.
- Reduced motion is respected throughout.

## 10. Anti-Patterns

- Don't square things off. Straight, level, uniformly rounded boxes break the hand-made voice.
- Don't add a third typeface, or set body copy in the script font.
- Don't use cheddar for large body text on cream (the contrast is too low). Keep it to display
  text or charcoal grounds.
- Don't swap the torn edges for straight section borders or soft gradients.
- Don't animate on a timer what the source ties to scroll, or the reverse.
