# Reworkd behavior and motion record

Source: <https://www.reworkd.ai/>  
Clone: `/reworkd-ai/`  
Inspection: 2026-09-02

## Motion classification

**Tier: heavy.** The source has nine `<canvas>` elements: data scanlines, a hero CTA glow, a 600px problem-scene visualization, feature code/chart motion, and proof/footer line texture. It has no video, Framer, GSAP, Lottie, Lenis, or Locomotive signals. Source animations visible in the browser include `spin` (300ms/1000ms), `kicker-caret` (2s), `home-everything-heal-ekg` (2s), and `pulse` (2s).

The clone is static-first: readable browser frames, status chips, data rows, and metric hierarchy are rendered as HTML/CSS. Canvas-only motion is intentionally substituted with light CSS scans, grid lines, and a short visual state change; no essential content depends on it.

## Interaction inventory

| Area | Source behavior | Extracted state | Clone behavior |
| --- | --- | --- | --- |
| Announcement | Fixed black strip at top | Desktop text is one line; 390px wraps to 100px high | Fixed strip, same copy and mail link |
| Header | Fixed under notice; desktop position changes as page scrolls | Wrapper transform shifts from `translateY(8px)` to `translateY(24px)`, 1s `cubic-bezier(.6,.6,0,1)` | Small `.is-scrolled` translation using the same source curve |
| Mobile menu | Source button exists below the promotion overlay | Live pointer hit test is intercepted by promo at 390px | Server-rendered drawer opens through an accessible button; menu stays visually matching but above overlay hit area |
| Hero CTA | Azure gradient anchor | Hover adds a 10% white gradient overlay; `--home-hero-cta-gradient` / shadow transition 200ms ease-out | Same low-lift brightening, external Typeform URL |
| Hero browser tabs | Click-driven, three data datasets | Selected button: `rgb(227,232,234)` / 1px `rgb(203,211,214)`; inactive `rgb(244,247,247)` | Native tab buttons with `aria-selected`, public data default, Careers / YC content switch |
| Problem browser | Hover-driven muted overlay | Child overlay opacity `0 → 1`, 700ms `cubic-bezier(.4,0,.2,1)`, 2.5px backdrop blur | CSS `:hover` / `:focus-within` overlay over local source image |
| Extractor mini demo | Button-driven / timed source canvas activity | “Extract Next” button highlights and source list/code changes are decorated with canvas effects | Static source list and CSS scan line; button has a pressed visual state only |
| Analytics pills | Click-driven selected source | `irs.com/us-tax-law`, `usa.gov/pensions`, `irs.com/us-tax`; selected pill becomes shark-950 | Server-rendered pills update the local graphic’s source label / active state |
| Feature cells | Light hover transitions; no navigation | Faint surface/border changes only | Border/surface micro transitions |
| Final CTA | Anchor hover lightens shadow | 200ms source shadow change | Local CSS shadow transition and Typeform link |

## Source state content

- **Public Government Regulations:** `Current Public Services`; rows include 143-24A / Active / Ault Farms Operations Services; 456-78B / Active / XYZ Corporation IT Services; 901-23C / Cancelled / ABC Company Marketing Campaign.
- **Careers – Open Positions:** `Careers at ACME Corporation`; rows include Los Angeles / Engineering / Software Engineer – Developer Experience and Platform; San Francisco / Engineering / Staff Product Manager – Growth.
- **YC Startup Directory:** companies include Airbnb, Reworkd, Scale AI, Dioxus Labs, Gusto, and DoorDash.
- **Analytics source pills:** `irs.com/us-tax-law`, `usa.gov/pensions`, and `irs.com/us-tax`.

## Responsive replay evidence

| Viewport | Findings |
| --- | --- |
| 1440 × 1000 | Header has centered navigation, hero H1 is 80/76, source browser occupies the 1216px visual band, benefits use three columns. |
| 768 × 1024 | The source preserves its technical composition while compressing content width and visual copy. |
| 390 × 844 | Header notice is 100px tall, hero H1 is 40px / 40px, browser appears below CTA, problem graphic no longer occupies a side column, feature cards stack, and proof metrics become a vertical series. |

## Deliberate fallbacks

- The nine source canvases are not copied as runtime canvas code. CSS grid/scan/line motifs preserve their perceptual role.
- The source’s blocked mobile-menu hit area is made interactive in the clone; this is an accessibility repair that does not change the visible hierarchy.
- External CTA, docs, jobs, social, and app links preserve their live outbound destinations. No source backend, account state, searchable table, analytics collection, or form integration is copied.
