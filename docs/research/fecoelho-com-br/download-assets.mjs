import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const projectRoot = path.resolve(import.meta.dirname, "../../..");
const publicDir = path.resolve(
  projectRoot,
  process.argv[2] ?? "public/clones/fecoelho-com-br",
);

/** [remote URL, local path relative to publicDir] */
const assets = [
  ["https://fecoelho.com.br/card/fernanda-avatar.jpg", "images/fernanda-avatar.jpg"],
  ["https://fecoelho.com.br/assets/og-image.jpg", "seo/og-image.jpg"],
  ["https://fecoelho.com.br/card/fernanda-coelho.vcf", "fernanda-coelho.vcf"],
  ["https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2", "fonts/inter-latin.woff2"],
  ["https://fonts.gstatic.com/s/spacegrotesk/v22/V8mDoQDjQSkFtoMM3T6r8E7mPbF4Cw.woff2", "fonts/space-grotesk-latin.woff2"],
];

async function download([url, local]) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "Mozilla/5.0 (compatible; PsiAtivaCloneEvidence/1.0)" },
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} — ${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length === 0) throw new Error(`empty body — ${url}`);
  const destination = path.join(publicDir, local);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, bytes);
  return { local, bytes: bytes.length, contentType: response.headers.get("content-type") };
}

const results = [];
const failures = [];

for (let index = 0; index < assets.length; index += 4) {
  const batch = assets.slice(index, index + 4);
  const settled = await Promise.allSettled(batch.map(download));
  settled.forEach((result, offset) => {
    if (result.status === "fulfilled") results.push(result.value);
    else failures.push({ url: batch[offset][0], error: result.reason.message });
  });
}

for (const result of results) {
  console.log(`ok   ${result.local.padEnd(34)} ${String(result.bytes).padStart(8)} bytes  ${result.contentType ?? "unknown"}`);
}
for (const failure of failures) console.error(`FAIL ${failure.url} — ${failure.error}`);
console.log(`\n${results.length}/${assets.length} assets downloaded into ${path.relative(projectRoot, publicDir)}/`);

if (failures.length > 0) process.exitCode = 1;
