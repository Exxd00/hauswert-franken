import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { allServices } from '@/lib/data/services';

export const metadata: Metadata = {
  title: 'Unsere Leistungen',
  description: 'Entdecken Sie unsere Sanierungsleistungen: Kernsanierung, Badsanierung, Modernisierung, Trockenbau, Malerarbeiten und mehr. Hochwertige Ausführung in Franken.',
};

const serviceIcons: Record<string, React.ReactNode> = {
  building: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  droplet: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  home: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  layers: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  paintbrush: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  ),
  grid: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  square: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
    </svg>
  ),
  door: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
    </svg>
  ),
  scissors: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
    </svg>
  ),
  'building-2': (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  house: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  zap: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  droplets: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  flame: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
  ),
  gas: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3c-1.5 2-3 4.5-3 7a3 3 0 106 0c0-2.5-1.5-5-3-7z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21c-4 0-7-2.5-7-6 0-2.5 1.5-4.5 3-6 .5 1.5 1.5 3 2.5 4 .5-1 1-2 1.5-3 .5 1 1 2 1.5 3 1-1 2-2.5 2.5-4 1.5 1.5 3 3.5 3 6 0 3.5-3 6-7 6z" />
    </svg>
  ),
};

function getIcon(iconName: string) {
  return serviceIcons[iconName] || serviceIcons.building;
}

export default function LeistungenPage() {
  const mainServicesData = allServices.filter(s => s.isMainService);
  const otherServicesData = allServices.filter(s => !s.isMainService);

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="section-padding-sm bg-stone-gradient">
          <div className="container-custom">
            <div className="max-w-3xl">
              <span className="inline-block text-sm font-medium text-primary/80 uppercase tracking-wider mb-4">
                Unsere Leistungen
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-primary mb-6">
                Sanierung mit Anspruch
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Von der Kernsanierung bis zum Innenausbau – wir bieten alle Leistungen für
                die hochwertige Sanierung und Modernisierung Ihrer Immobilie.
              </p>
            </div>
          </div>
        </section>

        {/* Main Services */}
        <section className="py-8 sm:py-12 lg:py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-primary mb-6 sm:mb-8 lg:mb-12">
              Kernleistungen
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
              {mainServicesData.map((service) => (
                <Link
                  key={service.slug}
                  href={`/leistung/${service.slug}`}
                  className="group"
                >
                  <article className="h-full bg-secondary/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover:bg-secondary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-7 sm:[&>svg]:h-7 lg:[&>svg]:w-8 lg:[&>svg]:h-8">
                      {getIcon(service.icon)}
                    </div>
                    <h3 className="text-sm sm:text-lg lg:text-xl font-semibold text-foreground mb-1 sm:mb-2 lg:mb-3 group-hover:text-primary transition-colors leading-tight">
                      {service.name}
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4 lg:mb-6 line-clamp-2 sm:line-clamp-none">
                      {service.shortDescription}
                    </p>
                    <div className="flex items-center gap-1 sm:gap-2 text-primary font-medium text-xs sm:text-sm lg:text-base">
                      <span>Details</span>
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Other Services */}
        <section className="section-padding bg-secondary/20">
          <div className="container-custom">
            <h2 className="text-2xl sm:text-3xl text-primary mb-12">
              Weitere Leistungen
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {otherServicesData.map((service) => (
                <Link
                  key={service.slug}
                  href={`/leistung/${service.slug}`}
                  className="group"
                >
                  <article className="h-full bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-7 sm:[&>svg]:h-7">
                      {getIcon(service.icon)}
                    </div>
                    <h3 className="text-sm sm:text-lg font-semibold text-foreground mb-1 sm:mb-2 group-hover:text-primary transition-colors leading-tight">
                      {service.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {service.shortDescription}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl sm:text-4xl text-white mb-6">
              Ihr Projekt besprechen?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Kontaktieren Sie uns für eine kostenlose Erstberatung.
              Wir analysieren Ihren Bedarf und erstellen ein individuelles Angebot.
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
