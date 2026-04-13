'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/data/projects';

interface ProjectsContentProps {
  projects: Project[];
}

export function ProjectsContent({ projects }: ProjectsContentProps) {
  const getTotalPhotos = (project: Project) => project.beforePhotos.length + project.afterPhotos.length;
  const getAllPhotos = (project: Project) => [...project.beforePhotos, ...project.afterPhotos];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const totalPhotos = getTotalPhotos(project);
            const allPhotos = getAllPhotos(project);

            return (
              <Link
                key={project.id}
                href={`/projekt/${project.id}`}
                className="group bg-secondary/30 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 block"
              >
                {/* Main Image */}
                <div className="aspect-[16/10] relative overflow-hidden bg-secondary">
                  <Image
                    src={project.mainImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Year Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary">
                    {project.year}
                  </div>
                  {/* Photo Count Badge */}
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-white flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {totalPhotos} Fotos
                  </div>

                </div>

                {/* Thumbnail Gallery Preview */}
                {totalPhotos > 1 && (
                  <div className="flex gap-1 p-1 bg-secondary/50">
                    {allPhotos.slice(0, 4).map((photo, index) => (
                      <div
                        key={`${photo.src}-${index}`}
                        className="relative flex-1 aspect-square overflow-hidden"
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          className="object-cover"
                          sizes="100px"
                        />
                        {index === 3 && totalPhotos > 4 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium">
                            +{totalPhotos - 4}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {project.location}
                    {project.address && (
                      <span className="text-xs text-muted-foreground/70">({project.address})</span>
                    )}
                  </div>

                  <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h2>

                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Services Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.services.slice(0, 3).map((service) => (
                      <span
                        key={service}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                    {project.services.length > 3 && (
                      <span className="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded-full">
                        +{project.services.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-border/50">
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      {project.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      {project.area}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {project.duration}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
