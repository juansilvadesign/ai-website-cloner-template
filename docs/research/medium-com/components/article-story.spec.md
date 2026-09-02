# ArticleStory specification

## Overview

- **Target file:** `src/clones/medium-com/components/ArticleStory.astro`
- **Screenshot:** `docs/design-references/medium-com/public-story-ui-reference.jpeg`
- **Interaction model:** click-driven lightweight story tools

## DOM Structure

`article > publication row + topics + h1/dek + author row + tool strip + abstract media + reading content + subscribe + repeated tool strip + author card + responses stub`.

## Computed Styles (reconstruction values)

### Reading column

- width: 700px maximum
- display title: 48–62px clamp, serif, `1.04` line height, `-.045em` tracking
- dek: 20px, gray, 1.58 line height
- body: serif, 20px desktop and 16px mobile, 1.58 line height

### Metadata and tools

- author avatar: 32px circle
- tool strip: 1px #f2f2f2 top/bottom border; 12px vertical inset
- tool labels: gray 14px, ink on hover
- follow: outlined 32px pill

### Media and end sections

- CSS abstract media: max 380px tall, can bleed past the reading width
- subscribe: outlined panel, 32px internal padding
- author card/responses: top hairline and generous 32px+ separation

## States & Behaviors

- Follow: `Follow → Following` on click.
- Clap: 43 incremented after each click; active ink state.
- Save: outline glyph toggles to filled heart glyph.
- All source article paragraphs beyond title/metadata are intentionally replaced by sample copy.

## Assets

No source article photo, author image, or content media. The media placeholder is CSS-only.

## Text Content (verbatim UI labels)

The supplied source route title, publication label, author name, `9 min read`, `Follow`, `Subscribe`, and `Responses (43)` establish the UI reference. Sample prose is not a transcription of the source story.

## Responsive Behavior

- **Desktop:** full 700px reading column, artwork bleeds 48px per side.
- **Tablet:** keeps the column and hides rail through AppShell.
- **Mobile:** artwork moves to 20px viewport-edge bleed; subscription form stacks; end card wraps.
