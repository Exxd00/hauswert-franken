'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { trackFormSubmit, trackImageUpload, trackProjectRequestStart } from '@/lib/utils/analytics';
import { uploadContactFile } from '@/lib/supabase';
import { compressFile, isImageFile, formatFileSize } from '@/lib/utils/file-compression';

const serviceOptions = [
  {
    id: 'kernsanierung',
    name: 'Kernsanierung',
    description: 'Komplette Sanierung bis auf die Grundstruktur',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'badsanierung',
    name: 'Badsanierung',
    description: 'Moderne Badezimmer nach Ihren Wünschen',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 4.97-7 8.97-7 12a7 7 0 1014 0c0-3.03-2.03-7.03-7-12z" />
      </svg>
    ),
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'modernisierung',
    name: 'Modernisierung',
    description: 'Wertsteigerung durch gezielte Updates',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'wohnungsrenovierung',
    name: 'Wohnungsrenovierung',
    description: 'Renovierung für Neuvermietung',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 'sonstiges',
    name: 'Sonstiges',
    description: 'Individuelle Anfragen',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'from-violet-500 to-purple-600',
  },
];

const budgetOptions = [
  { id: 'bis-10000', label: 'Bis 10.000 €' },
  { id: '10000-25000', label: '10.000 - 25.000 €' },
  { id: '25000-50000', label: '25.000 - 50.000 €' },
  { id: '50000-100000', label: '50.000 - 100.000 €' },
  { id: 'ueber-100000', label: 'Über 100.000 €' },
  { id: 'noch-unklar', label: 'Noch unklar' },
];

const sizeOptions = [
  { id: 'bis-50', label: 'Bis 50 m²' },
  { id: '50-100', label: '50 - 100 m²' },
  { id: '100-150', label: '100 - 150 m²' },
  { id: '150-200', label: '150 - 200 m²' },
  { id: 'ueber-200', label: 'Über 200 m²' },
];

const propertyTypes = [
  { id: 'wohnung', label: 'Wohnung', icon: '🏢' },
  { id: 'haus', label: 'Haus', icon: '🏠' },
  { id: 'mehrfamilienhaus', label: 'Mehrfamilienhaus', icon: '🏘️' },
  { id: 'gewerbe', label: 'Gewerbe', icon: '🏪' },
];

interface FormData {
  projektArt: string;
  immobilienTyp: string;
  flaeche: string;
  customFlaeche: string;
  budget: string;
  ort: string;
  name: string;
  email: string;
  telefon: string;
  nachricht: string;
}

const MAX_FILES = 5;

