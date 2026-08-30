# Reflect interaction and motion record

Source: <https://reflect.app/>  
Clone: `/reflect-app/`  
Replay checked: 2026-08-29

## Motion classification

**Tier: heavy.** The source combines large decorative canvases, star / orbit fields, a radar-like research display, animated product framing, and a game-like academy visual. The clone keeps the interaction-critical experiences functional and uses GPU-cheap CSS treatments for the non-essential visual motion.

## Behavior inventory

| Area | Source observation | Clone implementation | Verification |
| --- | --- | --- | --- |
| Header | Fixed, translucent 88 px navigation with blurred backdrop | Fixed header with the same anchor destinations, sign-in link, and CTA | Visually checked at top and after scroll |
| Mobile navigation | Desktop navigation is compacted at narrow widths | Menu button toggles a labelled navigation drawer; state is mirrored in `aria-expanded` and `hidden` | At 390 px: `aria-expanded=true`, drawer display `grid` |
| Hero video | The preview is an obvious play affordance over product media | Button opens a native modal containing the locally scoped WebM, with close button, backdrop click, and Escape dismissal | Opened dialog; confirmed local video source; Escape closed dialog |
| AI demo | A prompt card changes from question to AI response when activated | Button toggles `is-active`, reveals answer/action row, and updates `aria-expanded` / `aria-hidden` | Click produced active stage, expanded button, visible 90 px answer |
| Anchor navigation | Header items scroll to page areas | `#ai`, `#integrations`, `#pricing`, and `#about` are preserved; secondary source destinations use safe external links | Static route inspection |
| Cosmic hero field | Continuous canvas-like orbit and star atmosphere | CSS orbits, twinkling stars, glow, and a static black-hole horizon | Decorative fallback; no essential task depends on it |
| Product-story diagrams | Animated / rendered research, connected-note, and academy graphics | Semantic cards with CSS graph, radar, calendar, integration, globe, and tile-board motifs | Decorative fallback; reading order intact |
| Hover states | Faint panels brighten and controls gain contrast | CTA, play button, prompt card, nav items, and pricing card receive low-distance colour / transform transitions | Keyboard and pointer-safe CSS states present |

## Accessibility contracts

- All working controls are native `button` or `a` elements with visible labels or explicit `aria-label` text.
- The mobile menu state is exposed through `aria-expanded`; the hidden drawer is removed from the rendered flow until opened.
- The video modal uses native `<dialog>`, so the platform handles focus containment and Escape dismissal. The custom dismissal handler pauses the video before closing.
- The AI card is a button, not a clickable non-semantic container. Its answer is marked hidden until the active state is selected.
- Decorative orbit, star, beam, graph, radar, globe, and tile visuals are `aria-hidden`; meaningful information remains in headings and body copy.
- `prefers-reduced-motion` is honored by the shared clone stylesheet, which suppresses non-essential animation and transition duration.

## Responsive replay

| Viewport | Check | Result |
| --- | --- | --- |
| 1440 × 900 | Full-page hierarchy, hero framing, fixed header, pricing and footer | Passed; capture at `qa/clone-1440.png` |
| 390 × 844 | Header drawer, type scale, one-column story flow, no horizontal overflow in the captured route | Passed; capture at `qa/clone-390.png` |
| 390 × 844 | Open mobile navigation | Passed; nav drawer became visible and labelled state updated |
| 1440 × 900 | Activate AI answer | Passed; response and action chips became visible |
| 1440 × 900 | Open and dismiss product video | Passed; local WebM modal opened and Escape dismissed it |

## Intentional fidelity trade-offs

The original’s bespoke canvas / WebGL-like scenery was not copied as a runtime dependency. Reimplementing it as a permanent animation would increase load and create a more fragile clone without changing what visitors can learn or do. The CSS substitutes preserve the visual hierarchy, colour language, depth, and responsive composition; the interactive product video, menu, anchor navigation, and AI demonstration remain real behaviors.

## Fidelity pass — 2026-08-30

Re-verified against a fresh live capture of `https://reflect.app/` at 1440px and
390px. Corrections made, each anchored to what the source actually renders:

| Area | Was | Now | Why |
| --- | --- | --- | --- |
| Hero product frame | `1198x1500` desktop, `340x1500` at 390px | `1198x749` / `340x213` | The shared reset lacked `img { height: auto }`, so the `height="1500"` attribute hint stayed in force and the screenshot rendered 2x (desktop) and 6.6x (mobile) too tall. Fixed in `src/styles/reset.css`, which repairs the same latent trap for every clone. |
| Favicon | 704x1320 mobile-app screenshot | real 36x36 icon + 180x180 apple-touch | Wrong build hash in the asset manifest. |
| Hero orbit field | 1440x720, 25% accent strokes | 1180x430, 11% strokes | The frame's chrome is ~12% opaque by design, so orbits at that z-index showed through it as hard rings across the app UI. |
| Black hole | Bordered dome (`border-radius: … 0 0`, `border-bottom: 0`) | Blurred bell + soft-edged void + one thin disc line | The source is an accretion disc seen edge-on with no hard edge except the line; an outlined dome reads as an archway. |
| AI prompt beam | Clipped trapezoid ending in two hard purple triangles, drawn behind the card | Masked shaft falling below the card | `clip-path` alone leaves hard corners; the card sat at the stage's bottom edge so a beam anchored there was occluded. |
| AI capability grid | Outer box border, uneven trailing row, placeholder glyphs | Interior dividers only, trailing pair centred, source line-art icons | Matches the source's divider-only matrix. |
| Closing CTA halo | Two glowing archways striking through the subtitle and button | Removed | The source CTA carries no decoration at all. |
| Academy tile board | Visible bordered board colliding with the controls row, piece clipped mid-block | Removed; controls row kept | The source's static state shows nothing there; the controls row is real. |
| Footer | Single 3-column row, 380px tall | Three bands split by rules, 757px tall | The source stacks brand+links / newsletter / legal. Source footer is 763px. |
| Footer social icons | `◌` and `𝕏` glyphs in bordered circles | Source Discord and Twitter SVGs, inline, `currentColor` | Real first-party artwork. |

### Verified after the pass

- Page height 13,394px vs the live original's 13,460px at 1440 (0.5%).
- Section offsets within +/-75px of `PAGE_TOPOLOGY.md` across the full 13k page.
- No horizontally distorted image on any clone route (rendered vs natural aspect
  ratio within 5%), confirming the shared-reset change caused no regression.
- No horizontal overflow at 390px.
- `npm run check` clean; design-system guard 100 (15 checks, 0 failing).

### Known remaining gaps

- **About-section globe.** The source renders a dotted world map on a canvas; the
  clone keeps the wireframe-sphere CSS fallback recorded in the table above. Not a
  regression — it is the documented substitution for canvas content — but it is
  the largest remaining visual difference.
- **Mobile page height** is 13,775px against the source's 14,368px (4.1%),
  concentrated in the stacked narrative modules.
- The hero bell is slightly less voluminous than the source's, whose glow carries
  wider horizontal wings along the disc plane.

### Note on the reference captures

`fullPage` captures of `reflect.app` come out 1504px wide at a 1440 viewport and
979px wide at 390, because the source's `body` overflows past the viewport and is
clipped by `html`. The captures are faithful; the overflow strip is simply not
visible to a visitor. The `qa/original-*.png` references are therefore cropped to
the contract width so both halves of each comparison share a scale.
