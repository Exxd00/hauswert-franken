'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const coordinatedServices = [
  {
    id: 'cleaning',
    category: 'Reinigung & Vorbereitung',
    description: 'Professionelle Reinigungsleistungen vor, während und nach dem Projekt.',
    services: ['Bauendreinigung', 'Entrümpelung', 'Grundreinigung'],
    partner: 'Key Clean Service',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    id: 'montage',
    category: 'Montage & Einbau',
    description: 'Fachgerechte Montage von Küchen, Möbeln und Einbauelementen.',
    services: ['Küchenmontage', 'Möbelmontage', 'Einbauarbeiten'],
    partner: 'Keller Montage',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'kitchen',
    category: 'Küchenplanung',
    description: 'Individuelle Küchenlösungen bei Bedarf – von der Planung bis zur Umsetzung.',
    services: ['Küchenplanung', 'Maßanfertigung', 'Komplettlösungen'],
    partner: 'Keller Küchenwelt',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
];

const keyBenefits = [
  {
    title: 'Ein Ansprechpartner',
    description: 'Zentrale Kommunikation',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: 'Koordinierte Abläufe',
    description: 'Nahtlose Integration',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Klare Verantwortung',
    description: 'Qualitätsgarantie',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Terminsichere Umsetzung',
    description: 'Verlässliche Planung',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export function CoordinatedServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
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
      className="relative py-16 sm:py-24 lg:py-28 overflow-hidden bg-gradient-to-b from-white via-stone-50/30 to-white dark:from-stone-950 dark:via-stone-900/30 dark:to-stone-950"
      aria-labelledby="coordinated-services-heading"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-to-r from-amber-100/20 dark:from-amber-900/10 to-transparent rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-l from-stone-100/30 dark:from-stone-800/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className={`max-w-3xl mx-auto text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Subtle Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 rounded-full text-xs font-medium mb-5 border border-stone-200/50 dark:border-stone-700/50">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/70" />
            Koordinierte Fachgewerke
          </div>

          <h2
            id="coordinated-services-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-800 dark:text-white mb-5 tracking-tight"
          >
            Ergänzende Leistungen
            <span className="block text-xl sm:text-2xl lg:text-3xl mt-1 font-medium bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
              koordiniert aus einer Hand
            </span>
          </h2>

          {/* Main Value Proposition Text */}
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl mx-auto">
            Neben Sanierung, Modernisierung und Innenausbau koordinieren wir auf Wunsch auch
            ergänzende Leistungen über ausgewählte Fachpartner – etwa Entrümpelung,
            Bauendreinigung oder Küchenmontage.
          </p>

          {/* Emphasis Line */}
          <p className="mt-4 text-sm sm:text-base text-stone-700 dark:text-stone-300 font-medium">
            Für Sie bleibt RD Frankenbau dabei zentraler Ansprechpartner,
            Qualitätsverantwortlicher und Projektkoordinator.
          </p>
        </div>

        {/* Key Benefits Strip */}
        <div className={`mb-12 sm:mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {keyBenefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="group flex items-center gap-2.5 px-4 py-2.5 bg-white dark:bg-stone-800/80 rounded-full border border-stone-200/80 dark:border-stone-700/80 shadow-sm hover:shadow-md hover:border-amber-200 dark:hover:border-amber-800/50 transition-all duration-300"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <span className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-300 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-300">
                  {benefit.icon}
                </span>
                <div className="text-left">
                  <span className="block text-sm font-semibold text-stone-800 dark:text-white leading-tight">
                    {benefit.title}
                  </span>
                  <span className="block text-[11px] text-stone-500 dark:text-stone-400">
                    {benefit.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coordinated Services Grid - Subtle Cards */}
        <div className={`grid md:grid-cols-3 gap-5 lg:gap-6 mb-12 sm:mb-14 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {coordinatedServices.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-white dark:bg-stone-800/60 rounded-2xl p-6 border border-stone-150 dark:border-stone-700/60 hover:border-stone-200 dark:hover:border-stone-600 transition-all duration-500 hover:shadow-lg hover:shadow-stone-200/30 dark:hover:shadow-stone-900/30"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Service Category Icon */}
              <div className="w-12 h-12 rounded-xl bg-stone-100 dark:bg-stone-700/60 flex items-center justify-center text-stone-600 dark:text-stone-300 mb-4 group-hover:bg-amber-100/80 dark:group-hover:bg-amber-900/30 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-all duration-300">
                {service.icon}
              </div>

              {/* Category Title */}
              <h3 className="text-lg font-bold text-stone-800 dark:text-white mb-2">
                {service.category}
              </h3>

              {/* Description */}
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Service Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {service.services.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-[11px] font-medium bg-stone-100 dark:bg-stone-700/50 text-stone-600 dark:text-stone-400 rounded-md"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Partner Info - Subtle */}
              <div className="pt-4 border-t border-stone-100 dark:border-stone-700/50">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-200/80 dark:bg-stone-600/50 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-stone-500 dark:text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </span>
                  <span className="text-xs text-stone-500 dark:text-stone-500">
                    Fachpartner: <span className="text-stone-600 dark:text-stone-400">{service.partner}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA - Focus on RD Frankenbau */}
        <div className={`text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-6 sm:p-8 bg-gradient-to-br from-stone-900 to-stone-800 dark:from-stone-800 dark:to-stone-900 rounded-2xl border border-stone-700/50">
            {/* Coordinator Badge */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-amber-400/80 font-medium uppercase tracking-wider mb-0.5">
                  Ihr Projektkoordinator
                </p>
                <p className="text-lg sm:text-xl font-bold text-white">
                  RD Frankenbau
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-12 bg-stone-700/50" />
            <div className="sm:hidden w-32 h-px bg-stone-700/50" />

            {/* CTA Button */}
            <Link href="/kontakt">
              <Button
                size="lg"
                className="bg-white hover:bg-stone-100 text-stone-900 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span>Projekt anfragen</span>
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
          </div>

          {/* Trust Message */}
          <p className="mt-6 text-xs sm:text-sm text-stone-500 dark:text-stone-500 max-w-lg mx-auto">
            Alle ergänzenden Leistungen werden durch RD Frankenbau koordiniert und überwacht –
            für ein Ergebnis aus einem Guss.
          </p>
        </div>
      </div>
    </section>
  );
}
