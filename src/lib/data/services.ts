// Services Data for RD Bau

export interface Service {
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  isMainService?: boolean;
  features?: string[];
  benefits?: string[];
}

// Main Services
export const mainServices: Service[] = [
  {
    name: "Kernsanierung & Komplettsanierung",
    slug: "kernsanierung",
    shortDescription: "Umfassende Sanierung von Häusern und Wohnungen mit höchster Qualität und strukturierter Projektabwicklung.",
    longDescription: "Bei einer Kernsanierung werden alle wesentlichen Bauteile einer Immobilie grundlegend erneuert. Von der Elektrik über die Heizung bis hin zu Wänden, Böden und Bädern – wir koordinieren sämtliche Gewerke und liefern ein schlüsselfertiges Ergebnis. Unsere strukturierte Arbeitsweise garantiert Termintreue und transparente Kommunikation während des gesamten Projekts.",
    icon: "building",
    isMainService: true,
    features: [
      "Komplette Entkernung und Neuaufbau",
      "Erneuerung aller technischen Installationen",
      "Hochwertige Materialien und Ausführung",
      "Koordination aller Gewerke",
      "Schlüsselfertige Übergabe"
    ],
    benefits: [
      "Signifikante Wertsteigerung der Immobilie",
      "Moderne Wohnqualität",
      "Energieeffizienz",
      "Ein Ansprechpartner für alles"
    ]
  },
  {
    name: "Badsanierung & Innenausbau",
    slug: "badsanierung",
    shortDescription: "Hochwertige Badsanierung und professioneller Innenausbau für anspruchsvolle Wohnräume.",
    longDescription: "Ein neues Bad verändert die gesamte Wohnqualität. Wir planen und realisieren Badsanierungen von der ersten Idee bis zur fertigen Wellness-Oase. Darüber hinaus bieten wir umfassenden Innenausbau: Trockenbau, Malerarbeiten, Bodenverlegung und mehr – alles aus einer Hand mit kompromissloser Qualität.",
    icon: "droplet",
    isMainService: true,
    features: [
      "Komplette Badneugestaltung",
      "Hochwertige Fliesen- und Sanitärarbeiten",
      "Trockenbau und Raumgestaltung",
      "Professionelle Malerarbeiten",
      "Premium Bodenbeläge"
    ],
    benefits: [
      "Erhöhter Wohnkomfort",
      "Wertsteigerung",
      "Individuelle Gestaltung",
      "Langlebige Materialien"
    ]
  },
  {
    name: "Modernisierung",
    slug: "modernisierung",
    shortDescription: "Gezielte Modernisierung von Häusern und Wohnungen zur Wertsteigerung und Optimierung.",
    longDescription: "Nicht jede Immobilie braucht eine Komplettsanierung. Oft reichen gezielte Modernisierungsmaßnahmen, um den Wert zu steigern und die Wohnqualität zu verbessern. Wir analysieren Ihre Immobilie und empfehlen die sinnvollsten Maßnahmen – von der energetischen Sanierung bis zur optischen Aufwertung.",
    icon: "home",
    isMainService: true,
    features: [
      "Bestandsanalyse und Beratung",
      "Energetische Modernisierung",
      "Optische Aufwertung",
      "Teilsanierungen nach Bedarf",
      "Wertsteigernde Maßnahmen"
    ],
    benefits: [
      "Optimales Kosten-Nutzen-Verhältnis",
      "Wertsteigerung",
      "Gezielte Verbesserungen",
      "Schnellere Umsetzung"
    ]
  }
];

