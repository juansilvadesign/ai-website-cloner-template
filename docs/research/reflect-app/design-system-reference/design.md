> This reference describes the extracted Reflect system. For implementation-ready variables, use [the generated token package](../../../../design-systems/reflect-app/tokens.css); for component decisions, see [design-components.md](design-components.md); for application rules, see [design-guidelines.md](design-guidelines.md).

# Reflect visual system

Reflect is a dark, cosmic product-marketing system. It uses broad near-black space, subtly luminous lavender surfaces, and a deliberately sparse control language to make complex note-taking workflows feel calm. The visual signature is not “purple gradients” in isolation; it is the contrast between quiet empty space and a few precise points of light.

## Colors

| Role | Token | Value | Intended use |
| --- | --- | --- | --- |
| Canvas | `--bg` | `#030014` | Continuous page background |
| Raised surface | `--surface` | `#08051a` | Cards, prompts, dialog shells |
| Warm inset | `--surface-warm` | `#100a2c` | Subtle internal depth |
| Primary text | `--fg` | `#f4f0ff` | Buttons and high-contrast copy |
| Heading text | `--fg-2` | `#efedfd` | Display type and strong labels |
| Supporting text | `--muted` | `rgba(239,237,253,.7)` | Body copy |
| Hairline | `--border` | `rgba(255,255,255,.1)` | Glass frames and dividers |
| Accent | `--accent` | `#8a5bff` | Primary action and concentrated glow |
| Accent hover | `--accent-hover` | `#a87fff` | Hover / focus luminosity |
| Accent active | `--accent-active` | `#6d48ff` | Selected diagram / active state |
| Success | `--success` | `#19d3a1` | Positive AI cue, used sparingly |

Use the accent as a beacon, not a page fill. Large areas should remain close to `--bg`; gradients must fade into that canvas rather than creating obvious separate bands. Borders should generally be white at 6–10% opacity, never solid gray.

## Typography

Two voices create the system’s hierarchy:

| Voice | Token | Use | Character |
| --- | --- | --- | --- |
| Display | `--font-display` | H1–H3, major conversion statements | Aeonik medium, close tracking, calm authority |
| Body | `--font-body` | Body, controls, navigation, card labels | Inter V, compact and neutral |
| Mono | `--font-mono` | Keyboard hints and technical microcopy | Reserved for small UI details |

The display scale is 72 / 56 / 48 / 32 / 24 px (`--text-4xl` through `--text-lg`) with `--leading-tight` of 1.142857 and `--tracking-display` of -0.025em. Inter body copy defaults to 16 px / 24 px. Do not use bold as the primary distinction in paragraphs; Reflect usually moves hierarchy with size, opacity, and space.

## Shape

| Token | Value | Use |
| --- | --- | --- |
| `--radius-sm` | 8 px | Small chips, shortcuts, compact UI |
| `--radius-md` | 12 px | Inner panels and media corners |
| `--radius-lg` | 24 px | Product cards, dialog shells, hero frame |
| `--radius-pill` | 9999 px | Tags, primary nav CTA, round media controls |

Large radius should frame a meaningful region, not be applied to every nested element. Within a 24 px card, preserve a smaller 12 px radius for contained media and controls. Pill controls look most authentic at small/medium sizes with enough horizontal padding to feel soft rather than bubbly.

## Elevation

Reflect uses luminance and rings more than conventional drop shadows.

- Flat content sits directly on `--bg`.
- Interactive panels use `--elev-ring` plus a faint inset highlight.
- Only transient or focal layers—hero media, modal video, active prompt—may use `--elev-raised`.
- Purple glow is localized around story illustrations, active AI states, and the black-hole horizon. Keep it diffuse and low-opacity.

The correct result should feel like light inside deep space, not like cards floating over a dashboard background.

## Interaction States

| State | Visual rule | Token basis |
| --- | --- | --- |
| Rest | Subtle surface, quiet border, readable copy | `--surface`, `--border` |
| Hover | Raise contrast / lavender contribution slightly | `--accent-hover`, 300 ms |
| Active | Reveal content or increase saturated glow | `--accent-active`, 450 ms |
| Focus | Clearly visible lavender outer ring | `--focus-ring` |
| Disabled | Reduce opacity without removing semantic contrast | `--meta` plus cursor/state semantics |

Movement is short and local: colour, opacity, small scale, or a vertical reveal. Avoid bouncy spring curves, large movement, or interactions that relocate content unexpectedly.

## Layout

The base desktop container is `--container-max: 1200px`; common desktop gutters are 72 px, tablet gutters 32 px, and phone gutters 20 px. The hero and atmospheric layers may exceed the container, but readable content should not.

| Breakpoint intent | Section padding | Layout behavior |
| --- | --- | --- |
| Desktop | `--section-y-desktop` / 116 px | Wide storytelling, two-column product moments |
| Tablet | `--section-y-tablet` / 96 px | Reduced gap, diagrams remain generous |
| Phone | `--section-y-phone` / 72 px | Single-column flow, 20 px safe gutter |

Design from vertical rhythm first. The source feels premium because large section pauses persist across the page; collapsing all space on small screens would lose that pacing.

## Motion

`--motion-fast` is 300 ms; `--motion-base` is 450 ms; both use `--ease-standard: cubic-bezier(.6,.6,0,1)`. Motion should explain state: opening the AI answer, lifting the play control, easing a glow in, or revealing a simple decorative drift.

Source-like canvas and particle effects are optional enhancement, not content delivery. Any such decoration must be ignored for assistive technologies and suppressed under `prefers-reduced-motion`.

## Icons

Icons are compact, mostly single-colour marks: a play triangle, simple feature glyphs, a plus/menu mark, and keyboard labels. Prefer thin line or simple geometric symbols in `--fg` / `--fg-2`; use accent only to indicate a focal interaction. Never introduce an unrelated multi-colour icon library into this system.

## Design Tokens

The full 56-slot token contract is emitted in the design-system package. Token files are generated from `design-systems/reflect-app/source/tokens.source.json`; edit that source artifact and re-run the emitter instead of hand-editing `tokens.css`.

The important construction sequence is:

1. Establish `--bg`, foreground opacity tiers, and one-pixel borders.
2. Set Aeonik display type and Inter body type before tuning sizes.
3. Apply the 4 px spacing rhythm and desktop/phone section cadence.
4. Add only the necessary glass frame and glow; stop before decorative effects obscure the content.
