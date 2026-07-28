/**
 * Download the FESN target's static assets into a page target's public/ tree.
 *
 *   node scripts/download-assets.mjs [publicDir]
 *
 * Defaults to the Astro root's `public/`. Pass `templates/nextjs/public` to
 * populate the retained Next.js target instead.
 *
 * Downloads run in batches of four. Any failure is reported explicitly and
 * sets a non-zero exit code — assets are never silently skipped.
 *
 * Per-student media (`/api/student-card/image?...`) is deliberately NOT
 * downloaded: it is personally identifying and this repository is public.
 * The clone ships generated placeholders instead — see `mock-card-assets.mjs`.
 */
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const BASE = "https://carteirinha.fesn.org.br";
const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC_DIR = path.resolve(ROOT, process.argv[2] ?? "public");

/** [remote path, local path relative to publicDir] */
const ASSETS = [
  ["/logo-fesn-short.svg", "images/logo-fesn-short.svg"],
  ["/logo-fesn-white.svg", "images/logo-fesn-white.svg"],
  ["/bg-student-card-2026.png", "images/bg-student-card-2026.png"],
  ["/favicon-fesn.svg", "seo/favicon-fesn.svg"],
  // Served through Next's image optimizer on the target; fetched at source resolution.
  ["/_next/image?url=%2Ffesn-mkt-com-reclame-aqui-01.png&w=1080&q=75", "images/fesn-mkt-hero.png"],
  ["/_next/image?url=%2Freclame-aqui-otimo.png&w=640&q=75", "images/reclame-aqui-otimo.png"],
  ["/_next/image?url=%2Flogo-dne-color.png&w=640&q=75", "images/logo-dne-color.png"],
];

async function download([remote, local]) {
  const url = remote.startsWith("http") ? remote : BASE + remote;
  const dest = path.join(PUBLIC_DIR, local);
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length === 0) throw new Error(`empty body — ${url}`);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, buf);
  return { local, bytes: buf.length };
}

const failures = [];
const results = [];

for (let i = 0; i < ASSETS.length; i += 4) {
  const batch = ASSETS.slice(i, i + 4);
  const settled = await Promise.allSettled(batch.map(download));
  settled.forEach((r, j) => {
    if (r.status === "fulfilled") results.push(r.value);
    else failures.push({ asset: batch[j][0], error: r.reason.message });
  });
}

for (const r of results) console.log(`  ok  ${r.local.padEnd(38)} ${r.bytes} bytes`);
for (const f of failures) console.error(`  FAIL ${f.asset} — ${f.error}`);
console.log(`\n${results.length}/${ASSETS.length} assets downloaded into ${path.relative(ROOT, PUBLIC_DIR)}/`);

if (failures.length > 0) process.exitCode = 1;
