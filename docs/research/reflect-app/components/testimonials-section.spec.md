# Component spec: Testimonials section

**Target:** `src/clones/reflect-app/components/TestimonialsSection.astro`  
**Reference:** `original-section-testimonials.png`

## Overview

A human proof section that offsets the highly technical product stories. The source uses a dense but calm wall of quotes rather than a rotating carousel.

## DOM structure

- Section heading and supporting lead-in.
- Repeated testimonial articles containing quote, name, and social / role metadata.

## Styling contract

- Use a two-column desktop flow with modestly different card heights for a conversational, editorial rhythm.
- Cards retain the page’s near-black background, faint rules, roughly 20–24 px rounded corners, and muted purple depth.
- Quote text is bright and comfortably line-spaced; identity metadata is smaller and subdued.

## States and responsive behavior

- Quotes are static. No autoplay, pagination, drag, or timed state is introduced.
- Desktop card hover can lift colour contrast slightly but must not create a distracting card-grid feel.
- At phone width, stack in source order; cards should remain readable without truncation.
