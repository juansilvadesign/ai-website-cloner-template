#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// eject-clone — copy one clone out of this repo as a standalone Astro project.
// ─────────────────────────────────────────────────────────────────────────────
//
//   node scripts/eject-clone.mjs <slug> [target-dir] [options]
//   npm run eject -- <slug> [target-dir] [options]
//
// A clone lives in five namespaced paths so clones can coexist here. A project
// someone actually works in has none of that namespacing, so ejection flattens:
//
//   src/clones/<slug>/{components,layouts,styles,types}  →  src/{…}
//   src/pages/<slug>/…                                   →  src/pages/…
//   public/clones/<slug>/…                               →  public/…
//   design-systems/<slug>/…                              →  design-system/…
//   docs/research/<slug>/…                               →  docs/…
//
// Flattening moves every file, which invalidates two different kinds of
// reference, and they must NOT be treated the same way:
//
//   1. Root-relative URLs — `/clones/fesn/images/x.png`, `href="/fesn/vendas/"`.
//      These lose the namespace prefix: `/images/x.png`, `href="/"`.
//   2. Relative module specifiers — `../../clones/fesn/layouts/BaseLayout.astro`,
//      `@import "../../../../design-systems/fesn/tokens.css"`. These keep pointing
//      at the same file, but the depth between the two files changed.
//
// A blind `/clones/fesn/` → `/` string replace corrupts every specifier in
// category 2, because `../../clones/fesn/components/X.astro` contains that
// substring. So instead of string surgery this resolves each relative specifier
// to a real file, maps that file through the same plan the copy uses, and
// recomputes the relative path from the destination. A specifier is only ever
// rewritten when it resolves to a file that is actually being carried over —
// anything else is left alone and reported as a warning.
//
// The design system is copied whole and stays a frozen artifact: the emitter and
// its guard need an OpenDesign checkout, so re-emission stays in the cloner.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Extensions rewritten as text. Everything else is copied byte-for-byte. */
const TEXT_EXTENSIONS = new Set([
  ".astro", ".ts", ".tsx", ".js", ".mjs", ".cjs", ".css", ".md", ".html", ".json", ".svg", ".txt",
]);

/** Tried in order when a relative specifier has no extension (`../types/fesn`). */
const RESOLVE_EXTENSIONS = [".ts", ".astro", ".tsx", ".mjs", ".js", ".css", ".json"];

/** Copied verbatim because a clone imports them but does not own them. */
const SHARED_FILES = ["src/styles/reset.css", "src/env.d.ts"];

const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

// ─── Path helpers ────────────────────────────────────────────────────────────

const toPosix = (p) => p.split(path.sep).join("/");
const fromPosix = (p) => p.split("/").join(path.sep);

/**
 * The single source of truth for where a repo file lands in the ejected project.
 * Returns a POSIX repo-relative destination, or `null` when the file does not
 * travel. Both the copy plan and the relative-specifier rewriter go through it,
 * so they can never disagree about the layout.
 */
function mapRepoPath(repoPath, slug) {
  const p = toPosix(repoPath);

  // The registry entry is meaningless outside the hub.
  if (p === `src/clones/${slug}/clone.config.ts`) return null;

  const moves = [
    [`src/clones/${slug}/`, "src/"],
    [`src/pages/${slug}/`, "src/pages/"],
    [`public/clones/${slug}/`, "public/"],
    [`design-systems/${slug}/`, "design-system/"],
    [`docs/research/${slug}/`, "docs/"],
  ];
  for (const [prefix, replacement] of moves) {
    if (p.startsWith(prefix)) return replacement + p.slice(prefix.length);
  }

  if (SHARED_FILES.includes(p)) return p;
  return null;
}

/** Every file under `dir`, as POSIX repo-relative paths. */
function walk(absDir, repoRoot, out = []) {
  for (const entry of fs.readdirSync(absDir, { withFileTypes: true })) {
    const abs = path.join(absDir, entry.name);
    if (entry.isDirectory()) walk(abs, repoRoot, out);
    else if (entry.isFile()) out.push(toPosix(path.relative(repoRoot, abs)));
  }
  return out;
}

