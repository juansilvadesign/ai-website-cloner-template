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
