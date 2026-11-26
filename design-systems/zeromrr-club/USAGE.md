# Using the $0 MRR Club design system

## Read Order

1. `DESIGN.md` covers the personality, the colour roles and the console-UI component rules.
2. `tokens.css` holds the canonical variables. Never hand-edit it: change
   `source/tokens.source.json` and re-run the emitter.
3. `components.html` is a token-wired fixture showing menu items, buttons, chips, meters, panels,
   badges and inputs.
4. `preview/colors.html`, `preview/typography.html` and `preview/spacing.html` show the scales at a
   glance.
5. `source/evidence.md` records where each value came from and how confident it is.

## Design Highlights

- It is a game UI, not a web page. A night-blue ground, a sodium-orange accent and HUD green
  give the look of a PS2-era menu screen.
- There are three typefaces, each with one job. Anton shouts the headlines, Press Start 2P labels
  every control, and Chakra Petch (Inter on editorial pages) carries the reading text.
- Display type always gets a hard black offset shadow. Panels are square with chamfered corners
  and hairline borders.

## Do

- Put the `$0` (or any one emphasised word) in sodium and everything else in cream ink.
- Use `.px` pixel labels for UI chrome: buttons, tags, stats, hints.
- Keep controls square, 44px tall at minimum, with a hairline `--border-soft` frame.
- Use HUD green only for success, progress and checkmarks.
- Honour `prefers-reduced-motion` and switch every blink and float off.

## Avoid

- Rounded pill buttons, glassmorphism cards or soft drop shadows.
- A light theme.
- Long paragraphs in the pixel font.
- Mixing extra accent hues into the sodium and green pair.
