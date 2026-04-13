'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getFeaturedProjects, getTotalPhotoCount, getAllProjects } from '@/lib/data/projects';

export function ProjectsSection() {
  const projects = getFeaturedProjects();
  const totalPhotos = getTotalPhotoCount();
  const totalProjects = getAllProjects().length;
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const cardWidth = scrollContainerRef.current.offsetWidth * 0.78;
      const newActiveCard = Math.round(scrollLeft / cardWidth);
      setActiveCard(Math.min(newActiveCard, projects.length - 1));
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth * 0.78;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-[#faf9f7] dark:bg-stone-900"
      aria-labelledby="projects-heading"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-amber-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-stone-200/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10">
        {/* Section Header */}
        <div className={`container-custom flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 mb-8 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 dark:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Referenzen
            </div>
            <h2 id="projects-heading" className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-stone-800 dark:text-white mb-4 sm:mb-6 tracking-tight">
              Ausgewählte
              <span className="block bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                Projekte
              </span>
            </h2>
            <p className="text-sm sm:text-lg text-stone-500 dark:text-stone-400 leading-relaxed">
              Ein Einblick in unsere Arbeit: Jedes Projekt ist einzigartig.
            </p>
          </div>

          <Link href="/projekte" className="hidden lg:block">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-stone-200 bg-white/80 backdrop-blur-sm hover:border-stone-300 hover:bg-white rounded-2xl px-8 py-7 text-base font-semibold text-stone-700 transition-all duration-300 group"
            >
              <span>Alle Projekte</span>
              <span className="ml-3 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-stone-200 group-hover:translate-x-1 transition-all">
                <svg className="w-4 h-4 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Button>
          </Link>
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="sm:hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-4 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {projects.map((project, index) => (
              <Link
                key={project.id}
                href={`/projekt/${project.id}`}
                className={`flex-shrink-0 w-[78vw] snap-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <article className={`relative bg-white dark:bg-stone-800 rounded-2xl overflow-hidden shadow-lg border-2 ${activeCard === index ? 'border-amber-400 dark:border-amber-500' : 'border-stone-100 dark:border-stone-700'} transition-all duration-300`}>
                  {/* Project Image */}
                  <div className="aspect-[4/3] relative overflow-hidden bg-stone-200">
                    <Image
                      src={project.mainImage}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="78vw"
                    />
                    {/* Photo Count Badge */}
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] font-medium text-stone-700 shadow-lg">
                      <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      {project.beforePhotos.length + project.afterPhotos.length}
                    </div>
                    {/* Year Badge */}
                    <div className="absolute top-2 right-2 bg-stone-900/90 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] font-bold text-white shadow-lg">
                      {project.year}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Location */}
                    <div className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 mb-1">
                      <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="truncate">{project.location}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-stone-800 dark:text-white mb-2 line-clamp-1">
                      {project.title}
                    </h3>

                    {/* Meta Tags */}
                    <div className="flex flex-wrap gap-1">
                      <span className="inline-flex items-center text-[10px] font-medium text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-700 px-2 py-1 rounded-full">
                        {project.type}
                      </span>
                      <span className="inline-flex items-center text-[10px] font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-full">
                        {project.duration}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {projects.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollToCard(index)}
                className={`transition-all duration-300 rounded-full ${
                  activeCard === index
                    ? 'w-6 h-2 bg-amber-500'
                    : 'w-2 h-2 bg-stone-300 dark:bg-stone-600'
                }`}
                aria-label={`Projekt ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden sm:block container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <Link
                key={project.id}
                href={`/projekt/${project.id}`}
                className={`group block transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              >
                <article className="relative bg-white dark:bg-stone-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-stone-200/50 dark:hover:shadow-stone-900/50 transition-all duration-500 hover:-translate-y-2 border border-stone-100 dark:border-stone-700">
                  {/* Project Image */}
                  <div className="aspect-[4/3] relative overflow-hidden bg-stone-200">
                    <Image
                      src={project.mainImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="hidden sm:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <span className="px-6 py-3 bg-white/95 backdrop-blur-sm rounded-2xl font-semibold text-stone-800 shadow-xl flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Projekt ansehen
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-stone-700 shadow-lg">
                      <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      {project.beforePhotos.length + project.afterPhotos.length} Fotos
                    </div>
                    <div className="absolute top-4 right-4 bg-stone-900/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg">
                      {project.year}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8">
                    <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 mb-3">
                      <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="truncate">{project.location}</span>
                    </div>
                    <h3 className="text-xl font-bold text-stone-800 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-6 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-700 px-3 py-1.5 rounded-full">
                        {project.type}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-700 px-3 py-1.5 rounded-full">
                        {project.area}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-3 py-1.5 rounded-full">
                        {project.duration}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile All Projects Link */}
        <div className={`container-custom text-center mt-8 sm:mt-12 lg:hidden transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link href="/projekte">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-stone-200 dark:border-stone-700 bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm hover:border-stone-300 dark:hover:border-stone-600 hover:bg-white dark:hover:bg-stone-700 rounded-xl px-6 py-5 text-sm font-semibold text-stone-700 dark:text-stone-200 transition-all duration-300 group w-full"
            >
              <span>Alle Projekte ansehen</span>
              <span className="ml-2 w-6 h-6 rounded-full bg-stone-100 dark:bg-stone-700 flex items-center justify-center group-hover:bg-stone-200 dark:group-hover:bg-stone-600 transition-all">
                <svg className="w-3 h-3 text-stone-600 dark:text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Button>
          </Link>
        </div>

        {/* Stats Row */}
        <div className={`container-custom mt-10 sm:mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Mobile: Horizontal Scroll Stats */}
          <div className="sm:hidden">
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-2 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
              {[
                { value: `${totalProjects}`, label: 'Projekte', icon: '🏠' },
                { value: `${totalPhotos}`, label: 'Fotos', icon: '📸' },
                { value: 'Franken', label: 'Region', icon: '📍' },
                { value: '100%', label: 'Zufrieden', icon: '💯' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex-shrink-0 w-[40vw] snap-center relative p-4 bg-white dark:bg-stone-800 rounded-xl border border-stone-100 dark:border-stone-700 text-center"
                >
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className="text-xl font-bold text-stone-800 dark:text-white">{stat.value}</div>
                  <div className="text-[10px] text-stone-500 dark:text-stone-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Grid Stats */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: `${totalProjects}`, label: 'Referenzprojekte', icon: '🏠' },
              { value: `${totalPhotos}+`, label: 'Projektfotos', icon: '📸' },
              { value: 'Franken', label: 'Unsere Region', icon: '📍' },
              { value: '100%', label: 'Kundenzufriedenheit', icon: '💯' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="relative p-6 lg:p-8 bg-white dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-700 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl lg:text-4xl font-bold text-stone-800 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-stone-500 dark:text-stone-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
