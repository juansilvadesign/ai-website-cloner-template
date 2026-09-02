# DynamicProjectPage specification

## Overview

- **Target file:** `src/clones/marcos-arruda-com/components/DynamicProjectPage.astro`
- **Screenshots:** `dynamic-detail-original-1440.png`, `dynamic-detail-original-390.png`
- **Interaction model:** static route data and local previous/next links

## DOM structure

Grey `SiteHeader`, large lead image, white two-column detail intro (year/title/client at left; reading text at right), three-image strip, then previous / all projects / next navigation.

## Computed styles

- Header is grey with black compact identity and white menu icon.
- Lead image starts beneath the header and spans full page width.
- At desktop the reading band has around 6vw outer insets and an evenly split title/content geometry (`dynamic-detail-original-1440.png`).
- Type is black Space Grotesk/Avenir with no card radius or shadow.

## States and behaviors

- The twelve `/portfolio/project-name-*` paths generate from a static list and preserve their source-visible title words.
- Previous/next links loop through the static list locally; the grid icon returns to `/marcos-arruda-com/portfolio/`.

## Assets and content

- Lead image: `images/dynamic-project-lead.jpg`.
- Image strip: `images/dynamic-project-{1,2,3}.jpg`.
- Source text is the published generic Wix dataset placeholder; it is retained as a historic route rather than invented replacement content.

## Responsive behavior

- **1440px:** split title/reading band and three equal media columns.
- **390px:** title, body, and media stack in source order; previous/all/next controls remain visible.
