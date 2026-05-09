// Services Data for RD Frankenbau - Comprehensive pSEO System

export interface ServiceProcess {
  step: number;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  detailedDescription: string;
  icon: string;
  isMainService?: boolean;
  features: string[];
  benefits: string[];
  process: ServiceProcess[];
  faqs: ServiceFAQ[];
  materials?: string[];
  duration?: string;
  priceRange?: string;
  keywords: string[];
}

// Main Services with Full SEO Content
export const mainServices: Service[] = [
  {
    name: "Kernsanierung & Komplettsanierung",
    slug: "kernsanierung",
    shortDescription: "Umfassende Sanierung von Häusern und Wohnungen mit höchster Qualität und strukturierter Projektabwicklung.",
    longDescription: "Bei einer Kernsanierung werden alle wesentlichen Bauteile einer Immobilie grundlegend erneuert. Von der Elektrik über die Heizung bis hin zu Wänden, Böden und Bädern – wir koordinieren sämtliche Gewerke und liefern ein schlüsselfertiges Ergebnis.",
    detailedDescription: `Eine Kernsanierung ist die umfassendste Form der Gebäudesanierung. Dabei wird die Immobilie bis auf die Grundsubstanz zurückgebaut und anschließend komplett neu aufgebaut. Diese Methode eignet sich besonders für ältere Gebäude, bei denen einzelne Reparaturen nicht mehr wirtschaftlich sind, oder wenn Sie Ihre Immobilie auf den neuesten Stand der Technik bringen möchten.

Bei RD Frankenbau verstehen wir die Kernsanierung als Chance, Ihre Immobilie in ein modernes, energieeffizientes und wertstabiles Objekt zu verwandeln. Unser erfahrenes Team koordiniert alle Gewerke – von der Elektroinstallation über Sanitär und Heizung bis hin zu Trockenbau, Bodenbelägen und Malerarbeiten.

Der Ablauf einer Kernsanierung beginnt mit einer detaillierten Bestandsaufnahme und Planung. Wir analysieren die vorhandene Bausubstanz, identifizieren Schwachstellen und entwickeln ein maßgeschneidertes Sanierungskonzept. Nach der Entkernung erfolgt der systematische Neuaufbau unter Berücksichtigung aktueller Bauvorschriften und Energiestandards.

Unsere Kernsanierungen zeichnen sich durch Termintreue, transparente Kommunikation und höchste Qualitätsstandards aus. Als Generalunternehmer übernehmen wir die komplette Projektverantwortung – Sie haben einen einzigen Ansprechpartner für Ihr gesamtes Projekt.`,
    icon: "building",
    isMainService: true,
    features: [
      "Komplette Entkernung und Neuaufbau",
      "Erneuerung aller technischen Installationen (Elektro, Sanitär, Heizung)",
      "Neue Fenster und Türen nach aktuellen Energiestandards",
      "Hochwertige Bodenbeläge und Wandgestaltung",
      "Moderne Bäder und Küchen",
      "Koordination aller Gewerke als Generalunternehmer",
      "Schlüsselfertige Übergabe",
      "Dokumentation aller Arbeiten"
    ],
    benefits: [
      "Signifikante Wertsteigerung Ihrer Immobilie (durchschnittlich 25-40%)",
      "Moderne Wohnqualität auf Neubauniveau",
      "Deutlich verbesserte Energieeffizienz und niedrigere Betriebskosten",
      "Ein Ansprechpartner für das gesamte Projekt",
      "Rechtssicherheit durch Einhaltung aller Bauvorschriften",
      "Garantie auf alle Arbeiten",
      "Transparente Festpreisangebote ohne versteckte Kosten"
    ],
    process: [
      { step: 1, title: "Kostenlose Erstberatung", description: "Wir besichtigen Ihre Immobilie, analysieren den Bestand und besprechen Ihre Wünsche und Möglichkeiten." },
      { step: 2, title: "Detaillierte Planung", description: "Erstellung eines umfassenden Sanierungskonzepts mit Zeitplan und transparenter Kostenkalkulation." },
      { step: 3, title: "Entkernung", description: "Fachgerechter Rückbau aller nicht tragenden Elemente, Entsorgung und Vorbereitung für den Neuaufbau." },
      { step: 4, title: "Rohinstallation", description: "Verlegung neuer Elektro-, Sanitär- und Heizungsleitungen nach aktuellen Standards." },
      { step: 5, title: "Trockenbau & Innenausbau", description: "Aufbau von Wänden, Decken, Dämmung und erste Oberflächenvorbereitungen." },
      { step: 6, title: "Oberflächenarbeiten", description: "Fliesen, Bodenbeläge, Malerarbeiten und Montage von Sanitärobjekten." },
      { step: 7, title: "Fertigstellung & Übergabe", description: "Finale Kontrolle, Dokumentation und schlüsselfertige Übergabe Ihrer sanierten Immobilie." }
    ],
    faqs: [
      { question: "Wie lange dauert eine Kernsanierung?", answer: "Die Dauer hängt von der Größe und dem Umfang ab. Eine typische Wohnungssanierung (60-100m²) dauert 6-10 Wochen, ein Einfamilienhaus 3-6 Monate." },
      { question: "Kann ich während der Sanierung in der Immobilie wohnen?", answer: "Bei einer Kernsanierung ist dies in der Regel nicht möglich, da alle Räume betroffen sind. Wir beraten Sie gerne zu Übergangs­lösungen." },
      { question: "Wie hoch sind die Kosten einer Kernsanierung?", answer: "Die Kosten variieren je nach Zustand und gewünschtem Standard. Rechnen Sie mit 800-1.500€ pro m² für eine hochwertige Kernsanierung." },
      { question: "Übernehmen Sie auch die Bauleitung?", answer: "Ja, als Generalunternehmer übernehmen wir die komplette Projektleitung und koordinieren alle Gewerke für Sie." },
      { question: "Gibt es Fördermöglichkeiten?", answer: "Ja, für energetische Sanierungsmaßnahmen gibt es verschiedene KfW-Programme und steuerliche Vorteile. Wir beraten Sie dazu." }
    ],
    materials: ["Markenfliesen", "Premium-Sanitärkeramik", "Energiesparfenster", "Hochwertige Elektrokomponenten", "Qualitätsfarben"],
    duration: "6-24 Wochen je nach Umfang",
    priceRange: "800 - 1.500 €/m²",
    keywords: ["kernsanierung", "komplettsanierung", "altbausanierung", "gebäudesanierung", "vollsanierung", "sanierung altbau", "haus sanieren", "wohnung sanieren"]
  },
  {
    name: "Badsanierung & Innenausbau",
    slug: "badsanierung",
    shortDescription: "Hochwertige Badsanierung und professioneller Innenausbau für anspruchsvolle Wohnräume.",
    longDescription: "Ein neues Bad verändert die gesamte Wohnqualität. Wir planen und realisieren Badsanierungen von der ersten Idee bis zur fertigen Wellness-Oase.",
    detailedDescription: `Das Badezimmer ist längst mehr als ein reiner Funktionsraum – es ist ein Ort der Entspannung und des Wohlbefindens. Eine professionelle Badsanierung steigert nicht nur den Wohnkomfort erheblich, sondern auch den Wert Ihrer Immobilie.

Bei RD Frankenbau gestalten wir Ihr neues Bad von der ersten Idee bis zur letzten Fuge. Unsere erfahrenen Handwerker arbeiten mit hochwertigen Materialien namhafter Hersteller und legen größten Wert auf präzise Ausführung. Ob klassisch-elegant, modern-minimalistisch oder als luxuriöse Wellness-Oase – wir setzen Ihre Vorstellungen um.

Eine Badsanierung umfasst typischerweise den Rückbau alter Fliesen und Sanitärobjekte, die Erneuerung von Wasser- und Abwasserleitungen, neue Elektroinstallationen für Beleuchtung und Steckdosen, hochwertige Fliesenarbeiten an Wänden und Boden sowie die Montage moderner Sanitärkeramik.

Besonders wichtig ist uns die wasserdichte Ausführung aller Anschlüsse und Abdichtungen. Wir arbeiten nach den neuesten Richtlinien und verwenden nur geprüfte Materialien. So garantieren wir Ihnen ein Bad, das nicht nur schön aussieht, sondern auch langlebig und funktional ist.

Unser Innenausbau-Service geht über das Bad hinaus: Trockenbau für flexible Raumgestaltung, professionelle Malerarbeiten, hochwertige Bodenbeläge und stilvolle Türen komplettieren unser Angebot.`,
    icon: "droplet",
    isMainService: true,
    features: [
      "Komplette Badneugestaltung nach Ihren Wünschen",
      "Hochwertige Fliesen- und Natursteinarbeiten",
      "Professionelle Sanitärinstallation",
      "Moderne Beleuchtungskonzepte",
      "Bodengleiche Duschen und barrierefreie Lösungen",
      "Badmöbel und Spiegelschränke",
      "Trockenbau und Raumgestaltung",
      "Malerarbeiten in höchster Qualität"
    ],
    benefits: [
      "Deutlich erhöhter Wohnkomfort und Wohlbefinden",
      "Wertsteigerung Ihrer Immobilie um 5-15%",
      "Individuelle Gestaltung nach Ihren Vorstellungen",
      "Langlebige Materialien führender Hersteller",
      "Moderne Technik für Komfort und Energieeffizienz",
      "Barrierefreie Optionen für altersgerechtes Wohnen",
      "Festpreisgarantie und termingerechte Fertigstellung"
    ],
    process: [
      { step: 1, title: "Beratung & Planung", description: "Aufmaß, Bestandsaufnahme und gemeinsame Planung Ihres Traumbades mit 3D-Visualisierung." },
      { step: 2, title: "Materialauswahl", description: "Beratung bei der Auswahl von Fliesen, Sanitärobjekten, Armaturen und Accessoires." },
      { step: 3, title: "Demontage", description: "Fachgerechter Rückbau alter Fliesen, Sanitärobjekte und Installationen." },
      { step: 4, title: "Rohinstallation", description: "Verlegung neuer Wasser-, Abwasser- und Elektroleitungen nach aktuellen Standards." },
      { step: 5, title: "Abdichtung & Estrich", description: "Professionelle Abdichtung im Nassbereich und ggf. neuer Estrich." },
      { step: 6, title: "Fliesen & Oberflächen", description: "Präzise Fliesenverlegung an Wänden und Boden mit sauberen Fugen." },
      { step: 7, title: "Montage & Fertigstellung", description: "Installation aller Sanitärobjekte, Armaturen, Möbel und finale Reinigung." }
    ],
    faqs: [
      { question: "Wie lange dauert eine Badsanierung?", answer: "Eine komplette Badsanierung dauert typischerweise 2-4 Wochen, abhängig von Größe und Umfang der Arbeiten." },
      { question: "Können Sie auch nur Teilbereiche sanieren?", answer: "Ja, wir führen auch Teilsanierungen durch, z.B. nur neue Fliesen, nur Sanitärobjekte oder nur die Dusche." },
      { question: "Was kostet eine Badsanierung?", answer: "Je nach Ausstattung und Größe rechnen Sie mit 8.000-25.000€ für ein komplettes Bad. Wir erstellen Ihnen ein detailliertes Angebot." },
      { question: "Bieten Sie barrierefreie Bäder an?", answer: "Ja, wir sind spezialisiert auf barrierefreie und altersgerechte Badgestaltung mit bodengleichen Duschen und entsprechenden Haltegriffen." },
      { question: "Welche Fliesen empfehlen Sie?", answer: "Wir beraten Sie individuell. Für Bäder empfehlen wir rutschfeste Bodenfliesen (R10 oder R11) und pflegeleichte Wandfliesen großer Formate." }
    ],
    materials: ["Villeroy & Boch", "Duravit", "Grohe", "Hansgrohe", "Geberit", "Agrob Buchtal Fliesen", "Kaldewei"],
    duration: "2-4 Wochen",
    priceRange: "8.000 - 25.000 €",
    keywords: ["badsanierung", "badezimmer sanieren", "bad renovieren", "neues bad", "badumbau", "wellness bad", "barrierefreies bad", "dusche erneuern"]
  },
  {
    name: "Modernisierung",
    slug: "modernisierung",
    shortDescription: "Gezielte Modernisierung von Häusern und Wohnungen zur Wertsteigerung und Optimierung.",
    longDescription: "Nicht jede Immobilie braucht eine Komplettsanierung. Oft reichen gezielte Modernisierungsmaßnahmen, um den Wert zu steigern und die Wohnqualität zu verbessern.",
    detailedDescription: `Eine Modernisierung ist der kluge Weg, Ihre Immobilie aufzuwerten, ohne eine komplette Sanierung durchführen zu müssen. Durch gezielte Maßnahmen steigern Sie den Wert und die Attraktivität Ihres Objekts – ob für die Eigennutzung, zur Vermietung oder für einen späteren Verkauf.

Bei RD Frankenbau analysieren wir zunächst den Ist-Zustand Ihrer Immobilie und identifizieren die Bereiche mit dem größten Optimierungspotential. Anschließend entwickeln wir gemeinsam mit Ihnen ein maßgeschneidertes Modernisierungskonzept, das Ihre Prioritäten und Ihr Budget berücksichtigt.

Typische Modernisierungsmaßnahmen umfassen die energetische Optimierung (neue Fenster, Dämmung, moderne Heizung), die Aufwertung von Bädern und Küchen, die Erneuerung von Bodenbelägen und Wandoberflächen sowie die Modernisierung der Elektroinstallation.

Besonders für Vermieter und Investoren ist eine strategische Modernisierung interessant: Sie steigert die Mieteinnahmen, erhöht den Immobilienwert und kann steuerlich geltend gemacht werden. Wir beraten Sie zu allen Aspekten und koordinieren die Umsetzung professionell.

Auch bei Teilmodernisierungen garantieren wir höchste Qualität und termingerechte Ausführung. Unser Ziel ist es, mit möglichst geringem Aufwand den größtmöglichen Nutzen für Ihre Immobilie zu erzielen.`,
    icon: "home",
    isMainService: true,
    features: [
      "Umfassende Bestandsanalyse und Beratung",
      "Energetische Modernisierung (Fenster, Dämmung, Heizung)",
      "Optische Aufwertung (Böden, Wände, Decken)",
      "Bad- und Küchenmodernisierung",
      "Elektro- und Sanitärmodernisierung",
      "Teilsanierungen nach Bedarf",
      "Wertsteigernde Maßnahmen mit Fokus auf ROI",
      "Mietwohnungsmodernisierung"
    ],
    benefits: [
      "Optimales Kosten-Nutzen-Verhältnis",
      "Gezielte Wertsteigerung Ihrer Immobilie",
      "Kürzere Projektlaufzeiten als bei Komplettsanierung",
      "Oft während des Bewohnens möglich",
      "Steuerliche Vorteile bei vermieteten Objekten",
      "Höhere Mieteinnahmen nach Modernisierung",
      "Bessere Energieeffizienz und niedrigere Nebenkosten"
    ],
    process: [
      { step: 1, title: "Bestandsaufnahme", description: "Analyse des Ist-Zustands und Identifikation von Modernisierungspotential." },
      { step: 2, title: "Prioritätenplanung", description: "Gemeinsame Festlegung der wichtigsten Maßnahmen unter Berücksichtigung von Budget und Zielen." },
      { step: 3, title: "Angebotserstellung", description: "Detailliertes Angebot mit klaren Leistungsbeschreibungen und Zeitplan." },
      { step: 4, title: "Koordinierte Umsetzung", description: "Effiziente Durchführung aller Maßnahmen mit minimaler Belastung." },
      { step: 5, title: "Qualitätskontrolle & Übergabe", description: "Sorgfältige Abnahme und Dokumentation aller durchgeführten Arbeiten." }
    ],
    faqs: [
      { question: "Was ist der Unterschied zwischen Modernisierung und Sanierung?", answer: "Eine Modernisierung umfasst gezielte Verbesserungen, während eine Sanierung umfassender ist und oft auch die Behebung von Schäden beinhaltet." },
      { question: "Kann ich während der Modernisierung wohnen bleiben?", answer: "Bei vielen Modernisierungsmaßnahmen ist das möglich. Wir planen die Arbeiten so, dass die Belastung minimal ist." },
      { question: "Welche Modernisierungen haben den größten Effekt?", answer: "Bäder, Küchen und energetische Maßnahmen haben typischerweise den größten Einfluss auf Wert und Vermietbarkeit." },
      { question: "Kann ich Modernisierungskosten steuerlich absetzen?", answer: "Bei vermieteten Objekten sind Modernisierungskosten oft absetzbar. Wir empfehlen die Beratung durch einen Steuerberater." }
    ],
    duration: "2-12 Wochen je nach Umfang",
    priceRange: "5.000 - 50.000 €",
    keywords: ["modernisierung", "haus modernisieren", "wohnung modernisieren", "renovierung", "aufwertung", "energetische modernisierung", "werterhalt"]
  }
];

