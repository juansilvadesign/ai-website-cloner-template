import { globalIgnores } from "eslint/config";
import astro from "eslint-plugin-astro";

const eslintConfig = [
  ...astro.configs.recommended,
  globalIgnores([
    ".astro/**",
    "dist/**",
    "scripts/**",
    "design-systems/**",
    "templates/**",
  ]),
];

export default eslintConfig;
