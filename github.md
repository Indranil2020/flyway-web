# Source repository

repo: Indranil2020/flyway
branch: main
path:

Static site — no build step. The repository root **is** the deployable site, so every file in
this project maps 1:1 to the repo root. GitHub Pages serves it directly.

## Last sync

date: 2026-08-10
direction: project → repo (initial publish)

The repository was **empty (no commits)** when it was associated, so there is no upstream
commit to record and nothing was imported. This project is the source of truth for the
initial publish; `commit:` will be recorded on the first sync that reads real repo history.

### Updated in this project

- Associated `Indranil2020/flyway` as the deploy target for the Flyway Expeditions site.
- Verified the repo is empty — no upstream files to merge, no risk of overwriting work.
- Confirmed the photo auto-discovery resolves this repo from the Pages URL with zero config.
- Packaged the full site for upload to the repo root.

## Screen map

| Project screen | Repo files it publishes to |
|---|---|
| Homepage | `index.html` |
| All expeditions | `tours.html` |
| Tour detail (`?id=<slug>`) | `tour.html` |
| All locations | `locations.html` |
| Location detail (`?id=<id>`) | `location.html` |
| Birding calendar | `calendar.html` |
| Guides | `team.html` |
| Plan a trip + FAQ | `contact.html` |
| Ops dashboard (internal, noindex) | `admin.html` |
| Not found | `404.html` |
| Shared styles | `assets/css/site.css` |
| Content + pricing data (single source of truth) | `assets/js/data.js` |
| Photo auto-discovery engine | `assets/js/media.js` |
| Shared UI renderers (header, footer, cards, calendars) | `assets/js/site.js` |
| All imagery | `photos/**` |
| Deploy + maintenance docs | `README.md`, `photos/README.md` |

## Notes for future syncs

- `assets/js/data.js` is the only file carrying content and pricing. Diff it first.
- `photos/` is expected to diverge — the user adds images directly on GitHub. Never overwrite
  that folder wholesale on a sync; treat additions there as authoritative.
- The site auto-detects `owner/repo` from the GitHub Pages hostname and first path segment,
  so `FW_CONFIG.repo` in `data.js` should stay empty unless hosting moves off GitHub Pages.
