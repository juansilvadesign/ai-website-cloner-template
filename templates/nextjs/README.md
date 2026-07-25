# Retained Next.js target

This directory is the complete `--build nextjs` target. It has its own package
manifest, lockfile, TypeScript, ESLint, PostCSS, and shadcn configuration so its
dependency graph cannot leak into the Astro root.

Before `dev` or `build`, `scripts/sync-design-system.mjs` copies the selected
OpenDesign package's derived `tailwind-v4.css` and source `tokens.css` into an
ignored local cache. The slug defaults to `psiativa`; a clone run sets
`DESIGN_SYSTEM_SLUG` to the resolved `--slug`. The cache is never hand-edited.

Run it from the repository root:

```bash
npm ci --prefix templates/nextjs
npm run check --prefix templates/nextjs
npm run dev --prefix templates/nextjs
```

To select another emitted package:

```bash
DESIGN_SYSTEM_SLUG=my-brand npm run build --prefix templates/nextjs
```
