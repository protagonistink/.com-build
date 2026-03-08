'use client';

import { useState } from 'react';
import type { FaqItem } from '@/types/blog';

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="max-w-[1180px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-10 md:pb-14">
      <div className="grid gap-12 md:gap-16 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <p className="text-technical text-[11px] tracking-[0.24em] text-rust/80 mb-3">
            FURTHER QUESTIONS
          </p>
          <div className="w-10 h-px bg-rust/70 mb-6" />
          <p className="font-serif text-base md:text-lg leading-relaxed text-ink/55 max-w-[24ch]">
            The article makes the case. These are the questions that usually linger after.
          </p>
        </div>

        <div className="border-t border-b border-ink/[0.08] bg-black/[0.015]">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            const index = String(i + 1).padStart(2, '0');

            return (
              <article
                key={i}
                className="border-b border-ink/[0.08] last:border-b-0 transition-colors duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full grid grid-cols-[auto_1fr_auto] items-start gap-5 md:gap-8 px-0 py-6 md:py-8 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="pt-1 text-technical text-[11px] tracking-[0.22em] text-rust/65 tabular-nums">
                    {index}
                  </span>

                  <span className="font-display text-[1.95rem] md:text-[2.7rem] text-ink leading-[0.98] tracking-tight group-hover:text-rust transition-colors duration-300">
                    {item.question}
                  </span>

                  <span
                    className="flex-shrink-0 mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-rust/20 text-rust transition-all duration-300 group-hover:border-rust/45 group-hover:bg-rust/[0.05]"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    aria-hidden
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </span>
                </button>

                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ maxHeight: isOpen ? '420px' : '0px' }}
                >
                  <div className="grid grid-cols-[auto_1fr] gap-5 md:gap-8 pb-7 md:pb-9">
                    <span className="pt-1 text-technical text-[11px] tracking-[0.22em] text-ink/30">
                      ANSWER
                    </span>
                    <p className="max-w-[46rem] font-serif text-base md:text-[1.15rem] text-ink/72 leading-relaxed md:leading-[1.85] pr-4">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
