# The Complete Shelf Design System

## 1. Personality

The Complete Shelf is tactile, quiet, literary, and spatial. It should feel
like an independent press catalog translated into a physical room: warm paper,
dark wood, finely printed cloth, and abundant negative space. Controls remain
precise and modest so that the shelf stays dominant.

## 2. Color Roles

Cream paper (`--bg`) is the continuous canvas. Lifted UI uses a lighter paper
surface, while deeper paper separates lower bands and inspection transitions.
Near-black warm ink provides the primary text. Terracotta is scarce: it marks
focus, recovery, or an intentional action rather than decorating every
component. Individual book palettes remain asset-owned.

## 3. Typography

Newsreader Variable is the editorial display and reading face. It carries book
titles, authors, descriptions, quotations, and metadata values. Inter Variable
is the operational face for wordmarks, counters, controls, status, and input
hints. Display titles use compressed leading and tight tracking. Sans labels
are small, uppercase, and widely tracked.

## 4. Spacing and Layout

The experience fills the viewport instead of using vertical sections.
Horizontal and lower-edge gutters scale from 18px on phone to 56px on large
desktop. Hairlines and small gaps organize the UI; major separation comes from
negative space rather than container cards. The Three.js subject may cross
through empty layout regions but must not compromise control readability.

## 5. Components and States

Core components are the wordmark, browse caption, previous/next controls,
nineteen-position index, live status, inspection details, and loading/error
surface. Every active state has semantic HTML feedback. Hover changes are
subtle in scale or arrow position. Selected markers grow in height rather than
changing color alone. Disabled controls remain legible at reduced opacity.

## 6. Three-Dimensional Art Direction

Mint-generated cloth hardcovers are the primary authored surfaces. Preserve
their PBR materials. A hand-authored continuous walnut shelf establishes scale
and provides a warm grounding plane. Use one broad key, quiet fill, rim
separation, and soft contact shadows. Avoid bloom, glossy plastic replacement
materials, deep cinematic fog, or ornamental particles.

## 7. Motion and Camera

Movement uses damped, editorial easing. Browse motion is horizontal and snaps
to the closest catalog position. Inspection moves one volume forward and hands
camera ownership to bounded orbit controls. Presentation transforms never
overwrite the canonical imported model transform. Reduced motion preserves
every mode change with almost immediate interpolation.

## 8. Responsive Behavior

Desktop reserves the right side for inspection copy. Phone keeps the selected
book in the upper viewport and turns details into a bottom sheet. Edition copy
and desktop input hints disappear before controls or catalog context. Touch
targets expand without visually inflating the design.

## 9. Accessibility

The canvas has an application label and keyboard instructions, but no essential
action is canvas-only. All nineteen catalog positions are buttons. Selection
and mode changes are announced through a live region. Focus rings use the
terracotta accent with sufficient offset. Unsupported WebGL and failed model
loads expose an actionable semantic fallback.

## 10. Anti-Patterns

- Do not include Mint provider branding or generation IDs in the product UI.
- Do not introduce a generic dashboard, navbar, glassmorphic card stack, or
  permanent sidebar.
- Do not replace generated cloth/foil materials with runtime colors.
- Do not make orbit controls active while shelf browsing owns the camera.
- Do not use bloom, particles, or noisy shaders to compensate for weak framing.
- Do not call MCP or generation endpoints from browser code.

