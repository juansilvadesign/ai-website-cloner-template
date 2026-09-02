# Medium UI Guidelines — Accessibility & Do's/Don'ts

> See [design.md](design.md) for token values. See [design-components.md](design-components.md) for component specs.

## Accessibility

### Contrast Requirements

| Requirement | Ratio |
| --- | --- |
| Body text on a normal surface | 4.5:1 minimum |
| Large text (24px regular / 18.66px bold) | 3:1 minimum |
| Icons, input borders, focus cues | 3:1 minimum against the adjacent surface |

| Component | 3:1 Against |
| --- | --- |
| Green primary action | Warm paper or white surface |
| Black outline action | White surface |
| Active tab underline | White product surface |
| Muted metadata | Only non-essential information; never the only status signal |

### Touch Targets

- Give icon controls a 40×40px visual/interactive region, even when the icon is 20–24px.
- Give primary and secondary buttons a minimum 40px height; public marketing CTA uses 50px.
- Keep adjacent touch controls at least 8px apart.
- Do not rely on tiny line icons without `aria-label` text.

### Keyboard Navigation

| Key | Action |
| --- | --- |
| Tab / Shift+Tab | Move through anchors, buttons, fields, and dialog controls |
| Enter / Space | Activate a button or selected tab |
| Escape | Close native new-list dialog |
| Arrow keys | Optional future enhancement for the tablist; buttons remain independently tabbable |

### Assistive Technology

- Label search, notification, compose, save, clap, share, and more controls by purpose.
- Use `aria-current="page"` for active product navigation.
- Use `role="tablist"`, `role="tab"`, and `aria-selected` for Lists filters.
- Keep list and audience status feedback in a polite live region.
- Expose the chart as an image role with a concise sample-data label.
- Mark artwork and non-informative SVG decoration as `aria-hidden="true"`.

## Gestures

| Gesture | Use |
| --- | --- |
| Tap/click | Actions, tabs, product navigation, modal close |
| Keyboard activation | All actions and form controls |
| Scroll | Natural document reading; never a state trigger |
| Swipe | Native horizontal tab overflow only; no hidden essential route |
| Drag/pinch | Not required in scoped UI |

## Content Design

- Use sentence case for controls: `New list`, not `NEW LIST`.
- Keep primary labels to 1–3 words when possible.
- Treat story reading text as content, not chrome: sentence/paragraph flow is preferable to card snippets.
- Keep metadata brief and scannable: author, read time, date, count.
- Include a clear UI-only/sampled-data note on account dashboards when no private dataset is connected.
- Avoid fake validation claims, user names, and analytics results sourced from an account.

## Do's and Don'ts

### Color

- **Do** reserve green for one main product action and positive growth.
- **Don't** use green as a default link, rail icon, or decorative page background.
- **Do** use warm paper only on the public landing page.
- **Don't** mix cream and white cards unpredictably within a product route.

### Shape

- **Do** use full pills for buttons, search, avatars, and light status forms.
- **Don't** over-round every container; List cards are only 8px.

### Elevation

- **Do** define hierarchy with hairlines and whitespace.
- **Don't** stack shadows under normal cards, metrics, or article content.

### Interaction

- **Do** maintain visible keyboard focus and explicit selected tab state.
- **Don't** make clap, save, or follow depend on an inaccessible icon-only state.

### Layout

- **Do** protect the 700px reading column and fill mobile safe gutters.
- **Don't** turn the product surface into dense dashboard cards or 12-column panels.

### Typography

- **Do** reserve the serif for display/story text and the sans for UI navigation.
- **Don't** force all product headings into serif or set routine body labels in display sizes.

### Motion

- **Do** use quick, local feedback that confirms a click.
- **Don't** animate story content into view or alter scroll position after a control click.

### Components

- **Do** put labels next to ambiguous icon-only controls in documentation and accessible names in runtime.
- **Don't** use copied user thumbnails or audience numbers to make a static UI look authenticated.
