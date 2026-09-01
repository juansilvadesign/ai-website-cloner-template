# Ruama Cori · Nutricionista — Behavior Evidence

## Motion tier

**Light.** The page has native scrolling, one autoplaying hero video, simple CSS hover states, a menu modal, a theme toggle, and a decorative CTA sheen. No Framer Motion, GSAP, ScrollTrigger, Lenis/Locomotive, canvas/WebGL, Lottie, scroll snap, or scroll-driven reveal signals were observed.

## Source/browser state

- Source: `https://bio.nutriruama.com.br/`
- Browser: Playwright Chrome for Testing
- Device scale: 1
- Captured at: 1440×1000, 768×1000, 390×844
- Consent/authentication: none visible or required

## Scroll sweep

The header is normal-flow, not sticky. At `scrollY` 0, 650, and the 768px page bottom (1731px), its computed position remained `static`, background transparent, `box-shadow: none`, opacity 1, and `transform: none`; only its viewport position changed with document scrolling. `scroll-snap-type` is `none`, and `scroll-behavior` is `auto`. The clone should use ordinary browser scroll and no scroll observer.

## Hero video

- **Trigger:** page load.
- **Source:** `/videos/hero.mp4`; poster `/images/hero-poster.jpg`.
- **State:** `autoplay`, `muted`, `playsinline`, `loop: false`.
- **Fallback:** poster remains available if autoplay is blocked or reduced-motion is requested.
- **Overlay:** source `linear-gradient(180deg, rgba(198,75,75,0) 29%, #C64B4B 77%)`; desktop full hero background also resolves to `#C64B4B` at 64.5% and `#602424` at 100%.

## Menu modal

- **Trigger:** click `button[aria-label="Abrir menu"]`.
- **Closed:** overlay `opacity: 0`, `pointer-events: none`; panel is translated upward 16px.
- **Open:** overlay `opacity: 1`, `pointer-events: auto`; panel transform is none. Scrim is `rgba(0,0,0,.20)`, panel is `rgba(248,248,248,.62)` and `backdrop-filter: blur(27px)`.
- **Transition:** overlay `opacity 0.3s cubic-bezier(.4,0,.2,1)`; panel transform 0.3s with the same curve.
- **Close triggers:** the panel close control and scrim button both close the modal.
- **Content:** Site Oficial, Achadinhos da Nutri, Blog da Nutri, Parcerias & Publicidade; external destinations are preserved in `SiteHeader.astro`.

## Theme toggle

- **Trigger:** click `button[aria-label="Alternar tema"]`.
- **State A:** source body `#F8F8F8` background / `#280814` ink; logo normal; moon control icon.
- **State B:** document receives source `dark` class; body becomes `#280814` background / `#F7E9EC` ink; logo filter becomes `brightness(0) invert(1)`; theme icon becomes sun.
- **Clone implementation:** set `[data-theme="dark"]` on the document element and persist it in local storage.

## Hover and focus states

- **Link cards:** `box-shadow` transitions from none to `0 8px 30px rgba(0,0,0,.10)` over `150ms cubic-bezier(.4,0,.2,1)`.
- **Social links:** translate up 4px and background increases from `rgba(255,255,255,.14)` to 30% white over 300ms.
- **Header controls:** hover lightens to white in light mode; all color/border/background transitions use 150ms cubic-bezier(.4,0,.2,1).
- **Protocol CTA:** opacity changes from 1 to .9 on hover over 150ms; its pseudo-element sheen runs every 4.5s. `prefers-reduced-motion` disables the sheen.

## Click sweep

- Menu open/close works as described above.
- Theme toggle works as described above.
- Hero social links are direct external destinations.
- The four media cards are direct external destinations with no content state change.
- The protocol button was clicked in a clean browser state; it produced no popup, no current-tab navigation, and no observed DOM state change. The clone preserves it as a non-navigating action button, matching observed behavior.

## Responsive sweep

- **1440px:** three-column mosaic; 112px header; 32px grid gaps; menu is 1035px two-column glass panel.
- **768px:** single-column sequence; 74px header; 16px page gutters; 460px hero; 180px cards; menu is 400px single-column panel.
- **390px:** same single-column sequence at 358px content width; card gap 13.91px; protocol maintains 455:803 aspect ratio.
- **Breakpoint:** `min-width: 1024px` switches to desktop mosaic and desktop card artwork/crops.

## Deliberate fallback notes

No effect-heavy fallback is needed. The clone reuses the supplied public video and CSS sheen. Any browser autoplay restriction displays the extracted poster instead of attempting a synthetic animation.
