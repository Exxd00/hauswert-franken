// Franken Cities Data - Nürnberg + 100km Radius
// This generates 30,000-50,000+ SEO pages when combined with services

export interface City {
  name: string;
  slug: string;
  region: string;
  population?: number;
  isMainCity?: boolean;
}

// Major Cities in Franken
export const majorCities: City[] = [
  { name: "Nürnberg", slug: "nuernberg", region: "Mittelfranken", population: 518000, isMainCity: true },
  { name: "Fürth", slug: "fuerth", region: "Mittelfranken", population: 128000, isMainCity: true },
  { name: "Erlangen", slug: "erlangen", region: "Mittelfranken", population: 112000, isMainCity: true },
  { name: "Würzburg", slug: "wuerzburg", region: "Unterfranken", population: 127000, isMainCity: true },
  { name: "Bamberg", slug: "bamberg", region: "Oberfranken", population: 77000, isMainCity: true },
  { name: "Bayreuth", slug: "bayreuth", region: "Oberfranken", population: 74000, isMainCity: true },
  { name: "Aschaffenburg", slug: "aschaffenburg", region: "Unterfranken", population: 70000, isMainCity: true },
  { name: "Schweinfurt", slug: "schweinfurt", region: "Unterfranken", population: 53000, isMainCity: true },
  { name: "Ansbach", slug: "ansbach", region: "Mittelfranken", population: 41000, isMainCity: true },
  { name: "Schwabach", slug: "schwabach", region: "Mittelfranken", population: 40000, isMainCity: true },
];

