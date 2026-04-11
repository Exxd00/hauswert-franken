import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { getCityBySlug, getAllCitySlugs, getNearbyCities } from '@/lib/data/cities';
import { getServiceBySlug, getAllServiceSlugs } from '@/lib/data/services';

interface Props {
  params: Promise<{ citySlug: string; serviceSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const city = getCityBySlug(resolvedParams.citySlug);
  const service = getServiceBySlug(resolvedParams.serviceSlug);

  if (!city || !service) {
    return {
      title: 'Seite nicht gefunden',
    };
  }

  return {
    title: `${service.name} in ${city.name} | RD Frankenbau`,
    description: `${service.name} in ${city.name}: ${service.shortDescription} RD Frankenbau - Ihr Experte für ${service.name} in ${city.region}.`,
    openGraph: {
      title: `${service.name} in ${city.name} | RD Frankenbau`,
      description: `${service.shortDescription} Professionelle Ausführung in ${city.name} und ${city.region}.`,
    },
  };
}

export async function generateStaticParams() {
  const citySlugs = getAllCitySlugs();
  const serviceSlugs = getAllServiceSlugs();

  const params: { citySlug: string; serviceSlug: string }[] = [];

  // Generate only for major cities to keep build time reasonable
  // In production, you'd use ISR or on-demand generation
  for (const citySlug of citySlugs.slice(0, 20)) {
    for (const serviceSlug of serviceSlugs) {
      params.push({ citySlug, serviceSlug });
    }
  }

  return params;
}

export default async function CityServicePage({ params }: Props) {
  const resolvedParams = await params;
  const city = getCityBySlug(resolvedParams.citySlug);
  const service = getServiceBySlug(resolvedParams.serviceSlug);

  if (!city || !service) {
    notFound();
  }

  const nearbyCities = getNearbyCities(resolvedParams.citySlug, 4);

  // Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} in ${city.name}`,
    description: service.longDescription,
    provider: {
      "@type": "LocalBusiness",
      name: "RD Frankenbau",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nürnberg",
        addressRegion: "Bayern",
        addressCountry: "DE"
      }
    },
    areaServed: {
      "@type": "City",
      name: city.name
    },
    serviceType: service.name
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
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 flex-wrap">
                <Link href="/" className="hover:text-primary">Startseite</Link>
                <span>/</span>
                <Link href={`/${resolvedParams.citySlug}`} className="hover:text-primary">{city.name}</Link>
                <span>/</span>
                <span className="text-foreground">{service.name}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl text-primary mb-6">
                {service.name} in {city.name}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {service.shortDescription} RD Frankenbau ist Ihr Experte für {service.name.toLowerCase()}
                in {city.name} und {city.region}.
              </p>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-2xl sm:text-3xl text-primary mb-6">
                  {service.name} vom Experten
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                  <p>{service.longDescription}</p>
                  <p>
                    In {city.name} und der gesamten Region {city.region} sind wir Ihr zuverlässiger
                    Partner für hochwertige {service.name.toLowerCase()}. Mit unserem Qualitätsanspruch
                    setzen wir Ihr Projekt professionell um.
                  </p>
                </div>

                {/* Features */}
                {service.features && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Unsere Leistungen im Bereich {service.name}
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-muted-foreground">
                          <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Benefits */}
                {service.benefits && (
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Ihre Vorteile
                    </h3>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3 text-muted-foreground">
                          <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div>
                <div className="bg-secondary/30 rounded-2xl p-8 sticky top-32">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Projekt in {city.name}?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Kontaktieren Sie uns für eine kostenlose Erstberatung zu Ihrem
                    {' '}{service.name.toLowerCase()}-Projekt.
                  </p>
                  <Link href="/kontakt">
                    <Button className="w-full mb-4">
                      Kostenlos anfragen
                    </Button>
                  </Link>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">oder rufen Sie an:</p>
                    <a
                      href="tel:+4917635589478"
                      className="text-lg font-semibold text-primary hover:underline"
                    >
                      0176 35589478
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Same service in nearby cities */}
        {nearbyCities.length > 0 && (
          <section className="section-padding bg-secondary/20">
            <div className="container-custom">
              <h2 className="text-2xl sm:text-3xl text-primary mb-8">
                {service.name} auch in der Umgebung
              </h2>
              <div className="flex flex-wrap gap-3">
                {nearbyCities.map((nearbyCity) => (
                  <Link
                    key={nearbyCity.slug}
                    href={`/${nearbyCity.slug}/${resolvedParams.serviceSlug}`}
                    className="px-4 py-2 bg-white rounded-full text-sm font-medium text-foreground hover:bg-primary hover:text-white transition-colors shadow-sm"
                  >
                    {service.name} in {nearbyCity.name}
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
              {service.name} in {city.name}
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Wir freuen uns auf Ihr Projekt. Kontaktieren Sie uns noch heute
              für eine kostenlose Erstberatung.
            </p>
            <Link href="/kontakt">
              <Button size="lg" variant="secondary" className="shadow-lg">
                Jetzt Projekt anfragen
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
