# Hello Parul — Page Topology

## Run record

- **Source:** `https://helloparul.in/`
- **Resolved slug:** `helloparul-in`
- **Inspected:** 2026-08-27
- **Browser:** Playwright MCP using the workspace configuration and Chromium headless
- **Device scale:** 1
- **Master viewports:** 1440×1000, 768px inspected from authored breakpoints, 390×844
- **Resting-state capture:** after the source splash sequence completed (8.2 seconds)
- **Consent/authentication state:** none
- **Durable evidence:** `source.html`, `source-headers.txt`, Playwright snapshots in `docs/design-references/helloparul-in/`, and the original PNG captures.

## Overall layout

The home route is an editorial product-designer portfolio on a warm cream page canvas. A `1280px` centered shell uses `32px` desktop gutters and a sticky, translucent 73px navigation bar. The hero is followed by a full-bleed dark marquee, a second centered shell with a four-cell metric board and a selected-work section, and a full-bleed dark contact footer.

At the inspected 1440px width, the centered shell measures `1216px` (`1440 - 64`). The home document is `3569px` tall. At 390px, gutters become `22px`, the nav’s desktop links disappear, a 56px fixed bottom bar appears, metrics form a 2×2 board, and each case study becomes a text block over a full-width image. The mobile document is `3558px` tall.

## Visual order and interaction ownership

1. **Splash overlay** — fixed cream layer with avatar, a rotating status caption, and six-second progress bar. Time-driven; removed after entry.
2. **Sticky site navigation** — wordmark, desktop navigation / mobile availability badge. Work scrolls to the work section; about and play move to their own in-app states.
3. **Hero** — large display statement, yellow hand-drawn underline behind “friction”, descriptive mono line, primary work anchor. Static except hover state.
4. **Skills marquee** — full-bleed dark, infinitely translating duplicated skills line. Time-driven CSS animation.
5. **Stats board** — four evidence cells on desktop, 2×2 at phone width. Static.
6. **Selected work** — heading plus three clickable alternating image/text case cards. Each opens an in-app case-study view. Cards gain a red offset shadow on hover-capable pointers.
7. **Contact footer** — full-bleed dark close with four destination actions. Standard external navigation/download behavior.
8. **Mobile bottom navigation** — fixed four-icon bar shown only at ≤760px. Its destination state, not its appearance, marks the active item.

## In-app views reached from the home route

- **About** (`#/about` upstream): profile introduction, six-image photo carousel, experience, education, and skills. Captured at `interaction-about-1440.png` (2108px tall).
- **Play** (`#/play` upstream): a styled tic-tac-toe board with reset control. Captured at `interaction-play-1440.png` (1073px tall).
- **Smytten case study** (`#/case/smytten` upstream): detail view with metadata, sectioned narrative, a horizontal next-case continuation, and screenshots. Captured at `interaction-smytten-1440.png` (9147px tall).

The requested URL resolves to home. The Astro clone’s primary acceptance surface is the home route; the linked routes are retained as navigable structural extensions rather than embedding a client-rendered multi-view application into the initial page.

## Layering and dependencies

- The yellow underline is a child absolutely positioned behind the final hero word (`z-index: -1` in the target’s local stacking context).
- The nav is the only sticky desktop layer (`top: 0`, `z-index: 50`) and uses `rgba(242,238,227,.82)` plus a 10px backdrop blur.
- The splash is a fixed layer at `z-index: 9999`; mobile navigation is fixed at `z-index: 70`.
- Case cards crop local screenshots with `object-fit: cover`; source assets are not composited from generated placeholders.
- The exact type system is Bricolage Grotesque for display and Instrument Sans for body copy, with Space Mono used for labels, metadata, buttons, and the marquee’s compact technical voice.

## Responsive behavior

- **1440px:** 1216px centered shells; three case cards use 1.15fr/.85fr or reversed grids; 4-column stats; desktop nav actions visible.
- **768px:** case grids switch to one column at ≤1024px; image follows text regardless of desktop alternation; about view becomes one column.
- **390px:** 22px shell gutter; hero top padding is 48px; display uses `clamp(54px,13.5vw,118px)` and a max width of 11ch; stats become 2 columns; card descriptive paragraphs and impact row are hidden; desktop nav links are hidden; mobile bottom navigation appears.

## Assembly blueprint

`src/pages/helloparul-in/index.astro` composes `SiteHeader`, `HeroSection`, `SkillsMarquee`, `StatsBoard`, `SelectedWork`, `ContactFooter`, and `MobileNavigation` inside the clone’s `BaseLayout`. The home page is semantic and static-first. A lightweight inline script only owns the timed splash dismissal and works alongside ordinary anchors; no framework island is needed.
