# Marcos Arruda route topology

## Route map

| Clone route | Source route | Role |
| --- | --- | --- |
| `/marcos-arruda-com/` | `/` | Current home / selected work overview |
| `/marcos-arruda-com/home-1/` | `/home-1` | Historic home variant; shares the home component |
| `/marcos-arruda-com/about/` | `/about` | Biography and CV call to action |
| `/marcos-arruda-com/case1/` | `/case1` | Manifest long-form case study |
| `/marcos-arruda-com/case2/` | `/case2` | Vibrant Streets long-form case study |
| `/marcos-arruda-com/case3/` | `/case3` | Fit Points long-form case study |
| `/marcos-arruda-com/portfolio/` | `/portfolio` | Visual Design mosaic gallery |
| `/marcos-arruda-com/blank/` | `/blank` | Branding motion/gallery mosaic |
| `/marcos-arruda-com/blank-1/` | `/blank-1` | Historic Branding grid |
| `/marcos-arruda-com/portfolio/project-name-*` | dynamic sitemap pages | Data-driven historic portfolio detail template |

## Shared shell

1. **Header** — compact two-line logo at the upper left and three-line menu trigger at the upper right. Its black/white colour changes with its local surface.
2. **Menu dialog** — click-driven full-viewport overlay with Work, About, and Contact links; no scroll-driven state is required.
3. **Footer** — black contact block on home/about/branding routes. The case studies finish with a local next-project action instead.

## Home

1. Full-width portrait hero: image on the left/underlay, editorial description on the right at desktop and above the crop at mobile.
2. White navigation strip.
3. Manifest fashion video/project teaser.
4. Selected Projects records: Fit Points, Vibrant Streets, Employee Experience.
5. Black Projects & Collaborations proof block and compact logo rail.
6. Contact footer.

## About

1. Split black section: portrait left, long biography/right column, plus a CV action.
2. White interstitial with the Branding & Visual Design action.
3. Contact footer.

## Authored case studies

Each uses one data-driven `CaseStudyPage` but retains authored title, hero, project brief, research themes, statistic cards, and source media.

1. Hero image and centered title/subtitle with the overlay header.
2. Large white statement band.
3. Black/white information brief (case number, client, context, goals, solution, role, timeframe).
4. Alternating research narrative and evidence media.
5. Dark quantitative/statistic panel and a synthesis panel.
6. Solution/learning summary, selected media, then next-project link.

## Visual galleries and historic details

`GalleryPage` uses the neutral grey header and square tile/mosaic layout of the published `/portfolio`, `/blank`, and `/blank-1` routes. `DynamicProjectPage` reproduces the historic Wix detail layout—grey header, full-width lead image, date/title/client plus a reading column, a three-image strip, and previous/next controls—using the twelve sitemap names.

## Responsive contract

- **1440px:** 5vw page gutters; home/about use two columns; gallery is 3–4 columns; case briefs use a left index plus a right reading column.
- **768px:** most two-column regions remain two columns but typography and visual gaps reduce.
- **390px:** hero copy moves above/over the image, gallery becomes one/two columns, metadata stacks, and menu remains full screen. Master references are `original-1440.png`, `original-768.png`, and `original-390.png`.
