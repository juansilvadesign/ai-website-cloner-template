# SiteHeader specification

## Overview

- **Target file:** `src/clones/reworkd-ai/components/SiteHeader.astro`
- **Screenshot:** `docs/design-references/reworkd-ai/original-1440.png`
- **Interaction model:** scroll-driven and click-driven at mobile width

## DOM structure

- Fixed announcement `aside` with migration copy and a mail anchor.
- Fixed `header` beneath it: brand anchor, desktop `nav`, sign-up anchor, mobile menu button, and server-rendered drawer.

## Computed styles

- Announcement: `position: fixed`, `top: 0`, z-index 100, black background, desktop one-line content; 390px `padding: 20px 16px`, 100px height.
- Header outer container: fixed at `top: 64px`, z-index 50, 1344px desktop outer width / 16px mobile insets, `transition: transform 1s cubic-bezier(.6,.6,0,1)`.
- Desktop header surface: 52px high; source logo at x=112 and sign-up at x=1247 at 1440px; nav group centered at x=540.
- Nav/body: Suisse Intl 14px / 20px, `#272c30`; compact sign-up button has 6px radius.

## States and behaviors

- **Scroll shift:** source transform moves 8px → 24px after scrolling; clone applies `is-scrolled` from a passive scroll listener.
- **Mobile menu:** source exposes an unlabeled 48×36 trigger at 390px; clone labels it “Open navigation,” toggles `aria-expanded`, and shows the server-rendered link list.
- **Hover:** links shift to a darker foreground; 200ms source-style color transition.

## Text and links

- Notice: “We’ll be sunsetting the product on February 6, 2025. If you have any questions or need support with migration, please reach out to Srijan@reworkd.ai →”
- Desktop: Features, Pricing, Blog, Docs, Careers 3, Sign Up.
- Targets: `/#about`, `/pricing`, `/blog`, `/docs/welcome-to-reworkd`, Y Combinator jobs, and `https://app.reworkd.ai/`.

## Responsive behavior

- **Desktop:** full nav row.
- **Tablet:** compact width with nav retained until the source’s `lg` boundary.
- **Mobile:** brand and menu button only; drawer uses one 36px row per source destination.
