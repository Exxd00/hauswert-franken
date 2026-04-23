'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

// Unsere Stärken - Realistische und ehrliche Werte
const strengths = [
  {
    title: 'Transparente Kommunikation',
    description: 'Sie wissen immer, was passiert. Regelmäßige Updates, klare Absprachen und direkte Erreichbarkeit.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    color: 'from-emerald-500 to-teal-600',
    lightColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
  },
  {
    title: 'Saubere Arbeit',
    description: 'Wir hinterlassen keine Baustelle. Tägliche Reinigung und Schutz Ihrer Möbel und Böden.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    color: 'from-blue-500 to-indigo-600',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    title: 'Faire Preise',
    description: 'Ehrliche Kostenvoranschläge ohne versteckte Kosten. Was wir anbieten, gilt.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'from-amber-500 to-orange-600',
    lightColor: 'bg-amber-50',
    textColor: 'text-amber-600',
  },
  {
    title: 'Qualitätsmaterialien',
    description: 'Wir verwenden nur hochwertige Materialien von bewährten Herstellern.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    color: 'from-rose-500 to-pink-600',
    lightColor: 'bg-rose-50',
    textColor: 'text-rose-600',
  },
];

// Realistische Fakten statt übertriebener Statistiken
const facts = [
  {
    icon: '📍',
    title: 'Aus Nürnberg',
    description: 'Ihr lokaler Partner in Franken'
  },
  {
    icon: '📞',
    title: 'Direkt erreichbar',
    description: 'Persönlicher Ansprechpartner'
  },
  {
    icon: '🏠',
    title: 'Komplettsanierung',
    description: 'Alles aus einer Hand'
  },
  {
    icon: '✓',
    title: 'Kostenlose Beratung',
    description: 'Unverbindlich vor Ort'
  },
];

const regions = [
  { name: 'Nürnberg', slug: 'nuernberg' },
  { name: 'Fürth', slug: 'fuerth' },
  { name: 'Erlangen', slug: 'erlangen' },
  { name: 'Bamberg', slug: 'bamberg' },
  { name: 'Würzburg', slug: 'wuerzburg' },
  { name: 'Bayreuth', slug: 'bayreuth' },
  { name: 'Ansbach', slug: 'ansbach' },
  { name: 'Schwabach', slug: 'schwabach' },
];

// Echte Projekte mit existierenden Bildern
const projectShowcase = [
  {
    src: '/photos/projekt-1/nachher/PHOTO-2026-02-27-16-45-20.JPG',
    title: 'Badsanierung Nürnberg',
    type: 'Komplettsanierung'
  },
  {
    src: '/photos/projekt-2/nachher/PHOTO-2026-02-27-16-45-41.JPG',
    title: 'Moderne Badgestaltung',
    type: 'Badsanierung'
  },
  {
    src: '/photos/projekt-3/nachher/IMG_1502.JPG',
    title: 'Wohnraumrenovierung',
    type: 'Innenausbau'
  },
];

