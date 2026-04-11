import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { getCityBySlug, getAllCitySlugs, getNearbyCities } from '@/lib/data/cities';
import { mainServices, allServices } from '@/lib/data/services';

interface Props {
  params: Promise<{ citySlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const city = getCityBySlug(resolvedParams.citySlug);

  if (!city) {
    return {
      title: 'Seite nicht gefunden',
    };
  }

  return {
    title: `Sanierung in ${city.name} | Kernsanierung & Modernisierung`,
    description: `Professionelle Sanierung in ${city.name}: Kernsanierung, Badsanierung, Modernisierung und Innenausbau. RD Frankenbau - Ihr Partner für hochwertige Sanierung in ${city.region}.`,
    openGraph: {
      title: `Sanierung in ${city.name} | RD Frankenbau`,
      description: `Hochwertige Sanierung in ${city.name}. Kernsanierung, Badsanierung und Modernisierung von RD Frankenbau.`,
    },
  };
}

export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({
    citySlug: slug,
  }));
}

export default async function CityPage({ params }: Props) {
  const resolvedParams = await params;
  const city = getCityBySlug(resolvedParams.citySlug);

  if (!city) {
    notFound();
  }

  const nearbyCities = getNearbyCities(resolvedParams.citySlug, 6);

  // Structured Data for LocalBusiness + Service
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "RD Frankenbau",
    description: `Professionelle Sanierung in ${city.name}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.region,
      addressCountry: "DE"
    },
    areaServed: {
      "@type": "City",
      name: city.name
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Sanierungsleistungen in ${city.name}`,
      itemListElement: mainServices.map(service => ({
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
      <main className="pt-24">
        {/* Hero Section */}
        <section className="section-padding-sm bg-stone-gradient">
          <div className="container-custom">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Link href="/" className="hover:text-primary">Startseite</Link>
                <span>/</span>
                <span className="text-foreground">{city.name}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-primary mb-6">
                Sanierung in {city.name}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Professionelle Sanierung, Modernisierung und Innenausbau in {city.name} und {city.region}.
                RD Frankenbau ist Ihr Partner für hochwertige Sanierungsprojekte – mit Struktur,
                Qualität und dem Ziel, den Wert Ihrer Immobilie nachhaltig zu steigern.
              </p>
            </div>
          </div>
        </section>

        {/* Services for this city */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-2xl sm:text-3xl text-primary mb-8">
              Unsere Leistungen in {city.name}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allServices.slice(0, 9).map((service) => (
                <Link
                  key={service.slug}
                  href={`/${resolvedParams.citySlug}/${service.slug}`}
                  className="group"
                >
                  <article className="h-full bg-secondary/30 rounded-xl p-6 hover:bg-secondary/50 transition-all duration-300 hover:shadow-md">
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {service.name} in {city.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* About the city */}
        <section className="section-padding bg-secondary/20">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl text-primary mb-6">
                Sanierung und Modernisierung in {city.name}
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  {city.name} in {city.region} bietet eine Vielzahl von Immobilien mit Sanierungspotential.
                  Ob Altbauwohnung, Einfamilienhaus oder Mehrfamilienhaus – wir sind Ihr erfahrener Partner
                  für alle Sanierungsprojekte in der Region.
                </p>
                <p>
                  Als lokaler Sanierungsexperte kennen wir die Besonderheiten der Bausubstanz in {city.name}
                  und {city.region}. Wir beraten Sie individuell und erstellen maßgeschneiderte Konzepte
                  für Ihre Immobilie.
                </p>
                <p>
                  Von der ersten Beratung über die Planung bis zur schlüsselfertigen Übergabe –
                  bei RD Frankenbau erhalten Sie alles aus einer Hand. Kontaktieren Sie uns für
                  eine kostenlose Erstberatung in {city.name}.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby cities */}
        {nearbyCities.length > 0 && (
          <section className="section-padding bg-white">
            <div className="container-custom">
              <h2 className="text-2xl sm:text-3xl text-primary mb-8">
                Auch aktiv in der Umgebung
              </h2>
              <div className="flex flex-wrap gap-3">
                {nearbyCities.map((nearbyCity) => (
                  <Link
                    key={nearbyCity.slug}
                    href={`/${nearbyCity.slug}`}
                    className="px-4 py-2 bg-secondary/50 rounded-full text-sm font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors"
                  >
                    Sanierung in {nearbyCity.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl sm:text-4xl text-white mb-6">
              Ihr Sanierungsprojekt in {city.name}
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Kontaktieren Sie uns für eine kostenlose Erstberatung.
              Wir freuen uns auf Ihr Projekt in {city.name}.
            </p>
            <Link href="/kontakt">
              <Button size="lg" variant="secondary" className="shadow-lg">
                Kostenlose Beratung anfragen
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
