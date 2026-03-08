'use client';

import { useRef, useEffect, useState } from 'react';
import type { FaqItem } from '@/types/blog';

interface PostCreditsProps {
  items: FaqItem[];
}

export default function PostCredits({ items }: PostCreditsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;
      requestAnimationFrame(() => {
        setProgress(el.scrollLeft / maxScroll);
      });
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="max-w-[1180px] mx-auto px-6 md:px-10 pt-16"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {/* Section header */}
      <p className="text-technical text-[11px] tracking-[0.24em] text-rust/70 mb-3">
        POST-CREDITS
      </p>
      <div className="w-10 h-px bg-rust/60 mb-8" />

      {/* Scroll strip */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-scroll overflow-y-hidden h-[320px] [scroll-snap-type:x_mandatory] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <article
            key={i}
            className="relative flex-shrink-0 w-[82vw] md:w-[80%] md:max-w-[900px] overflow-hidden [scroll-snap-align:start]"
            itemScope
            itemType="https://schema.org/Question"
          >
            {/* Ghost layer — decorative only */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center p-6 pointer-events-none select-none overflow-hidden"
            >
              <span className="font-display italic text-ink opacity-[0.04] leading-[0.9] tracking-tight text-[clamp(72px,10vw,116px)]">
                {item.question}
              </span>
            </div>

            {/* Foreground */}
            <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-10">
              <meta itemProp="name" content={item.question} />

              <p className="font-serif italic text-[1rem] md:text-[1.05rem] text-ink/55 mb-4 max-w-[42ch]">
                {item.question}
              </p>

              <div itemScope itemType="https://schema.org/Answer">
                <meta itemProp="text" content={item.answer} />
                <p className="font-serif text-[1.05rem] md:text-[1.15rem] text-ink/80 leading-relaxed md:leading-[1.8] max-w-[48ch]">
                  {item.answer}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-5 h-px w-full bg-rust/15">
        <div
          className="h-full bg-rust/50"
          style={{ width: `${progress * 100}%`, transition: 'none' }}
        />
      </div>
    </section>
  );
}
