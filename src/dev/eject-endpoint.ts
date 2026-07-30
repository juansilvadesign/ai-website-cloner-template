// ─────────────────────────────────────────────────────────────────────────────
// POST /api/eject — the hub's "Use as template" button, dev only.
// ─────────────────────────────────────────────────────────────────────────────
//
// This file lives outside `src/pages/` on purpose, and `astro.config.mjs` injects
// it as a route only when the command is `dev`. That is what makes "never reaches
// `dist/`" a structural fact rather than a hope.
//
// The obvious alternative — `src/pages/api/eject.ts` guarded by
// `import.meta.env.DEV` — does not hold. Astro's static build still prerenders
// the route: it warns that no GET handler exists and writes `dist/api/eject`
// anyway. `export const prerender = false` is not an escape either; without an
// adapter it fails the build with `NoAdapterInstalled`. The `import.meta.env.DEV`
// check below is kept as a second lock, not as the mechanism.
//
// It shells out to `scripts/eject-clone.mjs --json` instead of importing it, for
// two reasons: the script lives outside `src/` and outside tsconfig's include, so
// importing it would drag an untyped module through `astro check`; and spawning
// guarantees the button and the CLI execute the identical code path, so a bug can
// never reproduce in one and not the other.
//
// `--force` is deliberately not accepted here. The CLI can overwrite a non-empty
// directory; a button in a browser cannot.

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type { APIRoute } from "astro";

const run = promisify(execFile);

const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

interface EjectRequest {
  slug?: unknown;
  targetDir?: unknown;
  dryRun?: unknown;
}

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

export const POST: APIRoute = async ({ request }) => {
  if (!import.meta.env.DEV) return new Response("Not found", { status: 404 });

  // `astro.config.mjs` sets `server.host: true`, so the dev server is reachable
  // from the LAN. Requiring a custom header means a cross-site form post cannot
  // reach this handler — that shape of request triggers a CORS preflight, and
  // this route does not answer OPTIONS.
  if (request.headers.get("x-eject-request") !== "1") {
    return json({ ok: false, error: "Missing x-eject-request header." }, 403);
  }

  let body: EjectRequest;
  try {
    body = (await request.json()) as EjectRequest;
  } catch {
    return json({ ok: false, error: "Body must be JSON." }, 400);
  }

  const { slug, targetDir, dryRun } = body;

  if (typeof slug !== "string" || !SLUG_PATTERN.test(slug)) {
    return json({ ok: false, error: "`slug` must be lowercase kebab-case." }, 400);
  }
  if (targetDir !== undefined && (typeof targetDir !== "string" || targetDir.trim() === "")) {
    return json({ ok: false, error: "`targetDir` must be a non-empty string when given." }, 400);
  }

  const args = ["scripts/eject-clone.mjs", slug];
  if (typeof targetDir === "string") args.push(targetDir.trim());
  if (dryRun === true) args.push("--dry-run");
  args.push("--json");

  try {
    const { stdout } = await run("node", args, { cwd: process.cwd(), maxBuffer: 8 * 1024 * 1024 });
    return json(JSON.parse(stdout), 200);
  } catch (error) {
    // A refusal (non-empty target, unbuilt clone, bad slug) exits non-zero but
    // still prints the `{ ok: false, error }` payload, which is the useful part.
    const stdout = (error as { stdout?: string }).stdout;
    if (stdout) {
      try {
        return json(JSON.parse(stdout), 422);
      } catch {
        /* fall through to the generic failure below */
      }
    }
    return json({ ok: false, error: (error as Error).message }, 500);
  }
};
