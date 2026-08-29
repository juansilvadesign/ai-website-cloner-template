# PageHeader Specification

## Overview

- Target file: src/clones/bridgeandhuman-com/components/PageHeader.astro
- Screenshot: docs/design-references/bridgeandhuman-com/original-1440.png
- Interaction model: click-driven desktop / static mobile

## DOM Structure

Desktop is a three-column utility row: current date, logo/wordmark, previous
and next buttons. A separate one-pixel progress track follows it. Mobile has a
left logo cluster and a right Scroll cue over a translucent blurred surface.

## Computed Styles

- Desktop header rect: x=12, y=12, width=1416, height=32; outer band ends at y=60.
- Desktop date: IBM Plex Mono, 12px, 400, 12px line-height, rgb(17,17,17).
- Desktop wordmark: IBM Plex Sans, 16px, 500, 19.2px line-height,
  -0.615px letter spacing.
- Arrow text: IBM Plex Sans, 28px, 300, 28px line-height, -0.41px letter
  spacing. Each visual target is approximately 23 by 28px.
- Progress track: 1px tall, 1416px wide at 1440px viewport; dark active
  segment begins at 198px.
- Mobile header: y=12 to y=36 content, 60px high blurred translucent white
  surface. Scroll copy is IBM Plex Sans 14px at 0.45 opacity.

## States & Behaviors

### Desktop story navigation

- Trigger: click Previous or Next.
- State A: current index from 0 to 6.
- State B: active index wraps by one and progress grows to
  ((index + 1) / 7) of the track.
- Transition: source reports transition all; clone uses
  --motion-base / --ease-standard.

### Mobile

No header action. The Scroll cue is informational.

## Assets

BrandLogo component only.

## Text Content

Dynamic full current date; Bridge & Human; ←; →; Scroll.

## Responsive Behavior

- Desktop min-width 1024px: date and arrow controls visible.
- Tablet/mobile max-width 1023.98px: fixed blurred mobile header; desktop date,
  rail, and arrows are hidden.
