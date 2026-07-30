import type { Clone } from "../../data/clones/types";

/**
 * CIE Validação DNE — design system only, no page.
 *
 * This entry is the reason the hub exists. `design-systems/appcie/` was committed
 * alongside `design-systems/fesn/` in `1933e48` and survived, because that layer
 * has always been slug-namespaced. The page layer was not: `src/` and `public/`
 * held exactly one clone, and FESN took them. So this target has a design system,
 * an empty `docs/design-references/appcie/`, and nothing else.
 *
 * Two things are missing from the package relative to `fesn`:
 * `components.manifest.json` and a populated `preview/`. Re-run the emitter and
 * the guard before treating it as complete:
 *
 *   npx tsx scripts/emit-design-system.ts --brand appcie \
 *     --name "CIE Validação DNE" --category "Government & Identity" \
 *     --od-root <open-design-root>
 *   npm run check:design-system -- --brand appcie --od-root <open-design-root>
 *
 * To build the page, add routes under `src/pages/appcie/` and components under
 * `src/clones/appcie/`, then flip `build` to `astro` and fill `routes`.
 */
export const appcieClone: Clone = {
  meta: {
    slug: "appcie",
    name: "CIE Validação DNE",
    sourceUrl: "https://fesn.appcie.org/<codigo>",
    clonedAt: "2026-07-28",
    build: "none",
    description:
      "Página de verificação de credencial DNE operada pela FESN em domínio separado. Angular 16+ SPA, light-only, sem camada de tokens declarada.",
    category: "Government & Identity",
    tags: ["design-system-only", "angular", "pt-BR", "verification"],
  },
  routes: [],
};
