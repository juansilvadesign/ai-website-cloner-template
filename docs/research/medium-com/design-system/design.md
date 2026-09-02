# Medium UI Design System — Token Reference

> Always read this file first. For component specs see [design-components.md](design-components.md). For accessibility and do's/don'ts see [design-guidelines.md](design-guidelines.md).

This UI-only reconstruction combines a warm editorial entry surface with a plain white publishing-product surface. It uses an editorial serif proxy for story hierarchy, a neutral variable sans for navigation, and a 4px base spacing unit.

## Colors

### Accent — Primary

| Role | Hex | Usage |
| --- | --- | --- |
| primary | `#1a8917` | A single affirmative product action; positive metric deltas |
| on-primary | `#ffffff` | Label or icon over green |
| primary-hover | `#157312` | Button hover |
| primary-active | `#0f5d0d` | Pressed action |

### Surface & Neutral

| Role | Hex | Usage |
| --- | --- | --- |
| paper | `#f7f4ed` | Public landing canvas |
| surface | `#ffffff` | Reader, Lists, Audience, dialogs |
| ink | `#242424` | Primary text, black public action, rules |
| ink-strong | `#1a1a1a` | Display emphasis |
| muted | `#6b6b6b` | Metadata and inactive navigation |
| meta | `#8b8b8b` | Tertiary details |
| border | `#e6e6e6` | Card edges and rails |
| border-soft | `#f2f2f2` | Story and metric dividers |

### Semantic / Status

| Role | Hex | Usage |
| --- | --- | --- |
| success | `#1a8917` | Audience growth |
| warning | `#b7791f` | Reserved only for warnings |
| danger | `#c43333` | Reserved only for destructive errors |

## Typography

Default display family: `"Newsreader Variable", "Iowan Old Style", Georgia, serif`.

Default product family: `InterVariable, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.

| Style | Size | Weight | Line Height | Spacing |
| --- | --- | --- | --- | --- |
| Marketing Display | 112px | 520 | .95 | -.045em |
| Hero / Story Title | 48–62px | 570 | 1.04 | -.045em |
| Product Page Title | 48px | 750 | 1 | -.04em |
| Section Heading | 32px | 750 | 1.1 | -.04em |
| Reading Body | 20px | 400 | 1.58 | normal |
| Body / Tab | 16px | 400–500 | 1.5 | normal |
| Label | 14px | 400–620 | 1.4 | normal |
| Metadata | 12px | 400–650 | 1.3 | .05em only when uppercase |

## Shape

| Token | Radius | Components |
| --- | --- | --- |
| Small | 4px | Input, subscribe button, publication mark |
| Medium | 8px | List cards, dialogue field group |
| Large | 12px | Native dialog container |
| Full | 9999px | Buttons, search, avatars, status marks |

## Elevation

| Level | CSS shadow | Usage |
| --- | --- | --- |
| Flat | `none` | All primary product surfaces |
| Ring | `0 0 0 1px #e6e6e6` | Hairline visual boundary |
| Raised | `0 8px 24px rgba(0,0,0,.08)` | Dialog only |

## Interaction States

| State | Layer | Notes |
| --- | --- | --- |
| Enabled | 0% | Default restrained surface |
| Hover link | Opacity .58 or underline | Public and text links |
| Hover outlined action | Ink fill + white text | Secondary action |
| Hover green action | Darker green fill | Affirmative action |
| Focus | 3px green alpha ring | Never remove on keyboard focus |
| Active tab | 2px ink underline | `aria-selected=true` |
| Disabled | Muted ink, no pointer action | Only when an action is unavailable |

## Layout

| Class | Width | Panes | Navigation |
| --- | --- | --- |
| Compact | `< 521px` | 1 | Topbar + 64px bottom nav |
| Medium | `521–900px` | 1 | Topbar + bottom nav |
| Expanded | `> 900px` | 1 | 72px left rail + fixed topbar |

| Surface | Content width | Gutter |
| --- | --- | --- |
| Public marketing | Full viewport | 7vw desktop, 20px phone |
| Product Lists/Audience | 1180px maximum | 7vw desktop, 32px tablet, 20px phone |
| Story reading | 700px maximum | Product gutter + 20px phone |

## Motion

| Token | Value | Use |
| --- | --- | --- |
| Fast | 150ms | Hover/focus microstates |
| Base | 220ms | Tab/dialog state change |
| Standard easing | `cubic-bezier(.2,0,0,1)` | All bespoke transitions |

No motion should obscure reading, gate content, or cause a card to move on initial page load.

## Icons

Use 24px single-color line icons with round caps/joins and approximately 1.35–1.5px stroke. Icon-only controls receive a 40px target and accessible label. Favor `currentColor`; do not put interface icons in bright green unless they represent an affirmative state.

## Design Tokens

The implementation uses OpenDesign semantic tokens such as `--bg`, `--surface`, `--fg`, `--accent`, `--font-display`, `--space-4`, and `--container-max`. The canonical emitted source is [tokens.source.json](../../../../design-systems/medium-com/source/tokens.source.json); generated CSS must not be hand-edited.
