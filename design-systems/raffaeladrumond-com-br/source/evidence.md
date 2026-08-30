# Dra. Raffaela Drumond — Extraction Evidence

**Target:** `https://raffaeladrumond.com.br/`  
**Inspected:** 2026-08-30  
**Method:** Browser capture at 1440×960 and 390×844, source HTML, authored Elementor CSS, and downloaded first-party assets.

## Evidence boundary

The target returned a complete public HTML document and first-party asset URLs through curl. A later Playwright retry loaded the live target and produced untouched full-page masters at docs/design-references/raffaeladrumond-com-br/qa/original-1440.png and original-390.png; the configured viewports were 1440×960 and 390×844. Dimensions, text, authored selectors, responsive rules, and interaction scripts below were extracted from the target's delivered HTML/CSS/JS, with the captures used to verify the rendered hierarchy.

## Visible system

The document declares Brazilian Portuguese and the title “Dra Raffaela - Dra. Raffaela Drumond”. It uses the Adobe Typekit family `ivypresto-display` for editorial/display copy and locally served Poppins weights for UI/body copy. Its repeated palette is warm off-white `#F9F9F9`, white, olive `#3C4128`, dark forest `#1E230F`, muted sage `#7D8264`, and CTA sage `#8C916E`.

The authored Elementor kit sets display headings at 64px with 300 weight on desktop. The hero is authored at 950px minimum height with 180px top padding; its content wraps in a 1200px container. Sections predominantly use 90px desktop vertical padding, while the source's phone media queries reduce content gutters to 20px and stack editorial/image pairs.

## Interaction and motion

The source defines a full-screen menu overlay (400ms opacity), smooth anchor navigation, hover-elevated CTA buttons, scroll-in reveal classes, a testimonial widget carousel, and openable treatment/protocol disclosures. The clone mirrors these with a native menu, native `details` disclosures, CSS hover/focus states, and an IntersectionObserver reveal enhancement. It intentionally does not reproduce the opaque third-party Trustindex embed; testimonial content is rendered locally and semantically.

## Asset inventory

The first-party WordPress uploads include the logo, hero, treatment, doctor, clinic, protocol, and contact imagery. Four Poppins WOFF2 assets are mirrored locally. The Typekit stylesheet remains an external licensed stylesheet rather than being copied or rehosted. Every local clone asset is namespaced under `/clones/raffaeladrumond-com-br/`.

## Confidence

The token source records only values evidenced in source delivery, plus explicit derived/fallback values demanded by the token contract. The resulting clone targets the original desktop and phone hierarchy and behavior. Side-by-side desktop and phone composites are stored as comparison-1440.png and comparison-390.png, with the original on the left and clone on the right.
