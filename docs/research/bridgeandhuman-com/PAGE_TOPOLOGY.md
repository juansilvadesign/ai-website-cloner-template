# Bridge & Human page topology

## Run

- Source: https://www.bridgeandhuman.com/
- Slug: bridgeandhuman-com
- Build target: Astro
- Breakpoints observed in Framer hydration data:
  - desktop: min-width 1024px
  - tablet: 810px through 1023.98px
  - mobile: max-width 809.98px

## Desktop, top to bottom

1. **Utility header** — a 60px-tall, 12px-inset three-column rule. Date is
   left, brand icon/name is centered, and left/right arrow text controls are
   right-aligned. It is static at page top.
2. **Progress rail** — a 1px horizontal line beneath the header. Its dark
   segment is one seventh of the 1416px desktop track at initial state and
   lengthens as an arrow chooses the next story.
3. **Viewport story carousel** — exactly one of seven desktop stories is
   visible. Each has a white left editorial field, a large right media field,
   and lower-pinned action controls. The story content changes in response to
   header arrows; the page itself does not vertically advance through all
   stories.
4. **Lower control row** — primary dark action at lower left, © label at lower
   right of the text field, then one or two translucent media actions at the
   lower edge of the right visual.

## Tablet and mobile, top to bottom

1. **Blurred mobile header** — fixed 60px translucent white bar. It contains
   icon/name at the left and a quiet "Scroll" cue at the right.
2. **Vertical story scroller** — an internal, one-viewport-per-item list with
   native vertical scroll snapping. There are seven stories in this order:
   Craft, Create, E-Commerce UI, Onboarding Flow, Digital Identity, WhatsApp
   UI Kit, and closing CTA.
3. **Story media** — initial craft story is a full field video under a
   white-gradient lower mask. Project stories use a media gallery followed by
   compact centred content. Closing story ends with portfolio and contact
   calls-to-action.

## Shared relationships

- Desktop and mobile are alternate representations, never visible together.
- Header controls drive the desktop state only; mobile state is driven by
  scrolling. Individual mobile project media rows have local next/previous
  controls.
- All external calls-to-action preserve their source destinations.
