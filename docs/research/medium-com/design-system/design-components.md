# Medium UI Components

> Full specifications for 11 recurring components. For tokens see [design.md](design.md). For rules & accessibility see [design-guidelines.md](design-guidelines.md).

## Actions

### Public CTA

**Types:** Black filled public action.

| Property | Value |
| --- | --- |
| Height | 50px |
| Width | 190px minimum |
| Radius | Full |
| Label | 16px / 620 |
| States | Rest, hover, focus |

**Do:** use `Start reading` for the single public CTA.

**Don't:** introduce competing green marketing buttons.

---

### Product Primary Button

**Types:** Green filled action such as `New list`.

| Property | Value |
| --- | --- |
| Height | 50px |
| Radius | Full |
| Label | 20px / normal |
| States | Rest, hover, focus, unavailable |

**Do:** place it at top-right of a bounded page action group.

**Don't:** duplicate it inside every list card.

---

### Secondary Outlined Button

**Types:** Follow, metrics/action links, View list.

| Property | Value |
| --- | --- |
| Height | 32–40px |
| Border | 1px ink |
| Radius | Full |
| Hover | Ink fill with white label |

**Do:** use it for a secondary outcome.

**Don't:** add shadows or green borders.

---

### Icon Button

**Types:** Clap, response, save, share, notification, more.

| Property | Value |
| --- | --- |
| Icon | 20–24px single-color line/glyph |
| Hit target | 40×40px minimum |
| Radius | Full only on hover surface |
| Label | Accessible name required |

**Do:** preserve a clear count beside claps/responses.

**Don't:** represent feedback solely by an unannounced color change.

## Input

### Search Field

| Property | Value |
| --- | --- |
| Height | 40px |
| Width | 240px max |
| Background | Soft border gray |
| Radius | Full |
| Icon | 20px left-aligned |

**Do:** hide visually on narrow mobile when search is not in scope.

**Don't:** remove the accessible field label.

---

### Subscribe / List Form Field

| Property | Value |
| --- | --- |
| Border | 1px border gray |
| Radius | 4px |
| Padding | 12px |
| Label | Visible in dialog; visually-hidden allowable for compact subscribe field |

**Do:** make text input width flexible.

**Don't:** create validation or persistence UI without a scoped backend.

## Navigation

### Public Header

| Property | Value |
| --- | --- |
| Height | 72px desktop / 56px mobile |
| Canvas | Warm paper |
| Rule | 1px ink bottom border |
| Wordmark | Serif, 32px desktop |

**Do:** collapse to a native-details menu on mobile.

**Don't:** introduce a hamburger menu at desktop.

---

### Product Shell

| Property | Value |
| --- | --- |
| Desktop rail | 72px fixed |
| Topbar | 56px fixed |
| Mobile nav | 64px fixed bottom |
| Active marker | Ink icon / `aria-current=page` |

**Do:** retain the product shell across article, Lists, and Audience.

**Don't:** let main content slide underneath the bottom navigation.

---

### Tabs

| Property | Value |
| --- | --- |
| Label | 16px |
| Gap | 24px |
| Inactive | Muted ink |
| Active | Ink + 2px underline |

**Do:** update `aria-selected` with state.

**Don't:** turn tabs into nested routes in this limited clone.

## Containment

### List Card

| Property | Value |
| --- | --- |
| Border | 1px gray |
| Radius | 8px |
| Desktop min height | 260px |
| Structure | Copy 1fr / generated cover 43% |

**Do:** let typography and sparse controls do the work.

**Don't:** import account thumbnails or add prominent shadows.

---

### Native List Dialog

| Property | Value |
| --- | --- |
| Width | 420px maximum |
| Radius | 12px |
| Padding | 32px |
| Backdrop | 38% ink mix |

**Do:** use `method=dialog` and Escape close behavior.

**Don't:** create a custom overlay that loses focus containment.

## Data Display

### Author Row

| Property | Value |
| --- | --- |
| Avatar | 32px monogram circle |
| Name | 14px strong |
| Metadata | 12px muted |
| Follow | 32px outline pill |

**Do:** keep metadata in a compact single line where possible.

**Don't:** duplicate user profile data outside the scoped static sample.

---

### Audience Metric

| Property | Value |
| --- | --- |
| Label | 12px uppercase muted |
| Value | 48px / 740 |
| Delta | 14px green link |
| Grid | 3 desktop, 2 tablet, 1 phone |

**Do:** annotate sample values as UI-only.

**Don't:** copy real followers, subscribers, or earnings.

---

### Growth Chart

| Property | Value |
| --- | --- |
| Rendering | Static SVG polyline |
| Gridline | Soft gray 1px |
| Series | Green 3px line |
| Accessibility | `role=img` descriptive label |

**Do:** treat it as a visual hierarchy cue.

**Don't:** imply live analytics or offer data drilldown.
