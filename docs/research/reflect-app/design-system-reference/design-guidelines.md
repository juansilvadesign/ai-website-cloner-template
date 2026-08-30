> Apply these rules with [the visual foundations](design.md) and [component contracts](design-components.md). Canonical variables live in [the generated Reflect tokens](../../../../design-systems/reflect-app/tokens.css).

# Reflect implementation guidelines

## Accessibility

The dark canvas is only successful when every meaningful layer remains legible and operable. Decorative visual intensity must never replace semantic structure.

| Concern | Rule | Practical check |
| --- | --- | --- |
| Landmarks | Use header, main, section, and footer landmarks with useful headings | Screen-reader outline exposes the marketing narrative |
| Contrast | Pair `--fg` / `--fg-2` with `--bg` for important copy; reserve muted text for secondary material | Never put low-opacity text over a moving glow without a stable dark layer |
| Focus | All links and controls show `--focus-ring` | Keyboard navigation has no invisible stop |
| Touch targets | Actions and nav controls have a comfortable minimum 44 px target | Test with a 390 px viewport |
| Motion | Respect `prefers-reduced-motion` | Particle, float, and reveal effects stop or become immediate |
| Dialogs | Use native `<dialog>` or equivalent focus containment | Escape, backdrop, close button, and focus return work |
| Decoration | Mark orbit, grid, globe, star, and radar art `aria-hidden` | No meaningless graphic descriptions appear in the accessibility tree |
| Images | Product screenshots have meaningful alt text; decorative images have empty alt | Alt states what the product screen conveys, not every pixel |

Avoid purely hover-dependent disclosure. The source’s AI demo is a button with an explicit state, which is the correct pattern for content reveal.

## Gestures

Reflect’s marketing interactions are intentionally simple:

- Tap/click activates primary CTAs, opens the video, toggles the AI answer, and opens mobile navigation.
- Backdrop click and Escape dismiss the modal video.
- Anchor links scroll to documented sections.
- There is no swipe carousel, drag canvas, pinching gesture, or mandatory cursor effect. Do not invent them.

When implementing a mobile drawer, make the whole trigger a button with a label; never make a tiny visual glyph the only target. If a product visual gains an optional motion effect, it must be passive and not capture scroll or pointer input.

## Content Design

Use a composed, highly edited voice. Headlines are short statements of capability or reassurance. Supporting paragraphs are one to three sentences with direct product language. Cards use a short imperative or noun phrase followed by a concrete explanation.

Good content hierarchy:

1. An eyebrow or compact product label when it adds context.
2. One prominent display statement.
3. A muted, plain-language clarification.
4. One action or small set of clearly named benefits.

Avoid marketing inflation, all-caps shouting, and over-explaining decorative imagery. The visual space is part of the communication, so copy must earn its place.

### Tone reference

| Do | Avoid |
| --- | --- |
| “Never miss a note, idea or connection.” | Long generic mission statements |
| “Notes with an AI assistant” | Vague hype such as “The future of productivity” |
| “Click to see magic” for an immediate, reversible demo | Hidden mechanics without an instruction |
| Specific benefit labels | Dense feature-taxonomy language |

## Do’s and Don’ts Categories

### Color and surfaces

**Do:** keep the page predominantly `--bg`; let a purple glow concentrate around a focal object; build depth with a 1 px translucent ring.  
**Don’t:** use solid violet panels across full sections, gray dashboard backgrounds, or multiple competing gradient hues.

### Type

**Do:** use Aeonik only for high-value headlines and Inter for operational UI; preserve generous whitespace around display copy.  
**Don’t:** use display type for dense body text, heavy bold everywhere, or large paragraphs centred across the whole viewport.

### Cards and containment

**Do:** make cards feel like glass frames—low-contrast surface, careful radius, and enough internal spacing.  
**Don’t:** add heavy shadows, thick outlines, nested rounded rectangles, or every card as a clickable button.

### Interaction

**Do:** reveal state through content, opacity, border brightness, and a short, predictable transition.  
**Don’t:** use surprise autoplay, non-dismissable overlays, large parallax shifts, or hover-only meaning.

### Responsive composition

**Do:** preserve the story sequence, reduce columns, and retain a sense of vertical pause.  
**Don’t:** hide meaningful feature copy, force tiny desktop diagrams into phones, or allow atmospheric art to create horizontal overflow.

### Assets

**Do:** scope downloaded public assets to `/clones/reflect-app/` and use local fallbacks.  
**Don’t:** hotlink runtime product media or hardcode a source-site path outside the clone namespace.

## Engineering handoff

- Import `design-systems/reflect-app/tokens.css` at the clone root.
- Use custom properties instead of duplicating literal colours and dimensions.
- Make layout-specific values local to components; keep system-wide variables in the generated token package.
- Verify desktop and 390 px visual captures after meaningful changes.
- Treat the visual comparison as a regression artefact, not an instruction to duplicate inaccessible canvas effects.
