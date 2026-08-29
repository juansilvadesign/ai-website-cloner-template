# Bridge & Human extraction evidence

## Run record

- Source: https://www.bridgeandhuman.com/
- Extracted: 2026-08-29
- Browser: Playwright MCP, device scale factor 1
- Reference captures: desktop 1440 x 1000, tablet 768 x 960, phone 390 x 844
- Runtime: Framer 72b52f5, with Framer carousel components and native media

## Measured visual facts

- The desktop canvas is white and near-black text resolves to rgb(17, 17, 17).
- The desktop perimeter is 12px. The header height is 60px, and the first
  progress segment measures 198px of a 1416px line.
- Primary desktop buttons are 72px tall, use a 30px radius, 24px 40px padding,
  #111 background, and 18px / 21.6px IBM Plex Sans Medium white label text.
- The initial desktop display statement is Geist 87.8265px / 87.8265px with
  -2.61792px letter spacing. Its mobile analogue is 32px / 35.2px.
- Metadata labels use IBM Plex Mono 10px / 12px on mobile and 12px / 14.4px
  in the desktop header/footer.

## Asset provenance

Public Framer CDN media, Google Fonts WOFF2 files, favicons, and social image
are listed in scripts/download-assets.mjs under the bridgeandhuman-com profile.
Files are downloaded into public/clones/bridgeandhuman-com so the Astro clone
does not depend on a remote image for its normal rendering.

## Behavior provenance

- Desktop has seven states. Header arrows advance or reverse the active state,
  and the dark progress rail advances by one seventh per state.
- At max-width 809.98px, Framer switches to the mobile presentation: seven
  full-height vertical scroll-snap stories, a blurred 60px header, and
  local two-item project galleries.
- The source uses several Framer/React spring transitions. The clone replaces
  that irreducible runtime with a 500ms opacity/translation transition and
  documents it in BEHAVIORS.md.

## Confidence

Color, type, outer geometry, primary action geometry, breakpoints, destination
links, and media URLs are high-confidence browser measurements. Motion timing,
elevation, semantic colors, and non-primary secondary surface values are
derived because the Framer runtime exposes generic transition values rather
than stable CSS duration tokens.
