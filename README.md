# Flyway Expeditions

Static website for a birding & wildlife tour operator in West Bengal, India.
No build step, no framework, no dependencies. Deploys to GitHub Pages as-is.

---

## Deploy to GitHub Pages (5 minutes)

1. Create a new **public** repository on GitHub — e.g. `flyway-expeditions`.
2. Upload every file and folder from this project to the repo root
   (drag the whole folder onto GitHub's upload page, or `git push`).
3. Repo → **Settings** → **Pages** → Source: **Deploy from a branch** →
   Branch: `main`, folder: `/ (root)` → **Save**.
4. Wait ~60 seconds. Your site is live at
   `https://<your-username>.github.io/<repo-name>/`

That's it. The photo system auto-detects your repo from that URL — nothing to configure.

### Custom domain (optional, ~₹600/yr)

1. Buy `flywayexpeditions.in` from BigRock, GoDaddy India or Cloudflare.
2. At your registrar add these DNS records:
   - `A` → `185.199.108.153`
   - `A` → `185.199.109.153`
   - `A` → `185.199.110.153`
   - `A` → `185.199.111.153`
   - `CNAME` `www` → `<your-username>.github.io`
3. GitHub → Settings → Pages → Custom domain → enter the domain → **Enforce HTTPS**.

---

## The only two things you ever edit

### 1. `assets/js/data.js` — all the words and numbers

Tours, prices, locations, seasons, guides, testimonials, sightings, FAQ, phone number,
social handles. Every page reads from this one file. Change a price here and it updates on
the homepage, the tours grid, the tour page, the calendar and the admin dashboard.

### 2. `photos/` — all the pictures

Drop image files into a folder and they appear on the site. No config, no code.
See **[`photos/README.md`](photos/README.md)** for the folder map and naming rules.

> **The one rule:** edit `data.js`, or drop a photo in a folder. Never anything else.

---

## Pages

| File | What it is |
|---|---|
| `index.html` | Homepage — hero, featured tours, calendar, zones, sightings, gallery, guides, quotes |
| `tours.html` | All expeditions, filterable by zone |
| `tour.html?id=<slug>` | Single tour — itinerary, target species, inclusions, gallery |
| `locations.html` | All 18 sites with a 12-month status grid, filterable |
| `location.html?id=<id>` | Single location — timing, species, gallery, related trips |
| `calendar.html` | Month-by-month planner — what's open, what's peak, what to book |
| `team.html` | Guides, how-we-work, recruitment |
| `contact.html` | Enquiry form (opens WhatsApp pre-filled) + FAQ |
| `admin.html` | **Internal.** This-month ops, content bank, photo folder map, playbook. Not indexed, not linked from the public nav. |
| `404.html` | Not-found page |

---

## How the photo system works

Three-tier discovery per folder, first one to answer wins:

1. **`index.json`** in the folder — optional, fastest, lets you set custom captions.
2. **GitHub Contents API** — reads the real folder listing, so *any* filename works.
   Repo auto-detected from the Pages URL.
3. **Numbered probe** — `01.jpg`, `02.jpg`, … up to 24. Works offline and on any host.

Filenames become captions: `01-satyr-tragopan_male.jpg` → *Satyr Tragopan · Male*.

Results cache in the browser for 6 hours. Hard-refresh, or use **Clear photo cache** on
`admin.html`, to see new uploads immediately.

If a folder is empty you get a labelled placeholder showing the exact path to drop files
into — so the site is never broken, just visibly unfinished in a useful way.

---

## Before you go live — checklist

- [ ] `assets/js/data.js` → `brand.whatsapp` — your real number, digits only with country code (`919812345678`)
- [ ] `assets/js/data.js` → `brand.phoneDisplay`, `brand.email`, `brand.instagram`, `brand.facebook`, `brand.youtube`
- [ ] `photos/brand/logo.png` — replace with your final logo if it changes
- [ ] `photos/hero/` — add 3–5 landscape images (they cross-fade)
- [ ] `photos/gallery/` — add 8–12 of your best recent photos
- [ ] `photos/team/samim/` — add a portrait
- [ ] Check every price in `tours[]` and `locations[]` against current rates
- [ ] Set up WhatsApp Business, Google Business Profile, Instagram, Facebook page
- [ ] Submit the site to Google Search Console

---

## The free stack

| Need | Use | Cost |
|---|---|---|
| Hosting | GitHub Pages | Free |
| Domain | `.in` from BigRock / Cloudflare | ~₹600/yr |
| Email | Zoho Mail (custom domain) | Free, 5 users |
| Bookings | WhatsApp Business catalog + broadcast | Free |
| Social scheduling | Meta Business Suite (IG + FB together) | Free |
| Newsletter | Buttondown | Free under 100 subs |
| Analytics | Cloudflare Web Analytics | Free |
| Local search | Google Business Profile | Free |
| Citizen science | eBird | Free |

---

## Extending it

**New location** → add to `locations[]` in `data.js`, create `photos/locations/<id>/`.
**New tour** → add to `tours[]`, create `photos/tours/<slug>/`.
**New guide** → add to `guides[]`, create `photos/team/<id>/`.
**New region (Assam, Sikkim, Bhutan…)** → add a zone to `zones{}`, then locations pointing at it.

Nothing else needs touching. The nav, filters, calendars, tables, cards and dashboards all
derive from the data.

---

## Browser support

Modern evergreen browsers (Chrome, Safari, Firefox, Edge). Mobile-first responsive.
Works with JavaScript required — this is a JS-rendered site by design, to keep it to one
data file. If you later need server-rendered HTML for SEO, the data file ports cleanly to
Eleventy or Astro without touching the CSS.
