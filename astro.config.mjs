import { defineConfig } from "astro/config";

/**
 * Serves `POST /api/eject` — the hub's "Use as template" button — during
 * `astro dev` only.
 *
 * The handler deliberately does not live in `src/pages/api/`. Anything there is a
 * route in every command, and a static build prerenders it: Astro warns that the
 * endpoint has no GET handler and still writes `dist/api/eject`. Injecting the
 * route only when `command === "dev"` means the production build never sees it,
 * so no artifact can leak into `dist/`.
 *
 * `prerender: false` is load-bearing, not decoration. Under `output: "static"` a
 * prerendered endpoint is handed a synthesized Request — empty headers, empty
 * body, query string stripped — which silently breaks any POST payload. Marking
 * the route on-demand makes the dev server pass the real request through. It
 * needs no adapter because the build never sees this route at all.
 */
const ejectDevRoute = {
  name: "eject-dev-route",
  hooks: {
    "astro:config:setup": ({ command, injectRoute }) => {
      if (command !== "dev") return;
      injectRoute({
        pattern: "/api/eject",
        entrypoint: "./src/dev/eject-endpoint.ts",
        prerender: false,
      });
    },
  },
};

export default defineConfig({
  output: "static",
  integrations: [ejectDevRoute],
  server: {
    host: true,
    port: 4321,
  },
});
