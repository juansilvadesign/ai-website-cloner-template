#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// dev — `astro dev`, plus `--clone <slug>` to preview an ejection.
// ─────────────────────────────────────────────────────────────────────────────
//
//   npm run dev                      the hub, clones at /<slug>/  (unchanged)
//   npm run dev -- --clone fesn      one clone, served at the root
//
// The preview does not fake root routing. It runs the real ejector into a
// gitignored `temp/preview-<slug>/` and points Astro's `--root` at the result,
// so what you browse is the actual ejected project: rewritten imports, flattened
// asset URLs, its own `astro.config.mjs`, no hub, no eject endpoint. A preview
// that only remapped routes would still serve `/clones/<slug>/…` URLs and prove
// nothing about the rewrite.
//
// The consequence of that fidelity: it is a snapshot. Editing the clone's source
// does not reach the copy Astro is serving — restart the dev server. The folder
// is wiped and re-ejected on every start so it cannot drift, and is left on disk
// afterwards so the output can be inspected.
//
// Astro runs with its working directory set to the ejected folder rather than via
// `--root`, which is both what a human would do by hand and the only variant that
// survives Astro's auto-backgrounded dev server — under `--root` the daemon never
// reports ready and times out after 30s, though the same command works in the
// foreground. From inside the folder, the ejected project's own `astro.config.mjs`
// is what runs, and `node_modules` resolves by walking up to the repo root, so the
// preview needs no install of its own.

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ejectClone } from "./eject-clone.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ASTRO_BIN = path.join(REPO_ROOT, "node_modules", "astro", "bin", "astro.mjs");

/**
 * Pull `--clone <slug>` / `--clone=<slug>` out; everything else goes to Astro.
 *
 * `seen` is tracked separately from `slug` on purpose. Keyed on the value alone,
 * a bare `--clone` with no slug reads as "no flag given" and quietly starts the
 * hub instead — the wrong mode, with nothing said about it.
 */
function extractCloneFlag(argv) {
  const passthrough = [];
  let seen = false;
  let slug;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--clone") {
      seen = true;
      slug = argv[i + 1];
      i += 1;
      continue;
    }
    if (arg.startsWith("--clone=")) {
      seen = true;
      slug = arg.slice("--clone=".length);
      continue;
    }
    passthrough.push(arg);
  }

  return { seen, slug, passthrough };
}

function fail(message) {
  console.error(`\ndev: ${message}\n`);
  process.exit(1);
}

const { seen, slug, passthrough } = extractCloneFlag(process.argv.slice(2));
const astroArgs = ["dev", ...passthrough];
let workingDir = REPO_ROOT;

if (seen) {
  if (!slug || slug.startsWith("-")) {
    fail("`--clone` needs a slug, e.g. `npm run dev -- --clone fesn`.");
  }

  const target = path.join(REPO_ROOT, "temp", `preview-${slug}`);

  // Wiped every start: a reused folder can silently serve a stale ejection.
  fs.rmSync(target, { recursive: true, force: true });

  let result;
  try {
    result = await ejectClone({
      slug,
      targetDir: target,
      force: true,
      allowInsideRepo: true,
    });
  } catch (error) {
    fail(error.message);
  }

  const { counts, warnings } = result;
  const relative = path.relative(REPO_ROOT, target);

  console.log(`\n  Previewing the ${slug} ejection`);
  console.log(`    → ${relative}/`);
  console.log(
    `    ${counts.rewritten + counts.copied + counts.generated} files · ` +
      `${counts.references} references rewritten`,
  );
  for (const warning of warnings) console.log(`    · ${warning}`);
  console.log("\n  This is the ejected output, not the hub. Restart to pick up source edits.\n");

  workingDir = target;
}

const child = spawn(process.execPath, [ASTRO_BIN, ...astroArgs], {
  cwd: workingDir,
  stdio: "inherit",
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 0);
});
