import type { Clone } from "../../data/clones/types";

export const fecoelhoClone: Clone = {
  meta: {
    slug: "fecoelho-com-br",
    name: "Fernanda Coelho Contact Card",
    sourceUrl: "https://fecoelho.com.br/card/",
    clonedAt: "2026-08-04",
    build: "astro",
    description:
      "Cartão pessoal responsivo com retrato, vCard e atalhos diretos de contato.",
    category: "Personal Contact",
    tags: ["astro", "pt-BR", "contact-card", "dark-mode"],
    cover: "/clones/fecoelho-com-br/seo/og-image.jpg",
  },
  routes: [
    {
      path: "/fecoelho-com-br/",
      label: "Cartão de contato",
      sourcePath: "/card/",
    },
  ],
};
