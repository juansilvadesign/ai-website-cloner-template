/**
 * Download one clone's static assets into a supplied page target's public tree.
 *
 *   node scripts/download-assets.mjs [publicDir]
 *   node scripts/download-assets.mjs --clone helloparul-in public/clones/helloparul-in
 *
 * Defaults retain the original FESN behaviour. Downloads run in batches of
 * four, and a non-zero exit code makes any incomplete asset inventory explicit.
 * The FESN profile intentionally excludes per-student media because it is
 * personally identifying; that clone continues to ship generated placeholders.
 */
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const cloneFlag = args.indexOf("--clone");
const clone = cloneFlag === -1 ? "fesn" : args[cloneFlag + 1];
if (cloneFlag !== -1 && !clone) {
  throw new Error("download-assets: --clone requires a known clone slug");
}
const publicArg = args.find((arg, index) => index !== cloneFlag && index !== cloneFlag + 1 && !arg.startsWith("--"));
const PUBLIC_DIR = path.resolve(ROOT, publicArg ?? "public");

/** [remote path, local path relative to publicDir] */
const PROFILES = {
  fesn: {
    base: "https://carteirinha.fesn.org.br",
    assets: [
      ["/logo-fesn-short.svg", "images/logo-fesn-short.svg"],
      ["/logo-fesn-white.svg", "images/logo-fesn-white.svg"],
      ["/bg-student-card-2026.png", "images/bg-student-card-2026.png"],
      ["/favicon-fesn.svg", "seo/favicon-fesn.svg"],
      ["/_next/image?url=%2Ffesn-mkt-com-reclame-aqui-01.png&w=1080&q=75", "images/fesn-mkt-hero.png"],
      ["/_next/image?url=%2Freclame-aqui-otimo.png&w=640&q=75", "images/reclame-aqui-otimo.png"],
      ["/_next/image?url=%2Flogo-dne-color.png&w=640&q=75", "images/logo-dne-color.png"],
    ],
  },
  "helloparul-in": {
    base: "https://helloparul.in",
    assets: [
      ["/assets/favicon.png", "seo/favicon.png"],
      ["/assets/splash-avatar.png", "images/splash-avatar.png"],
      ["/assets/Parul-Aggarwal-Resume.pdf", "documents/Parul-Aggarwal-Resume.pdf"],
      ["/0001-mqsg8y7g.png", "images/smytten-review-summary.png"],
      ["/assets/billbuster-hero.png", "images/billbuster-hero.png"],
      ["/frame-3-mr4uqgc1.png", "images/combo-generator-hero.png"],
      ["/assets/smytten-phase1-reviews.png", "images/smytten-phase1-reviews.png"],
      ["/frame-2147224476-mrmhc5lq-fqii.png", "images/smytten-hero-cover.png"],
      ["/frame-2147224675-mrmhcy2k-3ayp.png", "images/smytten-phase-one.png"],
      ["/frame-2147224676-mrmhd6l3-h39q.png", "images/smytten-session-insights.png"],
      ["/frame-2147224476-mrmhdf5x-ty3d.png", "images/smytten-ai-summary-wireframe.png"],
      ["/1_ogtxfqe_ejw81jvs17llqq-mrmhdvlb-o85l.webp", "images/smytten-ai-summary-strip.webp"],
      ["/assets/billbuster-before.png", "images/billbuster-before.png"],
      ["/assets/billbuster-after.png", "images/billbuster-after.png"],
      ["/assets/billbuster-unlocked.png", "images/billbuster-unlocked.png"],
      ["/assets/billbuster-why.png", "images/billbuster-why.png"],
      ["/assets/billbuster-cross-apps.png", "images/billbuster-cross-apps.png"],
      ["/assets/combo-01-entry.webp", "images/combo-01-entry.webp"],
      ["/assets/combo-02-categories.webp", "images/combo-02-categories.webp"],
      ["/assets/combo-03-brands.webp", "images/combo-03-brands.webp"],
      ["/assets/combo-04-generating.webp", "images/combo-04-generating.webp"],
      ["/assets/combo-05-curated.webp", "images/combo-05-curated.webp"],
      ["/assets/combo-06-shuffle.webp", "images/combo-06-shuffle.webp"],
      ["/assets/combo-07-cart.webp", "images/combo-07-cart.webp"],
      ["/assets/about-photo-1.png", "images/about-photo-1.png"],
      ["/assets/about-photo-2.png", "images/about-photo-2.png"],
      ["/assets/about-photo-3.png", "images/about-photo-3.png"],
      ["/assets/about-photo-4.png", "images/about-photo-4.png"],
      ["/assets/about-photo-5.png", "images/about-photo-5.png"],
      ["/assets/about-photo-6.png", "images/about-photo-6.png"],
    ],
  },
};

const profile = PROFILES[clone];
if (!profile) {
  throw new Error(`download-assets: unknown clone "${clone}". Known profiles: ${Object.keys(PROFILES).join(", ")}`);
}

const BASE = profile.base;
const ASSETS = profile.assets;

async function download([remote, local]) {
  const url = remote.startsWith("http") ? remote : new URL(remote, BASE).href;
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
console.log(`\n${results.length}/${ASSETS.length} ${clone} asset(s) downloaded into ${path.relative(ROOT, PUBLIC_DIR)}/`);

if (failures.length > 0) process.exitCode = 1;
