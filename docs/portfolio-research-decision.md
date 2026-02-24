# Portfolio Website Research + Technical Decision (Phase 1)

Date: 2026-02-24

## Goal

Build a premium, slightly minimal personal portfolio with smooth motion and GitHub Pages-compatible static deployment.

## GitHub Pages Constraints (Research Summary)

- GitHub Pages supports publishing via GitHub Actions workflows, which is the recommended path for custom static build pipelines.
- Deployment target must be static assets (no server runtime).
- Project repositories (for example `username/repo`) typically require a non-root base path (`/repo/`) for assets and links.
- SPA client-side routing can break on direct refreshes because Pages is static hosting without server rewrites; avoiding unnecessary routing is the simplest fix.

## Stack Options Compared

### 1. Vite + React + TypeScript + Tailwind + Framer Motion (Chosen)

Pros:
- Excellent GitHub Pages static build compatibility (`vite build` outputs static assets).
- Fast dev loop and straightforward deployment.
- React ecosystem support for rich interaction patterns and reusable UI composition.
- Framer Motion makes premium micro-interactions and scroll reveals fast to implement.
- Tailwind accelerates consistent design system implementation.

Cons:
- More client-side JavaScript than Astro by default.
- Requires deliberate performance discipline for animation-heavy UI.

### 2. Astro + React Islands + Tailwind + Motion

Pros:
- Strong static-first performance defaults.
- Great GitHub Pages support with documented static deployment guidance.
- Can selectively hydrate interactive islands.

Cons:
- Slightly more complexity for a motion-forward single-page experience when most sections are interactive React anyway.
- Higher setup coordination overhead for this specific “Framer-like” interaction goal.

### 3. Next.js (Static Export) + React

Pros:
- Excellent developer experience for React and metadata APIs.
- Works with static export in many cases.

Cons:
- More configuration surface for GitHub Pages (`basePath`, `assetPrefix`, static export behavior).
- More opportunity for deployment friction than Vite/Astro for a pure static portfolio.

## Final Choice

Chosen stack: **Vite + React + TypeScript + Tailwind CSS + Framer Motion**

Why:
- Best balance of velocity, polish, maintainability, and low-friction GitHub Pages deployment for a single-page portfolio.
- Rich motion support without requiring server rendering or complicated adapters.
- Easy to keep architecture simple and content configurable.

## Deployment Strategy (GitHub Pages)

- Build static files with `vite build`.
- Use a GitHub Actions Pages workflow (`configure-pages`, `upload-pages-artifact`, `deploy-pages`).
- Compute `VITE_BASE_PATH` dynamically in CI:
  - `/` for `username.github.io`
  - `/<repo>/` for project repos
- Avoid client-side router to eliminate GitHub Pages SPA refresh/404 issues.
- No `.nojekyll` file required for the Actions artifact-based Pages deployment flow.

## UI / UX Direction (Research-Informed)

### Visual direction

- Slightly minimal layout with premium surfaces: layered cards, soft borders, restrained glow accents.
- Strong typography hierarchy (large hero headline, compact supporting text, readable section rhythm).
- High contrast and generous whitespace to preserve professionalism.

### Motion direction

- Section-level reveal animations (staggered, transform + opacity only).
- Hover/focus micro-interactions on cards and buttons (subtle lift, border/glow change).
- Sticky navigation with active-section feedback and scroll progress indicator.
- Reduced motion respected via user preference settings.

### Dark mode behavior

- Default to system preference on first load.
- Allow manual theme toggle (light/dark).
- Keep surfaces and contrast tuned for readability in both themes.

### Mobile-first considerations

- Single-column content flow on small screens with clear spacing rhythm.
- Sticky compact nav with expandable mobile menu.
- Motion toned down in dense mobile contexts.

## Sources

Official / primary:
- GitHub Pages custom workflows: <https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages>
- Vite GitHub Pages deployment guide: <https://vite.dev/guide/static-deploy.html#github-pages>
- Astro GitHub Pages deployment guide: <https://docs.astro.build/en/guides/deploy/github/>
- MDN `prefers-reduced-motion`: <https://developer.mozilla.org/en-US/docs/Web/CSS/%40media/prefers-reduced-motion>
- MDN `prefers-color-scheme`: <https://developer.mozilla.org/en-US/docs/Web/CSS/%40media/prefers-color-scheme>
- Motion (Framer Motion docs) accessibility / reduced motion: <https://motion.dev/motion/guide-accessibility/>
- web.dev high-performance CSS animations: <https://web.dev/articles/animations-guide>
- web.dev fluid typography and modern responsive practices: <https://web.dev/articles/fluid-typography>
- Google Search Central favicon guidance: <https://developers.google.com/search/docs/appearance/favicon-in-search>
- Open Graph protocol basics: <https://ogp.me/>

Design pattern references / observation sources:
- Awwwards portfolio/category browsing for current premium visual patterns: <https://www.awwwards.com/websites/portfolio/>
- Framer templates marketplace (portfolio examples and visual trends): <https://www.framer.com/templates/category/portfolio/>

