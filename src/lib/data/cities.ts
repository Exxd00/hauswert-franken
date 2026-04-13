// Franken Cities Data - Nürnberg + 100km Radius
// Over 200 cities generating 2500+ unique SEO pages with services

export interface City {
  name: string;
  slug: string;
  region: string;
  district?: string;
  population?: number;
  isMainCity?: boolean;
  description?: string;
}

// Major Cities in Franken (Großstädte)
export const majorCities: City[] = [
  {
    name: "Nürnberg",
    slug: "nuernberg",
    region: "Mittelfranken",
    district: "Nürnberg",
    population: 518000,
    isMainCity: true,
    description: "Zweitgrößte Stadt Bayerns und wirtschaftliches Zentrum Frankens"
  },
  {
    name: "Fürth",
    slug: "fuerth",
    region: "Mittelfranken",
    district: "Fürth",
    population: 128000,
    isMainCity: true,
    description: "Nachbarstadt Nürnbergs mit historischer Altstadt"
  },
  {
    name: "Erlangen",
    slug: "erlangen",
    region: "Mittelfranken",
    district: "Erlangen",
    population: 112000,
    isMainCity: true,
    description: "Universitätsstadt und Siemens-Standort"
  },
  {
    name: "Würzburg",
    slug: "wuerzburg",
    region: "Unterfranken",
    district: "Würzburg",
    population: 127000,
    isMainCity: true,
    description: "UNESCO-Welterbe Residenz und Weinbaustadt"
  },
  {
    name: "Bamberg",
    slug: "bamberg",
    region: "Oberfranken",
    district: "Bamberg",
    population: 77000,
    isMainCity: true,
    description: "UNESCO-Welterbe Altstadt und Bierkultur"
  },
  {
    name: "Bayreuth",
    slug: "bayreuth",
    region: "Oberfranken",
    district: "Bayreuth",
    population: 74000,
    isMainCity: true,
    description: "Festspielstadt und Kulturmetropole"
  },
  {
    name: "Aschaffenburg",
    slug: "aschaffenburg",
    region: "Unterfranken",
    district: "Aschaffenburg",
    population: 70000,
    isMainCity: true,
    description: "Das bayerische Nizza am Main"
  },
  {
    name: "Schweinfurt",
    slug: "schweinfurt",
    region: "Unterfranken",
    district: "Schweinfurt",
    population: 53000,
    isMainCity: true,
    description: "Industriestadt mit Kunstgalerie"
  },
  {
    name: "Ansbach",
    slug: "ansbach",
    region: "Mittelfranken",
    district: "Ansbach",
    population: 41000,
    isMainCity: true,
    description: "Regierungshauptstadt Mittelfrankens"
  },
  {
    name: "Schwabach",
    slug: "schwabach",
    region: "Mittelfranken",
    district: "Schwabach",
    population: 40000,
    isMainCity: true,
    description: "Goldschlägerstadt südlich von Nürnberg"
  },
  {
    name: "Ingolstadt",
    slug: "ingolstadt",
    region: "Oberbayern",
    district: "Ingolstadt",
    population: 136000,
    isMainCity: true,
    description: "Audi-Stadt an der Donau"
  },
  {
    name: "Regensburg",
    slug: "regensburg",
    region: "Oberpfalz",
    district: "Regensburg",
    population: 152000,
    isMainCity: true,
    description: "UNESCO-Welterbe und Donaustadt"
  },
];

