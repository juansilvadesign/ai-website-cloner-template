# DesktopCarousel Specification

## Overview

- Target file: src/clones/bridgeandhuman-com/components/DesktopCarousel.astro
- Screenshot: docs/design-references/bridgeandhuman-com/original-1440.png
- Interaction model: click-driven

## DOM Structure

One viewport-sized desktop story is server-rendered for every one of seven
records, with all inactive records hidden by the active index. Each story has
a left text field, a right media frame, a dark lower-left primary external
action, copyright label, and one or two light media actions.

## Computed Styles

- Desktop frame: 1440 by 1000 reference viewport; outer horizontal inset 12px.
- Initial eyebrow: IBM Plex Sans 18px / 21.6px, 500, -0.4175px tracking at
  x=12 y=125.
- Initial display: Geist 87.8265px / 87.8265px, 400, -2.61792px tracking.
- Initial supporting paragraph: IBM Plex Sans 12px / 14.4px, width 425px at
  x=12 y=386.
- Primary action: x=12 y=916, 241 by 72px, 24px 40px padding, black fill,
  30px radius, white IBM Plex Sans 18px / 21.6px label.
- Media actions: 332 by 72px, 30px radius, white text, layered over media.
- Initial hero media source: videos/hero-orchestra.mp4, rendered in a large
  rounded right-hand crop.

## States & Behaviors

### Story changes

- Trigger: PageHeader Previous/Next controls.
- State data: seven records in data/stories.ts, including title, eyebrow,
  metadata, media, CTA labels, and real outbound hrefs.
- State A / B: inactive story has opacity 0 and non-interactive pointer state;
  active story has opacity 1.
- Transition: source Framer crossfade/spring; Astro replacement uses
  transform plus opacity for --motion-base and --ease-standard.

### Hover states

Primary action's flat computed background and transform did not change during a
350ms source hover. Keep the action flat, add focus-visible ring, and lightly
adjust only the derived accent hover color.

## Assets

All seven media source files, posters, support images, and external links are
recorded in data/stories.ts and downloaded into public/clones/bridgeandhuman-com.

## Text Content

Initial: We Craft; Design That Connects.; descriptive paragraph; Start A
Conversation; Download Portfolio; Our Sales Deck. Subsequent content is the
verbatim story record data.

## Responsive Behavior

Displayed only at min-width 1024px. It is replaced, not stacked, by the mobile
story scroller below that breakpoint.
