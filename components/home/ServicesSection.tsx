'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import LogoWall from '@/components/home/LogoWall';

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

const services = [
  {
    id: 'audit',
    eyebrow: 'Lost in Translation',
    title: 'Brand &\nStory Audit',
    tagline: 'Find the leak before the ship goes down.',
    image: '/posters/story-audit.png',
    spec: 'Narrative Friction',
    timeline: '1 Week',
    investment: '$1,500',
    description:
      'Most messaging fails not because it\'s wrong — it\'s fragmented. We map your current story against market resonance to find exactly where you\'re leaking trust.',
    deliverables: [
      'Full diagnostic video walkthrough',
      '1-hour deep dive strategy session',
      'Written Gap Analysis report',
      'Prioritized action plan with cost metrics',
      '30-day narrative stewardship support',
    ],
    cta: 'Initiate the Audit',
    ctaHref: 'mailto:hello@protagonist.ink?subject=Story%20Audit%20Inquiry',
  },
  {
    id: 'strategy',
    eyebrow: 'Inside Out',
    title: 'Brand Strategy\n+ Messaging',
    tagline: 'The blueprint for everything you\'ll ever say.',
    image: '/posters/brand-strategy.png',
    spec: 'Structural Alignment',
    timeline: '3–4 Weeks',
    investment: 'Starting at $7,500',
    description:
      'We extract the truth of what you\'re building and codify it into a dominant narrative. This is the blueprint for everything you say — to investors, to customers, to yourself.',
    deliverables: [
      'Stakeholder & Customer discovery',
      'The Narrative Manifesto & Origin Story',
      'Core Values & Behavioral definitions',
      'Positioning & Audience Profiles',
      'Comprehensive Brand Voice system',
      'Website & Pitch messaging guide',
    ],
    cta: 'Design the Foundation',
    ctaHref: 'mailto:hello@protagonist.ink?subject=Narrative%20Spine%20%2B%20Strategy%20Inquiry',
  },
  {
    id: 'full-build',
    eyebrow: 'The Full Monty',
    title: 'Narrative\nArchitecture',
    tagline: 'Every surface. Every word. No seams.',
    image: '/posters/full-build.png',
    spec: 'Completed Journey',
    timeline: '8–12 Weeks',
    investment: 'Starting at $25,000',
    description:
      'Total narrative stewardship. We take the blueprint and construct the entire surface — delivering the finished execution across every critical touchpoint.',
    deliverables: [
      'Everything in Narrative Spine + Strategy',
      'Full Website Copywriting (up to 6p)',
      'Investor or Donor Deck Narrative',
      'Executive Bios & Founder Narrative',
      '3-Month Editorial Content Strategy',
      'Collaborator & Designer Coordination',
      '90-Day Narrative Stewardship Call',
    ],
    cta: 'Inquire for Construction',
    ctaHref: 'mailto:hello@protagonist.ink?subject=Full%20Build%20Inquiry',
    note: 'This engagement isn\'t for everyone. We limit active builds to ensure structural integrity across every touchpoint.',
  },
];

/* ─────────────────────────────────────────────
   ACCORDION SLICE (single poster in the hover accordion)
   ───────────────────────────────────────────── */

