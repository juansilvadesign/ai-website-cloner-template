import type { Clone } from "../../data/clones/types";

export const completeShelfClone: Clone = {
  meta: {
    slug: "complete-shelf",
    name: "The Complete Shelf",
    sourceUrl: "https://play.mint.gg/complete-shelf",
    clonedAt: "2026-07-31",
    build: "astro",
    description:
      "A warm editorial Three.js library for browsing and inspecting a collection of nineteen original clothbound hardcovers.",
    category: "Interactive 3D Experience",
    tags: ["astro", "three.js", "webgl", "editorial", "interactive"],
  },
  routes: [
    {
      path: "/complete-shelf/",
      label: "The Complete Shelf",
      sourcePath: "/complete-shelf",
    },
  ],
};
