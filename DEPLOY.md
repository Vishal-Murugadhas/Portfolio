# Deployment & Maintenance Guide

## Overview
This portfolio is configured as a zero-maintenance, zero-cost static website exported directly from Next.js. It requires no server, no background worker, no runtime database, and no secrets.

## Build Configuration
- **Node Version:** 22 (pinned in `.nvmrc` and `package.json` engines)
- **Install Command:** `npm ci`
- **Build Command:** `npm run build`
- **Output Directory:** `out` (static HTML/CSS/JS export)
- **Headers:** `public/_headers` (Cloudflare Pages security and cache headers)

---

## Hosting Providers

### 1. Primary: Cloudflare Pages (Free, Unlimited Bandwidth)
- **Dashboard:** https://dash.cloudflare.com
- **Project Name:** Set during initial setup (e.g., `vishal-portfolio`)
- **Default Live URL:** `https://<project-name>.pages.dev`
- **Build Command:** `npm ci && npm run build`
- **Build Output Directory:** `out`
- **Environment Variables:** `NODE_VERSION=22`
- **Custom Domain:** Optional (via Cloudflare Pages > Custom domains)

### 2. Backup Mirror: GitHub Pages (Free)
- **Workflow:** `.github/workflows/pages.yml`
- **Backup URL:** `https://<username>.github.io/<repo-name>/` (or `https://<username>.github.io` if root user site)
- **Trigger:** Automatic deployment on push to `main` branch.

---

## How to Redeploy or Update Content
1. Make your changes in code or `data/content.ts`.
2. Test locally:
   ```bash
   npm run build
   npx serve out
   ```
3. Commit and push:
   ```bash
   git add -A
   git commit -m "Update portfolio content"
   git push origin main
   ```
4. Cloudflare Pages and GitHub Actions will automatically rebuild and deploy the new static files.

---

## Offline Backup Command
To back up the repository locally outside of GitHub:
```bash
git bundle create ../portfolio-backup.bundle --all
```
Or create a zip of the workspace excluding `node_modules`, `.next`, and `out`.
