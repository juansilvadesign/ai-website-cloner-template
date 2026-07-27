#!/usr/bin/env node
/**
 * check-nextjs-audit.mjs — watch the retained Next.js target's dev-only audit finding.
 *
 * Background (TASKS.md, Milestone E follow-up). `templates/nextjs` carries a high
 * severity advisory, GHSA-mh99-v99m-4gvg, against `brace-expansion <= 5.0.7`. It is
 * **dev-only** — the production audit is clean — so it never blocks a release. It is
 * also not fixable today, and the two obvious fixes are both traps:
 *
 *   1. `npm audit fix --force` bumps ESLint to 10 and leaves an invalid peer tree,
 *      because eslint-config-next's bundled plugins still cap eslint at ^9.
 *   2. An `overrides` entry pinning `brace-expansion` to the only patched release,
 *      5.0.8, BREAKS eslint at runtime: 5.x's CommonJS build exports `{ expand }`
 *      rather than a callable, and minimatch 3.x calls `expand(pattern)` directly,
 *      so lint dies with `TypeError: expand is not a function`.
 *
 * The finding also does NOT clear on an ESLint 10 bump alone. eslint-config-next
 * bundles its own nested eslint-plugin-import / -jsx-a11y / -react, each of which
 * pulls minimatch 3.x -> brace-expansion 1.x regardless of the top-level eslint.
 * So the real precondition is upstream: those plugins have to move off minimatch 3.x,
 * or eslint-config-next has to stop bundling pinned copies of them.
 *
 * Rather than re-deriving that by hand every few weeks, this script re-runs the whole
 * experiment and prints a verdict:
 *
 *   RESOLVED  — the dev audit is already clean at the current pin. Close the follow-up.
 *   UNBLOCKED — forcing eslint@^10 now yields a clean AND peer-valid tree. Go do it.
 *   BLOCKED   — still stuck; the report names exactly what is holding it.
 *
 * Usage:
 *   node scripts/check-nextjs-audit.mjs                  # human report on stdout
 *   node scripts/check-nextjs-audit.mjs --report out.md  # also write markdown
 *   node scripts/check-nextjs-audit.mjs --github-output  # emit state/title to $GITHUB_OUTPUT
 *
 * Needs network (it resolves a throwaway lockfile in a temp dir). Never touches the
 * real templates/nextjs tree — the probe runs against a copy.
 */

