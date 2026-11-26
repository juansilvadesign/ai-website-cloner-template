import type { Clone } from "../../data/clones/types";

export const zeromrrClubClone: Clone = {
  meta: {
    slug: "zeromrr-club",
    name: "$0 MRR Club",
    sourceUrl: "https://zeromrr.club/",
    clonedAt: "2026-11-26",
    build: "astro",
    description:
      "A streetwear drop staged as a PS2-era console game (boot screen, main menu, three.js garage, character-select tee panel, memory-card signup), plus its editorial AI Reel Playbook landing page.",
    category: "E-commerce / streetwear",
    tags: ["astro", "ecommerce", "game-ui", "three.js", "webgl", "landing-page", "template"],
    cover: "/clones/zeromrr-club/seo/og.png",
  },
  routes: [
    { path: "/zeromrr-club/", label: "Drop 01 game", sourcePath: "/" },
    {
      path: "/zeromrr-club/playbook/",
      label: "AI Reel Playbook",
      sourcePath: "/playbook",
      note: "Lives on the playbook.zeromrr.club subdomain upstream.",
    },
  ],
};
