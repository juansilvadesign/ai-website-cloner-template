# Using The Complete Shelf Design System

## Read Order

1. Read `DESIGN.md`.
2. Load `tokens.css`.
3. Inspect `components.html`.
4. Use the three previews for color, typography, and spacing.
5. Read `source/evidence.md` before changing a derived role.

## Design Highlights

- Cream paper is the canvas, not a card background.
- Editorial serif communicates catalog content; compact sans communicates
  controls and status.
- Hairlines, negative space, and carefully framed 3D objects replace ordinary
  card chrome.
- Terracotta is deliberately rare.
- The canvas and semantic HTML form one product surface.

## Do

- Use `var(--bg)`, `var(--fg)`, and the shared type roles for every overlay.
- Preserve the full-viewport composition.
- Keep labels small, uppercase, and tracked.
- Use the editorial ease for browse/focus transitions.
- Expand invisible hit areas on touch while retaining the delicate visual form.
- Keep imported asset materials intact.

## Avoid

- Hardcoded parallel color or spacing systems.
- Provider badges or links inside the runtime.
- Broad filled accent regions.
- Generic rounded cards and large drop shadows.
- Per-frame raycasting when pointer or scene state has not changed.
- Multiple render loops or competing camera controllers.

