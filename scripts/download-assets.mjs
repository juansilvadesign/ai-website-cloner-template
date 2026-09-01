/**
 * Download one clone's static assets into a supplied page target's public tree.
 *
 *   node scripts/download-assets.mjs [publicDir]
 *   node scripts/download-assets.mjs --clone helloparul-in public/clones/helloparul-in
 *   node scripts/download-assets.mjs --clone spaceship-com public/clones/spaceship-com
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
  "spaceship-com": {
    base: "https://spaceship-cdn.com",
    assets: [
      ["/spaceship-homepage-ui/assets/register-desktop.dc09772549f5ebb32b52.webp", "images/hero-register.webp"],
      ["/spaceship-homepage-ui/assets/transfer-desktop.ae2ee622aaf1894a3e5e.webp", "images/hero-transfer.webp"],
      ["/spaceship-homepage-ui/assets/primary-figure-desktop.db048b6c12ed6b8c04d9.webp", "images/hero-primary-figure.webp"],
      ["/spaceship-homepage-ui/assets/secondary-figure.da14b9ea376c65391051.webp", "images/hero-secondary-figure.webp"],
      ["/spaceship-homepage-ui/assets/benefits-1-desktop.7a323c156b83e1b3946b.webp", "images/benefit-domain.webp"],
      ["/spaceship-homepage-ui/assets/benefits-2-desktop.46ab19ec10a8706030c6.webp", "images/benefit-connections.webp"],
      ["/spaceship-homepage-ui/assets/benefits-3-desktop.5c92155befe59168a261.webp", "images/benefit-community.webp"],
      ["/spaceship-homepage-ui/assets/person-desktop.d8fd898e852b91d6f579.webp", "images/security-person.webp"],
      ["/spaceship-homepage-ui/assets/starlight.eaf2dcc7eb27f6a470ad.webp", "images/starlight.webp"],
      ["/spaceship-homepage-ui/assets/spacemail-product.c7afb0f51815d772336a.webp", "images/spacemail.webp"],
      ["/spaceship-homepage-ui/assets/meta-image.67211176d9ea9268ae27.jpg", "images/meta-image.jpg"],
      ["/spaceship-homepage-ui/assets/animation-fallback.b5f21a289314e7d99db4.svg", "images/animation-fallback.svg"],
      ["/spaceship-homepage-ui/assets/alf-desktop.ae9dd6461037c79b5297.mp4", "videos/alf-desktop.mp4"],
      ["/static/spaceship/favicon/spaceship-icon.svg", "seo/favicon.svg"],
      ["/static/spaceship/favicon/spaceship-apple-touch-icon.png", "seo/apple-touch-icon.png"],
      ["https://spaceship-cdn.com/sharedstaticresources-ui/9a93ecd23c2ef0fb7f8e.9a93ecd23c2ef0fb7f8e.woff2", "fonts/spaceship-sans-400.woff2"],
      ["https://spaceship-cdn.com/sharedstaticresources-ui/9845558fc59cb1ba1b87.9845558fc59cb1ba1b87.woff2", "fonts/spaceship-sans-500.woff2"],
      ["https://spaceship-cdn.com/sharedstaticresources-ui/ff0080baa663b824059b.ff0080baa663b824059b.woff2", "fonts/spaceship-sans-700.woff2"],
    ],
  },
  "bridgeandhuman-com": {
    base: "https://www.bridgeandhuman.com",
    assets: [
      ["https://framerusercontent.com/assets/JIBhCGpTch171J3WANyVEQDw.mp4", "videos/hero-orchestra.mp4"],
      ["https://framerusercontent.com/images/3dqO2pOqEGhikA9M7mc1ZVLA.png?width=1016&height=1016", "images/hero-orchestra-poster.png"],
      ["https://framerusercontent.com/assets/FcobIz4BN8muKxCrOxQFQrNZTiY.mp4", "videos/launch-identity.mp4"],
      ["https://framerusercontent.com/images/JBWuRpSqZlCsudQKju773vpG6cY.jpg?width=2048&height=2048", "images/launch-identity-poster.jpg"],
      ["https://framerusercontent.com/images/iIghx1dev40lQpZcGbaGf4Jznw.svg?width=1375&height=242", "images/launch-identity-logo.svg"],
      ["https://framerusercontent.com/images/lrsW6h16vtjb1ozA0dULu6KVE.jpg?width=2048&height=2048", "images/bitcoin-angels-one.jpg"],
      ["https://framerusercontent.com/images/NjJej63zG9uKtT9fgpfCqhEW9bc.jpg?width=2048&height=2048", "images/bitcoin-angels-two.jpg"],
      ["https://framerusercontent.com/images/Nhzu4dblw8hmqXBB5X33dqgVug.png?width=1024&height=1024", "images/ecommerce-background.png"],
      ["https://framerusercontent.com/images/soPQPYCn8gixDGEn7P7iMPGPD8I.png?width=2272&height=1586", "images/ecommerce-desktop.png"],
      ["https://framerusercontent.com/images/j1QjaDtCPVAnmNiKNcGGJG1QjY.png?width=1682&height=2672", "images/ecommerce-mobile.png"],
      ["https://framerusercontent.com/images/Ex7GCntcexjTWTLB4tDXLB3i2o8.png?width=2160&height=2160", "images/onboarding-background.png"],
      ["https://framerusercontent.com/images/BtIN6LrKi5r7jYG8bfc7pE50.gif?width=1364&height=762", "images/onboarding-desktop.gif"],
      ["https://framerusercontent.com/images/W4pW5W2Ph9qZydc2USrmi7Q6lOg.gif?width=358&height=636", "images/onboarding-mobile.gif"],
      ["https://framerusercontent.com/images/nbD7ohlbjIpPMexuIf6i8Q31E.png?width=2360&height=352", "images/haven-graphic.png"],
      ["https://framerusercontent.com/images/YAHlQXPGTAEy8bAG1zZsNzM5ESc.png?width=3024&height=1740", "images/haven-screenshot.png"],
      ["https://framerusercontent.com/assets/tzJJeFicep9l7lZb6epPE7Jt0s.mp4", "videos/publish-kit.mp4"],
      ["https://framerusercontent.com/images/Rv0qFh4GAZGAaA5io5fZOGTw7w.png?width=2048&height=2048", "images/publish-kit-poster.png"],
      ["https://framerusercontent.com/assets/5sGqWH0Y1z5XnJx0FsQKLxA.mp4", "videos/closing-story.mp4"],
      ["https://framerusercontent.com/images/3H3HHcEqPd1xFSxcjm8LZyK9Cc4.png?width=1024&height=1024", "images/closing-story-poster.png"],
      ["https://framerusercontent.com/images/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg", "images/gallery-previous.svg"],
      ["https://framerusercontent.com/images/11KSGbIZoRSg4pjdnUoif6MKHI.svg", "images/gallery-next.svg"],
      ["https://framerusercontent.com/images/HjqsKyhr4eTPXS8WuYuyvsmC8.png", "seo/favicon-32.png"],
      ["https://framerusercontent.com/images/2c22VHaDDGEiFjJiQCj53GEwUk.png", "seo/favicon-192.png"],
      ["https://framerusercontent.com/images/HgmfIs0x5Wi6PKU8vMrdDcxh0ig.png", "seo/apple-touch-icon.png"],
      ["https://framerusercontent.com/images/iVxkZqSg2KWkYP06SFLgL57udVg.png", "seo/og.png"],
      ["https://fonts.gstatic.com/s/geist/v4/gyBhhwUxId8gMGYQMKR3pzfaWI_RnOMImpna.woff2", "fonts/geist-latin-400.woff2"],
      ["https://fonts.gstatic.com/s/ibmplexsans/v23/zYXzKVElMYYaJe8bpLHnCwDKr932-G7dytD-Dmu1syxeKYY.woff2", "fonts/ibm-plex-sans-latin.woff2"],
      ["https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1i8q1w.woff2", "fonts/ibm-plex-mono-latin-400.woff2"],
      ["https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3twJwlBFgg.woff2", "fonts/ibm-plex-mono-latin-500.woff2"],
    ],
  },
  "reflect-app": {
    base: "https://reflect.app",
    assets: [
      ["/home/build/q-7110c4a0.png", "images/logo.png"],
      ["/home/build/q-cb311d1c.png", "images/hero-preview.png"],
      ["/home/build/q-c3d7becf.webm", "videos/hero-demo.webm"],
      ["/home/build/q-171a9a33.png", "seo/apple-touch-icon.png"],
      // NOTE: reflect.app inlines its favicon as a base64 data: URI in
      // <link rel="icon">, so there is no URL to fetch. The decoded 36x36
      // PNG is committed at seo/favicon.png. The build hash previously
      // listed here (q-4c8a7e22.png) is a 704x1320 mobile app screenshot,
      // not an icon.
      ["/home/fonts/InterV/regular.woff2", "fonts/inter-v-regular.woff2"],
      ["/home/fonts/InterV/medium.woff2", "fonts/inter-v-medium.woff2"],
      ["/home/fonts/AeonikPro/medium.woff2", "fonts/aeonik-pro-medium.woff2"],
      ["https://site.reflect.app/home/build/q-11289093.jpeg", "seo/opengraph.jpg"],
    ],
  },
  "bio-nutriruama-com-br": {
    base: "https://bio.nutriruama.com.br",
    assets: [
      ["/images/logo.svg", "images/logo.svg"],
      ["/images/created-by-dudes.svg", "images/created-by-dudes.svg"],
      ["/images/emagrecer-com-sabor.svg", "images/emagrecer-com-sabor.svg"],
      ["/images/card-protocolo.webp", "images/card-protocolo.webp"],
      ["/images/hero-poster.jpg", "images/hero-poster.jpg"],
      ["/videos/hero.mp4", "videos/hero.mp4"],
      ["/images/menu-card.webp", "images/menu-card.webp"],
      ["/images/card-consulta.webp", "images/card-consulta.webp"],
      ["/images/card-consulta-mobile.webp", "images/card-consulta-mobile.webp"],
      ["/images/card-emagreca.webp", "images/card-emagreca.webp"],
      ["/images/card-emagreca-mobile.webp", "images/card-emagreca-mobile.webp"],
      ["/images/card-reset.webp", "images/card-reset.webp"],
      ["/images/card-reset-mobile.webp", "images/card-reset-mobile.webp"],
      ["/images/card-parceria-novo.png", "images/card-parceria-novo.png"],
      ["/favicon.ico", "seo/favicon.ico"],
      ["/og.jpg", "seo/og.jpg"],
      ["/_next/static/media/f7aa21714c1c53f8-s.p.0-95eo-012xnf.woff2", "fonts/figtree-latin.woff2"],
      ["/_next/static/media/e8f2fbee2754df70-s.p.1dqa_6e_ad4sj.woff2", "fonts/montserrat-latin.woff2"],
      ["/_next/static/media/2f19417f17ff8e58-s.p.257evxe-10jj3.woff2", "fonts/questrial-latin.woff2"],
      ["/_next/static/media/roxboroughcf_light-s.p.331t9k9zig7ju.otf", "fonts/roxborough-light.otf"],
      ["/_next/static/media/roxboroughcf_regular-s.p.0orocrgj3emh0.otf", "fonts/roxborough-regular.otf"],
      ["/_next/static/media/roxboroughcf_medium-s.p.132h-_c6g7po6.otf", "fonts/roxborough-medium.otf"],
      ["/_next/static/media/roxboroughcf_demibold-s.p.2-6jokee8g8b9.otf", "fonts/roxborough-demibold.otf"],
      ["/_next/static/media/roxboroughcf_bold-s.p.0b0vant1fxfxn.otf", "fonts/roxborough-bold.otf"],
      ["/_next/static/media/roxboroughcf_extrabold-s.p.27azk124q2in4.otf", "fonts/roxborough-extrabold.otf"],
      ["/_next/static/media/roxboroughcf_heavy-s.p.3zq46ltl9wqxw.otf", "fonts/roxborough-heavy.otf"],
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
