# Modern Portfolio Website (GitHub Pages Ready)

A premium, slightly minimal personal portfolio built with **Vite + React + TypeScript + Tailwind CSS + Framer Motion**, designed for **GitHub Pages** static deployment.

## Features

- GitHub Pages-compatible static build (`vite build`)
- Responsive single-page layout (no client-side router needed)
- Smooth scroll reveals and micro-interactions
- Light / dark theme toggle (defaults to system on first load)
- Content-driven customization via a single config file
- GitHub Actions deployment workflow with automatic base-path handling

## Tech Stack

- Vite
- React + TypeScript
- Tailwind CSS
- Framer Motion

## Local Setup

### Option A (npm)

```bash
npm install
npm run dev
```

### Option B (bun)

```bash
bun install
bun run dev
```

## Build

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Customizing Content (Primary)

Edit:

- `src/content/siteContent.ts`

That file contains all major portfolio content:

- name / role / bio
- skills and tech groups
- experience timeline
- project cards
- social links
- contact email / CTA content

Search for `TODO:` markers to replace placeholders quickly.

## Customizing SEO Metadata (Important)

For best search/social previews, update:

- `index.html` (title, meta description, Open Graph, Twitter tags, canonical URL)
- `public/social-preview.svg` (replace with your real OG image, preferably PNG/JPG for broadest support)
- `public/favicon.svg`

If you use a custom domain, update the canonical URL and OG URLs accordingly.

## GitHub Pages Deployment

This repo includes a GitHub Actions workflow:

- `.github/workflows/deploy.yml`

### Steps

1. Push this repo to GitHub.
2. In GitHub: **Settings → Pages**
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` (or run the workflow manually).

The workflow automatically computes the correct Vite base path for:

- `username.github.io` repos (base `/`)
- project repos like `username/portfolio` (base `/portfolio/`)

## Manual Base Path Builds (If Needed)

For a project repo build:

```bash
VITE_BASE_PATH=/your-repo-name/ npm run build
```

For a user/org site or custom domain:

```bash
VITE_BASE_PATH=/ npm run build
```

## GitHub Pages Caveats (Handled)

- Static output only: supported (`vite build`)
- Base path issues: handled in `vite.config.ts` + CI env var
- Asset path correctness: handled by Vite base path
- SPA routing refresh issues: avoided by using a single-page anchor navigation (no React Router)
- `.nojekyll`: not required for the GitHub Actions Pages artifact deployment flow

## Troubleshooting

### Blank page or missing styles/assets on GitHub Pages

Usually a base path issue. Check:

- repo name has changed but base path assumptions are outdated
- workflow ran after the rename
- `VITE_BASE_PATH` value is correct for manual builds

### Social preview image not showing

- Use an absolute URL in `index.html` (`https://.../social-preview.png`)
- Prefer PNG/JPG for wider crawler compatibility
- Re-share after cache invalidation (social platforms cache aggressively)

### Theme flashes briefly on load

The app applies the stored/system theme quickly on startup, but a small flash can still happen depending on browser timing. If needed, add an inline theme script in `index.html`.

## Project Structure

```text
src/
  components/
  content/
  hooks/
  App.tsx
  index.css
  main.tsx
docs/
  portfolio-research-decision.md
.github/workflows/
  deploy.yml
```

## Next Customizations You’ll Likely Want

1. Replace placeholder content in `src/content/siteContent.ts`
2. Update metadata URLs in `index.html`
3. Replace `public/social-preview.svg` with a branded image
4. Add a real resume PDF and link it in the content config

