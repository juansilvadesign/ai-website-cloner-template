# Medium UI topology

## Scope

One clone namespace, `medium-com`, serves exactly four selected UI states. It does not reproduce any unlisted nested route, backend call, sign-in state, account data, story recommendation destination, or publishing workflow.

## Route: `/medium-com/`

1. `PublicHeader` is a warm-paper, single-row public navigation shell.
2. `PublicHome` is a two-column marketing poster: headline/call-to-action at left, CSS-only green editorial collage at right.
3. The public footer is a compact rule-separated utility link row.

At desktop the hero is 1fr / 44vw; at 900px it stacks. At 520px the illustration compresses into a shallow decorative band below the copy. The header has a native-details menu only at small widths.

## Route: selected story

1. `AppShell` provides fixed global product header and left rail; a bottom navigation replaces the rail on narrow screens.
2. `ArticleStory` begins with publication row, topics, title, dek, author metadata, and tool strip.
3. A CSS-only abstract visual acts as a non-copied editorial media placeholder.
4. The reading column contains sample prose, headings, and a pull quote.
5. Subscribe, repeated tools, author card, and responses stub finish the page.

The story column is 700px max. The full-bleed image intentionally extends beyond the reading column but not beyond mobile safe gutters.

## Route: `/medium-com/me/lists/`

1. `AppShell` uses the Lists rail state.
2. `ListsPage` has heading + primary green `New list` action.
3. Three tab controls are followed by a screen-reader status line.
4. Three large, bordered collection rows pair text/actions with CSS-generated thumbnail strips.
5. A native dialog holds the UI-only list creation form.

Desktop list cards are text/collage split panels. At phone width they become a stacked cover strip over content, and the tabs are horizontally scrollable.

## Route: `/medium-com/me/audience/`

1. `AppShell` uses the Stats rail state.
2. `AudiencePage` has heading, update note, and two secondary outlined actions.
3. Three typographic metrics establish the primary data hierarchy.
4. A minimal SVG line chart occupies the lower two-column section.
5. A small explanatory information section closes the page.

Metrics form three columns desktop, two columns tablet, and one column phone. The chart is semantic `role=img` and reflows below the intro at smaller widths.

## Shared layers

- Product topbar: fixed 56px white/blurred layer.
- Product rail: fixed 72px white vertical layer with 1px border.
- Product main: natural document flow beneath the topbar.
- Mobile bottom nav: fixed 64px layer with four route links.
- Dialog: native browser modal only; no portal framework or client-only content.
