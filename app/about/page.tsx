import AboutHero from '@/components/about/AboutHero';
import VillainSection from '@/components/about/VillainSection';
import BeliefSection from '@/components/about/BeliefSection';
import MentorSection from '@/components/about/MentorSection';
import ProductionNotes from '@/components/about/ProductionNotes';
import CastAndCrew from '@/components/about/CastAndCrew';
import FadeInCta from '@/components/about/FadeInCta';

export const metadata = {
  title: 'About — Protagonist Ink',
  description: 'Every brand is living a story. The question is which character you are.',
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <VillainSection />
      <BeliefSection />
      <MentorSection />
      <ProductionNotes />
      <CastAndCrew />
      <FadeInCta />
    </main>
  );
}
