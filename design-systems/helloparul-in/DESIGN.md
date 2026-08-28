# Hello Parul Portfolio Design System

This package records the visual language of `https://helloparul.in/` as inspected on 2026-08-27. It is a single-light-theme product-designer portfolio whose personality is opinionated, editorial, and noticeably hand-built without becoming noisy.

## Personality and visual intent

The page turns a personal portfolio into a product argument. Enormous black display type establishes certainty; the hand-tilted yellow underline behind “friction” supplies the one expressive gesture. The surrounding canvas stays warm and spare, making bright red actions and evidence-heavy work cards feel deliberate rather than decorative.

Do not neutralize the voice into a generic agency system. The uneven-feeling but exact hierarchy — compact mono metadata against large Bricolage headlines — is the point.

## Color roles

`--bg` is the warm cream canvas. `--surface` is slightly lighter so case-study cards read as tangible objects. `--fg` is a near-black brown used for primary text and the large inverted footer/marquee field. `--fg-2`, `--muted`, and `--meta` form the quiet supporting copy ladder.

`--accent` is the highly saturated red action signal. It belongs on primary actions, hover offsets, availability, and intentional metric emphasis only. Yellow, blue, and green stay evidence accents inside the page composition; they are not replacements for the system primary color.

## Typography

Bricolage Grotesque is the display face: weight 800, tight leading, and negative tracking. It owns the hero, section titles, card titles, and marquee. Instrument Sans carries ordinary reading copy. Space Mono is the compact technical annotation layer for buttons, chips, navigation, metadata, metrics, and footer controls.

The target’s most recognisable scale is `--text-4xl` at 118px for the desktop hero. It contracts through the source’s clamp rule on small screens; it must not be swapped for a generic responsive display token. Card titles and section headings retain the same display face but use the lower observed endpoints.

## Spacing and layout

Desktop uses a 1280px maximum shell and 32px inline gutters; its inspected 1440px content width is 1216px. Phone uses 22px gutters. The 88px hero top offset creates dramatic breathing room before the primary line. The full-bleed marquee and footer intentionally break outside the centered shell.

The stats board has a 1px internal rhythm, 18px corners, and 64px vertical breathing room. Case cards use 26px corners, 2px ink borders, and a 28px stack gap. Desktop cards alternate 1.15fr/.85fr image-text emphasis; tablet and phone always become one column.

## Components and states

The system has five core groups: sticky navigation, display hero, marquee, evidence/stats, featured case card, and contact actions. Pills are fully round. A case card is a bordered editorial container rather than a shadowed dashboard widget.

Resting controls are minimal. Pointer emphasis comes from a red card offset, a darkened red CTA, a quiet nav fill, or a stronger footer outline — never from exaggerated scale or generic elevation. The mobile bottom navigation is a dark fixed system bar, not a floating card.

## Motion and interaction

Motion is moderate but shallow. The page has a one-time six-second splash, a 26-second linear marquee, sticky navigation, ordinary anchor scrolling, and linked in-app views. There is no WebGL, canvas, chained timeline, or reveal choreography.

Static content remains server-rendered. The splash can use a progressive script and the marquee is pure CSS. Keep hover transitions brief; `--motion-fast` is a design-contract fallback for source `style-hover` rules that did not declare a duration.

## Accessibility baseline

Use semantic `nav`, `header`, `main`, `section`, `article`, `footer`, and heading levels. Preserve real button/link names and image alt text from the source. Decorative underline and marquee stars should not become meaningful repeated content in the accessibility tree.

The target has no custom focus treatment. The clone supplies a compact token-resolved focus ring while retaining native keyboard interaction. External destinations use `rel="noopener"`; the resume stays a real download.

## Anti-patterns and fidelity boundaries

Do not replace the cream/ink/red triad with neutral gray UI, add gradients to the cards, round every surface to the same value, use Tailwind utility classes in the Astro target, or turn the portfolio into a boxed SaaS dashboard. Do not substitute generated product images for the supplied source screenshots.

The yellow hero underline, dark skill band, four-cell evidence board, three alternating work cards, and oversized footer title are load-bearing. Removing any of them makes the reconstruction feel unrelated even if individual colors and fonts are correct.
