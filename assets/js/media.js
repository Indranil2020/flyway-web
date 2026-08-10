/* ============================================================
   FLYWAY EXPEDITIONS — auto image discovery
   Drop files into photos/<folder>/ and they appear. No config.

   Resolution order per folder:
     1. photos/<folder>/index.json   (optional, fastest)
     2. GitHub Contents API          (any filename, auto-detected repo)
     3. Numbered probe 01..24        (works on any host, offline)
     4. Labelled placeholder
   Results cached in localStorage for 6h.
   ============================================================ */
window.FW_MEDIA = (function () {
  var IMG = /\.(jpe?g|png|webp|avif|gif)$/i;
  var TTL = 6 * 3600 * 1000;
  var TTL_EMPTY = 30 * 60 * 1000;
  var PROBE_MAX = 24, PROBE_EXT = ['jpg', 'png', 'webp'];
  var cfg = window.FW_CONFIG || {};
  var mem = {};

  /* — repo auto-detect: user.github.io/repo → {owner:user, repo:repo} — */
  function repoInfo() {
    if (cfg.repo) { var p = cfg.repo.split('/'); return { owner: p[0], repo: p[1], branch: cfg.branch || 'main' }; }
    var h = location.hostname, m = h.match(/^([\w-]+)\.github\.io$/i);
    if (!m) return null;
    var seg = location.pathname.split('/').filter(Boolean)[0];
    return { owner: m[1], repo: seg || (m[1] + '.github.io'), branch: cfg.branch || 'main' };
  }

  function base() { return (cfg.photosBase || 'photos').replace(/\/$/, ''); }
  function ck(f) { return 'fw_media:' + f; }
  function readCache(f) {
    try {
      var r = JSON.parse(localStorage.getItem(ck(f)) || 'null');
      if (!r) return null;
      var ttl = (r.v && r.v.length) ? TTL : TTL_EMPTY;
      if (Date.now() - r.t < ttl) return r.v;
    } catch (e) {}
    return null;
  }
  function writeCache(f, v) { try { localStorage.setItem(ck(f), JSON.stringify({ t: Date.now(), v: v })); } catch (e) {} }

  /* — filename → human caption. 01-satyr-tragopan_male.jpg → "Satyr Tragopan · Male" — */
  function caption(name) {
    var s = name.replace(IMG, '').replace(/^\d+[-_.\s]*/, '');
    return s.split('_').map(function (part) {
      return part.replace(/[-\s]+/g, ' ').trim().replace(/\b\w/g, function (c) { return c.toUpperCase(); });
    }).filter(Boolean).join(' · ');
  }

  function exists(url) {
    return new Promise(function (res) {
      var i = new Image();
      i.onload = function () { res(true); };
      i.onerror = function () { res(false); };
      i.src = url;
    });
  }

  function viaJson(folder) {
    return fetch(base() + '/' + folder + '/index.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) return null;
        var arr = Array.isArray(j) ? j : (j.images || j.files || null);
        if (!arr || !arr.length) return null;
        return arr.map(function (it) {
          var name = typeof it === 'string' ? it : (it.file || it.name);
          return { src: base() + '/' + folder + '/' + name, cap: (it && it.caption) || caption(name), name: name };
        });
      })
      .catch(function () { return null; });
  }

  function viaApi(folder) {
    var r = repoInfo();
    if (!r) return Promise.resolve(null);
    var u = 'https://api.github.com/repos/' + r.owner + '/' + r.repo + '/contents/' +
            encodeURIComponent(base()) + '/' + folder.split('/').map(encodeURIComponent).join('/') + '?ref=' + r.branch;
    return fetch(u, { headers: { Accept: 'application/vnd.github+json' } })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (j) {
        if (!Array.isArray(j)) return null;
        var out = j.filter(function (f) { return f.type === 'file' && IMG.test(f.name); })
                   .sort(function (a, b) { return a.name.localeCompare(b.name, undefined, { numeric: true }); })
                   .map(function (f) { return { src: f.download_url, cap: caption(f.name), name: f.name }; });
        return out.length ? out : null;
      })
      .catch(function () { return null; });
  }

  /* Probe numbered files. Each index checks all extension candidates in PARALLEL,
     and we stop after 2 consecutive empty indices. */
  function probeIndex(folder, n) {
    var names = n === 1 ? ['01', '1'] : [String(n).padStart(2, '0')];
    var cands = [];
    names.forEach(function (nm) { PROBE_EXT.forEach(function (e) { cands.push(nm + '.' + e); }); });
    return Promise.all(cands.map(function (c) {
      var url = base() + '/' + folder + '/' + c;
      return exists(url).then(function (ok) { return ok ? { src: url, cap: caption(c), name: c } : null; });
    })).then(function (hits) {
      for (var i = 0; i < hits.length; i++) if (hits[i]) return hits[i];
      return null;
    });
  }

  function viaProbe(folder) {
    var found = [], misses = 0, n = 1;
    function next() {
      if (n > PROBE_MAX || misses >= 2) return Promise.resolve();
      var i = n++;
      return probeIndex(folder, i).then(function (hit) {
        if (hit) { found.push(hit); misses = 0; } else { misses++; }
        return next();
      });
    }
    return next().then(function () { return found.length ? found : null; });
  }

  function list(folder) {
    if (!folder) return Promise.resolve([]);
    if (mem[folder]) return mem[folder];
    var cached = readCache(folder);
    if (cached) { mem[folder] = Promise.resolve(cached); return mem[folder]; }
    mem[folder] = viaJson(folder)
      .then(function (r) { return r || viaApi(folder); })
      .then(function (r) { return r || viaProbe(folder); })
      .then(function (r) { var out = r || []; writeCache(folder, out); return out; });
    return mem[folder];
  }

  /* — placeholder markup telling the user exactly where to drop files — */
  function phHTML(folder, note) {
    return '<div class="ph-in">' + (note || 'Photo slot') + '<b>' + base() + '/' + folder + '/</b></div>';
  }

  function figure(img, cap) {
    var f = document.createElement('figure');
    f.className = 'fig';
    var i = document.createElement('img');
    i.src = img; i.alt = cap || ''; i.loading = 'lazy'; i.decoding = 'async';
    f.appendChild(i);
    if (cap) { var c = document.createElement('figcaption'); c.textContent = cap; f.appendChild(c); }
    return f;
  }

  /* — hydrate [data-photo] (single) and [data-gallery] (grid) — */
  function hydrate(root) {
    root = root || document;
    root.querySelectorAll('[data-photo]').forEach(function (el) {
      var folder = el.getAttribute('data-photo'), note = el.getAttribute('data-note'),
          idx = parseInt(el.getAttribute('data-index') || '0', 10);
      el.classList.add('ph'); el.innerHTML = phHTML(folder, note);
      list(folder).then(function (imgs) {
        if (!imgs.length) return;
        var pick = imgs[idx % imgs.length];
        el.classList.remove('ph'); el.classList.add('fig'); el.innerHTML = '';
        el.appendChild(figure(pick.src, el.hasAttribute('data-nocaption') ? '' : pick.cap).firstChild);
        if (!el.hasAttribute('data-nocaption')) {
          var c = document.createElement('figcaption'); c.textContent = pick.cap; el.appendChild(c);
        }
        if (el.hasAttribute('data-rotate') && imgs.length > 1) rotate(el, imgs);
      });
    });
    root.querySelectorAll('[data-gallery]').forEach(function (el) {
      var folder = el.getAttribute('data-gallery'), note = el.getAttribute('data-note'),
          max = parseInt(el.getAttribute('data-max') || '99', 10);
      el.innerHTML = '';
      var stub = document.createElement('div');
      stub.className = 'ph'; stub.style.aspectRatio = '4/3'; stub.innerHTML = phHTML(folder, note || 'Drop photos here');
      el.appendChild(stub);
      list(folder).then(function (imgs) {
        if (!imgs.length) return;
        el.innerHTML = '';
        imgs.slice(0, max).forEach(function (im, i) {
          var f = figure(im.src, im.cap);
          f.addEventListener('click', function () { openLB(imgs, i); });
          el.appendChild(f);
        });
      });
    });
  }

  function rotate(el, imgs) {
    var i = 0;
    setInterval(function () {
      i = (i + 1) % imgs.length;
      var img = el.querySelector('img'); if (!img) return;
      img.style.opacity = 0;
      setTimeout(function () { img.src = imgs[i].src; img.alt = imgs[i].cap; img.style.opacity = 1; }, 320);
    }, 6500);
    var im = el.querySelector('img'); if (im) im.style.transition = 'opacity .32s,transform .5s';
  }

  /* — lightbox — */
  var lb, lbi = 0, lbset = [];
  function ensureLB() {
    if (lb) return lb;
    lb = document.createElement('div');
    lb.className = 'lb';
    lb.innerHTML = '<button class="lb-x" aria-label="Close">✕</button><button class="lb-p" aria-label="Previous">‹</button>' +
                   '<img alt=""/><button class="lb-n" aria-label="Next">›</button><div class="lb-cap"></div>';
    document.body.appendChild(lb);
    lb.querySelector('.lb-x').onclick = closeLB;
    lb.querySelector('.lb-p').onclick = function (e) { e.stopPropagation(); step(-1); };
    lb.querySelector('.lb-n').onclick = function (e) { e.stopPropagation(); step(1); };
    lb.onclick = function (e) { if (e.target === lb) closeLB(); };
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('on')) return;
      if (e.key === 'Escape') closeLB();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
    return lb;
  }
  function paint() {
    var im = lbset[lbi]; if (!im) return;
    lb.querySelector('img').src = im.src;
    lb.querySelector('img').alt = im.cap || '';
    lb.querySelector('.lb-cap').textContent = im.cap || '';
  }
  function step(d) { lbi = (lbi + d + lbset.length) % lbset.length; paint(); }
  function openLB(set, i) { ensureLB(); lbset = set; lbi = i || 0; paint(); lb.classList.add('on'); }
  function closeLB() { if (lb) lb.classList.remove('on'); }

  return { list: list, hydrate: hydrate, caption: caption, openLB: openLB, repoInfo: repoInfo, base: base };
})();
