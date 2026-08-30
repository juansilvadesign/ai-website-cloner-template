# Dra. Raffaela Drumond — Behavior Inventory

## Motion tier: moderate

The delivered site uses 400–900ms easing for a menu overlay, call-to-action hover lift, disclosure animation, and scroll reveal. It has no canvas, WebGL, video player, or scroll-scrubbed animation signal.

| Area | Source behavior | Clone behavior | Verification status |
| --- | --- | --- | --- |
| Header menu | Three-line trigger opens fixed `#4b4f52` overlay in ~400ms | Button toggles semantic `aria-expanded`, Escape and overlay-link close | Source scripts inspected |
| Anchor navigation | Menu links jump/smooth-scroll to sections | Native anchors plus `scroll-behavior: smooth` | Source CSS inspected |
| Primary CTA | Olive/sage control shifts upward 1px and gains shadow on hover | CSS hover/focus-visible equivalent | Source CSS inspected |
| Treatments | Multiple descriptions can expand | Native `details`/summary; first disclosure starts open | Source HTML inspected |
| Reveal | Elements enter after crossing roughly half viewport | IntersectionObserver adds `.is-visible`; reduced-motion bypasses it | Functional clone enhancement |
| Testimonials | Third-party slider advances cards | Accessible static local cards; no opaque third-party dependency | Intentional simplification |
| Comfort gallery | Continuous image carousel moves through six clinic photos | Lightweight CSS loop on desktop; touch-scroll/snap rail on phone | Source carousel inspected |
| WhatsApp | Persistent action opens WhatsApp URL | Fixed outbound link uses source URL | Source URL retained |

## Reduced motion

The clone disables transitions, transforms, and smooth scroll where `prefers-reduced-motion: reduce` is set.

## QA captures

The live target loaded on a retry on 2026-08-30. Untouched full-page masters are stored at docs/design-references/raffaeladrumond-com-br/qa/original-1440.png and original-390.png; their viewport captures are retained as original-1440-top.png and original-390-top.png. The matching local clone masters and left-original/right-clone composites are in the same QA directory.
