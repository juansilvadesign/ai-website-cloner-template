# Spaceship Design System

## Personality

Spaceship is cinematic, direct, and technically assured. It combines editorial
portraiture, huge dark fields, and precise product controls so a domain platform
feels like an invitation to launch rather than a traditional hosting catalog.

## Color roles

The baseline is pure black, with dark charcoal cards layered above it. Electric
Spaceship blue is the conversion signal and the source of the hero’s ambient
light. White is reserved for the highest-priority copy, while secondary copy is
purposefully soft and cool. Photography can introduce teal, red, violet, or
amber only inside a contained visual surface.

## Typography

Use the local Spaceship Sans family for all page copy. Headlines are heavy,
tight, and allowed to feel oversized. The principal desktop hero is 72px / 74px;
the section scale recedes through 56px and 48px. Interface text stays compact
and calm, normally 14–16px at 500 or 700 weight.

## Layout and spacing

Content sits in a centered 1280px container with broad desktop gutters. The
page alternates immersive full-viewport moments with 120px-long form sections.
Product cards use 24px rounded corners, 32px gutters, and a strict hierarchy:
image or graphic first, then concise product language and a contained action.

## Components and states

The primary control is a dark pill with a bright-blue conversion button. Tab
switchers use a darker selected capsule inside a translucent blue holder. Cards
raise 4px and reveal their quiet action on hover. FAQ rows are sparse dividers
with a rotating chevron and an expanding answer region.

## Motion

The source uses a `cubic-bezier(0.55, 0, 0.35, 1)` cinematic curve. Most direct
control feedback occurs in 200–300ms. Long sections introduce movement through
sticky scroll scenes; the clone should preserve that visual progression without
making content inaccessible when JavaScript is unavailable.

## Accessibility

White text always sits on an effectively black/blue image treatment. Interactive
pills need visible keyboard focus, semantic buttons, and retained text labels
alongside icons. Hero photography is decorative; the explicit heading and
descriptive copy carry the information.

## Anti-patterns

Avoid generic gradient-only SaaS visuals, tiny all-caps headings, square white
cards, thin gray borders on the black hero, or pastel blue CTAs. Do not crowd
the hero: its power comes from one centered search task surrounded by empty
space and figures.
