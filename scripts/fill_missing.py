#!/usr/bin/env python3
"""Fill remaining empty folders with broader Wikimedia Commons queries."""
import urllib.request, urllib.parse, json, os, time, re, html as htmlmod

API = "https://commons.wikimedia.org/w/api.php"
UA = "FlywayExpeditions/1.0 (contact: bird.flyways@gmail.com)"
PHOTOS = "photos"
THUMB_W = 1400

def clean_html(s):
    if not s: return ''
    s = htmlmod.unescape(s); s = re.sub(r'<[^>]+>', '', s)
    return s.strip()

def api(params):
    params['format'] = 'json'
    url = API + '?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())

def normalize_lic(s):
    s = s.lower().strip().replace(' ', '-').replace('cc-zero', 'cc0')
    return s

def is_good_license(lic_raw):
    norm = normalize_lic(lic_raw)
    if 'non-commercial' in norm or 'noncommercial' in norm or 'nc' in norm.split('-'): return False
    if 'no-derivatives' in norm or 'nd' in norm.split('-'): return False
    good = ['public-domain','pd','cc0','cc-by','cc-by-sa','gfdl','gnu','attribution','own','self','wikimedia']
    return any(g in norm for g in good)

def search(query, limit=20):
    try:
        data = api({
            'action':'query','generator':'search','gsrnamespace':'6',
            'gsrsearch':query,'gsrlimit':str(limit),
            'prop':'imageinfo','iiprop':'url|extmetadata|mime|size','iiurlwidth':str(THUMB_W),
        })
    except Exception as e:
        print(f"  API error: {e}"); return []
    pages = data.get('query', {}).get('pages', {})
    results = []
    for pid, page in pages.items():
        ii = (page.get('imageinfo') or [{}])[0]
        mime = ii.get('mime','')
        if mime not in ('image/jpeg','image/png'): continue
        w, h = ii.get('width',0), ii.get('height',0)
        if w < 600 or h < 400: continue
        lic_raw = clean_html(ii.get('extmetadata',{}).get('LicenseShortName',{}).get('value',''))
        if not is_good_license(lic_raw): continue
        results.append({
            'title':page['title'],'thumburl':ii.get('thumburl') or ii.get('url',''),
            'width':w,'height':h,'license':lic_raw or 'Unknown',
            'license_url':clean_html(ii.get('extmetadata',{}).get('LicenseUrl',{}).get('value','')),
            'artist':clean_html(ii.get('extmetadata',{}).get('Artist',{}).get('value','Unknown')),
            'desc':clean_html(ii.get('extmetadata',{}).get('ImageDescription',{}).get('value','')),
        })
    results.sort(key=lambda r:(r['width']>=r['height'], r['width']*r['height']), reverse=True)
    return results

def download(url, path):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=60) as r: data = r.read()
    with open(path, 'wb') as f: f.write(data)
    return len(data)

def slugify(s):
    s = re.sub(r'[^\w\s-]','',s.lower()); s = re.sub(r'[\s_]+','-',s).strip('-')
    return s[:40]

def write_index(folder):
    dir_path = os.path.join(PHOTOS, folder)
    files_in_dir = sorted([f for f in os.listdir(dir_path) if f.lower().endswith(('.jpg','.jpeg','.png','.webp'))])
    entries = []
    for f in files_in_dir:
        base = re.sub(r'^\d+[-_]','',f); base = base.rsplit('.',1)[0]
        cap_text = base.replace('-',' ').replace('_',' ').title()
        entries.append({"file":f,"caption":cap_text})
    with open(os.path.join(dir_path,'index.json'),'w') as jf: json.dump(entries, jf, indent=2)