export function ContactSection() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [uploadPercent, setUploadPercent] = useState<number>(0);
  const [uploadPhase, setUploadPhase] = useState<'idle' | 'compressing' | 'uploading' | 'sending'>('idle');
  const [submitError, setSubmitError] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showCustomSize, setShowCustomSize] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    projektArt: '',
    immobilienTyp: '',
    flaeche: '',
    customFlaeche: '',
    budget: '',
    ort: '',
    name: '',
    email: '',
    telefon: '',
    nachricht: '',
  });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

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

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    const service = serviceOptions.find(s => s.id === serviceId);
    if (service) {
      setFormData(prev => ({ ...prev, projektArt: service.name }));
      trackProjectRequestStart();
    }

    setTimeout(() => {
      if (formRef.current) {
        const yOffset = -100;
        const element = formRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }, 150);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePropertyTypeSelect = (typeId: string) => {
    setFormData(prev => ({ ...prev, immobilienTyp: typeId }));
  };

  const handleSizeSelect = (sizeId: string) => {
    if (sizeId === 'custom') {
      setShowCustomSize(true);
      setFormData(prev => ({ ...prev, flaeche: '' }));
    } else {
      setShowCustomSize(false);
      setFormData(prev => ({ ...prev, flaeche: sizeId, customFlaeche: '' }));
    }
  };

  const handleBudgetSelect = (budgetId: string) => {
    setFormData(prev => ({ ...prev, budget: budgetId }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);
    const totalFiles = uploadedFiles.length + newFiles.length;

    if (totalFiles > MAX_FILES) {
      alert(`Maximal ${MAX_FILES} Dateien erlaubt`);
      return;
    }

    trackImageUpload(newFiles.length);
    setUploadedFiles((prev) => [...prev, ...newFiles]);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setUploadProgress('');
    setUploadPercent(0);
    setUploadPhase('idle');

    try {
      trackFormSubmit('project_request', {
        projektArt: formData.projektArt,
        immobilienTyp: formData.immobilienTyp,
        budget: formData.budget,
        hasImages: uploadedFiles.length > 0 ? 'true' : 'false',
      });

      const fileUrls: string[] = [];
      const totalFiles = uploadedFiles.length;

      if (totalFiles > 0) {
        // Phase 1: Compress all files (0% to 50%)
        setUploadPhase('compressing');
        setUploadProgress('Dateien werden komprimiert...');
        const compressedFiles: File[] = [];

        for (let i = 0; i < totalFiles; i++) {
          const file = uploadedFiles[i];
          const progressPercent = Math.round(((i + 1) / totalFiles) * 50);
          setUploadPercent(progressPercent);

          if (isImageFile(file)) {
            setUploadProgress(`Bild ${i + 1}/${totalFiles} wird komprimiert...`);
            const compressedFile = await compressFile(file);
            compressedFiles.push(compressedFile);
          } else {
            setUploadProgress(`Datei ${i + 1}/${totalFiles} wird vorbereitet...`);
            compressedFiles.push(file);
          }
        }

        // Phase 2: Upload compressed files (50% to 90%)
        setUploadPhase('uploading');
        for (let i = 0; i < compressedFiles.length; i++) {
          const progressPercent = 50 + Math.round(((i + 1) / compressedFiles.length) * 40);
          setUploadPercent(progressPercent);
          setUploadProgress(`Datei ${i + 1}/${compressedFiles.length} wird hochgeladen...`);

          try {
            const url = await uploadContactFile(compressedFiles[i]);
            fileUrls.push(url);
          } catch (uploadError) {
            console.error('File upload error:', uploadError);
          }
        }
      }

      // Phase 3: Sending form (90% to 100%)
      setUploadPhase('sending');
      setUploadPercent(95);
      setUploadProgress('Anfrage wird gesendet...');

      const nameParts = formData.name.trim().split(' ');
      const vorname = nameParts[0] || '';
      const nachname = nameParts.slice(1).join(' ') || '';

      const sizeLabel = formData.flaeche
        ? sizeOptions.find(s => s.id === formData.flaeche)?.label || formData.customFlaeche
        : formData.customFlaeche || 'Nicht angegeben';

      const budgetLabel = formData.budget
        ? budgetOptions.find(b => b.id === formData.budget)?.label || 'Nicht angegeben'
        : 'Nicht angegeben';

      const propertyLabel = formData.immobilienTyp
        ? propertyTypes.find(p => p.id === formData.immobilienTyp)?.label || 'Nicht angegeben'
        : 'Nicht angegeben';

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projektArt: formData.projektArt,
          immobilienTyp: propertyLabel,
          ort: formData.ort,
          objektgroesse: sizeLabel,
          zeitrahmen: 'So schnell wie möglich',
          budgetrahmen: budgetLabel,
          vorname,
          nachname,
          email: formData.email,
          telefon: formData.telefon,
          nachricht: formData.nachricht,
          fileUrls,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setUploadPercent(100);
      setUploadProgress('Erfolgreich gesendet!');

      // Small delay to show 100% before redirect
      await new Promise(resolve => setTimeout(resolve, 500));
      router.push('/thank-you');
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitError('Es gab einen Fehler beim Senden. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.');
      setIsSubmitting(false);
      setUploadProgress('');
      setUploadPercent(0);
      setUploadPhase('idle');
    }
  };

  const canSubmit = formData.name && formData.email && formData.telefon && formData.ort && selectedService && privacyAccepted;

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900"
      aria-labelledby="contact-heading"
      id="kontakt"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-72 md:w-96 lg:w-[600px] h-72 md:h-96 lg:h-[600px] bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 md:w-80 lg:w-[500px] h-56 md:h-80 lg:h-[500px] bg-gradient-to-tr from-amber-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container-custom relative z-10">
        <div className={`text-center max-w-2xl mx-auto mb-10 sm:mb-14 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-5">
            <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Projekt anfragen
          </div>
          <h2 id="contact-heading" className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 tracking-tight">
            Was dürfen wir für Sie
            <span className="block bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              sanieren?
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            Wählen Sie Ihre gewünschte Leistung und beschreiben Sie Ihr Projekt.
          </p>
        </div>

        <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-12 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {serviceOptions.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => handleServiceSelect(service.id)}
              className={`group relative p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 text-left min-h-[120px] sm:min-h-[140px] ${
                selectedService === service.id
                  ? 'bg-white border-amber-400 shadow-xl shadow-amber-500/20 scale-[1.02]'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 ${
                selectedService === service.id ? 'text-white' : 'text-white/90'
              }`}>
                {service.icon}
              </div>
              <h3 className={`font-semibold text-sm sm:text-base mb-1 ${
                selectedService === service.id ? 'text-stone-800' : 'text-white'
              }`}>
                {service.name}
              </h3>
              <p className={`text-xs leading-relaxed ${
                selectedService === service.id ? 'text-stone-500' : 'text-white/50'
              }`}>
                {service.description}
              </p>
              {selectedService === service.id && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center animate-scale-in">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        <div
          ref={formRef}
          className={`transition-all duration-700 ease-out ${
            selectedService
              ? 'opacity-100 translate-y-0 max-h-[3000px]'
              : 'opacity-0 translate-y-8 max-h-0 overflow-hidden pointer-events-none'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">

              <div className="text-center mb-8 pb-6 border-b border-stone-100">
                <h3 className="text-xl sm:text-2xl font-bold text-stone-800 mb-2">
                  Projektdetails
                </h3>
                <p className="text-stone-500 text-sm sm:text-base">
                  Je mehr Informationen, desto besser können wir Ihnen helfen
                </p>
              </div>

              <div className="space-y-8">

                <div className="space-y-3">
                  <Label className="text-stone-700 font-semibold text-base">
                    Art der Immobilie *
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {propertyTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => handlePropertyTypeSelect(type.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                          formData.immobilienTyp === type.id
                            ? 'border-amber-500 bg-amber-50 shadow-md'
                            : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        <span className="text-2xl">{type.icon}</span>
                        <span className={`text-sm font-medium ${
                          formData.immobilienTyp === type.id ? 'text-amber-700' : 'text-stone-600'
                        }`}>
                          {type.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-stone-700 font-semibold text-base">
                    Projektgröße (ca. m²)
                  </Label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {sizeOptions.map((size) => (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => handleSizeSelect(size.id)}
                        className={`py-3 px-2 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                          formData.flaeche === size.id
                            ? 'border-amber-500 bg-amber-50 text-amber-700'
                            : 'border-stone-200 hover:border-stone-300 text-stone-600'
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleSizeSelect('custom')}
                      className={`py-3 px-2 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                        showCustomSize
                          ? 'border-amber-500 bg-amber-50 text-amber-700'
                          : 'border-stone-200 hover:border-stone-300 text-stone-600'
                      }`}
                    >
                      Andere
                    </button>
                  </div>
                  {showCustomSize && (
                    <Input
                      name="customFlaeche"
                      value={formData.customFlaeche}
                      onChange={handleInputChange}
                      placeholder="z.B. 75 m²"
                      className="h-12 rounded-xl border-stone-200 focus:border-amber-500 focus:ring-amber-500 mt-2 max-w-xs"
                    />
                  )}
                </div>

                <div className="space-y-3">
                  <Label className="text-stone-700 font-semibold text-base">
                    Geplantes Budget
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                    {budgetOptions.map((budget) => (
                      <button
                        key={budget.id}
                        type="button"
                        onClick={() => handleBudgetSelect(budget.id)}
                        className={`py-3 px-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                          formData.budget === budget.id
                            ? 'border-amber-500 bg-amber-50 text-amber-700'
                            : 'border-stone-200 hover:border-stone-300 text-stone-600'
                        }`}
                      >
                        {budget.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-stone-100 pt-6">
                  <h4 className="text-lg font-semibold text-stone-800 mb-4">Ihre Kontaktdaten</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-stone-700 font-medium">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ihr vollständiger Name"
                      required
                      className="h-12 sm:h-14 rounded-xl border-stone-200 focus:border-amber-500 focus:ring-amber-500 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefon" className="text-stone-700 font-medium">Telefon *</Label>
                    <Input
                      id="telefon"
                      name="telefon"
                      type="tel"
                      value={formData.telefon}
                      onChange={handleInputChange}
                      placeholder="Für schnellen Rückruf"
                      required
                      className="h-12 sm:h-14 rounded-xl border-stone-200 focus:border-amber-500 focus:ring-amber-500 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-stone-700 font-medium">E-Mail *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ihre@email.de"
                      required
                      className="h-12 sm:h-14 rounded-xl border-stone-200 focus:border-amber-500 focus:ring-amber-500 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ort" className="text-stone-700 font-medium">Ort / Stadt *</Label>
                    <Input
                      id="ort"
                      name="ort"
                      value={formData.ort}
                      onChange={handleInputChange}
                      placeholder="z.B. Nürnberg"
                      required
                      className="h-12 sm:h-14 rounded-xl border-stone-200 focus:border-amber-500 focus:ring-amber-500 text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nachricht" className="text-stone-700 font-medium">
                    Projektbeschreibung <span className="text-stone-400 font-normal">(optional)</span>
                  </Label>
                  <Textarea
                    id="nachricht"
                    name="nachricht"
                    value={formData.nachricht}
                    onChange={handleInputChange}
                    placeholder="Beschreiben Sie Ihr Vorhaben, besondere Wünsche, Zeitrahmen..."
                    rows={4}
                    className="rounded-xl border-stone-200 focus:border-amber-500 focus:ring-amber-500 resize-none text-base"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-stone-700 font-medium">
                      Fotos oder Dokumente <span className="text-stone-400 font-normal">(optional)</span>
                    </Label>
                    <span className="text-xs text-stone-400">Max. {MAX_FILES} Dateien</span>
                  </div>

                  <div
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
                      uploadedFiles.length >= MAX_FILES
                        ? 'border-stone-200 bg-stone-50 cursor-not-allowed'
                        : 'border-stone-200 hover:border-amber-400 hover:bg-amber-50/50'
                    }`}
                    onClick={() => uploadedFiles.length < MAX_FILES && fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.pdf,application/pdf"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={uploadedFiles.length >= MAX_FILES}
                    />
                    <svg className="w-10 h-10 text-stone-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-stone-600 font-medium">Klicken oder Dateien hierher ziehen</p>
                    <p className="text-stone-400 text-sm mt-1">JPG, PNG, PDF bis 10MB</p>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-4">
                      {uploadedFiles.map((file, index) => {
                        const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
                        return (
                          <div key={index} className="relative group">
                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 flex items-center justify-center">
                              {isPdf ? (
                                <div className="flex flex-col items-center justify-center p-2">
                                  <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM8.5 13h1.7l.8 2.4.8-2.4h1.7l-1.7 4.3L13.5 22h-1.7l-.8-2.3-.8 2.3H8.5l1.7-4.3L8.5 13z"/>
                                  </svg>
                                  <span className="text-[8px] text-stone-500 mt-1 truncate max-w-full px-1">{file.name.slice(0, 10)}...</span>
                                </div>
                              ) : (
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={`Upload ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                            <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-0.5 rounded-b-lg">
                              {(file.size / 1024 / 1024).toFixed(1)} MB
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {submitError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {submitError}
                  </div>
                )}

                {/* Privacy & Cookies Consent */}
                <div className="space-y-3 pt-4 border-t border-stone-100">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        checked={privacyAccepted}
                        onChange={(e) => setPrivacyAccepted(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                        privacyAccepted
                          ? 'bg-amber-500 border-amber-500'
                          : 'border-stone-300 group-hover:border-amber-400'
                      }`}>
                        {privacyAccepted && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-stone-600 leading-relaxed">
                      Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
                      <a
                        href="/datenschutz"
                        target="_blank"
                        className="text-amber-600 hover:text-amber-700 underline underline-offset-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Datenschutzerklärung
                      </a>{' '}
                      zu und akzeptiere die Verwendung von Cookies zur Bearbeitung meiner Anfrage. *
                    </span>
                  </label>
                </div>

                {/* Progress Bar - shown during submission */}
                {isSubmitting && uploadedFiles.length > 0 && (
                  <div className="space-y-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
                    {/* Phase indicators */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {uploadPhase === 'compressing' && (
                          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        )}
                        {uploadPhase === 'uploading' && (
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        )}
                        {uploadPhase === 'sending' && (
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                        <span className="font-medium text-stone-700">{uploadProgress}</span>
                      </div>
                      <span className="text-stone-500 font-semibold">{uploadPercent}%</span>
                    </div>

                    {/* Progress bar */}
                    <div className="relative h-3 bg-stone-200 rounded-full overflow-hidden">
                      <div
                        className={`absolute inset-y-0 left-0 rounded-full transition-all duration-300 ease-out ${
                          uploadPhase === 'compressing'
                            ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                            : uploadPhase === 'uploading'
                            ? 'bg-gradient-to-r from-blue-400 to-blue-500'
                            : 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                        }`}
                        style={{ width: `${uploadPercent}%` }}
                      />
                      {/* Shimmer effect */}
                      <div
                        className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
                        style={{ width: `${uploadPercent}%` }}
                      />
                    </div>

                    {/* Phase steps */}
                    <div className="flex justify-between text-xs text-stone-400">
                      <span className={uploadPhase === 'compressing' ? 'text-amber-600 font-medium' : uploadPercent >= 50 ? 'text-emerald-600' : ''}>
                        {uploadPercent >= 50 ? '✓' : '1.'} Komprimieren
                      </span>
                      <span className={uploadPhase === 'uploading' ? 'text-blue-600 font-medium' : uploadPercent >= 90 ? 'text-emerald-600' : ''}>
                        {uploadPercent >= 90 ? '✓' : '2.'} Hochladen
                      </span>
                      <span className={uploadPhase === 'sending' ? 'text-emerald-600 font-medium' : ''}>
                        3. Senden
                      </span>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting || !canSubmit}
                  className="w-full h-14 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold text-base sm:text-lg shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:from-stone-400 disabled:to-stone-500"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {uploadedFiles.length > 0 ? `${uploadPercent}%` : (uploadProgress || 'Wird gesendet...')}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      Kostenlose Beratung anfordern
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  )}
                </Button>

                <p className="text-center text-sm text-stone-400">
                  Wir melden uns innerhalb von 24 Stunden bei Ihnen. Ihre Daten werden vertraulich behandelt.
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className={`mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a
            href="tel:+4917635589478"
            className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-white/50">Rufen Sie uns an</p>
              <span className="font-semibold text-white">0176 35589478</span>
            </div>
          </a>

          <a
            href="mailto:info@rd-frankenbau.de"
            className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-white/50">Schreiben Sie uns</p>
              <span className="font-semibold text-white">info@rd-frankenbau.de</span>
            </div>
          </a>

          <div className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-white/50">Unser Standort</p>
              <span className="font-semibold text-white">Nürnberg & ganz Franken</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </section>
  );
}
