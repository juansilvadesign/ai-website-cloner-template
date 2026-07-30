import type { Clone } from "../../data/clones/types";

/**
 * FESN — Carteirinha Estudantil.
 *
 * Four routes for three upstream pages: the target resolves `/student-card` into
 * one of two server-rendered states from `?documento=`, and a static build cannot
 * branch on a query parameter, so both states are emitted as their own route.
 * See the header comment in `src/pages/fesn/student-card.astro`.
 */
export const fesnClone: Clone = {
  meta: {
    slug: "fesn",
    name: "FESN Carteirinha Estudantil",
    sourceUrl: "https://carteirinha.fesn.org.br",
    clonedAt: "2026-07-27",
    build: "astro",
    description:
      "Consulta e solicitação de carteirinha estudantil digital com validação por QR Code.",
    category: "Education & Identity",
    tags: ["astro", "pt-BR", "forms", "identity"],
    cover: "/clones/fesn/images/fesn-mkt-hero.png",
  },
  routes: [
    {
      path: "/fesn/",
      label: "Consulta",
      sourcePath: "/",
    },
    {
      path: "/fesn/vendas/",
      label: "Vendas",
      sourcePath: "/vendas",
    },
    {
      path: "/fesn/student-card/",
      label: "Carteirinha encontrada",
      sourcePath: "/student-card",
      note: "Found state. All credential values are mock — the live payload is personally identifying and is never reproduced.",
    },
    {
      path: "/fesn/student-card-nao-encontrada/",
      label: "Carteirinha não encontrada",
      sourcePath: "/student-card",
      note: "Not-found state of the same upstream route, split out because a static build cannot branch on `?documento=`.",
    },
  ],
};
