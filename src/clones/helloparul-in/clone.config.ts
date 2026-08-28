import type { Clone } from "../../data/clones/types";

export const helloParulClone: Clone = {
  meta: {
    slug: "helloparul-in",
    name: "Hello Parul Portfolio",
    sourceUrl: "https://helloparul.in/",
    clonedAt: "2026-08-27",
    build: "astro",
    description: "Product designer portfolio with conversion-focused case studies and a tactile editorial visual system.",
    category: "Product Design Portfolio",
    tags: ["astro", "portfolio", "editorial", "responsive", "static-first"],
    cover: "/clones/helloparul-in/images/smytten-review-summary.png",
  },
  routes: [
    {
      path: "/helloparul-in/",
      label: "Home",
      sourcePath: "/",
    },
    {
      path: "/helloparul-in/about/",
      label: "About",
      sourcePath: "#/about",
    },
    {
      path: "/helloparul-in/play/",
      label: "Play",
      sourcePath: "#/play",
    },
    {
      path: "/helloparul-in/case/smytten/",
      label: "Smytten case study",
      sourcePath: "#/case/smytten",
    },
    {
      path: "/helloparul-in/case/billbuster/",
      label: "Bill Buster case study",
      sourcePath: "#/case/billbuster",
    },
    {
      path: "/helloparul-in/case/combo/",
      label: "Combo Generator case study",
      sourcePath: "#/case/combo",
    },
  ],
};
