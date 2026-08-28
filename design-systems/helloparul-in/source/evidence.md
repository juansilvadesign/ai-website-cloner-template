# Hello Parul extraction evidence

## Provenance

- Source URL: `https://helloparul.in/`
- Fetch timestamp: 2026-08-27
- Renderer: Chromium through the workspace’s Playwright MCP configuration
- Resting-state delay: 8.2 seconds, allowing the source splash to complete
- Master captures: `docs/design-references/helloparul-in/original-1440.png` and `original-390.png`
- Raw source and response headers: `docs/research/helloparul-in/source.html` and `source-headers.txt`

## Extraction method

The target emits exact inline styles in `source.html`; those values were checked against the rendered DOM at 1440×1000 and 390×844 through Playwright. The browser record is summarized in `docs/research/helloparul-in/browser-evidence.json`, while accessibility snapshots and interaction-state screenshots are retained beside the master captures.

## High-confidence source facts

- Cream canvas: `#F2EEE3`; ink: `#181510`; primary red: `#FF3B1F`; yellow hero mark: `rgb(255,200,61)`.
- Fonts requested by the target’s Google Fonts link: Bricolage Grotesque, Instrument Sans, and Space Mono.
- Desktop shell: `max-width:1280px; padding:0 32px`; phone shell: 22px gutters at ≤760px.
- Hero: 88px top / 56px bottom desktop padding, Bricolage 800, `clamp(44px,8.4vw,118px)`, `.94` line-height, `-.035em` letter spacing.
- Featured card: `2px solid #181510`, `26px` radius, `#FBF9F3` surface, 28px row gap.
- Home page length: 3569px at desktop and 3558px at phone after the splash completes.

## Derived contract entries

`--accent-active`, `--focus-ring`, `--motion-fast`, and the unused small radius bridge are explicitly marked `derived` in `tokens.source.json`. They are conservative contract values, not claims that the source rendered a different visual state.

## Uncertainty and exclusions

The target’s `style-hover` runtime does not produce a hover-capable media environment in isolated headless Chromium. Its explicit `style-hover` declarations are therefore used as the authoritative state specification. The target has no authored title or description meta tag; the clone gives its scoped layout descriptive metadata without claiming it was upstream-provided.