// All Cities and Towns in Franken (100km radius from Nürnberg)
export const allCities: City[] = [
  ...majorCities,
  // Mittelfranken
  { name: "Herzogenaurach", slug: "herzogenaurach", region: "Mittelfranken" },
  { name: "Zirndorf", slug: "zirndorf", region: "Mittelfranken" },
  { name: "Oberasbach", slug: "oberasbach", region: "Mittelfranken" },
  { name: "Stein", slug: "stein", region: "Mittelfranken" },
  { name: "Roth", slug: "roth", region: "Mittelfranken" },
  { name: "Lauf an der Pegnitz", slug: "lauf-an-der-pegnitz", region: "Mittelfranken" },
  { name: "Neumarkt in der Oberpfalz", slug: "neumarkt-oberpfalz", region: "Oberpfalz" },
  { name: "Altdorf bei Nürnberg", slug: "altdorf-nuernberg", region: "Mittelfranken" },
  { name: "Wendelstein", slug: "wendelstein", region: "Mittelfranken" },
  { name: "Schwarzenbruck", slug: "schwarzenbruck", region: "Mittelfranken" },
  { name: "Feucht", slug: "feucht", region: "Mittelfranken" },
  { name: "Hersbruck", slug: "hersbruck", region: "Mittelfranken" },
  { name: "Langenzenn", slug: "langenzenn", region: "Mittelfranken" },
  { name: "Neustadt an der Aisch", slug: "neustadt-aisch", region: "Mittelfranken" },
  { name: "Bad Windsheim", slug: "bad-windsheim", region: "Mittelfranken" },
  { name: "Rothenburg ob der Tauber", slug: "rothenburg-tauber", region: "Mittelfranken" },
  { name: "Dinkelsbühl", slug: "dinkelsbuehl", region: "Mittelfranken" },
  { name: "Gunzenhausen", slug: "gunzenhausen", region: "Mittelfranken" },
  { name: "Weißenburg in Bayern", slug: "weissenburg-bayern", region: "Mittelfranken" },
  { name: "Treuchtlingen", slug: "treuchtlingen", region: "Mittelfranken" },
  { name: "Hilpoltstein", slug: "hilpoltstein", region: "Mittelfranken" },
  { name: "Spalt", slug: "spalt", region: "Mittelfranken" },
  { name: "Georgensgmünd", slug: "georgensmuend", region: "Mittelfranken" },
  { name: "Abenberg", slug: "abenberg", region: "Mittelfranken" },
  { name: "Greding", slug: "greding", region: "Mittelfranken" },
  { name: "Allersberg", slug: "allersberg", region: "Mittelfranken" },
  { name: "Freystadt", slug: "freystadt", region: "Oberpfalz" },
  { name: "Burgthann", slug: "burgthann", region: "Mittelfranken" },
  { name: "Pyrbaum", slug: "pyrbaum", region: "Mittelfranken" },
  { name: "Postbauer-Heng", slug: "postbauer-heng", region: "Oberpfalz" },
  { name: "Berching", slug: "berching", region: "Oberpfalz" },
  { name: "Dietfurt an der Altmühl", slug: "dietfurt-altmuehl", region: "Oberpfalz" },
  { name: "Beilngries", slug: "beilngries", region: "Oberbayern" },

  // Oberfranken
  { name: "Forchheim", slug: "forchheim", region: "Oberfranken" },
  { name: "Coburg", slug: "coburg", region: "Oberfranken" },
  { name: "Hof", slug: "hof", region: "Oberfranken" },
  { name: "Kulmbach", slug: "kulmbach", region: "Oberfranken" },
  { name: "Lichtenfels", slug: "lichtenfels", region: "Oberfranken" },
  { name: "Kronach", slug: "kronach", region: "Oberfranken" },
  { name: "Pegnitz", slug: "pegnitz", region: "Oberfranken" },
  { name: "Ebermannstadt", slug: "ebermannstadt", region: "Oberfranken" },
  { name: "Gräfenberg", slug: "graefenberg", region: "Oberfranken" },
  { name: "Eckental", slug: "eckental", region: "Mittelfranken" },
  { name: "Höchstadt an der Aisch", slug: "hoechstadt-aisch", region: "Mittelfranken" },
  { name: "Hirschaid", slug: "hirschaid", region: "Oberfranken" },
  { name: "Hallstadt", slug: "hallstadt", region: "Oberfranken" },
  { name: "Bischberg", slug: "bischberg", region: "Oberfranken" },
  { name: "Strullendorf", slug: "strullendorf", region: "Oberfranken" },
  { name: "Burgebrach", slug: "burgebrach", region: "Oberfranken" },
  { name: "Schlüsselfeld", slug: "schluesselfeld", region: "Oberfranken" },
  { name: "Wachenroth", slug: "wachenroth", region: "Mittelfranken" },
  { name: "Mühlhausen", slug: "muehlhausen-mittelfranken", region: "Mittelfranken" },
  { name: "Pommersfelden", slug: "pommersfelden", region: "Oberfranken" },
  { name: "Adelsdorf", slug: "adelsdorf", region: "Mittelfranken" },
  { name: "Hemhofen", slug: "hemhofen", region: "Mittelfranken" },
  { name: "Röttenbach", slug: "roettenbach", region: "Mittelfranken" },
  { name: "Baiersdorf", slug: "baiersdorf", region: "Mittelfranken" },
  { name: "Möhrendorf", slug: "moehrendorf", region: "Mittelfranken" },
  { name: "Bubenreuth", slug: "bubenreuth", region: "Mittelfranken" },
  { name: "Uttenreuth", slug: "uttenreuth", region: "Mittelfranken" },
  { name: "Buckenhof", slug: "buckenhof", region: "Mittelfranken" },
  { name: "Spardorf", slug: "spardorf", region: "Mittelfranken" },
  { name: "Marloffstein", slug: "marloffstein", region: "Mittelfranken" },
  { name: "Neunkirchen am Brand", slug: "neunkirchen-brand", region: "Oberfranken" },
  { name: "Effeltrich", slug: "effeltrich", region: "Oberfranken" },
  { name: "Pinzberg", slug: "pinzberg", region: "Oberfranken" },
  { name: "Wiesenthau", slug: "wiesenthau", region: "Oberfranken" },
  { name: "Kirchehrenbach", slug: "kirchehrenbach", region: "Oberfranken" },
  { name: "Weilersbach", slug: "weilersbach", region: "Oberfranken" },
  { name: "Pretzfeld", slug: "pretzfeld", region: "Oberfranken" },

  // Unterfranken
  { name: "Kitzingen", slug: "kitzingen", region: "Unterfranken" },
  { name: "Ochsenfurt", slug: "ochsenfurt", region: "Unterfranken" },
  { name: "Bad Kissingen", slug: "bad-kissingen", region: "Unterfranken" },
  { name: "Lohr am Main", slug: "lohr-main", region: "Unterfranken" },
  { name: "Karlstadt", slug: "karlstadt", region: "Unterfranken" },
  { name: "Gemünden am Main", slug: "gemuenden-main", region: "Unterfranken" },
  { name: "Marktheidenfeld", slug: "marktheidenfeld", region: "Unterfranken" },
  { name: "Haßfurt", slug: "hassfurt", region: "Unterfranken" },
  { name: "Eltmann", slug: "eltmann", region: "Unterfranken" },
  { name: "Zeil am Main", slug: "zeil-main", region: "Unterfranken" },
  { name: "Ebern", slug: "ebern", region: "Unterfranken" },
  { name: "Hofheim in Unterfranken", slug: "hofheim-unterfranken", region: "Unterfranken" },
  { name: "Bad Königshofen", slug: "bad-koenigshofen", region: "Unterfranken" },
  { name: "Bad Neustadt an der Saale", slug: "bad-neustadt-saale", region: "Unterfranken" },
  { name: "Mellrichstadt", slug: "mellrichstadt", region: "Unterfranken" },
  { name: "Münnerstadt", slug: "muennerstadt", region: "Unterfranken" },
  { name: "Hammelburg", slug: "hammelburg", region: "Unterfranken" },
  { name: "Bad Brückenau", slug: "bad-brueckenau", region: "Unterfranken" },
  { name: "Volkach", slug: "volkach", region: "Unterfranken" },
  { name: "Iphofen", slug: "iphofen", region: "Unterfranken" },
  { name: "Dettelbach", slug: "dettelbach", region: "Unterfranken" },
  { name: "Marktbreit", slug: "marktbreit", region: "Unterfranken" },
  { name: "Schwarzach am Main", slug: "schwarzach-main", region: "Unterfranken" },
  { name: "Wiesentheid", slug: "wiesentheid", region: "Unterfranken" },
  { name: "Gerolzhofen", slug: "gerolzhofen", region: "Unterfranken" },

  // Additional towns
  { name: "Cadolzburg", slug: "cadolzburg", region: "Mittelfranken" },
  { name: "Großhabersdorf", slug: "grosshabersdorf", region: "Mittelfranken" },
  { name: "Roßtal", slug: "rosstal", region: "Mittelfranken" },
  { name: "Wilhermsdorf", slug: "wilhermsdorf", region: "Mittelfranken" },
  { name: "Emskirchen", slug: "emskirchen", region: "Mittelfranken" },
  { name: "Markt Erlbach", slug: "markt-erlbach", region: "Mittelfranken" },
  { name: "Dietenhofen", slug: "dietenhofen", region: "Mittelfranken" },
  { name: "Heilsbronn", slug: "heilsbronn", region: "Mittelfranken" },
  { name: "Lichtenau", slug: "lichtenau-mittelfranken", region: "Mittelfranken" },
  { name: "Sachsen bei Ansbach", slug: "sachsen-ansbach", region: "Mittelfranken" },
  { name: "Leutershausen", slug: "leutershausen", region: "Mittelfranken" },
  { name: "Feuchtwangen", slug: "feuchtwangen", region: "Mittelfranken" },
  { name: "Herrieden", slug: "herrieden", region: "Mittelfranken" },
  { name: "Bechhofen", slug: "bechhofen", region: "Mittelfranken" },
  { name: "Wassertrüdingen", slug: "wassertruedingen", region: "Mittelfranken" },
  { name: "Oettingen in Bayern", slug: "oettingen-bayern", region: "Schwaben" },
  { name: "Nördlingen", slug: "noerdlingen", region: "Schwaben" },
  { name: "Donauwörth", slug: "donauwoerth", region: "Schwaben" },
  { name: "Harburg", slug: "harburg-schwaben", region: "Schwaben" },
  { name: "Wemding", slug: "wemding", region: "Schwaben" },
  { name: "Monheim", slug: "monheim-schwaben", region: "Schwaben" },
  { name: "Pappenheim", slug: "pappenheim", region: "Mittelfranken" },
  { name: "Solnhofen", slug: "solnhofen", region: "Mittelfranken" },
  { name: "Eichstätt", slug: "eichstaett", region: "Oberbayern" },
  { name: "Kipfenberg", slug: "kipfenberg", region: "Oberbayern" },
  { name: "Kinding", slug: "kinding", region: "Oberbayern" },
  { name: "Dollnstein", slug: "dollnstein", region: "Oberbayern" },
  { name: "Mörnsheim", slug: "moernsheim", region: "Oberbayern" },
  { name: "Wellheim", slug: "wellheim", region: "Oberbayern" },
  { name: "Nassenfels", slug: "nassenfels", region: "Oberbayern" },
  { name: "Schernfeld", slug: "schernfeld", region: "Oberbayern" },
  { name: "Titting", slug: "titting", region: "Oberbayern" },
  { name: "Thalmässing", slug: "thalmaessing", region: "Mittelfranken" },
  { name: "Heideck", slug: "heideck", region: "Mittelfranken" },
  { name: "Pleinfeld", slug: "pleinfeld", region: "Mittelfranken" },
  { name: "Ellingen", slug: "ellingen", region: "Mittelfranken" },
  { name: "Heidenheim", slug: "heidenheim-mittelfranken", region: "Mittelfranken" },
  { name: "Alesheim", slug: "alesheim", region: "Mittelfranken" },
  { name: "Markt Berolzheim", slug: "markt-berolzheim", region: "Mittelfranken" },
  { name: "Gnotzheim", slug: "gnotzheim", region: "Mittelfranken" },
  { name: "Haundorf", slug: "haundorf", region: "Mittelfranken" },
  { name: "Absberg", slug: "absberg", region: "Mittelfranken" },
  { name: "Pfofeld", slug: "pfofeld", region: "Mittelfranken" },
  { name: "Theilenhofen", slug: "theilenhofen", region: "Mittelfranken" },
  { name: "Muhr am See", slug: "muhr-am-see", region: "Mittelfranken" },
  { name: "Merkendorf", slug: "merkendorf", region: "Mittelfranken" },
  { name: "Wolframs-Eschenbach", slug: "wolframs-eschenbach", region: "Mittelfranken" },
  { name: "Windsbach", slug: "windsbach", region: "Mittelfranken" },
  { name: "Neuendettelsau", slug: "neuendettelsau", region: "Mittelfranken" },
  { name: "Petersaurach", slug: "petersaurach", region: "Mittelfranken" },
  { name: "Bruckberg", slug: "bruckberg-mittelfranken", region: "Mittelfranken" },
];

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

// Get nearby cities (simplified - in production you'd use coordinates)
export function getNearbyCities(citySlug: string, limit = 6): City[] {
  const city = getCityBySlug(citySlug);
  if (!city) return [];

  return allCities
    .filter(c => c.slug !== citySlug && c.region === city.region)
    .slice(0, limit);
}