// All Services (including sub-services)
export const allServices: Service[] = [
  ...mainServices,
  {
    name: "Trockenbau",
    slug: "trockenbau",
    shortDescription: "Professioneller Trockenbau für flexible Raumgestaltung, Deckenverkleidungen und Dämmung.",
    longDescription: "Trockenbau ermöglicht schnelle und saubere Raumveränderungen ohne aufwendige Maurerarbeiten. Ob neue Raumaufteilung, abgehängte Decken, Dämmung oder Schallschutz – wir setzen Ihre Vorstellungen präzise um.",
    icon: "layers",
    features: ["Raumtrennung", "Abgehängte Decken", "Dämmung", "Schallschutz", "Brandschutz"]
  },
  {
    name: "Malerarbeiten",
    slug: "malerarbeiten",
    shortDescription: "Hochwertige Malerarbeiten für Innenräume mit Premium-Materialien und Präzision.",
    longDescription: "Professionelle Malerarbeiten veredeln jeden Raum. Wir arbeiten mit hochwertigen Farben und Materialien und achten auf perfekte Ausführung bis ins letzte Detail.",
    icon: "paintbrush",
    features: ["Wandgestaltung", "Lackierarbeiten", "Tapezierarbeiten", "Fassadenarbeiten", "Kreative Techniken"]
  },
  {
    name: "Bodenverlegung",
    slug: "bodenverlegung",
    shortDescription: "Professionelle Verlegung von Parkett, Vinyl, Laminat und Fliesen.",
    longDescription: "Der richtige Boden prägt den Charakter eines Raumes. Wir verlegen alle gängigen Bodenbeläge fachgerecht und beraten Sie bei der Auswahl des optimalen Materials für Ihre Anforderungen.",
    icon: "grid",
    features: ["Parkett", "Vinyl", "Laminat", "Fliesen", "Naturstein"]
  },
  {
    name: "Fliesenarbeiten",
    slug: "fliesenarbeiten",
    shortDescription: "Präzise Fliesenverlegung für Bäder, Küchen und Wohnbereiche.",
    longDescription: "Fliesen sind langlebig, pflegeleicht und ästhetisch vielseitig. Unsere Fliesenleger arbeiten mit höchster Präzision für perfekte Fugen und dauerhafte Ergebnisse.",
    icon: "square",
    features: ["Wandfliesen", "Bodenfliesen", "Großformate", "Mosaik", "Naturstein"]
  },
  {
    name: "Türen & Fenster",
    slug: "tueren-fenster",
    shortDescription: "Einbau und Austausch von Türen und Fenstern für Energieeffizienz und Ästhetik.",
    longDescription: "Moderne Türen und Fenster verbessern Energieeffizienz, Schallschutz und Sicherheit. Wir beraten, liefern und montieren hochwertige Elemente von führenden Herstellern.",
    icon: "door",
    features: ["Innentüren", "Haustüren", "Fenster", "Rollläden", "Fensterbänke"]
  },
  {
    name: "Teilsanierung",
    slug: "teilsanierung",
    shortDescription: "Gezielte Sanierung einzelner Räume oder Bereiche ohne Komplettmaßnahme.",
    longDescription: "Manchmal reicht die Sanierung einzelner Bereiche. Wir führen auch Teilsanierungen durch – professionell, sauber und mit der gleichen Qualität wie bei Großprojekten.",
    icon: "scissors",
    features: ["Einzelne Räume", "Küchensanierung", "Kellersanierung", "Dachgeschossausbau", "Balkonsanierung"]
  },
  {
    name: "Wohnungsrenovierung",
    slug: "wohnungsrenovierung",
    shortDescription: "Komplette Renovierung von Mietwohnungen und Eigentumswohnungen.",
    longDescription: "Ob für Eigennutzung oder Vermietung – wir renovieren Wohnungen effizient und hochwertig. Von der schnellen Auffrischung bis zur umfassenden Modernisierung.",
    icon: "building-2",
    features: ["Mietwohnungen", "Eigentumswohnungen", "Übergaberenovierung", "Modernisierung", "Aufwertung"]
  },
  {
    name: "Haussanierung",
    slug: "haussanierung",
    shortDescription: "Umfassende Sanierung von Ein- und Mehrfamilienhäusern.",
    longDescription: "Die Sanierung eines ganzen Hauses erfordert umfassende Planung und koordinierte Ausführung. Wir übernehmen die Projektleitung und garantieren reibungslose Abläufe.",
    icon: "house",
    features: ["Einfamilienhäuser", "Mehrfamilienhäuser", "Altbauten", "Denkmalschutz", "Energetische Sanierung"]
  },
  {
    name: "Elektroinstallation",
    slug: "elektroinstallation",
    shortDescription: "Moderne Elektroinstallationen für Sicherheit und Komfort.",
    longDescription: "Eine moderne Elektroinstallation ist die Basis für Sicherheit und Komfort. Wir erneuern oder erweitern bestehende Installationen nach aktuellen Standards.",
    icon: "zap",
    features: ["Kompletterneuerung", "Erweiterung", "Smart Home", "Beleuchtung", "Sicherheitstechnik"]
  },
  {
    name: "Sanitärinstallation",
    slug: "sanitaerinstallation",
    shortDescription: "Professionelle Sanitärinstallationen für Bäder und Küchen.",
    longDescription: "Von der Wasserzuleitung bis zum Abfluss – wir installieren und erneuern Sanitäranlagen fachgerecht und mit Blick auf Langlebigkeit.",
    icon: "droplets",
    features: ["Wasserleitungen", "Abwasser", "Armaturen", "Sanitärobjekte", "Warmwasser"]
  },
  {
    name: "Heizungsmodernisierung",
    slug: "heizungsmodernisierung",
    shortDescription: "Modernisierung von Heizungsanlagen für Effizienz und Komfort.",
    longDescription: "Eine moderne Heizung senkt Kosten und steigert den Komfort. Wir beraten zu effizienten Lösungen und koordinieren die Umsetzung.",
    icon: "flame",
    features: ["Heizungserneuerung", "Fußbodenheizung", "Thermostate", "Wärmepumpe", "Energieoptimierung"]
  },
  {
    name: "Gasinstallation",
    slug: "gasinstallation",
    shortDescription: "Professionelle Gasinstallationen und Wartung für sichere Energieversorgung.",
    longDescription: "Gasinstallationen erfordern höchste Fachkompetenz und Sicherheitsstandards. Wir installieren, warten und modernisieren Gasleitungen und -geräte nach allen geltenden Vorschriften. Von der Gastherme bis zur kompletten Neuinstallation – Ihre Sicherheit steht bei uns an erster Stelle.",
    icon: "gas",
    features: ["Gasleitungen", "Gasthermen", "Sicherheitsprüfung", "Wartung", "Neuinstallation"]
  }
];

