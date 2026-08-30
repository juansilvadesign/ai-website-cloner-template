# Dra. Raffaela Drumond — Design System

## Personality

The source presents a quiet, high-end medical-aesthetics identity: calm, restrained, and precise rather than clinical or trend-driven. Its visual voice balances a pale neutral canvas with dark olive type, muted sage accents, and unusually generous white space. Information earns attention through composition and typographic contrast, not saturated color or decorative noise.

## Color roles

`--bg` (#F9F9F9) is the main paper-like canvas. `--surface` (#FFFFFF) lifts cards, accordions, and information panels from that field. `--surface-warm` (#FFF8F2) is a rare warm treatment used inside expanded content. The main ink is olive (`--fg`), supported by near-black forest (`--fg-2`) and sage (`--muted`). The only filled brand action is `--accent` (#8C916E); it switches to the main olive on hover.

## Typography

Headings use the light-weight, editorial serif `ivypresto-display`. They are spacious, softly italicized where a word needs emphasis, and color-shift individual phrases into muted sage. Body copy, labels, controls, and facts use Poppins at normal to medium weights. The hierarchy moves from a 64px display desktop title to a 20px reading tier, with fluid mobile reductions implemented by the consuming Astro components.

## Spacing and layout

The desktop page uses wide content fields up to 1485px, most often composed as paired visual/editorial columns. Major sections carry 90px vertical breathing room; the phone breakpoint uses 40px. Content panels have 20px corners, while compact label rows are pill shaped. Media is intentionally large, frequently reaches beyond an aligned text column, and is allowed to feel editorial rather than grid-bound.

## Components and states

The recurring component vocabulary is a rounded olive CTA with a white circular arrow, a bordered uppercase eyebrow pill with a small four-point star, editorial two-column image-and-copy pairings, 20px-radius accordion cards, and restrained review cards. Buttons lift 1px and darken on hover. Native details/summary accordions preserve server-rendered content and use an olive plus/minus affordance. The navigation is an off-canvas, full-screen deep-grey overlay.

## Motion

Motion is moderate. The original uses a 300ms menu/hover tier, 400ms accordion transitions, and 900ms reveal classes triggered around the middle of the viewport. The clone preserves the visible menu, hover, accordion, carousel, and reveal behaviors with native CSS and minimal progressive enhancement. Reduced-motion users get a static, immediately legible state.

## Accessibility

Interactive elements have discernible labels, real links, native `details` controls, visible keyboard focus, and sufficient semantic structure. Accent text is never the sole information carrier. The original uses a visual-only logo in several places; the clone adds useful `alt` text without changing its visual presentation.

## Anti-patterns

Do not introduce black backgrounds, neon medical imagery, hard rectangles, heavy gradients, overly bold headings, dense card grids, or generic SaaS iconography. Do not turn the page into a blue hospital site. Avoid extra accent colors and keep filled olive elements reserved for conversion moments.
