# Adspirer interaction and motion inventory

Evidence was collected from the live page and saved in `raw/`. This clone preserves the user-visible controls with progressive enhancement.

| Surface | Observed behavior | Clone behavior |
| --- | --- | --- |
| Desktop Product / AI platforms / Ad platforms nav | Click opens a floating mega-menu; trigger gains `is-open` and `aria-expanded=true` | Functional lightweight popover, closes on outside click and Escape |
| Mobile menu | Menu button opens a full navigation sheet with an explicit close button | Functional dialog-like sheet, focusable close control, closes on Escape |
| Hero source selector | Claude, ChatGPT, and Slack choices alter the synthetic work area | Functional tabs replace the visible demo copy and tone; the original long autoplay is represented by its finished state |
| Primary CTAs | `0.5s ease-in-out` scale-to-0.97 hover press | Same non-layout-shifting press response; disabled for reduced motion |
| Workspace platform tabs | Active blue pill switches setup guide content | Functional client-side tab list with `aria-selected` state |
| Platform logos | Duplicated horizontal marquee loops on a 40-second linear cycle | CSS marquee; stops under `prefers-reduced-motion` |
| Benefit cards | Source uses scroll-driven reveal/staging | Accessible static sequence with reveal-on-enter only; all content remains visible without JavaScript |
| Pricing billing picker | Annual default; Monthly changes values and savings labels | Functional annual/monthly segmented control. Annual remains default |
| Scroll entrances | Source uses opacity and vertical movement as sections enter | Static-first content remains visible in all render paths; no section depends on an intersection event to appear |

## Motion tier

**Moderate.** Motion guides attention but carries no critical information. The clone observes `prefers-reduced-motion: reduce`, removes transitions and animation, and leaves all controls and content intact.

## Expected control states

- Header popovers never obscure the trigger and use a visible focus outline.
- Mobile navigation has a semantic `aria-expanded` relationship to its panel.
- Hero and workspace controls use buttons, not links, because they alter in-page state.
- Billing control is a labelled radiogroup-style segmented control. Plan prices update together.
- External source-related actions retain their external URLs; internal section links point to `/adspirer-com/#…`.
