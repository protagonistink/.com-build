import ActOne from '@/components/about/ActOne';
import ActTwo from '@/components/about/ActTwo';
import ActThree from '@/components/about/ActThree';
import ActProof from '@/components/about/ActProof';
import ActFour from '@/components/about/ActFour';
import ActFoundersIntro from '@/components/about/ActFoundersIntro';
import ActFounders from '@/components/about/ActFounders';
import ActFive from '@/components/about/ActFive';

export const metadata = {
  title: 'About',
  description: 'Every brand is living a story. Most are losing theirs.',
};

export default function AboutPage() {
  return (
    <main>
      <ActOne />
      <ActTwo />
      <ActThree />
      <ActProof />
      <ActFour />
      <ActFoundersIntro />
      <ActFounders />
      <ActFive />
    </main>
  );
}
