import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { getCityBySlug, getAllCitySlugs, getNearbyCities, majorCities, allCities } from '@/lib/data/cities';
import { allServices, mainServices } from '@/lib/data/services';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  params: Promise<{ citySlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const city = getCityBySlug(resolvedParams.citySlug);

  if (!city) {
    return { title: 'Seite nicht gefunden' };
  }

  const title = `Sanierung in ${city.name} | Kernsanierung, Badsanierung & Modernisierung | RD Frankenbau`;
  const description = `Professionelle Sanierung in ${city.name} (${city.region}): Kernsanierung, Badsanierung, Modernisierung und Innenausbau. Ihr lokaler Partner mit 10+ Jahren Erfahrung. Festpreisgarantie & kostenlose Beratung!`;

  return {
    title,
    description,
    keywords: [
      `Sanierung ${city.name}`,
      `Kernsanierung ${city.name}`,
      `Badsanierung ${city.name}`,
      `Renovierung ${city.name}`,
      `Modernisierung ${city.name}`,
      `Handwerker ${city.name}`,
      `Sanierungsfirma ${city.name}`,
      `Wohnungssanierung ${city.name}`,
      `Altbausanierung ${city.name}`,
      city.region,
      city.district || ''
    ].filter(Boolean),
    openGraph: {
      title: `Sanierung in ${city.name} | RD Frankenbau`,
      description: `Hochwertige Sanierung in ${city.name}. Kernsanierung, Badsanierung und Modernisierung von RD Frankenbau – Ihrem lokalen Experten.`,
      type: 'website',
    },
    alternates: {
      canonical: `https://rd-frankenbau.de/${resolvedParams.citySlug}`,
    },
  };
}

export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({
    citySlug: slug,
  }));
}

// City-specific FAQs
function getCityFAQs(cityName: string, region: string, district?: string) {
  return [
    {
      question: `Sind Sie als Sanierungsfirma auch in ${cityName} tätig?`,
      answer: `Ja, wir sind in ${cityName} und der gesamten Region ${region}${district ? ` (${district})` : ''} aktiv. Unser Einzugsgebiet umfasst einen Radius von etwa 100 km um Nürnberg. Wir führen regelmäßig Projekte in ${cityName} durch und kennen die lokalen Gegebenheiten bestens.`
    },
    {
      question: `Wie schnell können Sie mit einer Sanierung in ${cityName} beginnen?`,
      answer: `Nach der Erstberatung und Angebotsannahme können wir in der Regel innerhalb von 2-4 Wochen mit Ihrem Projekt in ${cityName} starten. Bei dringenden Projekten finden wir oft auch kurzfristigere Lösungen.`
    },
    {
      question: `Was kostet eine Sanierung in ${cityName}?`,
      answer: `Die Kosten hängen vom Umfang und der gewünschten Ausstattung ab. Eine Kernsanierung kostet typischerweise 800-1.500€/m², eine Badsanierung 8.000-25.000€. Wir erstellen Ihnen gerne ein individuelles Festpreisangebot für Ihr Objekt in ${cityName}.`
    },
    {
      question: `Bieten Sie eine kostenlose Beratung in ${cityName} an?`,
      answer: `Ja, die Erstberatung ist bei uns immer kostenlos. Wir kommen gerne zu Ihnen nach ${cityName}, besichtigen Ihr Objekt und besprechen Ihre Wünsche und Möglichkeiten vor Ort.`
    },
    {
      question: `Welche Garantie geben Sie auf Ihre Arbeiten?`,
      answer: `Wir gewähren auf alle unsere Arbeiten die gesetzliche Gewährleistung von 5 Jahren. Bei vielen Materialien wie Fenstern oder Sanitärobjekten gelten zusätzlich die Herstellergarantien.`
    },
    {
      question: `Koordinieren Sie alle Gewerke bei der Sanierung?`,
      answer: `Ja, als Generalunternehmer übernehmen wir die komplette Koordination aller Gewerke - Elektro, Sanitär, Trockenbau, Fliesen, Maler und mehr. Sie haben einen einzigen Ansprechpartner für Ihr gesamtes Sanierungsprojekt in ${cityName}.`
    }
  ];
}

