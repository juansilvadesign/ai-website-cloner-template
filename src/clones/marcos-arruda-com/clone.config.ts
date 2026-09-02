import type { Clone } from "../../data/clones/types";

const nestedProjectRoutes = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
].map((name) => ({
  path: `/marcos-arruda-com/portfolio/project-name-${name}/`,
  label: `Project Name ${name[0].toUpperCase()}${name.slice(1)}`,
  sourcePath: `/portfolio/project-name-${name}`,
  note: "Historic portfolio detail route reproduced from the source Wix collection.",
}));

export const marcosArrudaClone: Clone = {
  meta: {
    slug: "marcos-arruda-com",
    name: "Marcos Arruda Portfolio",
    sourceUrl: "https://www.marcos-arruda.com/",
    clonedAt: "2026-09-01",
    build: "astro",
    description: "A product and service designer portfolio with long-form case studies and visual project archives.",
    category: "Design Portfolio",
    tags: ["astro", "portfolio", "case-study", "design", "Wix"],
    cover: "/clones/marcos-arruda-com/images/home-portrait.jpg",
  },
  routes: [
    { path: "/marcos-arruda-com/", label: "Home", sourcePath: "/" },
    { path: "/marcos-arruda-com/home-1/", label: "Home (legacy)", sourcePath: "/home-1" },
    { path: "/marcos-arruda-com/about/", label: "About", sourcePath: "/about" },
    { path: "/marcos-arruda-com/case1/", label: "Manifest case study", sourcePath: "/case1" },
    { path: "/marcos-arruda-com/case2/", label: "Vibrant Streets case study", sourcePath: "/case2" },
    { path: "/marcos-arruda-com/case3/", label: "Fit Points case study", sourcePath: "/case3" },
    { path: "/marcos-arruda-com/portfolio/", label: "Projects", sourcePath: "/portfolio" },
    { path: "/marcos-arruda-com/blank/", label: "Motion & multimedia", sourcePath: "/blank" },
    { path: "/marcos-arruda-com/blank-1/", label: "Branding archive", sourcePath: "/blank-1" },
    ...nestedProjectRoutes,
  ],
};
