import type { Clone } from "../../data/clones/types";

export const adspirerClone: Clone = {
  meta: {
    slug: "adspirer-com",
    name: "Adspirer",
    sourceUrl: "https://www.adspirer.com/",
    clonedAt: "2026-08-28",
    build: "astro",
    description: "AI paid-media manager marketing page with agent setup guides and responsive pricing.",
    category: "B2B SaaS",
    tags: ["astro", "saas", "ai-agents", "paid-media", "responsive"],
    cover: "/clones/adspirer-com/seo/opengraph.jpg",
  },
  routes: [
    {
      path: "/adspirer-com/",
      label: "Adspirer marketing page",
      sourcePath: "/",
    },
  ],
};