// All Services including specialized services
export const allServices: Service[] = [
  ...mainServices,
  {
    name: "Wohnungssanierung",
    slug: "wohnungssanierung",
    shortDescription: "Professionelle Komplettsanierung von Miet- und Eigentumswohnungen für höchste Wohnqualität.",
    longDescription: "Ob für Eigennutzung, Vermietung oder Verkauf – wir sanieren Wohnungen professionell und effizient.",
    detailedDescription: `Die Wohnungssanierung ist unsere Kernkompetenz. Wir haben bereits hunderte Wohnungen in der Region Franken saniert – von der kleinen Einzimmerwohnung bis zur großzügigen Altbauwohnung. Unsere Erfahrung garantiert Ihnen effiziente Abläufe und erstklassige Ergebnisse.

Eine Wohnungssanierung bei RD Frankenbau umfasst je nach Bedarf alle Gewerke: Elektroinstallation, Sanitär, Heizung, Trockenbau, Fliesen, Bodenbeläge, Malerarbeiten sowie Türen und Fenster. Als Generalunternehmer koordinieren wir alle Arbeiten und übergeben Ihnen die Wohnung schlüsselfertig.

Besonders für Wohnungsbaugesellschaften, Hausverwaltungen und Investoren bieten wir effiziente Lösungen: Standardisierte Prozesse, zuverlässige Terminplanung und faire Preise machen uns zum idealen Partner für Ihre Wohnungssanierungen.`,
    icon: "building-2",
    features: [
      "Komplette Wohnungssanierung aus einer Hand",
      "Alle Gewerke koordiniert",
      "Mietwohnungssanierung",
      "Eigentumswohnungssanierung",
      "Übergaberenovierung",
      "Altbausanierung",
      "Leerstandssanierung"
    ],
    benefits: [
      "Schlüsselfertige Übergabe",
      "Ein Ansprechpartner",
      "Termintreue",
      "Festpreisgarantie",
      "Höhere Mieteinnahmen",
      "Wertsteigerung"
    ],
    process: [
      { step: 1, title: "Besichtigung", description: "Vor-Ort-Termin zur Bestandsaufnahme" },
      { step: 2, title: "Angebot", description: "Detailliertes Festpreisangebot" },
      { step: 3, title: "Sanierung", description: "Professionelle Durchführung" },
      { step: 4, title: "Übergabe", description: "Schlüsselfertige Übergabe" }
    ],
    faqs: [
      { question: "Wie lange dauert eine Wohnungssanierung?", answer: "Je nach Größe und Umfang 4-10 Wochen." },
      { question: "Sanieren Sie auch vermietete Wohnungen?", answer: "Ja, wir koordinieren mit den Mietern und minimieren die Belastung." }
    ],
    duration: "4-10 Wochen",
    priceRange: "500 - 1.200 €/m²",
    keywords: ["wohnungssanierung", "wohnung sanieren", "mietwohnung sanieren", "eigentumswohnung sanieren", "wohnung renovieren"]
  },
  {
    name: "Altbausanierung",
    slug: "altbausanierung",
    shortDescription: "Fachgerechte Sanierung von Altbauten unter Erhalt des historischen Charmes.",
    longDescription: "Altbauten erfordern besonderes Know-how. Wir vereinen historischen Charme mit modernem Wohnkomfort.",
    detailedDescription: `Altbauten haben einen besonderen Charme, stellen aber auch besondere Anforderungen an die Sanierung. Hohe Decken, Stuck, alte Holzdielen und historische Details verdienen eine fachgerechte Behandlung – gleichzeitig sollen moderne Standards für Komfort und Energieeffizienz erfüllt werden.

Bei RD Frankenbau haben wir langjährige Erfahrung mit der Sanierung von Altbauten in Nürnberg, Fürth und der gesamten Region. Wir wissen, wie man die historische Substanz erhält und gleichzeitig zeitgemäßen Wohnkomfort schafft.

Typische Maßnahmen bei der Altbausanierung umfassen die Erneuerung der Elektro- und Sanitärinstallation, die Restaurierung historischer Elemente, die Dämmung unter Berücksichtigung des Denkmalschutzes sowie moderne Heizungssysteme für alte Mauern.`,
    icon: "landmark",
    features: [
      "Erhalt historischer Substanz",
      "Moderne Technik im Altbau",
      "Stuckrestauration",
      "Holzdielensanierung",
      "Kastenfenstersanierung",
      "Energetische Sanierung",
      "Denkmalschutzgerechte Ausführung"
    ],
    benefits: [
      "Bewahrung des Altbaucharmes",
      "Moderne Wohnqualität",
      "Wertsteigerung",
      "Energieeffizienz trotz Altbau",
      "Fachgerechte Ausführung"
    ],
    process: [
      { step: 1, title: "Bestandsaufnahme", description: "Analyse der historischen Substanz" },
      { step: 2, title: "Konzeptentwicklung", description: "Balance zwischen Erhalt und Modernisierung" },
      { step: 3, title: "Fachgerechte Sanierung", description: "Ausführung durch erfahrene Handwerker" },
      { step: 4, title: "Übergabe", description: "Dokumentation aller Arbeiten" }
    ],
    faqs: [
      { question: "Können Sie auch denkmalgeschützte Gebäude sanieren?", answer: "Ja, wir haben Erfahrung mit Denkmalschutzvorgaben und stimmen uns mit den Behörden ab." }
    ],
    duration: "8-24 Wochen",
    priceRange: "900 - 1.800 €/m²",
    keywords: ["altbausanierung", "altbau sanieren", "altbau renovieren", "gründerzeithaus", "denkmalschutz", "stuck restaurieren"]
  },
  {
    name: "Trockenbau",
    slug: "trockenbau",
    shortDescription: "Professioneller Trockenbau für flexible Raumgestaltung, Deckenverkleidungen und Dämmung.",
    longDescription: "Trockenbau ermöglicht schnelle und saubere Raumveränderungen ohne aufwendige Maurerarbeiten.",
    detailedDescription: `Trockenbau ist die moderne Lösung für flexible Raumgestaltung. Ob neue Raumaufteilung, abgehängte Decken, Schallschutz oder Wärmedämmung – mit Trockenbauelementen lassen sich nahezu alle Anforderungen schnell und sauber umsetzen.

Bei RD Frankenbau arbeiten wir mit hochwertigen Gipskarton- und Gipsfaserplatten führender Hersteller. Unsere Trockenbauer verfügen über jahrelange Erfahrung und sorgen für präzise Ausführung mit perfekten Oberflächen.

Trockenbau kommt bei fast allen unseren Projekten zum Einsatz: Bei der Kernsanierung für neue Raumaufteilungen, bei der Badsanierung für die Vorwandinstallation, bei der Modernisierung für Dämmung und neue Decken. Wir beherrschen alle Techniken vom einfachen Ständerwerk bis zu komplexen Akustiklösungen.`,
    icon: "layers",
    features: [
      "Trennwände und Raumteilung",
      "Abgehängte Decken",
      "Dachgeschossausbau",
      "Vorwandinstallation",
      "Wärmedämmung",
      "Schalldämmung",
      "Brandschutzverkleidungen",
      "Akustikdecken"
    ],
    benefits: [
      "Schnelle und saubere Ausführung",
      "Flexible Raumgestaltung",
      "Gute Dämmeigenschaften",
      "Kostengünstiger als Massivbau",
      "Leitungsführung in Hohlräumen"
    ],
    process: [
      { step: 1, title: "Aufmaß & Planung", description: "Exakte Vermessung und Materialberechnung" },
      { step: 2, title: "Unterkonstruktion", description: "Montage der Metall- oder Holzständer" },
      { step: 3, title: "Dämmung & Installation", description: "Einbau von Dämmung und Leitungen" },
      { step: 4, title: "Beplankung", description: "Montage der Gipskartonplatten" },
      { step: 5, title: "Verspachteln & Schleifen", description: "Glatte Oberflächen für Anstrich" }
    ],
    faqs: [
      { question: "Ist Trockenbau stabil genug?", answer: "Ja, moderne Trockenbauwände sind sehr stabil. Für schwere Lasten gibt es spezielle Verstärkungen." },
      { question: "Kann man an Trockenbauwänden etwas aufhängen?", answer: "Ja, mit speziellen Dübeln für Hohlraumwände oder durch Verstärkung der Unterkonstruktion." }
    ],
    duration: "1-4 Wochen",
    priceRange: "40 - 120 €/m²",
    keywords: ["trockenbau", "gipskarton", "rigips", "raumteilung", "abgehängte decke", "trockenbauwand", "dämmung"]
  },
  {
    name: "Malerarbeiten",
    slug: "malerarbeiten",
    shortDescription: "Hochwertige Malerarbeiten für Innenräume mit Premium-Materialien und handwerklicher Präzision.",
    longDescription: "Professionelle Malerarbeiten veredeln jeden Raum. Wir arbeiten mit hochwertigen Farben und achten auf perfekte Ausführung.",
    detailedDescription: `Malerarbeiten sind das Finish jeder Sanierung – und oft unterschätzt. Professionelle Malerarbeiten machen den Unterschied zwischen „gut" und „hervorragend". Bei RD Frankenbau legen wir größten Wert auf perfekte Untergrundvorbereitung, hochwertige Materialien und saubere Ausführung.

Wir verwenden ausschließlich Markenfarben mit optimaler Deckkraft und Langlebigkeit. Unsere Maler sind erfahrene Fachleute, die jede Technik beherrschen – vom klassischen Anstrich bis zu dekorativen Spachteltechniken.

Besonders bei Altbauten zeigt sich die Qualität unserer Arbeit: Rissüberbrückung, Stuckarbeiten, fachgerechte Grundierungen für verschiedene Untergründe – wir beherrschen alle Herausforderungen.`,
    icon: "paintbrush",
    features: [
      "Innenanstriche",
      "Tapezierarbeiten",
      "Lackierarbeiten",
      "Spachteltechniken",
      "Stuckrestaurierung",
      "Fassadenanstriche",
      "Holzanstriche",
      "Lasurtechniken"
    ],
    benefits: [
      "Perfekte Oberflächen",
      "Langlebige Farben",
      "Saubere Ausführung",
      "Schutz der Einrichtung",
      "Farbberatung inklusive"
    ],
    process: [
      { step: 1, title: "Farbberatung", description: "Auswahl der optimalen Farben und Techniken" },
      { step: 2, title: "Abdecken", description: "Sorgfältiger Schutz von Möbeln und Böden" },
      { step: 3, title: "Untergrundvorbereitung", description: "Spachteln, Schleifen, Grundieren" },
      { step: 4, title: "Anstrich", description: "Mehrere Farbschichten für perfekte Deckkraft" },
      { step: 5, title: "Reinigung", description: "Saubere Übergabe des Raumes" }
    ],
    faqs: [
      { question: "Wie lange hält ein professioneller Anstrich?", answer: "Mit hochwertigen Farben und guter Vorbereitung 10-15 Jahre im Innenbereich." },
      { question: "Können Sie auch Spachteltechniken?", answer: "Ja, wir bieten verschiedene dekorative Techniken wie Wischtechnik, Marmorierung und mehr." }
    ],
    duration: "1-2 Wochen",
    priceRange: "15 - 40 €/m²",
    keywords: ["malerarbeiten", "streichen", "anstrich", "wandfarbe", "tapezieren", "maler", "lackieren"]
  },
  {
    name: "Bodenbeläge",
    slug: "bodenverlegung",
    shortDescription: "Professionelle Verlegung aller Bodenbeläge: Parkett, Vinyl, Laminat, Fliesen und mehr.",
    longDescription: "Der richtige Boden prägt den Charakter eines Raumes. Wir verlegen alle gängigen Bodenbeläge fachgerecht.",
    detailedDescription: `Der Bodenbelag ist eines der wichtigsten Gestaltungselemente eines Raumes. Er bestimmt Optik, Haptik und Akustik und muss gleichzeitig robust und pflegeleicht sein. Bei RD Frankenbau beraten wir Sie umfassend zur Auswahl des optimalen Belags und verlegen alle Materialien fachgerecht.

Von klassischem Echtholzparkett über moderne Vinylböden bis zu großformatigen Fliesen – wir beherrschen alle Verlegetechniken. Auch die Untergrundvorbereitung gehört zu unserem Service: Estricharbeiten, Ausgleichsmassen und Trittschalldämmung für perfekte Ergebnisse.

Für Bäder und Küchen empfehlen wir Fliesen oder wasserfeste Vinylbeläge, für Wohnräume Parkett oder hochwertiges Designvinyl. Wir beraten Sie zu allen Vor- und Nachteilen und finden die optimale Lösung für Ihre Anforderungen.`,
    icon: "grid",
    features: [
      "Parkettverlegung (Massiv & Fertigparkett)",
      "Vinylboden und Designbeläge",
      "Laminatverlegung",
      "Fliesenverlegung",
      "Natursteinboden",
      "Teppichboden",
      "Estricharbeiten",
      "Fußbodenheizung-geeignete Beläge"
    ],
    benefits: [
      "Fachgerechte Verlegung aller Materialien",
      "Umfassende Beratung",
      "Langlebige Ergebnisse",
      "Perfekte Übergänge und Sockelleisten",
      "Garantie auf Verlegung"
    ],
    process: [
      { step: 1, title: "Beratung", description: "Materialauswahl nach Nutzung und Budget" },
      { step: 2, title: "Aufmaß", description: "Exakte Vermessung und Materialberechnung" },
      { step: 3, title: "Untergrund", description: "Vorbereitung, Ausgleich, Dämmung" },
      { step: 4, title: "Verlegung", description: "Professionelle Verlegung des Belags" },
      { step: 5, title: "Finish", description: "Sockelleisten, Übergänge, Versiegelung" }
    ],
    faqs: [
      { question: "Welcher Bodenbelag ist am pflegeleichtesten?", answer: "Vinyl und Fliesen sind besonders pflegeleicht. Parkett braucht mehr Pflege, ist aber langlebiger." },
      { question: "Kann man über Fußbodenheizung jeden Belag verlegen?", answer: "Nicht jeden. Parkett und Vinyl sind geeignet, Laminat nur bedingt. Wir beraten Sie individuell." }
    ],
    duration: "1-2 Wochen",
    priceRange: "30 - 150 €/m²",
    keywords: ["bodenbelag", "parkett verlegen", "vinyl", "laminat", "fliesen", "boden erneuern", "bodenleger"]
  },
  {
    name: "Fliesenarbeiten",
    slug: "fliesenarbeiten",
    shortDescription: "Präzise Fliesenverlegung für Bäder, Küchen und Wohnbereiche in höchster Qualität.",
    longDescription: "Fliesen sind langlebig, pflegeleicht und ästhetisch vielseitig. Unsere Fliesenleger arbeiten mit höchster Präzision.",
    detailedDescription: `Fliesenarbeiten erfordern Präzision, Erfahrung und ein gutes Auge für Details. Bei RD Frankenbau arbeiten ausschließlich erfahrene Fliesenleger, die jede Herausforderung meistern – von kleinen Mosaiken bis zu großformatigen Platten, von klassischen Verlegemustern bis zu modernen Designs.

Besonders im Bad ist die Qualität der Fliesenarbeit entscheidend: Exakte Fugen, perfekte Abdichtung und saubere Anschlüsse an Sanitärobjekte sind hier unerlässlich. Wir arbeiten nach den neuesten Richtlinien für Abdichtung in Nassbereichen und garantieren Ihnen eine langlebige Ausführung.

Auch großformatige Fliesen ab 60x60cm oder sogar 120x120cm verlegen wir routiniert. Diese modernen Formate erfordern spezielle Techniken und hochwertige Klebstoffe – beides gehört zu unserer Standardausstattung.`,
    icon: "square",
    features: [
      "Wandfliesen in allen Formaten",
      "Bodenfliesen und Feinsteinzeug",
      "Großformate bis 120x120cm",
      "Mosaikfliesen",
      "Naturstein",
      "Treppen fliesen",
      "Balkonfliesen (frostsicher)",
      "Fliesensanierung"
    ],
    benefits: [
      "Höchste Präzision",
      "Saubere Fugen",
      "Professionelle Abdichtung",
      "Langlebigkeit",
      "Große Formatauswahl"
    ],
    process: [
      { step: 1, title: "Planung", description: "Verlegemuster und Formatberatung" },
      { step: 2, title: "Untergrund", description: "Vorbereitung und Abdichtung" },
      { step: 3, title: "Verlegung", description: "Präzise Verlegung mit Kreuzfugen" },
      { step: 4, title: "Verfugen", description: "Sauberes Verfugen mit passendem Material" },
      { step: 5, title: "Reinigung", description: "Endreinigung und Versiegelung" }
    ],
    faqs: [
      { question: "Welche Fugenbreite ist optimal?", answer: "Das hängt vom Format ab. Bei Großformaten 2-3mm, bei kleinen Fliesen 3-5mm. Wir beraten Sie." },
      { question: "Können Sie auch vorhandene Fliesen überkleben?", answer: "Ja, unter bestimmten Voraussetzungen ist Fliese-auf-Fliese möglich." }
    ],
    duration: "1-3 Wochen",
    priceRange: "60 - 120 €/m²",
    keywords: ["fliesen", "fliesenleger", "fliesen verlegen", "badfliesen", "bodenfliesen", "wandfliesen", "verfugen"]
  },
  {
    name: "Elektroinstallation",
    slug: "elektroinstallation",
    shortDescription: "Moderne Elektroinstallationen für Sicherheit, Komfort und Smart-Home-Integration.",
    longDescription: "Eine moderne Elektroinstallation ist die Basis für Sicherheit und Komfort in Ihrer Immobilie.",
    detailedDescription: `Die Elektroinstallation ist das Nervensystem Ihrer Immobilie. Bei älteren Gebäuden entspricht sie oft nicht mehr den heutigen Sicherheitsstandards und Anforderungen. Eine Erneuerung der Elektrik ist daher bei vielen Sanierungen essentiell.

RD Frankenbau arbeitet mit zertifizierten Elektrofachbetrieben zusammen, die alle Arbeiten nach VDE-Normen ausführen. Von der kompletten Neuinstallation über die Erweiterung bestehender Anlagen bis zur Smart-Home-Integration – wir koordinieren alle Elektroarbeiten als Teil Ihres Sanierungsprojekts.

Eine moderne Elektroinstallation bietet mehr als nur Steckdosen und Licht: Durchdachte Schalterpositionen, ausreichend Steckdosen für die heutigen Anforderungen, Netzwerkkabel für schnelles Internet und optionale Smart-Home-Vorbereitung machen Ihre Immobilie zukunftssicher.`,
    icon: "zap",
    features: [
      "Komplette Neuinstallation",
      "Erweiterung bestehender Anlagen",
      "Sicherungskästen und Zählerschränke",
      "LED-Beleuchtungskonzepte",
      "Smart-Home-Vorbereitung",
      "Netzwerkverkabelung",
      "Gegensprechanlagen",
      "E-Check und Prüfung"
    ],
    benefits: [
      "Sicherheit nach aktuellen Normen",
      "Ausreichend Steckdosen",
      "Moderne Schalterdesigns",
      "Energieeffizienz durch LED",
      "Zukunftssichere Installation"
    ],
    process: [
      { step: 1, title: "Bestandsaufnahme", description: "Prüfung der vorhandenen Elektrik" },
      { step: 2, title: "Planung", description: "Steckdosen, Schalter, Beleuchtung planen" },
      { step: 3, title: "Installation", description: "Verlegung aller Leitungen" },
      { step: 4, title: "Anschluss", description: "Installation von Schaltern und Steckdosen" },
      { step: 5, title: "Prüfung", description: "Abnahme und Dokumentation" }
    ],
    faqs: [
      { question: "Muss bei einer Sanierung immer die Elektrik erneuert werden?", answer: "Nicht immer, aber oft ist es sinnvoll. Wir prüfen den Zustand und beraten Sie ehrlich." },
      { question: "Was kostet eine neue Elektroinstallation?", answer: "Je nach Umfang 80-150€ pro m² Wohnfläche." }
    ],
    duration: "1-4 Wochen",
    priceRange: "80 - 150 €/m²",
    keywords: ["elektroinstallation", "elektriker", "elektrik erneuern", "steckdosen", "sicherungskasten", "smart home", "led"]
  },
  {
    name: "Sanitärinstallation",
    slug: "sanitaerinstallation",
    shortDescription: "Professionelle Sanitärinstallationen für Bäder und Küchen nach aktuellen Standards.",
    longDescription: "Von der Wasserzuleitung bis zum Abfluss – wir installieren und erneuern Sanitäranlagen fachgerecht.",
    detailedDescription: `Sanitärinstallationen gehören zu den wichtigsten Gewerken bei einer Sanierung. Undichte Leitungen, veraltete Rohrsysteme oder unzureichende Wasserzufuhr sind nicht nur ärgerlich, sondern können erhebliche Schäden verursachen. Bei RD Frankenbau sorgen wir für zuverlässige Sanitärinstallationen nach aktuellen Standards.

Wir arbeiten mit modernen Rohrwerkstoffen, die langlebig und hygienisch sind. Egal ob Kupfer, Edelstahl oder Verbundrohre – wir wählen das optimale Material für Ihre Anforderungen. Alle Arbeiten werden von ausgebildeten Sanitärinstallateuren ausgeführt.

Zur Sanitärinstallation gehören nicht nur Rohre und Leitungen: Die fachgerechte Montage von WC, Waschbecken, Dusche, Badewanne und Armaturen ist ebenso wichtig. Wir sorgen für dichte Anschlüsse und eine perfekte Optik.`,
    icon: "droplets",
    features: [
      "Komplett neue Wasserleitungen",
      "Abwasserleitungen",
      "Warmwasserbereitung",
      "Montage Sanitärobjekte",
      "Armatureninstallation",
      "Rohrbruchsanierung",
      "Wasseraufbereitung",
      "Hebeanlage"
    ],
    benefits: [
      "Sauberes Trinkwasser",
      "Keine Rohrschäden",
      "Moderne Armaturen",
      "Wassersparend",
      "Garantie auf Installationen"
    ],
    process: [
      { step: 1, title: "Bestandsaufnahme", description: "Prüfung vorhandener Leitungen" },
      { step: 2, title: "Planung", description: "Leitungsführung und Anschlusspunkte" },
      { step: 3, title: "Rohinstallation", description: "Verlegung neuer Leitungen" },
      { step: 4, title: "Druckprüfung", description: "Test auf Dichtigkeit" },
      { step: 5, title: "Montage", description: "Installation aller Objekte" }
    ],
    faqs: [
      { question: "Wann sollten Wasserleitungen erneuert werden?", answer: "Bei Bleirohren sofort, bei verzinkten Stahlrohren nach 30-40 Jahren. Kupfer hält länger." },
      { question: "Können Sie auch eine zweite Wasserentnahmestelle installieren?", answer: "Ja, wir erweitern bestehende Installationen nach Ihren Wünschen." }
    ],
    duration: "1-3 Wochen",
    priceRange: "60 - 120 €/m²",
    keywords: ["sanitärinstallation", "sanitär", "wasserleitungen", "rohre", "klempner", "installateur", "abwasser"]
  },
  {
    name: "Türen & Fenster",
    slug: "tueren-fenster",
    shortDescription: "Einbau und Austausch von Türen und Fenstern für bessere Energieeffizienz und Optik.",
    longDescription: "Moderne Türen und Fenster verbessern Energieeffizienz, Schallschutz und Sicherheit erheblich.",
    detailedDescription: `Fenster und Türen sind entscheidend für Energieeffizienz, Schallschutz, Sicherheit und Optik Ihrer Immobilie. Veraltete Elemente mit einfacher Verglasung und undichten Profilen verursachen hohe Heizkosten und mindern den Wohnkomfort.

Bei RD Frankenbau koordinieren wir den Austausch von Fenstern und Türen als Teil Ihres Sanierungsprojekts. Wir arbeiten mit renommierten Herstellern zusammen und bieten Kunststoff-, Holz- und Aluminium-Elemente in allen Designs und Farben.

Besonders bei der Altbausanierung ist der Fensteraustausch eine Herausforderung: Die neuen Elemente müssen zum Charakter des Gebäudes passen und gleichzeitig moderne Standards erfüllen. Wir finden für jede Situation die optimale Lösung.`,
    icon: "door",
    features: [
      "Kunststofffenster",
      "Holzfenster",
      "Holz-Alu-Fenster",
      "Innentüren",
      "Haustüren",
      "Sicherheitstüren",
      "Rollläden",
      "Fensterbänke"
    ],
    benefits: [
      "Bessere Wärmedämmung",
      "Geringere Heizkosten",
      "Mehr Schallschutz",
      "Höhere Sicherheit",
      "Moderne Optik"
    ],
    process: [
      { step: 1, title: "Aufmaß", description: "Präzise Vermessung vor Ort" },
      { step: 2, title: "Beratung", description: "Auswahl von Material und Design" },
      { step: 3, title: "Fertigung", description: "Maßanfertigung beim Hersteller" },
      { step: 4, title: "Demontage", description: "Entfernung der alten Elemente" },
      { step: 5, title: "Einbau", description: "Fachgerechte Montage nach RAL" }
    ],
    faqs: [
      { question: "Wie viel Energie spare ich mit neuen Fenstern?", answer: "Bei Austausch von Einfachverglasung können Sie bis zu 30% Heizkosten sparen." },
      { question: "Wie lange dauert ein Fenstertausch?", answer: "Je nach Anzahl 1-3 Tage. Wir arbeiten schnell und sauber." }
    ],
    duration: "1-5 Tage",
    priceRange: "500 - 1.500 € pro Element",
    keywords: ["fenster austauschen", "neue fenster", "türen einbauen", "haustür", "innentür", "fensterbauer", "rolladen"]
  },
  {
    name: "Heizungsmodernisierung",
    slug: "heizungsmodernisierung",
    shortDescription: "Modernisierung von Heizungsanlagen für mehr Effizienz, Komfort und niedrigere Kosten.",
    longDescription: "Eine moderne Heizung senkt Kosten, steigert den Komfort und ist besser für die Umwelt.",
    detailedDescription: `Die Heizung ist einer der größten Energieverbraucher im Haushalt. Eine veraltete Anlage arbeitet ineffizient und verursacht unnötig hohe Kosten. Die Modernisierung der Heizung ist daher eine der wirtschaftlichsten Maßnahmen bei einer Sanierung.

Bei RD Frankenbau beraten wir Sie zu allen modernen Heizungssystemen: Gas-Brennwerttechnik, Wärmepumpen, Pelletheizungen oder Hybridlösungen. Gemeinsam finden wir das System, das am besten zu Ihrer Immobilie und Ihren Anforderungen passt.

Auch die Optimierung bestehender Anlagen kann erhebliche Einsparungen bringen: Hydraulischer Abgleich, neue Thermostate, Rohrisolierung oder der Austausch der Umwälzpumpe sind oft kostengünstige Maßnahmen mit großer Wirkung.`,
    icon: "flame",
    features: [
      "Gas-Brennwerttechnik",
      "Wärmepumpen",
      "Fußbodenheizung",
      "Heizkörpertausch",
      "Thermostatventile",
      "Hydraulischer Abgleich",
      "Rohrisolierung",
      "Smart Heating"
    ],
    benefits: [
      "Niedrigere Heizkosten",
      "Weniger CO2-Ausstoß",
      "Mehr Komfort",
      "Wertsteigerung",
      "Förderfähig"
    ],
    process: [
      { step: 1, title: "Analyse", description: "Prüfung der bestehenden Anlage" },
      { step: 2, title: "Beratung", description: "Auswahl des optimalen Systems" },
      { step: 3, title: "Förderung", description: "Beantragung von Fördermitteln" },
      { step: 4, title: "Installation", description: "Fachgerechter Einbau" },
      { step: 5, title: "Einweisung", description: "Übergabe und Bedienungsanleitung" }
    ],
    faqs: [
      { question: "Welche Förderungen gibt es für neue Heizungen?", answer: "Die BAFA fördert Wärmepumpen und Biomasse mit bis zu 40%. Die KfW bietet günstige Kredite." },
      { question: "Wann lohnt sich ein Heizungstausch?", answer: "Wenn die Anlage älter als 20 Jahre ist, lohnt sich meist der Austausch gegen moderne Technik." }
    ],
    duration: "2-5 Tage",
    priceRange: "8.000 - 30.000 €",
    keywords: ["heizung modernisieren", "neue heizung", "wärmepumpe", "gasheizung", "fußbodenheizung", "heizungstausch", "heizungsanlage"]
  },
  {
    name: "Küchensanierung",
    slug: "kuechensanierung",
    shortDescription: "Professionelle Küchensanierung und -modernisierung für mehr Funktionalität und Stil.",
    longDescription: "Die Küche ist das Herz des Hauses. Wir sanieren und modernisieren Küchen nach Ihren Wünschen.",
    detailedDescription: `Die Küche ist längst mehr als nur ein Raum zum Kochen – sie ist Treffpunkt, Kommunikationszentrum und oft das Herzstück der Wohnung. Eine moderne, gut geplante Küche steigert die Lebensqualität erheblich und erhöht den Wert Ihrer Immobilie.

Bei RD Frankenbau sanieren wir Küchen komplett: Von der Neugestaltung der Elektro- und Wasseranschlüsse über neue Böden und Wände bis zur Koordination mit Küchenstudios für die Einbauküche. Wir sorgen dafür, dass alle Gewerke perfekt zusammenarbeiten.

Auch Teilmaßnahmen wie der Austausch von Arbeitsplatten, neue Fliesen oder die Erweiterung der Elektroinstallation für moderne Geräte gehören zu unserem Leistungsspektrum. Wir beraten Sie ehrlich, was sinnvoll ist und was nicht.`,
    icon: "utensils",
    features: [
      "Komplette Küchensanierung",
      "Elektro-Neuinstallation",
      "Wasseranschlüsse",
      "Bodenbeläge",
      "Wandfliesen",
      "Beleuchtungskonzepte",
      "Dunstabzug",
      "Koordination Küchenstudio"
    ],
    benefits: [
      "Moderne Kochbereiche",
      "Mehr Stauraum",
      "Bessere Ergonomie",
      "Zeitgemäße Elektrik",
      "Wertsteigerung"
    ],
    process: [
      { step: 1, title: "Planung", description: "Bestandsaufnahme und Konzeptentwicklung" },
      { step: 2, title: "Rückbau", description: "Demontage der alten Küche" },
      { step: 3, title: "Installationen", description: "Elektro, Wasser, Abwasser" },
      { step: 4, title: "Oberflächen", description: "Boden, Wände, Decke" },
      { step: 5, title: "Küchenmontage", description: "Einbau der neuen Küche" }
    ],
    faqs: [
      { question: "Können Sie auch nur die Vorgewerke machen?", answer: "Ja, wir bereiten die Küche vor und Ihr Küchenstudio kann dann die Möbel montieren." },
      { question: "Wie lange bin ich ohne Küche?", answer: "Bei guter Planung 1-2 Wochen. Wir minimieren die Zeit ohne funktionierende Küche." }
    ],
    duration: "2-4 Wochen",
    priceRange: "5.000 - 20.000 €",
    keywords: ["küchensanierung", "küche renovieren", "neue küche", "küchenumbau", "küche modernisieren", "küche fliesen"]
  },
  {
    name: "Dachgeschossausbau",
    slug: "dachgeschossausbau",
    shortDescription: "Professioneller Ausbau von Dachgeschossen zu hochwertigem Wohnraum.",
    longDescription: "Wir verwandeln Ihren ungenutzten Dachboden in attraktiven Wohnraum mit Charakter.",
    detailedDescription: `Ein ausgebautes Dachgeschoss bietet besonderen Wohncharme: Schrägen, Gauben und oft ein tolles Licht schaffen einzigartige Räume. Gleichzeitig ist der Dachausbau eine effiziente Möglichkeit, zusätzlichen Wohnraum zu schaffen, ohne Grundstücksfläche zu verbrauchen.

Der Dachgeschossausbau erfordert Know-how in vielen Bereichen: Dämmung, Trockenbau, Fenster, Elektro, Sanitär – alles muss unter Berücksichtigung der besonderen Gegebenheiten geplant und ausgeführt werden. Bei RD Frankenbau koordinieren wir alle Gewerke und liefern fertigen Wohnraum.

Besondere Aufmerksamkeit verdient die Dämmung: Im Dach gehen ohne Dämmung bis zu 30% der Heizenergie verloren. Wir dämmen nach aktuellen EnEV-Standards und sorgen für ein angenehmes Raumklima zu jeder Jahreszeit.`,
    icon: "home",
    features: [
      "Dachdämmung",
      "Dachfenster/Gauben",
      "Trockenbau",
      "Elektroinstallation",
      "Sanitärinstallation",
      "Bodenbeläge",
      "Treppenzugang",
      "Brandschutz"
    ],
    benefits: [
      "Zusätzlicher Wohnraum",
      "Wertsteigerung",
      "Besonderer Charme",
      "Energieeffizienz",
      "Oft kein Bauantrag nötig"
    ],
    process: [
      { step: 1, title: "Machbarkeit", description: "Prüfung von Statik und Baurecht" },
      { step: 2, title: "Planung", description: "Raumaufteilung und Detailplanung" },
      { step: 3, title: "Dämmung", description: "Wärmedämmung der Dachflächen" },
      { step: 4, title: "Ausbau", description: "Trockenbau, Installationen, Oberflächen" },
      { step: 5, title: "Fertigstellung", description: "Böden, Malerarbeiten, Einrichtung" }
    ],
    faqs: [
      { question: "Brauche ich eine Baugenehmigung?", answer: "Nicht immer. Wenn keine neuen Fenster in der Dachfläche entstehen und keine Wohnraumvergrößerung stattfindet, oft nicht. Wir klären das." },
      { question: "Wie hoch sind die Kosten pro m²?", answer: "Je nach Ausstattung 600-1.200€ pro m² Wohnfläche." }
    ],
    duration: "4-8 Wochen",
    priceRange: "600 - 1.200 €/m²",
    keywords: ["dachgeschossausbau", "dachausbau", "dachboden ausbauen", "spitzboden", "dachwohnung", "mansarde"]
  }
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

// Generate city-specific service content
export function generateCityServiceContent(cityName: string, service: Service): string {
  const templates = [
    `Suchen Sie einen zuverlässigen Partner für ${service.name} in ${cityName}? RD Frankenbau ist Ihr lokaler Experte für hochwertige ${service.name} in ${cityName} und Umgebung. Mit langjähriger Erfahrung und einem Team qualifizierter Handwerker realisieren wir Ihr Projekt termingerecht und in höchster Qualität.`,
    `Als etabliertes Sanierungsunternehmen bieten wir professionelle ${service.name} in ${cityName} an. Unsere Kunden in ${cityName} schätzen unsere Zuverlässigkeit, faire Preise und die hochwertige Ausführung. Kontaktieren Sie uns für eine kostenlose Beratung vor Ort.`,
    `${service.name} in ${cityName} – das ist unsere Spezialität. Ob Altbau oder Neubau, große oder kleine Projekte: RD Frankenbau ist Ihr kompetenter Ansprechpartner für alle Sanierungsarbeiten in ${cityName} und der gesamten Region Franken.`
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}
