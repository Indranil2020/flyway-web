#!/usr/bin/env python3
"""
Fetch copyright-free images from Wikimedia Commons for Flyway Expeditions.
FIXED: license matching (normalize spaces), removed broken search filter,
       broadened queries, lowered min dimensions.
Licenses: Public Domain, CC-0, CC-BY, CC-BY-SA (all allow commercial use).
"""

import urllib.request, urllib.parse, json, os, time, re, html as htmlmod

API = "https://commons.wikimedia.org/w/api.php"
UA = "FlywayExpeditions/1.0 (contact: bird.flyways@gmail.com)"
PHOTOS = "photos"
THUMB_W = 1400

def clean_html(s):
    if not s:
        return ''
    s = htmlmod.unescape(s)
    s = re.sub(r'<[^>]+>', '', s)
    return s.strip()

def api(params):
    params['format'] = 'json'
    url = API + '?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())

def normalize_lic(s):
    """CC BY-SA 4.0 → cc-by-sa-4.0 for matching"""
    s = s.lower().strip()
    s = s.replace(' ', '-')
    s = s.replace('cc-zero', 'cc0')
    return s

def is_good_license(lic_raw):
    """Accept anything that's not NC or ND. Commons is mostly PD/CC-BY/CC-BY-SA."""
    norm = normalize_lic(lic_raw)
    # Exclude non-commercial and no-derivatives
    if 'non-commercial' in norm or 'noncommercial' in norm or 'nc' in norm.split('-'):
        return False
    if 'no-derivatives' in norm or 'nd' in norm.split('-'):
        return False
    # Accept PD, CC0, CC-BY, CC-BY-SA, GFDL
    good = ['public-domain', 'pd', 'cc0', 'cc-by', 'cc-by-sa', 'gfdl', 'gnu',
            'attribution', 'own', 'self', 'wikimedia']
    return any(g in norm for g in good)

def search(query, limit=15):
    try:
        data = api({
            'action': 'query',
            'generator': 'search',
            'gsrnamespace': '6',
            'gsrsearch': query,
            'gsrlimit': str(limit),
            'prop': 'imageinfo',
            'iiprop': 'url|extmetadata|mime|size',
            'iiurlwidth': str(THUMB_W),
        })
    except Exception as e:
        print(f"  API error: {e}")
        return []

    pages = data.get('query', {}).get('pages', {})
    results = []
    for pid, page in pages.items():
        ii = (page.get('imageinfo') or [{}])[0]
        mime = ii.get('mime', '')
        if mime not in ('image/jpeg', 'image/png'):
            continue
        w, h = ii.get('width', 0), ii.get('height', 0)
        if w < 600 or h < 400:
            continue

        lic_raw = clean_html(ii.get('extmetadata', {}).get('LicenseShortName', {}).get('value', ''))
        if not is_good_license(lic_raw):
            continue

        results.append({
            'title': page['title'],
            'thumburl': ii.get('thumburl') or ii.get('url', ''),
            'url': ii.get('url', ''),
            'width': w,
            'height': h,
            'license': lic_raw or 'Unknown',
            'license_url': clean_html(ii.get('extmetadata', {}).get('LicenseUrl', {}).get('value', '')),
            'artist': clean_html(ii.get('extmetadata', {}).get('Artist', {}).get('value', 'Unknown')),
            'desc': clean_html(ii.get('extmetadata', {}).get('ImageDescription', {}).get('value', '')),
        })

    # Prefer landscape, then larger
    results.sort(key=lambda r: (r['width'] >= r['height'], r['width'] * r['height']), reverse=True)
    return results

def download(url, path):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    with open(path, 'wb') as f:
        f.write(data)
    return len(data)

def slugify(s):
    s = re.sub(r'[^\w\s-]', '', s.lower())
    s = re.sub(r'[\s_]+', '-', s).strip('-')
    return s[:40]

