# Bridge & Human behavior evidence

## Motion triage

**Tier: Moderate.** The source is a Framer 72b52f5 page with desktop carousel
state changes, mobile native scroll snapping, autoplay looping video, and
small media galleries. No canvas, WebGL, GSAP, Lenis, Locomotive, or Lottie
signal was found.

## Desktop state machine

- **Trigger:** click the centred header left or right arrow at min-width 1024px.
- **State set:** seven stories, indexed zero through six.
- **Initial state:** Craft / Design That Connects.
- **Observed states:** Craft, Launch-ready Visual Identity, Usability-approved
  E-Commerce UI, User-converting Onboarding Flow, Research-based Digital
  Identity, Community-first WhatsApp UI Kit, We Don't Judge.
- **Progress:** dark rail widths observed as approximately 198, 396, 595, 793,
  991, 1189, and 1416px across a 1416px track.
- **Source transition:** Framer returns generic computed transition "all";
  browser observation shows an eased state replacement rather than a document
  navigation.
- **Clone implementation:** buttons set data-active-index and update one
  server-rendered story. CSS provides opacity plus a short translation using
  --motion-base and --ease-standard. It wraps from the last state to the first.

## Mobile scroll stories

- **Trigger:** native scroll inside the 100dvh story list below 810px.
- **Mechanism:** flex column list with overflow-y auto and
  scroll-snap-type: y mandatory. Each list item uses scroll-snap-align: center
  and scroll-snap-stop: always.
- **Initial presentation:** hero video spans from y=60 down into a white lower
  gradient. Header remains above the media. Text, copyright chip, CTA, and
  scroll cue sit in the lower 208px.
- **Project galleries:** states contain two media items and small previous/next
  controls. Initial previous buttons have opacity 0 and next buttons opacity 1.
- **Clone implementation:** native scroll-snap, local gallery buttons that
  switch an image index, and no third-party motion runtime.

## Header and hover observations

- Desktop date is dynamic current-date copy at x=12, y=24; wordmark is centred.
- Desktop header has no observed scroll-state change because stories are
  viewport-contained.
- The primary action has computed background rgb(17,17,17), transform none,
  box-shadow none, and border-radius 30px both before and 350ms after hover.
  Framer’s Liquid variation appears to use an internal masked layer rather
  than a flat CSS property change. The clone retains the flat action plus an
  accessible focus ring.

## Deliberate motion fallback

The source's opaque Framer spring/masked-liquid implementation is replaced by
one CSS opacity/translation transition. Its public video assets are reused
directly, preserving the major visual motion. Reduced-motion preferences turn
the carousel transition off.

## QA replay

- **Desktop:** the header Next control moved state zero to one and increased
  the rail from 14.2857% to 28.5714% of the track.
- **Mobile:** the first project's gallery advanced from local media index zero
  to one while keeping a single panel visible; the story list retained native
  scroll snapping.
