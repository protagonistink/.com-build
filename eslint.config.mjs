import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "**/.next/**",
    "out/**",
    "build/**",
    "dist/**",
    "next-env.d.ts",
    // Local archives/scratch files not part of shipped app code:
    ".worktrees/**",
    ".zip_temp/**",
    "tmp_founders/**",
    "**/*.new",
  ]),
]);

export default eslintConfig;
