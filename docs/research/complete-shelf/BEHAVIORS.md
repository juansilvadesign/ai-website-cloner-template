# The Complete Shelf — Behaviors

## Motion Classification

**Heavy, intentionally reimplemented.** The product is a WebGL experience, so
the repository's normal heavy-motion fallback rule is overridden by the
approved brief. The static semantic catalog and unsupported-WebGL state remain
the fallback.

## Reference Behavior Inventory

### Loading

- Canvas opacity changes from `0` to `1` over `900ms` with
  `cubic-bezier(.22, 1, .36, 1)`.
- Loading overlay fades over `720ms` after a `120ms` delay.
- Three animated bars alternate vertically over `1250ms`.
- Loading progress is textual and must never leave an unexplained blank canvas.

### Shelf browsing

- **Drag/swipe:** horizontal Pointer Events update shelf intent; pointer capture
  prevents a stuck drag after leaving the canvas.
- **Wheel:** horizontal or vertical wheel deltas advance the same canonical
  browse position.
- **Arrow keys:** Left/Right change selection. Enter inspects.
- **Buttons:** previous and next resolve to the same selection command.
- **Markers:** all nineteen positions are direct-select buttons.
- **Snap:** released input resolves to the closest valid index with damped
  interpolation.
- **Boundaries:** previous is disabled at index 0 and next at index 18.
- The selected marker grows from 7px to 18px and becomes fully opaque in
  `220ms`.

### Browse overlay

- Caption title is editorial serif, `clamp(37px, 4.4vw, 72px)`, line-height
  `.9`, letter-spacing `-.045em`.
- Inspect action is uppercase sans, 10px, with a bottom rule and arrow that
  moves `2px, -2px` on hover in `220ms`.
- Entering inspection fades the caption over `420ms` and translates it left
  over `520ms`.
- Shelf arrows scale to `1.06` on hover in `260ms`.

### Inspection

- Inspect is triggered by the active book, the Inspect action, or Enter.
- Browse UI fades and stops accepting pointer input.
- Details change from `opacity: 0; transform: translateX(44px)` to visible over
  `420ms/620ms` with the editorial ease.
- Selected-book transforms are presentation-only; the imported canonical
  transform is not mutated.
- Orbit, pan, and zoom are active only after the focus handoff.
- Back button and Escape restore browse ownership.

### Responsive changes

- At `1020px`, the desktop details panel widens relative to the viewport and
  secondary copy is removed.
- At `760px`, details become a bottom sheet; browse caption becomes a
  full-width bottom gradient; arrows move to the lower corners; edition and
  input-hint copy are hidden.
- Coarse pointers use larger marker hit targets and retain a default canvas
  cursor.

### Reduced motion

- Transitions and animation durations collapse to approximately `1ms`.
- Shelf selection changes without inertial overshoot.
- Focus mode still changes clearly through layout, label, and panel state.

## Input Cancellation

- `pointercancel`, `lostpointercapture`, window blur, and visibility change
  terminate an active drag.
- Wheel default is prevented only while the pointer is over the full-viewport
  experience.
- OrbitControls are disabled before browse control is re-enabled.
- Repeated inspect/back commands during transition are ignored or coalesced.

## Loading and Error Ownership

- The first model or decoder failure is latched as the fatal loading result.
- Later progress callbacks cannot overwrite the error.
- Retry creates a fresh loading attempt.
- Unsupported WebGL exposes the complete semantic catalog and a clear message.

## Deliberate Differences

- The Mint Playground header and provider branding are excluded.
- Book geometry and abstract foil motifs are original Mint-generated assets.
- The catalog uses original fictional titles and copy.
- Browser runtime makes no MCP calls and contains no Mint asset IDs or handoff
  links.

