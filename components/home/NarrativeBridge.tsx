import React from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NarrativeBridge() {
  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-12 gap-8 items-center">

        {/* Video Column — replaces portrait */}
        <div className="col-span-12 lg:col-span-7 relative z-10">
          <div className="reveal aspect-[4/5] w-full overflow-hidden shadow-2xl relative">
            <Image
              src="/crowd.jpg"
              alt="City crowd"
              fill
              className="object-cover grayscale opacity-90 transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>
          {/* Decorative element (Stark Outline) */}
          <div className="absolute -bottom-8 -left-8 w-full h-full border border-[#2C2C2C]/10 -z-10 hidden lg:block"></div>
        </div>

        {/* Text Column - Overlapping card */}
        <div className="reveal reveal-delay-1 col-span-12 lg:col-span-5 relative z-20 lg:-ml-24 mt-8 lg:mt-0 bg-[#FAFAFA]/95 backdrop-blur-sm p-8 lg:p-14 shadow-xl border-l-[6px] border-[#C83C2F]">

          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,5vw,5rem)] leading-[0.95] tracking-tight text-[#2C2C2C] mb-10">
            <span className="block font-light">Most founders <br />can feel</span>
            <span className="block italic">when their story <br />isn&apos;t</span>
            <span className="block font-light">working.</span>
          </h2>

          <div className="space-y-8 font-[family-name:var(--font-satoshi)] text-[#2C2C2C]">
            <p className="text-xl md:text-2xl leading-tight font-light opacity-90">
              The problem isn&apos;t your product. It&apos;s that your narrative hasn&apos;t caught up to what you actually built.
            </p>

            <div className="w-16 h-[1px] bg-[#C83C2F]"></div>

            <p className="opacity-70 text-base md:text-lg leading-relaxed max-w-md">
              Investors nod politely. Customers need too much explaining. The board keeps reframing what you do. When the story is right, everything else gets easier.
            </p>

            <Link
              href="/#story-health-check"
              className="inline-flex items-center gap-3 text-[#C83C2F] text-[13px] font-bold tracking-[0.2em] uppercase mt-4 group transition-all duration-300"
            >
              Get the Story Health Check
              <span className="group-hover:translate-x-2 transition-transform duration-300">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
