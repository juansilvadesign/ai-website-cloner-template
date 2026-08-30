import type { Clone } from "../../data/clones/types";

export const reflectClone: Clone = {
  meta: {
    slug: "reflect-app",
    name: "Reflect",
    sourceUrl: "https://reflect.app/",
    clonedAt: "2026-08-29",
    build: "astro",
    description: "Cosmic note-taking marketing page with an interactive AI prompt showcase and responsive dark visual system.",
    category: "Note-taking SaaS",
    tags: ["astro", "saas", "notes", "ai", "dark", "responsive"],
    cover: "/clones/reflect-app/seo/opengraph.jpg",
  },
  routes: [
    {
      path: "/reflect-app/",
      label: "Reflect homepage",
      sourcePath: "/",
    },
  ],
};