# (folder, max_images, [search_queries...])
FOLDERS = [
    ("hero", 3, [
        "Sundarbans mangrove forest river",
        "Himalayan misty forest morning",
        "rainforest canopy green sunlight",
    ]),
    ("gallery", 8, [
        "kingfisher bird perched colorful",
        "hornbill bird Asia",
        "purple heron wetland",
        "eagle bird flight",
        "ruddy shelduck duck water",
        "bee-eater bird colorful",
        "openbill stork nesting colony",
        "peacock bird display",
    ]),
    # --- Tours ---
    ("tours/sundarbans-mangrove-classic", 2, [
        "Sundarbans mangrove boat river",
        "mangrove forest creek water",
    ]),
    ("tours/lava-neora-hornbill-trail", 2, [
        "Neora Valley forest mist",
        "Himalayan cloud forest misty",
    ]),
    ("tours/singalila-snow-birding", 2, [
        "Sandakphu Kanchenjunga sunrise",
        "Singalila Himalaya snow trek",
    ]),
    ("tours/dooars-rhino-circuit", 2, [
        "Indian rhinoceros grassland",
        "Terai grassland forest elephant",
    ]),
    ("tours/kolkata-weekend-wetlands", 2, [
        "wetland water birds India",
        "pond marsh birds egret",
    ]),
    ("tours/kulik-monsoon-heronry", 2, [
        "Asian openbill stork colony tree",
        "stork nesting colony",
    ]),
    # --- Locations (all 18) ---
    ("locations/sundarbans", 1, ["Sundarbans mangrove forest India"]),
    ("locations/singalila", 1, ["Sandakphu Kanchenjunga Himalaya"]),
    ("locations/lava", 1, ["Lava Kalimpong forest monastery"]),
    ("locations/latpanchar", 1, ["Kalimpong hills forest mist"]),
    ("locations/gorumara", 1, ["Gorumara National Park India"]),
    ("locations/jaldapara", 1, ["Jaldapara National Park rhino"]),
    ("locations/buxa", 1, ["Buxa Tiger Reserve forest"]),
    ("locations/chapramari", 1, ["Chapramari forest elephant"]),
    ("locations/mahananda", 1, ["Mahananda Wildlife Sanctuary"]),
    ("locations/neora-valley", 1, ["Neora Valley National Park"]),
    ("locations/samthar", 1, ["Kalimpong village hills terraced"]),
    ("locations/senchal", 1, ["Darjeeling forest hills fog"]),
    ("locations/purbasthali", 1, ["oxbow lake river birds India"]),
    ("locations/rajarhat", 1, ["wetland birds India"]),
    ("locations/kulik", 1, ["Raiganj bird sanctuary stork"]),
    ("locations/bethuadahari", 1, ["spotted deer forest India"]),
    ("locations/bibhutibhushan", 1, ["river forest West Bengal India"]),
    ("locations/chintamani-kar", 1, ["bird sanctuary wetland India"]),
    # --- Species ---
    ("species/bengal-tiger", 1, ["Bengal tiger walking"]),
    ("species/indian-rhinoceros", 1, ["Indian rhinoceros one-horned"]),
    ("species/rufous-necked-hornbill", 1, ["rufous-necked hornbill"]),
    ("species/blood-pheasant", 1, ["blood pheasant Himalaya"]),
    ("species/mangrove-pitta", 1, ["pitta bird"]),
    ("species/brown-winged-kingfisher", 1, ["kingfisher bird mangrove"]),
    ("species/fire-tailed-myzornis", 1, ["myzornis bird"]),
    ("species/pheasant-tailed-jacana", 1, ["jacana bird wetland"]),
    ("species/ruddy-shelduck", 1, ["ruddy shelduck duck"]),
    ("species/open-billed-stork", 1, ["Asian openbill stork"]),
    ("species/pallas-s-fish-eagle", 1, ["Pallas fish eagle"]),
    ("species/satyr-tragopan", 1, ["tragopan pheasant Himalaya"]),
    # --- Team ---
    ("team/samim", 1, ["bird watching binoculars nature"]),
    ("team/rohit", 1, ["wildlife observation binoculars forest"]),
    ("team/indranil", 1, ["wetland bird watching sunrise"]),
]

def main():
    credits = []
    total = 0

    for folder, max_imgs, queries in FOLDERS:
        dir_path = os.path.join(PHOTOS, folder)
        os.makedirs(dir_path, exist_ok=True)

        existing = [f for f in os.listdir(dir_path) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
        if existing:
            print(f"[{folder}] SKIP — {len(existing)} image(s) already present")
            continue

        found = 0
        used_titles = set()
        for query in queries:
            if found >= max_imgs:
                break
            print(f"[{folder}] searching: {query}")
            results = search(query, limit=15)
            print(f"  {len(results)} usable result(s)")

            for r in results:
                if found >= max_imgs:
                    break
                if r['title'] in used_titles:
                    continue
                used_titles.add(r['title'])

                ext = '.jpg' if '.jpg' in r['title'].lower() or '.jpeg' in r['title'].lower() else '.png'
                fname = f"{found+1:02d}-{slugify(query)}{ext}"
                fpath = os.path.join(dir_path, fname)

                try:
                    size = download(r['thumburl'], fpath)
                    print(f"  ✓ {fname} ({size//1024}KB) — {r['title'][:60]}")
                    credits.append({
                        'folder': folder,
                        'file': fname,
                        'title': r['title'],
                        'artist': r['artist'][:100] if r['artist'] else 'Unknown',
                        'license': r['license'],
                        'license_url': r['license_url'],
                        'source': f"https://commons.wikimedia.org/wiki/{urllib.parse.quote(r['title'])}",
                    })
                    found += 1
                    total += 1
                    time.sleep(0.5)
                except Exception as e:
                    print(f"  ✗ Download failed: {e}")
                    continue
            time.sleep(0.5)

        if found == 0:
            print(f"  ⚠ No images found for {folder}")

        # Create/update index.json
        if found > 0:
            files_in_dir = sorted([f for f in os.listdir(dir_path) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))])
            entries = []
            for f in files_in_dir:
                base = re.sub(r'^\d+[-_]', '', f)
                base = base.rsplit('.', 1)[0]
                cap_text = base.replace('-', ' ').replace('_', ' ').title()
                entries.append({"file": f, "caption": cap_text})
            idx_path = os.path.join(dir_path, 'index.json')
            with open(idx_path, 'w') as jf:
                json.dump(entries, jf, indent=2)

    # Merge with existing credits
    credits_path = os.path.join(PHOTOS, 'CREDITS.md')
    existing_credits = ""
    if os.path.exists(credits_path):
        with open(credits_path) as f:
            existing_credits = f.read()

    with open(credits_path, 'w') as f:
        f.write("# Image Credits\n\n")
        f.write("All images sourced from [Wikimedia Commons](https://commons.wikimedia.org/) under licenses that permit commercial use (Public Domain, CC-0, CC-BY, CC-BY-SA).\n\n")
        f.write("| Folder | File | Author | License | Source |\n")
        f.write("|---|---|---|---|---|\n")
        for c in credits:
            artist = c['artist'].replace('|', '\\|')[:50]
            lic = c['license'].replace('|', '\\|')
            src = c['source']
            f.write(f"| {c['folder']} | {c['file']} | {artist} | {lic} | [link]({src}) |\n")

    print(f"\n{'='*60}")
    print(f"Downloaded {total} images this run")
    print(f"Credits saved to {credits_path}")

if __name__ == '__main__':
    main()
