# Consulta de Processos — Extraction Evidence

**Target:** `https://consultadeprocessos.com.br/`  
**Inspected:** 2026-08-29  
**Browser:** Playwright Chromium  
**Viewports:** 1440×960, 768×900, and 390×844 at device scale 1

## Evidence captured

The untouched master captures are `docs/design-references/consultadeprocessos-com-br/original-1440.png` and `original-390.png`. The page has a 70px fixed desktop header (68px at 390px), a 10-section long-form landing page, and a final footer. The desktop content container measures 1336px at a 1440px viewport; phone content uses 20px gutters for a 350px working width.

## Palette and typography

`body` computes to white with `rgb(2, 8, 23)` foreground, `Inter, "Inter Fallback"` at 16px/24px. The primary hero `h1` computes to 48px/55.2px, weight 700, and -0.96px tracking. The page pairs slate neutrals (`#020817`, `#334155`, `#64748b`, `#94a3b8`, `#e2e8f0`, `#f1f5f9`) with teal actions and gradients (`#14b8a6` to `#0f766e`).

The exact Inter WOFF2 preloaded by the target is mirrored in `public/clones/consultadeprocessos-com-br/fonts/inter-latin.woff2`; it is the only visible font family. The target's source also loads a local color logo, court logos, a person photo, state flags, user avatars, soft effect SVGs, favicon, and Open Graph image. Those assets are retained under the clone prefix.

## Layout and responsive evidence

- 1440px: full navigation, 1336px container, 2-column hero, 3-column feature grid, sticky intro/sidebar blocks, and a desktop workflow card.
- 768px: court-logo rail returns; most section groups become one or two columns while large desktop typography has not yet fully engaged.
- 390px: court-logo rail is hidden; navigation condenses to brand, Entrar, and a 36px menu control; hero, CTAs, features, workflow, industry cards, CTA, FAQ, and footer stack. The 5-card industry list is no longer controlled by a visible sidebar.

## Motion and interaction evidence

The page is **moderate** motion. `html` uses smooth scrolling. A desktop navigation dropdown opens below “Consulta Processual” over 200ms. The mobile menu opens below the fixed header. The teal risk-card deck advances automatically and has four dot controls; cards change rank/scale/offset over a 300ms transition. The industry sidebar is scroll-driven on desktop: it is sticky at 112px and its 2px teal progress segment updates as each of the five content cards crosses the viewport. FAQ rows use Radix-style accordion transitions (0.15s cubic-bezier transition; 0.2s `accordion-down` animation) and change the active question to teal.

No canvas, WebGL, Lottie, video, Lenis, or Locomotive signal was observed. The moving court-logo rail is decorative and can be represented by a CSS marquee without a client framework.

## Confidence and boundary

Every identity, palette, font, container, spacing, radius, and interaction token in `tokens.source.json` is observed from computed styles or direct bounding boxes, except `--accent-active` and `--focus-ring`, which are explicitly marked derived. The clone intentionally keeps CTA destinations as safe local anchors (`#cadastro` / `#contato`) rather than reproducing remote application navigation or authentication.

## Downloaded asset inventory

- 1 SVG brand logo, 3 effect SVGs, 1 favicon, and 1 OG image.
- 2 hero portraits, 8 court logos, 2 state flags, and 5 user-avatar images.
- 1 local Inter WOFF2 file.

All local URLs are namespaced as `/clones/consultadeprocessos-com-br/...`.
