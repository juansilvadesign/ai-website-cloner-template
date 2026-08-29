# MobileCarousel Specification

## Overview

- Target file: src/clones/bridgeandhuman-com/components/MobileCarousel.astro
- Screenshot: docs/design-references/bridgeandhuman-com/original-390.png
- Interaction model: scroll-driven with click-driven local galleries

## DOM Structure

A 100dvh overflow-y auto ordered list holds seven full-height stories. The
first has a full video media field with lower gradient, then centered eyebrow,
statement, copyright chip, primary CTA, and scroll cue. Project stories use a
media area above centred project information and local next/previous buttons.

## Computed Styles

- Source list: display flex, flex-direction column, height 100%, overflow hidden
  auto, scroll-snap-type y mandatory.
- Source item: width 100%, height 100%, flex-shrink 0, scroll-snap-align
  center, scroll-snap-stop always.
- Phone content inset: 12px.
- Initial media: 390px wide, approximately 701px tall after top header; top
  corners are rounded at 30px and lower edge is masked to white.
- Initial mobile eyebrow: IBM Plex Sans 14px / 16.8px, 500, -0.4175px.
- Initial mobile title: Geist 32px / 35.2px, -0.4045px, centered.
- CTA: 366 by 56px, black fill, 30px radius; label is IBM Plex Sans 16px /
  19.2px at the initial slide.
- Metadata and project links: IBM Plex Mono 10px / 12px, uppercase.

## States & Behaviors

### Native story selection

- Trigger: internal list scroll / swipe.
- State A: current 100dvh story aligned to the scroll port.
- State B: next story snaps centrally into the scroll port.
- Transition: browser native scroll snap; no Framer runtime in clone.

### Local project gallery

- Trigger: Previous or Next button in a project story.
- State A: image index zero, previous control visually subdued.
- State B: image index one, next control becomes subdued.
- Transition: source uses Framer carousel; clone crossfades the two real media
  assets with --motion-fast / --ease-standard.

## Assets

The initial video is videos/hero-orchestra.mp4 with hero-orchestra-poster.png.
Project gallery assets, additional media, and the closing video all live under
public/clones/bridgeandhuman-com/images or videos.

## Text Content

We Craft; Design That Connects.; © 2026; Schedule A Call; SCROLL TO SEE OUR
WORKS. Project and closing copy is supplied verbatim from data/stories.ts.

## Responsive Behavior

- 390px: full-width media, 12px content insets, one story per viewport.
- 768px: identical mobile presentation with media scaled to the available
  width and header unchanged.
- 810px and above: the mobile scroller is replaced by DesktopCarousel.
