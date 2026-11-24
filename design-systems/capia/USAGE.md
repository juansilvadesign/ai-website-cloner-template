# Using the Capiá design system

## Read Order

1. `DESIGN.md` explains the personality, palette roles and the four-color menu sequence.
2. `tokens.css` is the canonical variables. Never hand-edit it: change
   `source/tokens.source.json` and re-run the emitter.
3. `components.html` is a token-wired fixture showing buttons, bubbles, pills, seals and cards.
4. `preview/colors.html`, `preview/typography.html` and `preview/spacing.html` show the scales at a
   glance.
5. `source/evidence.md` records where each value came from and how confident it is.

## Design Highlights

- The palette is food: bread cream, charcoal, cheddar, tomato and mate. Each full-bleed section
  owns one of these fields, and the sections are joined by torn-paper edges.
- Two typefaces are used. Bricolage Grotesque Variable at weight 800 with a condensed width does
  the shouting. Mr Dafoe brush script does the "calma" whisper.
- Nothing is level. Every display element carries a small rotation, and buttons and pills use the
  hand-cut bread radius.
- Compositions are absolute-positioned scenes inside container-query canvases, so they scale as
  one picture rather than reflowing.

## Do

- Rotate display elements between -8° and +8°, varying the direction from item to item.
- Use `--radius-sm` (the bread radius) on buttons and pills, and the organic four-corner radii on
  bubbles.
- Put charcoal text on cheddar and cream text on tomato, mate and charcoal.
- Join color fields with the torn-edge mask strip.
- Reserve the script font for one short phrase per screen.

## Avoid

- Perfectly level grids and uniform 8px corner radii.
- Cheddar body text on the cream canvas.
- Setting body copy in the script font, or adding another typeface.
- Gradients, glassy cards or drop shadows on flat color fields. The only raised surface is the
  dropdown menu.
