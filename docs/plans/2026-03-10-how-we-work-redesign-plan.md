# How We Work Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite the About page "How We Work" section (ActFour) as a dark, typographically rigorous section with a scroll-linked text reveal header and three clean editorial beats.

**Architecture:** Single-file rewrite of `components/about/ActFour.tsx`. The component has two major parts: (1) a scroll-linked word-by-word text reveal for the header statement, built with Framer Motion's `useScroll`/`useTransform`, and (2) three simple fade-up beats below. Dark trueblack background with grain texture. No new dependencies.

**Tech Stack:** React 19, Next.js, TypeScript, Tailwind CSS v4, Framer Motion (`motion/react`)

**Design doc:** `docs/plans/2026-03-10-how-we-work-redesign-design.md`

---

### Task 1: Scaffold the dark section shell

**Files:**
- Modify: `components/about/ActFour.tsx` (full rewrite)

**Step 1: Replace entire ActFour.tsx with the dark section shell**

Delete all existing code. Write the new outer section with trueblack background, grain texture, and gradient transitions. No content yet — just the container.

```tsx
'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { ABOUT_EASE } from '@/components/about/motion';

export default function ActFour() {
  return (
    <section className="relative bg-trueblack overflow-hidden">
      {/* Top gradient: paper → trueblack fade */}
      <div
        className="absolute top-0 inset-x-0 h-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, var(--color-paper), var(--color-trueblack))',
        }}
      />

      {/* Film grain texture */}
      <div className="absolute inset-0 texture-grain opacity-[0.055] pointer-events-none" />

      {/* Content placeholder */}
      <div className="relative py-24 md:py-32 max-w-[1400px] mx-auto px-6 md:px-12">
        <p className="text-paper font-sans">ActFour shell — content coming</p>
      </div>

      {/* Bottom gradient: trueblack → paper fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, var(--color-paper), var(--color-trueblack))',
        }}
      />
    </section>
  );
}
```

**Step 2: Verify visually**

Run: `npm run dev`
Navigate to `/about` and scroll to where ActFour is. Confirm:
- Dark trueblack background visible between ActProof (light) and ActFoundersIntro (light)
- Gradient transitions at top and bottom blend smoothly — no hard edges
- Grain texture is subtle but visible
- Page rhythm now alternates: light → dark → light

**Step 3: Commit**

```bash
git add components/about/ActFour.tsx
git commit -m "refactor(about): replace ActFour shell with dark trueblack section"
```

---

### Task 2: Build the scroll-linked text reveal component

**Files:**
- Modify: `components/about/ActFour.tsx`

This is the header's scroll-linked word-by-word opacity reveal. Each word starts at 20% opacity and transitions to full opacity as the user scrolls through a tall container. The text stays sticky-centered.

**Step 1: Add the TextReveal sub-component and eyebrow inside ActFour.tsx**

Add this above the default export in `ActFour.tsx`:

```tsx
import {
  useRef,
  type ReactNode,
} from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  type MotionValue,
} from 'motion/react';
import { ABOUT_EASE } from '@/components/about/motion';

const STATEMENT_WORDS = [
  // Line 1 — renders in paper color
  { text: 'We', color: 'paper' as const },
  { text: 'build', color: 'paper' as const },
  { text: 'the', color: 'paper' as const },
  { text: 'blueprint.', color: 'paper' as const },
  { text: 'The', color: 'paper' as const },
  { text: 'narrative.', color: 'paper' as const },
  { text: 'The', color: 'paper' as const },
  { text: 'creative.', color: 'paper' as const },
  // Line 2 — renders in rust
  { text: 'You', color: 'rust' as const },
  { text: 'build', color: 'rust' as const },
  { text: 'the', color: 'rust' as const },
  { text: 'transformation.', color: 'rust' as const },
];

function RevealWord({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: (typeof STATEMENT_WORDS)[number];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
  const color =
    word.color === 'rust' ? 'var(--color-rust)' : 'var(--color-paper)';

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-[0.3em] last:mr-0"
    >
      {word.text}
    </motion.span>
  );
}

function TextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  if (prefersReduced) {
    return (
      <div className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <p
            className="font-display font-light"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3.4rem)',
              lineHeight: 1.12,
            }}
          >
            <span className="text-paper">
              We build the blueprint. The narrative. The creative.
            </span>
            <br />
            <span className="text-rust mt-2 inline-block">
              You build the transformation.
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: '180vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <p
            className="font-display font-light flex flex-wrap justify-center"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3.4rem)',
              lineHeight: 1.12,
            }}
          >
            {STATEMENT_WORDS.map((word, i) => (
              <RevealWord
                key={i}
                word={word}
                index={i}
                total={STATEMENT_WORDS.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Wire the TextReveal and eyebrow into ActFour's render**

Replace the content placeholder inside the section with:

```tsx
{/* Eyebrow — fades in before scroll reveal */}
<div className="relative pt-24 md:pt-32 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
  <motion.p
    className="font-sans text-rust text-[0.64rem] tracking-[0.24em] uppercase"
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.7, ease: ABOUT_EASE }}
  >
    Narrative Architecture
  </motion.p>
</div>

