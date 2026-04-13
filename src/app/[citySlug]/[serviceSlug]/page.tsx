import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { getCityBySlug, getAllCitySlugs, getNearbyCities } from '@/lib/data/cities';
import { getServiceBySlug, getAllServiceSlugs, allServices } from '@/lib/data/services';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  params: Promise<{ citySlug: string; serviceSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const city = getCityBySlug(resolvedParams.citySlug);
  const service = getServiceBySlug(resolvedParams.serviceSlug);

  if (!city || !service) {
    return { title: 'Seite nicht gefunden' };
  }

  const title = `${service.name} in ${city.name} | Professionelle ${service.name} - RD Frankenbau`;
  const description = `${service.name} in ${city.name} (${city.region}): ${service.shortDescription} Kostenlose Beratung vom Experten. RD Frankenbau - Ihr lokaler Partner für ${service.name}.`;

  return {
    title,
    description,
    keywords: [
      `${service.name} ${city.name}`,
      `${service.slug} ${city.name}`,
      `${service.name} ${city.region}`,
      ...service.keywords.map(k => `${k} ${city.name}`),
      `Handwerker ${city.name}`,
      `Sanierung ${city.name}`
    ],
    openGraph: {
      title,
      description: `${service.shortDescription} Professionelle Ausführung in ${city.name} und ${city.region}.`,
      type: 'website',
    },
    alternates: {
      canonical: `https://rd-frankenbau.de/${resolvedParams.citySlug}/${resolvedParams.serviceSlug}`,
    },
  };
}

export async function generateStaticParams() {
  const citySlugs = getAllCitySlugs();
  const serviceSlugs = getAllServiceSlugs();

  const params: { citySlug: string; serviceSlug: string }[] = [];

  // Generate for first 30 cities to keep build time reasonable
  // ISR will handle the rest
  for (const citySlug of citySlugs.slice(0, 30)) {
    for (const serviceSlug of serviceSlugs) {
      params.push({ citySlug, serviceSlug });
    }
  }

  return params;
}

// Generate city-specific FAQs for the service
function getServiceCityFAQs(cityName: string, serviceName: string, region: string) {
  return [
    {
      question: `Was kostet ${serviceName} in ${cityName}?`,
      answer: `Die Kosten für ${serviceName} in ${cityName} variieren je nach Umfang und Ausstattung. Wir erstellen Ihnen ein individuelles Festpreisangebot nach einer kostenlosen Besichtigung vor Ort. So wissen Sie genau, mit welchen Kosten Sie rechnen können.`
    },
    {
      question: `Wie lange dauert ${serviceName} in ${cityName}?`,
      answer: `Die Dauer der ${serviceName} hängt vom Umfang des Projekts ab. Nach der Besichtigung in ${cityName} erstellen wir einen realistischen Zeitplan. Wir halten unsere Termine zuverlässig ein.`
    },
    {
      question: `Bieten Sie eine kostenlose Beratung für ${serviceName} in ${cityName} an?`,
      answer: `Ja, die Erstberatung ist bei uns immer kostenlos. Wir kommen gerne zu Ihnen nach ${cityName}, besichtigen Ihr Objekt und besprechen alle Möglichkeiten und Ihre Wünsche.`
    },
    {
      question: `Arbeiten Sie auch in ${cityName} und ${region}?`,
      answer: `Ja, ${cityName} und die gesamte Region ${region} gehören zu unserem Einzugsgebiet. Wir realisieren regelmäßig Projekte in ${cityName} und kennen die lokalen Gegebenheiten bestens.`
    },
    {
      question: `Welche Garantie geben Sie auf ${serviceName}?`,
      answer: `Wir gewähren auf alle unsere Arbeiten die gesetzliche Gewährleistung von 5 Jahren. Bei Materialien wie Fliesen oder Sanitärobjekten gelten zusätzlich die Herstellergarantien.`
    },
    {
      question: `Koordinieren Sie alle Gewerke für ${serviceName}?`,
      answer: `Ja, als Generalunternehmer übernehmen wir die komplette Koordination aller Gewerke. Sie haben einen einzigen Ansprechpartner für Ihr gesamtes ${serviceName}-Projekt in ${cityName}.`
    }
  ];
}

