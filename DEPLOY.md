# Deployment Guide

The site is a static, no-build site — deployable as-is.

**Goal achieved:** your source repo (`Indranil2020/flyway`) stays **private** while the
site is **publicly viewable**. This works via a separate public *deploy* repo that GitHub
Pages serves.

---

## ✅ Current setup — two repos

| Repo | Visibility | Purpose |
|---|---|---|
| `Indranil2020/flyway` | **Private** | Your working/dev repo. Edit code here, commit, push. |
| `Indranil2020/flyway-web` | **Public** | Deploy mirror — only the static site files. Served by GitHub Pages. |

**Live site:** https://indranil2020.github.io/flyway-web/

Your collaborator views the live site at that URL — no account needed. They cannot see your
source repo's git history, branches, or issues (those stay private).

---

## How to update the live site

Every time you want to push an update live:

```bash
./publish.sh
```

This mirrors your current `main` branch to the deploy repo and waits for the site to go live.
That's the only command you need for day-to-day updates.

---

## How it works

```
  [private] Indranil2020/flyway  ──publish.sh──▶  [public] Indranil2020/flyway-web  ──▶  GitHub Pages
   (your dev work, git history)                   (static site files only)               https://indranil2020.github.io/flyway-web/
```

- `git push deploy main` copies your committed files to the deploy repo.
- GitHub Pages serves the deploy repo's `main` branch at the root.
- `FW_CONFIG.repo` is left blank in `data.js`, so the photo auto-discovery uses the Pages
  hostname of the **deploy** repo (`flyway-web`). Photos work on the live site as-is.

> **Note on photos:** the photo system reads the folder listing from the deploy repo via
> the GitHub Contents API. Since `publish.sh` pushes your files to the deploy repo, photos
> you add to the source repo are included on every publish. Good.

---

## Alternative — Netlify (if you prefer it later)

If you'd rather not maintain a second repo, Netlify deploys directly from the private
source repo (no deploy mirror needed):

1. Go to **app.netlify.com → Add new site → Import from Git → GitHub → pick `Indranil2020/flyway`**
2. Build command: *(leave blank)* · Publish directory: `.` (root) — `netlify.toml` is already in the repo
3. Live at `https://flyway-xyz.netlify.app`; auto-redeploys on every `git push`

---

## Later — move to a paid custom domain

Both the deploy repo (GitHub Pages) and Netlify support a custom domain
(e.g. `flywayexpeditions.in`, ~₹600/yr). See `README.md` for the exact DNS records. Nothing
in the site changes — `FW_CONFIG.repo` auto-detects the host, so you only edit DNS + the
Pages/Netlify custom-domain field.

---

## Pre-flight checklist (already verified)

- [x] No secrets / tokens in codebase — safe to deploy
- [x] All 10 HTML pages present
- [x] All assets (`assets/css/site.css`, `assets/js/{data,media,site}.js`) present
- [x] All internal links resolve
- [x] Every `photos/` folder populated (placeholders show gracefully where images are missing)
- [x] `netlify.toml` added (alternative Netlify deploy)
- [x] `publish.sh` added & syntax-checked (GitHub Pages deploy, local-only / gitignored)
- [x] Deploy repo `Indranil2020/flyway-web` created (public) + Pages enabled + verified live
