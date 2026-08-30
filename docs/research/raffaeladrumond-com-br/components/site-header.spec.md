# SiteHeader

- **Target:** Header shell and fixed menu overlay.
- **DOM:** `header > button[aria-expanded] + a.logo + nav.contact-actions`; overlay has anchor links to all section ids.
- **Evidence:** desktop header sits 30px from the top in a 1200px content rail. It uses the 376×145 local PNG mark (`Group-1707478973.png`) rendered at 188×73, left of the header controls; the menu is three 32×2px dark strokes. Source phone controls are quiet text/icon links, not a filled WhatsApp pill. The overlay uses `#4b4f52` and a 400ms opacity transition.
- **States:** closed, open, keyboard focus, Escape close, compact phone header.
- **Assets/text:** local `Group-1707478973.png`; source phone `(61) 9 99195-497`.
- **Responsive:** on phone, the 88px raster mark sits on the right, the menu retains its 56×61px touch target, and contact links collapse from the header.