def process(folder, max_imgs, queries, existing_count=0):
    dir_path = os.path.join(PHOTOS, folder)
    os.makedirs(dir_path, exist_ok=True)
    found = existing_count
    used_titles = set()
    start_idx = existing_count
    credits = []
    for query in queries:
        if found >= max_imgs: break
        print(f"[{folder}] searching: {query}")
        results = search(query, limit=20)
        print(f"  {len(results)} usable result(s)")
        for r in results:
            if found >= max_imgs: break
            if r['title'] in used_titles: continue
            used_titles.add(r['title'])
            ext = '.jpg' if '.jpg' in r['title'].lower() or '.jpeg' in r['title'].lower() else '.png'
            fname = f"{found+1:02d}-{slugify(query)}{ext}"
            fpath = os.path.join(dir_path, fname)
            try:
                size = download(r['thumburl'], fpath)
                print(f"  ✓ {fname} ({size//1024}KB) — {r['title'][:55]}")
                credits.append({'folder':folder,'file':fname,'title':r['title'],
                    'artist':r['artist'][:100] if r['artist'] else 'Unknown',
                    'license':r['license'],'license_url':r['license_url'],
                    'source':f"https://commons.wikimedia.org/wiki/{urllib.parse.quote(r['title'])}"})
                found += 1; time.sleep(0.4)
            except Exception as e:
                print(f"  ✗ {e}"); continue
        time.sleep(0.4)
    if found > existing_count: write_index(folder)
    if found == 0: print(f"  ⚠ Still no images for {folder}")
    return found, credits

# Missing/under-filled folders with many alternate queries
TARGETS = [
    # Empty locations — use multiple broad queries
    ("locations/singalila", 1, 0, [
        "Sandakphu","Kanchenjunga mountain sunrise","Singalila National Park",
        "Sandakphu trek India","Darjeeling Himalaya mountain view"]),
    ("locations/lava", 1, 0, [
        "Lava West Bengal","Kalimpong forest","Lava monastery",
        "Neora Valley forest mist","Kalimpong hills trees"]),
    ("locations/latpanchar", 1, 0, [
        "Kalimpong hills forest","Latpanchar","Darjeeling hills forest mist",
        "Himalayan foothills forest India","West Bengal forest hills"]),
    ("locations/chapramari", 1, 0, [
        "Chapramari","wild elephant India forest","elephant grassland India",
        "Dooars forest","Jalpaiguri forest"]),
    ("locations/samthar", 1, 0, [
        "Kalimpong village","Himalayan village terraced fields","Indian village hills green",
        "terraced fields hills India","rural West Bengal hills"]),
    ("locations/senchal", 1, 0, [
        "Darjeeling forest fog","Senchal lake Darjeeling","Darjeeling hills foggy forest",
        "Darjeeling pine trees mist","hill station forest fog India"]),
    ("locations/purbasthali", 1, 0, [
        "oxbow lake India birds","river lake birds West Bengal","wetland river India sunset",
        "Ganges river birds India","Bhagirathi river"]),
    # Under-filled: hero needs 3, gallery needs 8
    ("hero", 3, 1, [
        "Sundarbans mangrove forest river","Himalayan misty forest morning",
        "rainforest canopy green","mangrove creek water boat","tropical forest sunlight rays"]),
    ("gallery", 8, 2, [
        "kingfisher bird perched colorful","purple heron wetland","eagle bird flight sky",
        "ruddy shelduck duck water","bee-eater bird colorful","peacock bird display India",
        "parrot bird India","owl bird forest","heron bird hunting","stork bird wetland"]),
]

def main():
    all_credits = []
    for folder, max_imgs, existing, queries in TARGETS:
        found, credits = process(folder, max_imgs, queries, existing)
        all_credits.extend(credits)

    # Append credits
    credits_path = os.path.join(PHOTOS, 'CREDITS.md')
    with open(credits_path, 'r') as f: existing_text = f.read()
    # Find last table row
    with open(credits_path, 'a') as f:
        for c in all_credits:
            artist = c['artist'].replace('|','\\|')[:50]
            lic = c['license'].replace('|','\\|')
            f.write(f"| {c['folder']} | {c['file']} | {artist} | {lic} | [link]({c['source']}) |\n")
    print(f"\nAdded {len(all_credits)} images")

if __name__ == '__main__':
    main()