// SEO-optimized service variations for dynamic pages
export const seoServiceVariations: string[] = [
  "sanierung",
  "kernsanierung",
  "komplettsanierung",
  "modernisierung",
  "badsanierung",
  "badezimmersanierung",
  "innenausbau",
  "wohnungsrenovierung",
  "haussanierung",
  "altbausanierung",
  "trockenbau",
  "malerarbeiten",
  "bodenverlegung",
  "fliesenarbeiten",
  "tueren-fenster",
  "teilsanierung",
  "kuechensanierung",
  "kellersanierung",
  "dachgeschossausbau",
  "elektroinstallation",
  "sanitaerinstallation",
  "heizungsmodernisierung",
  "gasinstallation",
  "energetische-sanierung",
  "barrierefreie-sanierung",
  "luxussanierung",
  "renovierung",
  "umbau",
  "ausbau",
  "sanierungsfirma",
  "handwerker",
  "baufirma",
  "generalunternehmer"
];

// Get service by slug
export function getServiceBySlug(slug: string): Service | undefined {
  return allServices.find(service => service.slug === slug);
}

// Get all service slugs
export function getAllServiceSlugs(): string[] {
  return allServices.map(service => service.slug);
}

// Get main services only
export function getMainServices(): Service[] {
  return mainServices;
}
