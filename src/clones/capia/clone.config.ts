import type { Clone } from "../../data/clones/types";

export const capiaClone: Clone = {
  meta: {
    slug: "capia",
    name: "Capiá",
    sourceUrl: "https://capia-eta.vercel.app/",
    clonedAt: "2026-11-24",
    build: "astro",
    description:
      "A hand-made neighbourhood burger site: torn-paper color fields, stacked sticky menu panels with a swappable item carousel, scroll-linked motion and a cursor photo trail.",
    category: "Restaurant / food",
    tags: ["astro", "restaurant", "menu", "lenis", "scroll-motion", "pt-br", "template"],
    cover: "/clones/capia/seo/cover.png",
  },
  routes: [
    {
      path: "/capia/",
      label: "Capiá homepage",
      sourcePath: "/",
    },
  ],
};
