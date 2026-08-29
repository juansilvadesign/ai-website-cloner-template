# Spaceship clone QA

Completed 2026-08-28 against the local Astro route at `http://localhost:4321/spaceship-com/`.

## Visual references

| View | Original evidence | Clone capture | Result |
| --- | --- | --- | --- |
| 1280 × 1280 desktop hero | [`original-1280-hero.png`](../../design-references/spaceship-com/original-1280-hero.png) | [`clone-1280-hero.png`](../../design-references/spaceship-com/qa/clone-1280-hero.png) | Pass — blue scene, dark header, typography, picker, search geometry, offer chips, media silhouettes, and builder card align to the renderer capture. |
| Side-by-side desktop hero | n/a | [`comparison-1280-hero.png`](../../design-references/spaceship-com/qa/comparison-1280-hero.png) | Pass — source on the left, clone on the right. Small intentional differences: reconstructed wordmark glyph and simplified utility icons. |
| 1440 × 900 desktop | Source CSS + asset evidence; direct browser origin was Cloudflare-blocked | [`clone-1440-hero.png`](../../design-references/spaceship-com/qa/clone-1440-hero.png) | Pass — navigation and hero remain unclipped; layered figures stay behind usable controls. |
| 390 × 844 phone | Source responsive CSS/assets plus rendered page evidence | [`clone-390-hero.png`](../../design-references/spaceship-com/qa/clone-390-hero.png) | Pass — compact navigation, two-line title, stacked search actions, offer chips, and builder card fit without horizontal overflow. |

## Interaction checks

- **Register / Transfer:** passed. The active state, `aria-pressed`, search placeholder, and blue/teal scene mode update together.
- **Beast Mode:** passed. The control toggles its pressed state and visible accent treatment.
- **Mobile menu:** passed at 390px. It opens, sets `aria-expanded=true`, locks the body scroll, and closes correctly.
- **Launchpad:** passed. `Ctrl+K` opens the local command palette, focuses its search input, and the close button restores the page state.
- **Unbox steps:** passed. Selecting Connect changes the live explanatory copy and tab state.
- **FAQ:** passed. Selecting a second question closes the first and updates both `aria-expanded` values.
- **Console:** no browser errors reported on the local route.

## Known source limitation

The direct Playwright request to `https://www.spaceship.com/` returned a Cloudflare 403. Its scroll-only animated frames therefore could not be captured interactively. The retained rendered HTML/CSS, public CDN assets, renderer screenshot, and source-visible static states are the authority for this clone. The original long sticky sequences are represented by static-first, responsive scenes so no copy disappears when JavaScript or motion is unavailable.
