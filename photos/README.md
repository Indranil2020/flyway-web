# photos/ — the only folder you need to touch

Drop image files into any folder below and they appear on the website. No config, no code, no rebuild.

## How discovery works

Each gallery tries three methods, in order, and uses whichever answers first:

1. **`index.json`** in the folder — optional, fastest. Format: `["a.jpg","b.jpg"]` or
   `[{"file":"a.jpg","caption":"Custom caption"}]`
2. **GitHub Contents API** — reads the real folder listing. Any filename works. The repo is
   auto-detected from your GitHub Pages URL, so there is nothing to configure.
3. **Numbered probe** — looks for `01.jpg`, `02.jpg`, `03.jpg` … up to 24. Works offline and on
   any host. Use this naming if you want guaranteed order.

Results are cached in the browser for 6 hours. To see new uploads instantly, hard-refresh
(Ctrl/Cmd+Shift+R) or use the "Clear photo cache" button on `admin.html`.

## Filenames become captions

`01-satyr-tragopan_male_neora-valley.jpg`  →  **Satyr Tragopan · Male · Neora Valley**

- Leading numbers are stripped (they only control order)
- Hyphens become spaces
- Underscores become ` · ` separators
- Everything is title-cased

## Folder map

| Folder | Shows up on | Notes |
|---|---|---|
| `hero/` | Homepage hero | Multiple files cross-fade every 6.5 s |
| `brand/` | Header, favicon, social preview | Must contain `logo.png` |
| `gallery/` | Homepage "recent field photography" | Newest work — refresh monthly |
| `locations/<id>/` | `location.html?id=<id>` + card thumbnails | `<id>` must match `locations[].id` in `assets/js/data.js` |
| `tours/<slug>/` | `tour.html?id=<slug>` hero + gallery | `<slug>` must match `tours[].slug` |
| `species/<slug>/` | Target-species cards on tour pages | Lowercase, hyphenated: `satyr-tragopan` |
| `team/<id>/` | Guide portraits | `<id>` must match `guides[].id` |

## Adding something new

**New location:** add an entry to `locations[]` in `assets/js/data.js`, then create
`photos/locations/<that-id>/`. Done — it appears in the table, the cards, the calendar and its own page.

**New tour:** add to `tours[]`, create `photos/tours/<that-slug>/`.

**New guide:** add to `guides[]`, create `photos/team/<that-id>/`.

## Image guidance

- **Format:** JPG for photos, PNG for the logo. WebP and AVIF also work.
- **Size:** 1600–2400 px on the long edge is plenty. Compress before committing — GitHub repos
  should stay under ~1 GB, and large files make the site slow.
- **Orientation:** heroes and location photos look best landscape; portraits work best 3:4.
- Keep your full-resolution originals somewhere else (Drive, external disk). This repo is for
  web-sized copies only.
