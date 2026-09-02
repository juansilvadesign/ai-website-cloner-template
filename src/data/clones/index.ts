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
import { spaceshipClone } from "../../clones/spaceship-com/clone.config";
import { completeShelfClone } from "../../clones/complete-shelf/clone.config";
import { fesnClone } from "../../clones/fesn/clone.config";
import { appcieClone } from "../../clones/appcie/clone.config";
import { fecoelhoClone } from "../../clones/fecoelho-com-br/clone.config";
import { helloParulClone } from "../../clones/helloparul-in/clone.config";
import { adspirerClone } from "../../clones/adspirer-com/clone.config";
import { bridgeHumanClone } from "../../clones/bridgeandhuman-com/clone.config";
import { reflectClone } from "../../clones/reflect-app/clone.config";
import { consultaDeProcessosClone } from "../../clones/consultadeprocessos-com-br/clone.config";
import { raffaelaDrumondClone } from "../../clones/raffaeladrumond-com-br/clone.config";
import { bioNutriruamaClone } from "../../clones/bio-nutriruama-com-br/clone.config";
import { marcosArrudaClone } from "../../clones/marcos-arruda-com/clone.config";
import { mediumClone } from "../../clones/medium-com/clone.config";

/** Every registered clone, newest extraction first. */
export const allClones: Clone[] = [
  mediumClone,
  marcosArrudaClone,
  bioNutriruamaClone,
  raffaelaDrumondClone,
  consultaDeProcessosClone,
  reflectClone,
  bridgeHumanClone,
  spaceshipClone,
  adspirerClone,
  helloParulClone,
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
