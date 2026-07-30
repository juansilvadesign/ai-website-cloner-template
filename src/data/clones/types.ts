// ─────────────────────────────────────────────
// Clone Registry — Type Definitions
// ─────────────────────────────────────────────
// A "clone" is one reverse-engineered target. Every clone owns four namespaced
// locations, and nothing outside them:
//
//   src/clones/<slug>/        components, layout, styles, types, this config
//   src/pages/<slug>/         its routes
//   public/clones/<slug>/     its assets
//   design-systems/<slug>/    its emitted OpenDesign package
//   docs/research/<slug>/     its extraction evidence
//
// That namespacing is what lets clones coexist. Before it existed, each new
// clone overwrote `src/pages/index.astro`, `src/components/`, `public/images/`,
// and the single design-system import in `src/styles/global.css`.

/** How the clone's page was built, matching `/clone-website --build`. */
export type CloneBuild = "astro" | "nextjs" | "none";

/** One reachable route belonging to a clone. */
export interface CloneRoute {
  /** Absolute path in this project, always prefixed with the clone slug (e.g. `/fesn/vendas`). */
  path: string;
  /** Short human label for the hub card. */
  label: string;
  /** The path on the original site this route reproduces (e.g. `/vendas`). */
  sourcePath: string;
  /** Why this route exists when it has no 1:1 counterpart upstream. */
  note?: string;
}

/** Hub-facing metadata for one clone. */
export interface CloneMeta {
  /** Folder name across all five namespaced locations. Lowercase kebab-case. */
  slug: string;
  /** Display name, matching the design system's `manifest.json` `name`. */
  name: string;
  /** The origin the clone was extracted from. */
  sourceUrl: string;
  /** ISO date of the extraction. */
  clonedAt: string;
  /** Which target was built. `none` means the design system was emitted but no page. */
  build: CloneBuild;
  /** One-line description of what the target is. */
  description: string;
  /** Category from the design system's `manifest.json`. */
  category: string;
  /** Freeform tags for the hub card. */
  tags: string[];
  /** Screenshot for the card cover, served from `public/clones/<slug>/`. */
  cover?: string;
}

/** A registered clone: its metadata plus every route it serves. */
export interface Clone {
  meta: CloneMeta;
  /** Empty when `build` is `none` — the design system exists, the page does not. */
  routes: CloneRoute[];
}
