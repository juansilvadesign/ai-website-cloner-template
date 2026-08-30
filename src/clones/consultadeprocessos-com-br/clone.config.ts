import type { Clone } from "../../data/clones/types";

export const consultaDeProcessosClone: Clone = {
  meta: {
    slug: "consultadeprocessos-com-br",
    name: "Consulta de Processos",
    sourceUrl: "https://consultadeprocessos.com.br/",
    clonedAt: "2026-08-29",
    build: "astro",
    description:
      "Landing page para consulta processual por CPF/CNPJ, risco jurídico e monitoramento.",
    category: "Legal data SaaS landing page",
    tags: ["astro", "pt-BR", "saas", "legal-data", "landing-page"],
    cover: "/clones/consultadeprocessos-com-br/seo/og-image.jpg",
  },
  routes: [
    {
      path: "/consultadeprocessos-com-br/",
      label: "Landing page",
      sourcePath: "/",
    },
  ],
};
