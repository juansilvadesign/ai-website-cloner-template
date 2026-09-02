/**
 * Download the source media used by the Marcos Arruda clone.
 *
 * Usage:
 *   node scripts/download-marcos-arruda-assets.mjs
 *   node scripts/download-marcos-arruda-assets.mjs public/clones/marcos-arruda-com
 *
 * The clone never hotlinks its visual assets at runtime. This small, isolated
 * downloader deliberately lives beside the shared downloader so it cannot
 * change the source inventories maintained for other clones.
 */
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
const targetArg = process.argv.slice(2).find((arg) => !arg.startsWith("-"));
const PUBLIC_DIR = path.resolve(ROOT, targetArg ?? "public/clones/marcos-arruda-com");

const wixMedia = (asset) => `https://static.wixstatic.com/media/${asset}`;

/** [remote URL, local path relative to the clone public directory] */
const ASSETS = [
  ["https://static.parastorage.com/fonts/v2/af36905f-3c92-4ef9-b0c1-f91432f16ac1/v1/avenir-lt-w01_35-light1475496.woff2", "fonts/avenir-light.woff2"],
  ["https://static.parastorage.com/fonts/v2/74290729-59ae-4129-87d0-2eec3974dce1/v1/avenir-lt-w01_85-heavy1475544.woff2", "fonts/avenir-heavy.woff2"],
  ["https://static.wixstatic.com/ufonts/383800_41e87d27ad3b462a8acf019e3b451d3d/woff2/file.woff2", "fonts/space-grotesk-light.woff2"],
  ["https://static.wixstatic.com/ufonts/383800_5739929956b541d4bd527229dccb0dc4/woff2/file.woff2", "fonts/space-grotesk-bold.woff2"],
  ["https://static.wixstatic.com/ufonts/383800_c922c25472554192a1e66f3e024705ba/woff2/file.woff2", "fonts/space-grotesk-medium.woff2"],
  [wixMedia("f597f9_1426f895f88e45e9bc90b5d1e62c9588~mv2.jpg"), "seo/favicon.jpg"],
  [wixMedia("f597f9_8a84edd504ce4c318d64245ff29e0236~mv2.jpg"), "images/home-portrait.jpg"],
  [wixMedia("11062b_b192daaddb0b4d1cbc9b13d51634f645f000.jpg"), "images/home-fashion-poster.jpg"],
  ["https://video.wixstatic.com/video/11062b_b192daaddb0b4d1cbc9b13d51634f645/720p/mp4/file.mp4", "videos/home-fashion.mp4"],
  [wixMedia("f597f9_7b6d2cc23c0e458284672d824aa0ca98~mv2.png"), "images/logo-tidy.png"],
  [wixMedia("f597f9_94e71571eace429e840169f9a1dc5f35~mv2.png"), "images/logo-pvh.png"],
  [wixMedia("f597f9_eaba675017e940b98d4d73a3b2010742~mv2.png"), "images/logo-adidas.png"],
  [wixMedia("f597f9_633d826c392a4a34952bb0f03de20983~mv2.jpg"), "images/logo-jacobs.jpg"],
  [wixMedia("f597f9_1728b4be634e4b4a9cfb500195d41487~mv2.png"), "images/logo-city.png"],
  [wixMedia("f597f9_8eb712e8c35a4342b590d1f3e8003a6a~mv2.png"), "images/logo-local-digital.png"],
  [wixMedia("f597f9_dc66002a146744be90514319d3733ac0~mv2.jpg"), "images/about-portrait.jpg"],
  [wixMedia("11062b_86607c998b5340ea80017a09928f9ab1f000.jpg"), "images/case1-hero.jpg"],
  [wixMedia("f597f9_1514d9cec24540aca7545466006bfd1b~mv2.jpg"), "images/case1-mobile.jpg"],
  [wixMedia("f597f9_c2aa6aa67e4342249040ff3b95f171ac~mv2.png"), "images/case1-research-1.png"],
  [wixMedia("f597f9_71df895fe7624f1a874bd9eb1e0d6fbe~mv2.png"), "images/case1-research-2.png"],
  [wixMedia("f597f9_544c4bc97a784072b30016d9a413149a~mv2.png"), "images/case1-research-3.png"],
  [wixMedia("f597f9_6d04c555fe824bd3a5a12413743166f1f000.jpg"), "images/case2-hero.jpg"],
  [wixMedia("f597f9_398f4b76b09e40c5a4cd185d780d0cc3~mv2.jpeg"), "images/case2-field-1.jpeg"],
  [wixMedia("f597f9_17b67de2acf342cca60394d7834fed21~mv2.jpeg"), "images/case2-field-2.jpeg"],
  [wixMedia("f597f9_81a9c2d4a53044149827e6f48ddac15c~mv2.jpg"), "images/case2-field-3.jpg"],
  [wixMedia("f597f9_79a7324fb01f4703b93faac5610e8c0a~mv2.jpg"), "images/case2-field-4.jpg"],
  [wixMedia("f597f9_5303e7b5cb54473fa3e5d1aa36774f89~mv2.png"), "images/case2-field-5.png"],
  [wixMedia("11062b_174b6c75bfc44c1b91916829930a8c61f000.jpg"), "images/case3-hero.jpg"],
  [wixMedia("f597f9_f1284290a02446aeab32e03bbfa48e29~mv2.jpg"), "images/case3-ui-1.jpg"],
  [wixMedia("f597f9_e2844532d6e64c399cab987922695c70~mv2.jpg"), "images/case3-ui-2.jpg"],
  [wixMedia("f597f9_a1b4f591bd1f4caa875e913cb86862df~mv2.png"), "images/case3-ui-3.png"],
  [wixMedia("f597f9_dd36f6a75a484126ae6371f0c8eaf03c~mv2.png"), "images/case3-ui-4.png"],
  [wixMedia("f597f9_c8f21e5048354eab9444a135a01a2034~mv2.png"), "images/case3-ui-5.png"],
  [wixMedia("f597f9_ad92e87aaddf4d938677e059da9db654~mv2.jpg"), "images/portfolio-01.jpg"],
  [wixMedia("f597f9_418bb6e2507f45858fbae9d772d9a7c7~mv2.gif"), "images/portfolio-02.gif"],
  [wixMedia("f597f9_c1660123b0fd439bb8a3b67f9416c253~mv2.gif"), "images/portfolio-03.gif"],
  [wixMedia("f597f9_a67de350218c4e1d980e85f0220728e5~mv2.jpg"), "images/portfolio-04.jpg"],
  [wixMedia("f597f9_52fa819ccd9d45eeb37a07f8f37cc02b~mv2.jpg"), "images/portfolio-05.jpg"],
  [wixMedia("f597f9_7dd4546d694d4e27a3b4d518bef43f09~mv2.jpg"), "images/portfolio-06.jpg"],
  [wixMedia("f597f9_3fbb2056b8574c05a154c9609f8a1cec~mv2.jpg"), "images/portfolio-07.jpg"],
  [wixMedia("f597f9_6ac5ffbd1c394ae9be035db0a7d82a4e~mv2.gif"), "images/portfolio-08.gif"],
  [wixMedia("f597f9_56d2733e96c1472aaace951f6066f327~mv2.jpg"), "images/portfolio-09.jpg"],
  [wixMedia("f597f9_00805c1f7c534ccfa4fab69ce786e363~mv2.jpg"), "images/portfolio-10.jpg"],
  [wixMedia("f597f9_7b293f4e2d814d7c8672c8f9c9d0000c~mv2.jpg"), "images/portfolio-11.jpg"],
  [wixMedia("f597f9_ae66e2304d0b47c1b16607c21ed74855~mv2.jpg"), "images/portfolio-12.jpg"],
  [wixMedia("f597f9_b475bddc85754fa9bad01599001f7de1f003.jpg"), "images/motion-01.jpg"],
  [wixMedia("f597f9_0cb7062b65c242a28475f4e757b6fd43f003.jpg"), "images/motion-02.jpg"],
  [wixMedia("f597f9_ad8b1f1dbf8f4b879c0e5b7a230b367ff003.jpg"), "images/motion-03.jpg"],
  [wixMedia("f597f9_13a235b92ebd48c3baa1669caa4024ddf003.jpg"), "images/motion-04.jpg"],
  [wixMedia("f597f9_e11991acb4e04814bba946989cf91568f003.jpg"), "images/motion-05.jpg"],
  [wixMedia("f597f9_52ce17108e594a10a7d6924dc8731784f003.jpg"), "images/motion-06.jpg"],
  [wixMedia("f597f9_079d9f1015834f8d81ace02b0edd687ef003.jpg"), "images/motion-07.jpg"],
  [wixMedia("f597f9_cd7a27f26237462a843f2b97b963f963f003.jpg"), "images/motion-08.jpg"],
  [wixMedia("f597f9_9683d70e9c8446039ac494870eee6a98f003.jpg"), "images/motion-09.jpg"],
  [wixMedia("f597f9_d44c3f5b95e646099e61800d4672e60cf003.jpg"), "images/motion-10.jpg"],
  [wixMedia("f597f9_8f75dd71f96044a88249ee9809e94830f003.jpg"), "images/motion-11.jpg"],
  [wixMedia("f597f9_da141bc2318a47c1811c3d777f435be1f003.jpg"), "images/motion-12.jpg"],
  [wixMedia("f597f9_d1d0816f294c45c7a3ca2300bf8fc867~mv2.jpg"), "images/branding-01.jpg"],
  [wixMedia("f597f9_37c1e4e33ab243d69a0356cdfce74589~mv2.jpg"), "images/branding-02.jpg"],
  [wixMedia("f597f9_7359bc36097d4388bf4b1a85ef81ceb9~mv2.jpg"), "images/branding-03.jpg"],
  [wixMedia("f597f9_a67154b0ceb049fd8e5d6ef428d39c32~mv2.jpg"), "images/branding-04.jpg"],
  [wixMedia("f597f9_983cf56cd36947a4900c28a35801353f~mv2.jpg"), "images/branding-05.jpg"],
  [wixMedia("f597f9_ff0970f6a64641d3834ad70b9a6712c7~mv2.jpg"), "images/branding-06.jpg"],
  [wixMedia("f597f9_2245cba94c704b7f887244755ddbdaa0~mv2.jpg"), "images/branding-07.jpg"],
  [wixMedia("f597f9_70b48321d83c47feb61ade8aa05439cd~mv2.jpg"), "images/branding-08.jpg"],
  [wixMedia("f597f9_7128fdd4aa62440d8bb0311dbf5f9b07~mv2.jpg"), "images/branding-09.jpg"],
  [wixMedia("f597f9_2f8a6b1b533d47d6a0fb87b3ae9fbd2c~mv2.png"), "images/branding-10.png"],
  [wixMedia("f597f9_87dff659904f475d9bc48d93eb9ae547~mv2.jpg"), "images/branding-11.jpg"],
  [wixMedia("f597f9_9cb2691bb3804925912edc5697461692~mv2.jpg"), "images/branding-12.jpg"],
];

async function download([url, local]) {
  const destination = path.join(PUBLIC_DIR, local);
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} — ${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length === 0) throw new Error(`empty body — ${url}`);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, bytes);
  return { local, bytes: bytes.length };
}

const results = [];
const failures = [];
for (let index = 0; index < ASSETS.length; index += 4) {
  const batch = ASSETS.slice(index, index + 4);
  const settled = await Promise.allSettled(batch.map(download));
  settled.forEach((result, batchIndex) => {
    if (result.status === "fulfilled") results.push(result.value);
    else failures.push({ asset: batch[batchIndex][0], error: result.reason.message });
  });
}

for (const result of results) console.log(`  ok  ${result.local.padEnd(32)} ${result.bytes} bytes`);
for (const failure of failures) console.error(`  FAIL ${failure.asset} — ${failure.error}`);
console.log(`\n${results.length}/${ASSETS.length} Marcos Arruda asset(s) downloaded into ${path.relative(ROOT, PUBLIC_DIR)}/`);

if (failures.length > 0) process.exitCode = 1;
