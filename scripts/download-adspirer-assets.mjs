/**
 * Downloads the public visual assets used by the Adspirer home-page clone.
 *
 * Usage:
 *   node scripts/download-adspirer-assets.mjs
 *
 * Assets intentionally live in the clone namespace so they cannot collide with
 * another extraction run. The list comes from the live DOM, its preload tags,
 * and the page's public stylesheet references.
 */
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DESTINATION = path.join(ROOT, "public", "clones", "adspirer-com");
const BASE = "https://www.adspirer.com";

/** @type {Array<[string, string]>} */
const assets = [
  ["/webflow/images/adspirer-logo-full.svg", "images/adspirer-logo-full.svg"],
  ["/webflow/images/platform-google-ads.svg", "images/platform-google-ads.svg"],
  ["/webflow/images/platform-google-shopping.svg", "images/platform-google-shopping.svg"],
  ["/webflow/images/platform-meta-ads.svg", "images/platform-meta-ads.svg"],
  ["/webflow/images/platform-meta-catalog.svg", "images/platform-meta-catalog.svg"],
  ["/webflow/images/platform-linkedin-ads.svg", "images/platform-linkedin-ads.svg"],
  ["/webflow/images/platform-tiktok-ads.svg", "images/platform-tiktok-ads.svg"],
  ["/webflow/images/platform-amazon-ads.svg", "images/platform-amazon-ads.svg"],
  ["/webflow/images/platform-chatgpt-ads.svg", "images/platform-chatgpt-ads.svg"],
  ["/webflow/images/ai-chatgpt.svg", "images/ai-chatgpt.svg"],
  ["/webflow/images/ai-claude.svg", "images/ai-claude.svg"],
  ["/webflow/images/ai-claude-code.svg", "images/ai-claude-code.svg"],
  ["/webflow/images/ai-codex.svg", "images/ai-codex.svg"],
  ["/webflow/images/ai-cursor.svg", "images/ai-cursor.svg"],
  ["/webflow/images/ai-windsurf.svg", "images/ai-windsurf.svg"],
  ["/webflow/images/ai-open-claw.svg", "images/ai-open-claw.svg"],
  ["/webflow/images/ai-perplexity.svg", "images/ai-perplexity.svg"],
  ["/webflow/images/ai-manus.svg", "images/ai-manus.svg"],
  ["/webflow/images/logo-boden.svg", "images/logo-boden.svg"],
  ["/webflow/images/logo-zozo.svg", "images/logo-zozo.svg"],
  ["/webflow/images/logo-splash-financial.svg", "images/logo-splash-financial.svg"],
  ["/webflow/images/logo-nextbase.png", "images/logo-nextbase.png"],
  ["/webflow/images/logo-chosen-foods.png", "images/logo-chosen-foods.png"],
  ["/webflow/images/logo-inside-real-estate.svg", "images/logo-inside-real-estate.svg"],
  ["/webflow/images/logo-dantes-ink.png", "images/logo-dantes-ink.png"],
  ["/webflow/images/logo-statknows.png", "images/logo-statknows.png"],
  ["/webflow/images/logo-truth.png", "images/logo-truth.png"],
  ["/webflow/images/logo-we-are-stellar.svg", "images/logo-we-are-stellar.svg"],
  ["/webflow/images/logo-enkindle.svg", "images/logo-enkindle.svg"],
  ["/webflow/images/logo-permagreen.png", "images/logo-permagreen.png"],
  ["/webflow/images/logo-jack-vartanian.png", "images/logo-jack-vartanian.png"],
  ["/webflow/images/logo-maxwell-clinic.png", "images/logo-maxwell-clinic.png"],
  ["/webflow/images/logo-alesmith.png", "images/logo-alesmith.png"],
  ["/webflow/images/logo-mega-furniture.png", "images/logo-mega-furniture.png"],
  ["/webflow/images/logo-the-urban-geek.png", "images/logo-the-urban-geek.png"],
  ["/webflow/images/blur_1blur.avif", "images/blur-1.avif"],
  ["/webflow/images/adspirer-works-where.svg", "images/adspirer-works-where.svg"],
  ["/webflow/images/adspirer-watches-spend.svg", "images/adspirer-watches-spend.svg"],
  ["/webflow/images/adspirer-knows-brand.svg", "images/adspirer-knows-brand.svg"],
  ["/webflow/images/adspirer-step-onboard.svg", "images/adspirer-step-onboard.svg"],
  ["/webflow/images/adspirer-step-delegate.svg", "images/adspirer-step-delegate.svg"],
  ["/webflow/images/adspirer-step-supervise.svg", "images/adspirer-step-supervise.svg"],
  ["/webflow/images/setup-chatgpt.svg", "images/setup-chatgpt.svg"],
  ["/webflow/images/setup-claude.svg", "images/setup-claude.svg"],
  ["/webflow/images/setup-codex.svg", "images/setup-codex.svg"],
  ["/webflow/images/setup-claude-code.svg", "images/setup-claude-code.svg"],
  ["/webflow/images/setup-open-claw.svg", "images/setup-open-claw.svg"],
  ["/webflow/images/setup-perplexity.svg", "images/setup-perplexity.svg"],
  ["/webflow/images/setup-cursor.svg", "images/setup-cursor.svg"],
  ["/webflow/images/setup-windsurf.svg", "images/setup-windsurf.svg"],
  ["/webflow/images/setup-manus.svg", "images/setup-manus.svg"],
  ["/webflow/images/Check-Circle.svg", "images/check-circle.svg"],
  ["/webflow/images/Info-Circle.svg", "images/info-circle.svg"],
  ["/icons/google-ads-icon.svg", "icons/google-ads-icon.svg"],
  ["/icons/meta-icon.svg", "icons/meta-icon.svg"],
  ["/icons/tiktok-solo-icon.svg", "icons/tiktok-solo-icon.svg"],
  ["/icons/adspirer-app-icon.svg", "icons/adspirer-app-icon.svg"],
  ["/icons/chatgpt-icon.svg", "icons/chatgpt-icon.svg"],
  ["/icons/claude-ai-icon.svg", "icons/claude-ai-icon.svg"],
  ["/icons/google-gemini-icon.svg", "icons/google-gemini-icon.svg"],
  ["/_next/static/media/caa3a2e1cccd8315-s.p.0wgildi0cnwt9.woff2", "fonts/geist-latin.woff2"],
  ["/_next/static/media/83afe278b6a6bb3c-s.p.2bn3s6zvc0dyp.woff2", "fonts/inter-latin.woff2"],
  ["/_next/static/media/f06bf9da926bae75-s.p.2874ccu1_u7jf.woff2", "fonts/instrument-sans-latin.woff2"],
  ["/favicon.ico", "seo/favicon.ico"],
  ["/favicon.svg", "seo/favicon.svg"],
  ["/favicon.png", "seo/favicon.png"],
  ["/apple-icon.png", "seo/apple-icon.png"],
  ["/opengraph.jpg", "seo/opengraph.jpg"],
  ["/manifest.json", "seo/manifest.json"],
  [
    "https://cdn.prod.website-files.com/62ee7ab65cac0ad27a68a870/6929eab6ee4f91625f1c7b45_Gradient.svg",
    "images/feature-gradient-primary.svg",
  ],
  [
    "https://cdn.prod.website-files.com/62ee7ab65cac0ad27a68a870/6929eab6b0327281ab59f84d_Gradient.svg",
    "images/feature-gradient-secondary.svg",
  ],
  [
    "https://cdn.prod.website-files.com/62ee7ab65cac0ad27a68a870/692991a0a9107dc1a72dca59_Gradient.svg",
    "images/footer-gradient-primary.svg",
  ],
  [
    "https://cdn.prod.website-files.com/62ee7ab65cac0ad27a68a870/692991a0ca242c255ebe8481_Gradient.svg",
    "images/footer-gradient-secondary.svg",
  ],
];

async function download([remote, local]) {
  const url = remote.startsWith("http") ? remote : new URL(remote, BASE).href;
  const destination = path.join(DESTINATION, local);
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} — ${url}`);
  }

  const content = Buffer.from(await response.arrayBuffer());
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, content);
  return { local, bytes: content.byteLength };
}

const results = [];
const failures = [];

for (let index = 0; index < assets.length; index += 4) {
  const batch = assets.slice(index, index + 4);
  const completed = await Promise.allSettled(batch.map(download));
  completed.forEach((item, offset) => {
    if (item.status === "fulfilled") results.push(item.value);
    else failures.push({ asset: batch[offset][0], error: item.reason.message });
  });
}

for (const result of results) {
  console.log(`  ok  ${result.local.padEnd(48)} ${result.bytes} bytes`);
}
for (const failure of failures) {
  console.error(`  FAIL ${failure.asset} — ${failure.error}`);
}

console.log(`\n${results.length}/${assets.length} Adspirer assets downloaded.`);
if (failures.length > 0) process.exitCode = 1;
