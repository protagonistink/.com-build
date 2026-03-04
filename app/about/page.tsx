import ActOne from '@/components/about/ActOne';
import ActTwo from '@/components/about/ActTwo';
import ActThree from '@/components/about/ActThree';
import ActFour from '@/components/about/ActFour';
import ActFive from '@/components/about/ActFive';
import Breath from '@/components/about/Breath';

export const metadata = {
  title: 'About',
  description: 'Every brand is living a story. Most are losing theirs.',
};

export default function AboutPage() {
  return (
    <main>
      <ActOne />
      <Breath variant="void" />
      <ActTwo />
      <Breath variant="rule" />
      <ActThree />
      <Breath variant="timecode" timecode="INT. THE METHOD — CONTINUOUS" />
      <ActFour />
      <Breath variant="deep" />
      <ActFive />
    </main>
  );
}
