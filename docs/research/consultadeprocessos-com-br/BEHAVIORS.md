# Consulta de Processos — Behavior Evidence

## Motion tier: Moderate

The page has native/CSS interaction and time-driven decoration, but no WebGL, canvas, video, Lottie, GSAP, Framer Motion, Lenis, or Locomotive dependency was found. The static page skeleton is faithful without any framework hydration. Small standard scripts progressively enhance server-rendered content.

## Global behavior

- `html` computes to `scroll-behavior: smooth`.
- Header remains a 70px white fixed bar after scrolling; sampled at `scrollY: 0` and `scrollY: 244` with no visual state change.
- Transition timing on interactive controls is typically `150ms` or `200ms cubic-bezier(0.4, 0, 0.2, 1)`.

## Header dropdown

- **Trigger:** Click desktop “Consulta Processual”.
- **Closed:** dropdown has `opacity: 0`, is non-visible, and is translated slightly upward.
- **Open:** `opacity: 1`, visible, `translate-y: 0`, absolute beneath trigger; outer width 420px, panel 16px radius, `1px #e2e8f0` border, and `0 20px 25px -5px` + `0 8px 10px -6px` slate shadow.
- **Content:** CPF, CNPJ, criminal, and labor process links with title/description pairs.
- **Transition:** 200ms standard easing. Click/outside close is expected.

## Mobile menu

- **Trigger:** 36×36px `Abrir menu` button at 390px.
- **Open state:** label becomes `Fechar menu`; full-width navigation appears directly under the 68px header. It lists the same four product links, then Para empresas / Planos / Blog, and a full-width `Cadastre-se grátis` action.
- **Close:** toggle again or activate a navigation link.

## Court-logo rail

- **Trigger:** time-driven loop on desktop/tablet only (`md` and above).
- **Appearance:** overflow-hidden 90px track with 250px logo cells; left/right 96px white fades.
- **Fallback:** a slow CSS marquee; stop it with `prefers-reduced-motion`.

## Risk card deck

- **Trigger:** timed auto-advance; four 6px dot buttons can select a card.
- **State:** selected card becomes front-most (500×220 desktop / 350×180 phone); the other three sit behind it with 15px desktop / 10px phone steps, diminished scale, and lowered opacity.
- **Transition:** 300ms standard easing. The observed active dot grows from 6px to 24px and becomes white.
- **Fallback:** reduced-motion disables automatic rotation while dot controls stay active.

## Feature cards

- **Trigger:** pointer hover on a desktop card.
- **State change:** its 48px conic-gradient icon ring rotates 90° over 500ms ease-out. Text/card geometry remains fixed.
- **Fallback:** no hover-only dependency on touch.

## Industry scroll rail

- **Trigger:** desktop vertical scroll through the five 413px industry cards.
- **State:** sticky rail remains at `top: 112px`; active label changes from slate-400/400 to slate-900/600 and a 2px teal segment moves in 56px increments.
- **Click:** clicking a rail item smooth-scrolls to its matching card.
- **Phone:** rail is removed and all cards remain visible in source order.

## FAQ accordion

- **Trigger:** click question button.
- **Closed:** `aria-expanded=false`, 63–85px row based on wrapping, slate-800 label, down chevron.
- **Open:** `aria-expanded=true`, label turns teal (`#0f766e`), chevron rotates 180°, answer region expands. The first desktop answer makes its row 130px; animation is `accordion-down` 200ms ease-out with 150ms standard height transition.
- **Content:** all nine answers are recorded in `FaqSection.spec.md` from the source FAQPage schema.

## Deliberate fallback note

The clone retains direct, CSS/native versions of every visible behavior. It does not reproduce analytics, ads, tracking pixels, remote account routes, or authenticated product behavior because these are outside the public visual page contract.
