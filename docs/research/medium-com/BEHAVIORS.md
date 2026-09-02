# Medium UI behavior record

## Motion tier

**Light.** The scoped UI uses compact hover, focus, tab, dialog, follow, clap, and save states. No WebGL, smooth-scroll library, autoplay video, parallax, carousel, or scroll-triggered reveal is reproduced.

## Capture limitation

The user-provided cookie jar loaded successfully, but both a standard cookie-bearing HTTP request and Playwright Chromium received Cloudflare 403 responses. The original pages could not be scroll/click inspected or screenshot at 1440px, 768px, and 390px. The clone instead uses public page markup and public visual reference screenshots saved under `docs/design-references/medium-com/`; those images are clearly not represented as authenticated original captures.

## Shared interactions

| Surface | Trigger | State change | Transition |
| --- | --- | --- | --- |
| Public desktop nav | Hover link | Lower opacity | 150ms standard ease |
| Public action | Hover | `translateY(-2px)` + lower opacity | 150ms standard ease |
| Public mobile nav | Native details click | Opens compact menu | Native details behavior |
| Product rail/topbar icons | Hover | Ink/soft-surface swap | 150ms standard ease |
| All interactive controls | Keyboard focus | Green 3px focus ring | Immediate browser focus |

## Story interactions

| Control | Trigger | State A | State B | Implementation |
| --- | --- | --- | --- | --- |
| Follow | Click | `Follow` | `Following` | Progressive inline script |
| Clap | Click | Count 43 | Count increments; active ink state | Progressive inline script |
| Save | Click | Outline glyph | Filled heart glyph | Progressive inline script |
| Subscribe form | Submit | UI field | Native form submission is prevented only by no backend route; no account request | Static form shell |

## Lists interactions

| Control | Trigger | State change | Implementation |
| --- | --- | --- | --- |
| Saved / Highlights / Recently viewed | Click tab | Active underline and live status text update | Progressive inline script + ARIA state |
| New list | Click | Native dialog opens | `HTMLDialogElement.showModal()` |
| Dialog close/cancel | Click native dialog form action | Dialog closes | Native `method=dialog` |

## Audience interactions

| Control | Trigger | State change | Implementation |
| --- | --- | --- | --- |
| Partner Program earnings / Story stats | Click | Polite UI-only notice updates | Progressive inline script |
| Metric growth links | Hover/focus | Underline | Native CSS link state |

## Responsive behavior

- 1440px: public hero is a split layout; product shell includes the 72px rail.
- 768px: public hero stacks; rail becomes topbar + bottom navigation; lists retain split cards.
- 390px: product gutters are 20px, public menu is native-details, list cards stack, audience metrics become a single column, and story artwork uses the viewport edge.

## Deliberate fallbacks

- All source hero/thumbnail media is CSS-generated, rather than copied from a private account or sourced article.
- User-specific lists and audience values are sample UI data.
- No source scroll timing or exact computed hover property could be independently verified while Cloudflare blocks browser access.