// Generate unique intro text based on city and service
function getUniqueIntro(cityName: string, serviceName: string, region: string): string {
  const intros = [
    `Sie suchen einen erfahrenen Partner für ${serviceName} in ${cityName}? RD Frankenbau ist seit über 10 Jahren Ihr Spezialist für hochwertige Sanierungsarbeiten in ${region}. Unsere Expertise in ${serviceName} garantiert Ihnen erstklassige Ergebnisse.`,
    `${serviceName} in ${cityName} - professionell, termingerecht und in Premium-Qualität. Als etabliertes Sanierungsunternehmen in ${region} kennen wir die Besonderheiten der lokalen Bausubstanz und setzen Ihr Projekt mit höchster Präzision um.`,
    `Für Ihr ${serviceName}-Projekt in ${cityName} sind Sie bei RD Frankenbau in besten Händen. Wir verbinden handwerkliche Meisterleistung mit modernster Technik und liefern Ergebnisse, die überzeugen.`
  ];
  // Use city name hash for consistent but varied selection
  const index = cityName.length % intros.length;
  return intros[index];
}

export default async function CityServicePage({ params }: Props) {
  const resolvedParams = await params;
  const city = getCityBySlug(resolvedParams.citySlug);
  const service = getServiceBySlug(resolvedParams.serviceSlug);

  if (!city || !service) {
    notFound();
  }

  const nearbyCities = getNearbyCities(resolvedParams.citySlug, 6);
  const faqs = getServiceCityFAQs(city.name, service.name, city.region);
  const uniqueIntro = getUniqueIntro(city.name, service.name, city.region);

  // Get other services for cross-linking
  const otherServices = allServices.filter(s => s.slug !== service.slug).slice(0, 4);

  // Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://rd-frankenbau.de/${resolvedParams.citySlug}/${resolvedParams.serviceSlug}#service`,
    name: `${service.name} in ${city.name}`,
    description: service.longDescription,
    provider: {
      "@type": "LocalBusiness",
      name: "RD Frankenbau",
      telephone: "+49176 35589478",
      email: "Info@rd-frankenbau.de",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nürnberg",
        addressRegion: "Bayern",
        addressCountry: "DE"
      }
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: city.region
      }
    },
    serviceType: service.name,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR"
      }
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
          <div className="absolute inset-0 hero-bg-pattern opacity-50" />
          <div className="container-custom relative z-10 py-16 md:py-24 lg:py-32">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-primary transition-colors">Startseite</Link>
                <span className="text-muted-foreground/50">/</span>
                <Link href={`/${resolvedParams.citySlug}`} className="hover:text-primary transition-colors">{city.name}</Link>
                <span className="text-muted-foreground/50">/</span>
                <span className="text-foreground font-medium">{service.name}</span>
              </nav>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {city.region}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6">
                {service.name} in<br />
                <span className="text-gradient-gold">{city.name}</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                {uniqueIntro}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border">
                  <div className="text-2xl font-bold text-amber-600">10+</div>
                  <div className="text-sm text-muted-foreground">Jahre Erfahrung</div>
                </div>
                <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border">
                  <div className="text-2xl font-bold text-amber-600">500+</div>
                  <div className="text-sm text-muted-foreground">Projekte</div>
                </div>
                <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border">
                  <div className="text-2xl font-bold text-amber-600">100%</div>
                  <div className="text-sm text-muted-foreground">Zufriedenheit</div>
                </div>
                <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border">
                  <div className="text-2xl font-bold text-amber-600">5.0</div>
                  <div className="text-sm text-muted-foreground">Google Rating</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/kontakt">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/20">
                    Kostenlose Beratung
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
            </div>
          </div>
        </section>

        {/* Service Details Section */}
        <section className="section-padding bg-secondary/20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                {/* Detailed Description */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
                    {service.name} in {city.name} - Unser Versprechen
                  </h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                    <p>{service.longDescription}</p>
                    {service.detailedDescription && (
                      <div className="mt-4 whitespace-pre-line">
                        {service.detailedDescription.split('\n\n').slice(0, 2).join('\n\n')}
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                {service.features && (
                  <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border">
                    <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      Unsere Leistungen - {service.name}
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Benefits */}
                {service.benefits && (
                  <div className="bg-gradient-to-br from-primary/5 to-amber-500/5 rounded-2xl p-6 lg:p-8">
                    <h3 className="text-xl font-bold text-foreground mb-6">
                      Ihre Vorteile bei {service.name} mit RD Frankenbau
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {service.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3 bg-card/50 rounded-xl p-4">
                          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                          </div>
                          <span className="text-sm text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Card */}
                <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border sticky top-28">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {service.name} in {city.name}?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Wir beraten Sie kostenlos und unverbindlich zu Ihrem Projekt.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Link href="/kontakt" className="block">
                      <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                        Kostenlose Beratung
                        <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Button>
                    </Link>
                    <a href="tel:+4917635589478" className="block">
                      <Button variant="outline" className="w-full">
                        <svg className="mr-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        0176 35589478
                      </Button>
                    </a>
                  </div>

                  {/* Service Info */}
                  {(service.duration || service.priceRange) && (
                    <div className="mt-6 pt-6 border-t border-border space-y-3">
                      {service.duration && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Typische Dauer:</span>
                          <span className="font-medium text-foreground">{service.duration}</span>
                        </div>
                      )}
                      {service.priceRange && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Preisspanne:</span>
                          <span className="font-medium text-foreground">{service.priceRange}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Festpreis
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Garantie
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        {service.process && service.process.length > 0 && (
          <section className="section-padding bg-background">
            <div className="container-custom">
              <div className="text-center mb-12">
                <p className="text-sm font-medium text-amber-600 mb-3 tracking-wider uppercase">Unser Prozess</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
                  So läuft {service.name} in {city.name} ab
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Von der ersten Beratung bis zur Übergabe – strukturiert, transparent und termingerecht.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {service.process.slice(0, 5).map((step, index) => (
                  <div key={index} className="relative">
                    <div className="bg-card rounded-2xl p-6 border border-border h-full hover:border-amber-500/50 transition-all hover:-translate-y-1">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg mb-4">
                        {String(step.step).padStart(2, '0')}
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    {index < service.process.slice(0, 5).length - 1 && (
                      <div className="hidden xl:block absolute top-1/2 -right-3 transform -translate-y-1/2">
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
        )}

        {/* FAQ Section */}
        <section className="section-padding bg-secondary/20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-sm font-medium text-amber-600 mb-3 tracking-wider uppercase">Häufige Fragen</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
                  FAQ: {service.name} in {city.name}
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

        {/* Other Services Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
                Weitere Leistungen in {city.name}
              </h2>
              <p className="text-muted-foreground">
                Neben {service.name} bieten wir auch diese Leistungen an:
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherServices.map((otherService) => (
                <Link
                  key={otherService.slug}
                  href={`/${resolvedParams.citySlug}/${otherService.slug}`}
                  className="group"
                >
                  <div className="bg-card rounded-2xl p-6 border border-border hover:border-amber-500/50 transition-all hover:-translate-y-1 h-full">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-amber-600 transition-colors">
                      {otherService.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {otherService.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby Cities Section */}
        {nearbyCities.length > 0 && (
          <section className="section-padding bg-secondary/20">
            <div className="container-custom">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
                  {service.name} auch in der Umgebung
                </h2>
                <p className="text-muted-foreground">
                  Wir bieten {service.name} auch in diesen Städten an:
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {nearbyCities.map((nearbyCity) => (
                  <Link
                    key={nearbyCity.slug}
                    href={`/${nearbyCity.slug}/${resolvedParams.serviceSlug}`}
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
                {service.name} in {city.name}?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Kontaktieren Sie uns für eine kostenlose Erstberatung. Wir freuen uns darauf,
                Ihr {service.name.toLowerCase()}-Projekt in {city.name} zu besprechen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 shadow-xl">
                    Jetzt anfragen
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
