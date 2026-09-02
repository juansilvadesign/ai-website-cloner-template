import type { Clone } from "../../data/clones/types";

export const mediumClone: Clone = {
  meta: {
    slug: "medium-com",
    name: "Medium UI",
    sourceUrl: "https://medium.com/",
    clonedAt: "2026-09-01",
    build: "astro",
    description: "UI-only recreation of Medium’s public landing page, one story, Lists, and Audience product states.",
    category: "Publishing platform UI",
    tags: ["astro", "editorial", "publishing", "ui-only", "responsive"],
  },
  routes: [
    { path: "/medium-com/", label: "Medium landing page", sourcePath: "/" },
    {
      path: "/medium-com/the-academic/floaties-not-shorelines-what-we-get-wrong-about-helping-someone-grieve-61d65dbddacf/",
      label: "Medium story UI",
      sourcePath: "/the-academic/floaties-not-shorelines-what-we-get-wrong-about-helping-someone-grieve-61d65dbddacf",
    },
    { path: "/medium-com/me/lists/", label: "Medium Lists UI", sourcePath: "/me/lists" },
    { path: "/medium-com/me/audience/", label: "Medium Audience UI", sourcePath: "/me/audience" },
  ],
};
