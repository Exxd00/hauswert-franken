'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Wie lange dauert eine typische Sanierung?',
    answer: 'Die Dauer hängt vom Umfang des Projekts ab. Eine Badsanierung dauert in der Regel 3-6 Wochen, eine Wohnungsrenovierung 4-8 Wochen, und eine Kernsanierung kann 8-16 Wochen in Anspruch nehmen. Wir erstellen Ihnen einen detaillierten Zeitplan, an den wir uns verbindlich halten.',
  },
  {
    question: 'Ist die Erstberatung kostenlos?',
    answer: 'Ja, die erste Beratung und Besichtigung Ihres Objekts ist für Sie kostenlos und unverbindlich. Wir nehmen uns Zeit, Ihre Wünsche zu verstehen und den Zustand der Immobilie zu analysieren.',
  },
  {
    question: 'Übernehmen Sie die komplette Projektkoordination?',
    answer: 'Ja, wir koordinieren sämtliche Gewerke von der Elektrik über die Sanitärinstallation bis zu den Malerarbeiten. Sie haben einen festen Ansprechpartner, der alle Abläufe steuert und Sie regelmäßig informiert.',
  },
  {
    question: 'In welchen Regionen sind Sie tätig?',
    answer: 'Wir sind in ganz Franken tätig, mit Schwerpunkt auf Nürnberg und einem Umkreis von etwa 100 Kilometern. Das umfasst unter anderem Fürth, Erlangen, Bamberg, Würzburg, Bayreuth und viele weitere Städte und Gemeinden.',
  },
  {
    question: 'Bieten Sie auch Teilsanierungen an?',
    answer: 'Ja, neben Komplettsanierungen führen wir auch gezielte Teilsanierungen durch. Ob einzelne Räume, Bad, Küche oder energetische Maßnahmen – wir beraten Sie, welche Maßnahmen für Ihre Situation am sinnvollsten sind.',
  },
  {
    question: 'Wie läuft die Angebotsphase ab?',
    answer: 'Nach der Besichtigung erstellen wir Ihnen ein detailliertes Angebot mit allen Leistungen, Materialien und Kosten. Das Angebot ist transparent aufgeschlüsselt, sodass Sie genau wissen, was Sie erwartet. Erst nach Ihrer Freigabe beginnen wir mit der Arbeit.',
  },
  {
    question: 'Können Sie Referenzen vorweisen?',
    answer: 'Selbstverständlich. Auf Wunsch zeigen wir Ihnen gerne abgeschlossene Projekte in Ihrer Nähe oder vermitteln den Kontakt zu zufriedenen Kunden. Auch auf unserer Website finden Sie ausgewählte Referenzprojekte.',
  },
  {
    question: 'Was passiert bei unvorhergesehenen Problemen?',
    answer: 'Bei Altbauten können Überraschungen auftreten. Wir informieren Sie sofort über eventuelle Zusatzarbeiten und deren Kosten. Erst nach Ihrer Zustimmung werden zusätzliche Maßnahmen durchgeführt – keine versteckten Kosten.',
  },
];

export function FAQSection() {
  return (
    <section className="section-padding bg-white dark:bg-stone-900" aria-labelledby="faq-heading">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-4">
              Häufige Fragen
            </span>
            <h2 id="faq-heading" className="text-3xl sm:text-4xl lg:text-5xl text-stone-800 dark:text-white mb-6">
              Fragen & Antworten
            </h2>
            <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
              Hier finden Sie Antworten auf die häufigsten Fragen zu unseren Leistungen und Abläufen.
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="bg-stone-50 dark:bg-stone-800 rounded-xl border-none px-6 data-[state=open]:bg-stone-100 dark:data-[state=open]:bg-stone-700 transition-colors duration-300"
              >
                <AccordionTrigger className="text-left py-6 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                  <span className="font-semibold text-lg sm:text-xl text-stone-800 dark:text-white pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Additional Help */}
          <div className="text-center mt-12 p-8 bg-stone-50 dark:bg-stone-800 rounded-2xl">
            <p className="text-lg text-stone-600 dark:text-stone-300 mb-4">
              Ihre Frage ist nicht dabei?
            </p>
            <p className="font-semibold text-lg sm:text-xl text-stone-800 dark:text-white">
              Kontaktieren Sie uns direkt:
              <a href="tel:+491742629258" className="text-amber-600 dark:text-amber-400 ml-2 hover:underline">
                +49 174 2629258
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
