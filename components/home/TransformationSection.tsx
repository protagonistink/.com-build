"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function TransformationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Entrance Animation
  // Sharpened range for more "drama" and a higher Y-offset
  const opacity = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const y = useTransform(scrollYProgress, [0.3, 0.45], [100, 0]);

  return (
    <section ref={containerRef} className="relative w-full min-h-[72svh] md:min-h-screen bg-[#080808] text-[#FAFAFA] overflow-hidden flex items-center justify-center">
      {/* The Void - Pure, deep dark with subtle gradient */}
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#111111]/40 to-[#000000]"></div>
      </div>

      {/* Grain Overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg' %3E%3Cfilter id='n' %3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")` }}
      ></div>

      <div className="relative z-10 container mx-auto px-6 md:px-8 max-w-4xl py-16 md:py-24">
        <motion.div
          style={{ opacity, y }}
          className="flex flex-col items-center text-center space-y-16"
        >
          {/* Vertical Anchor Top */}
          <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-[#555] to-transparent opacity-60"></div>

          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,8vw,6.5rem)] leading-[1.1] font-light tracking-wide text-[#E5E5E5]">
            <span className="opacity-50 text-base md:text-xl block mb-6 font-[family-name:var(--font-satoshi)] uppercase tracking-[0.3em] font-normal text-[#9B9EA4]">
              We write your
            </span>
            <span className="italic text-[#FAFAFA] font-normal block">
              transformation.
            </span>
          </h2>

          {/* Vertical Anchor Bottom */}
          <div className="w-[1px] h-32 bg-gradient-to-b from-[#555] via-[#555]/30 to-transparent opacity-60"></div>
        </motion.div>
      </div>
    </section>
  );
}
