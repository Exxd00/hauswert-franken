'use client';

import { useState, useEffect, useRef } from 'react';

const audiences = [
  {
    title: 'Wohnungsbau-gesellschaften',
    shortTitle: 'WBG',
    description: 'Bestandssanierungen und Modernisierungsprojekte.',
    icon: (
      <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    title: 'Haus-verwaltungen',
    shortTitle: 'HV',
    description: 'Regelmäßiger Sanierungsbedarf im Bestand.',
    icon: (
      <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    title: 'Genossen-schaften',
    shortTitle: 'GS',
    description: 'Nachhaltige Sanierungskonzepte.',
    icon: (
      <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    title: 'Kommunale Träger',
    shortTitle: 'KT',
    description: 'Städtische Wohnungsunternehmen.',
    icon: (
      <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    title: 'Portfolio-Investoren',
    shortTitle: 'PI',
    description: 'Mehrfamilienhäuser in Franken.',
    icon: (
      <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-500/10',
  },
];

export function TargetAudienceSection() {
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
      const cardWidth = 240 + 16;
      const newActiveCard = Math.round(scrollLeft / cardWidth);
      setActiveCard(Math.min(Math.max(newActiveCard, 0), audiences.length - 1));
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 240 + 16;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900"
      aria-labelledby="audience-heading"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 bg-gradient-to-tl from-amber-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10">
        {/* Section Header */}
        <div className={`px-5 md:px-8 lg:container-custom text-center max-w-3xl mx-auto mb-8 md:mb-12 lg:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-5 md:mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Für wen wir arbeiten
          </div>
          <h2 id="audience-heading" className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-tight">
            Ihr Partner für
            <span className="block bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Immobilienwerte
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl mx-auto">
            Ob privater Eigentümer oder professioneller Investor – wir bieten maßgeschneiderte Lösungen.
          </p>
        </div>

        {/* Mobile: Horizontal Scroll Cards (< 768px) */}
        <div className="md:hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pl-5 pr-5 pb-6 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {audiences.map((audience, index) => (
              <div
                key={audience.title}
                className={`flex-shrink-0 w-60 snap-start transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div
                  className={`relative h-full min-h-[200px] rounded-3xl p-6 text-center overflow-hidden transition-all duration-300 ${
                    activeCard === index
                      ? 'bg-white/15 shadow-xl shadow-black/20 scale-[1.02]'
                      : 'bg-white/5'
                  }`}
                  style={{
                    backdropFilter: 'blur(12px)',
                    border: activeCard === index ? '2px solid rgba(251, 191, 36, 0.4)' : '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${audience.color} opacity-[0.08] rounded-3xl`} />
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-b-full bg-gradient-to-r ${audience.color} ${activeCard === index ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
                  <div className={`relative w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${audience.color} flex items-center justify-center shadow-lg`}>
                    <div className="text-white">{audience.icon}</div>
                  </div>
                  <h3 className="relative text-base font-bold text-white mb-3 leading-tight hyphens-auto" style={{ wordBreak: 'break-word' }}>{audience.title.replace('-', '\u00AD')}</h3>
                  <p className="relative text-sm text-white/60 leading-relaxed">{audience.description}</p>
                </div>
              </div>
            ))}
            <div className="flex-shrink-0 w-1" />
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-2">
            {audiences.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollToCard(index)}
                className={`transition-all duration-300 rounded-full ${
                  activeCard === index
                    ? 'w-8 h-2.5 bg-gradient-to-r from-amber-400 to-orange-400'
                    : 'w-2.5 h-2.5 bg-white/25 hover:bg-white/40'
                }`}
                aria-label={`Zielgruppe ${index + 1}`}
              />
            ))}
          </div>

          {/* Swipe Hint */}
          <div className={`flex justify-center mt-5 transition-opacity duration-700 ${activeCard === 0 ? 'opacity-60' : 'opacity-0'}`}>
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
              <span>Wischen für mehr</span>
            </div>
          </div>
        </div>

        {/* Tablet: 3+2 Grid Layout (768px - 1024px) */}
        <div className="hidden md:block lg:hidden px-8">
          <div className="grid grid-cols-3 gap-5">
            {audiences.slice(0, 3).map((audience, index) => (
              <div
                key={audience.title}
                className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-5 text-center hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-white/20 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${audience.color} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`} />
                <div className={`relative w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${audience.color} flex items-center justify-center shadow-lg`}>
                  <div className="text-white">{audience.icon}</div>
                </div>
                <h3 className="relative text-base font-semibold text-white mb-2 leading-tight" style={{ wordBreak: 'break-word' }}>{audience.title.replace('-', '\u00AD')}</h3>
                <p className="relative text-sm text-white/60 leading-relaxed">{audience.description}</p>
              </div>
            ))}
          </div>
          {/* Second row - 2 centered cards */}
          <div className="grid grid-cols-2 gap-5 mt-5 max-w-[66%] mx-auto">
            {audiences.slice(3).map((audience, index) => (
              <div
                key={audience.title}
                className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-5 text-center hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-white/20 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${(index + 3) * 100}ms` }}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${audience.color} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`} />
                <div className={`relative w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${audience.color} flex items-center justify-center shadow-lg`}>
                  <div className="text-white">{audience.icon}</div>
                </div>
                <h3 className="relative text-base font-semibold text-white mb-2 leading-tight" style={{ wordBreak: 'break-word' }}>{audience.title.replace('-', '\u00AD')}</h3>
                <p className="relative text-sm text-white/60 leading-relaxed">{audience.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: 5-column Grid (>= 1024px) */}
        <div className="hidden lg:block container-custom">
          <div className="grid lg:grid-cols-5 gap-6">
            {audiences.map((audience, index) => (
              <div
                key={audience.title}
                className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-white/20 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${audience.color} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`} />
                <div className={`relative w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 text-white flex items-center justify-center group-hover:bg-gradient-to-br group-hover:${audience.color} transition-all duration-300 group-hover:scale-110`}>
                  {audience.icon}
                </div>
                <h3 className="relative text-base lg:text-lg font-semibold text-white mb-2 leading-tight" style={{ wordBreak: 'break-word' }}>{audience.title.replace('-', '\u00AD')}</h3>
                <p className="relative text-xs lg:text-sm text-white/60 leading-relaxed">{audience.description}</p>
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
