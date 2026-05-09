'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Lightbox } from '@/components/ui/lightbox';
import type { Project } from '@/lib/data/projects';

interface ProjectDetailContentProps {
  project: Project;
  otherProjects: Project[];
}

export function ProjectDetailContent({ project, otherProjects }: ProjectDetailContentProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<{ src: string; alt: string }[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const openLightbox = (images: { src: string; alt: string }[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const totalPhotos = project.beforePhotos.length + project.afterPhotos.length;

  return (
    <>
      {/* Compact Hero with Project Info */}
      <section className="bg-gradient-to-b from-stone-900 to-stone-800 pt-4 pb-8 md:pt-6 md:pb-12">
        <div className="container-custom">
          {/* Back Button */}
          <div className={`mb-4 md:mb-6 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <Link href="/projekte">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white hover:bg-white/10 rounded-full px-4 h-9"
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Alle Projekte
              </Button>
            </Link>
          </div>

          {/* Project Title & Basic Info */}
          <div className={`transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Year Badge */}
            <div className="inline-flex items-center gap-1.5 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {project.year}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3 leading-tight">
              {project.title}
            </h1>

            {/* Location & Type Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-white/10 text-white/90 px-3 py-1.5 rounded-full text-xs font-medium">
                <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {project.location}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 text-white/90 px-3 py-1.5 rounded-full text-xs font-medium">
                {project.type}
              </span>
            </div>

            {/* Stats Row - Compact */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 mb-4 md:mb-6">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                {project.area}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {project.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {totalPhotos} Fotos
              </span>
            </div>

            {/* Description */}
            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Highlights - Compact */}
      <section className="py-6 md:py-8 bg-[#faf9f7] border-b border-stone-200">
        <div className="container-custom">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
            <h2 className="text-base font-bold text-stone-800">Projekt-Highlights</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.highlights.map((highlight) => (
              <div
                key={highlight}
                className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full text-xs font-medium text-stone-700 border border-stone-100"
              >
                <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {highlight}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE Photos Section */}
      <section className="py-6 md:py-10 bg-white">
        <div className="container-custom">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <h2 className="text-lg md:text-xl font-bold text-stone-800">Vorher</h2>
              <span className="text-xs text-stone-400 ml-1">{project.beforePhotos.length} Fotos</span>
            </div>
          </div>

          {/* Photo Grid - Compact */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1.5 md:gap-2">
            {project.beforePhotos.map((photo, idx) => (
              <button
                key={photo.src}
                onClick={() => openLightbox(project.beforePhotos.map(p => ({ src: p.src, alt: p.alt })), idx)}
                className="group relative aspect-square rounded-lg overflow-hidden bg-stone-100 cursor-pointer"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 flex items-center justify-center">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-stone-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Divider - Minimal */}
      <div className="py-4 md:py-6 bg-stone-100">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-3 md:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-xs font-medium text-stone-500">Vorher</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-red-300 to-amber-300" />
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-amber-300 to-emerald-300" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-stone-500">Nachher</span>
            </div>
          </div>
        </div>
      </div>

      {/* AFTER Photos Section */}
      <section className="py-6 md:py-10 bg-white">
        <div className="container-custom">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h2 className="text-lg md:text-xl font-bold text-stone-800">Nachher</h2>
              <span className="text-xs text-stone-400 ml-1">{project.afterPhotos.length} Fotos</span>
            </div>
          </div>

          {/* Photo Grid - Larger for After */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
            {project.afterPhotos.map((photo, idx) => (
              <button
                key={photo.src}
                onClick={() => openLightbox(project.afterPhotos.map(p => ({ src: p.src, alt: p.alt })), idx)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-stone-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Used - Compact */}
      <section className="py-6 md:py-10 bg-[#faf9f7]">
        <div className="container-custom">
          <h2 className="text-base md:text-lg font-bold text-stone-800 mb-4">
            Durchgeführte Leistungen
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.services.map((service) => (
              <span
                key={service}
                className="inline-flex items-center gap-1.5 bg-white px-3 py-2 rounded-lg text-sm font-medium text-stone-700 border border-stone-100"
              >
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {service}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Direct and Clear */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-stone-900 to-stone-800">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
              Ähnliches Projekt planen?
            </h2>
            <p className="text-white/60 text-sm md:text-base mb-6">
              Wir setzen auch Ihr Vorhaben professionell um. Kontaktieren Sie uns für ein unverbindliches Gespräch.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/kontakt">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white rounded-full px-8 py-5 font-semibold shadow-lg">
                  Projekt anfragen
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
              <a href="tel:+491742629258">
                <Button variant="outline" className="w-full sm:w-auto bg-transparent border-white/30 text-white hover:bg-white/10 rounded-full px-6 py-5">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Anrufen
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Other Projects - Compact */}
      {otherProjects.length > 0 && (
        <section className="py-8 md:py-12 bg-white">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg md:text-xl font-bold text-stone-800">
                Weitere Projekte
              </h2>
              <Link href="/projekte" className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                Alle ansehen
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {otherProjects.slice(0, 3).map((p) => (
                <Link
                  key={p.id}
                  href={`/projekt/${p.id}`}
                  className="group"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 mb-2">
                    <Image
                      src={p.mainImage}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-xs font-medium truncate">{p.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span>{p.location}</span>
                    <span>•</span>
                    <span>{p.area}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
