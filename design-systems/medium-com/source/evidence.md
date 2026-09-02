# Medium UI evidence and constraints

## Capture conditions

- Target URLs: public homepage, one story route, `/me/lists`, and `/me/audience`.
- Date: 2026-09-01.
- Browser backend: Playwright Chromium at 1440 × 900, 768px, and 390px checks requested by the clone protocol.
- Authentication: the supplied Netscape cookie jar loaded 12 cookies into the Playwright context without exposing their values.

## Access result

Medium returned Cloudflare 403 to both the authenticated Playwright browser and a cookie-bearing standard HTTP request. The public web fetch could read public markup for the homepage and story, but authenticated routes redirected or failed. No account-specific content, credentials, browser storage, or response bodies are persisted in this package.

## Public reference evidence

Publicly reachable reference screenshots establish the visual language: a warm paper homepage with a huge black serif headline and green collage; the internal Lists screen with a narrow left rail, an outlined list panel, and green `New list` action; and the Audience screen with large black metrics and green positive deltas. The article markup establishes the source story title, author row, reading duration, tool labels, and long-form structure.

## Confidence policy

The design system uses `derived` confidence for visual values because Cloudflare prevented computed-style inspection. Values are not claimed to be exact source CSS. They are sufficient for a static UI-only reconstruction and remain isolated in the token source for later re-emission after a human browser capture.

## Asset policy

No original Medium image, avatar, or private list thumbnail is bundled into the runtime. The clone uses CSS editorial collage shapes and generated neutral thumbnail blocks so it reproduces UI structure without copying account media or full article text.
