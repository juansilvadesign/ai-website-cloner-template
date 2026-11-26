# Behaviors — zeromrr-club

**Motion tier: HEAVY (home) / MODERATE (playbook).**

Stack: home = three.js (`three.min.js`, 603 KB) + hand-written game script v3.45 (56 KB) + WebAudio synth (no audio files) + i18n MutationObserver translator. No Lenis, GSAP, Framer, Lottie. Playbook = vanilla IntersectionObserver + CSS keyframes + `<video>` loops.

**Strategy: port, not re-implementation.** Both sites are hand-written static HTML, so the original scripts run unchanged as classic scripts from `public/clones/zeromrr-club/js/` (they share globals — `ZM_SHOP`, `THREE`, `__zq/__zr` — so they are not bundled). Every behaviour below therefore matches the original by construction; QA replayed them.

## Home (game)
- **Boot:** `Press start` blinks (`steps(2)` 1.1s). Click / Enter → title card blooms (blur 14px→0, scale 1.06→1, 1–1.6s), garage `#bg` fades in 1.2s, boot hides, HUD + menu appear. Ad-click visitors (`twclid`, `fbclid`, paid utm) skip the boot. A START pressed before the 1.2 MB page finishes is queued (`boot-early.js`).
- **Menu:** Start / Memory card / Inventory / Options. Arrow keys, hover or tap move `aria-current` (sodium + 6px nudge + diamond). Options: sound, graphics (low = pixelated canvas), etc.
- **Tee select (`body[data-mode=drop]`):** ◀ ▶ and arrow keys cycle 5 tees with URL hash `#<tee-id>`; drag spins the 3D character; zoom 1.0–2.4×; On Hero / Tee only view toggle; Details toggles the dl on short screens (≤900px tall) and phones; size chips (pressed = cream); missing size flashes chips twice; Size guide expands the per-tee chart from `tees.js`; CTA "Pick your size → Pre-order".
- **Memory card dialog:** email form; save bar fills over 1.4s; 3D cube spins 5s.
- **Inspector:** full-screen photo with front/back/side tabs.
- **Responsive:** ≤760px the tee panel becomes a compact bottom sheet, view tools move to `.mtools` top-left, MRR stat hides ≤420px.
- **Language:** EN default; UA via `?lang=uk`, the switch, or a Ukrainian browser (prices stay €).

## Playbook
- `.rv` reveal: opacity 0 / +24px → in, .7s, IO threshold .15. Stats: top bar grows 1.2s + count-up 1.2s ease-out-cubic.
- Phone: 3 muted videos crossfade (.8s) every 6s, view counter updates. Step video lazy-plays at 30% visibility.
- Marquee 38s linear, pauses on hover. Thumbs lift on hover. Cards/tiers lift 3–4px, main tier glows 3s.
- h1 emphasis wobbles 3.2s, phone floats 6s, sticker pops 2.4s, "→" arrows nudge 1.4s, approve box pulses 2s.
- `<details>` FAQ, smooth anchor scroll (`html{scroll-behavior:smooth}`).
- Reduced motion: everything off, `.rv` shown.

## Deliberate differences (clone ≠ original)
| What | Original | Clone | Why |
|---|---|---|---|
| Analytics | `/api/track` beacons (visit, events, JS errors → Telegram) | forced off; error reporter + visit beacon removed | no backend; don't pollute the owner's analytics |
| Home signup | POST `/api/signup`, `/api/confirm` | `endpoint:""` → the script's own built-in demo mode | no backend |
| Playbook forms | POST `/api/digital?a=waitlist|lead` | resolve locally after 400ms (`demoPost`) | no backend |
| Shop / checkout / legal links | relative `/shop`, `/checkout`, `/privacy`… | absolute `https://zeromrr.club/...` | those pages are not cloned |
| Base64 images | 30 webp inlined in HTML/CSS (943 KB page) | extracted to `img/inline/*.webp` | cacheable, editable |
| Fonts | Google Fonts CDN | self-hosted woff2 (latin + latin-ext) | |
| Shared reset | n/a | `src/styles/reset.css` NOT imported | it zeroes UA margins the originals rely on |
| Pre-order state | `tees.js` live value (`sale` on 2026-11-26) | same file, frozen at capture | catalog is a snapshot |

## QA (2026-11-26)
Comparisons in `docs/design-references/zeromrr-club/qa/`: game at 1440 and 390 match except the 3D hero's spin angle (time-dependent); playbook identical at both widths, page heights equal (7403 / 11967 px). Playbook full-page captures force `.rv` visible (a full-page screenshot never intersects them). No page errors, no 404s.
