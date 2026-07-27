# Roadmap

Where this fork is going, and why it stopped tracking upstream.

**Direction:** turn a Next.js-only, 13-agent-target website cloner into a
**design-system-first** tool that emits a portable [OpenDesign](https://github.com/nexu-io/open-design)
package on every run and builds the page in **Astro** (default) or Next.js —
driven only by Claude Code.

The full rationale, the locked interview decisions, and the file-by-file change
map live in **[`docs/FORK-PLAN.md`](docs/FORK-PLAN.md)**. This file is the status
board. The actionable checklist is **[`TASKS.md`](TASKS.md)**.

---

## Stance: this is a hard fork

We do **not** sync upstream. We cherry-pick, and only when a change is worth it.

The evidence, audited 2026-07-24:

| Signal | State |
| --- | --- |
| Upstream `master` HEAD | `58e00d5`, **2026-07-04** — unchanged since we forked |
| Last maintainer merge | PR **#44**, **2026-06-01** |
| Open PRs | 20, none merged since #44 |
| Typical PR content | Contributors PR-ing back their own generated clone output |

Two independent reasons to stop tracking it:

1. **Upstream is inactive.** Waiting for a useful PR to be merged so we can pull
   it is waiting indefinitely. Anything we want, we take directly from the PR branch.
2. **We deliberately diverged.** Milestone A deleted 12 of the 13 agent targets and
   Milestone D moves the repo off "the repo *is* a Next.js app." A merge from
   upstream would fight both.

> **Never run `git merge upstream/master`.** Harvest with a targeted patch instead
> — see [Harvesting from upstream](#harvesting-from-upstream) below.

---

## Milestones

`✅ shipped` · `⬜ follow-up`

| | Milestone | State | Evidence |
| --- | --- | --- | --- |
| **A** | Prune to Claude Code only + re-baseline | ✅ | `61ac379` — 11 dot-dirs + 2 sync scripts removed, −4,681 lines |
| **B** | Harden extraction (harvest upstream PRs) | ✅ | PRs **#56**, **#68**, and trimmed **#60** harvested into `SKILL.md` |
| **C** | Design-system emitter *(keystone)* | ✅ | `651f549` — +3,105 lines; re-validated 2026-07-24, quality score **100** |
| **D** | Astro page builder | ✅ | Root Astro + isolated Next target; both production builds green |
| **E** | QA, docs, release | ✅ | `0.4.0` manifests; guard + Astro + retained Next release checks |

Critical path is **A → C → D**; B parallels A; E closes.

### A — Prune to Claude Code only ✅

One instruction file, one skill, zero drift surface. `.claude/skills/clone-website/SKILL.md`
is now the single source of truth; `AGENTS.md` stays as the human-readable brief.

### B — Harden extraction ✅

Harvested three stack-agnostic improvements into `SKILL.md`: PR **#56** added
static-first motion degradation and complexity triage; PR **#68** added an
explicitly opt-in ego-browser translation layer; and PR **#60** contributed only
the useful Playwright MCP server-command hint. Browser MCP remains the default.

### C — Design-system emitter ✅ *(keystone)*

`scripts/emit-design-system.ts` reads OpenDesign's `TOKEN_SCHEMA` at build time
(never hardcodes slots), resolves all 56 slots through the source → A2-fallback →
B-slot-alias chain, and reuses OpenDesign's own renderers so the derived caches
provably agree. `SKILL.md` Phase 2 covers the prose. `scripts/validate-design-system.ts`
runs OpenDesign's exported guard checks against a single package without a
monorepo install.

Proven end-to-end on the PsiAtiva landing page → `design-systems/psiativa/`.

```bash
npx tsx scripts/emit-design-system.ts   --brand <slug>
npx tsx scripts/validate-design-system.ts --brand <slug>
```

> Derived files (`design-tokens.json`, `tailwind-v4.css`, `components.manifest.json`)
> are **caches**. Always re-emit; never hand-edit. `components.html` may reference
> only tokens that `tokens.css` actually declares.

### D — Astro page builder ✅

The root is now an Astro 7 static app using vanilla CSS and the emitted
`tokens.css`. The complete old Next scaffold lives under `templates/nextjs/` with
its own dependency graph; a prebuild bridge syncs the selected package's emitted
`tailwind-v4.css` and `tokens.css` into an ignored cache so it never grows a second
token source.

`SKILL.md` parses `--build astro|nextjs|none` and `--slug` up front, validates the
OpenDesign package before page work, gives Astro builders a static-first `.astro`
prompt variant, and keeps content server-rendered when an interactive island is
required. Root `npm run check` and retained `npm run check:nextjs` both pass.

### E — QA, docs, release ✅

Version 0.4.0 makes a fresh OpenDesign guard, the selected production build, and
final 1440px/390px side-by-side artifacts the explicit definition of done. The
README and inspection guide now document the emitted package and acceptance
evidence, CI guards the checked-in reference package, and both manifests carry
the fork's identity. The retained target moved to Next.js 16.2.12 with a clean
production dependency audit.

---

## Harvesting from upstream

Every useful upstream PR edits **10 duplicate copies** of the skill, one per agent
target. Milestone A deleted 9 of them — so harvesting is a single-hunk apply to
`.claude/skills/clone-website/SKILL.md`, not a `git cherry-pick`.

```bash
# Read just the hunk that matters:
gh pr diff <N> --repo JCodesMore/ai-website-cloner-template \
  | awk '/^diff --git a\/.claude/,/^diff --git a\/.codex/'
```

Then apply it by hand, keep our surrounding edits, and record the verdict in
[`.github/upstream-triage.json`](.github/upstream-triage.json). Use `harvest`
while a port is queued, then change it to `harvested` when the port lands.

### Verdicts on the current open PRs

| PR | Verdict | Reasoning |
| --- | --- | --- |
| **#56** motion graceful degradation | **harvested** | Landed Principle 10 (static skeleton → layer motion by priority → video/screenshot fallback for WebGL/GSAP/Lottie), a Motion Complexity Triage table, and 2 What-NOT-to-Do rules. |
| **#68** ego-browser backend | **harvested** | Landed the MCP→ego translation table and non-obvious gotchas as opt-in guidance; the external `lite.ego.app` dependency is never the default. |
| **#60** Playwright MCP | **harvested (trimmed)** | Landed only the useful `npx @playwright/mcp@latest` hint because Pre-Flight already listed Playwright MCP as an acceptable backend. |
| **#48**, **#38** dependency hygiene | **harvested (superseded)** | Their queued `16.2.7` target became stale before E shipped. The isolated target now uses the July security line at Next.js **16.2.12**, matching ESLint config, and scoped audited transitive overrides. |
| **#72** WebAssembly port | **skip — supply-chain smell** | Commits prebuilt `bin/*.exe` and `public/wasm/*.wasm` binaries and rewrites `src/lib/utils.ts` `cn()` to call WASM. Also resurrects the `scripts/sync-*` tooling A deleted. Do not pull in blind. |
| **#63** Kiro support | **skip** | Adds a 14th agent target; directly fights the Claude-Code-only decision. |
| **#25** agent-browser CLI | **skip** | Replaces browser MCP wholesale; fights the MCP-native setup and conflicts with #60/#68. |
| **#17**, **#52**, **#54**, **#57**, **#58**, **#59**, **#61**, **#71**, **#75** | **skip** | READMEs, badges, devcontainer, CONTRIBUTING/SECURITY, and a CI check for the sync tooling we deleted. |
| **#47**, **#67**, **#73** | **noise** | Contributors' generated clone output, not tooling. |

---

## Watching upstream

A weekly job answers the only two questions that matter — *did `master` move?* and
*is there an open PR we haven't judged?* — and maintains a single GitHub issue.

| Piece | Role |
| --- | --- |
| [`scripts/check-upstream.mjs`](scripts/check-upstream.mjs) | The engine. Runs anywhere, any time, no dependencies. |
| [`.github/workflows/upstream-watch.yml`](.github/workflows/upstream-watch.yml) | Mondays 09:00 UTC (plus manual dispatch). Opens/updates one `upstream-watch` issue, closes it when things go quiet. |
| [`.github/upstream-triage.json`](.github/upstream-triage.json) | Machine-readable verdicts — the watcher's memory of what we already decided. |

```bash
node scripts/check-upstream.mjs
```

It stays quiet by design: already-triaged PRs and heuristically-detected clone
output never raise an alert. **When you judge a new PR, record it in
`upstream-triage.json` and add the reasoning to the table above** — otherwise it
reports every week.

---

## Contributing back

If the maintainer becomes active again, some of this work is worth offering
upstream. Most of it isn't — and that's fine.

**Portable** — stack-agnostic and useful to any consumer of the cloner:

- Extraction-quality improvements to `SKILL.md` (the reconnaissance sweep, state
  extraction, motion triage) that don't assume our emission targets.
- Fixes to the retained Next.js scaffold.

**Not portable** — these *are* the fork:

- Milestone A's prune. Multi-platform support is upstream's whole value proposition.
- Milestone D's Astro shift, and the repo restructure it implies.
- The design-system emitter — it's the point of this fork, but it carries a hard
  dependency on the OpenDesign repo that upstream has no reason to take on.

**The one discipline that keeps this cheap:** when a change *is* portable, land it
as its **own atomic commit** touching only stack-agnostic files. Then contributing
back is a branch off `upstream/master`, a `git cherry-pick`, and a PR — with no
untangling.

```bash
git remote add upstream https://github.com/JCodesMore/ai-website-cloner-template.git
git fetch upstream
git switch -c contrib/<topic> upstream/master
git cherry-pick <sha>
```

No `upstream` remote and no contrib branch exist yet — deliberately. There's
nobody to receive a PR today. This is the recipe for the day that changes.
