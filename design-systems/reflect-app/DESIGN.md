# Reflect Design System

## 1. Personality

Reflect is a quiet, spacious note-taking universe. It uses an almost-black violet
canvas, pale lavender type, and narrow luminous borders to make software feel
private, intelligent, and slightly cosmic. The visual emphasis comes from a few
large display lines and glowing diagram moments—not from dense cards or chrome.

## 2. Color Roles

`--bg` is the uninterrupted midnight-violet field. `--surface` and
`--surface-warm` are glass-like layers with very little contrast. `--fg` is an
off-white lavender, while `--muted` and `--meta` deliberately soften supporting
copy. Purple has a specific job: a primary action, an AI/result state, or the
halo inside the “second brain” visual language. Hairline `--border` lines draw
structure without turning the page into a dashboard.

## 3. Typography

AeonikPro Medium carries display text at a 72/80 desktop hero scale, 56/64 for
sections, and 48/56 for the pricing moment. Inter V handles all navigation,
reading copy, controls, labels, and the miniature note interface. Headings are
tight and calm; labels remain sentence case. Avoid all-caps product copy and
avoid a second display family.

## 4. Spacing and Layout

The broad desktop rhythm uses a 1200px content band and intentional blank space
around each conceptual section. The header lives 72px from desktop edges and
20px from phone edges. Major story panels are centered; paired benefit cards
split into two columns only when the viewport gives them enough air. Use 24px
or 32px card insets, and preserve the page’s large vertical rests on phones.

## 5. Surfaces and Components

The shared component vocabulary is: a frosted 8px action button; bordered pill
badge; glass-frame product demo; barely-there grid card; AI prompt panel; icon
benefit cell; long-form testimonial card; and simple newsletter input. Large
interactive frames use 24px radius plus an inset ring. A vertical one-pixel
divider is usually enough to organize sibling cells.

## 6. States and Interaction

Buttons brighten toward `--accent-hover` and may gain a lavender ring. The AI
demo begins as a question and expands into an answer after activation. Navigation
is fixed with a translucent 16px backdrop blur at all scroll positions. Product
links are real anchors; in-page links use smooth scroll. When a control changes
content, preserve the content in the server-rendered DOM and enhance it with a
small script.

## 7. Motion

The source uses a 300ms to 450ms interval with
`cubic-bezier(0.6, 0.6, 0, 1)`. Small stars, rings, radial scan lines, and the
purple event horizon create atmosphere. Recreate only the legible core in CSS:
glow pulses, a halo drift, and a prompt-to-answer fade. Respect reduced-motion
preferences by presenting final states with no animation.

## 8. Responsive Behavior

Desktop keeps the navigation capsule centered, four feature cells in a row, and
three AI capability cells across. At tablet widths, visual diagrams simplify and
two-column groups may remain paired. On phones, the header reduces to identity
and compact actions, all grids become one column, hero display text shrinks to
40px, and the product demo crops safely inside its frame.

## 9. Accessibility

Pale text must keep enough contrast against `--bg`; do not use `--meta` for
essential information. Interactive demo triggers require buttons, readable
labels, focus rings, and pressed state. Decorative stars and diagram lines are
hidden from assistive technology. The modal-style demo fallback must close via
Escape if one is supplied. The newsletter retains a real label or an equivalent
accessible name.

## 10. Anti-Patterns

- Do not put bright purple behind every card.
- Do not replace the spacious story layout with a generic SaaS dashboard.
- Do not make muted lavender the primary reading color.
- Do not add heavy shadows where the source uses a one-pixel glass edge.
- Do not let animation hide text, change document order, or block scrolling.
- Do not introduce a parallel color, typography, or spacing source outside the
  emitted token contract.
