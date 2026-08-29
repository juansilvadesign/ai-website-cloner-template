# Spaceship interaction and motion inventory

The original page is heavily scroll-staged. This clone keeps controls functional while ensuring all essential copy remains visible without JavaScript.

| Surface | Observed behavior | Clone behavior |
| --- | --- | --- |
| Announcement CTA | Text link leads to the promoted `.ai` offer | Links to the offer region in this standalone clone |
| Header navigation | Desktop links and utility actions; compact menu at small widths | Responsive menu opens/closes with `aria-expanded`, outside click, and Escape support |
| Register / Transfer hero mode | Segmented picker changes the active domain-search mode and blue/teal scene | Functional two-state picker updates copy, pressed state, and hero image layer |
| Hero search | Search text field, Beast Mode toggle, and Search action | Form gives an accessible local search-ready response; Beast Mode visibly toggles its pressed state |
| Hero builder card | Source carries a product CTA over the lower hero | Links to the product section and preserves the layered visual card |
| Benefit stories | Original uses long sticky, cross-faded, scroll-driven scenes | Normal-flow, full-viewport scenes. A subtle opacity/scale entry is used only where motion is allowed; content is static-first |
| Product cards | Image and CTA lift/reveal on hover | Card lifts 4px and CTA gains a visible underline; keyboard focus follows the same treatment |
| Unbox steps | Marketing explainer with sequential emphasis | Clickable step buttons update the active explanation without hiding other numbered steps |
| Alf media | Autoplaying product video | Muted looping local video with a play/pause control; native controls are avoided to match the source’s clean field |
| Launchpad | The source advertises Cmd/Ctrl+K to open its product launcher | Cmd/Ctrl+K opens a working, local command-palette mock; Escape closes it |
| Security scene | Long sticky blue visual as the user scrolls | Full, responsive blue editorial panel with source portrait and CTA |
| FAQ | Expanding rows with approximately 0.2s visual transition | Semantic button/region accordion; one item can be open at a time and it supports keyboard activation |
| Reviews | Source content is supplied dynamically by a third party | Static visual fallback cards labelled as representative interface content; no review API is implied |

## Motion tier

**Moderate / cinematic.** The source favors slow scroll staging, 200–300ms state changes, and `cubic-bezier(0.55, 0, 0.35, 1)`. The clone uses that curve for hover, accordion, and picker feedback. `prefers-reduced-motion: reduce` disables nonessential transitions and keeps every panel fully visible.

## Source and QA constraint

Cloudflare blocked direct automated browser inspection of the live origin, and the renderer’s full-page capture starts from the source’s initial scroll-animation state. The retained rendered HTML, CSS, public CDN assets, and hero pageshot were therefore used as the evidence authority. QA compares stable hero and normal-flow clone states; the source’s scroll-only frames are documented instead of fabricated.
