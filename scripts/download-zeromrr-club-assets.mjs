// Downloads every asset the zeromrr-club clone needs into public/clones/zeromrr-club/.
// Also extracts the base64 webp images the home page inlines (in its <style> and in
// its main script) into real files, and writes the ported scripts with those data
// URIs swapped for file paths.
//
// Usage: node scripts/download-zeromrr-club-assets.mjs <raw-dir>
//   <raw-dir> holds home.html + playbook.html fetched from the live site.
import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";

const SLUG = "zeromrr-club";
const OUT = join("public", "clones", SLUG);
const RAW = process.argv[2];
if (!RAW) throw new Error("usage: download-zeromrr-club-assets.mjs <raw-dir>");

const HOME = "https://zeromrr.club";
const PB = "https://playbook.zeromrr.club";
const UA = { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) clone-website" };

const files = [
  [`${HOME}/three.min.js`, "js/three.min.js"],
  [`${HOME}/i18n.js`, "js/i18n.js"],
  [`${HOME}/tees.js`, "js/tees.js"],
  [`${HOME}/favicon.svg`, "seo/favicon.svg"],
  [`${HOME}/shop/img/ceo-of-nothing-front.webp`, "img/shop/ceo-of-nothing-front.webp"],
  [`${HOME}/shop/img/ceo-of-nothing-back.webp`, "img/shop/ceo-of-nothing-back.webp"],
  ...["fb", ...["p2", "p3", "p4", "p6"].flatMap((p) => ["f", "q", "s", "b"].map((k) => p + k))].map(
    (n) => [`${HOME}/hi/${n}.webp`, `img/hi/${n}.webp`],
  ),
  ...["loop_ex", "loop_reunion", "loop_boyfriends", "step_video"].flatMap((n) => [
    [`${PB}/pb/${n}.mp4`, `pb/${n}.mp4`],
    [`${PB}/pb/${n}.jpg`, `pb/${n}.jpg`],
  ]),
  ...["step_frame", "t_board", "t_boyfriends", "t_brad", "t_date", "t_ex", "t_friends", "t_reunion"].map(
    (n) => [`${PB}/pb/${n}.jpg`, `pb/${n}.jpg`],
  ),
];

const FONTS =
  "https://fonts.googleapis.com/css2?family=Anton&family=Chakra+Petch:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Press+Start+2P&display=swap";

const MAGIC = {
  webp: (b) => b.subarray(0, 4).toString() === "RIFF" && b.subarray(8, 12).toString() === "WEBP",
  jpg: (b) => b[0] === 0xff && b[1] === 0xd8,
  mp4: (b) => b.subarray(4, 8).toString() === "ftyp",
  woff2: (b) => b.subarray(0, 4).toString() === "wOF2",
};

async function save(rel, buf) {
  const p = join(OUT, rel);
  await mkdir(dirname(p), { recursive: true });
  await writeFile(p, buf);
}

async function fetchOne([url, rel]) {
  const r = await fetch(url, { headers: UA });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  const buf = Buffer.from(await r.arrayBuffer());
  const ext = rel.split(".").pop();
  if (MAGIC[ext] && !MAGIC[ext](buf)) throw new Error(`not a real ${ext}: ${url}`);
  await save(rel, buf);
  return `${rel} ${buf.length}`;
}

async function batch(list, n = 4) {
  const out = [];
  for (let i = 0; i < list.length; i += n) {
    const res = await Promise.allSettled(list.slice(i, i + n).map(fetchOne));
    res.forEach((r) => out.push(r.status === "fulfilled" ? `ok   ${r.value}` : `FAIL ${r.reason.message}`));
  }
  return out;
}

// --- fonts: self-host the latin + latin-ext subsets -----------------------
async function fonts() {
  const css = await (
    await fetch(FONTS, { headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36" } })
  ).text();
  const faces = [...css.matchAll(/\/\* ([\w-]+) \*\/\s*@font-face\s*\{([^}]+)\}/g)];
  const list = [];
  let local = "";
  for (const [, subset, body] of faces) {
    if (subset !== "latin" && subset !== "latin-ext") continue;
    const fam = body.match(/font-family: '([^']+)'/)[1];
    const w = body.match(/font-weight: (\d+)/)[1];
    const url = body.match(/url\((https:[^)]+\.woff2)\)/)[1];
    const name = `${fam.toLowerCase().replace(/\s+/g, "-")}-${w}-${subset}.woff2`;
    list.push([url, `fonts/${name}`]);
    local += `@font-face{font-family:"${fam}";font-style:normal;font-weight:${w};font-display:swap;src:url("/clones/${SLUG}/fonts/${name}") format("woff2");${body.match(/unicode-range:[^;]+;/)[0]}}\n`;
  }
  return { list, local };
}

// --- base64 extraction ------------------------------------------------------
async function extractInline() {
  const html = await readFile(join(RAW, "home.html"), "utf8");
  const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
  const scripts = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)].map((m) => m[2]);
  let css = styles[1];
  let main = scripts.find((s) => s.length > 100000);
  if (!css || !main) throw new Error("home.html layout changed: style[1] / main script not found");
  const seen = new Map();
  const swap = (src, prefix) =>
    src.replace(/data:image\/webp;base64,([A-Za-z0-9+/=]+)/g, (_, b64) => {
      if (seen.has(b64)) return seen.get(b64);
      const name = `${prefix}-${String(seen.size + 1).padStart(2, "0")}.webp`;
      const p = `/clones/${SLUG}/img/inline/${name}`;
      seen.set(b64, p);
      return p;
    });
  css = swap(css, "bg");
  // name the IMG map entries by their key so the files are legible
  main = main.replace(/(\b[a-z0-9]{2,3}):"data:image\/webp;base64,([A-Za-z0-9+/=]+)"/g, (_, k, b64) => {
    const p = `/clones/${SLUG}/img/inline/${k}.webp`;
    seen.set(b64, p);
    return `${k}:"${p}"`;
  });
  main = swap(main, "x");
  for (const [b64, p] of seen) {
    const buf = Buffer.from(b64, "base64");
    if (!MAGIC.webp(buf)) throw new Error(`inline image is not webp: ${p}`);
    await save(p.replace(`/clones/${SLUG}/`, ""), buf);
  }
  return { css, main, count: seen.size };
}

const { list: fontList, local } = await fonts();
const log = await batch([...files, ...fontList]);
const { css, main, count } = await extractInline();
await mkdir(join(RAW, "ported"), { recursive: true });
await writeFile(join(RAW, "ported", "home.css"), css);
await writeFile(join(RAW, "ported", "main.js"), main);
await writeFile(join(RAW, "ported", "fonts.css"), local);
console.log(log.join("\n"));
console.log(`inline images: ${count}; fonts: ${fontList.length}`);
const s = await stat(join(OUT, "js", "three.min.js"));
console.log(`three.min.js ${s.size}`);
if (log.some((l) => l.startsWith("FAIL"))) process.exitCode = 1;
