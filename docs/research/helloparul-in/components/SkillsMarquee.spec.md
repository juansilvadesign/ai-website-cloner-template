# SkillsMarquee Specification

## Overview

- **Target file:** `src/clones/helloparul-in/components/SkillsMarquee.astro`
- **Reference:** master desktop/mobile captures; `source.html:143-155`
- **Interaction model:** time-driven CSS animation

## DOM Structure

A full-bleed `section.skills-marquee` contains one translating flex line with two identical skill sequences. The second sequence is `aria-hidden` for a seamless visual loop without repeated accessibility content.

## Computed Styles

- Band: `overflow:hidden; padding:16px 0; background:#181510; color:#F2EEE3; border-top/bottom:2px solid #181510`.
- Moving line: flex, `width:max-content`, Bricolage 700 30px, `letter-spacing:-.01em`, `marquee 26s linear infinite`.
- Sequence: flex, 34px gap and right padding, `white-space:nowrap`.
- Star colors alternate `#FF3B1F`, `#FFC83D`, `#7CFFB2`.

## Text Content

`Product design ✦ Micro-interactions ✦ Design systems ✦ AI-assisted UX ✦ Prototyping ✦ User research`

## Responsive Behavior

- **≤480px:** text becomes 20px; the animation and duplicated sequence remain unchanged.
