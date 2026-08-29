import type { Clone } from "../../data/clones/types";

export const spaceshipClone: Clone = {
  meta: {
    slug: "spaceship-com",
    name: "Spaceship",
    sourceUrl: "https://www.spaceship.com/",
    clonedAt: "2026-08-28",
    build: "astro",
    description: "Cinematic dark domain, hosting, and AI-assistant marketing homepage.",
    category: "Domains & hosting",
    tags: ["astro", "domains", "hosting", "dark", "responsive", "interactive"],
    cover: "/clones/spaceship-com/images/meta-image.jpg",
  },
  routes: [
    {
      path: "/spaceship-com/",
      label: "Spaceship homepage",
      sourcePath: "/",
    },
  ],
};
