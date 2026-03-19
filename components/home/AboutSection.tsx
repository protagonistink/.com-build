'use client';

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="bg-paper text-ink min-h-screen flex flex-col items-center px-6 md:px-12 lg:px-24 py-24 md:py-32 lg:py-40 relative overflow-hidden">

      {/* Subtle 12-col grid underlay */}
      <div className="absolute inset-0 grid grid-cols-12 gap-4 opacity-[0.02] pointer-events-none px-6 md:px-12 lg:px-24">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="border-r border-ink h-full" />
        ))}
      </div>

      <div className="max-w-[1400px] w-full z-10">

        {/* Top headline — full width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 lg:mb-24"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-ink/35 mb-6 block">
            About Us
          </span>
          <h2 className="font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.9] tracking-[-0.02em] text-ink max-w-5xl">
            Strategy is not a guessing game.
            <br />
            <em className="italic font-light text-ink/50">It&apos;s a story.</em>
          </h2>
        </motion.div>

        {/* Main content: Diptych + Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-8">

          {/* Left: Portrait diptych — staggered Amy & Patrick */}
          <div className="col-span-1 lg:col-span-6 grid grid-cols-2 gap-4 md:gap-6">

            {/* Amy — offset down for stagger */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 md:mt-16"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-ink group">
                <Image
                  src="/photos/amy-kirkland.jpg"
                  alt="Amy Kirkland — Partner, Protagonist Ink"
                  fill
                  className="object-cover object-top grayscale opacity-90 contrast-[1.1] group-hover:grayscale-0 group-hover:saturate-[0.72] group-hover:opacity-100 transition-all duration-700"
                  sizes="(max-width: 1024px) 45vw, 25vw"
                />
              </div>
              {/* Caption */}
              <div className="mt-4 space-y-0.5">
                <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-ink/60 font-medium">
                  Amy Kirkland
                </p>
                <p className="font-sans text-[10px] tracking-[0.1em] text-ink/30 uppercase">
                  Co-Founder / Executive Producer
                </p>
              </div>
            </motion.div>

            {/* Patrick — offset up for stagger */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="-mt-0 md:-mt-4"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-ink group">
                <Image
                  src="/photos/patrick-kirkland-color.jpg"
                  alt="Patrick Kirkland — Founder, Protagonist Ink"
                  fill
                  className="object-cover object-top grayscale opacity-90 contrast-[1.1] group-hover:grayscale-0 group-hover:saturate-[0.72] group-hover:opacity-100 transition-all duration-700"
                  sizes="(max-width: 1024px) 45vw, 25vw"
                />
              </div>
              {/* Caption */}
              <div className="mt-4 space-y-0.5">
                <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-ink/60 font-medium">
                  Patrick Kirkland
                </p>
                <p className="font-sans text-[10px] tracking-[0.1em] text-ink/30 uppercase">
                  Co-Founder / Chief Storyteller
                </p>
              </div>
            </motion.div>

          </div>

          {/* Right side: Text blocks + CTA */}
          <div className="col-span-1 lg:col-start-8 lg:col-span-5 flex flex-col justify-between h-full">
            <div className="space-y-12">

              {/* Background */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="font-sans text-sm font-bold uppercase tracking-[0.3em] border-b border-ink/20 pb-3 mb-5 inline-block text-ink/50">
                  Background
                </h3>
                <p className="font-sans text-base lg:text-lg leading-[1.75] text-ink/75 max-w-xl">
                  Before Protagonist Ink, we spent two decades in the trenches of brand strategy, cultural production and narrative architecture. We learned that most organizations don&apos;t work not because their ideas are bad, but because they can&apos;t articulate why they matter.
                </p>
              </motion.div>

              {/* Methodology */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="font-sans text-sm font-bold uppercase tracking-[0.3em] border-b border-ink/20 pb-3 mb-5 inline-block text-ink/50">
                  Methodology
                </h3>
                <p className="font-sans text-base lg:text-lg leading-[1.75] text-ink/75 max-w-xl">
                  We don&apos;t believe in &quot;best practices.&quot; We believe in rigorous interrogation. We dismantle your current positioning and rebuild it around a single undeniable truth — the one your founder knows in their gut but hasn&apos;t been able to articulate. It&apos;s not comfortable, but it works.
                </p>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 lg:mt-0"
            >
              <Link
                href="/story-teardown"
                className="inline-flex items-center gap-3 group"
              >
                <span className="font-display italic text-2xl lg:text-3xl text-rust border-b border-rust/20 pb-1 group-hover:border-rust/60 transition-colors">
                  Write your story
                </span>
                <ArrowUpRight className="w-6 h-6 text-rust transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
