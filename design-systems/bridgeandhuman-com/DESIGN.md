# Bridge & Human Design System

## Personality

Bridge & Human is spare, editorial, and quietly confident. It presents a
design-strategy practice as a sequence of art-directed stories rather than a
conventional agency homepage. The system makes large areas of white space feel
intentional, then lets one high-contrast image or film carry each story.

## Color roles

The visual language is materially monochrome: white is the continuous canvas,
near-black is both type and conversion surface, and translucency is used only
to soften utility labels and image actions. Do not introduce a brand hue. A
muted tier should remain almost black rather than becoming conventional gray.

## Typography

Geist carries the expressive, ultra-large statements. IBM Plex Sans handles
everything human and functional: section verbs, descriptions, buttons, and
the wordmark. IBM Plex Mono is reserved for dates, delivery labels, copyright,
and compact instructional text. Display tracking is tight and headings are
normally set at a one-to-one line height.

## Spacing and layout

At desktop the composition has a 12px perimeter, a 60px utility header, and a
single full-viewport story. The story divides into a generous editorial text
column and a large cropped media frame. On screens below 810px it becomes a
vertical, full-viewport scroll-snap sequence: media fills the upper field and
the story metadata closes the frame.

## Components and states

The system has four defining components: the rule-like header, a segmented
progress rail, black pill actions, and oversized rounded media surfaces. The
desktop header arrows switch the active story and lengthen the dark progress
fill. On mobile, story movement is driven by native vertical scrolling and
scroll snapping; inner project galleries use compact previous/next controls.

## Motion

The original is Framer-driven. Its meaningful interaction is the carousel
change, which reads as a spring-like crossfade/slide; small controls otherwise
remain visually still. The Astro reconstruction keeps that hierarchy with a
single CSS transform/opacity transition for desktop state changes and native
scroll snapping on phone. Respect reduced-motion preferences by disabling the
transition.

## Accessibility

Every visual action retains a text label, semantic links keep their outbound
destinations, and arrow controls are buttons with explicit labels. The original
media is artistic/decorative, so the story title and supplied text must carry
the page meaning. Keyboard focus uses a monochrome ring without changing the
system’s restraint.

## Anti-patterns

Avoid colored gradients, boxed dashboard cards, heavy shadows, oversized
navigation menus, generic sans-serif substitutions, or decorative badges.
Avoid crowding the desktop media with overlay text: utility actions belong at
the base of the image and the statement belongs in the white editorial field.
