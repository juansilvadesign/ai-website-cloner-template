import type { Clone } from "../../data/clones/types";

export const bridgeHumanClone: Clone = {
  meta: {
    slug: "bridgeandhuman-com",
    name: "Bridge & Human",
    sourceUrl: "https://www.bridgeandhuman.com/",
    clonedAt: "2026-08-29",
    build: "astro",
    description: "Editorial monochrome design-strategy portfolio with a responsive seven-story carousel.",
    category: "Design strategy portfolio",
    tags: ["astro", "portfolio", "editorial", "framer", "responsive", "carousel"],
    cover: "/clones/bridgeandhuman-com/seo/og.png",
  },
  routes: [
    {
      path: "/bridgeandhuman-com/",
      label: "Bridge & Human homepage",
      sourcePath: "/",
    },
  ],
};
