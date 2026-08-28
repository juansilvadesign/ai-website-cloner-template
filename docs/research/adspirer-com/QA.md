# Adspirer clone QA

Validated locally at `http://127.0.0.1:4321/adspirer-com/` on 2026-08-28.

## Render checks

| Viewport | Clone output | Reference | Result |
| --- | --- | --- | --- |
| Desktop | `qa/clone-1440.png` (1440×10965) | `qa/original-1440.png` (reference raster supplied by browser capture) | Pass — header, gradient hero, product blocks, workspace, benefits, pricing, CTA, and footer render as a continuous page |
| Phone | `qa/clone-390.png` (390×13354) | `qa/original-390.png` (390×14805) | Pass — 72px header, compact hero, stacked cards, horizontal platform tabs, pricing stack, and footer are responsive |

Side-by-side output is saved as `qa/comparison-1440.png` and `qa/comparison-390.png`.

## Interaction checks

- Desktop Ad platforms menu: open state reports `aria-expanded=true` and exposes its popover.
- Hero source selector: ChatGPT updates provider title and finished campaign state.
- Agent workspace: Codex tab becomes selected and replaces title, steps, and MCP endpoint.
- Pricing: Monthly changes all plan prices to `$0`, `$49`, `$99`, and `$199` and updates billing text.
- Mobile drawer: opens with `aria-expanded=true`, locks page scroll, and closes through the explicit close button.
- Browser console: no errors recorded; captured local clone assets return HTTP 200.

## Intentional fallback

The original’s long scripted hero autoplay and scroll-staged benefit sequence are represented by their stable finished/static states. This preserves the visual hierarchy and task content without hiding information during full-page capture, print, reduced-motion, or no-JavaScript paths.
