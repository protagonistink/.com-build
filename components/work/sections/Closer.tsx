import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';
import type { CloserSection } from '@/types/work';

export default function Closer({ section }: { section: CloserSection }) {
  return (
    <section className="bg-[#f5f2ec] py-24 md:py-36 lg:py-44">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <ScrollRevealWrapper direction="up">
          <div className="w-12 h-px bg-rust mx-auto mb-12 md:mb-16" />
          <p className="font-serif italic text-ink text-xl md:text-2xl lg:text-[28px] leading-relaxed tracking-tight">
            {section.text}
          </p>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
}
