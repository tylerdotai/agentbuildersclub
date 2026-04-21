import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override: allow explicit any (existing codebase uses it liberally)
  { rules: { "@typescript-eslint/no-explicit-any": "warn" } },
  // Override: tests and test utilities use `any` freely for mocks/stubs,
  // and have unused destructured params (field1, value2, etc.) used by mock frameworks
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/test/**", "**/tests/**"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
