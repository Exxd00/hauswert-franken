'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const valuePoints = [
  {
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Höherer Marktwert',
    description: 'Professionelle Sanierung steigert den Verkaufspreis erheblich.',
  },
  {
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Bessere Rendite',
    description: 'Höhere Mieteinnahmen durch moderne Ausstattung.',
  },
  {
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Energieeffizienz',
    description: 'Niedrigere Betriebskosten durch moderne Technik.',
  },
  {
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Lebensqualität',
    description: 'Modernes Wohnen mit durchdachten Details.',
  },
];

export function ValueSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900"
      aria-labelledby="value-heading"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 -left-32 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-amber-200/30 to-orange-200/20 dark:from-amber-900/20 dark:to-orange-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-tl from-stone-200/30 to-amber-100/20 dark:from-stone-700/20 dark:to-amber-900/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Wertsteigerung
            </div>
            <h2 id="value-heading" className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-stone-800 dark:text-white mb-4 sm:mb-6 tracking-tight">
              Nicht nur sanieren – <br className="hidden sm:block" />
              <span className="text-stone-500 dark:text-stone-400">Immobilienwerte steigern</span>
            </h2>

            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed mb-6 sm:mb-10">
              <p>
                Jede professionelle Sanierung ist eine Investition in die Zukunft Ihrer Immobilie.
                <span className="text-stone-800 dark:text-white font-medium"> Wir steigern den langfristigen Wert Ihres Objekts nachhaltig</span>.
              </p>
              <p className="hidden sm:block">
                Ob Sie selbst einziehen, vermieten oder verkaufen möchten – eine hochwertige
                Sanierung bedeutet: mehr Komfort, niedrigere Betriebskosten und ein gesteigerter Marktwert.
              </p>
            </div>

            {/* Value Points - Mobile Compact / Desktop Full */}
            <div className="mb-6 sm:mb-10">
              {/* Mobile: Show first 2, expandable */}
              <div className="sm:hidden space-y-3">
                {valuePoints.slice(0, expandedMobile ? 4 : 2).map((point, index) => (
                  <div
                    key={point.title}
                    className={`flex items-start gap-3 p-3 bg-white dark:bg-stone-800 rounded-xl shadow-sm border border-stone-100 dark:border-stone-700 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                      {point.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-800 dark:text-white text-sm">{point.title}</h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{point.description}</p>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setExpandedMobile(!expandedMobile)}
                  className="flex items-center justify-center gap-2 w-full py-2 text-xs font-medium text-stone-500 dark:text-stone-400"
                >
                  <span>{expandedMobile ? 'Weniger anzeigen' : 'Alle Vorteile anzeigen'}</span>
                  <svg className={`w-4 h-4 transition-transform duration-300 ${expandedMobile ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Desktop: 2x2 Grid */}
              <div className="hidden sm:grid sm:grid-cols-2 gap-4 sm:gap-6">
                {valuePoints.map((point, index) => (
                  <div
                    key={point.title}
                    className={`flex items-start gap-4 p-4 bg-white dark:bg-stone-800 rounded-xl shadow-sm border border-stone-100 dark:border-stone-700 transition-all duration-500 hover:shadow-md ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                      {point.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-stone-800 dark:text-white mb-1 break-words">{point.title}</h3>
                      <p className="text-sm text-stone-500 dark:text-stone-400 break-words">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/kontakt">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-stone-900 to-stone-800 dark:from-amber-500 dark:to-orange-500 hover:from-stone-800 hover:to-stone-700 dark:hover:from-amber-400 dark:hover:to-orange-400 text-white dark:text-stone-900 rounded-xl sm:rounded-2xl px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold shadow-lg transition-all duration-300 group">
                Beratungsgespräch vereinbaren
                <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
          </div>

          {/* Visual - Compact on Mobile */}
          <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative aspect-square max-w-sm sm:max-w-none mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
              {/* Modern Interior Image */}
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=800&fit=crop"
                alt="Modernes Wohnzimmer nach Sanierung"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
            </div>

            {/* Stats Card - Smaller on Mobile */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 bg-white dark:bg-stone-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-stone-100 dark:border-stone-700">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
                  <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">+</span>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-600 dark:text-amber-400">25%</p>
                  <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">durchschn. Wertsteigerung</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
