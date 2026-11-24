---
name: ai-website-cloner fork — project memory
description: Live state for the website-cloner fork — what shipped and what is next
type: project
---
# ai-website-cloner fork — Project Memory

> **Migrated out of the global memory router 2026-08-16.** The router keeps a one-line stub pointing here; ⛔ new detail lands in this file, not in the router.
>
> ⚠️ **This repository is PUBLIC.** No credentials or tokens in this file.

## ▶ Live resume state

- ✅ **`capia` clone (2026-11-24): Astro page + `design-systems/capia` (guard 100).** The source is a Vite site with hand-written CSS and JS, so it was ported verbatim: CSS split by section in cascade order, JS ported line for line. Static pixels match at 1440/390; only clock-driven floats differ. Ejects standalone, verified with a build and runtime check. Meant as a reusable client template: re-skin via `src/clones/capia/data/cardapio.ts` + `public/clones/capia/img/`; the newsletter form has no backend.
- ✅ **Eject fixes (2026-11-24):** it now carries bare npm imports into the generated `package.json`, and rewrites every `srcset` candidate.
- ✅ **Shelf recreation committed and QA-green.**
- ✅ **Upstream sync 2026-10-05:** judged all 38 commits up to `ee3f5a2` (v0.6.1), ported the cloning rules that fit, patched both dependency trees (Next.js 16.3.8, Astro 7.3.5), and recorded upstream with an ours-merge. Verdicts: `.github/upstream-triage.json`; reasoning: `ROADMAP.md`, Harvesting from upstream.
- **Next:**
  1. **Mint OAuth**
  2. The **19-book GLB pack**

## 📚 Detailed history

⚠️ **This repository is PUBLIC, so the full internal history is deliberately NOT kept here.** This file carries the sanitized technical state only.

The complete record lives in the private `ai-synthesizer` workspace at `knowledge/projects/_memory/project_ai_website_cloner_fork.md` — session-by-session, including the parts that must not be published (hosting account details, client agreements, internal IDs). Folded there 2026-08-17.
