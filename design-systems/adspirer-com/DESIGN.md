# Adspirer Design System

## 1. Personality

Adspirer is a calm, technically capable paid-media operator. The visual voice is
spare rather than cybernetic: soft neutral space, large geometric type, concise
operational language, and a single electric-blue action signal. It should feel
like a well-run account review, not an AI novelty demo.

## 2. Color Roles

`--bg` is the continuous cool-gray page field and `--surface` is the clean white
break or panel. Near-black ink carries the hierarchy. Blue is reserved for a
primary action, a selected state, or an important product signal; it should not
become a decorative second background. Orange is an asset-level display
emphasis in the hero/final CTA, not a new component color system.

## 3. Typography

Geist is the display face: normal weight, tight tracking, and 1.2 leading make
headlines feel confident without shouting. Inter supports all reading copy,
buttons, labels, and controls at 16px/1.5 by default. Use the 84px display tier
only for desktop hero moments; phone display compresses to 40px through a
component breakpoint rather than changing the shared token value.

## 4. Spacing and Layout

The layout uses a 1280px maximum container with 80px desktop, 40px tablet, and
20px phone gutters. Sections intentionally breathe: 112px vertical padding on
desktop and 72px on phone. Cards favor 16px corners and a one-pixel quiet ring.
Large hero product screens may use the 20px large radius.

## 5. Components and States

Buttons are 52px-tall filled or outlined controls with an 8px radius. Pill tabs
are the shared language for AI sources and billing states. Product cards are
white, lightly outlined, and rely on internal illustration rather than heavy
shadow. The navigation popover and mobile sheet are explicit open/closed states
with semantic button attributes. Pricing states update all dependent labels at
once.

## 6. Product Surfaces

Workspace panels emulate a clean, trustworthy operational screen: soft white
or warm neutral internal background, small labels, monospace endpoint excerpts,
and status colors used only where they encode meaning. Avoid fake analytics
tables, dense dashboards, ornamental browser chrome, and glass effects that
would compete with the actual campaign-work narrative.

## 7. Motion

Use the standard slow-curved ease for small entrance and press feedback. The
platform belt may run at a gentle 40-second linear pace. Motion must never hide
information or move layout dimensions. Under reduced motion, marquee and
reveals stop and all content is immediately visible.

## 8. Responsive Behavior

Navigation changes at 992px. Desktop grids become a readable single column on
phone, with horizontal-scroll tabs only when tab labels must remain intact.
Phone padding is always at least 20px. Do not force desktop typography or a
four-column price comparison into a narrow viewport.

## 9. Accessibility

Use real buttons for state-changing controls and visible focus rings. Labels,
price changes, and campaign statuses must not be communicated by color alone.
Popovers and navigation sheets close with Escape and keep an explicit close
control. Blue-on-white and white-on-blue copy need robust contrast; muted text
is reserved for nonessential support information.

## 10. Anti-Patterns

- Do not use blue as a generic page background outside the focused Ask AI card.
- Do not add gradients behind every card or multiple competing accent colors.
- Do not replace roomy product marketing composition with a generic SaaS dashboard.
- Do not render the AI demo as an uncontrolled, inaccessible autoplay sequence.
- Do not remove the mobile navigation close action or price-toggle semantics.
- Do not hardcode a parallel color, spacing, or font system outside `tokens.css`.
