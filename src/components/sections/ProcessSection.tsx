'use client';

import { useState, useEffect, useRef } from 'react';

const processSteps = [
  {
    number: '01',
    title: 'Anfrage',
    description: 'Sie beschreiben Ihr Projekt und Ihre Wünsche über unser Formular oder telefonisch.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    color: 'from-amber-500 to-orange-500',
    lightColor: 'bg-amber-50 dark:bg-amber-900/30',
    textColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    number: '02',
    title: 'Beratung',
    description: 'Wir besichtigen Ihr Objekt, analysieren den Bestand und besprechen Ihre Vorstellungen.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    color: 'from-blue-500 to-indigo-500',
    lightColor: 'bg-blue-50 dark:bg-blue-900/30',
    textColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    number: '03',
    title: 'Planung',
    description: 'Sie erhalten ein detailliertes Angebot mit klarer Leistungsbeschreibung und Zeitplan.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: 'from-emerald-500 to-teal-500',
    lightColor: 'bg-emerald-50 dark:bg-emerald-900/30',
    textColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    number: '04',
    title: 'Ausführung',
    description: 'Professionelle Umsetzung mit regelmäßigen Updates und Qualitätskontrolle.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: 'from-violet-500 to-purple-500',
    lightColor: 'bg-violet-50 dark:bg-violet-900/30',
    textColor: 'text-violet-600 dark:text-violet-400',
  },
  {
    number: '05',
    title: 'Übergabe',
    description: 'Abnahme, Dokumentation und Übergabe Ihres fertig sanierten Objekts.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
    color: 'from-rose-500 to-pink-500',
    lightColor: 'bg-rose-50 dark:bg-rose-900/30',
    textColor: 'text-rose-600 dark:text-rose-400',
  },
];

export function ProcessSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
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
      const cardWidth = scrollContainerRef.current.offsetWidth * 0.7;
      const newActiveStep = Math.round(scrollLeft / cardWidth);
      setActiveStep(Math.min(newActiveStep, processSteps.length - 1));
    }
  };

  const scrollToStep = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth * 0.7;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-white dark:bg-stone-950"
      aria-labelledby="process-heading"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-100/20 dark:from-amber-900/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-stone-100/30 dark:from-stone-800/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className={`container-custom text-center max-w-3xl mx-auto mb-10 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 dark:bg-amber-500 animate-pulse" />
            So arbeiten wir
          </div>
          <h2 id="process-heading" className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-stone-800 dark:text-white mb-4 sm:mb-6 tracking-tight">
            Von der Anfrage zur
            <span className="block bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
              Übergabe
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-stone-500 dark:text-stone-400 leading-relaxed">
            Unser strukturierter Prozess garantiert Ihnen Planungssicherheit und transparente Kommunikation.
          </p>
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="sm:hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-4 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className={`flex-shrink-0 w-[70vw] snap-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`relative bg-white dark:bg-stone-800 rounded-2xl p-5 shadow-lg border-2 ${activeStep === index ? 'border-amber-400 dark:border-amber-500' : 'border-stone-100 dark:border-stone-700'} overflow-hidden transition-all duration-300 h-full`}>
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-[0.04] dark:opacity-[0.1]`} />

                  {/* Step Number */}
                  <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <span className="text-lg font-bold text-white">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className={`relative w-10 h-10 rounded-lg ${step.lightColor} ${step.textColor} flex items-center justify-center mb-3`}>
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="relative text-base font-bold text-stone-800 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="relative text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow indicator */}
                  {index < processSteps.length - 1 && (
                    <div className="absolute top-1/2 -right-1 transform -translate-y-1/2">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-md`}>
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {processSteps.map((step, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollToStep(index)}
                className={`transition-all duration-300 rounded-full ${
                  activeStep === index
                    ? 'w-6 h-2 bg-amber-500'
                    : 'w-2 h-2 bg-stone-300 dark:bg-stone-600'
                }`}
                aria-label={`Schritt ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden sm:block container-custom">
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-200 dark:via-amber-800 to-transparent" />

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
              {processSteps.map((step, index) => (
                <div
                  key={step.number}
                  className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                >
                  {/* Step Card */}
                  <div className="relative bg-gradient-to-br from-white to-stone-50/50 dark:from-stone-800 dark:to-stone-800/50 rounded-2xl p-6 lg:p-8 text-center hover:shadow-xl hover:shadow-stone-200/40 dark:hover:shadow-stone-900/40 transition-all duration-500 hover:-translate-y-1 border border-stone-100 dark:border-stone-700 h-full">
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.08] transition-opacity duration-500`} />

                    {/* Number Badge */}
                    <div className={`relative w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl font-bold text-white">{step.number}</span>
                    </div>

                    {/* Icon */}
                    <div className={`relative w-12 h-12 mx-auto mb-4 rounded-xl ${step.lightColor} ${step.textColor} flex items-center justify-center`}>
                      {step.icon}
                    </div>

                    {/* Content */}
                    <h3 className="relative text-lg font-bold text-stone-800 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="relative text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow (hidden on last item) */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-24 -right-3 z-10">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-md`}>
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
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
