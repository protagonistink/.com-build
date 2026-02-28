import HeroSection from '@/components/home/HeroSection';
import NarrativeBridge from '@/components/home/NarrativeBridge';
import TransformationSection from '@/components/home/TransformationSection';
import ServicesSection from '@/components/home/ServicesSection';
import AboutSection from '@/components/home/AboutSection';

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
