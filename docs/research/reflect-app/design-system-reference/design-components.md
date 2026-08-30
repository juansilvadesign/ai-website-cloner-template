> Component contracts build on [design.md](design.md) and must follow [design-guidelines.md](design-guidelines.md). Use [Reflect tokens](../../../../design-systems/reflect-app/tokens.css) rather than duplicated literals.

# Reflect component reference

## Actions

### Primary CTA

| Property | Contract |
| --- | --- |
| Purpose | Direct the visitor to sign up or begin using the product |
| Anatomy | Short verb label in a pill-shaped link/button |
| Rest | `--accent` fill, `--accent-on` label, no heavy shadow |
| Hover / focus | Brighten toward `--accent-hover`; show `--focus-ring` for keyboard |
| Size | 14 px Inter medium; 8–12 px vertical and 16–20 px horizontal padding |
| Use | Header, pricing plan, final CTA |

### Secondary text action

Quiet navigation or sign-in action. Use body font, no contained fill, and a modest foreground brightening on hover. It must still receive the same visible focus treatment as the primary CTA.

### Icon action

For menu, close, or product-video play. Use a labelled native button, at least 44 px target size, circular or compact square shape, and avoid icon-only actions when the purpose cannot be inferred from surrounding text.

## Input

### AI prompt reveal

| Property | Contract |
| --- | --- |
| Purpose | Demonstrate an AI response in place |
| Element | Native `button`, not a generic div |
| Rest | 24 px glass card with title, green invitation cue, and question |
| Active | Response and shortcut chips appear; parent state exposes `aria-expanded=true` |
| Motion | 300–450 ms opacity/height reveal using `--ease-standard` |
| Accessibility | Response marked hidden until active; keyboard toggles it naturally |

This is a marketing demonstration, not a free-form text input. Do not make it look like an editable field unless implementing the actual editor behavior.

## Navigation

### Global header

Fixed 88 px row with logo, meaningful section anchors, sign-in, and one primary CTA. Background is dark translucent with a backdrop blur, not a solid app chrome. On phone widths, replace the horizontal nav with a labelled expandable drawer; retain all destination links.

### Anchor link

Use native anchors for in-page areas such as AI, Integrations, Pricing, and About. Keep IDs attached to semantic sections. Scrolling may be smooth only if reduced-motion is respected.

### Footer link group

Use a small group title with a vertical list of text links. Keep labels short; use muted copy in rest state and brighter foreground on hover/focus. Stack groups naturally at phone width.

## Containment

### Glass card

The system’s core container: dark translucent surface, 1 px `--border`, 24 px outer radius where it frames a major story, and a subtle inset ring. Use it for AI, pricing, testimonial, or hero-media frames. Its surface must be restrained enough that it still feels connected to the space behind it.

### Product media frame

Large hero-specific glass card. It has an 8 px inner inset, 24 px outer radius, local product image/video, a bottom fade into the canvas, and a centred play affordance. It is a focal object, so it may use a deeper shadow than ordinary cards.

### Modal video dialog

Native dialog, medium-dark surface, 24 px radius, translucent border, visible close button, and dark blurred backdrop. Content is responsive to the viewport and never exceeds its usable bounds.

## Data Display

### Feature matrix

An informational grid of compact benefit articles. Borders create the matrix; large fills and extra cards should not. On desktop it can span several columns; on phone it converts to a readable stack.

### Capability grid

Five AI feature articles with a small symbolic icon, label, and subordinate explanation. Desktop uses a deliberate asymmetric third-row span; phone uses a simple single column. The icon identifies category, not status.

### Pricing plan

A single comprehensive plan article. Emphasize the numeric price and cadence, then show compact included-benefit lines. Avoid tabs or multiple-plan comparisons unless the underlying offer truly requires them.

### Testimonial card

Static quote, clear attribution, and quiet metadata. Two-column desktop flow, one-column phone flow. Do not use carousel controls, timed transitions, or truncation.

### Story diagram

Decorative but informative support for the Connected, Research, Encryption, Meetings, Integrations, About, and Academy stories. It may use CSS nodes, graph lines, a radar field, a lock, a calendar, a globe, or tiles. The text block must remain sufficient without it.

## Feedback

### Hover and focus feedback

Use a slightly brighter lavender border, surface, or glow; avoid aggressive colour flips. Every interactive component has a real focus-visible state based on `--focus-ring`.

### Semantic feedback

Use `--success` for the small positive AI cue. Reserve `--warn` and `--danger` for future real status or error feedback; do not decorate marketing copy with them.

### Reduced-motion feedback

When motion is reduced, retain the final state immediately: active AI answer remains visible after activation, dialogs still open, and focus remains clear. Only the flourish is removed.

## Assembly examples

- **Hero:** announcement pill + display copy + decorative cosmic layer + product media frame + icon action.
- **AI:** section header + prompt reveal + capability grid.
- **Pricing:** display heading + single pricing plan + primary CTA.
- **Closing CTA:** high-contrast contained message + primary CTA; it should be the strongest action treatment outside the header.
