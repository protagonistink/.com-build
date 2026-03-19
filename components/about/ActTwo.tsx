'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { ABOUT_EASE } from '@/components/about/motion';

export default function ActTwo() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const show = prefersReduced || inView;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const creditsY = useTransform(scrollYProgress, [0, 0.45, 1], ['26vh', '4vh', '-10vh']);
  const creditsOpacity = useTransform(scrollYProgress, [0.08, 0.3, 0.85], [0, 1, 0.92]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.08, 1]);

  return (
    <section
      ref={ref}
      className="relative min-h-[120svh] bg-paper overflow-hidden"
    >
      {/* Martini sketch background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          style={prefersReduced ? undefined : { scale: imgScale }}
        >
          <Image
            src="/images/pages/martini_bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Fade the sketch to keep text legible — heavier on left where text sits */}
          <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/85 to-paper/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-paper/60 via-transparent to-paper/70" />
        </motion.div>
      </div>

      {/* Content — first beat overlaps illustration */}
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 relative z-10 px-6 md:px-12 h-[120svh]">
        <motion.div
          className="flex flex-col justify-end pb-14 md:pb-24"
          initial={{ opacity: 0, x: -30 }}
          animate={show ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.88, delay: 0.15, ease: ABOUT_EASE }}
          style={prefersReduced ? undefined : { y: creditsY, opacity: creditsOpacity }}
        >
          <p className="about-scene-label text-rust mb-7">The Origin</p>

          <h2
            className="font-display font-light text-ink"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            To beat your villains,<br />
            you need a sharp <em className="italic text-rust">edge.</em>
          </h2>

          <div className="about-rule mt-8 mb-8 !bg-ink/15" />

          <p
            className="font-sans text-ink/65 leading-relaxed mb-6 max-w-lg"
            style={{ fontSize: '1.05rem' }}
          >
            You need a story that engages, surprises, and brings your audience in. We&apos;ll give you copy, plus a whole lot more. Without an engaging story, copy is motionless. Logos, websites, and content are expensive executions without meaning.
          </p>

          <p
            className="font-sans text-ink/65 leading-relaxed max-w-lg"
            style={{ fontSize: '1.05rem' }}
          >
            If you&apos;ve never heard of the Hero&apos;s Journey, you&apos;re in for a ride. Because that&apos;s how people have told the glory of every book, movie, tale, campfire setting, OMG phone and text thread since the dawn of time. One good guy. One bad guy. One goal.
          </p>
        </motion.div>
      </div>

      {/* Second beat — below the illustration */}
      <div className="relative z-10 bg-paper">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-10 md:gap-20 items-start">
            <p
              className="font-display italic text-ink"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.15rem)', lineHeight: 1.15 }}
            >
              And no, you&apos;re not the Guide.
            </p>

            <div>
              <p
                className="font-sans text-ink/65 leading-relaxed mb-6 max-w-lg"
                style={{ fontSize: '1.05rem' }}
              >
                Not right now. Look, we&apos;ve heard it, too. &quot;Your customers are the heroes and you&apos;re the one making their journeys possible.&quot; That&apos;s what they say. You know what they also say? &quot;Figure your own stuff out before you guide somebody else.&quot;
              </p>

              <p
                className="font-sans text-ink/65 leading-relaxed max-w-lg"
                style={{ fontSize: '1.05rem' }}
              >
                We&apos;re not selling ads, we&apos;re crafting identity. We&apos;re creating the building blocks of your story. You&apos;re the one who started something new. Who saw something others missed. Who had a mission.
              </p>

              <p
                className="font-sans text-ink/65 leading-relaxed max-w-lg"
                style={{ fontSize: '1.05rem' }}
              >
                We&apos;ll take you through the process used in Hollywood writers&apos; rooms, Madison Ave whiteboards, and world-class arts organizations to clarify your goal, strengthen your characters, and rediscover your why.
              </p>

              <Link
                href="/story-teardown"
                className="inline-flex items-center font-sans text-sm tracking-wide text-ink/50 hover:text-rust transition-colors mt-10"
              >
                Ready to see how? Start a story teardown <span className="ml-2 text-rust/60">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
