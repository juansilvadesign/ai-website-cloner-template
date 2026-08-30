# Reflect page topology

Source: <https://reflect.app/>  
Captured: 2026-08-29  
Clone route: `/reflect-app/`

## Evidence set

- Desktop reference: `docs/design-references/reflect-app/qa/original-1440.png`
- Mobile reference: `docs/design-references/reflect-app/qa/original-390.png`
- Section evidence: `docs/design-references/reflect-app/original-section-*.png`
- Clone comparisons: `docs/design-references/reflect-app/qa/comparison-1440.png` and `comparison-390.png`

The source is a single, vertically paced marketing page. It uses a near-black indigo canvas, a translucent fixed header, bright lavender display type, and a sequence of product-story panels separated by generous empty space. The clone preserves the same information architecture and anchor destinations while rebuilding the decorative effects in portable CSS.

## Desktop map

| Order | Landmark / anchor | Approx. source position | Visual role | Clone component |
| --- | --- | ---: | --- | --- |
| 1 | Fixed site header | 0–88 px | Logo, six navigation links, sign-in, primary CTA | `SiteHeader.astro` |
| 2 | Hero | 0–1,339 px | Announcement pill, value proposition, cosmic black-hole motif, product-video preview | `HeroSection.astro` |
| 3 | Feature strip | 1,261–1,653 px | Two-row benefit matrix under hero media | `FeatureStrip.astro` |
| 4 | Reflect AI, `#ai` | 1,653–2,940 px | AI positioning, click-to-reveal prompt, capability grid | `AiSection.astro` |
| 5 | Connected | 2,940–4,181 px | Relationship graph / connected notes story | `StorySections.astro` |
| 6 | Research | 4,181–5,291 px | Search and visual research-radar story | `StorySections.astro` |
| 7 | Encryption | 5,291–6,067 px | Privacy and local-first trust proof | `StorySections.astro` |
| 8 | Meetings | 6,067–7,221 px | Calendar and meeting-note workflow | `StorySections.astro` |
| 9 | Integrations, `#integrations` | 7,221–8,161 px | Integration ecosystem panel | `StorySections.astro` |
| 10 | Pricing, `#pricing` | 8,161–9,417 px | One-plan price card and purchase CTA | `PricingSection.astro` |
| 11 | Testimonials | 9,417–10,285 px | Two-column customer quote wall | `TestimonialsSection.astro` |
| 12 | About, `#about` | 10,285–11,109 px | Company / team context and globe motif | `ClosingSections.astro` |
| 13 | Academy | 11,109–12,025 px | Education offer and game-like tile board | `ClosingSections.astro` |
| 14 | Closing CTA | 12,025–12,625 px | Final conversion banner | `ClosingSections.astro` |
| 15 | Footer | 12,625–13,388 px | Brand signature, link columns, legal links | `SiteFooter.astro` |

## Layout rules observed

- The header remains fixed at 88 px on desktop. Its low-opacity black fill and backdrop blur make it feel present but non-blocking above every section.
- Major sections sit in one centered content column, normally between 1,120 and 1,216 px, but intentionally use wide full-bleed atmospheric effects.
- The hero breaks this rule: the copy is centered, the decorative orbit field is wider than its content, and the application preview is a large floating frame below the heading.
- Section headers are almost always centered. Utility content—pricing, quotes, footer links—switches to left-aligned cards or columns where scanning is more important than ceremony.
- Borders are deliberately faint; hierarchy comes primarily from spacing, contrast, glow, and foreground opacity rather than heavy surfaces.

## Responsive topology

At the 390 px reference width, the page keeps the same order and narrative. The primary changes are structural rather than editorial:

- The desktop header navigation collapses behind a menu button. It exposes the same nav and calls to action in a vertically stacked drawer.
- The hero type drops from the desktop display scale to a 40 px / 44 px treatment, while the large product frame becomes viewport-width with 16 px side gutters.
- Feature cells change from a multi-column strip to a two-column / single-column sequence as space requires.
- The AI capability matrix becomes a single list; the prompt card grows vertically rather than shrinking its text.
- The five narrative product modules become stacked, with visual diagrams below their copy instead of beside it.
- Testimonial, pricing, academy, and footer groups become a single readable column without hidden content.

## Content and asset provenance

The clone uses public, source-hosted visual assets downloaded into its own route namespace:

- `/clones/reflect-app/images/logo.png`
- `/clones/reflect-app/images/hero-preview.png`
- `/clones/reflect-app/videos/hero-demo.webm`
- `/clones/reflect-app/fonts/inter-v-regular.woff2`
- `/clones/reflect-app/fonts/inter-v-medium.woff2`
- `/clones/reflect-app/fonts/aeonik-pro-medium.woff2`

All first-party decorative illustrations are rebuilt with CSS shapes, gradients, grid lines, and lightweight animation. This keeps the clone self-contained while retaining the source’s dark cosmic visual language.
