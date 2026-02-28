import HeroSection from '@/components/home/HeroSection';
import LogoWall from '@/components/home/LogoWall';
import NarrativeBridge from '@/components/home/NarrativeBridge';
import CapacitiesSection from '@/components/home/CapacitiesSection';
import IndigoInterstitial from '@/components/home/IndigoInterstitial';
import ScreeningRoom from '@/components/home/ScreeningRoom';
import AboutSignal from '@/components/home/AboutSignal';
import ServicesSection from '@/components/home/ServicesSection';
import CtaBlock from '@/components/home/CtaBlock';

export default function V4() {
  return (
    <main>
      <HeroSection />
      <LogoWall />
      <NarrativeBridge />
      <CapacitiesSection />
      <IndigoInterstitial />
      <ScreeningRoom />
      <AboutSignal />
      <ServicesSection />
      <CtaBlock />
    </main>
  );
}
