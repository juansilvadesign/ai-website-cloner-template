# CaseStudy Specification

## Overview

- **Target file:** `src/clones/helloparul-in/components/CaseStudy.astro`
- **Reference:** `source.html:486-782`; `interaction-smytten-1440.png`
- **Interaction model:** static Astro case-study routes with ordinary next-case links

## Structure and content

Each case route has a centered `1080px` editorial detail column: client/topic pills, case kicker, display title, subtitle, four-column metadata, impact metrics, a local asset cover, narrative sections, evidence images or screen sequences, and a next-case card. Content is clone-local data for Smytten review summaries, Bill Buster, and Combo Generator.

## Visual contract

- Detail header begins 48px below the sticky navigation.
- Title: Bricolage 800, `clamp(34px,5.6vw,72px)`, `1` line height.
- Metadata: four columns with 1px ink rules; two columns at ≤760px.
- Metrics: Bricolage 800 46px with source red / blue / ink tones.
- Sections: 46px rhythm, Bricolage 800 section headings, 18px / 1.62 body copy, 18px rounded local screenshots.
- Screen sequences use a ruled 28px top inset and Space Mono captions.

## Behavior

All assets are served from `/clones/helloparul-in/`. The next-case action stays inside the clone namespace, and the home/header/mobile actions continue to work from detail routes.
