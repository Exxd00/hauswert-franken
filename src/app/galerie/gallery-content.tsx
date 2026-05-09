'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lightbox, PhotoGallery } from '@/components/ui/lightbox';
import type { Project } from '@/lib/data/projects';

interface GalleryContentProps {
  projects: Project[];
}

export function GalleryContent({ projects }: GalleryContentProps) {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Get all photos from selected project or all projects
  const getPhotos = () => {
    if (selectedProject !== null) {
      const project = projects.find(p => p.id === selectedProject);
      if (!project) return [];
      return [
        ...project.beforePhotos.map(p => ({ src: p.src, alt: p.alt })),
        ...project.afterPhotos.map(p => ({ src: p.src, alt: p.alt })),
      ];
    }
    return projects.flatMap(p => [
      ...p.beforePhotos.map(photo => ({ src: photo.src, alt: photo.alt })),
      ...p.afterPhotos.map(photo => ({ src: photo.src, alt: photo.alt })),
    ]);
  };

  const photos = getPhotos();

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Get "after" photos (best showcase photos)
  const afterPhotos = projects.flatMap(p => p.afterPhotos);

  // Get "before" photos
  const beforePhotos = projects.flatMap(p => p.beforePhotos);

  // Total photos
  const getTotalPhotos = (project: Project) => project.beforePhotos.length + project.afterPhotos.length;

  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <Tabs defaultValue="ergebnisse" className="w-full">
            <TabsList className="w-full max-w-md mx-auto mb-12 grid grid-cols-2 h-auto p-1">
              <TabsTrigger value="ergebnisse" className="py-3 text-sm md:text-base">
                Ergebnisse ({afterPhotos.length})
              </TabsTrigger>
              <TabsTrigger value="alle" className="py-3 text-sm md:text-base">
                Alle Fotos ({photos.length})
              </TabsTrigger>
            </TabsList>

            {/* Results Tab */}
            <TabsContent value="ergebnisse" className="mt-0">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl text-primary mb-4">
                  Fertige Projekte
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Unsere schönsten Ergebnisse - klicken Sie auf ein Foto für die Vollansicht.
                </p>
              </div>

              {afterPhotos.length > 0 ? (
                <PhotoGallery
                  images={afterPhotos.map(p => ({ src: p.src, alt: p.alt }))}
                  columns={3}
                  className="max-w-6xl mx-auto"
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Fotos werden geladen...
                  </p>
                </div>
              )}
            </TabsContent>

            {/* All Photos Tab */}
            <TabsContent value="alle" className="mt-0">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl text-primary mb-4">
                  Alle Projektfotos
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  Wählen Sie ein Projekt oder sehen Sie alle Fotos.
                </p>

                {/* Project Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  <Button
                    variant={selectedProject === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedProject(null)}
                  >
                    Alle ({projects.reduce((acc, p) => acc + getTotalPhotos(p), 0)})
                  </Button>
                  {projects.map(project => (
                    <Button
                      key={project.id}
                      variant={selectedProject === project.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedProject(project.id)}
                    >
                      {project.title.split(' ').slice(0, 2).join(' ')} ({getTotalPhotos(project)})
                    </Button>
                  ))}
                </div>
              </div>

              {/* Photo Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-7xl mx-auto">
                {photos.map((photo, idx) => (
                  <button
                    key={`${photo.src}-${idx}`}
                    onClick={() => openLightbox(idx)}
                    className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center transition-all scale-0 group-hover:scale-100">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <Lightbox
                images={photos}
                initialIndex={lightboxIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-3xl sm:text-4xl text-white mb-6">
            Ihr Projekt könnte hier sein
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Lassen Sie uns gemeinsam Ihr nächstes Projekt planen und umsetzen.
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
    </>
  );
}
