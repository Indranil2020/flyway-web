/* ============================================================
   FLYWAY EXPEDITIONS — shared UI. Injects header/footer,
   renders cards/calendars/rows from FW data, wires forms.
   ============================================================ */
(function () {
  var FW = window.FW, M = window.FW_MEDIA;
  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var MKEY = ['J','F','M','A','M','J','J','A','S','O','N','D'];
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c]; }); };
  var inr = function (n) { return '₹' + Number(n).toLocaleString('en-IN'); };
  var qs = function (k) { return new URLSearchParams(location.search).get(k); };
  var el = function (h) { var d = document.createElement('div'); d.innerHTML = h.trim(); return d.firstElementChild; };

  /* ——— links ——— */
  function waLink(msg) {
    return 'https://wa.me/' + FW.brand.whatsapp + (msg ? '?text=' + encodeURIComponent(msg) : '');
  }
  function ebirdLink(loc) {
    return 'https://ebird.org/hotspot?q=' + encodeURIComponent(loc.name + ', West Bengal, India');
  }
  function mapLink(loc) {
    return 'https://www.google.com/maps/search/' + encodeURIComponent(loc.name + ', ' + loc.district + ', West Bengal');
  }

  /* ——— season logic ——— */
  function statusOf(loc, m) {
    if ((loc.closed || []).indexOf(m) > -1) return 'closed';
    if ((loc.peak || []).indexOf(m) > -1) return 'peak';
    if (m >= 5 && m <= 9) return 'fair';
    return 'good';
  }
  var TONE = { peak:'var(--peak)', good:'var(--good)', fair:'var(--fair)', closed:'var(--closed)' };
  var TONE_LABEL = { peak:'Peak', good:'Open', fair:'Fair', closed:'Closed' };

  /* ——— header / footer ——— */
  var NAVLINKS = [
    ['index.html','Home'], ['tours.html','Tours'], ['locations.html','Locations'],
    ['calendar.html','Calendar'], ['team.html','Guides'], ['contact.html','Plan a trip']
  ];
  function header() {
    var here = (location.pathname.split('/').pop() || 'index.html');
    var links = NAVLINKS.map(function (l) {
      return '<a href="' + l[0] + '"' + (l[0] === here ? ' aria-current="page"' : '') + '>' + l[1] + '</a>';
    }).join('');
    return '<header class="hdr"><div class="hdr-in">' +
      '<a class="brand" href="index.html">' +
        '<img src="' + relBase() + 'photos/brand/logo.png" alt="' + esc(FW.brand.name) + ' logo"/>' +
        '<span><span class="brand-n">' + esc(FW.brand.name) + '</span>' +
        '<span class="brand-s">' + esc(FW.brand.kicker) + '</span></span></a>' +
      '<nav class="nav" id="nav">' + links + '</nav>' +
      '<div class="hdr-cta">' +
        '<a class="btn btn--ghost btn--sm" href="contact.html">Enquire</a>' +
        '<a class="btn btn--sm" href="' + waLink('Hi Flyway — I\'d like to plan a birding trip.') + '" target="_blank" rel="noopener">WhatsApp</a>' +
        '<button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span></button>' +
      '</div></div></header>';
  }
  function relBase() { return ''; }

  function footer() {
    var b = FW.brand;
    return '<footer class="ftr"><div class="wrap"><div class="ftr-grid">' +
      '<div><div style="font-family:var(--display);font-size:24px">' + esc(b.name) + '</div>' +
      '<p style="font-size:13.5px;color:rgba(244,242,236,.62);margin-top:12px;max-width:38ch;line-height:1.6">' + esc(b.sub) + '</p>' +
      '<p style="font-family:var(--mono);font-size:11px;color:var(--sage);margin-top:16px;letter-spacing:.06em">' + esc(b.city) + '</p></div>' +
      '<div><h4>Tours</h4><ul>' +
        '<li><a href="tours.html">All expeditions</a></li><li><a href="locations.html">Locations</a></li>' +
        '<li><a href="calendar.html">Birding calendar</a></li><li><a href="contact.html">Custom trips</a></li></ul></div>' +
      '<div><h4>About</h4><ul>' +
        '<li><a href="team.html">Our guides</a></li><li><a href="contact.html#faq">FAQ</a></li>' +
        '<li><a href="' + b.ebird + '" target="_blank" rel="noopener">eBird · West Bengal</a></li>' +
        '<li><a href="contact.html">Contact</a></li></ul></div>' +
      '<div><h4>Follow</h4><ul>' +
        '<li><a href="' + waLink('') + '" target="_blank" rel="noopener">WhatsApp</a></li>' +
        '<li><a href="https://instagram.com/' + b.instagram + '" target="_blank" rel="noopener">Instagram</a></li>' +
        '<li><a href="https://facebook.com/' + b.facebook + '" target="_blank" rel="noopener">Facebook</a></li>' +
        '<li><a href="https://youtube.com/' + b.youtube + '" target="_blank" rel="noopener">YouTube</a></li></ul></div>' +
      '</div><div class="ftr-bot"><span>© ' + new Date().getFullYear() + ' ' + esc(b.name) + ' · Est. ' + b.founded + '</span>' +
      '<span>' + esc(b.coords) + '</span></div></div></footer>';
  }

  /* ——— components ——— */
  function tourCard(t) {
    var z = FW.zones[t.zone];
    return '<article class="card">' +
      '<a href="tour.html?id=' + t.slug + '" data-photo="tours/' + t.slug + '" data-note="Tour hero" data-nocaption aria-label="' + esc(t.title) + '"></a>' +
      '<div class="card-b">' +
        '<div class="card-meta"><i class="dot" style="background:' + z.color + '"></i>' +
        esc(z.label) + ' · ' + t.days + ' days</div>' +
        '<h3><a href="tour.html?id=' + t.slug + '">' + esc(t.title) + '</a></h3>' +
        '<p>' + esc(t.blurb) + '</p>' +
        '<div class="tags">' + t.species.slice(0,3).map(function (s) { return '<span class="tag">' + esc(s) + '</span>'; }).join('') +
        (t.species.length > 3 ? '<span class="tag" style="border-style:dashed">+' + (t.species.length-3) + '</span>' : '') + '</div>' +
        '<div class="card-foot"><div class="price"><small>From</small><b>' + inr(t.price) + '</b>' +
        '<em>per person · ' + esc(t.window) + '</em></div>' +
        '<a class="btn btn--ghost btn--sm" href="tour.html?id=' + t.slug + '">Details →</a></div>' +
      '</div></article>';
  }

  function locCard(l) {
    var z = FW.zones[l.zone];
    return '<article class="card">' +
      '<a href="location.html?id=' + l.id + '" data-photo="locations/' + l.id + '" data-note="Location photo" data-nocaption aria-label="' + esc(l.name) + '"></a>' +
      '<div class="card-b">' +
        '<div class="card-meta"><i class="dot" style="background:' + z.color + '"></i>' + esc(z.label) + ' · ' + esc(l.elev) + '</div>' +
        '<h3><a href="location.html?id=' + l.id + '">' + esc(l.name) + '</a></h3>' +
        '<p>' + esc(l.note) + '</p>' +
        '<div class="mkeys">' + MKEY.map(function (k) { return '<span>' + k + '</span>'; }).join('') + '</div>' +
        '<div class="mrow">' + [1,2,3,4,5,6,7,8,9,10,11,12].map(function (m) {
          var s = statusOf(l, m);
          return '<i style="background:' + TONE[s] + '" title="' + MONTHS[m-1] + ' · ' + TONE_LABEL[s] + '">' + (s === 'peak' ? '★' : s === 'closed' ? '·' : '') + '</i>';
        }).join('') + '</div>' +
        '<div class="card-foot"><div class="price"><small>Peak rate</small><b>' + inr(l.price) + '</b><em>per person / day</em></div>' +
        '<a class="btn btn--ghost btn--sm" href="location.html?id=' + l.id + '">Explore →</a></div>' +
      '</div></article>';
  }

  function calendar(activeMonth) {
    var now = activeMonth == null ? new Date().getMonth() : activeMonth;
    return '<div class="cal">' + FW.monthly.map(function (mo, i) {
      return '<div class="cal-m"' + (i === now ? ' data-on' : '') + '>' +
        '<i>' + String(i+1).padStart(2,'0') + '</i><b>' + mo.m + '</b>' +
        '<u>' + mo.open + '/18 open</u>' +
        '<div class="cal-bar"><i style="width:' + (mo.open/18*100) + '%;background:' + (i === now ? 'var(--sage)' : TONE[mo.tone]) + '"></i></div>' +
        '<s>' + esc(mo.status) + '</s></div>';
    }).join('') + '</div>' +
    '<div class="legend">' + [['peak','Peak'],['good','Open'],['fair','Fair'],['closed','Mostly closed']].map(function (p) {
      return '<div><i style="background:' + TONE[p[0]] + '"></i>' + p[1] + '</div>';
    }).join('') + '</div>';
  }

  function nowCard() {
    var i = new Date().getMonth(), mo = FW.monthly[i];
    return '<div class="now"><span class="eyebrow">Right now · ' + MONTHS[i] + '</span>' +
      '<div style="display:flex;align-items:baseline;gap:10px;margin-top:8px">' +
      '<span style="font-family:var(--display);font-size:44px;line-height:1">' + mo.open +
      '<span style="font-size:18px;color:var(--muted)">/18</span></span>' +
      '<span class="pill pill--' + mo.tone + '">' + esc(mo.status) + '</span></div>' +
      '<p style="font-size:12.5px;color:var(--muted);margin-top:6px">locations open for birding</p>' +
      '<a class="btn btn--ghost btn--sm" style="margin-top:14px;width:100%;justify-content:center" href="calendar.html">See the year →</a></div>';
  }

  function sightingsRows() {
    return FW.sightings.map(function (s) {
      return '<div style="padding:26px 30px;background:var(--forest)">' +
        '<div style="display:flex;justify-content:space-between;font-family:var(--mono);font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:rgba(244,242,236,.5)">' +
        '<span>' + esc(s.loc) + '</span><span>' + esc(s.when) + '</span></div>' +
        '<div style="font-family:var(--display);font-size:24px;margin-top:11px;line-height:1.15;color:var(--paper)">' + esc(s.species) + '</div>' +
        '<div style="display:flex;gap:14px;margin-top:13px;font-size:12.5px;color:rgba(244,242,236,.7)"><span>×' + s.n + '</span><span>' + esc(s.by) + '</span></div></div>';
    }).join('');
  }

  function guideCard(g, big) {
    return '<article class="card" style="' + (big ? 'grid-column:1/-1;flex-direction:row' : '') + '">' +
      '<div data-photo="team/' + g.id + '" data-note="Guide portrait" data-nocaption style="' +
      (big ? 'width:min(38%,340px);aspect-ratio:3/4;flex:none' : 'aspect-ratio:3/4') + '"></div>' +
      '<div class="card-b">' +
        '<div class="card-meta">' + esc(g.role) + ' · ' + esc(g.region) + '</div>' +
        '<h3 style="font-size:' + (big ? '34px' : '22px') + '">' + esc(g.name) + '</h3>' +
        '<p>' + esc(g.bio) + '</p>' +
        '<p style="font-size:13px;color:var(--ink)"><strong>Specialty:</strong> ' + esc(g.specialty) + '</p>' +
        '<div class="card-foot"><div style="display:flex;gap:22px;flex-wrap:wrap">' +
          stat(g.years, 'years') + stat(g.trips, 'trips led') +
          '<div class="stat"><b style="font-size:15px;font-family:var(--body)">' + esc(g.langs) + '</b><span>languages</span></div>' +
        '</div></div>' +
      '</div></article>';
  }
  function stat(v, l) { return '<div class="stat"><b style="font-size:24px">' + esc(v) + '</b><span>' + esc(l) + '</span></div>'; }

  function faqList() {
    return '<div class="rows">' + FW.faq.map(function (f, i) {
      return '<details style="border-bottom:1px solid var(--rule)">' +
        '<summary style="padding:18px 22px;cursor:pointer;font-family:var(--display);font-size:19px;list-style:none;display:flex;justify-content:space-between;gap:16px">' +
        esc(f.q) + '<span style="font-family:var(--mono);color:var(--ochre-2)">+</span></summary>' +
        '<div style="padding:0 22px 22px;font-size:15px;color:var(--ink-2);line-height:1.6;max-width:70ch">' + esc(f.a) + '</div></details>';
    }).join('') + '</div>';
  }

  /* ——— enquiry form → WhatsApp deep link ——— */
  function wireForm(form) {
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form), lines = [];
      lines.push('*New trip enquiry — ' + FW.brand.name + '*');
      d.forEach(function (v, k) { if (String(v).trim()) lines.push(k + ': ' + v); });
      var url = waLink(lines.join('\n'));
      window.open(url, '_blank', 'noopener');
      var ok = form.querySelector('[data-sent]');
      if (ok) { ok.hidden = false; ok.textContent = 'Opening WhatsApp with your details… if nothing happened, message us at ' + FW.brand.phoneDisplay; }
    });
  }

  /* ——— mount ——— */
  function mount() {
    var h = document.getElementById('site-header'); if (h) h.outerHTML = header();
    var f = document.getElementById('site-footer'); if (f) f.outerHTML = footer();
    var b = document.getElementById('burger'), n = document.getElementById('nav');
    if (b && n) b.addEventListener('click', function () {
      var on = n.classList.toggle('on'); b.setAttribute('aria-expanded', on);
    });
    document.querySelectorAll('[data-wa]').forEach(function (a) {
      a.href = waLink(a.getAttribute('data-wa') || '');
      a.target = '_blank'; a.rel = 'noopener';
    });
    document.querySelectorAll('[data-mailto]').forEach(function (a) { a.href = 'mailto:' + FW.brand.email; });
    document.querySelectorAll('[data-brand]').forEach(function (s) {
      var k = s.getAttribute('data-brand'); if (FW.brand[k]) s.textContent = FW.brand[k];
    });
    wireForm(document.querySelector('[data-enquiry]'));
    if (M) M.hydrate(document);
  }

  window.FWUI = {
    esc: esc, inr: inr, qs: qs, el: el, MONTHS: MONTHS, MKEY: MKEY,
    waLink: waLink, ebirdLink: ebirdLink, mapLink: mapLink,
    statusOf: statusOf, TONE: TONE, TONE_LABEL: TONE_LABEL,
    tourCard: tourCard, locCard: locCard, calendar: calendar, nowCard: nowCard,
    sightingsRows: sightingsRows, guideCard: guideCard, stat: stat, faqList: faqList,
    mount: mount, hydrate: function () { if (M) M.hydrate(document); }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
