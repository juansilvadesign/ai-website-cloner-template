# Marcos Arruda behavior inventory

## Motion tier

**Moderate.** The source is a Wix site with native image/video media, a full-screen menu dialog, link transitions, and one home cinemagraph. It has no visible canvas/WebGL or complex pinned timeline. The clone keeps the native video and implements only the menu/dialog and light hover states.

## Global menu

- **Interaction model:** click-driven.
- **Trigger:** click the visible three-stroke header button (root desktop evidence: snapshot ref `f30e127`).
- **Before:** current page is visible; compact header button is 34.5 × 25.1px in the home white strip (`root-header-inspection.json`).
- **After:** a dialog fills the viewport, its page backdrop becomes near-black with a faint hero image, and the centred display links read `WORK`, `ABOUT`, `CONTACT` (`menu-open-1440.png`). A yellow close X appears in the upper-right.
- **Close:** the `Back to site` control and Escape close the dialog; focus returns to the menu button in the clone.
- **Transition:** source exposes generic `transition: all`; clone uses `opacity/visibility 300ms ease-in-out` as an evidence-compatible progressive enhancement.

## Links and cards

- Footer text links have observed `0.2–0.3s ease-in-out` colour/visibility transitions (`root-computed-desktop.json`).
- `View Project` is a conventional local navigation link. The clone adds a short yellow colour/underline reveal on hover while preserving normal link behaviour on touch.
- Company logos and selected-work links navigate to their associated local case-study route.

## Home media

- The second home band uses a published native looping muted video (`root-inspection.json`).
- It is nonessential for content comprehension; the clone supplies the published poster as a normal image fallback if playback is unavailable.

## Responsive observations

- At 390px the hero copy begins at about 12px from the left edge and appears before the portrait crop (`original-390.png`).
- The home collaboration copy is centred on both desktop and phone; cards and project records stack on phone.
- The menu dialog remains full viewport at desktop and phone.

## Deliberate fallbacks

- The original Wix rendering contains unobservable editor/runtime animations and sparse layout gaps on legacy gallery pages. The clone preserves the final static compositions and media but does not import Wix runtime code.
- Case-study media blocks are semantic local images rather than Wix's deferred lazy-load wrappers.
