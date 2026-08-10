/* ============================================================
   FLYWAY EXPEDITIONS — single source of truth
   ▸ Edit this file only. Every page reads from it.
   ▸ Photos are auto-discovered from photos/<folder>/ — see README.
   ============================================================ */

window.FW_CONFIG = {
  // Leave repo blank on GitHub Pages — it auto-detects from the URL.
  // Set it only if you host elsewhere, e.g. repo: "samim/flyway-expeditions"
  repo: "",
  branch: "main",
  photosBase: "photos"
};

window.FW = {
  brand: {
    name: "Flyway Expeditions",
    short: "Flyway",
    kicker: "Birding & Wildlife · West Bengal",
    tagline: "The flyway runs through Bengal.",
    sub: "Field-led birding and wildlife expeditions across 18 hand-picked locations in West Bengal — from the Sundarbans mangroves to 3,600 m at Sandakphu.",
    phoneDisplay: "+91 98XX XXX XXX",
    whatsapp: "919800000000",          // digits only, with country code
    email: "hello@flywayexpeditions.in",
    instagram: "flywayexpeditions",
    facebook: "flywayexpeditions",
    youtube: "@flywayexpeditions",
    ebird: "https://ebird.org/region/IN-WB",
    city: "Kolkata, West Bengal, India",
    coords: "22.5726° N, 88.3639° E",
    founded: "2024"
  },

  zones: {
    north:  { label: "North Bengal", sub: "Himalayan foothills", color: "#2a3527" },
    dooars: { label: "Dooars",       sub: "Terai plains & foothills", color: "#8a9a7b" },
    south:  { label: "South Bengal", sub: "Wetlands & Sundarbans", color: "#4a7892" }
  },

  /* 18 locations. peak = months (1-12) at PEAK. closed = months shut. */
  locations: [
    { id:"lava", zone:"north", name:"Lava", elev:"2,100 m", district:"Kalimpong", stay:"3–4 days", price:4800,
      species:["Satyr Tragopan","Blood Pheasant","Fire-tailed Sunbird","Rufous-throated Partridge"],
      note:"Cloud-forest birding at its most rewarding — mixed flocks work the moss-hung oaks from first light.",
      peak:[11,12,1,2], closed:[6,7,8] },
    { id:"latpanchar", zone:"north", name:"Latpanchar", elev:"1,500 m", district:"Kalimpong", stay:"2–3 days", price:4500,
      species:["Rufous-necked Hornbill","Great Hornbill","Long-tailed Broadbill"],
      note:"Known locally as Trogon Point. The most reliable Rufous-necked Hornbill site in the state.",
      peak:[11,12,1,2,3,4], closed:[6,7,8] },
    { id:"neora-valley", zone:"north", name:"Neora Valley NP", elev:"1,600–2,700 m", district:"Kalimpong", stay:"4–5 days", price:5500,
      species:["Rusty-bellied Shortwing","Red Panda","Golden-throated Barbet","Scarlet Minivet"],
      note:"One of the last true wilderness tracts in the eastern Himalaya. Red panda country.",
      peak:[11,12,1,2,3,4], closed:[6,7,8] },
    { id:"singalila", zone:"north", name:"Singalila NP", elev:"2,000–3,600 m", district:"Darjeeling", stay:"5–8 days", price:7000,
      species:["Blood Pheasant","Satyr Tragopan","Fire-tailed Myzornis","Himalayan Monal"],
      note:"Sandakphu ridge. 300+ species possible, with Kanchenjunga over your shoulder.",
      peak:[11,12,1,2,3,4], closed:[6,7,8] },
    { id:"mahananda", zone:"north", name:"Mahananda WLS", elev:"100–300 m", district:"Darjeeling", stay:"2–3 days", price:3800,
      species:["Rufous-necked Hornbill","Ibisbill","Pallas's Fish Eagle"],
      note:"Sal forest and the Teesta riverbed — 300+ species recorded within an hour of Siliguri.",
      peak:[11,12,1,2,3,4], closed:[6,7,8,9] },
    { id:"samthar", zone:"north", name:"Samthar Plateau", elev:"1,500 m", district:"Kalimpong", stay:"2–3 days", price:4000,
      species:["Pygmy Blue Flycatcher","Long-tailed Broadbill","Grey-headed Canary-flycatcher"],
      note:"Quiet village plateau with terraced fields dropping into deep forest gorges.",
      peak:[11,12,1,2,3], closed:[6,7,8] },
    { id:"senchal", zone:"north", name:"Senchal WLS", elev:"1,500–2,600 m", district:"Darjeeling", stay:"2–3 days", price:3800,
      species:["Golden-backed Woodpecker","Emerald Cuckoo","Kalij Pheasant"],
      note:"India's oldest wildlife sanctuary, minutes from Darjeeling town.",
      peak:[11,12,1,2], closed:[6,7,8] },

    { id:"gorumara", zone:"dooars", name:"Gorumara NP", elev:"100–300 m", district:"Jalpaiguri", stay:"2–3 days", price:4200,
      species:["Indian Rhinoceros","Brahminy Duck","Great Hornbill","Indian Roller"],
      note:"Four watchtowers over riverine grassland. Rhino and bird in the same frame.",
      peak:[11,12,1,2,3,4], closed:[6,7,8,9] },
    { id:"jaldapara", zone:"dooars", name:"Jaldapara NP", elev:"Foothills", district:"Alipurduar", stay:"2–3 days", price:4500,
      species:["One-horned Rhino","Hornbills","Indian Peafowl","Bengal Florican"],
      note:"The largest rhino population in Bengal, plus tall-grass specialists most operators miss.",
      peak:[11,12,1,2,3,4], closed:[6,7,8,9] },
    { id:"buxa", zone:"dooars", name:"Buxa Tiger Reserve", elev:"100–1,700 m", district:"Alipurduar", stay:"3–4 days", price:4800,
      species:["Greater Pied Hornbill","Ibisbill","Black-necked Crane","Pallas's Fish Eagle"],
      note:"284+ species across an altitude range few reserves in India can match.",
      peak:[11,12,1,2,3,4], closed:[6,7,8,9] },
    { id:"chapramari", zone:"dooars", name:"Chapramari WLS", elev:"Plains", district:"Jalpaiguri", stay:"1–2 days", price:3500,
      species:["Green Magpie","Brahminy Duck","Crested Serpent Eagle"],
      note:"Small, dense, elephant-heavy. Best paired with Gorumara on the same trip.",
      peak:[11,12,1,2,3,4], closed:[6,7,8,9] },

    { id:"sundarbans", zone:"south", name:"Sundarbans NP", elev:"Sea level", district:"South 24 Parganas", stay:"2–3 days", price:6000,
      species:["Bengal Tiger","Mangrove Pitta","Brown-winged Kingfisher","Lesser Adjutant","Masked Finfoot"],
      note:"The world's largest mangrove forest, worked slowly by boat. Six kingfisher species possible.",
      peak:[10,11,12,1,2], closed:[] },
    { id:"chintamani-kar", zone:"south", name:"Chintamani Kar BS", elev:"Plains", district:"South 24 Parganas", stay:"Day trip", price:2800,
      species:["Pheasant-tailed Jacana","Cotton Teal","Asian Barred Owlet"],
      note:"150+ species inside Kolkata's southern edge. The best first birding trip in Bengal.",
      peak:[10,11,12,1,2,3,4], closed:[] },
    { id:"purbasthali", zone:"south", name:"Purbasthali (Chupi Char)", elev:"Plains", district:"Purba Bardhaman", stay:"1–2 days", price:3000,
      species:["Ruddy Shelduck","Ferruginous Duck","Osprey","Northern Pintail"],
      note:"An oxbow lake off the Bhagirathi that fills with wintering wildfowl.",
      peak:[10,11,12,1,2], closed:[] },
    { id:"rajarhat", zone:"south", name:"Rajarhat Wetlands", elev:"Plains", district:"Kolkata", stay:"Day trip", price:2200,
      species:["Asian Openbill","Watercock","Greater Painted-snipe","Peregrine Falcon"],
      note:"Urban wetland mosaic on Kolkata's fringe — birding between the building sites.",
      peak:[10,11,12,1,2], closed:[] },
    { id:"kulik", zone:"south", name:"Kulik BS, Raiganj", elev:"Plains", district:"Uttar Dinajpur", stay:"1–2 days", price:3200,
      species:["Open-billed Stork","Night Heron","Little Cormorant","Egret colonies"],
      note:"Asia's largest heronry. Peaks in monsoon when almost everything else in Bengal is shut.",
      peak:[8,9,10,11,12], closed:[] },
    { id:"bethuadahari", zone:"south", name:"Bethuadahari WLS", elev:"Plains", district:"Nadia", stay:"1–2 days", price:2400,
      species:["Alexandrine Parakeet","Indian Cuckoo","Coppersmith Barbet"],
      note:"Compact deciduous patch with 50+ wintering species and easy trails.",
      peak:[10,11,12,1,2,3], closed:[] },
    { id:"bibhutibhushan", zone:"south", name:"Bibhutibhushan WLS", elev:"Plains", district:"North 24 Parganas", stay:"1–2 days", price:2200,
      species:["Ichamati river waders","Spotted Deer","Common Langur"],
      note:"Riverside sanctuary on the Ichamati, named for the author of Pather Panchali.",
      peak:[10,11,12,1,2], closed:[] }
  ],

  /* Tours. slug = URL id AND photo folder name (photos/tours/<slug>/) */
  tours: [
    { slug:"sundarbans-mangrove-classic", title:"Sundarbans Mangrove Classic", zone:"south",
      days:3, nights:2, from:"Kolkata", group:"4–8", level:"Easy", price:18000, window:"Oct – Feb",
      sites:["sundarbans"], featured:true,
      blurb:"The world's largest mangrove forest, in the right season. Mangrove Pitta, Brown-winged Kingfisher, Lesser Adjutant — and, if the day is kind, the stripes you came for.",
      species:["Mangrove Pitta","Brown-winged Kingfisher","Lesser Adjutant","Masked Finfoot","Bengal Tiger","Collared Kingfisher"],
      includes:["Forest permits & entry fees","Private boat with naturalist","Lodge accommodation, twin sharing","All meals from lunch day 1","Return transfers from Kolkata","Spotting scope & reference guides"],
      itinerary:[
        { t:"Kolkata → Godkhali → Sundarbans", a:["06:30 pickup from central Kolkata","Drive to Godkhali jetty (≈3 h)","Board boat, lunch on the water","Afternoon creek birding — kingfishers, herons","Sunset at Sajnekhali watchtower","Species log & dinner at lodge"] },
        { t:"Full day on the creeks", a:["05:15 tea, 05:45 boat out","Prime tide window: Mangrove Pitta stake-out","Dobanki canopy walk","Lunch aboard, midday rest","Late-tide run for Masked Finfoot","Night sounds walk near the lodge"] },
        { t:"Final tide → Kolkata", a:["05:30 last creek run","Breakfast, pack up","Boat back to Godkhali","Drive to Kolkata, arrive ≈16:00"] }
      ] },
    { slug:"lava-neora-hornbill-trail", title:"Lava & Neora Hornbill Trail", zone:"north",
      days:5, nights:4, from:"NJP / Bagdogra", group:"4–6", level:"Moderate", price:32000, window:"Nov – Apr",
      sites:["lava","latpanchar","neora-valley"], featured:true,
      blurb:"Six hornbill species are possible on this route. So is the Satyr Tragopan, if the weather plays fair. Cloud-forest birding, unhurried, with the same guide throughout.",
      species:["Satyr Tragopan","Rufous-necked Hornbill","Fire-tailed Sunbird","Rusty-bellied Shortwing","Golden-throated Barbet","Long-tailed Broadbill"],
      includes:["All forest permits","Dedicated guide + 4x4 and driver","Homestay & forest-lodge accommodation","All meals","NJP/Bagdogra transfers both ways","Spotting scope"],
      itinerary:[
        { t:"NJP → Latpanchar", a:["Pickup at NJP / Bagdogra","Drive via Sevoke, Mahananda edge birding","Check in at Latpanchar homestay","Afternoon Trogon Point session","Evening species log"] },
        { t:"Latpanchar — hornbill day", a:["05:30 pre-dawn stake-out","Rufous-necked Hornbill nest watch","Breakfast back at homestay","Mid-morning trail to the reservoir","Lunch & rest","Late-light session on the ridge"] },
        { t:"Latpanchar → Lava", a:["Dawn session before departure","Drive to Lava via Algarah","Check in, lunch","Afternoon Lava monastery forest walk","Owling after dinner"] },
        { t:"Neora Valley NP", a:["04:45 departure with packed breakfast","Full day inside Neora Valley","Tragopan and Shortwing zones","Picnic lunch in the forest","Return by last light","Log & farewell dinner"] },
        { t:"Lava → NJP", a:["Optional dawn session at Lava","Breakfast & checkout","Drive down to NJP / Bagdogra","Drop for afternoon flights/trains"] }
      ] },
    { slug:"singalila-snow-birding", title:"Singalila Snow Birding", zone:"north",
      days:8, nights:7, from:"NJP / Bagdogra", group:"4–6", level:"Strenuous", price:64000, window:"Nov – Apr",
      sites:["singalila","senchal"], featured:true,
      blurb:"Our flagship high-altitude expedition to the Sandakphu ridge. 300+ species possible, proper acclimatisation built in, and Kanchenjunga at dawn on a clear morning.",
      species:["Blood Pheasant","Fire-tailed Myzornis","Kalij Pheasant","Himalayan Monal","Red Panda","Satyr Tragopan"],
      includes:["Trek permits & porter support","All accommodation (trekkers' huts + lodges)","All meals on trek","Spotting scopes","Field naturalist throughout","NJP/Bagdogra transfers"],
      itinerary:[
        { t:"NJP → Darjeeling", a:["Pickup and drive to Darjeeling","Afternoon Senchal WLS session","Gear check & briefing"] },
        { t:"Darjeeling → Manebhanjan → Tumling", a:["Drive to Manebhanjan","Begin ascent, bird the Chitrey stretch","Overnight Tumling (2,970 m)"] },
        { t:"Tumling → Kalipokhri", a:["Dawn ridge birding","Rhododendron belt — Myzornis zone","Overnight Kalipokhri"] },
        { t:"Kalipokhri → Sandakphu", a:["Ascent to 3,636 m","Blood Pheasant & Monal stake-outs","Sunset over Kanchenjunga"] },
        { t:"Sandakphu — full day", a:["Pre-dawn summit session","Full day working the treeline","Red panda watch in the bamboo"] },
        { t:"Sandakphu → Gurdum", a:["Descend through prime forest","Warbler and laughingthrush flocks","Overnight Gurdum"] },
        { t:"Gurdum → Srikhola → Darjeeling", a:["Final trek section","Drive back to Darjeeling","Celebration dinner & full trip list"] },
        { t:"Darjeeling → NJP", a:["Optional final session","Drive down to NJP / Bagdogra"] }
      ] },
    { slug:"dooars-rhino-circuit", title:"Dooars Rhino & Hornbill Circuit", zone:"dooars",
      days:6, nights:5, from:"NJP / Bagdogra", group:"4–8", level:"Easy", price:38000, window:"Oct – Apr",
      sites:["gorumara","jaldapara","buxa","chapramari"], featured:true,
      blurb:"Gorumara, Jaldapara, Buxa and Chapramari in one loop. Mixed birding and big-mammal viewing — the easiest way to sample everything the Dooars holds.",
      species:["Greater Pied Hornbill","Ibisbill","Pallas's Fish Eagle","Indian Rhinoceros","Bengal Florican"],
      includes:["All park permits & jeep safaris","Forest-lodge accommodation","All meals","Driver-cum-naturalist","NJP/Bagdogra transfers"],
      itinerary:[
        { t:"NJP → Lataguri (Gorumara)", a:["Pickup, drive to Lataguri","Afternoon watchtower session","Evening log"] },
        { t:"Gorumara + Chapramari", a:["Dawn jeep safari","Chapramari afternoon drive","Murti riverbed birding"] },
        { t:"→ Jaldapara", a:["Transfer with roadside birding","Afternoon grassland safari"] },
        { t:"Jaldapara — full day", a:["Elephant-back grassland ride","Florican and grass-specialist search","Evening Torsa riverbed"] },
        { t:"→ Buxa", a:["Transfer to Buxa/Jayanti","Afternoon Jayanti riverbed — Ibisbill"] },
        { t:"Buxa → NJP", a:["Dawn session at Buxa","Drive to NJP for afternoon departure"] }
      ] },
    { slug:"kolkata-weekend-wetlands", title:"Kolkata Weekend Wetlands", zone:"south",
      days:2, nights:1, from:"Kolkata", group:"2–8", level:"Easy", price:6500, window:"Oct – Mar",
      sites:["chintamani-kar","rajarhat"], featured:true,
      blurb:"For Kolkata birders new to the hobby — or seasoned ones with a Saturday free. Two contrasting habitats, one weekend, no flights.",
      species:["Pheasant-tailed Jacana","Asian Openbill","Greater Painted-snipe","Peregrine Falcon","Cotton Teal"],
      includes:["Pickup & drop within Kolkata","Guide both days","Lunch both days","Spotting scope & loan binoculars","One night's stay (optional)"],
      itinerary:[
        { t:"Chintamani Kar Bird Sanctuary", a:["06:00 pickup","Full morning on the sanctuary trails","Lunch nearby","Afternoon canal-side session"] },
        { t:"Rajarhat Wetlands", a:["05:45 start","Wetland mosaic and openbill colonies","Raptor watch mid-morning","Brunch, wrap-up and drop"] }
      ] },
    { slug:"kulik-monsoon-heronry", title:"Kulik Monsoon Heronry", zone:"south",
      days:3, nights:2, from:"Kolkata", group:"4–8", level:"Easy", price:12000, window:"Aug – Oct",
      sites:["kulik"], featured:true,
      blurb:"Almost every park in Bengal is shut in monsoon — and Kulik is at its absolute peak. A unique window most operators ignore entirely.",
      species:["Open-billed Stork","Black-crowned Night Heron","Little Cormorant","Indian Pond Heron"],
      includes:["Sanctuary permits","Guide","Riverside lodge","All meals","Return transfers from Kolkata"],
      itinerary:[
        { t:"Kolkata → Raiganj", a:["Morning train or drive north","Check in, afternoon heronry session","Evening return-to-roost spectacle"] },
        { t:"Kulik — full day", a:["Dawn colony session","Kulik river stretch mid-morning","Afternoon canopy-level nest observation","Evening roost count"] },
        { t:"Raiganj → Kolkata", a:["Final dawn session","Breakfast, return journey"] }
      ] }
  ],

  monthly: [
    { m:"Jan", open:18, status:"Peak",      tone:"peak" },
    { m:"Feb", open:18, status:"Peak",      tone:"peak" },
    { m:"Mar", open:18, status:"High",      tone:"peak" },
    { m:"Apr", open:18, status:"Good",      tone:"good" },
    { m:"May", open:14, status:"Moderate",  tone:"fair" },
    { m:"Jun", open:7,  status:"Low",       tone:"closed" },
    { m:"Jul", open:7,  status:"Low",       tone:"closed" },
    { m:"Aug", open:7,  status:"Kulik peak",tone:"fair" },
    { m:"Sep", open:7,  status:"Recovery",  tone:"fair" },
    { m:"Oct", open:18, status:"Reopening", tone:"good" },
    { m:"Nov", open:18, status:"Peak",      tone:"peak" },
    { m:"Dec", open:18, status:"Peak",      tone:"peak" }
  ],

  /* photos/team/<id>.jpg — or a folder photos/team/<id>/ */
  guides: [
    { id:"samim", name:"Samim Akhter", role:"Lead Field Guide", region:"North Bengal & Sundarbans",
      years:8, trips:140, langs:"English · Bengali · Hindi",
      specialty:"Hornbill stake-outs, mangrove specialties, raptors",
      bio:"Samim has guided birders across Bengal since 2018 and runs one of the most-followed bird photography pages in the state. His speciality is the long, patient wait — the kind that turns “we tried for it” into “we got it”.",
      featured:true },
    { id:"rohit", name:"Rohit S.", role:"Naturalist", region:"Dooars & Terai",
      years:6, trips:90, langs:"English · Hindi · Nepali",
      specialty:"Mammal tracking, owls, nightjars",
      bio:"Grew up on the edge of Gorumara. Reads pug marks and alarm calls better than most read a field guide.",
      featured:false },
    { id:"indrani", name:"Indrani M.", role:"Lead Naturalist", region:"South Bengal wetlands",
      years:11, trips:220, langs:"English · Bengali",
      specialty:"Waders, wildfowl, citizen science",
      bio:"An eBird reviewer for the region with over two decades of wetland counts behind her. Runs our checklist and data programme.",
      featured:false }
  ],

  testimonials: [
    { name:"Anjali R.", from:"Bengaluru", trip:"Sundarbans Mangrove Classic",
      quote:"Mangrove Pitta on day one. The lodge was simple, the food was extraordinary, and our guide knew every call on the creek before we saw the bird." },
    { name:"Tom W.", from:"Bristol, UK", trip:"Lava & Neora Hornbill Trail",
      quote:"Six hornbill species in five days. These are old-school field naturalists, not people reading a tour package back to you." },
    { name:"Priyam G.", from:"Kolkata", trip:"Kolkata Weekend Wetlands",
      quote:"I've lived in this city my whole life and had no idea these places existed. I'm taking my parents next month." }
  ],

  sightings: [
    { species:"Rufous-necked Hornbill", loc:"Latpanchar",     when:"2 days ago",  n:4,  by:"Flyway team" },
    { species:"Mangrove Pitta",         loc:"Sundarbans",     when:"3 days ago",  n:1,  by:"Samim A." },
    { species:"Blood Pheasant",         loc:"Singalila NP",   when:"5 days ago",  n:7,  by:"Trip #142" },
    { species:"Pallas's Fish Eagle",    loc:"Gorumara NP",    when:"1 week ago",  n:2,  by:"Rohit S." },
    { species:"Pheasant-tailed Jacana", loc:"Chintamani Kar", when:"1 week ago",  n:12, by:"Indrani M." },
    { species:"Fire-tailed Myzornis",   loc:"Neora Valley",   when:"2 weeks ago", n:3,  by:"Trip #138" }
  ],

  faq: [
    { q:"How do I book?", a:"Send us a WhatsApp or fill in the enquiry form with your dates, group size and target species. We reply within one working day with a draft itinerary and a firm quote. A 25% deposit confirms the trip." },
    { q:"What if I'm new to birding?", a:"Most of our South Bengal trips are designed for exactly that. We loan binoculars, we go slowly, and nobody is made to feel behind. The Kolkata Weekend Wetlands trip is the usual starting point." },
    { q:"Are the prices per person?", a:"Yes — all listed prices are per person on twin-sharing, and include permits, accommodation, meals and guiding as listed on each tour page. Flights and personal insurance are not included." },
    { q:"How small are the groups?", a:"Four to eight guests depending on the trip, with a hard cap. High-altitude expeditions run at four to six. We do not merge groups to fill seats." },
    { q:"Can you build a custom trip?", a:"That is most of what we do. Tell us the window you have and the birds you want; we build the route around them. Photography-focused itineraries with hide time are a common request." },
    { q:"Do you contribute to eBird?", a:"Every trip submits complete checklists to eBird under the trip name, and we encourage guests to do the same. Our locations page links each site's hotspot." }
  ]
};
