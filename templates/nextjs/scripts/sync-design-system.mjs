import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const templateRoot = path.resolve(scriptDirectory, "..");
const repositoryRoot = path.resolve(templateRoot, "../..");
const slug = process.env.DESIGN_SYSTEM_SLUG ?? "psiativa";

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  throw new Error(
    `Invalid DESIGN_SYSTEM_SLUG "${slug}". Expected lowercase kebab-case.`,
  );
}

const sourceDirectory = path.join(repositoryRoot, "design-systems", slug);
const targetDirectory = path.join(
  templateRoot,
  "src",
  "styles",
  "design-system",
);

await mkdir(targetDirectory, { recursive: true });

for (const fileName of ["tokens.css", "tailwind-v4.css"]) {
  await copyFile(
    path.join(sourceDirectory, fileName),
    path.join(targetDirectory, fileName),
  );
}

console.log(`Synced OpenDesign package "${slug}" into the Next.js target.`);