// Get unique city intro based on city characteristics
function getCityIntro(cityName: string, region: string, district?: string, population?: number, description?: string): string {
  if (description) {
    return `${cityName} - ${description}. Als Ihr lokaler Partner für hochwertige Sanierungen sind wir in ${cityName} und der gesamten Region ${region} für Sie da. Ob Altbau oder Neubau, kleine Wohnung oder großes Mehrfamilienhaus - wir realisieren Ihr Sanierungsprojekt mit Struktur, Qualität und Festpreisgarantie.`;
  }

  if (population && population > 50000) {
    return `Als eine der größeren Städte in ${region} hat ${cityName} eine vielfältige Bausubstanz - von historischen Altbauten bis zu modernen Neubauten. RD Frankenbau ist Ihr erfahrener Partner für alle Sanierungsarbeiten in ${cityName}. Wir kennen die lokalen Gegebenheiten und bieten maßgeschneiderte Lösungen für Ihre Immobilie.`;
  }

  return `In ${cityName}${district ? ` (${district})` : ''} sind wir Ihr verlässlicher Partner für professionelle Sanierungsarbeiten. Als etabliertes Unternehmen aus der Region kennen wir die Bausubstanz und Besonderheiten in ${region} genau und setzen Ihr Projekt termingerecht und in höchster Qualität um.`;
}

// Process steps for city
const processSteps = [
  {
    number: "01",
    title: "Kostenlose Erstberatung",
    description: "Wir besichtigen Ihr Objekt vor Ort und besprechen Ihre Wünsche und Möglichkeiten."
  },
  {
    number: "02",
    title: "Detailliertes Angebot",
    description: "Sie erhalten ein transparentes Festpreisangebot mit allen Leistungen und Kosten."
  },
  {
    number: "03",
    title: "Professionelle Umsetzung",
    description: "Unsere erfahrenen Teams setzen Ihr Projekt termingerecht und in höchster Qualität um."
  },
  {
    number: "04",
    title: "Schlüsselfertige Übergabe",
    description: "Nach Qualitätskontrolle übergeben wir Ihnen Ihre fertig sanierte Immobilie."
  }
];

