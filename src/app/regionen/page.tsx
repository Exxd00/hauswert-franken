import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { allCities, majorCities, cityRegions, getAllCitySlugs } from '@/lib/data/cities';
import { allServices, mainServices } from '@/lib/data/services';

export const metadata: Metadata = {
  title: 'Unsere Regionen | Sanierung in Franken und Umgebung - RD Frankenbau',
  description: `Professionelle Sanierung in über ${allCities.length} Städten und Gemeinden. Von Nürnberg über Bamberg bis Würzburg - RD Frankenbau ist Ihr lokaler Partner für Kernsanierung, Badsanierung und Modernisierung.`,
  keywords: [
    'Sanierung Franken',
    'Handwerker Mittelfranken',
    'Sanierung Oberfranken',
    'Renovierung Unterfranken',
    'Badsanierung Nürnberg',
    'Kernsanierung Bayern'
  ],
  openGraph: {
    title: 'Unsere Regionen | RD Frankenbau',
    description: `Sanierungsexperte für über ${allCities.length} Städte in Franken und Umgebung.`,
    type: 'website',
  },
  alternates: {
    canonical: 'https://rd-frankenbau.de/regionen',
  },
};

export default function RegionenPage() {
  const totalPages = allCities.length + (allCities.length * allServices.length);

  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="absolute inset-0 hero-bg-pattern opacity-50" />
          <div className="container-custom relative z-10 py-16 md:py-24 lg:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {allCities.length}+ Städte im Einzugsgebiet
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6">
                Unsere Regionen
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
                RD Frankenbau ist Ihr lokaler Partner für hochwertige Sanierung in der gesamten Region Franken.
                Von Nürnberg über Bamberg bis Würzburg - wir sind in über {allCities.length} Städten und Gemeinden für Sie da.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-600">{allCities.length}+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Städte</div>
                </div>
                <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-600">{allServices.length}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Leistungen</div>
                </div>
                <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-600">100km</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Radius</div>
                </div>
                <div className="bg-card/50 backdrop-blur rounded-xl p-4 border border-border">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-600">{totalPages}+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Seiten</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Services Quick Links */}
        <section className="section-padding bg-secondary/20">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
                Unsere Kernleistungen
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Drei Hauptbereiche, in denen wir in allen Regionen für Sie tätig sind
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {mainServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/leistung/${service.slug}`}
                  className="group"
                >
                  <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-amber-500/50 transition-all hover:-translate-y-1 h-full">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-6">
                      <svg className="w-7 h-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-amber-600 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {service.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Major Cities */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="text-center mb-10">
              <p className="text-sm font-medium text-amber-600 mb-3 tracking-wider uppercase">Hauptstädte</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
                Unsere Hauptstandorte
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                In diesen Großstädten sind wir besonders aktiv
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {majorCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="group"
                >
                  <div className="bg-card rounded-xl p-5 border border-border hover:border-amber-500/50 transition-all hover:-translate-y-0.5 h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground group-hover:text-amber-600 transition-colors">
                            {city.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">{city.region}</p>
                        </div>
                      </div>
                    </div>
                    {city.population && (
                      <div className="text-xs text-muted-foreground">
                        ca. {city.population.toLocaleString('de-DE')} Einwohner
                      </div>
                    )}
                    {city.description && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
                        {city.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Regions Grid */}
        <section className="section-padding bg-secondary/20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <p className="text-sm font-medium text-amber-600 mb-3 tracking-wider uppercase">Alle Regionen</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
                Städte nach Region
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Finden Sie Ihre Stadt oder Gemeinde in unserer Übersicht
              </p>
            </div>

            <div className="space-y-12">
              {cityRegions.map((region) => (
                <div key={region.name} className="bg-card rounded-2xl p-6 lg:p-8 border border-border">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-border">
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold text-foreground flex items-center gap-3">
                        <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {region.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{region.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-full text-sm font-medium">
                        {region.cities.length} Städte
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                    {region.cities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/${city.slug}`}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-400 ${
                          city.isMainCity
                            ? 'font-medium text-foreground'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {city.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services x Cities */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="text-center mb-10">
              <p className="text-sm font-medium text-amber-600 mb-3 tracking-wider uppercase">Leistungen nach Stadt</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
                Alle Leistungen in allen Städten
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Kombinieren Sie jede unserer {allServices.length} Leistungen mit jeder der {allCities.length} Städte
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allServices.map((service) => (
                <div key={service.slug} className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {service.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {majorCities.slice(0, 5).map((city) => (
                      <Link
                        key={`${service.slug}-${city.slug}`}
                        href={`/${city.slug}/${service.slug}`}
                        className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground hover:bg-amber-500/10 hover:text-amber-700 transition-colors"
                      >
                        {city.name}
                      </Link>
                    ))}
                    <span className="text-xs px-2 py-1 text-muted-foreground">
                      +{allCities.length - 5} weitere
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 text-white">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="container-custom relative z-10 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Ihre Stadt nicht gefunden?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Kein Problem! Kontaktieren Sie uns und wir prüfen, ob wir auch in Ihrer Region tätig werden können.
                Unser Einzugsgebiet umfasst ca. 100km um Nürnberg.
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
                <a href="tel:+491742629258">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                    <svg className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +49 174 2629258
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
