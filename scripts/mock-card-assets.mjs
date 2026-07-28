/**
 * Generate placeholder credential media for the /student-card clone.
 *
 *   node scripts/mock-card-assets.mjs [publicDir]
 *
 * The live target serves a real student portrait and a live QR code through
 * `/api/student-card/image?url=…`. Both are personally identifying, and this
 * repository is public, so they are never downloaded. These deterministic
 * placeholders occupy the same intrinsic dimensions (300x400 portrait,
 * 256x256 QR) so the layout matches the original pixel-for-pixel.
 */
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC_DIR = path.resolve(ROOT, process.argv[2] ?? "public");
const OUT = path.join(PUBLIC_DIR, "images");

const portrait = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400" role="img" aria-label="Retrato de exemplo">
  <rect width="300" height="400" fill="#e2e8f0"/>
  <circle cx="150" cy="150" r="62" fill="#90a1b9"/>
  <path d="M150 232c-62 0-112 42-112 94v74h224v-74c0-52-50-94-112-94z" fill="#90a1b9"/>
  <text x="150" y="376" text-anchor="middle" font-family="Segoe UI, Helvetica Neue, Arial, sans-serif" font-size="17" fill="#45556c">FOTO DE EXEMPLO</text>
</svg>
`;

/* Deterministic QR-like pattern: three finder squares + a fixed module field.
   Not a scannable code — a visual stand-in at the correct dimensions. */
function qr() {
  const N = 25;
  const S = 256 / N;
  const finder = (x, y) =>
    `<rect x="${x * S}" y="${y * S}" width="${S * 7}" height="${S * 7}" fill="#000"/>` +
    `<rect x="${(x + 1) * S}" y="${(y + 1) * S}" width="${S * 5}" height="${S * 5}" fill="#fff"/>` +
    `<rect x="${(x + 2) * S}" y="${(y + 2) * S}" width="${S * 3}" height="${S * 3}" fill="#000"/>`;

  const inFinder = (c, r) =>
    (c < 8 && r < 8) || (c > N - 9 && r < 8) || (c < 8 && r > N - 9);

  let mods = "";
  let seed = 1103515245;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      if (inFinder(c, r)) continue;
      if ((seed >> 16) % 2 === 0) {
        mods += `<rect x="${c * S}" y="${r * S}" width="${S}" height="${S}" fill="#000"/>`;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256" role="img" aria-label="QR Code de exemplo">
  <rect width="256" height="256" fill="#fff"/>
  ${mods}
  ${finder(0, 0)}${finder(N - 7, 0)}${finder(0, N - 7)}
</svg>
`;
}

await fs.mkdir(OUT, { recursive: true });
await fs.writeFile(path.join(OUT, "mock-student-photo.svg"), portrait);
await fs.writeFile(path.join(OUT, "mock-qr.svg"), qr());
console.log(`wrote mock-student-photo.svg + mock-qr.svg into ${path.relative(ROOT, OUT)}/`);