function AccordionSlice({
  service,
  index,
  isExpanded,
  onHover,
  onSelect,
}: {
  service: (typeof services)[0];
  index: number;
  isExpanded: boolean;
  onHover: () => void;
  onSelect: () => void;
}) {
  return (
    <motion.div
      className="relative h-full cursor-pointer overflow-hidden"
      style={{ flexShrink: 0 }}
      animate={{
        flexGrow: isExpanded ? 2 : 1.2,
      }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onHover}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onSelect(); }}
      aria-label={`View details for ${service.title.replace('\n', ' ')}`}
    >
      {/* Background image — full poster, positioned to show the interesting part */}
      <Image
        src={service.image}
        alt={service.title.replace('\n', ' ')}
        fill
        className="object-cover object-top"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={index === 0}
      />

      {/* Full overlay gradient — heavier when compressed, lighter when expanded */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-trueblack via-trueblack/60 via-25% to-trueblack/20"
        animate={{ opacity: isExpanded ? 0.55 : 0.88 }}
        transition={{ duration: 0.5 }}
      />

      {/* Edge separator line */}
      {index > 0 && (
        <div className="absolute left-0 inset-y-0 w-px bg-white/[0.06] z-20" />
      )}

      {/* ── Typography overlay ── */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-8 lg:p-10">
        {/* Top: Eyebrow — always visible, with backdrop for legibility */}
        <div>
          <motion.span
            className="inline-block text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-rust font-bold px-2 py-1 rounded-sm backdrop-blur-md bg-trueblack/30"
            animate={{ opacity: isExpanded ? 1 : 0.6 }}
            transition={{ duration: 0.4 }}
          >
            {service.eyebrow}
          </motion.span>
        </div>

        {/* Bottom stack: brutalist title, tagline, price strip */}
        <div className="flex flex-col gap-0">
          {/* Frosted backdrop behind all bottom text */}
          <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-trueblack/80 via-trueblack/40 to-transparent pointer-events-none" />

          {/* Title — brutalist: tight leading, huge, uppercase, flush left */}
          <motion.h3
            className="relative font-display uppercase leading-[0.82] tracking-[0.01em] text-white"
            style={{ textShadow: '0 2px 30px rgba(0,0,0,0.8), 0 1px 6px rgba(0,0,0,0.6)' }}
            animate={{
              fontSize: isExpanded ? 'clamp(3rem, 5.5vw, 5.5rem)' : 'clamp(1.05rem, 1.7vw, 1.45rem)',
              opacity: isExpanded ? 1 : 0.5,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {service.title.replace('\n', ' ')}
          </motion.h3>

          {/* Tagline — only visible when expanded, with frosted backdrop */}
          <motion.p
            className="relative font-sans text-[14px] md:text-[16px] italic text-white/60 mt-3 leading-snug"
            style={{ textShadow: '0 1px 12px rgba(0,0,0,0.7)' }}
            animate={{
              opacity: isExpanded ? 1 : 0,
              y: isExpanded ? 0 : 8,
            }}
            transition={{ duration: 0.4, delay: isExpanded ? 0.15 : 0 }}
          >
            {service.tagline}
          </motion.p>

          {/* Price/timeline strip — with frosted pill */}
          <motion.div
            className="relative flex items-center gap-3 mt-5 overflow-hidden"
            animate={{
              opacity: isExpanded ? 1 : 0,
              height: isExpanded ? 'auto' : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-3 px-3 py-1.5 rounded-sm backdrop-blur-md bg-trueblack/40">
              <span className="text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-white/60 font-mono whitespace-nowrap">
                {service.timeline}
              </span>
              <span className="w-px h-3 bg-white/20 flex-shrink-0" />
              <span className="text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-white/60 font-mono whitespace-nowrap">
                {service.investment}
              </span>
            </span>
          </motion.div>

          {/* CTA hint — expanded only */}
          <motion.div
            className="relative flex items-center gap-2 mt-5 text-[12px] uppercase tracking-[0.28em] text-rust font-semibold"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
            animate={{
              opacity: isExpanded ? 1 : 0,
              x: isExpanded ? 0 : -8,
            }}
            transition={{ duration: 0.35, delay: isExpanded ? 0.25 : 0 }}
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.div>
        </div>
      </div>

      {/* Rust accent line at bottom — visible on expanded */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[3px] bg-rust z-20"
        animate={{ scaleX: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.5, delay: isExpanded ? 0.2 : 0 }}
        style={{ transformOrigin: 'left' }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   OFF-CANVAS SERVICE DRAWER (half-page, 50vw)
   ───────────────────────────────────────────── */

function ServiceDrawer({
  service,
  onClose,
}: {
  service: (typeof services)[0];
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const content = (
    <div className="fixed inset-0 z-[9999] flex">
      {/* Scrim — click to close */}
      <motion.div
        className="absolute inset-0 bg-trueblack/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
      />

      {/* Drawer — half-page width, copy-only, slides from right */}
      <motion.div
        className="relative ml-auto h-full w-full max-w-[72vw] lg:max-w-[50vw] max-md:max-w-full bg-[#0d0d0d] shadow-2xl overflow-y-auto overscroll-contain"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Subtle architectural line texture in background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="15%" y1="0" x2="15%" y2="100%" stroke="white" strokeWidth="0.5" />
            <line x1="85%" y1="0" x2="85%" y2="100%" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1="12%" x2="100%" y2="12%" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky top-6 float-right mr-8 z-30 w-9 h-9 flex items-center justify-center bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-white/40 hover:text-white transition-all"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Full-width copy layout */}
        <div className="relative px-6 md:px-14 lg:px-16 pt-16 md:pt-24 pb-16 min-h-full flex flex-col">
          {/* Eyebrow — dramatic placement */}
          <motion.span
            className="block text-[11px] uppercase tracking-[0.5em] text-rust font-bold mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            {service.eyebrow}
          </motion.span>

          {/* Title — massive, cinematic */}
          <motion.h2
            className="font-display text-[clamp(2.25rem,6vw,5.5rem)] leading-[0.9] text-white whitespace-pre-line mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {service.title}
          </motion.h2>

          {/* Tagline — editorial italic */}
          <motion.p
            className="text-[18px] md:text-[20px] italic text-white/35 mb-12 max-w-md font-display"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {service.tagline}
          </motion.p>

          {/* Thin rule */}
          <motion.div
            className="w-full h-px bg-white/[0.06] mb-10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            style={{ transformOrigin: 'left' }}
          />

          {/* Spec strip — horizontal data line */}
          <motion.div
            className="flex flex-wrap gap-x-12 gap-y-4 mb-12"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-white/20 mb-2 font-mono">Spec</span>
              <span className="text-[14px] uppercase tracking-[0.18em] text-rust font-semibold">{service.spec}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-white/20 mb-2 font-mono">Timeline</span>
              <span className="text-[16px] text-white/60">{service.timeline}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-white/20 mb-2 font-mono">Investment</span>
              <span className="text-[16px] text-white/60">{service.investment}</span>
            </div>
          </motion.div>

          {/* Description — larger, more breathing room */}
          <motion.p
            className="text-[17px] md:text-[18px] leading-[1.8] text-white/50 mb-12 max-w-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            {service.description}
          </motion.p>

          {/* Deliverables */}
          <div className="mb-12">
            <motion.span
              className="block text-[10px] uppercase tracking-[0.35em] text-rust/40 mb-6 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              What You Get
            </motion.span>
            <ul className="flex flex-col gap-4">
              {service.deliverables.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-baseline gap-4 text-[15px] md:text-[16px] text-white/45 leading-[1.55]"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.06, duration: 0.4 }}
                >
                  <span className="text-rust/30 font-mono text-[11px] flex-shrink-0 mt-0.5">0{i + 1}</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Note (Full Build only) */}
          {service.note && (
            <motion.div
              className="mb-12 border-l-2 border-rust/15 pl-6 py-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <p className="text-[14px] text-white/25 italic leading-[1.7]">{service.note}</p>
            </motion.div>
          )}

          {/* CTA — pushed to bottom */}
          <motion.div
            className="mt-auto pt-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            <Link
              href={service.ctaHref}
              className="group inline-flex items-center gap-4 bg-rust text-white px-10 py-5 text-[12px] font-bold uppercase tracking-[0.22em] hover:bg-rust/90 transition-colors"
            >
              {service.cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );

  if (typeof document === 'undefined') return content;
  return createPortal(content, document.body);
}

/* ─────────────────────────────────────────────
   THE GALLERY (Hover Accordion)
   ───────────────────────────────────────────── */

function PosterGallery() {
  const [activeService, setActiveService] = useState<(typeof services)[0] | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <div className="relative">
      {/* Accordion container — all three slices fill the viewport width */}
      <motion.div
        className="flex w-full overflow-hidden"
        style={{ height: 'clamp(440px, 78vh, 920px)' }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {services.map((service, i) => (
          <AccordionSlice
            key={service.id}
            service={service}
            index={i}
            isExpanded={hoveredIndex === i}
            onHover={() => setHoveredIndex(i)}
            onSelect={() => setActiveService(service)}
          />
        ))}
      </motion.div>

      {/* Drawer */}
      <AnimatePresence>
        {activeService && (
          <ServiceDrawer
            service={activeService}
            onClose={() => setActiveService(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   WRITER'S ROOM (Full-bleed cinematic block)
   ───────────────────────────────────────────── */

function WritersRoom() {
  return (
    <div className="relative w-full overflow-hidden bg-trueblack">
      {/* Full-bleed background photo */}
      <div className="absolute inset-0">
        <Image
          src="/writers-room.jpg"
          alt="The Writer's Room workshop"
          fill
          className="object-cover object-center"
          style={{ mixBlendMode: 'luminosity', opacity: 0.22 }}
          sizes="100vw"
        />
        {/* Top gradient — blend with trueblack above */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-trueblack to-transparent" />
        {/* Bottom gradient — blend with next section */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-trueblack to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24 py-28 md:py-32 lg:py-40 max-w-[1400px] mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.38em] text-rust">
            <span className="w-6 h-px bg-rust" />
            Structural Engineering // Live
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.88] tracking-[-0.02em] text-white mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          The Writer&apos;s <br />
          <em className="italic font-light">Room.</em>
        </motion.h2>

        {/* 2-col layout: description left, pricing right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — description + deliverables */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <p className="text-[17px] leading-[1.75] text-white/60 mb-10 max-w-lg">
              A leadership team that can&apos;t agree on the story is building on sand. We facilitate a half or full-day
              high-stakes workshop to force alignment and produce a core story spine in 48 hours.
            </p>

            {/* What's included */}
            <ul className="flex flex-col gap-3 mb-12">
              {[
                'Pre-work questionnaire sent 1 week before',
                'Half or full-day facilitated session',
                'Live whiteboard documentation throughout',
                '48-hour turnaround on written session brief',
                'Narrative framework with core story spine',
                'Key messages for up to 3 audience segments',
                '1 follow-up call within 30 days',
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-baseline gap-3 text-[15px] text-white/45 leading-[1.5]"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.055, duration: 0.4 }}
                >
                  <span className="text-rust/40 font-mono text-[11px] flex-shrink-0">—</span>
                  {item}
                </motion.li>
              ))}
            </ul>

            <Link
              href="mailto:hello@protagonist.ink"
              className="group inline-flex items-center gap-4 bg-rust text-white px-8 py-4 text-[12px] font-bold uppercase tracking-[0.22em] hover:bg-rust/90 transition-colors"
            >
              Request Room Access
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right — pricing */}
          <motion.div
            className="flex flex-col gap-10 lg:pl-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            {/* On-Site */}
            <div className="border-t border-white/10 pt-8">
              <span className="block text-[11px] uppercase tracking-[0.3em] text-white/30 mb-4">On-Site</span>
              <span className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none text-white block mb-4">
                $7,500<span className="text-[1.2rem] text-white/30 font-sans font-normal tracking-normal ml-2">from</span>
              </span>
              <p className="text-[15px] text-white/45 leading-[1.65]">
                Intensive deep dive. Face to face. Whiteboarding the future of your narrative in the room together.
              </p>
            </div>

            {/* Remote */}
            <div className="border-t border-white/10 pt-8">
              <span className="block text-[11px] uppercase tracking-[0.3em] text-white/30 mb-4">Remote</span>
              <span className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none text-white block mb-4">
                $3,000<span className="text-[1.2rem] text-white/30 font-sans font-normal tracking-normal ml-2">from</span>
              </span>
              <p className="text-[15px] text-white/45 leading-[1.65]">
                Focused digital session. Shared screens. Rapid structural iteration with full documentation.
              </p>
            </div>

            {/* Nonprofit note */}
            <div className="border-t border-white/10 pt-8">
              <span className="block text-[11px] uppercase tracking-[0.3em] text-white/30 mb-4">Nonprofits</span>
              <p className="text-[15px] text-white/55 leading-[1.65]">
                We believe in mission-driven work. Discounted rates available — reach out and let&apos;s talk.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   BLUEPRINT SEPARATOR (architectural lines)
   ───────────────────────────────────────────── */

function BlueprintSeparator() {
  return (
    <div className="relative w-full h-24 md:h-32 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full text-white/[0.06]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Primary horizontal rules */}
        <line x1="0" y1="20%" x2="100%" y2="20%" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="0.75" />
        <line x1="0" y1="80%" x2="100%" y2="80%" stroke="currentColor" strokeWidth="0.5" />

        {/* Vertical tick marks — evenly spaced architectural grid */}
        <line x1="6%" y1="35%" x2="6%" y2="65%" stroke="currentColor" strokeWidth="0.5" />
        <line x1="12%" y1="40%" x2="12%" y2="60%" stroke="currentColor" strokeWidth="0.5" />
        <line x1="25%" y1="30%" x2="25%" y2="70%" stroke="currentColor" strokeWidth="0.5" />
        <line x1="38%" y1="42%" x2="38%" y2="58%" stroke="currentColor" strokeWidth="0.5" />
        <line x1="50%" y1="25%" x2="50%" y2="75%" stroke="currentColor" strokeWidth="0.75" />
        <line x1="62%" y1="42%" x2="62%" y2="58%" stroke="currentColor" strokeWidth="0.5" />
        <line x1="75%" y1="30%" x2="75%" y2="70%" stroke="currentColor" strokeWidth="0.5" />
        <line x1="88%" y1="40%" x2="88%" y2="60%" stroke="currentColor" strokeWidth="0.5" />
        <line x1="94%" y1="35%" x2="94%" y2="65%" stroke="currentColor" strokeWidth="0.5" />

        {/* Diagonal construction lines — subtle */}
        <line x1="0" y1="50%" x2="20%" y2="20%" stroke="currentColor" strokeWidth="0.35" strokeDasharray="4 8" />
        <line x1="80%" y1="80%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="0.35" strokeDasharray="4 8" />

        {/* Small crosshair marks at intersections */}
        <circle cx="25%" cy="50%" r="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50%" cy="50%" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="75%" cy="50%" r="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────────── */

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <section id="story-teardown" className="w-full bg-trueblack relative">
      {/* ── Blueprint line separator from section above ── */}
      <BlueprintSeparator />

      {/* ── Manifesto header ── */}
      <div className="pt-20 pb-28 px-6 md:px-12 lg:px-24 relative overflow-hidden" ref={sectionRef}>
        {/* Ambient glow — larger, more present */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: glowY }}
          aria-hidden
        >
          <div className="absolute top-0 left-1/4 w-[700px] h-[600px] rounded-full bg-rust/[0.03] blur-[200px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full bg-rust/[0.02] blur-[160px]" />
        </motion.div>

        {/* Faint rule across full width — architectural */}
        <div className="absolute inset-x-0 top-0 h-px bg-white/[0.05]" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Eyebrow */}
          <motion.span
            className="font-mono text-[10px] tracking-[0.5em] text-white/20 uppercase block mb-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Stage 02 // Copywriting &amp; Narrative Services
          </motion.span>

          {/* Manifesto — staggered lines, each its own motion beat */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-[clamp(2.2rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.01em] text-white">
                You need a brand
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-[clamp(2.2rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.01em] text-white/60 italic font-light pl-[4vw] md:pl-[10vw]">
                that tells the truth
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-[clamp(2.2rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.01em] text-white">
                about what you&apos;re building
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-[clamp(2.2rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.01em] text-rust italic font-light pl-[2vw] md:pl-[6vw]">
                — and why it matters.
              </p>
            </motion.div>
          </div>

          {/* Manifesto body — editorial, generous spacing */}
          <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-12 h-px bg-rust mb-8" />
              <p className="text-[18px] md:text-[20px] leading-[1.7] text-white/50 font-light">
                You&apos;re the hero of this story — not your product, not your pitch deck, not your
                category. <em className="text-white/70 not-italic">You.</em> The founder who saw
                something others missed and built something the world isn&apos;t ready for yet.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[18px] md:text-[20px] leading-[1.7] text-white/50 font-light mb-10">
                We give that story structure, voice, and conviction — across every surface, every
                touchpoint, every room you walk into. So when you speak, people lean in. When they
                read, they remember. When they share, they&apos;re selling for you.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Logo wall ── */}
      <LogoWall />

      {/* ── Section category header: Copy & Narrative Services ── */}
      <div className="px-6 md:px-12 lg:px-24 pb-10 border-t border-white/[0.06] pt-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            className="flex items-end gap-8 md:gap-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Large numeral anchor */}
            <span
              className="font-display text-[clamp(5rem,12vw,9rem)] leading-none text-white/[0.06] select-none flex-shrink-0"
              aria-hidden
            >
              01
            </span>

            {/* Title block */}
            <div className="pb-2 md:pb-4">
              <span className="block font-mono text-[10px] uppercase tracking-[0.5em] text-rust mb-3">
                The Messaging
              </span>
              <h3 className="font-display text-[clamp(2rem,5vw,4.2rem)] leading-[0.9] tracking-[-0.02em] text-white">
                Copy &amp;&nbsp;Narrative
              </h3>
            </div>

            {/* Rule — fills remaining space, aligned to center of title */}
            <div className="flex-1 mb-5 md:mb-8 h-px bg-white/10 hidden sm:block" />
          </motion.div>
        </div>
      </div>

      {/* ── Poster gallery ── */}
      <div className="pb-0">
        <PosterGallery />
      </div>

      {/* ── Blueprint separator + Workshop category header ── */}
      <BlueprintSeparator />

      {/* ── Section category header: Identity & Story Workshops ── */}
      <div className="px-6 md:px-12 lg:px-24 pb-0 border-t border-white/[0.06] pt-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            className="flex items-end gap-8 md:gap-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Large numeral anchor */}
            <span
              className="font-display text-[clamp(5rem,12vw,9rem)] leading-none text-white/[0.06] select-none flex-shrink-0"
              aria-hidden
            >
              02
            </span>

            {/* Title block */}
            <div className="pb-2 md:pb-4">
              <span className="block font-mono text-[10px] uppercase tracking-[0.5em] text-rust mb-3">
                Alignment
              </span>
              <h3 className="font-display text-[clamp(2rem,5vw,4.2rem)] leading-[0.9] tracking-[-0.02em] text-white">
                Story &amp;&nbsp;Strategy Workshops
              </h3>
            </div>

            {/* Rule — fills remaining space */}
            <div className="flex-1 mb-5 md:mb-8 h-px bg-white/10 hidden sm:block" />
          </motion.div>
        </div>
      </div>

      {/* ── Writer's Room ── */}
      <WritersRoom />
    </section>
  );
}