const isFile = (repoRoot, repoPath) => {
  const abs = path.join(repoRoot, fromPosix(repoPath));
  return fs.existsSync(abs) && fs.statSync(abs).isFile();
};

/**
 * Resolve a specifier the way a bundler would: exact hit, then extensions, then
 * a directory index. Reports which extension it had to add so the rewritten
 * specifier can stay extensionless if the original was.
 */
function resolveSpecifier(repoRoot, target) {
  if (isFile(repoRoot, target)) return { repoPath: target, addedSuffix: "" };
  for (const ext of RESOLVE_EXTENSIONS) {
    if (isFile(repoRoot, target + ext)) return { repoPath: target + ext, addedSuffix: ext };
  }
  for (const ext of RESOLVE_EXTENSIONS) {
    const indexed = `${target}/index${ext}`;
    if (isFile(repoRoot, indexed)) return { repoPath: indexed, addedSuffix: `/index${ext}` };
  }
  return null;
}

// ─── Reference rewriting ─────────────────────────────────────────────────────

/** Quoted strings, escape-aware, single-line — enough for any path literal. */
const QUOTED = /(["'`])((?:\\.|(?!\1)[^\\\r\n])*?)\1/g;
/** Unquoted `url(…)` only; the quoted form is already covered by QUOTED. */
const BARE_URL = /url\(\s*([^'"()\s]+)\s*\)/g;
/** Markdown link and image targets. */
const MD_TARGET = /\]\(([^)\s]+)\)/g;

/**
 * Rewrite one path-like token. Relative specifiers are re-resolved against the
 * copy plan; root-relative URLs lose their namespace prefix; anything else is
 * left exactly as it was.
 */
function rewriteToken(value, ctx) {
  const { slug, repoRoot, repoFrom, repoTo, warnings } = ctx;

  if (value.startsWith("./") || value.startsWith("../")) {
    const target = path.posix.normalize(path.posix.join(path.posix.dirname(repoFrom), value));
    const resolved = resolveSpecifier(repoRoot, target);
    if (!resolved) return value;

    const mapped = mapRepoPath(resolved.repoPath, slug);
    if (!mapped) {
      warnings.push(
        `${repoFrom}: "${value}" points at ${resolved.repoPath}, which is not carried over — left as-is`,
      );
      return value;
    }

    let rel = path.posix.relative(path.posix.dirname(repoTo), mapped);
    // Give back whatever the resolver had to add, so `../types/fesn` stays
    // extensionless and a directory import stays a directory import.
    if (resolved.addedSuffix && rel.endsWith(resolved.addedSuffix)) {
      rel = rel.slice(0, -resolved.addedSuffix.length);
    }
    if (!rel.startsWith(".")) rel = `./${rel}`;
    return rel;
  }

  if (value.startsWith("/")) {
    for (const prefix of [`/clones/${slug}`, `/${slug}`]) {
      if (value === prefix) return "/";
      if (value.startsWith(`${prefix}/`)) return `/${value.slice(prefix.length + 1)}`;
    }
  }

  return value;
}

/**
 * Prose mentions of repo paths — comments in components, and the research docs
 * that describe where a file lives. Anchored on a delimiter so it can never fire
 * inside a relative specifier that pass one already rewrote.
 */
function rewritePathMentions(text, slug) {
  // Ordered: the slug-specific rules must win before the bare folder rename, so
  // `design-systems/<slug>/` collapses to `design-system/` rather than being
  // half-renamed to `design-system/<slug>/`.
  const mentions = [
    [`src/clones/${slug}/`, "src/"],
    [`src/pages/${slug}/`, "src/pages/"],
    [`public/clones/${slug}/`, "public/"],
    [`design-systems/${slug}/`, "design-system/"],
    [`docs/research/${slug}/`, "docs/"],
    ["design-systems/", "design-system/"],
  ];
  let out = text;
  let count = 0;
  for (const [from, to] of mentions) {
    const pattern = new RegExp(`(^|[\\s(\\[<"'\`])${from.replace(/[/]/g, "\\/")}`, "gm");
    out = out.replace(pattern, (_m, lead) => {
      count += 1;
      return lead + to;
    });
  }
  return { text: out, count };
}

/** Apply every rewrite rule to one file's contents. */
function rewriteFile(text, ctx) {
  let count = 0;
  const swap = (value) => {
    const next = rewriteToken(value, ctx);
    if (next !== value) count += 1;
    return next;
  };

  let out = text.replace(QUOTED, (match, quote, value) => {
    const next = swap(value);
    return next === value ? match : `${quote}${next}${quote}`;
  });

  out = out.replace(BARE_URL, (match, value) => {
    const next = swap(value);
    return next === value ? match : `url(${next})`;
  });

  if (ctx.repoTo.endsWith(".md")) {
    out = out.replace(MD_TARGET, (match, value) => {
      const next = swap(value);
      return next === value ? match : `](${next})`;
    });
  }

  const mentions = rewritePathMentions(out, ctx.slug);
  return { text: mentions.text, count: count + mentions.count };
}

// ─── Clone metadata ──────────────────────────────────────────────────────────

/**
 * Read `clone.config.ts` for the README. Node strips the type annotations, and
 * the file's only import is an erased `import type`, so no TS toolchain is
 * needed. Metadata is a nicety — a failure here degrades the README, it never
 * blocks the ejection.
 */
async function loadCloneMeta(repoRoot, slug, warnings) {
  const abs = path.join(repoRoot, "src", "clones", slug, "clone.config.ts");
  if (!fs.existsSync(abs)) return null;
  try {
    const mod = await import(pathToFileURL(abs).href);
    const clone = Object.values(mod).find((v) => v && typeof v === "object" && v.meta?.slug === slug);
    return clone ?? null;
  } catch (error) {
    warnings.push(
      `Could not read ${slug}/clone.config.ts (${error.message}). The README falls back to generic copy.`,
    );
    return null;
  }
}

// ─── Generated project files ─────────────────────────────────────────────────

function readRootPackage(repoRoot) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, "package.json"), "utf8"));
}

