'use client';

import { useState, useEffect, useRef } from 'react';

const trustPoints = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Skalierbare Kapazitäten',
    description: 'Von einzelnen Wohnungen bis zu kompletten Bestandssanierungen – wir passen uns Ihrem Projektumfang an.',
    color: 'from-emerald-500 to-teal-600',
    lightColor: 'bg-emerald-50 dark:bg-emerald-900/30',
    textColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Mieterkoordination',
    description: 'Professionelle Abstimmung mit Ihren Mietern. Minimale Beeinträchtigung, maximale Zufriedenheit.',
    color: 'from-blue-500 to-indigo-600',
    lightColor: 'bg-blue-50 dark:bg-blue-900/30',
    textColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    title: 'Transparente Prozesse',
    description: 'Detaillierte Dokumentation, regelmäßige Statusberichte und klare Kostenübersichten für Ihre Buchhaltung.',
    color: 'from-amber-500 to-orange-600',
    lightColor: 'bg-amber-50 dark:bg-amber-900/30',
    textColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Garantierte Termintreue',
    description: 'Verbindliche Zeitpläne für Ihre Vermietungsplanung. Pünktliche Fertigstellung für schnelle Wiedervermietung.',
    color: 'from-rose-500 to-pink-600',
    lightColor: 'bg-rose-50 dark:bg-rose-900/30',
    textColor: 'text-rose-600 dark:text-rose-400',
  },
];

export function TrustSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTrust, setActiveTrust] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const trustScrollRef = useRef<HTMLDivElement>(null);

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

  const handleTrustScroll = () => {
    if (trustScrollRef.current) {
      const scrollLeft = trustScrollRef.current.scrollLeft;
      const cardWidth = trustScrollRef.current.offsetWidth * 0.75;
      const newActive = Math.round(scrollLeft / cardWidth);
      setActiveTrust(Math.min(newActive, trustPoints.length - 1));
    }
  };

  const scrollToTrust = (index: number) => {
    if (trustScrollRef.current) {
      const cardWidth = trustScrollRef.current.offsetWidth * 0.75;
      trustScrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-white dark:bg-stone-950"
      aria-labelledby="trust-heading"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 bg-gradient-to-r from-stone-100/80 dark:from-stone-800/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-amber-50/50 dark:from-amber-900/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className={`container-custom text-center max-w-3xl mx-auto mb-10 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-stone-800 to-stone-900 dark:from-white dark:to-stone-100 text-white dark:text-stone-900 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 dark:text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Ihr Partner für Wohnungsunternehmen
          </div>
          <h2 id="trust-heading" className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-stone-800 dark:text-white mb-4 sm:mb-6 tracking-tight">
            Warum führende WBGs
            <span className="block bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
              auf uns vertrauen
            </span>
          </h2>
          <p className="text-sm sm:text-lg text-stone-500 dark:text-stone-400 leading-relaxed">
            Professionelle Sanierung für Wohnungsbaugesellschaften, Hausverwaltungen und Immobilieninvestoren.
            Mit skalierbaren Kapazitäten und strukturierten Prozessen.
          </p>
        </div>

        {/* Mobile: Horizontal Scroll Trust Points */}
        <div className="sm:hidden mb-8">
          <div
            ref={trustScrollRef}
            onScroll={handleTrustScroll}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-4 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {trustPoints.map((point, index) => (
              <div
                key={point.title}
                className={`flex-shrink-0 w-[75vw] snap-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`relative h-full p-5 bg-gradient-to-br from-white to-stone-50/50 dark:from-stone-800 dark:to-stone-800/50 rounded-2xl border-2 ${activeTrust === index ? 'border-amber-400 dark:border-amber-500' : 'border-stone-100 dark:border-stone-700'} shadow-lg overflow-hidden transition-all duration-300`}>
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${point.color} opacity-[0.04] dark:opacity-[0.1]`} />

                  {/* Icon */}
                  <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${point.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <div className="text-white">{point.icon}</div>
                  </div>

                  {/* Content */}
                  <h3 className="relative text-base font-bold text-stone-800 dark:text-white mb-2">
                    {point.title}
                  </h3>
                  <p className="relative text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {trustPoints.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollToTrust(index)}
                className={`transition-all duration-300 rounded-full ${
                  activeTrust === index
                    ? 'w-6 h-2 bg-amber-500'
                    : 'w-2 h-2 bg-stone-300 dark:bg-stone-600'
                }`}
                aria-label={`Punkt ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid Trust Points */}
        <div className="hidden sm:block container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPoints.map((point, index) => (
              <div
                key={point.title}
                className={`group relative p-8 bg-gradient-to-br from-white to-stone-50/50 dark:from-stone-800 dark:to-stone-800/50 rounded-3xl border border-stone-100 dark:border-stone-700 hover:shadow-xl hover:shadow-stone-200/40 dark:hover:shadow-stone-900/40 transition-all duration-500 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${point.color} opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.08] transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-2xl ${point.lightColor} ${point.textColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {point.icon}
                </div>

                {/* Content */}
                <h3 className="relative text-xl font-bold text-stone-800 dark:text-white mb-3">
                  {point.title}
                </h3>
                <p className="relative text-stone-500 dark:text-stone-400 leading-relaxed text-sm">
                  {point.description}
                </p>

                {/* Corner Decoration */}
                <div className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl ${point.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500 rounded-tl-full rounded-br-3xl`} />
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
