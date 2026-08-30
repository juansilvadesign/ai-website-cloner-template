# Consulta de Processos Design System

This package records the public visual language of `https://consultadeprocessos.com.br/` as inspected on 2026-08-29. It is a high-trust Brazilian legal-data SaaS landing page: white space and slate typography establish clarity, while a decisive teal accent carries every conversion moment.

## Personality and visual intent

The page feels orderly, rapid, and evidence-led. It avoids legal clichés such as gavels or courthouse photography; instead, it shows structured data, small status chips, process lists, and human-verification signals. White canvas, fine slate borders, concise cards, and generous desktop breathing room make the product feel controlled rather than intimidating.

Teal is reserved for momentum: primary CTAs, the dark section gradients, live-state indicators, and the recurring small-square accent in eyebrows. Use it deliberately. The visual rhythm alternates calm white information sections with dense teal conversion/product demonstrations.

## Color roles

`--bg` and `--surface` are pure white, allowing `--border` and `--border-soft` to do most of the structural work. `--fg` is the nearly black slate used for display copy, `--fg-2` supports controls and dense product chrome, and `--muted`/`--meta` keep explanation and data labels quiet.

`--accent` is teal-500; `--accent-hover` is the darker teal role used in white CTA text and gradient endpoints. Teal sections are gradients from the accent through the hover tier with a low-opacity plus-pattern overlay. Do not replace this system with blue, purple, glass, or a generic legal navy palette.

## Typography

Inter is the only visible family. Body copy is 16px/24px, product/card labels concentrate around 11–16px, and headline sizes step through 24px on mobile, 36px in secondary desktop sections, and 42–48px in the hero or prominent sections. Headlines are weight 700, tight at 1.15, with `-0.02em` display tracking.

Keep Portuguese copy as real interface language, not generic placeholder text. Eyebrows are 11px uppercase with slight tracking; supporting descriptions are 15–17px with relaxed leading; actions are semibold and never oversized.

## Spacing and layout

At 1440px, the main container is 1336px wide with 52px gutters. The global 390px gutter is exactly 20px. Major desktop sections use 128px vertical padding and contract to 64px on tablet/phone. Content alignments alternate intentionally: centered section intros, left-aligned sticky narratives, and centered CTA/metrics blocks.

Feature cards form three desktop columns and one phone column. The workflow section uses a 340px instruction column beside a wide product mockup on desktop, then stacks on phone. The industry section is a fixed-width sticky rail plus five vertical cards on desktop; the rail disappears below the large breakpoint and cards become a regular sequence.

## Components and states

The header is fixed, white, and finely divided. Its desktop dropdown is a 420px, 16px-radius white panel with a soft elevated shadow. Mobile replaces desktop navigation with a 36px bordered menu button and a full-width drop panel.

Cards use 8–16px radii, thin slate edges, and shallow elevation. Feature icons sit within subtly outlined 48–64px tiles. Product mockups use compact labels, pale divider lines, teal live chips, and intentionally small text. The risk deck overlaps four cards and exposes a pill-shaped active dot. FAQ items are bare bordered rows with a rotating chevron and teal open state.

## Motion and behavior

Motion is moderate and functional. Keep 150ms color changes and 200ms menu/accordion movement on the standard cubic-bezier. The risk deck rotates automatically and is also dot-addressable. Court logos may drift continuously in a low-priority marquee. On desktop, scroll observation changes the active industry rail item; clicking it should smooth-scroll to the matching card. Mobile has no sticky industry UI.

Respect `prefers-reduced-motion`: stop the marquee and deck auto-rotation, while retaining direct controls and accordion behavior.

## Accessibility baseline

Use semantic `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, headings, lists, and buttons. The page language is `pt-BR`. Decorative inline icons and patterned overlays are hidden from assistive technology. Button labels describe their destination or accordion state. FAQ controls expose `aria-expanded` and stay keyboard-operable.

The source page has strong primary contrast. Preserve it, especially on gradient teal sections. CTA labels must retain `--accent-on`; small pale data labels should stay on white surfaces only.

## Anti-patterns and fidelity boundaries

Do not introduce Tailwind, shadcn, gradients unrelated to teal, glass cards, huge shadows, stock legal imagery, or another typeface. Do not turn the long landing page into dashboard navigation. Avoid independent color, spacing, or radius values in page components: reusable values come from `tokens.css`.

The clone emulates the public marketing page only. Remote account creation, login, payment, application search, tracking pixels, ad scripts, and live legal-data services are deliberately not copied.
