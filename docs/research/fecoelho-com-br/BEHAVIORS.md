# Fernanda Coelho Contact Card — Behaviors

## Motion tier: Light

The page contains no scripts, canvas, video, Lottie, Framer Motion, GSAP, Lenis, Locomotive Scroll, custom cursor, carousel, observer, or timed animation. `document.getAnimations()` returned `0` in every resting capture. The only motion is the links' `150ms ease` transition.

## System color scheme

- **Trigger:** `@media (prefers-color-scheme: dark)`; no manual toggle.
- **Light state:** `#faf8f5` canvas, white surfaces, `#191410` primary ink, `#d1553b` accent.
- **Dark state:** `#0e0c0b` canvas, `#1a1614` surfaces, `#f4efe9` primary ink, `#f0714f` accent.
- **Transition:** none. The target swaps variables immediately when the media query changes.
- **Evidence:** `source.html:24-55`, `original-dark-1440.png`, `original-dark-390.png`, and `browser-evidence.json` states `dark-1440`/`dark-390`.

## Scroll sweep

- At 1440×1000, the document height and viewport height were both `1000px`; attempted bottom scroll ended at `scrollY = 0`.
- The same card fits in the captured 390×844 mobile viewport.
- No sticky/fixed state, parallax, reveal, scroll snap, active indicator, or smooth-scrolling behavior exists.
- In shorter viewports, overflow is ordinary document scrolling; the card is not pinned.

## Contact-link hover

- **Applies:** pointer devices satisfying `@media (hover: hover)`.
- **Trigger:** `:hover` on any `.link`.
- **Shadow:** `rgba(25,20,16,.05) 0 1px 2px, rgba(25,20,16,.06) 0 6px 16px` → `rgba(25,20,16,.04) 0 1px 2px, rgba(25,20,16,.08) 0 12px 32px`.
- **Non-primary border:** `rgb(230, 221, 210)` → `color(srgb 0.864902 0.626667 0.557059)` (the browser-resolved `45%` accent / `55%` line mixture).
- **Primary border:** remains transparent because the later `.link.primary` declaration wins at equal specificity; its shadow still elevates.
- **Transition:** `transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease`.
- **Headless note:** headless Chromium exposes `(hover: none)`. The authored media-query rule was promoted to an equivalent temporary inspection class, then resolved with `getComputedStyle()`; the exact procedure and values are in `browser-evidence.json.interaction`.

## Contact-link active/press

- **Trigger:** `:active` while any contact anchor is pressed.
- **State A:** `transform: none`.
- **State B:** `transform: scale(.985)`; the capture sampled the transition at `matrix(0.985457, 0, 0, 0.985457, 0, 0)` and the authored terminal value is `.985`.
- **Transition:** the same `150ms ease` transform transition.
- **Mobile:** applicable to touch activation because it is not wrapped in the hover media query.

## Keyboard focus

- The target defines no custom focus rule. Chromium supplies `outline: rgb(16,16,16) auto 1px` in the inspected light state.
- The clone preserves native focus behavior and does not suppress the outline.

## Activation outcomes

- **Salvar contato:** downloads `/card/fernanda-coelho.vcf`; the clone serves the same bytes from `/clones/fecoelho-com-br/fernanda-coelho.vcf`.
- **WhatsApp:** opens `https://wa.me/5521998669695` in a new tab with `rel="noopener"`.
- **LinkedIn:** opens `https://www.linkedin.com/in/fernanda-c-dreilich` in a new tab with `rel="noopener"`.
- **Site:** opens `https://fecoelho.com.br` in a new tab with `rel="noopener"`.
- **E-mail:** invokes `mailto:fernandadreilich@gmail.com`.
- These anchors do not reveal or mutate in-page content. External destinations were not submitted or messaged during inspection.

## Timed sweep

No delayed entrance, autoplay, cycling copy, spinner, or network-driven content appeared after font settling and repeated pauses. The page is fully static once fonts and the portrait load.

## Deferred or substituted effects

None. All observed visual and behavioral states are small native CSS effects and are reproduced directly.

## Clone replay verification

- Replayed the assembled clone at `1440×1000` and `390×844` in both light and dark system color schemes.
- The four resting-state comparisons report `0` mean absolute channel error and `0` pixels over the comparison threshold.
- Verified the five contact actions, footer destination, portrait dimensions, native keyboard focus, hover elevation, pressed scale, and the downloaded vCard (`HTTP 200`, `325` bytes).
- Full machine-readable results and capture paths are recorded in `qa-results.json`; paired images are under `docs/design-references/fecoelho-com-br/qa/`.
