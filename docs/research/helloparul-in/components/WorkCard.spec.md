# WorkCard Specification

## Overview

- **Target file:** `src/clones/helloparul-in/components/WorkCard.astro`
- **Reference:** master desktop/mobile captures; `source.html:184-297`
- **Interaction model:** click-driven route navigation and pointer hover

## DOM Structure

The entire card is one anchor/article semantic unit. `div.work-card__grid` holds a padded copy column and an image wrapper. The second card uses the `reverse` modifier at desktop only. The copy includes topic chips, h3, description, metrics, and an underlined route prompt.

## Computed Styles

- Card: 2px solid `#181510`, 26px radius, hidden overflow, `#FBF9F3` surface, 28px bottom gap, pointer cursor.
- Grid: `1.15fr .85fr` (or `.85fr 1.15fr` reverse). Copy uses `44px 44px 40px` padding.
- Chips: flex wrap, 8px gap, Space Mono 12px, 22px bottom margin. Primary client chip has ink fill/cream text; category chips use 1px translucent ink edge.
- Title: Bricolage 800, `clamp(28px,3.3vw,42px)`, 1.02 leading, `-.025em`, 18px bottom margin.
- Description: 17px, 1.55 leading, `#3A352C`, 48ch maximum.
- Metric row: flex wrap, 34px gap, `30px 0 8px` margin; numbers Bricolage 800 34px, `-.02em`; labels Space Mono 11px.
- Route prompt: Space Mono 700 14px, 22px top margin, 2px red underline + 3px underline padding.
- Image: full grid column; `object-fit:cover` and center positioning.

## States & Behaviors

- **Hover:** card gains `0 10px 0 -4px #FF3B1F`.
- **Click destinations:** `/helloparul-in/case/smytten/`, `/case/billbuster/`, `/case/combo/`.

## Per-card Content and Assets

1. **Smytten / Conversion** — `Building trust through AI-powered review summaries`; image `/clones/helloparul-in/images/smytten-review-summary.png`; metrics `+5 pts`, `↑↑`, `−fatigue`.
2. **Smytten / Gamification / Reward Systems / Cart value** — `Bill Buster: more in the cart, by making progress visible`; image `/clones/helloparul-in/images/billbuster-hero.png`; metrics `19%→26%`, `₹150`, `+motivate`.
3. **Smytten / Discovery** — `Combo Generator: guided trial selection for a 300+ product catalog`; image `/clones/helloparul-in/images/combo-generator-hero.png`; metrics `22–28%`, `14–18%`.

## Responsive Behavior

- **≤1024px:** grid becomes a single column; source text block renders before image for all cards.
- **≤760px:** card copy has `30px 24px`; descriptions and metric rows hide; image has `width:100%; aspect-ratio:1/1; max-height:480px`.
