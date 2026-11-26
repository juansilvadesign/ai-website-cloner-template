# Page topology — zeromrr-club

Two routes, one brand. Inspected 2026-11-26 (Playwright Chromium, DPR 1).

## `/zeromrr-club/` ← https://zeromrr.club/  (fixed single-screen game, no page scroll)

| z | Layer | Component | Model |
|---|---|---|---|
| 0 | `#bg` garage photo (fades in on `body.garage`) | `home/Stage.astro` | time (boot) |
| 1 | `#cv` three.js canvas: character sprite, ring, dust | `home/Stage.astro` | drag-to-spin, zoom |
| 3–5 | `#zi` crisp tee photo, `#ti` tee-only overlay, `.fx` scanlines + vignette | `home/Stage.astro` | state |
| 6 | `.zc` zoom control, `.mtools` (phone) | `home/Stage.astro` | click |
| 7 | `.title` title card (blooms after START) | `home/TitleCard.astro` | time |
| 8 | `.boot` boot screen (Press start, skip to shop, legal) | `home/Boot.astro` | click / any key |
| 6 | `.ui` shell grid: HUD header · menu/options lists (left) · `.sel` tee panel (right; bottom sheet ≤760px) · hints footer | `home/Shell.astro` | keyboard + click |
| 9 | `.mc` memory-card signup dialog | `home/MemoryCard.astro` | click |
| 9 | `.insp` photo inspector dialog | `home/Inspector.astro` | click |
| top | `#zm-lang` EN/UA switch (injected by i18n.js) | `public/.../js/i18n.js` | click |

All content beyond the static shell (menu items, tee names, dl rows, sizes, offer, CTA text, size chart) is rendered by `game.js` from `tees.js`.

## `/zeromrr-club/playbook/` ← https://playbook.zeromrr.club/playbook  (scrolling, `.wrap` 1080px)

Hero (top bar + h1 + phone with 3 rotating videos) → Proof (4 count-up stats + reel marquee) → Problem (2×2 cards) → Method (3 steps) → Inside (8 numbered parts) → Outcomes (checklist + anchor) → Pricing (3 tiers, waitlist form, comparison table, 14-day guarantee) → Needs → FAQ (`<details>`) → LeadMagnet (email form) → Final CTA → Footer. One breakpoint at 860px (all grids → 1 column).
