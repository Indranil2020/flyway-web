# Deployment Guide

The site is a static, no-build site — deployable as-is. GitHub **free** Pages cannot
serve from a **private** repo, so pick one path below.

---

## Path A — GitHub Pages (recommended for this dev phase)

Best when you're fine with the source code being public (it's a marketing site; no secrets).

**One command** (re-auth first if the `gh` token is expired):

```bash
gh auth refresh -h github.com        # only if needed
./deploy-to-pages.sh                  # makes repo public + enables Pages + verifies live
```

Or do it manually on GitHub:

1. **Settings → General → Danger Zone → Change visibility → Public**
2. **Settings → Pages → Source: Deploy from a branch → Branch: `main`, `/ (root)` → Save**
3. Live at `https://indranil2020.github.io/flyway/` (~60 sec)

---

## Path B — Netlify (keeps the repo private)

Best when the tour/pricing data in `data.js` must stay private during development.

1. Go to **app.netlify.com → Add new site → Import from Git → GitHub → pick `Indranil2020/flyway`**
2. Build command: *(leave blank)* · Publish directory: `.` (root) — `netlify.toml` is already in the repo
3. Live at `https://flyway-xyz.netlify.app` instantly; auto-redeploys on every `git push`

---

## Later — move to a paid custom domain

Both paths support a custom domain (e.g. `flywayexpeditions.in`, ~₹600/yr). See `README.md`
for the exact DNS records and Pages setup. Nothing in the site changes — `FW_CONFIG.repo`
auto-detects the host, so you only edit DNS + the Pages/Netlify custom-domain field.

---

## Pre-flight checklist (already verified)

- [x] No secrets / tokens in codebase — safe to make public
- [x] All 10 HTML pages present
- [x] All assets (`assets/css/site.css`, `assets/js/{data,media,site}.js`) present
- [x] All internal links resolve
- [x] Every `photos/` folder populated (placeholders show gracefully where images are missing)
- [x] `netlify.toml` added (Path B)
- [x] `deploy-to-pages.sh` added & syntax-checked (Path A, local-only / gitignored)
