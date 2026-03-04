import HeroSection from '@/components/home/HeroSection';
import NarrativeBridge from '@/components/home/NarrativeBridge';
import TransformationSection from '@/components/home/TransformationSection';
import ServicesSection from '@/components/home/ServicesSection';
import AboutSection from '@/components/home/AboutSection';

export const metadata = {
  title: 'Protagonist Ink — Where Stories Get Their Edge',
  description: 'Story strategy, narrative consulting, and editorial craft for founders and brand-led companies who need language that moves markets.',
  openGraph: {
    title: 'Protagonist Ink — Where Stories Get Their Edge',
    description: 'Story strategy, narrative consulting, and editorial craft for founders and brand-led companies.',
    url: 'https://www.protagonist.ink',
    images: [{ url: '/images/og-default.jpg', width: 914, height: 512, alt: 'Protagonist Ink — Where Stories Get Their Edge' }],
  },
};

export default function Home() {
  return (
    <main>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Narrative Bridge */}
      <NarrativeBridge />

      {/* 3. Transformation — void, "We write your transformation." */}
      <TransformationSection />

      {/* 4. Services — the answer arriving */}
      <ServicesSection />

      {/* 5. About — who we are and why we do this */}
      <AboutSection />
    </main>
  );
}
