import type { Clone } from "../../data/clones/types";

export const raffaelaDrumondClone: Clone = {
  meta: {
    slug: "raffaeladrumond-com-br",
    name: "Dra. Raffaela Drumond",
    sourceUrl: "https://raffaeladrumond.com.br/",
    clonedAt: "2026-08-30",
    build: "astro",
    description:
      "Landing page editorial para clínica de dermatologia estética em Brasília.",
    category: "Medical aesthetics landing page",
    tags: ["astro", "pt-BR", "dermatologia", "saúde", "landing-page"],
    cover: "/clones/raffaeladrumond-com-br/images/Frame-50-3.webp",
  },
  routes: [
    {
      path: "/raffaeladrumond-com-br/",
      label: "Landing page",
      sourcePath: "/",
    },
  ],
};
