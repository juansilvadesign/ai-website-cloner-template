# Spaceship homepage topology

Source: `https://www.spaceship.com/`, captured on 2026-08-28. The direct browser visit returned Cloudflare HTTP 403; the rendered public HTML, public stylesheet, asset CDN, and a rendered desktop pageshot are retained in `raw/` and `docs/design-references/spaceship-com/`.

| Order | Region | Desktop composition | Phone composition | Primary evidence |
| --- | --- | --- | --- | --- |
| 1 | Announcement + header | 32px promo strip, compact logo left, four nav links, two utility actions right | Promo remains; logo and menu trigger replace links | rendered hero pageshot, `raw/homepage.css` |
| 2 | Hero search | 175vh black/blue cinematic field, oversized centered title, Register/Transfer segmented picker, broad search control and offer chips | Tall blue field, stacked picker/search and a compact builder card | `raw/homepage.css` hero rules, real layered hero assets |
| 3 | Benefit stories | Three viewport-scale editorial image panels with large bottom-aligned story copy | Three normal-flow image panels; text is never hidden by scroll staging | public benefit images, `raw/homepage.css` benefit rules |
| 4 | Product grid | Dark rounded section, one full-width lead card followed by a two-column set of dark product cards | One-column cards | rendered HTML product copy and source grid rules |
| 5 | Unbox | Centered explainer with four numbered connection steps | Four stacked steps | rendered HTML |
| 6 | Alf | Black cinematic video card and a simple invitation to the AI assistant | Same media card and reduced copy scale | public `alf-desktop.mp4` |
| 7 | Launchpad | Blue command-palette-like feature panel | Blue stacked panel and full-width shortcut | rendered HTML |
| 8 | Security | Large saturated-blue editorial panel with a person cutout and CTA | Same panel, portrait moves below copy | public `security-person.webp`, source security rules |
| 9 | Management tools | Six quiet outlined feature cards in a 3×2 grid | One-column cards | rendered HTML |
| 10 | Testimonials | Heading plus short review cards and ratings | Stacked review cards | rendered HTML; dynamic review provider omitted |
| 11 | FAQ | Spacious bordered accordion with plus/minus affordance | Full-width accordion with the same control target | rendered HTML, source FAQ transitions |
| 12 | Footer | Subscription row followed by six-column navigation and accreditation strip | Subscription first, stacked navigation groups | rendered HTML |

## Layout invariants

- The visual field is almost entirely black (`--bg`) and charcoal (`--surface`) until a deliberate electric-blue interlude.
- Desktop content is constrained to a 1280px shell with approximately 64px side gutters; phone gutters are 20px.
- Large marketing headings use a bold, tight, negatively tracked sans; source desktop hero and story titles are approximately 72px.
- Rounded rectangles are generous (24–32px), with very quiet white inset borders rather than bright outlines.
- Hero, stories, security, and Alf rely on full-bleed media. The clone uses downloaded source assets only and keeps every path under `/clones/spaceship-com/`.
- The source uses extended sticky scroll sequences. The clone retains their visual scale on desktop but falls back to normal-flow panels on smaller screens and when motion is reduced.