{/* Scroll-linked text reveal */}
<TextReveal />
```

**Step 3: Verify visually**

Run: `npm run dev`
Navigate to `/about`, scroll to ActFour. Confirm:
- "NARRATIVE ARCHITECTURE" eyebrow appears in rust, small-caps, centered
- As you scroll, words reveal from 20% → 100% opacity one by one
- "We build the blueprint. The narrative. The creative." appears in paper color
- "You build the transformation." appears in rust
- Text stays sticky-centered while scrolling through the 180vh container
- On reduced motion (System Preferences → Accessibility → Reduce motion): all text renders immediately at full opacity with no scroll interaction

**Step 4: Commit**

```bash
git add components/about/ActFour.tsx
git commit -m "feat(about): add scroll-linked text reveal header to ActFour"
```

---

### Task 3: Add the three editorial beats

**Files:**
- Modify: `components/about/ActFour.tsx`

**Step 1: Add the BEATS data and Beat sub-component**

Add this data array near the top of the file (after STATEMENT_WORDS):

```tsx
const BEATS = [
  {
    headline: 'We start by listening.',
    body: 'Brand audit, stakeholder conversations, audience mapping. Our Narrative Audit reveals the story hiding in plain sight.',
  },
  {
    headline: 'We blend strategy with story structure.',
    body: 'We build the narrative framework, your main characters, and your top level messaging.',
  },
  {
    headline: 'We roll out the red carpet.',
    body: 'Identity, messaging, copy, campaigns, and culture. Because story without execution is just daydreaming.',
  },
] as const;

function Beat({
  beat,
  index,
  isLast,
}: {
  beat: (typeof BEATS)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const show = prefersReduced || inView;

  return (
    <>
      <motion.div
        ref={ref}
        className="py-10 md:py-14"
        initial={{ opacity: 0, y: 20 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.7,
          delay: index * 0.1,
          ease: ABOUT_EASE,
        }}
      >
        <h3
          className="font-display font-light text-paper"
          style={{
            fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)',
            lineHeight: 1.1,
          }}
        >
          {beat.headline}
        </h3>
        <p
          className="font-sans text-paper/55 mt-3 max-w-xl"
          style={{ fontSize: '0.95rem', lineHeight: 1.65 }}
        >
          {beat.body}
        </p>
      </motion.div>
      {!isLast && (
        <div className="border-t border-paper/8" aria-hidden />
      )}
    </>
  );
}
```

**Step 2: Wire the beats into ActFour's render**

Add this after the TextReveal, before the bottom gradient:

```tsx
{/* Ruled line: transition from manifesto to method */}
<div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
  <div className="border-t border-paper/10" aria-hidden />
</div>

{/* Three beats */}
<div className="relative max-w-[1400px] mx-auto px-6 md:px-12 pb-24 md:pb-32">
  {BEATS.map((beat, i) => (
    <Beat
      key={i}
      beat={beat}
      index={i}
      isLast={i === BEATS.length - 1}
    />
  ))}
</div>
```

**Step 3: Verify visually**

Run: `npm run dev`
Navigate to `/about`, scroll through ActFour. Confirm:
- After the text reveal completes, a thin ruled line separates header from beats
- Three beats appear vertically stacked, left-aligned
- Headlines are large Cormorant in paper color
- Body text is smaller Satoshi in paper/55 (muted)
- Thin ruled lines (`paper/8`) separate beats 1→2 and 2→3
- No ruled line after the last beat
- Each beat fades up on scroll with slight stagger (0s, 0.1s, 0.2s)
- On mobile: same structure, single column, slightly tighter spacing
- Reduced motion: beats render immediately with no animation

**Step 4: Commit**

```bash
git add components/about/ActFour.tsx
git commit -m "feat(about): add three editorial beats to ActFour"
```

---

### Task 4: Polish and verify full section

**Files:**
- Modify: `components/about/ActFour.tsx` (tweaks only)

**Step 1: Full-page scroll-through verification**

Run: `npm run dev`
Scroll through the entire About page from top to bottom. Check:

1. **Page rhythm:** dark hero → light origin → mixed beliefs → light proof → **dark methodology** → light founders → dark CTA. The alternation should feel natural now.
2. **Gradient transitions:** The top gradient (paper → trueblack) should blend seamlessly with ActProof's bottom edge. The bottom gradient (trueblack → paper) should blend into ActFoundersIntro.
3. **Scroll reveal pacing:** The 180vh container should give enough scroll distance that the word reveal feels meditative, not rushed. If it feels too long, adjust to 160vh. If too short, adjust to 200vh.
4. **Text wrapping:** On narrow viewports (375px mobile), verify the statement text wraps cleanly and words don't break mid-word. The `flex-wrap justify-center` should handle this.
5. **Sticky behavior:** The text reveal should stay centered while scrolling. It should not overlap the eyebrow above or the beats below.
6. **Beat readability:** Body text at `paper/55` on trueblack should have sufficient contrast. If too dim, bump to `paper/60`.

**Step 2: Adjust spacing/sizing if needed**

Tweak any values that don't look right after the visual check. Common adjustments:
- Scroll container height (180vh → 160vh or 200vh)
- Body text opacity (paper/55 → paper/60)
- Beat padding (py-10 → py-12)
- Word spacing in reveal (mr-[0.3em] → mr-[0.25em])

**Step 3: Run build**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript errors.

**Step 4: Commit final polish**

```bash
git add components/about/ActFour.tsx
git commit -m "polish(about): tune ActFour spacing, contrast, and scroll pacing"
```

---

## Summary

| Task | What | Commit |
|------|------|--------|
| 1 | Dark section shell with gradients + grain | `refactor(about): replace ActFour shell…` |
| 2 | Scroll-linked text reveal header | `feat(about): add scroll-linked text reveal…` |
| 3 | Three editorial beats with ruled lines | `feat(about): add three editorial beats…` |
| 4 | Polish, verify rhythm, build check | `polish(about): tune ActFour spacing…` |
