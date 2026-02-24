import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function resolveBasePath() {
  const explicit = process.env.VITE_BASE_PATH;
  if (explicit) {
    return explicit;
  }

  if (!process.env.GITHUB_ACTIONS) {
    return "/";
  }

  const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
  if (!repoName || repoName.toLowerCase().endsWith(".github.io")) {
    return "/";
  }

  return `/${repoName}/`;
}

export default defineConfig({
  base: resolveBasePath(),
  plugins: [react()]
});