import { spawnSync } from 'node:child_process';
import { appendFileSync, copyFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TARGET = resolve(REPO_ROOT, 'templates/nextjs');

/** The only release that patches GHSA-mh99-v99m-4gvg. There is no patched 1.x line. */
const PATCHED_BRACE_EXPANSION = '5.0.8';

// ---------------------------------------------------------------- args

const args = process.argv.slice(2);
const flag = (name, fallback = null) => {
  const i = args.indexOf(name);
  return i === -1 ? fallback : (args[i + 1] ?? fallback);
};
const has = (name) => args.includes(name);

const reportPath = flag('--report');

// ---------------------------------------------------------------- helpers

/**
 * Run a command for its output. npm uses a non-zero exit to mean "found something",
 * not "failed", so the exit code is reported rather than thrown. spawnSync (not
 * execFileSync) because npm writes its peer-dependency warnings to stderr, and
 * execFileSync only hands back stderr on failure — which would silently hide them.
 */
function run(cmd, cmdArgs, cwd) {
  const r = spawnSync(cmd, cmdArgs, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  return {
    ok: r.status === 0,
    out: r.stdout ?? '',
    err: r.stderr ?? (r.error ? String(r.error) : ''),
  };
}

/** `npm audit --json` exits non-zero whenever it finds anything, so parse regardless. */
function auditCounts(cwd, extra = []) {
  const { out } = run('npm', ['audit', '--json', ...extra], cwd);
  try {
    const parsed = JSON.parse(out);
    const v = parsed.metadata?.vulnerabilities ?? {};
    return {
      ok: true,
      total: v.total ?? 0,
      high: v.high ?? 0,
      critical: v.critical ?? 0,
      names: Object.keys(parsed.vulnerabilities ?? {}),
    };
  } catch {
    return { ok: false, total: null, high: null, critical: null, names: [] };
  }
}

/** Every brace-expansion copy a lockfile resolves, with whether it is still vulnerable. */
function braceExpansionCopies(lockfilePath) {
  const lock = JSON.parse(readFileSync(lockfilePath, 'utf8'));
  const copies = [];
  for (const [path, meta] of Object.entries(lock.packages ?? {})) {
    if (!path.endsWith('node_modules/brace-expansion')) continue;
    copies.push({
      path: path.replace(/^node_modules\//, ''),
      version: meta.version,
      vulnerable: meta.version !== PATCHED_BRACE_EXPANSION && !meta.version?.startsWith('5.0.8'),
    });
  }
  return copies;
}

// ---------------------------------------------------------------- 1. current state

const current = {
  production: auditCounts(TARGET, ['--omit=dev']),
  full: auditCounts(TARGET),
  copies: braceExpansionCopies(join(TARGET, 'package-lock.json')),
  eslint: JSON.parse(readFileSync(join(TARGET, 'package.json'), 'utf8')).devDependencies?.eslint,
  configNext: JSON.parse(readFileSync(join(TARGET, 'package.json'), 'utf8')).devDependencies?.[
    'eslint-config-next'
  ],
};

// ---------------------------------------------------------------- 2. probe the eslint 10 route

function probeEslint10() {
  const dir = mkdtempSync(join(tmpdir(), 'nextjs-audit-probe-'));
  try {
    copyFileSync(join(TARGET, 'package.json'), join(dir, 'package.json'));
    copyFileSync(join(TARGET, 'package-lock.json'), join(dir, 'package-lock.json'));

    const install = run(
      'npm',
      ['install', 'eslint@^10', '--package-lock-only', '--no-audit', '--no-fund'],
      dir,
    );
    if (!install.ok && !install.out) {
      return { ok: false, error: install.err.split('\n').slice(0, 3).join(' ').trim() };
    }

    // npm reports unmet peers as warnings here rather than failing, so count them.
    // Each conflict is printed twice — once under "Could not resolve dependency" and
    // again under "Conflicting peer dependency" — so dedupe on package + range.
    const noise = `${install.out}\n${install.err}`;
    const seen = new Map();
    for (const m of noise.matchAll(/peer eslint@"([^"]+)" from (\S+)/g)) {
      seen.set(`${m[2]}::${m[1]}`, { range: m[1], from: m[2] });
    }
    const peerConflicts = [...seen.values()];

    const lock = JSON.parse(readFileSync(join(dir, 'package-lock.json'), 'utf8'));
    const resolvedEslint = lock.packages?.['node_modules/eslint']?.version ?? null;

    return {
      ok: true,
      resolvedEslint,
      peerConflicts,
      audit: auditCounts(dir, ['--package-lock-only']),
      copies: braceExpansionCopies(join(dir, 'package-lock.json')),
    };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const probe = probeEslint10();

// ---------------------------------------------------------------- verdict

function decide() {
  if (current.full.ok && current.full.total === 0) {
    return { state: 'RESOLVED', title: 'Next.js dev audit is clean — close the follow-up' };
  }
  if (!probe.ok) {
    return { state: 'BLOCKED', title: 'Next.js dev audit: probe could not run' };
  }
  const peerClean = probe.peerConflicts.length === 0;
  const auditClean = probe.audit.ok && probe.audit.total === 0;
  const onTen = probe.resolvedEslint?.startsWith('10');

  if (onTen && peerClean && auditClean) {
    return { state: 'UNBLOCKED', title: 'Next.js dev audit: the ESLint 10 route is now clean' };
  }
  return {
    state: 'BLOCKED',
    title: `Next.js dev audit: still blocked (${current.full.total ?? '?'} dev finding(s))`,
  };
}

const { state, title } = decide();

// ---------------------------------------------------------------- report

function buildReport() {
  const L = [];
  const badge = { RESOLVED: '✅', UNBLOCKED: '🎉', BLOCKED: '⏳' }[state];

  L.push('# Retained Next.js target — dev-only audit watch');
  L.push('');
  L.push(`_Checked ${new Date().toISOString().slice(0, 10)}. Advisory GHSA-mh99-v99m-4gvg, \`brace-expansion <= 5.0.7\`._`);
  L.push('');
  L.push(`## ${badge} ${state}`);
  L.push('');

  L.push('## Current pin');
  L.push('');
  L.push(`- \`eslint\` **${current.eslint}** · \`eslint-config-next\` **${current.configNext}**`);
  L.push(
    `- Production audit: ${
      current.production.total === 0
        ? '**clean** — the release gate is unaffected'
        : `⚠️ **${current.production.total} finding(s)** — this one DOES block a release`
    }`,
  );
  L.push(`- Full audit (incl. dev): **${current.full.total ?? '?'} finding(s)**`);
  const vulnerable = current.copies.filter((c) => c.vulnerable);
  if (vulnerable.length) {
    L.push('');
    L.push('Vulnerable `brace-expansion` copies still resolved:');
    L.push('');
    for (const c of vulnerable) L.push(`- \`${c.path}\` → **${c.version}**`);
  }
  L.push('');

  L.push('## Probe — would bumping to ESLint 10 fix it?');
  L.push('');
  if (!probe.ok) {
    L.push(`⚠️ Probe failed: \`${probe.error}\``);
  } else {
    L.push(`- Resolves \`eslint\` to **${probe.resolvedEslint ?? 'unknown'}**`);
    L.push(
      `- Peer tree: ${
        probe.peerConflicts.length === 0
          ? '**valid**'
          : `⚠️ **${probe.peerConflicts.length} unmet peer(s)**`
      }`,
    );
    for (const p of probe.peerConflicts) {
      L.push(`  - \`${p.from}\` wants \`eslint@${p.range}\``);
    }
    L.push(`- Audit afterwards: **${probe.audit.total ?? '?'} finding(s)**`);
    const left = probe.copies.filter((c) => c.vulnerable);
    if (left.length) {
      L.push('');
      L.push('Even on ESLint 10 these copies survive — they come from the plugins');
      L.push('`eslint-config-next` bundles, not from the top-level `eslint`:');
      L.push('');
      for (const c of left) L.push(`- \`${c.path}\` → **${c.version}**`);
    }
  }
  L.push('');

  L.push('## What to do');
  L.push('');
  if (state === 'RESOLVED') {
    L.push('The dev audit is clean. Delete the follow-up from `TASKS.md` and drop this check.');
  } else if (state === 'UNBLOCKED') {
    L.push('The ESLint 10 route now produces a clean, peer-valid tree. Bump `eslint` in');
    L.push('`templates/nextjs`, re-run `npm run check:nextjs`, and close the follow-up.');
  } else {
    L.push('Nothing to do. Do **not** "fix" this by hand — both shortcuts are traps:');
    L.push('');
    L.push('- `npm audit fix --force` leaves an invalid peer tree.');
    L.push(`- An \`overrides\` pin to **${PATCHED_BRACE_EXPANSION}** breaks lint at runtime:`);
    L.push('  5.x\'s CJS build exports `{ expand }`, not a callable, and minimatch 3.x');
    L.push('  calls `expand(pattern)` → `TypeError: expand is not a function`.');
    L.push('');
    L.push('It stays dev-only and the production audit stays clean, so it does not gate a release.');
  }
  L.push('');

  return L.join('\n');
}

const body = buildReport();
process.stdout.write(`${body}\n`);

if (reportPath) writeFileSync(resolve(process.cwd(), reportPath), `${body}\n`, 'utf8');

if (has('--github-output') && process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `state=${state}\ntitle=${title}\n`, 'utf8');
}

// Exit 0 always — like check-upstream.mjs, a verdict is information, not a build failure.
