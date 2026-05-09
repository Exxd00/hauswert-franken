// Project photos organized by project/location
export interface ProjectPhoto {
  src: string;
  alt: string;
  category: 'before' | 'after';
}

export interface Project {
  id: number;
  title: string;
  location: string;
  address?: string;
  type: string;
  area: string;
  duration: string;
  year: string;
  description: string;
  highlights: string[];
  services: string[];
  mainImage: string;
  beforePhotos: ProjectPhoto[];
  afterPhotos: ProjectPhoto[];
  serviceCategory?: string;
}

// All projects with complete photo galleries
export const projects: Project[] = [
  {
    id: 1,
    title: 'Komplettsanierung Altbauwohnung',
    location: 'Nürnberg',
    address: 'Höfener Straße',
    type: 'Altbauwohnung 1.OG',
    area: '85 m²',
    duration: '7 Wochen',
    year: '2026',
    description: 'Eine umfassende Komplettsanierung einer charmanten Altbauwohnung im ersten Obergeschoss. Von der kompletten Entkernung über neue Elektroinstallationen bis hin zu modernen Sanitäranlagen - dieses Projekt zeigt unsere Expertise in der Transformation historischer Bausubstanz zu zeitgemäßem Wohnraum. Besonderes Augenmerk lag auf der Erhaltung des Altbaucharakters bei gleichzeitiger Integration moderner Annehmlichkeiten.',
    highlights: [
      'Komplette Entkernung und Neuaufbau',
      'Moderne Elektroinstallation nach aktuellen Standards',
      'Hochwertige Sanitäranlagen',
      'Energieeffiziente Heizungsanlage',
      'Premium-Bodenbeläge',
      'Maßgefertigte Einbauküche'
    ],
    services: [
      'Kernsanierung',
      'Elektroinstallation',
      'Sanitärarbeiten',
      'Heizungsinstallation',
      'Trockenbau',
      'Malerarbeiten',
      'Bodenverlegung',
      'Kücheneinbau',
      'Türen & Zargen'
    ],
    serviceCategory: 'kernsanierung',
    mainImage: '/photos/projekt-1/nachher/PHOTO-2026-02-27-16-45-20.JPG',
    beforePhotos: [
      { src: '/photos/projekt-1/PHOTO-2026-01-14-10-45-49.JPG', alt: 'Ausgangszustand Raum 1', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-14-10-46-09.JPG', alt: 'Alte Raumaufteilung', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-14-10-46-21.JPG', alt: 'Ursprünglicher Zustand', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-17-18-22-34-2.JPG', alt: 'Bestandsaufnahme', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-19-17-31-33.JPG', alt: 'Sanierungsbedarf', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-20-17-41-30-2.JPG', alt: 'Alte Installation', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-20-17-41-30-3.JPG', alt: 'Vorher Ansicht', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-20-17-41-31-2.JPG', alt: 'Abbrucharbeiten', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-21-17-36-55.JPG', alt: 'Entkernung', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-21-17-36-56-3.JPG', alt: 'Rohbau Phase', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-21-17-36-56.JPG', alt: 'Bauarbeiten', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-22-17-43-32-2.JPG', alt: 'Installationsarbeiten', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-22-17-43-33-3.JPG', alt: 'Elektroarbeiten', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-22-17-43-33.JPG', alt: 'Leitungsverlegung', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-22-17-43-34-2.JPG', alt: 'Rohinstallation', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-22-17-43-36.JPG', alt: 'Wandarbeiten', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-22-17-43-58.JPG', alt: 'Trockenbau Vorbereitung', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-23-13-12-30-3.JPG', alt: 'Spachtelarbeiten', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-23-13-12-30-4.JPG', alt: 'Wandvorbereitung', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-23-13-12-30-7.JPG', alt: 'Flächenvorbereitung', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-28-18-22-35-2.JPG', alt: 'Grundierung', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-28-18-22-35.JPG', alt: 'Oberflächenbehandlung', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-29-18-19-58-3.JPG', alt: 'Feinarbeiten', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-30-17-12-51-2.JPG', alt: 'Bodenarbeiten', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-30-17-12-52-2.JPG', alt: 'Estricharbeiten', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-30-17-49-38.JPG', alt: 'Vorbereitung Bodenbelag', category: 'before' },
      { src: '/photos/projekt-1/PHOTO-2026-01-31-18-25-16.JPG', alt: 'Letzte Vorbereitungen', category: 'before' },
    ],
    afterPhotos: [
      { src: '/photos/projekt-1/nachher/PHOTO-2026-02-03-18-32-50.JPG', alt: 'Fertiggestellter Wohnbereich', category: 'after' },
      { src: '/photos/projekt-1/nachher/PHOTO-2026-02-04-18-03-46.JPG', alt: 'Modernes Wohnzimmer', category: 'after' },
      { src: '/photos/projekt-1/nachher/PHOTO-2026-02-14-14-38-36-2.JPG', alt: 'Neue Küche', category: 'after' },
      { src: '/photos/projekt-1/nachher/PHOTO-2026-02-14-14-38-36.JPG', alt: 'Küchenbereich komplett', category: 'after' },
      { src: '/photos/projekt-1/nachher/PHOTO-2026-02-25-18-07-16-2.JPG', alt: 'Schlafzimmer neu', category: 'after' },
      { src: '/photos/projekt-1/nachher/PHOTO-2026-02-25-18-07-16-4.JPG', alt: 'Modernes Bad', category: 'after' },
      { src: '/photos/projekt-1/nachher/PHOTO-2026-02-25-18-07-17.JPG', alt: 'Flurbereich', category: 'after' },
      { src: '/photos/projekt-1/nachher/PHOTO-2026-02-27-16-45-20.JPG', alt: 'Übergabefertig', category: 'after' },
      { src: '/photos/projekt-1/nachher/PHOTO-2026-02-27-16-45-21.JPG', alt: 'Finaler Zustand', category: 'after' },
    ],
  },
  {
    id: 2,
    title: 'Kernsanierung Mehrfamilienhaus',
    location: 'Fürth',
    address: 'Stadtmitte',
    type: 'Mehrfamilienhaus',
    area: '120 m²',
    duration: '10 Wochen',
    year: '2022/2023',
    description: 'Ein anspruchsvolles Sanierungsprojekt eines historischen Mehrfamilienhauses in der Fürther Stadtmitte. Die komplette Kernsanierung umfasste mehrere Wohneinheiten und erforderte höchste Präzision bei der Koordination aller Gewerke. Von der Erneuerung der kompletten Elektrik über moderne Heizungsanlagen bis hin zu hochwertigen Oberflächenbehandlungen - ein Paradebeispiel für professionelle Gebäudesanierung.',
    highlights: [
      'Mehrere Wohneinheiten gleichzeitig saniert',
      'Komplette Erneuerung der Hausinstallationen',
      'Moderne Heiztechnik für alle Einheiten',
      'Hochwertige Bodenbeläge',
      'Professionelle Wandgestaltung',
      'Zeitplan eingehalten trotz Komplexität'
    ],
    services: [
      'Kernsanierung',
      'Elektroinstallation komplett',
      'Heizungsinstallation',
      'Sanitärarbeiten',
      'Trockenbau',
      'Malerarbeiten',
      'Bodenarbeiten',
      'Türen erneuern'
    ],
    serviceCategory: 'kernsanierung',
    mainImage: '/photos/projekt-2/nachher/PHOTO-2026-02-27-16-45-41.JPG',
    beforePhotos: [
      { src: '/photos/projekt-2/PHOTO-2025-12-08-13-24-46.JPG', alt: 'Ausgangszustand', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-09-12-16-34.JPG', alt: 'Bestandsaufnahme Raum 1', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-09-12-16-35-2.JPG', alt: 'Alte Elektrik', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-09-12-16-36-2.JPG', alt: 'Sanierungsbedarf', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-09-12-16-36-3.JPG', alt: 'Wandzustand', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-09-12-16-37-2.JPG', alt: 'Abbrucharbeiten Start', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-09-12-16-37.JPG', alt: 'Entkernung Phase 1', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-09-12-16-38-2.JPG', alt: 'Rohbau', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-09-12-16-38-3.JPG', alt: 'Installationen entfernt', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-09-12-16-38.JPG', alt: 'Baustelle aktiv', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-09-12-16-39.JPG', alt: 'Fortschritt Entkernung', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-11-17-09-41.JPG', alt: 'Elektro Neuverlegung', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-12-13-30-10.JPG', alt: 'Kabelinstallation', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-12-13-30-12-2.JPG', alt: 'Leitungsarbeiten', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-12-13-30-13-2.JPG', alt: 'Rohinstallation Elektrik', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-12-13-30-15-2.JPG', alt: 'Verteilung neu', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-16-15-45-45-2.JPG', alt: 'Trockenbau Start', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-16-15-45-45-3.JPG', alt: 'Wandaufbau', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-16-15-45-46-2.JPG', alt: 'Gipskarton', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-19-13-41-15-4.JPG', alt: 'Spachtelarbeiten', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-22-16-36-28.JPG', alt: 'Oberflächenvorbereitung', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-22-16-36-29.JPG', alt: 'Grundierung Wände', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-22-16-36-30.JPG', alt: 'Malerarbeiten Beginn', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2025-12-22-16-36-31-2.JPG', alt: 'Wandgestaltung', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2026-01-06-13-32-18.JPG', alt: 'Bodenarbeiten Start', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2026-01-14-10-48-29.JPG', alt: 'Estrich Vorbereitung', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2026-01-14-10-49-12.JPG', alt: 'Untergrund', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2026-01-14-16-49-32-4.JPG', alt: 'Heizungsinstallation', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2026-01-15-17-34-04-4.JPG', alt: 'Heizkörper Montage', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2026-01-15-17-34-04-6.JPG', alt: 'Rohre verlegt', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2026-01-17-18-21-58-2.JPG', alt: 'Sanitär Rohbau', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2026-01-19-15-20-29-2.JPG', alt: 'Badezimmer Arbeiten', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2026-01-24-17-16-07.JPG', alt: 'Fliesen Vorbereitung', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2026-01-24-17-51-46.JPG', alt: 'Fliesenarbeiten', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2026-01-26-17-46-06.JPG', alt: 'Bad im Aufbau', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2026-01-26-17-46-07.JPG', alt: 'Sanitär Montage', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2026-01-26-17-46-08.JPG', alt: 'Fast fertig', category: 'before' },
      { src: '/photos/projekt-2/PHOTO-2026-02-04-18-05-05.JPG', alt: 'Letzte Arbeiten', category: 'before' },
    ],
    afterPhotos: [
      { src: '/photos/projekt-2/nachher/PHOTO-2026-02-03-18-33-10.JPG', alt: 'Fertige Wohnung', category: 'after' },
      { src: '/photos/projekt-2/nachher/PHOTO-2026-02-04-18-05-09.JPG', alt: 'Moderner Wohnraum', category: 'after' },
      { src: '/photos/projekt-2/nachher/PHOTO-2026-02-06-18-18-23-2.JPG', alt: 'Neues Bad', category: 'after' },
      { src: '/photos/projekt-2/nachher/PHOTO-2026-02-06-18-18-23-3.JPG', alt: 'Badezimmer komplett', category: 'after' },
      { src: '/photos/projekt-2/nachher/PHOTO-2026-02-06-18-18-23-4.JPG', alt: 'Sanitärbereich', category: 'after' },
      { src: '/photos/projekt-2/nachher/PHOTO-2026-02-06-18-18-23.JPG', alt: 'Hochwertige Ausstattung', category: 'after' },
      { src: '/photos/projekt-2/nachher/PHOTO-2026-02-25-18-06-34-3.JPG', alt: 'Küche eingebaut', category: 'after' },
      { src: '/photos/projekt-2/nachher/PHOTO-2026-02-27-16-45-41.JPG', alt: 'Übergabefertig', category: 'after' },
      { src: '/photos/projekt-2/nachher/PHOTO-2026-02-27-16-45-42.JPG', alt: 'Finale Ansicht', category: 'after' },
      { src: '/photos/projekt-2/nachher/PHOTO-2026-03-05-11-00-42-2.JPG', alt: 'Projekt abgeschlossen', category: 'after' },
    ],
  },
  {
    id: 3,
    title: 'Luxus-Wohnungssanierung',
    location: 'Nürnberg-Nord',
    address: 'Wohngebiet Premium',
    type: 'Eigentumswohnung',
    area: '95 m²',
    duration: '8 Wochen',
    year: '2026',
    description: 'Eine exklusive Wohnungssanierung auf höchstem Niveau. Dieses Projekt zeichnet sich durch die Verwendung erstklassiger Materialien und handwerkliche Präzision aus. Jedes Detail wurde sorgfältig geplant - von der intelligenten Raumaufteilung über die energieeffiziente Haustechnik bis hin zur stilvollen Innenausstattung. Das Ergebnis: Ein modernes Zuhause, das keine Wünsche offen lässt.',
    highlights: [
      'Premium-Materialien durchgängig',
      'Intelligente Raumaufteilung',
      'Hochwertige Sanitärausstattung',
      'Modernes Beleuchtungskonzept',
      'Energieeffiziente Anlagen',
      'Designorientierte Ausführung'
    ],
    services: [
      'Komplettsanierung',
      'Badsanierung Luxus',
      'Elektroinstallation Smart',
      'Heizungsmodernisierung',
      'Trockenbau',
      'Premium Malerarbeiten',
      'Parkett & Bodenbeläge',
      'Einbauküche'
    ],
    serviceCategory: 'modernisierung',
    mainImage: '/photos/projekt-3/nachher/IMG_1600.JPG',
    beforePhotos: [
      { src: '/photos/projekt-3/IMG_1364.JPG', alt: 'Ausgangszustand Eingang', category: 'before' },
      { src: '/photos/projekt-3/IMG_1366.JPG', alt: 'Flurbereich vorher', category: 'before' },
      { src: '/photos/projekt-3/IMG_1367.JPG', alt: 'Wohnbereich alt', category: 'before' },
      { src: '/photos/projekt-3/IMG_1376.JPG', alt: 'Küche Ausgangszustand', category: 'before' },
      { src: '/photos/projekt-3/IMG_1377.JPG', alt: 'Alte Küchenzeile', category: 'before' },
      { src: '/photos/projekt-3/IMG_1381.JPG', alt: 'Bad vorher', category: 'before' },
      { src: '/photos/projekt-3/IMG_1382.JPG', alt: 'Sanitärbereich alt', category: 'before' },
      { src: '/photos/projekt-3/IMG_1385.JPG', alt: 'Schlafzimmer vorher', category: 'before' },
      { src: '/photos/projekt-3/IMG_1388.JPG', alt: 'Nebenraum', category: 'before' },
      { src: '/photos/projekt-3/IMG_1390.JPG', alt: 'Abstellraum', category: 'before' },
      { src: '/photos/projekt-3/IMG_1395.JPG', alt: 'Entkernung begonnen', category: 'before' },
      { src: '/photos/projekt-3/IMG_1399.JPG', alt: 'Demontage', category: 'before' },
      { src: '/photos/projekt-3/IMG_1408.JPG', alt: 'Rohbau Phase', category: 'before' },
      { src: '/photos/projekt-3/IMG_1409.JPG', alt: 'Installationen entfernt', category: 'before' },
      { src: '/photos/projekt-3/IMG_1410.JPG', alt: 'Wände vorbereitet', category: 'before' },
      { src: '/photos/projekt-3/IMG_1413.JPG', alt: 'Elektrik Neuverlegung', category: 'before' },
      { src: '/photos/projekt-3/IMG_1416.JPG', alt: 'Kabel verlegt', category: 'before' },
      { src: '/photos/projekt-3/IMG_1417.JPG', alt: 'Verteilerdose', category: 'before' },
      { src: '/photos/projekt-3/IMG_1419.JPG', alt: 'Trockenbau Start', category: 'before' },
      { src: '/photos/projekt-3/IMG_1421.JPG', alt: 'Wandaufbau', category: 'before' },
      { src: '/photos/projekt-3/IMG_1427.JPG', alt: 'Gipskarton montiert', category: 'before' },
      { src: '/photos/projekt-3/IMG_1429.JPG', alt: 'Spachtelarbeiten', category: 'before' },
      { src: '/photos/projekt-3/IMG_1432.JPG', alt: 'Oberflächenfinish', category: 'before' },
      { src: '/photos/projekt-3/IMG_1442.JPG', alt: 'Bad Rohbau', category: 'before' },
      { src: '/photos/projekt-3/IMG_1445.JPG', alt: 'Sanitär Rohinstallation', category: 'before' },
      { src: '/photos/projekt-3/IMG_1450.JPG', alt: 'Fliesenarbeiten', category: 'before' },
      { src: '/photos/projekt-3/IMG_1451.JPG', alt: 'Wandfliesen', category: 'before' },
      { src: '/photos/projekt-3/IMG_1452.JPG', alt: 'Bodenfliesen', category: 'before' },
      { src: '/photos/projekt-3/IMG_1453.JPG', alt: 'Bad im Aufbau', category: 'before' },
      { src: '/photos/projekt-3/IMG_1454.JPG', alt: 'Duschbereich', category: 'before' },
      { src: '/photos/projekt-3/IMG_1457.JPG', alt: 'WC Installation', category: 'before' },
      { src: '/photos/projekt-3/IMG_1459.JPG', alt: 'Waschbecken Vorbereitung', category: 'before' },
      { src: '/photos/projekt-3/IMG_1460.JPG', alt: 'Armaturenmontage', category: 'before' },
      { src: '/photos/projekt-3/IMG_1461.JPG', alt: 'Heizung Installation', category: 'before' },
      { src: '/photos/projekt-3/IMG_1462.JPG', alt: 'Heizkörper montiert', category: 'before' },
      { src: '/photos/projekt-3/IMG_1468.JPG', alt: 'Küche Vorbereitung', category: 'before' },
      { src: '/photos/projekt-3/IMG_1469.JPG', alt: 'Küchenanschlüsse', category: 'before' },
      { src: '/photos/projekt-3/IMG_1470.JPG', alt: 'Elektro Küche', category: 'before' },
      { src: '/photos/projekt-3/IMG_1472.JPG', alt: 'Bodenarbeiten', category: 'before' },
      { src: '/photos/projekt-3/IMG_1473.JPG', alt: 'Estrich', category: 'before' },
      { src: '/photos/projekt-3/IMG_1475.JPG', alt: 'Untergrund vorbereitet', category: 'before' },
      { src: '/photos/projekt-3/IMG_1479.JPG', alt: 'Parkett Verlegung', category: 'before' },
      { src: '/photos/projekt-3/IMG_1499.JPG', alt: 'Boden fast fertig', category: 'before' },
      { src: '/photos/projekt-3/IMG_1506.JPG', alt: 'Malerarbeiten', category: 'before' },
      { src: '/photos/projekt-3/IMG_1512.JPG', alt: 'Wandanstrich', category: 'before' },
      { src: '/photos/projekt-3/IMG_1513.JPG', alt: 'Decke gestrichen', category: 'before' },
      { src: '/photos/projekt-3/IMG_1514.JPG', alt: 'Feinarbeiten', category: 'before' },
      { src: '/photos/projekt-3/IMG_1543.JPG', alt: 'Türen eingebaut', category: 'before' },
      { src: '/photos/projekt-3/IMG_1553.JPG', alt: 'Zargen montiert', category: 'before' },
      { src: '/photos/projekt-3/IMG_1556.JPG', alt: 'Sockelleisten', category: 'before' },
      { src: '/photos/projekt-3/IMG_1562.JPG', alt: 'Steckdosen montiert', category: 'before' },
      { src: '/photos/projekt-3/IMG_1565.JPG', alt: 'Schalter installiert', category: 'before' },
      { src: '/photos/projekt-3/IMG_1589.JPG', alt: 'Letzte Arbeiten', category: 'before' },
    ],
    afterPhotos: [
      { src: '/photos/projekt-3/nachher/IMG_1378.JPG', alt: 'Fertige Küche', category: 'after' },
      { src: '/photos/projekt-3/nachher/IMG_1435.JPG', alt: 'Modernes Bad', category: 'after' },
      { src: '/photos/projekt-3/nachher/IMG_1436.JPG', alt: 'Dusche neu', category: 'after' },
      { src: '/photos/projekt-3/nachher/IMG_1497.JPG', alt: 'Wohnbereich', category: 'after' },
      { src: '/photos/projekt-3/nachher/IMG_1502.JPG', alt: 'Schlafzimmer fertig', category: 'after' },
      { src: '/photos/projekt-3/nachher/IMG_1523.JPG', alt: 'Flur komplett', category: 'after' },
      { src: '/photos/projekt-3/nachher/IMG_1547.JPG', alt: 'Detail Ausstattung', category: 'after' },
      { src: '/photos/projekt-3/nachher/IMG_1600.JPG', alt: 'Übergabefertig', category: 'after' },
    ],
  },
];

// Get all projects
export const getAllProjects = () => projects;

// Get featured projects (first 3 or customizable)
export const getFeaturedProjects = (count: number = 3) => projects.slice(0, count);

// Get project by ID
export const getProjectById = (id: number) => {
  return projects.find(project => project.id === id);
};

// Get projects by service category
export const getProjectsByService = (serviceSlug: string) => {
  return projects.filter(project => project.serviceCategory === serviceSlug);
};

// Get all unique photos from all projects for gallery
export const getAllPhotos = () => {
  const allPhotos: { src: string; alt: string; projectTitle: string; category: string }[] = [];

  projects.forEach(project => {
    project.beforePhotos.forEach(photo => {
      allPhotos.push({
        ...photo,
        projectTitle: project.title,
      });
    });
    project.afterPhotos.forEach(photo => {
      allPhotos.push({
        ...photo,
        projectTitle: project.title,
      });
    });
  });

  return allPhotos;
};

// Get photos by category
export const getPhotosByCategory = (category: 'before' | 'after') => {
  const photos: { src: string; alt: string; projectTitle: string }[] = [];

  projects.forEach(project => {
    const photoArray = category === 'before' ? project.beforePhotos : project.afterPhotos;
    photoArray.forEach(photo => {
      photos.push({
        src: photo.src,
        alt: photo.alt,
        projectTitle: project.title,
      });
    });
  });

  return photos;
};

// Get total photo count
export const getTotalPhotoCount = () => {
  return projects.reduce((total, project) =>
    total + project.beforePhotos.length + project.afterPhotos.length, 0
  );
};

// Get total project count
export const getTotalProjectCount = () => projects.length;
