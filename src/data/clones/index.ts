// ─────────────────────────────────────────────
// Clone Registry
// ─────────────────────────────────────────────
// Import each clone's `clone.config.ts` here and add it to the array. The hub
// page consumes this list; nothing else needs to know a clone exists.
//
// `/clone-website` appends to this file as its final page-build step. A clone
// that is not registered still works at its own routes — it is just invisible
// on the hub.
//
// NOT registered: `design-systems/psiativa/`. That is the reference package CI
// validates in `npm run check:release`, not a cloned target.

import type { Clone } from "./types";
import { completeShelfClone } from "../../clones/complete-shelf/clone.config";
import { fesnClone } from "../../clones/fesn/clone.config";
import { appcieClone } from "../../clones/appcie/clone.config";
import { fecoelhoClone } from "../../clones/fecoelho-com-br/clone.config";

/** Every registered clone, newest extraction first. */
export const allClones: Clone[] = [
  fecoelhoClone,
  completeShelfClone,
  appcieClone,
  fesnClone,
];

/** Look up a clone by its slug. */
export function getCloneBySlug(slug: string): Clone | undefined {
  return allClones.find((c) => c.meta.slug === slug);
}

/** Clones that actually serve pages, for hub sections that need a link target. */
export function builtClones(): Clone[] {
  return allClones.filter((c) => c.routes.length > 0);
}
