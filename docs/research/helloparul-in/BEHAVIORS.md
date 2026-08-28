# Hello Parul — Behaviors

## Motion tier: Moderate

The source is a lightweight client-rendered document, not a WebGL or canvas experience. It has a six-second entry splash, an infinite CSS marquee, a sticky navigation layer, in-app hash navigation, a photo carousel in the about view, and a playable tic-tac-toe board. No `canvas`, Three.js, Lottie, GSAP, Framer Motion, Lenis, Locomotive, or video was detected in `source.html` or the captured runtime.

The clone preserves the static home skeleton first, the marquee, familiar pointer states, smooth in-page work anchor, and an equivalent timed splash. Richer in-app views remain separate Astro routes so initial home content stays server-rendered.

## Entry splash

- **Trigger:** initial document load; source state begins with `splashVisible` true.
- **State A:** fixed, cream `#F2EEE3` page cover at `z-index:9999`; 120px `assets/splash-avatar.png`; Bricolage 800 `22px` name; Space Mono `13px` mutable caption; 220×6px progress track with red fill.
- **Timed transition:** red fill runs `splashProgress 6s linear forwards`. At completion, source changes the overlay through `transform .6s cubic-bezier(.6,0,.2,1)` and disables pointer events.
- **Captured resting state:** screenshots were delayed 8.2 seconds so the home page is unobstructed.
- **Clone approach:** ordinary inline script dismisses the server-rendered overlay after 6000ms; no hydration is required.

## Navigation

- **Desktop at 1440:** sticky nav at x=112, width 1216px, height 73px. It remains sticky on every scroll position; no shrunk or color-changed state exists.
- **Work:** changes scroll position to the `#work` section. The hero anchor has the same destination.
- **About:** source changes URL to `#/about`; the rendered h1 becomes `Hi, I'm Parul.`. This state was captured at `interaction-about-1440.png`.
- **Play:** source changes to `#/play`; its tic-tac-toe board is click-driven. This state was captured at `interaction-play-1440.png`.
- **Mobile at ≤760px:** desktop link group hides; the red availability badge stays in the header; a 56px fixed bottom nav becomes visible. The body reserves 80px at the bottom.

## Pointer and focus states

- **Nav buttons:** authored `style-hover` rule changes background to `rgba(24,21,16,.07)`; wordmark changes to `#FF3B1F`.
- **Hero primary CTA:** authored hover rule changes its background from `#FF3B1F` to `#181510`.
- **Case cards:** authored hover rule adds `0 10px 0 -4px #FF3B1F` shadow.
- **Footer primary action:** background changes from `#FF3B1F` to `#F2EEE3` and ink to `#181510`.
- **Footer secondary actions:** their 1.5px translucent cream border becomes solid `#F2EEE3`.
- **Headless note:** Playwright’s isolated Chromium reports `hover: none`; the resting properties and explicit source `style-hover` declarations are the authoritative evidence for the clone’s pointer rules.
- **Focus:** source leaves browser-native focus behavior intact. The clone adds a token-resolved visible focus ring without removing keyboard access.

## Marquee

- **Trigger:** automatic once home is visible.
- **Content:** duplicated 12-item skills sequence for seamless wrapping.
- **State:** full-bleed `#181510` band with 2px top and bottom rules, cream Bricolage 700 text, 30px desktop / 20px at ≤480px.
- **Transition:** `marquee 26s linear infinite`, translating from 0 to -50%.
- **Clone approach:** same native CSS keyframe; it is independent of application state.

## Selected-work cards

- **Trigger:** click anywhere on a card.
- **Destination states:** AI review summaries → Smytten detail; Bill Buster → Bill Buster detail; Combo Generator → Combo detail.
- **Transition:** source switches its in-app `route` state and scrolls to top; no observed card-exit animation.
- **Responsive change:** at ≤1024px, each grid becomes a one-column flow with the textual block before image. At ≤760px, descriptive paragraphs and impact-stat row have `display:none`.

## About carousel and play board

- **About carousel:** horizontal transform track of six local photos; 8px dot controls select each slide. The source advances every eight seconds and restarts that timer after a dot selection.
- **Tic-tac-toe:** click-driven 3×3 board, alternating marks, with a reset action. Static instructions and board remain server-rendered.

## Deferred or substituted effects

None. The source effects are small enough to reproduce with CSS and a progressive script. The in-app case-detail route uses normal Astro navigation in the clone rather than a client-side hash router; the visual content and destination semantics remain equivalent.
