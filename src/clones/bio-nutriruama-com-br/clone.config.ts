import type { Clone } from "../../data/clones/types";

export const bioNutriruamaClone: Clone = {
  meta: {
    slug: "bio-nutriruama-com-br",
    name: "Ruama Cori · Nutricionista",
    sourceUrl: "https://bio.nutriruama.com.br/",
    clonedAt: "2026-09-01",
    build: "astro",
    description: "Link hub da nutricionista Ruama Cori com hero em vídeo, cards de ação e protocolo gratuito.",
    category: "Nutrition link hub",
    tags: ["astro", "pt-BR", "nutrição", "link hub", "video hero"],
    cover: "/clones/bio-nutriruama-com-br/images/hero-poster.jpg",
  },
  routes: [
    {
      path: "/bio-nutriruama-com-br/",
      label: "Bio / links",
      sourcePath: "/",
    },
  ],
};
