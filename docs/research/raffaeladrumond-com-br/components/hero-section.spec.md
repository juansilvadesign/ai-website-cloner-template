# HeroSection

- **Target:** First 950px photographic impression and conversion message.
- **DOM:** `section.hero > .container > img.identity + h1 + p + a + p.location`.
- **Evidence:** source background is the 1920×950 `Rectangle-10.webp`, not `Frame-50-3.webp`. At 1440px, its content begins at x=130: local `Frame-47.png` renders at 319×61 around y=278; the 64px/69.76px display title begins around y=359; copy is Poppins 24px/36px; and the sage action is 498×96 with 20px corners. The location uses 16px/24px Poppins. The source image fades into the warm ground behind the content.
- **Text:** “Beleza natural com toque de elegância”; “Dermatologia estética com critério médico. Resultados consistentes. Sem excessos.”; “Atendimento personalizado em Brasília”.
- **States:** CTA hover/focus lifts by 1px; reveal-on-entry; no carousel.
- **Responsive:** phone shows the photo crop in the upper ~360px, then the 319px identity graphic and a 34px/37px title. The action is a full 347×80px control with 20px corners and 22px side gutters.
