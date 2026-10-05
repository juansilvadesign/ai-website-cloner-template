Adapted from JCodesMore/ai-website-cloner-template v0.6.1 (MIT).

# Framer and Motion

Read this when Framer generates the source or motion affects a sticky scene,
reveal, or media element. Extract behavior into the clone's component specs and
`BEHAVIORS.md`; keep OpenDesign tokens as the styling source.

## Inspect Framer output

- At each viewport, inspect the visible variant. Framer may render duplicate
  desktop/mobile trees and hide one with breakpoint classes. Use
  `data-framer-name` to identify sections; generated classes are evidence,
  not the clone's component structure.
- Wait for hydration and entrance motion before measuring resting layout.
  Scroll through offscreen sections to trigger lazy media and reveals; capture
  initial and revealed positions when movement matters.
- Record `currentSrc`, rendered size, and crop. Framer CDN URLs can serve AVIF
  despite a PNG filename. Check content type and image dimensions before
  saving the asset under its actual format.
- Check each font file's real weight and style before writing `@font-face`.
  A static medium file declared as a variable family changes every text width.
  Standalone inline SVG exports need their namespace and referenced
  gradients, masks, symbols, and filters; verify the local `<img>` URL renders.
- Inspect animated SVG ancestor selectors, shared symbols, fonts, and
  stylesheet keyframes. Preserve required definitions and watch one full
  cycle; a few objects pulsing together do not reproduce a sequence.
- Visit supplied CMS routes and exercise each filter. Record the full grid
  states and card destinations, not only the first visible list.

## Match the motion driver

| Driver | Observe | Astro default | Retained Next.js equivalent |
| --- | --- | --- | --- |
| Time | cycle, delay, direction, pause, media loop | CSS keyframes or source video; vanilla script for timed state | CSS/video or a client component for state |
| Scroll reveal | entry boundary, before/after, reverse replay | `IntersectionObserver` plus scoped CSS | observer in a client component plus CSS |
| Continuous scroll | progress, pin distance, layer speeds, release | CSS scroll timeline when suitable, or vanilla script driving CSS variables; an island only when needed | CSS variables driven by a client component |
| Click/hover | alternate content, transition, dismissal | CSS for hover; standard `<script>` for small state, an island for genuine framework state | CSS or a client component |
| Pointer/canvas | pointer response, renderer, source media | reuse source media; otherwise a scoped vanilla script or isolated island, with a documented fallback for irreducible effects | client component or documented media fallback |

For a pinned scene, measure the scroll distance it occupies and where it
releases; `position: sticky` alone does not reproduce the sequence. Test both
scroll directions and mobile input. Record duration and easing when measurable.

Look for a `.lenis` class on `html` or a `window.lenis` global. If present,
inspect its live options and compare wheel, touch, and keyboard scrolling;
programmatic scrolling can skip the handlers. Keep animation loops tied to
the component lifecycle so leaving the page stops them.

## Verify the experience

- Compare initial, active, and settled frames at matching viewport, scroll
  position, and input state; watch a full cycle of repeating media.
- Exercise controls while motion is active, then navigate away and back to
  catch stuck reveal, scroll, or media states.
- Confirm motion does not widen the document or leave content hidden.
- Name any unimplemented shader or canvas effect in the spec,
  `BEHAVIORS.md`, and completion report instead of presenting a still as
  equivalent motion.
