# SiteFooter specification

## Overview

- **Target file:** `src/clones/reworkd-ai/components/SiteFooter.astro`
- **Screenshot:** `docs/design-references/reworkd-ai/original-section-footer.png`
- **Interaction model:** static links with hover/focus styles

## DOM structure

- White footer inside a shared 1216px desktop content band.
- Left brand/address; right navigation, other, and social link columns.
- Bottom divider with copyright at left and service-status anchor at right.

## Computed styles

- Desktop footer starts y≈5686 and has 425px height; inner content begins x=112 and y=5742.
- Source link headings use 14px/20px Suisse; list links use matching compact rhythm with 8px-ish visual row spacing.
- Divider at y≈5974 is 1px `--border-soft`; legal row uses subdued small text.

## Text and links

- Address: “550 15th St San Francisco, CA 94103”.
- Navigation: Features, Customers, Pricing, Talk to us, We're hiring.
- Other: Docs, Blog, Privacy policy, Terms & Conditions.
- Social: LinkedIn, GitHub, X (formerly Twitter).
- “© Reworkd AI, Inc.” / “All services are operational”.

## States and behavior

- Links use a 200ms source-style color transition and maintain a visible blue focus ring.

## Responsive behavior

- **Desktop:** brand left; three columns right.
- **Tablet:** right columns compact while retaining labels.
- **Mobile:** address above Navigation / Other two-column pair, Social below, then final legal/status row splits without overflow.
