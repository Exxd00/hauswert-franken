import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { getAllProjects } from '@/lib/data/projects';
import { ProjectsContent } from './projects-content';

export const metadata: Metadata = {
  title: 'Projekte & Referenzen',
  description: 'Entdecken Sie unsere abgeschlossenen Sanierungsprojekte in Franken. Kernsanierung, Badsanierung und Modernisierung in Nürnberg, Fürth, Erlangen und Umgebung.',
};

export default function ProjektePage() {
  const projects = getAllProjects();
  const totalPhotos = projects.reduce((acc, p) => acc + p.beforePhotos.length + p.afterPhotos.length, 0);

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="section-padding-sm bg-stone-gradient">
          <div className="container-custom">
            <div className="max-w-3xl">
              <span className="inline-block text-sm font-medium text-primary/80 uppercase tracking-wider mb-4">
                Referenzen
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-primary mb-6">
                Unsere Projekte
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ein Einblick in unsere Arbeit: Jedes Projekt ist einzigartig,
                aber alle verbindet unser Anspruch an Qualität, Präzision und Wertsteigerung.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-8 bg-primary">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
              <div>
                <div className="text-3xl md:text-4xl font-bold">{projects.length}+</div>
                <div className="text-sm text-white/70">Projekte</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">
                  {totalPhotos}
                </div>
                <div className="text-sm text-white/70">Dokumentierte Fotos</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">100%</div>
                <div className="text-sm text-white/70">Zufriedene Kunden</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">Franken</div>
                <div className="text-sm text-white/70">Region</div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Content - Client Component */}
        <ProjectsContent projects={projects} />

        {/* CTA Section */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl sm:text-4xl text-white mb-6">
              Ihr Projekt könnte das nächste sein
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Lassen Sie uns über Ihre Vorstellungen sprechen.
              Wir freuen uns auf Ihr Projekt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt">
                <Button size="lg" variant="secondary" className="shadow-lg">
                  Projekt anfragen
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
              <Link href="/galerie">
                <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
                  Zur Galerie
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
