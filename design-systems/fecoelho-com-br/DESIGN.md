# Fernanda Coelho Contact Card Design System

This package records the visual language of `https://fecoelho.com.br/card/` as inspected on 2026-08-04. It is a small system with a narrow purpose: present one person, make five contact actions unmistakable, and remain polished in both operating-system themes without adding application chrome.

## Personality and visual intent

The interface is warm, direct, and personal. Its off-white canvas and terracotta accent avoid the coldness of a generic link-in-bio page, while one violet secondary accent gives the portrait ring and primary action a digital/innovation signal. The large amount of quiet canvas makes the portrait and contact choices feel deliberate rather than promotional.

The hierarchy is intentionally shallow. There is one identity, one sentence of positioning, one short capability line, five equal actions, and one discreet source signature. Do not introduce navigation bars, decorative sections, badges, counters, or marketing copy; those would compete with the contact task.

## Color roles and themes

Light mode starts on `--bg: #faf8f5`. `--surface: #ffffff` separates the link cards, and `--surface-warm: #f2eee8` gives icon tiles a quiet warm fill. Primary ink is almost-black brown (`--fg: #191410`), while `--fg-2` carries the role and `--muted`/`--meta` carry the tagline, metadata, arrows, and footer.

Terracotta `--accent` is the recognizable brand color. Use it for the page glow, icon glyphs, the domain signature, and the first stop of the primary gradient. `--accent-hover` holds the observed violet second accent because the source has no filled-accent hover color; it completes the portrait ring and is mixed into the save-contact gradient. This mapping preserves both authored colors without inventing a brand-only token.

Dark mode is a true authored variant, not an inversion. It replaces the canvas with `#0e0c0b`, surfaces with `#1a1614`/`#201b18`, primary ink with `#f4efe9`, terracotta with `#f0714f`, and violet with `#9c85f0`. Shadows also deepen. Apply the complete dark override together; mixing light shadows with dark surfaces loses the intended depth.

## Typography

The display face is Space Grotesk 700. It appears only on the name, where `29.6px`, `1.1` leading, and `-0.02em` tracking create a compact, assured headline. Inter serves everything else at weights 400, 500, and 600. The clone mirrors the exact target font files locally to avoid a network-dependent font swap.

The observed text sizes are unusually close together: 12.8px metadata, 13.12px footer, 14.4px tagline, 16px role, 16.32px contact label, and 29.6px name. `--text-2xl` and `--text-3xl` are derived bridge steps because OpenDesign requires a complete monotonic scale even though the one-page target never renders those tiers. Do not substitute those bridge tokens into the card; the component uses only observed sizes.

## Spacing and layout

The page is one fluid column with `--container-max: 420px` and `20px` side gutters at every width. A `390px` viewport therefore produces an exact `350px` card. The body is at least `100dvh`, uses `28px` vertical padding, and centers the card in both axes. Shorter viewports scroll naturally.

Spacing is evidence-shaped rather than a generic 4px scale. The system records the real 1, 4, 8, 12, 14, 20, 28, and 40px intervals so components can reconstruct link subtitle offsets, icon gaps, card stacking, portrait separation, page insets, and the square icon tile without raw parallel values. Two compound values are expressed with `calc()`: link padding is 15×18px, and the footer offset is 26px.

There is no responsive breakpoint. The 420px maximum holds at desktop/tablet, and the card contracts to available width on phones. Never reduce type sizes, hide metadata, or reorder links on mobile; the target changes only its available inline width.

## Components and states

The portrait is a 132px circle consisting of a 4px terracotta-to-violet gradient wrapper and a 124px image with a 3px surface-colored border. It uses the raised elevation in both themes. Cropping is centered with `object-fit: cover` and must not be changed to contain or top-aligned.

Contact links are 18px-radius white/dark cards with 15px vertical and 18px horizontal padding. Each uses a fixed 40px icon tile, a flexible left-aligned label block, and a trailing arrow. Default cards use the quieter `--elev-ring` shadow and one-pixel `--border`; hover promotes them to `--elev-raised` and mixes the border toward the accent on hover-capable devices.

The first link is the sole filled action. Its gradient runs from `--accent` to a 70/30 mix of accent and violet, its foreground is `--accent-on`, and its icon tile is an 18% white tint. Its border remains transparent, including on hover. Every link presses to `scale(.985)` and returns over 150ms. Preserve native keyboard focus rather than erasing the browser outline.

## Motion and interaction

Motion complexity is light. There are no entrance animations, scroll reveals, sticky transitions, autoplay states, or client-side controls. The only transition is `transform`, `box-shadow`, and `border-color` over `--motion-fast: 150ms` with `ease`.

Hover enhancement is wrapped in `@media (hover: hover)` so touchscreens do not synthesize an elevation flash. The active scale applies to every pointer type. Theme changes are driven by the operating-system preference and should update immediately without an animation.

## Accessibility baseline

The document language is Brazilian Portuguese. The person's name is the only `h1`. The five actions live inside a `nav` labelled “Meus contatos.” Icons and directional arrows are decorative and therefore hidden from the accessibility tree; the anchor text and subtitle provide the useful names.

External destinations retain `target="_blank"` with `rel="noopener"`. The vCard link retains `download`. The target has no custom focus style, so native focus indication must remain visible. Contrast is strong for primary ink and link labels; muted metadata is intentionally lower contrast but remains readable at the captured sizes.

## Anti-patterns and fidelity boundaries

Do not turn this into a dashboard or generic social-link template. Avoid extra cards, animated gradients, glass blur, oversized shadows, icon-library substitutions, invented copy, or a manual theme toggle. Do not replace the warm palette with pure black/white or recolor WhatsApp/LinkedIn with their corporate colors; the source deliberately unifies every icon under the terracotta accent.

Do not flatten the portrait into a single bordered image: the gradient wrapper, surface border, and shadow are three distinct visual roles. Do not hardcode a second token set inside page CSS; the emitted package is the sole reusable styling source. Finally, do not convert external links into fake in-page buttons—the real destinations and vCard bytes are part of the component contract.
