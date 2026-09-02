# CaseStudyPage specification

## Overview

- **Target file:** `src/clones/marcos-arruda-com/components/CaseStudyPage.astro`
- **Screenshots:** `case1-top-1440.png`, `case2-top-1440.png`, `case3-top-1440.png`, and the full 390px case captures
- **Interaction model:** static long-form reading with local next-project navigation

## DOM structure

`article.case-study` accepts a source data object and renders: visual hero with `SiteHeader`; statement band; numbered metadata/brief grid; alternating prose/research panels; media grid; statistics; solution/learning panel; `Next project` link.

## Computed styles

- Case1 visible title: Space Grotesk bold, `60px / 72px`, `letter-spacing: 2.4px`, centred across a 1296px desktop region (`case1-computed-desktop.json`).
- Hero subtitle: Space Grotesk medium, `19.9px`, centred in a 1008px region.
- First statement: Space Grotesk 700, `34px`, on a white reading band.
- Brief section heading: Space Grotesk bold, 31.7px; labels are semibold 24px / 31.2px with 1.44px tracking.
- Later dark-surface section headings are observed at 47px with `#e3e3e3` (`case1-computed-desktop.json`).
- Major screens are square, no shadow/radius, and use white/black alternating surfaces.

## States and behaviors

- **Static reading:** no click tabs or scroll-driven replacement content were observed.
- **Next project:** local link (`case1 → case3`, `case3 → case2`, `case2 → case1` in the published source).
- **Media:** semantic local images; no Wix lazy-load wrappers.

## Per-route content and assets

- **case1 / Manifest:** Area 52 – PVH Corp; hero `case1-hero.jpg`; research graphics `case1-research-{1,2,3}.png`.
- **case2 / Vibrant Streets:** Manchester City Council / Keep Manchester Tidy; hero `case2-hero.jpg`; field/research photos in `case2-*`.
- **case3 / Fit Points:** Manchester City Football Group; hero `case3-hero.jpg`; Fit Points UI and research images in `case3-*`.

## Text content

Route data holds target-verbatim case titles, subtitles, client names, summaries, research/brief headings, statistic labels, and the first representative body paragraphs. It includes `Context`, `Project goals`, `Solution`, `Team and my role`, and `Timeframe` for all three pages.

## Responsive behavior

- **1440px:** hero visual is full width and about 673px before the statement band; metadata is an index/reading split.
- **768px:** use a reduced but still editorial hero and two-column brief if viable.
- **390px:** reduce title to `clamp(2.35rem, 12vw, 3.75rem)`, stack metadata, retain 12px gutters and full-width media.
