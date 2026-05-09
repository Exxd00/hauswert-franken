import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GalleryContent } from './gallery-content';
import { getAllProjects } from '@/lib/data/projects';

export const metadata: Metadata = {
  title: 'Galerie | Projektfotos & Referenzen',
  description: 'Entdecken Sie unsere Projektgalerie mit echten Fotos von Sanierungen, Badsanierungen und Modernisierungen in Franken.',
};

export default function GaleriePage() {
  const projects = getAllProjects();
  const totalPhotos = projects.reduce((acc, p) => acc + p.beforePhotos.length + p.afterPhotos.length, 0);
  const afterPhotosCount = projects.reduce((acc, p) => acc + p.afterPhotos.length, 0);

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="section-padding-sm bg-stone-gradient">
          <div className="container-custom">
            <div className="max-w-3xl">
              <span className="inline-block text-sm font-medium text-primary/80 uppercase tracking-wider mb-4">
                Fotogalerie
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-primary mb-6">
                Unsere Arbeit in Bildern
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Echte Fotos von echten Projekten. Sehen Sie selbst, wie wir
                Räume transformieren und Wohnträume verwirklichen.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 bg-primary">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
              <div>
                <div className="text-3xl md:text-4xl font-bold">{projects.length}</div>
                <div className="text-sm text-white/70">Projekte</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">{totalPhotos}</div>
                <div className="text-sm text-white/70">Fotos</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">{afterPhotosCount}</div>
                <div className="text-sm text-white/70">Fertige Ergebnisse</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">100%</div>
                <div className="text-sm text-white/70">Echte Projekte</div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Content - Client Component */}
        <GalleryContent projects={projects} />
      </main>
      <Footer />
    </>
  );
}
