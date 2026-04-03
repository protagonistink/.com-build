import Image from 'next/image';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';
import type { ClimaxSection } from '@/types/work';

export default function Climax({ section }: { section: ClimaxSection }) {
  const hasMetrics = section.metrics && section.metrics.length > 0;

  return (
    <section className="relative bg-trueblack overflow-hidden py-20 md:py-32 lg:py-40">
      {section.backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={section.backgroundImage.src}
            alt={section.backgroundImage.alt || ''}
            fill
            className="object-cover opacity-10 grayscale"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-trueblack via-trueblack/60 to-trueblack" />
        </div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <ScrollRevealWrapper direction="up">
          {section.label && (
            <span className="text-rust text-[10px] font-black tracking-[0.6em] uppercase block mb-8 md:mb-12">
              {section.label}
            </span>
          )}

          {section.quote && (
            <h2 className="text-white text-2xl md:text-4xl lg:text-[44px] font-serif italic font-medium leading-[1.2] tracking-tight mb-16 md:mb-20 max-w-4xl mx-auto">
              &ldquo;{section.quote}&rdquo;
            </h2>
          )}

          {hasMetrics && (
            <div className="inline-flex flex-wrap justify-center gap-12 md:gap-20">
              {section.metrics!.map((metric) => (
                <div key={metric._key} className="text-center">
                  <span className="block text-rust text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-none tracking-tighter">
                    {metric.value}
                  </span>
                  <span className="block text-[10px] font-bold tracking-[0.25em] uppercase text-white/20 mt-2">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </ScrollRevealWrapper>
      </div>
    </section>
  );
}