export default async function CityPage({ params }: Props) {
  const resolvedParams = await params;
  const city = getCityBySlug(resolvedParams.citySlug);

  if (!city) {
    notFound();
  }

  const nearbyCities = getNearbyCities(resolvedParams.citySlug, 8);
  const faqs = getCityFAQs(city.name, city.region, city.district);
  const cityIntro = getCityIntro(city.name, city.region, city.district, city.population, city.description);

  // Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://rd-frankenbau.de/${resolvedParams.citySlug}#business`,
    name: `RD Frankenbau - Sanierung ${city.name}`,
    description: `Professionelle Sanierung in ${city.name}`,
    url: `https://rd-frankenbau.de/${resolvedParams.citySlug}`,
    telephone: "+49176 35589478",
    email: "Info@rd-frankenbau.de",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nürnberg",
      addressRegion: "Bayern",
      addressCountry: "DE"
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: city.region
      }
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Sanierungsleistungen in ${city.name}`,
      itemListElement: allServices.map(service => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${service.name} in ${city.name}`,
          description: service.shortDescription
        }
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
          {/* Background Pattern */}
          <div className="absolute inset-0 hero-bg-pattern opacity-50" />

          <div className="container-custom relative z-10 py-16 md:py-24 lg:py-32">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-primary transition-colors">Startseite</Link>
                <span className="text-muted-foreground/50">/</span>
                <Link href="/regionen" className="hover:text-primary transition-colors">Regionen</Link>
                <span className="text-muted-foreground/50">/</span>
                <span className="text-foreground font-medium">{city.name}</span>
              </nav>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {city.region}
                </div>
                {city.district && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-sm font-medium">
                    {city.district}
                  </div>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary mb-6">
                Sanierung in<br />
                <span className="text-gradient-gold">{city.name}</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                {cityIntro}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/kontakt">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/20">
                    Kostenlose Beratung in {city.name}
                    <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button>
                </Link>
                <a href="tel:+4917635589478">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <svg className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    0176 35589478
                  </Button>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Kostenlose Erstberatung</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Festpreisgarantie</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>10+ Jahre Erfahrung</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Lokaler Partner</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-secondary/30 border-y border-border">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-amber-600 mb-1">10+</div>
                <p className="text-sm text-muted-foreground">Jahre Erfahrung in {city.region}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-amber-600 mb-1">500+</div>
                <p className="text-sm text-muted-foreground">Realisierte Projekte</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-amber-600 mb-1">100%</div>
                <p className="text-sm text-muted-foreground">Kundenzufriedenheit</p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-amber-600 mb-1">5.0</div>
                <p className="text-sm text-muted-foreground">Google Bewertung</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Services Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="text-center mb-12">
              <p className="text-sm font-medium text-amber-600 mb-3 tracking-wider uppercase">Unsere Kernleistungen</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
                Sanierungsleistungen in {city.name}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Drei Leistungsbereiche, ein Ziel: Ihre Immobilie in {city.name} in besten Händen.
              </p>
            </div>

            {/* Main Services */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
              {mainServices.map((service, index) => (
                <Link
                  key={service.slug}
                  href={`/${resolvedParams.citySlug}/${service.slug}`}
                  className="group"
                >
                  <article className="relative h-full bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="absolute top-4 right-4 text-7xl font-bold text-primary/5">
                      {index + 1}
                    </div>
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-6">
                        <svg className="w-7 h-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {service.slug === 'kernsanierung' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          )}
                          {service.slug === 'badsanierung' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          )}
                          {service.slug === 'modernisierung' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          )}
                        </svg>
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-amber-600 transition-colors">
                        {service.name} in {city.name}
                      </h3>
                      <p className="text-muted-foreground mb-6 line-clamp-3">
                        {service.shortDescription}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {service.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <span className="inline-flex items-center text-amber-600 font-medium group-hover:text-amber-700">
                        Mehr erfahren
                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* All Services Grid */}
            <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-6">Alle Leistungen in {city.name}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {allServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/${resolvedParams.citySlug}/${service.slug}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-amber-600 transition-colors">
                      {service.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section-padding bg-secondary/20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <p className="text-sm font-medium text-amber-600 mb-3 tracking-wider uppercase">Unser Ablauf</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
                So läuft Ihre Sanierung in {city.name} ab
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Von der ersten Beratung bis zur Übergabe - strukturiert, transparent und termingerecht.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div key={step.number} className="relative">
                  <div className="bg-card rounded-2xl p-6 border border-border h-full hover:border-amber-500/50 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <p className="text-sm font-medium text-amber-600 mb-3 tracking-wider uppercase">Warum RD Frankenbau</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
                  Ihr lokaler Sanierungspartner in {city.name}
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Als etabliertes Sanierungsunternehmen kennen wir die Bausubstanz und Besonderheiten in {city.name} und {city.region} genau.
                  Seit über 10 Jahren realisieren wir erfolgreiche Sanierungsprojekte in der Region - von der Altbauwohnung bis zum Mehrfamilienhaus.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Festpreisgarantie</h3>
                      <p className="text-sm text-muted-foreground">Keine versteckten Kosten. Der vereinbarte Preis gilt.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Termintreue</h3>
                      <p className="text-sm text-muted-foreground">Wir halten unsere Zusagen. Pünktliche Fertigstellung.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Ein Ansprechpartner</h3>
                      <p className="text-sm text-muted-foreground">Wir koordinieren alle Gewerke für Sie.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Premium-Qualität</h3>
                      <p className="text-sm text-muted-foreground">Hochwertige Materialien und präzise Ausführung.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-amber-500/5 rounded-3xl p-8 lg:p-10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Jetzt Projekt anfragen</h3>
                  <p className="text-muted-foreground">Kostenlose Beratung in {city.name}</p>
                </div>
                <div className="space-y-4">
                  <Link href="/kontakt" className="block">
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-6 text-lg">
                      Kostenlose Beratung
                      <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Button>
                  </Link>
                  <a href="tel:+4917635589478" className="block">
                    <Button variant="outline" className="w-full py-6 text-lg">
                      <svg className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      0176 35589478
                    </Button>
                  </a>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Kostenlos
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Unverbindlich
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding bg-secondary/20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-sm font-medium text-amber-600 mb-3 tracking-wider uppercase">Häufige Fragen</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
                  Fragen zur Sanierung in {city.name}
                </h2>
              </div>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card rounded-xl border border-border px-6"
                  >
                    <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Nearby Cities Section */}
        {nearbyCities.length > 0 && (
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
                  Auch in Ihrer Nähe aktiv
                </h2>
                <p className="text-muted-foreground">
                  Neben {city.name} sind wir auch in diesen Städten für Sie da:
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {nearbyCities.map((nearbyCity) => (
                  <Link
                    key={nearbyCity.slug}
                    href={`/${nearbyCity.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-card rounded-full border border-border text-sm font-medium text-foreground hover:border-amber-500/50 hover:text-amber-600 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {nearbyCity.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 text-white">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="container-custom relative z-10 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Bereit für Ihr Sanierungsprojekt in {city.name}?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Kontaktieren Sie uns für eine kostenlose Erstberatung. Wir freuen uns darauf,
                Ihr Projekt in {city.name} zu besprechen und ein individuelles Angebot für Sie zu erstellen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 shadow-xl">
                    Kostenlose Beratung anfragen
                    <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button>
                </Link>
                <a href="tel:+4917635589478">
                  <Button size="lg" className="w-full sm:w-auto bg-transparent border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60">
                    <svg className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Jetzt anrufen
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
