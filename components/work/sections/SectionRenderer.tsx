import type { CaseStudySection } from '@/types/work';
import Prologue from './Prologue';
import Showcase from './Showcase';
import Climax from './Climax';
import VideoEmbed from './VideoEmbed';
import Deliverables from './Deliverables';
import Closer from './Closer';

export default function SectionRenderer({ sections }: { sections: CaseStudySection[] }) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case 'prologue':
            return <Prologue key={section._key} section={section} />;
          case 'showcase':
            return <Showcase key={section._key} section={section} />;
          case 'climax':
            return <Climax key={section._key} section={section} />;
          case 'videoEmbed':
            return <VideoEmbed key={section._key} section={section} />;
          case 'deliverables':
            return <Deliverables key={section._key} section={section} />;
          case 'closer':
            return <Closer key={section._key} section={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}
