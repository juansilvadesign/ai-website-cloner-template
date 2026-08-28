# AboutContent Specification

## Overview

- **Target file:** `src/clones/helloparul-in/components/AboutContent.astro`
- **Reference:** `source.html:344-485`; `interaction-about-1440.png`
- **Interaction model:** navigable profile page with dot-controlled local photo carousel

## Structure and content

The centered `1080px` detail column begins with an `About` mono label and a two-column introduction. The left column contains the `Hi, I’m Parul.` heading, two profile paragraphs, resume download, and email action. The right column contains a 3:4 six-image carousel with 8px dot controls. Experience, education, and skills follow as ruled editorial sections.

## Visual contract

- Detail content: 48px top padding, 90px bottom padding; 32px desktop / 22px mobile gutters.
- Intro grid: `1.3fr .7fr`, 56px gap; one column at ≤1024px.
- Display heading: Bricolage Grotesque 800, `clamp(38px,5.6vw,64px)`, with red italic full stop.
- Carousel: 340px max width, 3:4 crop, 22px radius, six 8px dots.
- Experience and education records: 2px ink top rule; labels use Space Mono.
- Skill chips: 9×16px padding, 8px radius, muted ink fill; red lift state on hover-capable pointers.

## Behavior

The carousel advances every eight seconds. Clicking a dot moves the track to that local photo with the source’s `.6s cubic-bezier(.4,0,.2,1)` transition, updates `aria-current`, and restarts the timer. Resume and email actions preserve the source destinations. On phone, the clone retains the source fixed bottom navigation with the About icon marked active.
