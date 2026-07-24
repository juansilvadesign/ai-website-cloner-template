#!/usr/bin/env node
/**
 * check-upstream.mjs — keep an eye on the fork's upstream without merging it.
 *
 * This fork is a HARD FORK (see ROADMAP.md). We never sync upstream wholesale;
 * we cherry-pick. So the only two questions worth asking each week are:
 *
 *   1. Did upstream's master actually move?  (git — exact, no API guessing)
 *   2. Is there an open PR we haven't judged yet?  (GitHub API + our triage file)
 *
 * Everything already judged lives in .github/upstream-triage.json, so steady-state
 * output is quiet. Only genuinely new, non-clone-output PRs raise the alert.
 *
 * Usage:
 *   node scripts/check-upstream.mjs                     # human report on stdout
 *   node scripts/check-upstream.mjs --report out.md     # also write markdown
 *   node scripts/check-upstream.mjs --github-output     # emit alert/title to $GITHUB_OUTPUT
 *
 * Auth: GITHUB_TOKEN or GH_TOKEN env, else `gh auth token`, else unauthenticated
 * (fine — this makes a handful of requests).
 */

import { execFileSync } from 'node:child_process';
import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** A PR whose title looks like someone's generated clone, not tooling. */
const CLONE_TITLE_RE = /\b(clone|rebuild|rebuilt|re-?creat\w+|replica|pixel-perfect)\b/i;
/** Tooling PRs are small; the "here is my cloned site" PRs run to thousands of lines. */
const NOISE_ADDITIONS = 1200;

// ---------------------------------------------------------------- args

const args = process.argv.slice(2);
const flag = (name, fallback = null) => {
  const i = args.indexOf(name);
  return i === -1 ? fallback : (args[i + 1] ?? fallback);
};
const has = (name) => args.includes(name);

const triagePath = resolve(REPO_ROOT, flag('--triage', '.github/upstream-triage.json'));
const reportPath = flag('--report');
const branch = flag('--branch', 'master');

// ---------------------------------------------------------------- helpers

const sh = (cmd, cmdArgs) =>
  execFileSync(cmd, cmdArgs, { cwd: REPO_ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

function resolveToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  if (process.env.GH_TOKEN) return process.env.GH_TOKEN;
  try {
    return sh('gh', ['auth', 'token']);
  } catch {
    return null;
  }
}

const token = resolveToken();

async function api(path) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'ai-website-cloner-template-upstream-watch',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status} ${res.statusText} for ${path}`);
  }
  return res.json();
}

// ---------------------------------------------------------------- triage table

const triage = JSON.parse(readFileSync(triagePath, 'utf8'));
const upstreamRepo = triage.upstream;
const verdicts = triage.verdicts ?? {};

// ---------------------------------------------------------------- 1. did master move?

function checkCommits() {
  const url = `https://github.com/${upstreamRepo}.git`;
  try {
    sh('git', ['fetch', '--quiet', url, branch]);
  } catch (err) {
    return { ok: false, error: err.message.split('\n')[0] };
  }

  const head = sh('git', ['rev-parse', '--short', 'FETCH_HEAD']);
  const headDate = sh('git', ['log', '-1', '--format=%ad', '--date=short', 'FETCH_HEAD']);
  const behind = Number(sh('git', ['rev-list', '--count', `HEAD..FETCH_HEAD`]));
  const commits = behind
    ? sh('git', ['log', '--format=%h %ad %s', '--date=short', 'HEAD..FETCH_HEAD']).split('\n')
    : [];

  return { ok: true, head, headDate, behind, commits };
}

// ---------------------------------------------------------------- 2. anything untriaged?

async function checkPullRequests() {
  const open = await api(`/repos/${upstreamRepo}/pulls?state=open&per_page=100`);

  const known = [];
  const untriaged = [];

  for (const pr of open) {
    const entry = verdicts[String(pr.number)];
    if (entry) {
      known.push({ number: pr.number, title: pr.title, ...entry });
      continue;
    }
    untriaged.push({
      number: pr.number,
      title: pr.title,
      author: pr.user?.login ?? 'unknown',
      created: pr.created_at.slice(0, 10),
      url: pr.html_url,
    });
  }

  // Only untriaged PRs need the extra per-PR request for diff size.
  for (const pr of untriaged) {
    try {
      const detail = await api(`/repos/${upstreamRepo}/pulls/${pr.number}`);
      pr.additions = detail.additions;
      pr.changedFiles = detail.changed_files;
    } catch {
      pr.additions = null;
      pr.changedFiles = null;
    }
    pr.likelyNoise =
      CLONE_TITLE_RE.test(pr.title) || (pr.additions !== null && pr.additions > NOISE_ADDITIONS);
  }

  const stale = Object.keys(verdicts)
    .filter((n) => !open.some((pr) => String(pr.number) === n))
    .map(Number)
    .sort((a, b) => a - b);

  return { open, known, untriaged, stale };
}

