# Marcos Arruda Portfolio Design System

This package captures the live portfolio at `https://www.marcos-arruda.com/` as inspected on 2026-09-01. It is an editorial product-and-service-design portfolio: black theatrical surfaces, uncompromising square imagery, bright white type, and one acid-yellow annotation color.

## Personality and visual intent

The composition alternates dark, cinematic presentation with calm white reading and gallery bands. It feels more like a printed portfolio than an app: wide images carry the emotional weight, typography is direct and centred only when a statement deserves it, and there is almost no card chrome.

The neon yellow is a precision tool. It highlights a word, a role label, an active navigation link, or a small action. It should never become a broad decorative wash or replace the high-contrast black/white foundation.

## Color roles

`--bg` is pure black and owns the home hero, case-study shells, footer, and full-screen navigation dialog. `--surface` is pure white and owns reading bands, the visible header bar, and both visual-design galleries. `--fg` is therefore the white-surface ink; dark sections use `var(--surface)` for their text.

`--muted` is the soft white used for explanatory text on black. `--meta` is a restrained neutral used only where white would compete with an image. `--accent` is the verified `#eeff03`; its quieter sibling `--accent-hover` mirrors the observed yellow on View Project links.

## Typography

The display system is Space Grotesk, locally mirrored from the target's Wix font files. It drives uppercase case-study names, large project titles, and the home identity. The reading system is the observed Avenir Light family, also mirrored locally, with broad 1.6 leading for long-form research copy.

Scale matters more than decorative font treatment: small labels sit at 12–14px, reading text at 20px desktop, and section statements progress through 38px and 48px. Use normal display tracking and avoid manually condensed or widely letter-spaced headings.

## Layout and spacing

Desktop page content follows an approximately 5vw outer gutter, yielding a measured 1296px footer region at 1440px. The main portfolio does not rely on a fixed content column: hero imagery often fills the viewport, while editorial reading bands constrain text deliberately.

Major desktop bands use a 120px rhythm; tablet reduces it to 88px and phone to 64px. Media grids remain square-edged, with small fixed gaps. On phone, a 12px gutter is the primary alignment edge.

## Components and states

The shared header is a compact two-line identity plus a three-stroke menu control. On black hero media it is an overlay; on white sections it becomes a white bar. The menu opens as a full-screen black dialog, dims the page underneath, shows the hero image faintly, and centres the three giant links: Work, About, Contact.

Case studies share one long-form architecture: fullscreen visual hero, white statement band, brief metadata and research blocks, alternating white/black text panels, selected evidence media, and a next-project link. Portfolio and branding pages use a neutral gallery header followed by square media mosaics. Home uses a media-led hero, a video/project teaser, three project records, a collaboration proof block, and a black contact footer.

## Motion and interactions

Motion tier: **moderate**. The high-priority interaction is the menu dialog, implemented with an opacity/visibility transition. Links use a light colour transition; project tiles gain a subtle translation/underline enhancement. Original Wix media/video playback is retained as native media where available.

No canvas, WebGL, or chained timeline is needed for this reconstruction. The original fashion cinemagraph is represented by its published looping video; all other animation is kept to a short progressive-enhancement layer.

## Accessibility baseline

Every gallery image retains its target-derived alt text where published. The menu is a real labelled button and dialog, closes with Escape, and returns focus to its trigger. White and acid-yellow copy always sits on black; black copy always sits on white. The target's generic decorative SVG lines are replaced with semantic controls and hidden from the accessibility tree where appropriate.

## Fidelity boundaries and anti-patterns

Do not add rounded cards, gradients, soft shadows, dashboard elements, metric counters, or generic portfolio badges. Do not turn the acid yellow into a primary background. Do not replace the square editorial grid with a masonry library that reorders content unpredictably. Do not ship a black-only clone: the white reading and gallery bands are fundamental to the visual rhythm.

The source exposes several historic Wix sitemap entries with generic “Project Name One” content. They remain routable in the clone through one data-driven detail template, but should not be mistaken for the three authored case studies.