function generatePackageJson(slug, meta, rootPkg) {
  const pick = (name, fallback) =>
    rootPkg.dependencies?.[name] ?? rootPkg.devDependencies?.[name] ?? fallback;

  return `${JSON.stringify(
    {
      name: slug.replace(/[^a-z0-9-]/g, "-"),
      version: "0.1.0",
      private: true,
      type: "module",
      description: meta?.meta.description ?? `Standalone Astro project for the ${slug} clone.`,
      engines: rootPkg.engines,
      scripts: {
        dev: "astro dev",
        build: "astro build",
        preview: "astro preview",
        check: "astro check && astro build",
      },
      dependencies: { astro: pick("astro", "^7.1.3") },
      devDependencies: {
        "@astrojs/check": pick("@astrojs/check", "^0.9.9"),
        typescript: pick("typescript", "^6.0.3"),
      },
    },
    null,
    2,
  )}\n`;
}

const ASTRO_CONFIG = `import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  server: {
    host: true,
    port: 4321,
  },
});
`;

const TSCONFIG = `${JSON.stringify(
  {
    extends: "astro/tsconfigs/strict",
    include: [".astro/types.d.ts", "src/**/*", "astro.config.mjs"],
    exclude: ["dist", "node_modules", "design-system"],
  },
  null,
  2,
)}\n`;

const GITIGNORE = `# Dependencies
node_modules/

# Build
.astro/
dist/

# Environment
.env
.env.local
.env.production.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.idea/
.vscode/
*.swp

# OS
.DS_Store
Thumbs.db

# TypeScript
*.tsbuildinfo
`;

