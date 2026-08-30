# AssessmentCta

- **Target:** Mid-page appointment invitation.
- **DOM:** `section.cta-band > .card > img.portrait + article > h2 + p + a + p.location`, with the secondary photo overlapping the lower left of the card.
- **Evidence:** source is an 808px band at y=9824. A 1400×628px, 19px-round light patterned panel (`Group-1707478999.webp`) sits 20px from either desktop edge. `Rectangle-40926.png` is a 200×88px portrait treatment at the panel top; `Rectangle-40928.png` overlaps below-left at 288×208px. The centered action is 465×96px and sage; it has a circular arrow affordance.
- **Text:** eyebrow “AGENDE A SUA AVALIAÇÃO AGORA”; heading “Cuidar da sua pele começa com avaliação médica”; supporting line “Cada pele exige uma decisão diferente. Aqui, ela é médica.”; action “AGENDAR AVALIAÇÃO MÉDICA”.
- **States:** CTA hover/focus, outbound WhatsApp link.
- **Responsive:** retain the image-over-card hierarchy on phone, reduce the lower overlap, and make the action span the usable width.