// ---------------------------------------------------------------- report

function buildReport(commits, prs) {
  const L = [];
  const actionable = prs.untriaged.filter((pr) => !pr.likelyNoise);
  const heuristicNoise = prs.untriaged.filter((pr) => pr.likelyNoise);

  L.push(`# Upstream watch — \`${upstreamRepo}\``);
  L.push('');
  L.push(`_Checked ${new Date().toISOString().slice(0, 10)}. This fork is a hard fork — we cherry-pick, we never sync._`);
  L.push('');

  L.push('## 1. Did upstream `master` move?');
  L.push('');
  if (!commits.ok) {
    L.push(`⚠️ Could not fetch upstream: \`${commits.error}\``);
  } else if (commits.behind === 0) {
    L.push(`✅ **No.** Upstream HEAD is still \`${commits.head}\` (${commits.headDate}) and is already an ancestor of ours. Nothing to sync.`);
  } else {
    L.push(`⚠️ **Yes — ${commits.behind} new commit(s)** upstream, HEAD now \`${commits.head}\` (${commits.headDate}):`);
    L.push('');
    L.push('```');
    L.push(...commits.commits);
    L.push('```');
    L.push('');
    L.push('Review each one and cherry-pick what applies. Do **not** merge upstream/master — the prune (Milestone A) and the Astro shift (Milestone D) have diverged the tree on purpose.');
  }
  L.push('');

  L.push('## 2. Open PRs needing a verdict');
  L.push('');
  if (actionable.length === 0) {
    L.push(`✅ **None.** All ${prs.open.length} open PRs are either already triaged (${prs.known.length}) or look like generated clone output (${heuristicNoise.length}).`);
  } else {
    L.push(`⚠️ **${actionable.length} PR(s) never judged.** Decide, then record the verdict in \`.github/upstream-triage.json\` (and the rationale in \`ROADMAP.md\`) to silence this:`);
    L.push('');
    for (const pr of actionable) {
      const size = pr.additions === null ? 'size unknown' : `+${pr.additions} across ${pr.changedFiles} files`;
      L.push(`- **[#${pr.number}](${pr.url})** — ${pr.title}`);
      L.push(`  <br>\`@${pr.author}\` · opened ${pr.created} · ${size}`);
    }
  }
  L.push('');

  if (heuristicNoise.length) {
    L.push('<details><summary>Untriaged but heuristically clone-output (no action expected)</summary>');
    L.push('');
    for (const pr of heuristicNoise) {
      const size = pr.additions === null ? '?' : `+${pr.additions}`;
      L.push(`- #${pr.number} ${pr.title} (\`@${pr.author}\`, ${size})`);
    }
    L.push('');
    L.push('</details>');
    L.push('');
  }

  L.push('## 3. Standing harvest queue');
  L.push('');
  const harvest = prs.known.filter((pr) => pr.verdict === 'harvest');
  const later = prs.known.filter((pr) => pr.verdict === 'later');
  if (harvest.length) {
    L.push('Still open upstream, still worth porting into our `SKILL.md`:');
    L.push('');
    for (const pr of harvest) L.push(`- **#${pr.number}** ${pr.title} — ${pr.why}`);
    L.push('');
  }
  if (later.length) {
    L.push('Parked until the relevant milestone:');
    L.push('');
    for (const pr of later) L.push(`- #${pr.number} ${pr.title} — ${pr.why}`);
    L.push('');
  }

  if (prs.stale.length) {
    L.push(`> Housekeeping: ${prs.stale.length} triaged PR(s) are no longer open upstream (${prs.stale.map((n) => `#${n}`).join(', ')}). Safe to prune from \`upstream-triage.json\` once harvested or irrelevant.`);
    L.push('');
  }

  const alert = (commits.ok && commits.behind > 0) || actionable.length > 0;
  const title = !commits.ok
    ? 'Upstream watch: check failed'
    : commits.behind > 0
      ? `Upstream drift: ${commits.behind} new commit(s) on master`
      : `Upstream watch: ${actionable.length} PR(s) need a verdict`;

  return { body: L.join('\n'), alert, title };
}

// ---------------------------------------------------------------- main

const commits = checkCommits();
const prs = await checkPullRequests();
const { body, alert, title } = buildReport(commits, prs);

process.stdout.write(`${body}\n`);

if (reportPath) writeFileSync(resolve(process.cwd(), reportPath), `${body}\n`, 'utf8');

if (has('--github-output') && process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `alert=${alert}\ntitle=${title}\n`, 'utf8');
}

// Exit 0 always — an alert is information, not a build failure.