function generateReadme(slug, meta, rootPkg) {
  const m = meta?.meta;
  const title = m?.name ?? slug;
  const routes = meta?.routes ?? [];
  const origin = rootPkg.repository?.url?.replace(/\.git$/, "") ?? "the AI website cloner template";

  const flatten = (p) => {
    const stripped = p.replace(new RegExp(`^/${slug}(/|$)`), "/");
    return stripped === "" ? "/" : stripped;
  };

  const routeTable = routes.length
    ? [
        "| Route | Reproduces | Notes |",
        "| --- | --- | --- |",
        ...routes.map(
          (r) => `| \`${flatten(r.path)}\` | \`${r.sourcePath}\` | ${r.note ?? r.label} |`,
        ),
        "",
      ].join("\n")
    : "";

  return `# ${title}

${m?.description ?? "A reverse-engineered static site."}

${m ? `Extracted from [${m.sourceUrl.replace(/^https?:\/\//, "")}](${m.sourceUrl}) on ${m.clonedAt}.` : ""}

## Quickstart

\`\`\`bash
npm i
npm run dev
\`\`\`

| Command | What it does |
| --- | --- |
| \`npm run dev\` | Astro dev server on :4321 |
| \`npm run build\` | Static build into \`dist/\` |
| \`npm run preview\` | Serve the production build |
| \`npm run check\` | Typecheck, then build |

${routeTable}## Structure

\`\`\`text
src/
  pages/            routes, served from the root
  components/       section components, scoped vanilla CSS
  layouts/          page shell, metadata, favicon
  styles/
    clone.css       imports the design system's tokens.css + reset.css
    reset.css       token-free reset
  types/
public/             images, seo assets — referenced from the root
design-system/      emitted OpenDesign v1 package
docs/               extraction evidence: topology, behaviors, component specs
\`\`\`

## Design system

\`design-system/\` is an emitted [OpenDesign](https://github.com/nexu-io/open-design)
package. \`src/styles/clone.css\` imports its \`tokens.css\`, so every reusable
visual value in this project resolves through a token.

\`design-tokens.json\`, \`tailwind-v4.css\`, and \`components.manifest.json\` are
**derived caches** — never hand-edit them. \`tokens.css\` is the file this project
consumes; edit it directly only if you accept that the package's own guard will
no longer agree with it. Re-emission needs an OpenDesign checkout and lives in
the cloner this project came from.

Open \`design-system/components.html\` and \`design-system/preview/\` in a browser to
see the tokens rendered.

## Provenance

Ejected from ${origin} as the \`${slug}\` clone. Nothing here depends on that
repo — the five namespaced paths a clone occupies there have been flattened to
root, and every asset URL, internal link, and module import was rewritten to
match.

The extraction evidence in \`docs/\` explains why the markup and styles look the
way they do. Read \`docs/PAGE_TOPOLOGY.md\` first, then \`docs/BEHAVIORS.md\`.

The component specs cite screenshots under \`docs/design-references/${slug}/\`.
Those are QA evidence, not project files, and stayed behind in the cloner.
`;
}

// ─── The ejector ─────────────────────────────────────────────────────────────

export async function ejectClone({
  slug,
  targetDir,
  force = false,
  git = false,
  dryRun = false,
  repoRoot = REPO_ROOT,
  // Not reachable from the CLI or the endpoint. `scripts/dev.mjs` sets it to
  // eject into the gitignored `temp/preview-<slug>/` the dev preview serves;
  // for every other caller, ejecting into the cloner is a mistake.
  allowInsideRepo = false,
} = {}) {
  const warnings = [];

  if (!slug || !SLUG_PATTERN.test(slug)) {
    throw new Error(`Invalid slug ${JSON.stringify(slug ?? "")} — expected lowercase kebab-case.`);
  }

  const cloneDir = path.join(repoRoot, "src", "clones", slug);
  const pagesDir = path.join(repoRoot, "src", "pages", slug);
  if (!fs.existsSync(cloneDir)) {
    throw new Error(`No clone at src/clones/${slug}/. Registered clones live in src/data/clones/index.ts.`);
  }
  if (!fs.existsSync(pagesDir)) {
    throw new Error(
      `${slug} has a design system but no pages (src/pages/${slug}/ does not exist), so there is no project to eject. ` +
        `Build its routes first, or copy design-systems/${slug}/ by hand if the package is all you need.`,
    );
  }

  const absTarget = path.resolve(targetDir || path.join(repoRoot, "..", `${slug}-clone`));
  const insideRepo = absTarget === repoRoot || absTarget.startsWith(repoRoot + path.sep);
  if (insideRepo && !allowInsideRepo) {
    throw new Error(`Refusing to eject into the cloner itself (${absTarget}). Pick a path outside ${repoRoot}.`);
  }
  if (fs.existsSync(absTarget)) {
    const existing = fs.readdirSync(absTarget);
    if (existing.length > 0 && !force) {
      throw new Error(
        `${absTarget} already has ${existing.length} entr${existing.length === 1 ? "y" : "ies"}. ` +
          `Re-run with --force to write into it anyway:\n\n  npm run eject -- ${slug} ${absTarget} --force\n`,
      );
    }
  }

  // ── Plan ──
  const sourceDirs = [
    `src/clones/${slug}`,
    `src/pages/${slug}`,
    `public/clones/${slug}`,
    `design-systems/${slug}`,
    `docs/research/${slug}`,
  ];

  const candidates = [];
  for (const dir of sourceDirs) {
    const abs = path.join(repoRoot, fromPosix(dir));
    if (fs.existsSync(abs)) candidates.push(...walk(abs, repoRoot));
    else warnings.push(`${dir}/ does not exist — skipped.`);
  }
  for (const shared of SHARED_FILES) {
    if (isFile(repoRoot, shared)) candidates.push(shared);
  }

  const plan = [];
  const destinations = new Map();
  for (const repoFrom of candidates) {
    const repoTo = mapRepoPath(repoFrom, slug);
    if (!repoTo) continue;
    const clash = destinations.get(repoTo);
    if (clash) {
      throw new Error(`Both ${clash} and ${repoFrom} would become ${repoTo}. Rename one before ejecting.`);
    }
    destinations.set(repoTo, repoFrom);
    plan.push({ from: repoFrom, to: repoTo });
  }

  if (plan.length === 0) throw new Error(`Nothing to copy for ${slug}.`);

  const meta = await loadCloneMeta(repoRoot, slug, warnings);
  const rootPkg = readRootPackage(repoRoot);

  const generated = [
    ["package.json", generatePackageJson(slug, meta, rootPkg)],
    ["astro.config.mjs", ASTRO_CONFIG],
    ["tsconfig.json", TSCONFIG],
    [".gitignore", GITIGNORE],
    ["README.md", generateReadme(slug, meta, rootPkg)],
  ];
  const nvmrc = path.join(repoRoot, ".nvmrc");
  if (fs.existsSync(nvmrc)) generated.push([".nvmrc", fs.readFileSync(nvmrc, "utf8")]);

  // ── Write ──
  const files = [];
  let references = 0;

  for (const { from, to } of plan) {
    const absFrom = path.join(repoRoot, fromPosix(from));
    const absTo = path.join(absTarget, fromPosix(to));
    const isText = TEXT_EXTENSIONS.has(path.posix.extname(from).toLowerCase());

    let rewrites = 0;
    if (isText) {
      const original = fs.readFileSync(absFrom, "utf8");
      const result = rewriteFile(original, { slug, repoRoot, repoFrom: from, repoTo: to, warnings });
      rewrites = result.count;
      references += rewrites;
      if (!dryRun) {
        fs.mkdirSync(path.dirname(absTo), { recursive: true });
        fs.writeFileSync(absTo, result.text);
      }
    } else if (!dryRun) {
      fs.mkdirSync(path.dirname(absTo), { recursive: true });
      fs.copyFileSync(absFrom, absTo);
    }

    files.push({ from, to, kind: isText ? "rewrite" : "copy", rewrites });
  }

  for (const [name, contents] of generated) {
    if (!dryRun) {
      fs.mkdirSync(path.dirname(path.join(absTarget, name)), { recursive: true });
      fs.writeFileSync(path.join(absTarget, name), contents);
    }
    files.push({ from: null, to: name, kind: "generate", rewrites: 0 });
  }

  // ── git ──
  let gitState = "skipped";
  if (git && !dryRun) {
    try {
      execFileSync("git", ["init", "-b", "main"], { cwd: absTarget, stdio: "pipe" });
      execFileSync("git", ["add", "-A"], { cwd: absTarget, stdio: "pipe" });
      execFileSync("git", ["commit", "-m", `Initial commit — ${slug} ejected from the website cloner`], {
        cwd: absTarget,
        stdio: "pipe",
      });
      gitState = "initialized";
    } catch (error) {
      gitState = "failed";
      warnings.push(`git init/commit failed: ${(error.stderr?.toString() || error.message).trim()}`);
    }
  }

  return {
    ok: true,
    slug,
    targetDir: absTarget,
    dryRun,
    force,
    git: gitState,
    counts: {
      copied: files.filter((f) => f.kind === "copy").length,
      rewritten: files.filter((f) => f.kind === "rewrite").length,
      generated: generated.length,
      references,
    },
    files,
    warnings,
    nextSteps: [`cd ${absTarget}`, "npm i", "npm run dev"],
  };
}

// ─── CLI ─────────────────────────────────────────────────────────────────────

const USAGE = `eject-clone — copy one clone out as a standalone Astro project

  npm run eject -- <slug> [target-dir] [options]

Options
  --force      Write into a target directory that already has files
  --git        git init + an initial commit in the ejected project
  --dry-run    Print the plan without writing anything
  --json       Machine-readable output (used by the dev-only /api/eject route)
  -h, --help   This message

Defaults to ../<slug>-clone, next to this repo. Never writes inside it.
`;

function parseArgs(argv) {
  const positional = [];
  const flags = new Set();
  for (const arg of argv) {
    if (arg.startsWith("--") || arg === "-h") flags.add(arg);
    else positional.push(arg);
  }
  return {
    slug: positional[0],
    targetDir: positional[1],
    force: flags.has("--force"),
    git: flags.has("--git"),
    dryRun: flags.has("--dry-run"),
    json: flags.has("--json"),
    help: flags.has("--help") || flags.has("-h"),
  };
}

function report(result) {
  const { counts, targetDir, dryRun, warnings } = result;
  const head = dryRun ? "Dry run — nothing written" : `Ejected ${result.slug}`;

  console.log(`\n${head}\n  → ${targetDir}\n`);
  console.log(
    `  ${counts.rewritten} file(s) rewritten · ${counts.copied} copied as-is · ` +
      `${counts.generated} generated · ${counts.references} reference(s) updated`,
  );
  if (result.git === "initialized") console.log("  git repository initialized with one commit");

  if (warnings.length) {
    console.log(`\n  ${warnings.length} warning(s):`);
    for (const w of warnings) console.log(`    · ${w}`);
  }

  if (!dryRun) console.log(`\n  Next:\n${result.nextSteps.map((s) => `    ${s}`).join("\n")}\n`);
  else console.log("");
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const args = parseArgs(process.argv.slice(2));

  if (args.help || !args.slug) {
    console.log(USAGE);
    process.exit(args.slug ? 0 : 1);
  }

  try {
    const result = await ejectClone(args);
    if (args.json) console.log(JSON.stringify(result, null, 2));
    else report(result);
  } catch (error) {
    if (args.json) {
      console.log(JSON.stringify({ ok: false, error: error.message }, null, 2));
      process.exit(1);
    }
    console.error(`\neject-clone: ${error.message}\n`);
    process.exit(1);
  }
}
