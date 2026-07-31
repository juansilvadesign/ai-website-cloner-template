# The Complete Shelf — Page Topology

**Source:** <https://play.mint.gg/_experiences/complete-shelf/index.html>  
**Captured:** 2026-07-31  
**Target route:** `/complete-shelf/`  
**Build target:** Astro with one vanilla Three.js client controller

## Viewport Shell

The experience is one full-viewport composition (`100dvh`) with no document
scroll. The DOM and WebGL layers share one isolated stacking context:

1. **Three.js canvas — z1**
   - Covers the viewport.
   - Owns the shelf, imported books, camera, lighting, shadows, picking, and
     focus transitions.
2. **Paper texture — z14**
   - A non-interactive CSS pseudo-element using two sparse radial-dot layers
     with multiply blending.
3. **Browse caption — z16**
   - Current position, short title, author, and Inspect action.
   - Fixed to the lower-left on desktop.
4. **Previous/next controls — z17**
   - Circular controls centered vertically on desktop.
5. **Availability/status — z18**
   - Small upper-left live status with a green readiness dot.
6. **Catalog position index — z19**
   - Nineteen ticks connected by a hairline.
   - Input hint shares the row on desktop.
7. **Wordmark and edition mark — z20**
   - Upper-left title/divider/subtitle.
   - Upper-right volume and shelf count.
8. **Inspection details — z22**
   - Right-side editorial details panel on desktop.
   - Bottom sheet on narrow screens.
9. **Loading screen — z40**
   - Opaque paper-colored layer with animated book bars and progress copy.
10. **Accessible catalog**
    - Server-rendered markers, labels, and book metadata.
    - Live selection announcement and HTML fallback remain available without
      relying on canvas pixels.

## Application States

### Loading

- Canvas exists but remains transparent.
- Loading overlay owns the visible viewport.
- Status reports generated-model progress and latches the first fatal error.

### Browsing

- One catalog index is authoritative.
- Shelf presentation translates horizontally until the selected book aligns
  with the camera's design target.
- Current caption, marker, arrow disabled state, hover state, and live
  announcement project from that index.

### Transitioning

- Browse input is temporarily constrained.
- The selected book's canonical wrapper remains unchanged; a presentation
  wrapper interpolates toward or away from the inspection pose.
- Camera ownership transfers between the shelf controller and OrbitControls.

### Inspecting

- Selected volume is pulled forward into a dedicated viewing zone.
- Desktop details slide in from the right; mobile details slide up from the
  bottom.
- Orbit, bounded pan, and zoom are enabled.
- Back or Escape reverses the transition and restores the prior shelf index.

## Responsive Topology

### Desktop — 1021px and wider

- Header spans the top.
- Browse caption occupies up to `min(430px, 36vw)` at lower-left.
- Details panel occupies up to `min(620px, 41vw)` on the right.
- Catalog index spans the lower viewport with input hints aligned right.

### Tablet — 761px to 1020px

- Details panel grows to at most `min(570px, 48vw)`.
- Secondary inspection hint and independent note are removed.
- Canvas remains the dominant surface.

### Mobile — 760px and narrower

- Edition mark and desktop input hint are hidden.
- Browse caption becomes a full-width lower gradient panel.
- Previous/next controls move to the lower corners.
- The catalog index sits between the arrows.
- Inspection details become a bottom sheet with a maximum height of
  `min(49dvh, 500px)`.
- The 3D subject stays in the upper half while detail copy scrolls independently.

## Ownership

- `ShelfApp`: application state, lifecycle, fatal error, resize, disposal.
- `ShelfScene`: renderer, scene, camera, animation frame, imported assets.
- `BrowseController`: drag/wheel/keys/buttons/marker intent and snap resolution.
- `InspectionController`: presentation transition and OrbitControls handoff.
- `ShelfExperience.astro`: semantic HTML, catalog data, and progressive
  enhancement boundary.