export default function UeberUnsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredStrength, setHoveredStrength] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-20 lg:py-32 overflow-hidden bg-[#faf9f7]">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-amber-100/40 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-stone-200/40 to-transparent rounded-full blur-3xl" />
          </div>

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />

          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Content */}
              <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-full text-sm font-medium mb-6">
                  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Über uns
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-800 mb-6 tracking-tight">
                  RD
                  <span className="block bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                    Frankenbau
                  </span>
                </h1>

                <p className="text-lg text-stone-600 leading-relaxed mb-4">
                  <strong>Sanierung, Modernisierung & Innenausbau in Franken.</strong>
                </p>

                <p className="text-base text-stone-500 leading-relaxed mb-8 max-w-xl">
                  Wir sind ein Sanierungsunternehmen aus Nürnberg mit Fokus auf Badsanierung,
                  Wohnungsrenovierung und Komplettsanierung. Unser Ziel: Qualitätsarbeit,
                  faire Preise und zufriedene Kunden.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link href="/kontakt">
                    <Button
                      size="lg"
                      className="px-8 py-7 text-base rounded-2xl bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 hover:from-stone-800 hover:via-stone-700 hover:to-stone-800 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                    >
                      Kostenlose Beratung
                      <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Button>
                  </Link>
                  <a href="tel:+491742629258">
                    <Button
                      variant="outline"
                      size="lg"
                      className="px-8 py-7 text-base rounded-2xl border-2 border-stone-200 bg-white/80 hover:border-stone-300 hover:bg-white text-stone-700 transition-all duration-300"
                    >
                      <svg className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Jetzt anrufen
                    </Button>
                  </a>
                </div>
              </div>

              {/* Right - Facts Cards */}
              <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                <div className="grid grid-cols-2 gap-4">
                  {facts.map((fact, index) => (
                    <div
                      key={fact.title}
                      className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="text-3xl mb-3">{fact.icon}</div>
                      <div className="text-lg font-bold text-stone-800 mb-1">{fact.title}</div>
                      <div className="text-sm text-stone-500">{fact.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wer wir sind Section */}
        <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] -translate-y-1/2 bg-gradient-to-r from-stone-100/60 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium mb-6">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  Wer wir sind
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-8 tracking-tight">
                  Ihr Partner für
                  <span className="block text-stone-600">Sanierungen in Franken</span>
                </h2>

                <div className="space-y-6 text-stone-500 leading-relaxed">
                  <p>
                    <strong className="text-stone-700">RD Frankenbau</strong> ist Ihr Ansprechpartner
                    für Sanierung und Renovierung in Nürnberg und der gesamten Region Franken.
                    Wir übernehmen Projekte jeder Größe – vom einzelnen Badezimmer bis zur
                    Komplettsanierung.
                  </p>
                  <p>
                    Was uns auszeichnet? <strong className="text-stone-700">Ehrliche Kommunikation</strong>,
                    saubere Ausführung und faire Preise. Bei uns wissen Sie immer, woran Sie sind –
                    von der ersten Beratung bis zur Abnahme.
                  </p>
                  <p>
                    Wir arbeiten für Privatpersonen, Vermieter und Investoren.
                    Egal ob Sie Ihre eigene Wohnung verschönern oder eine Immobilie für
                    die Vermietung vorbereiten möchten – wir sind für Sie da.
                  </p>
                </div>

                {/* Was wir bieten */}
                <div className="mt-10 grid grid-cols-2 gap-4">
                  {['Badsanierung', 'Kernsanierung', 'Trockenbau', 'Bodenbeläge'].map((service) => (
                    <div key={service} className="flex items-center gap-3 px-4 py-3 bg-stone-50 rounded-xl">
                      <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium text-stone-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className="order-1 lg:order-2 relative">
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/photos/projekt-2/nachher/PHOTO-2026-02-06-18-18-23.JPG"
                    alt="Professionelle Badsanierung - RD Frankenbau"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-5 hidden md:block">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-stone-800">Nürnberg</div>
                      <div className="text-sm text-stone-500">& ganz Franken</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unsere Stärken Section */}
        <section className="py-20 lg:py-32 bg-[#faf9f7] relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-100/30 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="container-custom relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Warum wir?
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-6 tracking-tight">
                Das können Sie
                <span className="block bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                  von uns erwarten
                </span>
              </h2>
              <p className="text-lg text-stone-500 leading-relaxed">
                Wir versprechen nicht das Blaue vom Himmel – aber das, was wir zusagen, halten wir.
              </p>
            </div>

            {/* Strengths Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {strengths.map((strength, index) => (
                <div
                  key={strength.title}
                  className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-stone-100 overflow-hidden"
                  onMouseEnter={() => setHoveredStrength(index)}
                  onMouseLeave={() => setHoveredStrength(null)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${strength.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                  <div className={`relative w-16 h-16 rounded-2xl ${strength.lightColor} ${strength.textColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {strength.icon}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${strength.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="relative z-10 group-hover:text-white transition-colors duration-300">
                      {strength.icon}
                    </div>
                  </div>

                  <h3 className="relative text-xl font-bold text-stone-800 mb-3">
                    {strength.title}
                  </h3>
                  <p className="relative text-stone-500 leading-relaxed text-sm">
                    {strength.description}
                  </p>

                  <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${strength.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-tl-full rounded-br-3xl`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Unsere Arbeit Section */}
        <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Unsere Projekte
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-6 tracking-tight">
                Einblicke in
                <span className="block text-stone-600">unsere Arbeit</span>
              </h2>
              <p className="text-lg text-stone-500 leading-relaxed">
                Von der Badsanierung bis zur Komplettrenovierung – hier sehen Sie,
                was wir für unsere Kunden umgesetzt haben.
              </p>
            </div>

            {/* Project Photos Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {projectShowcase.map((project, index) => (
                <div
                  key={index}
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full mb-2">
                      {project.type}
                    </span>
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/projekte">
                <Button
                  size="lg"
                  className="px-8 py-6 text-base rounded-2xl bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 hover:from-stone-800 hover:via-stone-700 hover:to-stone-800 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  Alle Projekte ansehen
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Region Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-amber-500/5 to-transparent rounded-full blur-3xl" />
          </div>

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />

          <div className="container-custom relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Unser Einzugsgebiet
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
                Aktiv in ganz
                <span className="block bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Franken
                </span>
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Unser Standort ist Nürnberg. Von hier aus betreuen wir Projekte
                in der gesamten Region – bis zu etwa 100 km Umkreis.
              </p>
            </div>

            {/* Region Tags */}
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {regions.map((region) => (
                <Link
                  key={region.name}
                  href={`/${region.slug}`}
                  className="group px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {region.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* Map/Image Placeholder */}
            <div className="mt-16 max-w-4xl mx-auto">
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 bg-stone-800">
                <Image
                  src="/photos/projekt-3/nachher/IMG_1547.JPG"
                  alt="RD Frankenbau - Sanierung in Franken"
                  fill
                  className="object-cover opacity-60"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">Standort Nürnberg</h3>
                      <p className="text-white/70">Hans Bunte Straße 26, 90431 Nürnberg</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 bg-[#faf9f7] relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-amber-100/40 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="container-custom relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Interesse geweckt?
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-6 tracking-tight">
                Lassen Sie uns über
                <span className="block bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                  Ihr Projekt sprechen
                </span>
              </h2>

              <p className="text-lg text-stone-500 mb-10 max-w-2xl mx-auto">
                Die erste Beratung ist kostenlos und unverbindlich.
                Rufen Sie an oder schreiben Sie uns – wir melden uns zeitnah.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/kontakt">
                  <Button
                    size="lg"
                    className="px-10 py-7 text-base rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-xl shadow-amber-500/20 hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 group"
                  >
                    Projekt anfragen
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button>
                </Link>
                <a href="tel:+491742629258">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-10 py-7 text-base rounded-2xl border-2 border-stone-200 bg-white/80 hover:border-stone-300 hover:bg-white text-stone-700 transition-all duration-300"
                  >
                    <svg className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +49 174 2629258
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