// All Cities and Towns in Franken (100km radius from Nürnberg)
export const allCities: City[] = [
  ...majorCities,

  // ============================================
  // LANDKREIS NÜRNBERGER LAND
  // ============================================
  { name: "Lauf an der Pegnitz", slug: "lauf-an-der-pegnitz", region: "Mittelfranken", district: "Nürnberger Land", population: 27000 },
  { name: "Altdorf bei Nürnberg", slug: "altdorf-nuernberg", region: "Mittelfranken", district: "Nürnberger Land", population: 15000 },
  { name: "Hersbruck", slug: "hersbruck", region: "Mittelfranken", district: "Nürnberger Land", population: 12000 },
  { name: "Röthenbach an der Pegnitz", slug: "roethenbach-pegnitz", region: "Mittelfranken", district: "Nürnberger Land", population: 12000 },
  { name: "Schnaittach", slug: "schnaittach", region: "Mittelfranken", district: "Nürnberger Land" },
  { name: "Schwarzenbruck", slug: "schwarzenbruck", region: "Mittelfranken", district: "Nürnberger Land" },
  { name: "Feucht", slug: "feucht", region: "Mittelfranken", district: "Nürnberger Land" },
  { name: "Burgthann", slug: "burgthann", region: "Mittelfranken", district: "Nürnberger Land" },
  { name: "Ottensoos", slug: "ottensoos", region: "Mittelfranken", district: "Nürnberger Land" },
  { name: "Reichenschwand", slug: "reichenschwand", region: "Mittelfranken", district: "Nürnberger Land" },
  { name: "Engelthal", slug: "engelthal", region: "Mittelfranken", district: "Nürnberger Land" },
  { name: "Happurg", slug: "happurg", region: "Mittelfranken", district: "Nürnberger Land" },
  { name: "Hartenstein", slug: "hartenstein", region: "Mittelfranken", district: "Nürnberger Land" },
  { name: "Pommelsbrunn", slug: "pommelsbrunn", region: "Mittelfranken", district: "Nürnberger Land" },
  { name: "Velden", slug: "velden", region: "Mittelfranken", district: "Nürnberger Land" },
  { name: "Vorra", slug: "vorra", region: "Mittelfranken", district: "Nürnberger Land" },
  { name: "Alfeld", slug: "alfeld-mittelfranken", region: "Mittelfranken", district: "Nürnberger Land" },
  { name: "Offenhausen", slug: "offenhausen", region: "Mittelfranken", district: "Nürnberger Land" },
  { name: "Winkelhaid", slug: "winkelhaid", region: "Mittelfranken", district: "Nürnberger Land" },
  { name: "Leinburg", slug: "leinburg", region: "Mittelfranken", district: "Nürnberger Land" },

  // ============================================
  // LANDKREIS FÜRTH
  // ============================================
  { name: "Zirndorf", slug: "zirndorf", region: "Mittelfranken", district: "Fürth", population: 26000 },
  { name: "Oberasbach", slug: "oberasbach", region: "Mittelfranken", district: "Fürth", population: 18000 },
  { name: "Stein", slug: "stein", region: "Mittelfranken", district: "Fürth", population: 14000 },
  { name: "Cadolzburg", slug: "cadolzburg", region: "Mittelfranken", district: "Fürth" },
  { name: "Langenzenn", slug: "langenzenn", region: "Mittelfranken", district: "Fürth" },
  { name: "Roßtal", slug: "rosstal", region: "Mittelfranken", district: "Fürth" },
  { name: "Großhabersdorf", slug: "grosshabersdorf", region: "Mittelfranken", district: "Fürth" },
  { name: "Wilhermsdorf", slug: "wilhermsdorf", region: "Mittelfranken", district: "Fürth" },
  { name: "Ammerndorf", slug: "ammerndorf", region: "Mittelfranken", district: "Fürth" },
  { name: "Puschendorf", slug: "puschendorf", region: "Mittelfranken", district: "Fürth" },
  { name: "Seukendorf", slug: "seukendorf", region: "Mittelfranken", district: "Fürth" },
  { name: "Tuchenbach", slug: "tuchenbach", region: "Mittelfranken", district: "Fürth" },
  { name: "Veitsbronn", slug: "veitsbronn", region: "Mittelfranken", district: "Fürth" },

  // ============================================
  // LANDKREIS ROTH
  // ============================================
  { name: "Roth", slug: "roth", region: "Mittelfranken", district: "Roth", population: 25000 },
  { name: "Wendelstein", slug: "wendelstein", region: "Mittelfranken", district: "Roth", population: 16000 },
  { name: "Hilpoltstein", slug: "hilpoltstein", region: "Mittelfranken", district: "Roth" },
  { name: "Georgensgmünd", slug: "georgensmuend", region: "Mittelfranken", district: "Roth" },
  { name: "Schwanstetten", slug: "schwanstetten", region: "Mittelfranken", district: "Roth" },
  { name: "Spalt", slug: "spalt", region: "Mittelfranken", district: "Roth" },
  { name: "Abenberg", slug: "abenberg", region: "Mittelfranken", district: "Roth" },
  { name: "Allersberg", slug: "allersberg", region: "Mittelfranken", district: "Roth" },
  { name: "Greding", slug: "greding", region: "Mittelfranken", district: "Roth" },
  { name: "Heideck", slug: "heideck", region: "Mittelfranken", district: "Roth" },
  { name: "Thalmässing", slug: "thalmaessing", region: "Mittelfranken", district: "Roth" },
  { name: "Büchenbach", slug: "buechenbach", region: "Mittelfranken", district: "Roth" },
  { name: "Rednitzhembach", slug: "rednitzhembach", region: "Mittelfranken", district: "Roth" },
  { name: "Rohr", slug: "rohr", region: "Mittelfranken", district: "Roth" },
  { name: "Kammerstein", slug: "kammerstein", region: "Mittelfranken", district: "Roth" },

  // ============================================
  // LANDKREIS ERLANGEN-HÖCHSTADT
  // ============================================
  { name: "Herzogenaurach", slug: "herzogenaurach", region: "Mittelfranken", district: "Erlangen-Höchstadt", population: 24000 },
  { name: "Höchstadt an der Aisch", slug: "hoechstadt-aisch", region: "Mittelfranken", district: "Erlangen-Höchstadt", population: 13000 },
  { name: "Eckental", slug: "eckental", region: "Mittelfranken", district: "Erlangen-Höchstadt" },
  { name: "Baiersdorf", slug: "baiersdorf", region: "Mittelfranken", district: "Erlangen-Höchstadt" },
  { name: "Möhrendorf", slug: "moehrendorf", region: "Mittelfranken", district: "Erlangen-Höchstadt" },
  { name: "Bubenreuth", slug: "bubenreuth", region: "Mittelfranken", district: "Erlangen-Höchstadt" },
  { name: "Uttenreuth", slug: "uttenreuth", region: "Mittelfranken", district: "Erlangen-Höchstadt" },
  { name: "Buckenhof", slug: "buckenhof", region: "Mittelfranken", district: "Erlangen-Höchstadt" },
  { name: "Spardorf", slug: "spardorf", region: "Mittelfranken", district: "Erlangen-Höchstadt" },
  { name: "Marloffstein", slug: "marloffstein", region: "Mittelfranken", district: "Erlangen-Höchstadt" },
  { name: "Adelsdorf", slug: "adelsdorf", region: "Mittelfranken", district: "Erlangen-Höchstadt" },
  { name: "Hemhofen", slug: "hemhofen", region: "Mittelfranken", district: "Erlangen-Höchstadt" },
  { name: "Röttenbach", slug: "roettenbach", region: "Mittelfranken", district: "Erlangen-Höchstadt" },
  { name: "Mühlhausen", slug: "muehlhausen-mittelfranken", region: "Mittelfranken", district: "Erlangen-Höchstadt" },
  { name: "Wachenroth", slug: "wachenroth", region: "Mittelfranken", district: "Erlangen-Höchstadt" },
  { name: "Vestenbergsgreuth", slug: "vestenbergsgreuth", region: "Mittelfranken", district: "Erlangen-Höchstadt" },
  { name: "Aurachtal", slug: "aurachtal", region: "Mittelfranken", district: "Erlangen-Höchstadt" },
  { name: "Heßdorf", slug: "hessdorf", region: "Mittelfranken", district: "Erlangen-Höchstadt" },
  { name: "Lonnerstadt", slug: "lonnerstadt", region: "Mittelfranken", district: "Erlangen-Höchstadt" },
  { name: "Weisendorf", slug: "weisendorf", region: "Mittelfranken", district: "Erlangen-Höchstadt" },
  { name: "Großenseebach", slug: "grossenseebach", region: "Mittelfranken", district: "Erlangen-Höchstadt" },
  { name: "Oberreichenbach", slug: "oberreichenbach", region: "Mittelfranken", district: "Erlangen-Höchstadt" },

  // ============================================
  // LANDKREIS FORCHHEIM
  // ============================================
  { name: "Forchheim", slug: "forchheim", region: "Oberfranken", district: "Forchheim", population: 32000 },
  { name: "Ebermannstadt", slug: "ebermannstadt", region: "Oberfranken", district: "Forchheim" },
  { name: "Eggolsheim", slug: "eggolsheim", region: "Oberfranken", district: "Forchheim" },
  { name: "Hallerndorf", slug: "hallerndorf", region: "Oberfranken", district: "Forchheim" },
  { name: "Neunkirchen am Brand", slug: "neunkirchen-brand", region: "Oberfranken", district: "Forchheim" },
  { name: "Gräfenberg", slug: "graefenberg", region: "Oberfranken", district: "Forchheim" },
  { name: "Effeltrich", slug: "effeltrich", region: "Oberfranken", district: "Forchheim" },
  { name: "Pinzberg", slug: "pinzberg", region: "Oberfranken", district: "Forchheim" },
  { name: "Wiesenthau", slug: "wiesenthau", region: "Oberfranken", district: "Forchheim" },
  { name: "Kirchehrenbach", slug: "kirchehrenbach", region: "Oberfranken", district: "Forchheim" },
  { name: "Weilersbach", slug: "weilersbach", region: "Oberfranken", district: "Forchheim" },
  { name: "Pretzfeld", slug: "pretzfeld", region: "Oberfranken", district: "Forchheim" },
  { name: "Leutenbach", slug: "leutenbach", region: "Oberfranken", district: "Forchheim" },
  { name: "Igensdorf", slug: "igensdorf", region: "Oberfranken", district: "Forchheim" },
  { name: "Kunreuth", slug: "kunreuth", region: "Oberfranken", district: "Forchheim" },
  { name: "Hetzles", slug: "hetzles", region: "Oberfranken", district: "Forchheim" },
  { name: "Dormitz", slug: "dormitz", region: "Oberfranken", district: "Forchheim" },
  { name: "Kleinsendelbach", slug: "kleinsendelbach", region: "Oberfranken", district: "Forchheim" },
  { name: "Poxdorf", slug: "poxdorf", region: "Oberfranken", district: "Forchheim" },
  { name: "Langensendelbach", slug: "langensendelbach", region: "Oberfranken", district: "Forchheim" },

  // ============================================
  // LANDKREIS BAMBERG
  // ============================================
  { name: "Hallstadt", slug: "hallstadt", region: "Oberfranken", district: "Bamberg" },
  { name: "Hirschaid", slug: "hirschaid", region: "Oberfranken", district: "Bamberg" },
  { name: "Bischberg", slug: "bischberg", region: "Oberfranken", district: "Bamberg" },
  { name: "Strullendorf", slug: "strullendorf", region: "Oberfranken", district: "Bamberg" },
  { name: "Burgebrach", slug: "burgebrach", region: "Oberfranken", district: "Bamberg" },
  { name: "Schlüsselfeld", slug: "schluesselfeld", region: "Oberfranken", district: "Bamberg" },
  { name: "Pommersfelden", slug: "pommersfelden", region: "Oberfranken", district: "Bamberg" },
  { name: "Frensdorf", slug: "frensdorf", region: "Oberfranken", district: "Bamberg" },
  { name: "Pettstadt", slug: "pettstadt", region: "Oberfranken", district: "Bamberg" },
  { name: "Stegaurach", slug: "stegaurach", region: "Oberfranken", district: "Bamberg" },
  { name: "Memmelsdorf", slug: "memmelsdorf", region: "Oberfranken", district: "Bamberg" },
  { name: "Litzendorf", slug: "litzendorf", region: "Oberfranken", district: "Bamberg" },
  { name: "Scheßlitz", slug: "schesslitz", region: "Oberfranken", district: "Bamberg" },
  { name: "Zapfendorf", slug: "zapfendorf", region: "Oberfranken", district: "Bamberg" },
  { name: "Baunach", slug: "baunach", region: "Oberfranken", district: "Bamberg" },
  { name: "Rattelsdorf", slug: "rattelsdorf", region: "Oberfranken", district: "Bamberg" },
  { name: "Ebensfeld", slug: "ebensfeld", region: "Oberfranken", district: "Bamberg" },

  // ============================================
  // LANDKREIS NEUSTADT AN DER AISCH-BAD WINDSHEIM
  // ============================================
  { name: "Neustadt an der Aisch", slug: "neustadt-aisch", region: "Mittelfranken", district: "Neustadt-Aisch-Bad Windsheim", population: 13000 },
  { name: "Bad Windsheim", slug: "bad-windsheim", region: "Mittelfranken", district: "Neustadt-Aisch-Bad Windsheim", population: 12000 },
  { name: "Emskirchen", slug: "emskirchen", region: "Mittelfranken", district: "Neustadt-Aisch-Bad Windsheim" },
  { name: "Markt Erlbach", slug: "markt-erlbach", region: "Mittelfranken", district: "Neustadt-Aisch-Bad Windsheim" },
  { name: "Dietenhofen", slug: "dietenhofen", region: "Mittelfranken", district: "Neustadt-Aisch-Bad Windsheim" },
  { name: "Diespeck", slug: "diespeck", region: "Mittelfranken", district: "Neustadt-Aisch-Bad Windsheim" },
  { name: "Uffenheim", slug: "uffenheim", region: "Mittelfranken", district: "Neustadt-Aisch-Bad Windsheim" },
  { name: "Scheinfeld", slug: "scheinfeld", region: "Mittelfranken", district: "Neustadt-Aisch-Bad Windsheim" },
  { name: "Markt Bibart", slug: "markt-bibart", region: "Mittelfranken", district: "Neustadt-Aisch-Bad Windsheim" },
  { name: "Burgbernheim", slug: "burgbernheim", region: "Mittelfranken", district: "Neustadt-Aisch-Bad Windsheim" },
  { name: "Baudenbach", slug: "baudenbach", region: "Mittelfranken", district: "Neustadt-Aisch-Bad Windsheim" },
  { name: "Wilhelmsdorf", slug: "wilhelmsdorf", region: "Mittelfranken", district: "Neustadt-Aisch-Bad Windsheim" },
  { name: "Hagenbüchach", slug: "hagenbuechach", region: "Mittelfranken", district: "Neustadt-Aisch-Bad Windsheim" },
  { name: "Ipsheim", slug: "ipsheim", region: "Mittelfranken", district: "Neustadt-Aisch-Bad Windsheim" },

  // ============================================
  // LANDKREIS ANSBACH
  // ============================================
  { name: "Rothenburg ob der Tauber", slug: "rothenburg-tauber", region: "Mittelfranken", district: "Ansbach", population: 11000 },
  { name: "Dinkelsbühl", slug: "dinkelsbuehl", region: "Mittelfranken", district: "Ansbach", population: 11500 },
  { name: "Feuchtwangen", slug: "feuchtwangen", region: "Mittelfranken", district: "Ansbach" },
  { name: "Herrieden", slug: "herrieden", region: "Mittelfranken", district: "Ansbach" },
  { name: "Lichtenau", slug: "lichtenau-mittelfranken", region: "Mittelfranken", district: "Ansbach" },
  { name: "Sachsen bei Ansbach", slug: "sachsen-ansbach", region: "Mittelfranken", district: "Ansbach" },
  { name: "Heilsbronn", slug: "heilsbronn", region: "Mittelfranken", district: "Ansbach" },
  { name: "Windsbach", slug: "windsbach", region: "Mittelfranken", district: "Ansbach" },
  { name: "Neuendettelsau", slug: "neuendettelsau", region: "Mittelfranken", district: "Ansbach" },
  { name: "Petersaurach", slug: "petersaurach", region: "Mittelfranken", district: "Ansbach" },
  { name: "Bruckberg", slug: "bruckberg-mittelfranken", region: "Mittelfranken", district: "Ansbach" },
  { name: "Wolframs-Eschenbach", slug: "wolframs-eschenbach", region: "Mittelfranken", district: "Ansbach" },
  { name: "Merkendorf", slug: "merkendorf", region: "Mittelfranken", district: "Ansbach" },
  { name: "Leutershausen", slug: "leutershausen", region: "Mittelfranken", district: "Ansbach" },
  { name: "Bechhofen", slug: "bechhofen", region: "Mittelfranken", district: "Ansbach" },
  { name: "Wassertrüdingen", slug: "wassertruedingen", region: "Mittelfranken", district: "Ansbach" },
  { name: "Dürrwangen", slug: "duerrwangen", region: "Mittelfranken", district: "Ansbach" },
  { name: "Burgoberbach", slug: "burgoberbach", region: "Mittelfranken", district: "Ansbach" },
  { name: "Weidenbach", slug: "weidenbach", region: "Mittelfranken", district: "Ansbach" },
  { name: "Aurach", slug: "aurach", region: "Mittelfranken", district: "Ansbach" },

  // ============================================
  // LANDKREIS WEISSENBURG-GUNZENHAUSEN
  // ============================================
  { name: "Weißenburg in Bayern", slug: "weissenburg-bayern", region: "Mittelfranken", district: "Weißenburg-Gunzenhausen", population: 18000 },
  { name: "Gunzenhausen", slug: "gunzenhausen", region: "Mittelfranken", district: "Weißenburg-Gunzenhausen", population: 16000 },
  { name: "Treuchtlingen", slug: "treuchtlingen", region: "Mittelfranken", district: "Weißenburg-Gunzenhausen" },
  { name: "Ellingen", slug: "ellingen", region: "Mittelfranken", district: "Weißenburg-Gunzenhausen" },
  { name: "Pappenheim", slug: "pappenheim", region: "Mittelfranken", district: "Weißenburg-Gunzenhausen" },
  { name: "Solnhofen", slug: "solnhofen", region: "Mittelfranken", district: "Weißenburg-Gunzenhausen" },
  { name: "Pleinfeld", slug: "pleinfeld", region: "Mittelfranken", district: "Weißenburg-Gunzenhausen" },
  { name: "Heidenheim", slug: "heidenheim-mittelfranken", region: "Mittelfranken", district: "Weißenburg-Gunzenhausen" },
  { name: "Haundorf", slug: "haundorf", region: "Mittelfranken", district: "Weißenburg-Gunzenhausen" },
  { name: "Absberg", slug: "absberg", region: "Mittelfranken", district: "Weißenburg-Gunzenhausen" },
  { name: "Pfofeld", slug: "pfofeld", region: "Mittelfranken", district: "Weißenburg-Gunzenhausen" },
  { name: "Theilenhofen", slug: "theilenhofen", region: "Mittelfranken", district: "Weißenburg-Gunzenhausen" },
  { name: "Muhr am See", slug: "muhr-am-see", region: "Mittelfranken", district: "Weißenburg-Gunzenhausen" },
  { name: "Alesheim", slug: "alesheim", region: "Mittelfranken", district: "Weißenburg-Gunzenhausen" },
  { name: "Markt Berolzheim", slug: "markt-berolzheim", region: "Mittelfranken", district: "Weißenburg-Gunzenhausen" },
  { name: "Gnotzheim", slug: "gnotzheim", region: "Mittelfranken", district: "Weißenburg-Gunzenhausen" },
  { name: "Polsingen", slug: "polsingen", region: "Mittelfranken", district: "Weißenburg-Gunzenhausen" },
  { name: "Dittenheim", slug: "dittenheim", region: "Mittelfranken", district: "Weißenburg-Gunzenhausen" },

  // ============================================
  // LANDKREIS NEUMARKT IN DER OBERPFALZ
  // ============================================
  { name: "Neumarkt in der Oberpfalz", slug: "neumarkt-oberpfalz", region: "Oberpfalz", district: "Neumarkt", population: 40000 },
  { name: "Freystadt", slug: "freystadt", region: "Oberpfalz", district: "Neumarkt" },
  { name: "Postbauer-Heng", slug: "postbauer-heng", region: "Oberpfalz", district: "Neumarkt" },
  { name: "Pyrbaum", slug: "pyrbaum", region: "Oberpfalz", district: "Neumarkt" },
  { name: "Berching", slug: "berching", region: "Oberpfalz", district: "Neumarkt" },
  { name: "Dietfurt an der Altmühl", slug: "dietfurt-altmuehl", region: "Oberpfalz", district: "Neumarkt" },
  { name: "Parsberg", slug: "parsberg", region: "Oberpfalz", district: "Neumarkt" },
  { name: "Velburg", slug: "velburg", region: "Oberpfalz", district: "Neumarkt" },
  { name: "Mühlhausen", slug: "muehlhausen-oberpfalz", region: "Oberpfalz", district: "Neumarkt" },
  { name: "Berg bei Neumarkt", slug: "berg-neumarkt", region: "Oberpfalz", district: "Neumarkt" },
  { name: "Deining", slug: "deining", region: "Oberpfalz", district: "Neumarkt" },
  { name: "Sengenthal", slug: "sengenthal", region: "Oberpfalz", district: "Neumarkt" },
  { name: "Pilsach", slug: "pilsach", region: "Oberpfalz", district: "Neumarkt" },
  { name: "Lauterhofen", slug: "lauterhofen", region: "Oberpfalz", district: "Neumarkt" },

  // ============================================
  // LANDKREIS EICHSTÄTT
  // ============================================
  { name: "Eichstätt", slug: "eichstaett", region: "Oberbayern", district: "Eichstätt", population: 13500 },
  { name: "Beilngries", slug: "beilngries", region: "Oberbayern", district: "Eichstätt" },
  { name: "Kipfenberg", slug: "kipfenberg", region: "Oberbayern", district: "Eichstätt" },
  { name: "Kinding", slug: "kinding", region: "Oberbayern", district: "Eichstätt" },
  { name: "Dollnstein", slug: "dollnstein", region: "Oberbayern", district: "Eichstätt" },
  { name: "Mörnsheim", slug: "moernsheim", region: "Oberbayern", district: "Eichstätt" },
  { name: "Wellheim", slug: "wellheim", region: "Oberbayern", district: "Eichstätt" },
  { name: "Nassenfels", slug: "nassenfels", region: "Oberbayern", district: "Eichstätt" },
  { name: "Schernfeld", slug: "schernfeld", region: "Oberbayern", district: "Eichstätt" },
  { name: "Titting", slug: "titting", region: "Oberbayern", district: "Eichstätt" },
  { name: "Denkendorf", slug: "denkendorf", region: "Oberbayern", district: "Eichstätt" },
  { name: "Stammham", slug: "stammham", region: "Oberbayern", district: "Eichstätt" },
  { name: "Pollenfeld", slug: "pollenfeld", region: "Oberbayern", district: "Eichstätt" },
  { name: "Hitzhofen", slug: "hitzhofen", region: "Oberbayern", district: "Eichstätt" },
  { name: "Adelschlag", slug: "adelschlag", region: "Oberbayern", district: "Eichstätt" },

  // ============================================
  // LANDKREIS KITZINGEN (Unterfranken)
  // ============================================
  { name: "Kitzingen", slug: "kitzingen", region: "Unterfranken", district: "Kitzingen", population: 21000 },
  { name: "Volkach", slug: "volkach", region: "Unterfranken", district: "Kitzingen" },
  { name: "Iphofen", slug: "iphofen", region: "Unterfranken", district: "Kitzingen" },
  { name: "Dettelbach", slug: "dettelbach", region: "Unterfranken", district: "Kitzingen" },
  { name: "Marktbreit", slug: "marktbreit", region: "Unterfranken", district: "Kitzingen" },
  { name: "Wiesentheid", slug: "wiesentheid", region: "Unterfranken", district: "Kitzingen" },
  { name: "Prichsenstadt", slug: "prichsenstadt", region: "Unterfranken", district: "Kitzingen" },
  { name: "Schwarzach am Main", slug: "schwarzach-main", region: "Unterfranken", district: "Kitzingen" },
  { name: "Mainbernheim", slug: "mainbernheim", region: "Unterfranken", district: "Kitzingen" },
  { name: "Rödelsee", slug: "roedelsee", region: "Unterfranken", district: "Kitzingen" },
  { name: "Sommerach", slug: "sommerach", region: "Unterfranken", district: "Kitzingen" },
  { name: "Nordheim am Main", slug: "nordheim-main", region: "Unterfranken", district: "Kitzingen" },
  { name: "Obernbreit", slug: "obernbreit", region: "Unterfranken", district: "Kitzingen" },
  { name: "Markt Einersheim", slug: "markt-einersheim", region: "Unterfranken", district: "Kitzingen" },

  // ============================================
  // LANDKREIS WÜRZBURG (Unterfranken)
  // ============================================
  { name: "Ochsenfurt", slug: "ochsenfurt", region: "Unterfranken", district: "Würzburg", population: 11500 },
  { name: "Höchberg", slug: "hoechberg", region: "Unterfranken", district: "Würzburg" },
  { name: "Veitshöchheim", slug: "veitshoechheim", region: "Unterfranken", district: "Würzburg" },
  { name: "Gerbrunn", slug: "gerbrunn", region: "Unterfranken", district: "Würzburg" },
  { name: "Rottendorf", slug: "rottendorf", region: "Unterfranken", district: "Würzburg" },
  { name: "Estenfeld", slug: "estenfeld", region: "Unterfranken", district: "Würzburg" },
  { name: "Kürnach", slug: "kuernach", region: "Unterfranken", district: "Würzburg" },
  { name: "Rimpar", slug: "rimpar", region: "Unterfranken", district: "Würzburg" },
  { name: "Zell am Main", slug: "zell-main", region: "Unterfranken", district: "Würzburg" },
  { name: "Waldbüttelbrunn", slug: "waldbuettelbrunn", region: "Unterfranken", district: "Würzburg" },
  { name: "Unterpleichfeld", slug: "unterpleichfeld", region: "Unterfranken", district: "Würzburg" },
  { name: "Randersacker", slug: "randersacker", region: "Unterfranken", district: "Würzburg" },
  { name: "Theilheim", slug: "theilheim", region: "Unterfranken", district: "Würzburg" },
  { name: "Leinach", slug: "leinach", region: "Unterfranken", district: "Würzburg" },
  { name: "Güntersleben", slug: "guentersleben", region: "Unterfranken", district: "Würzburg" },

  // ============================================
  // LANDKREIS SCHWEINFURT (Unterfranken)
  // ============================================
  { name: "Gerolzhofen", slug: "gerolzhofen", region: "Unterfranken", district: "Schweinfurt" },
  { name: "Bergrheinfeld", slug: "bergrheinfeld", region: "Unterfranken", district: "Schweinfurt" },
  { name: "Sennfeld", slug: "sennfeld", region: "Unterfranken", district: "Schweinfurt" },
  { name: "Gochsheim", slug: "gochsheim", region: "Unterfranken", district: "Schweinfurt" },
  { name: "Schonungen", slug: "schonungen", region: "Unterfranken", district: "Schweinfurt" },
  { name: "Werneck", slug: "werneck", region: "Unterfranken", district: "Schweinfurt" },
  { name: "Niederwerrn", slug: "niederwerrn", region: "Unterfranken", district: "Schweinfurt" },
  { name: "Dittelbrunn", slug: "dittelbrunn", region: "Unterfranken", district: "Schweinfurt" },
  { name: "Üchtelhausen", slug: "uechtelhausen", region: "Unterfranken", district: "Schweinfurt" },
  { name: "Schwanfeld", slug: "schwanfeld", region: "Unterfranken", district: "Schweinfurt" },

  // ============================================
  // LANDKREIS HASSBERG (Unterfranken)
  // ============================================
  { name: "Haßfurt", slug: "hassfurt", region: "Unterfranken", district: "Haßberge", population: 13500 },
  { name: "Eltmann", slug: "eltmann", region: "Unterfranken", district: "Haßberge" },
  { name: "Zeil am Main", slug: "zeil-main", region: "Unterfranken", district: "Haßberge" },
  { name: "Ebern", slug: "ebern", region: "Unterfranken", district: "Haßberge" },
  { name: "Hofheim in Unterfranken", slug: "hofheim-unterfranken", region: "Unterfranken", district: "Haßberge" },
  { name: "Königsberg in Bayern", slug: "koenigsberg-bayern", region: "Unterfranken", district: "Haßberge" },
  { name: "Knetzgau", slug: "knetzgau", region: "Unterfranken", district: "Haßberge" },
  { name: "Sand am Main", slug: "sand-main", region: "Unterfranken", district: "Haßberge" },
  { name: "Aidhausen", slug: "aidhausen", region: "Unterfranken", district: "Haßberge" },

  // ============================================
  // LANDKREIS LICHTENFELS (Oberfranken)
  // ============================================
  { name: "Lichtenfels", slug: "lichtenfels", region: "Oberfranken", district: "Lichtenfels", population: 20000 },
  { name: "Bad Staffelstein", slug: "bad-staffelstein", region: "Oberfranken", district: "Lichtenfels" },
  { name: "Burgkunstadt", slug: "burgkunstadt", region: "Oberfranken", district: "Lichtenfels" },
  { name: "Michelau in Oberfranken", slug: "michelau", region: "Oberfranken", district: "Lichtenfels" },
  { name: "Redwitz an der Rodach", slug: "redwitz-rodach", region: "Oberfranken", district: "Lichtenfels" },
  { name: "Weismain", slug: "weismain", region: "Oberfranken", district: "Lichtenfels" },
  { name: "Altenkunstadt", slug: "altenkunstadt", region: "Oberfranken", district: "Lichtenfels" },

  // ============================================
  // LANDKREIS KULMBACH (Oberfranken)
  // ============================================
  { name: "Kulmbach", slug: "kulmbach", region: "Oberfranken", district: "Kulmbach", population: 26000 },
  { name: "Mainleus", slug: "mainleus", region: "Oberfranken", district: "Kulmbach" },
  { name: "Neuenmarkt", slug: "neuenmarkt", region: "Oberfranken", district: "Kulmbach" },
  { name: "Stadtsteinach", slug: "stadtsteinach", region: "Oberfranken", district: "Kulmbach" },
  { name: "Trebgast", slug: "trebgast", region: "Oberfranken", district: "Kulmbach" },
  { name: "Thurnau", slug: "thurnau", region: "Oberfranken", district: "Kulmbach" },
  { name: "Kasendorf", slug: "kasendorf", region: "Oberfranken", district: "Kulmbach" },

  // ============================================
  // LANDKREIS BAYREUTH (Oberfranken)
  // ============================================
  { name: "Pegnitz", slug: "pegnitz", region: "Oberfranken", district: "Bayreuth", population: 13000 },
  { name: "Creußen", slug: "creussen", region: "Oberfranken", district: "Bayreuth" },
  { name: "Waischenfeld", slug: "waischenfeld", region: "Oberfranken", district: "Bayreuth" },
  { name: "Hollfeld", slug: "hollfeld", region: "Oberfranken", district: "Bayreuth" },
  { name: "Gefrees", slug: "gefrees", region: "Oberfranken", district: "Bayreuth" },
  { name: "Bad Berneck", slug: "bad-berneck", region: "Oberfranken", district: "Bayreuth" },
  { name: "Goldkronach", slug: "goldkronach", region: "Oberfranken", district: "Bayreuth" },
  { name: "Bindlach", slug: "bindlach", region: "Oberfranken", district: "Bayreuth" },
  { name: "Eckersdorf", slug: "eckersdorf", region: "Oberfranken", district: "Bayreuth" },
  { name: "Heinersreuth", slug: "heinersreuth", region: "Oberfranken", district: "Bayreuth" },
  { name: "Mistelgau", slug: "mistelgau", region: "Oberfranken", district: "Bayreuth" },
  { name: "Speichersdorf", slug: "speichersdorf", region: "Oberfranken", district: "Bayreuth" },
  { name: "Emtmannsberg", slug: "emtmannsberg", region: "Oberfranken", district: "Bayreuth" },
  { name: "Hummeltal", slug: "hummeltal", region: "Oberfranken", district: "Bayreuth" },

  // ============================================
  // SCHWABEN - DONAU-RIES
  // ============================================
  { name: "Nördlingen", slug: "noerdlingen", region: "Schwaben", district: "Donau-Ries", population: 20000 },
  { name: "Donauwörth", slug: "donauwoerth", region: "Schwaben", district: "Donau-Ries", population: 18000 },
  { name: "Oettingen in Bayern", slug: "oettingen-bayern", region: "Schwaben", district: "Donau-Ries" },
  { name: "Harburg", slug: "harburg-schwaben", region: "Schwaben", district: "Donau-Ries" },
  { name: "Wemding", slug: "wemding", region: "Schwaben", district: "Donau-Ries" },
  { name: "Monheim", slug: "monheim-schwaben", region: "Schwaben", district: "Donau-Ries" },
  { name: "Rain", slug: "rain", region: "Schwaben", district: "Donau-Ries" },
  { name: "Kaisheim", slug: "kaisheim", region: "Schwaben", district: "Donau-Ries" },
  { name: "Mertingen", slug: "mertingen", region: "Schwaben", district: "Donau-Ries" },
  { name: "Asbach-Bäumenheim", slug: "asbach-baeumenheim", region: "Schwaben", district: "Donau-Ries" },

  // ============================================
  // ADDITIONAL OBERPFALZ CITIES
  // ============================================
  { name: "Amberg", slug: "amberg", region: "Oberpfalz", district: "Amberg", population: 42000 },
  { name: "Sulzbach-Rosenberg", slug: "sulzbach-rosenberg", region: "Oberpfalz", district: "Amberg-Sulzbach" },
  { name: "Schwandorf", slug: "schwandorf", region: "Oberpfalz", district: "Schwandorf", population: 28000 },
  { name: "Burglengenfeld", slug: "burglengenfeld", region: "Oberpfalz", district: "Schwandorf" },
  { name: "Maxhütte-Haidhof", slug: "maxhuette-haidhof", region: "Oberpfalz", district: "Schwandorf" },
  { name: "Teublitz", slug: "teublitz", region: "Oberpfalz", district: "Schwandorf" },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get city by slug
export function getCityBySlug(slug: string): City | undefined {
  return allCities.find(city => city.slug === slug);
}

// Get all city slugs for static paths
export function getAllCitySlugs(): string[] {
  return allCities.map(city => city.slug);
}

// Get cities by region
export function getCitiesByRegion(region: string): City[] {
  return allCities.filter(city => city.region === region);
}

// Get cities by district
export function getCitiesByDistrict(district: string): City[] {
  return allCities.filter(city => city.district === district);
}

// Get nearby cities - improved to show cities from same district first, then same region
export function getNearbyCities(citySlug: string, limit = 6): City[] {
  const city = getCityBySlug(citySlug);
  if (!city) return [];

  // First get cities from same district
  const sameDistrict = allCities.filter(c =>
    c.slug !== citySlug &&
    c.district === city.district
  );

  // Then get cities from same region
  const sameRegion = allCities.filter(c =>
    c.slug !== citySlug &&
    c.region === city.region &&
    c.district !== city.district
  );

  // Combine and limit
  return [...sameDistrict, ...sameRegion].slice(0, limit);
}

// Get all regions
export function getAllRegions(): string[] {
  const regions = new Set(allCities.map(city => city.region));
  return Array.from(regions);
}

// Get all districts
export function getAllDistricts(): { region: string; district: string }[] {
  const districts = new Map<string, string>();
  allCities.forEach(city => {
    if (city.district && !districts.has(city.district)) {
      districts.set(city.district, city.region);
    }
  });
  return Array.from(districts.entries()).map(([district, region]) => ({ district, region }));
}

// Get major cities for a region
export function getMajorCitiesForRegion(region: string): City[] {
  return majorCities.filter(city => city.region === region);
}

// Total pages calculation
export function getTotalPagesCount(servicesCount: number): number {
  // City pages + (Cities × Services)
  return allCities.length + (allCities.length * servicesCount);
}

// Group cities by region for navigation
export const cityRegions = [
  {
    name: 'Mittelfranken',
    description: 'Nürnberg und Umgebung',
    cities: allCities.filter(c => c.region === 'Mittelfranken')
  },
  {
    name: 'Oberfranken',
    description: 'Bamberg, Bayreuth und Umgebung',
    cities: allCities.filter(c => c.region === 'Oberfranken')
  },
  {
    name: 'Unterfranken',
    description: 'Würzburg und Umgebung',
    cities: allCities.filter(c => c.region === 'Unterfranken')
  },
  {
    name: 'Oberpfalz',
    description: 'Neumarkt, Amberg und Umgebung',
    cities: allCities.filter(c => c.region === 'Oberpfalz')
  },
  {
    name: 'Oberbayern',
    description: 'Ingolstadt und Eichstätt',
    cities: allCities.filter(c => c.region === 'Oberbayern')
  },
  {
    name: 'Schwaben',
    description: 'Donau-Ries Region',
    cities: allCities.filter(c => c.region === 'Schwaben')
  },
];
