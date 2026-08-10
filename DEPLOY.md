# Deployment Guide

The site is a static, no-build site — deployable as-is.

You want the **repo private** but the **site public**. GitHub **free** Pages cannot serve
from a private repo, so the recommended path is **Netlify** (free), which deploys from a
private repo and gives a public URL.

---

## ✅ Recommended — Netlify (private repo + public site, free)

Best for the dev phase: your code stays private, your collaborator gets a public live URL.

1. Go to **app.netlify.com → Add new site → Import from Git → GitHub → pick `Indranil2020/flyway`**
2. **Authorize Netlify** to read the (private) repo when prompted
3. Build command: *(leave blank)* · Publish directory: `.` (root)
   — `netlify.toml` is already in the repo, so Netlify auto-detects these
4. Click **Deploy site**
5. Live at `https://flyway-xyz.netlify.app` within ~60 seconds
6. Auto-redeploys on every `git push` to `main`
7. (Optional) **Site settings → Change site name** to get a nicer URL like
   `flyway-expeditions.netlify.app`

Share that Netlify URL with your collaborator — it's public, no account needed to view.

---

## Alternative — GitHub Pages (requires public repo OR GitHub Pro)

GitHub Pages only serves from a public repo on the free plan. Two sub-options:

**A1. Make the repo public (free, but code is world-readable)**
1. Run `./deploy-to-pages.sh` (re-auth first with `gh auth refresh -h github.com` if needed)
2. Or manually: **Settings → General → Danger Zone → Change visibility → Public**, then
   **Settings → Pages → Branch: `main`, `/ (root)` → Save**
3. Live at `https://indranil2020.github.io/flyway/`

**A2. Upgrade to GitHub Pro ($4/month)**
- Pro serves Pages from private repos — keep code private, Pages stays live at the same URL.

---

## Later — move to a paid custom domain

Both Netlify and GitHub Pages support a custom domain (e.g. `flywayexpeditions.in`, ~₹600/yr).
See `README.md` for the exact DNS records. Nothing in the site changes — `FW_CONFIG.repo`
auto-detects the host, so you only edit DNS + the Netlify/Pages custom-domain field.

---

## Pre-flight checklist (already verified)

- [x] No secrets / tokens in codebase — safe to deploy
- [x] All 10 HTML pages present
- [x] All assets (`assets/css/site.css`, `assets/js/{data,media,site}.js`) present
- [x] All internal links resolve
- [x] Every `photos/` folder populated (placeholders show gracefully where images are missing)
- [x] `netlify.toml` added (Netlify auto-detects build settings)
- [x] `deploy-to-pages.sh` added & syntax-checked (GitHub Pages, local-only / gitignored)
