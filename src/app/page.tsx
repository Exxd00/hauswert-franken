import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { TargetAudienceSection } from '@/components/sections/TargetAudienceSection';
import { ValueSection } from '@/components/sections/ValueSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { QualitySection } from '@/components/sections/QualitySection';
import { FAQSection } from '@/components/sections/FAQSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TrustSection />
        <ServicesSection />
        <ProcessSection />
        <TargetAudienceSection />
        <ValueSection />
        <ProjectsSection />
        <TestimonialsSection />
        <QualitySection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
