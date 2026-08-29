# Bridge & Human — Usage

## Read Order

1. Read source/evidence.md for the measured browser evidence and known
   Framer-specific fallbacks.
2. Import tokens.css once at the clone root.
3. Read DESIGN.md before composing a story frame.
4. Use components.html as the token-wired component fixture.
5. Use preview/colors.html, preview/typography.html, and preview/spacing.html
   as visual references.
6. Change source/tokens.source.json and re-emit for any token correction;
   derived files are not edited by hand.

## Design Highlights

- The page is an editorial seven-state carousel, not a long scrolling desktop
  landing page.
- White, #111, image/film, and space are the only visual ingredients.
- Geist is display-only; IBM Plex Sans is the interface voice; IBM Plex Mono
  identifies metadata.
- Desktop actions sit in the lower edge of the viewport; mobile action pills
  span the content width.
- The media radius is intentionally large at desktop and softens to a
  top-corner frame on phone.

## Do

- Use the display font only for the one dominant statement per story.
- Keep page insets at the emitted container gutter rather than inventing a
  centered max-width layout.
- Use black pills for conversion actions and white/translucent pills only on
  media.
- Preserve text labels in arrow controls and outbound links.
- Keep mobile stories at one viewport each with scroll-snap alignment.

## Avoid

- Do not add a brand color, tinted background, or card-grid treatment.
- Do not apply display typography to body, metadata, or buttons.
- Do not make the primary action square or use a hard border radius.
- Do not replace the desktop carousel with a vertically stacked page.
- Do not hand-edit tokens.css, design-tokens.json, tailwind-v4.css, manifest
  caches, or the component manifest.
