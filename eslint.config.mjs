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
    // Ejection previews: a full copy of a clone, already linted at its source.
    "temp/**",
  ]),
];

export default eslintConfig;
