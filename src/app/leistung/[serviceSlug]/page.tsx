import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { getServiceBySlug, getAllServiceSlugs, allServices } from '@/lib/data/services';
import { majorCities } from '@/lib/data/cities';

interface Props {
  params: Promise<{ serviceSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.serviceSlug);

  if (!service) {
    return {
      title: 'Seite nicht gefunden',
    };
  }

  return {
    title: `${service.name} | RD Frankenbau`,
    description: `${service.name}: ${service.longDescription.slice(0, 155)}...`,
    openGraph: {
      title: `${service.name} | RD Frankenbau`,
      description: service.shortDescription,
    },
  };
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({
    serviceSlug: slug,
  }));
}

export default async function ServicePage({ params }: Props) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.serviceSlug);

  if (!service) {
    notFound();
  }

  const otherServices = allServices.filter(s => s.slug !== resolvedParams.serviceSlug).slice(0, 6);

  // Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
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
      "@type": "State",
      name: "Franken"
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
      <main className="pt-20 sm:pt-24">
        {/* Hero Section - Mobile Compact */}
        <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-br from-stone-50 via-amber-50/20 to-stone-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900">
          <div className="container-custom">
            <div className="max-w-4xl">
              {/* Breadcrumb - Scrollable on Mobile */}
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-4 sm:mb-6 overflow-x-auto whitespace-nowrap pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
                <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Startseite</Link>
                <span className="text-stone-300 dark:text-stone-600">/</span>
                <Link href="/leistungen" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Leistungen</Link>
                <span className="text-stone-300 dark:text-stone-600">/</span>
                <span className="text-stone-800 dark:text-white font-medium">{service.name}</span>
              </div>

              {/* Service Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-xs sm:text-sm font-medium mb-4">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Premium Leistung
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-stone-800 dark:text-white mb-4 sm:mb-6 tracking-tight">
                {service.name}
              </h1>
              <p className="text-sm sm:text-lg lg:text-xl text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl">
                {service.shortDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Service Details - Mobile Optimized */}
        <section className="py-10 sm:py-16 lg:py-20 bg-white dark:bg-stone-950">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2 space-y-8 sm:space-y-10">
                {/* Description */}
                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-stone-800 dark:text-white mb-4 sm:mb-6">
                    {service.name} von RD Frankenbau
                  </h2>
                  <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed">
                    <p>{service.longDescription}</p>
                    <p className="hidden sm:block">
                      Als spezialisierte Sanierungsfirma in Franken bieten wir {service.name.toLowerCase()} in höchster Qualität. Mit unserem Anspruch an Perfektion garantieren wir Ihnen ein Ergebnis, das Sie begeistern wird.
                    </p>
                  </div>
                </div>

                {/* Features - Full Display (Customer Selected This Service) */}
                {service.features && (
                  <div className="bg-gradient-to-br from-stone-50 to-amber-50/30 dark:from-stone-800 dark:to-stone-800/50 rounded-2xl p-5 sm:p-8 border border-stone-100 dark:border-stone-700">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-stone-800 dark:text-white">
                        Leistungsumfang
                      </h3>
                    </div>
                    <ul className="grid gap-2 sm:gap-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm sm:text-base text-stone-700 dark:text-stone-300">
                          <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mt-0.5">
                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Benefits */}
                {service.benefits && (
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-stone-800 dark:text-white mb-4 sm:mb-6 flex items-center gap-3">
                      <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      Ihre Vorteile
                    </h3>
                    <ul className="space-y-3 sm:space-y-4">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3 text-sm sm:text-base text-stone-600 dark:text-stone-400">
                          <svg className="w-5 h-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Regions */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-stone-800 dark:text-white mb-4 sm:mb-6">
                    {service.name} in Ihrer Nähe
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {majorCities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/${city.slug}/${resolvedParams.serviceSlug}`}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-stone-100 dark:bg-stone-800 rounded-full text-xs sm:text-sm text-stone-700 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                      >
                        {city.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar - Sticky on Desktop, Bottom Sheet Style on Mobile */}
              <div>
                <div className="bg-gradient-to-br from-stone-900 to-stone-800 dark:from-stone-800 dark:to-stone-700 rounded-2xl p-5 sm:p-8 sticky top-28 shadow-xl">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                    Projekt anfragen
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 mb-5 sm:mb-6">
                    Kostenlose Erstberatung zu Ihrem {service.name.toLowerCase()}-Projekt.
                  </p>
                  <Link href="/kontakt" className="block mb-4">
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-900 font-semibold py-5 sm:py-6 rounded-xl sm:rounded-2xl text-sm sm:text-base shadow-lg shadow-amber-500/20">
                      Kostenlos anfragen
                      <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Button>
                  </Link>
                  <div className="text-center pt-4 border-t border-white/10">
                    <p className="text-xs sm:text-sm text-white/50 mb-2">oder rufen Sie an:</p>
                    <a
                      href="tel:+4917635589478"
                      className="inline-flex items-center gap-2 text-base sm:text-lg font-semibold text-white hover:text-amber-400 transition-colors"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      0176 35589478
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Services - Horizontal Scroll on Mobile */}
        <section className="py-10 sm:py-16 lg:py-20 bg-stone-50 dark:bg-stone-900">
          <div className="container-custom">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-stone-800 dark:text-white mb-6 sm:mb-8">
              Weitere Leistungen
            </h2>
            {/* Mobile: Horizontal Scroll */}
            <div className="sm:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
                {otherServices.slice(0, 4).map((otherService) => (
                  <Link
                    key={otherService.slug}
                    href={`/leistung/${otherService.slug}`}
                    className="group w-64 flex-shrink-0"
                  >
                    <article className="h-full bg-white dark:bg-stone-800 rounded-xl p-5 shadow-sm border border-stone-100 dark:border-stone-700 hover:shadow-md transition-all">
                      <h3 className="text-base font-semibold text-stone-800 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {otherService.name}
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                        {otherService.shortDescription}
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
            {/* Desktop: Grid */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherServices.map((otherService) => (
                <Link
                  key={otherService.slug}
                  href={`/leistung/${otherService.slug}`}
                  className="group"
                >
                  <article className="h-full bg-white dark:bg-stone-800 rounded-xl p-6 shadow-sm border border-stone-100 dark:border-stone-700 hover:shadow-lg transition-all duration-300">
                    <h3 className="text-lg font-semibold text-stone-800 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {otherService.name}
                    </h3>
                    <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                      {otherService.shortDescription}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Compact on Mobile */}
        <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900">
          <div className="container-custom text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
              {service.name} von Experten
            </h2>
            <p className="text-sm sm:text-lg text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Kontaktieren Sie uns für eine kostenlose Erstberatung.
            </p>
            <Link href="/kontakt">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-900 font-semibold rounded-xl sm:rounded-2xl px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base shadow-xl shadow-amber-500/20">
                Jetzt Projekt anfragen
                <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
