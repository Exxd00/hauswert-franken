'use client';

import { useState, useEffect, useRef } from 'react';

const qualityPoints = [
  {
    title: 'Strukturierte Abwicklung',
    description: 'Klare Prozesse von der Anfrage bis zur Übergabe. Sie wissen immer, wo Ihr Projekt steht.',
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    color: 'from-amber-500 to-orange-500',
    lightColor: 'bg-amber-50 dark:bg-amber-900/30',
    textColor: 'text-amber-600 dark:text-amber-400',
    number: '01',
  },
  {
    title: 'Termintreue',
    description: 'Regelmäßige Updates und ein fester Ansprechpartner für alle Ihre Fragen.',
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'from-emerald-500 to-teal-500',
    lightColor: 'bg-emerald-50 dark:bg-emerald-900/30',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    number: '02',
  },
  {
    title: 'Hochwertige Ausführung',
    description: 'Nur erfahrene Fachkräfte und geprüfte Materialien für dauerhafte Ergebnisse.',
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    color: 'from-blue-500 to-indigo-500',
    lightColor: 'bg-blue-50 dark:bg-blue-900/30',
    textColor: 'text-blue-600 dark:text-blue-400',
    number: '03',
  },
  {
    title: 'Klare Ansprechpartner',
    description: 'Ein persönlicher Projektleiter koordiniert alle Gewerke und ist immer erreichbar.',
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    color: 'from-violet-500 to-purple-500',
    lightColor: 'bg-violet-50 dark:bg-violet-900/30',
    textColor: 'text-violet-600 dark:text-violet-400',
    number: '04',
  },
];

export function QualitySection() {
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
      className="relative py-20 md:py-24 lg:py-32 overflow-hidden bg-[#faf9f7] dark:bg-stone-900"
      aria-labelledby="quality-heading"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 bg-gradient-to-bl from-amber-100/40 dark:from-amber-900/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 bg-gradient-to-tr from-stone-200/40 dark:from-stone-800/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className={`px-5 md:px-8 lg:container-custom text-center max-w-3xl mx-auto mb-8 md:mb-12 lg:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-full text-sm font-medium mb-5 md:mb-6">
            <svg className="w-4 h-4 text-amber-400 dark:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Unser Versprechen
          </div>
          <h2 id="quality-heading" className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-stone-800 dark:text-white mb-4 md:mb-6 tracking-tight leading-tight">
            Qualität, auf die Sie sich
            <span className="block bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
              verlassen können
            </span>
          </h2>
          <p className="text-base md:text-lg text-stone-500 dark:text-stone-400 leading-relaxed max-w-xl mx-auto">
            Eine Sanierung ist Vertrauenssache. Wir garantieren höchste Standards in jedem Aspekt.
          </p>
        </div>

        {/* Mobile: Vertical Stack (< 768px) */}
        <div className="md:hidden px-5">
          <div className="space-y-4">
            {qualityPoints.map((point, index) => (
              <div
                key={point.title}
                className={`relative transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative bg-white dark:bg-stone-800 rounded-2xl p-5 shadow-lg shadow-stone-200/50 dark:shadow-none border border-stone-100 dark:border-stone-700 overflow-hidden">
                  <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${point.color}`} />
                  <div className="flex items-start gap-4 pl-2">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${point.color} flex items-center justify-center shadow-md`}>
                      <span className="text-white font-bold text-sm">{point.number}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-stone-800 dark:text-white mb-1.5">{point.title}</h3>
                      <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{point.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Trust Badge */}
          <div className={`mt-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-stone-900 to-stone-800 dark:from-white dark:to-stone-100 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <div className="text-white dark:text-stone-900 font-bold text-base">Qualitätsversprechen</div>
                <div className="text-white/60 dark:text-stone-500 text-sm">Ihr Vertrauen ist unsere Verantwortung</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tablet & Desktop: 2x2 Grid (>= 768px) */}
        <div className="hidden md:block px-8 lg:container-custom">
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {qualityPoints.map((point, index) => (
              <div
                key={point.title}
                className={`group relative flex items-start gap-4 md:gap-5 p-5 md:p-6 lg:p-8 bg-white dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-700 hover:shadow-xl hover:shadow-stone-200/40 dark:hover:shadow-stone-900/40 transition-all duration-500 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${point.color} opacity-0 group-hover:opacity-[0.02] dark:group-hover:opacity-[0.05] transition-opacity duration-500`} />
                <div className={`relative w-12 h-12 md:w-14 md:h-14 rounded-xl ${point.lightColor} ${point.textColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  {point.icon}
                </div>
                <div className="relative flex-1">
                  <h3 className="text-base md:text-lg font-bold text-stone-800 dark:text-white mb-1.5 md:mb-2">{point.title}</h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{point.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badge */}
          <div className={`mt-10 lg:mt-12 flex justify-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-4 px-5 md:px-6 py-4 bg-gradient-to-r from-stone-900 to-stone-800 dark:from-white dark:to-stone-100 rounded-2xl shadow-xl">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <div className="text-white dark:text-stone-900 font-bold text-base md:text-lg">Qualitätsversprechen</div>
                <div className="text-white/60 dark:text-stone-500 text-sm">Ihr Vertrauen ist unsere Verantwortung</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
