# ProblemSolution specification

## Overview

- **Target file:** `src/clones/reworkd-ai/components/ProblemSolution.astro`
- **Screenshot:** `docs/design-references/reworkd-ai/original-section-problem-solution.png`
- **Interaction model:** static, hover-driven browser overlay

## DOM structure

- Full-width cool white/gray/blue/white gradient region.
- Centered problem heading, paragraph, and scattered question bars.
- Solution story: left copy, right source-browser figure, then three equal benefit cells.

## Computed styles

- Problem begins y≈1491 desktop, `Web data is difficult` is Selecta 500 at 40px / 40px and -0.8px tracking.
- Problem paragraph is 592px wide at desktop, 16px / 20px visual rhythm.
- Solution copy sits x=112 / width 345px at desktop; title is Selecta 40px / 44px; right figure is 811×397px at x=518.
- Benefit grid begins y≈2660, 1216px wide, three 309px cells with quiet dividers; title is 18px / 24px.

## States and behaviors

- **Source-browser hover:** local `problem-browser.png` receives an overlay 4px inset, opacity 0→1, 2.5px blur, 700ms ease-in-out.
- **Question fragments:** source uses canvas/type motion. Clone uses still rounded bars, preserving exact question copy in hidden / readable text where needed.

## Assets

- `/clones/reworkd-ai/images/problem-browser.png`
- `/clones/reworkd-ai/images/problem-browser-modal.png`

## Text content

- “Whats the problem?” / “Web data is difficult”
- “Collecting, monitoring, and maintaining data can be complex, time-consuming, and costly. When you have hundreds or thousands of sites to crawl, there’s a lot to consider.”
- Questions include “How do I handle pagination?”, “How do I handle infinite scroll pages?”, “How can I maintain extraction scripts at scale?”, “How do I handle dynamic content?”, and “How do I handle rate limiting efficiently?”
- “How can you solve it?” / “Let Reworkd do the hard work” and the live solution paragraph.
- Benefits: Save time, Save money, Save hassle with their source descriptions.

## Responsive behavior

- **Desktop:** problem centered; solution copy/visual overlap; benefits three across.
- **Tablet:** visual lowers behind the story with no clipping.
- **Mobile:** question bars intentionally overflow/crop like source; source-browser visual is removed and benefits become a single-column text sequence.
