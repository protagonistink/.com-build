# About Page "Five-Act Reel" Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restructure the About page from 7 flat sections into a 5-act cinematic scroll film with breathing room, kinetic typography, and an emotional departure moment.

**Architecture:** Replace all 7 existing About components with 6 new ones (5 acts + reusable Breath). Extend the existing motion system. Reuse TypewriterHeadline and PatrickScene patterns. The page becomes a continuous scroll story with void breaths between acts.

**Tech Stack:** Next.js 16 / React 19 / TypeScript / Tailwind CSS v4 / Framer Motion (motion/react) / existing TypewriterHeadline component

**Design doc:** `docs/plans/2026-03-04-about-page-five-act-reel.md` — reference for all visual specs, copy, and animation details.

---

### Task 1: Extend motion.ts with new constants

**Files:**
- Modify: `components/about/motion.ts`

**Step 1: Add scroll ease and typewriter presets**

```ts
// Add after existing exports in motion.ts

export const ABOUT_SCROLL_EASE = [0.16, 1, 0.3, 1] as const;

export const TYPEWRITER_SLOW = { wordDelay: 120, initialDelay: 400 } as const;
export const TYPEWRITER_FAST = { wordDelay: 80, initialDelay: 200 } as const;
```

**Step 2: Verify TypeScript compiles**

Run: `cd "/Users/pat/Sites/Protagonist Ink/next" && npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors related to motion.ts

**Step 3: Commit**

```bash
git add components/about/motion.ts
git commit -m "feat(about): extend motion system with scroll ease and typewriter presets"
```

---

### Task 2: Add CSS utility classes to globals.css

**Files:**
- Modify: `app/globals.css`

**Step 1: Add new about utility classes**

Add these after the existing `.about-section-edge` block:

```css
/* Full-viewport belief word */
.about-belief-word {
  font-family: var(--font-display);
  font-weight: 300;
  line-height: 0.85;
  letter-spacing: -0.03em;
  text-align: center;
}

/* Methodology step number (ghost weight) */
.about-step-number {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 0.85;
  color: color-mix(in srgb, var(--color-ink) 6%, transparent);
}
```

**Step 2: Verify build**

Run: `cd "/Users/pat/Sites/Protagonist Ink/next" && npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: Clean

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat(about): add belief-word and step-number CSS utilities"
```

---

### Task 3: Create Breath component

**Files:**
- Create: `components/about/Breath.tsx`

**Step 1: Build the Breath component**

Reference design doc section "BREATH — The Void" for full spec. Key requirements:
- 4 variants: `void`, `rule`, `timecode`, `deep`
- `void`: black (#050505), grain at 0.06, `min-h-[45vh]`, nothing else
- `rule`: paper bg, animated rust horizontal rule expanding from center (`scaleX: 0→1` over 1.4s, scroll-triggered), `min-h-[30vh]`
- `timecode`: black void + centered timecode text that fades in at scroll midpoint, `min-h-[40vh]`
- `deep`: black, grain at 0.08, `min-h-[55vh]`, longest pause
- All dark variants use `texture-grain` class
- `aria-hidden="true"` on all variants (no semantic content)
- Rule variant: use `motion.div` with `useInView` to trigger `scaleX` animation
- Timecode variant: use `motion.p` with `useInView` for fade-in

```tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ABOUT_EASE } from '@/components/about/motion';

interface BreathProps {
  variant: 'void' | 'rule' | 'timecode' | 'deep';
  timecode?: string;
}

export default function Breath({ variant, timecode }: BreathProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });

  if (variant === 'rule') {
    return (
      <div
        ref={ref}
        className="relative min-h-[30vh] bg-paper texture-paper flex items-center justify-center"
        aria-hidden="true"
      >
        <motion.div
          className="w-full max-w-xs h-px bg-rust/50"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, ease: ABOUT_EASE }}
        />
      </div>
    );
  }

  const isDeep = variant === 'deep';
  const minHeight = variant === 'deep' ? 'min-h-[55vh]' : variant === 'timecode' ? 'min-h-[40vh]' : 'min-h-[45vh]';
  const grainOpacity = isDeep ? 'opacity-[0.08]' : 'opacity-[0.06]';

  return (
    <div
      ref={ref}
      className={`relative ${minHeight} bg-[#050505] flex items-center justify-center overflow-hidden`}
      aria-hidden="true"
    >
      {/* Film grain */}
      <div
        className={`absolute inset-0 ${grainOpacity} pointer-events-none mix-blend-overlay`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {variant === 'timecode' && timecode && (
        <motion.p
          className="about-timecode text-paper/30 relative z-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: ABOUT_EASE }}
        >
          {timecode}
        </motion.p>
      )}
    </div>
  );
}
```

**Step 2: Verify TypeScript compiles**

Run: `cd "/Users/pat/Sites/Protagonist Ink/next" && npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: Clean

**Step 3: Commit**

```bash
git add components/about/Breath.tsx
git commit -m "feat(about): add Breath void/silence component with 4 variants"
```

---

### Task 4: Create ActOne — "The Noise"

**Files:**
- Create: `components/about/ActOne.tsx`

**Step 1: Build ActOne component**

Reference design doc section "ACT I — The Noise" for full visual spec. Key requirements:

- `'use client'` — uses scroll hooks
- Container: `min-h-[150vh]` to create scroll-driven pacing
- Background: `bg-trueblack` (#0a0a0a)
- Background image (`/hero-typewriter.png`): scroll-linked opacity using `useScroll` + `useTransform`
  - `useTransform(scrollYProgress, [0, 0.2, 0.5], [0, 0.15, 0.35])` for image opacity
  - Same gradient overlays as current VillainSection (gradient-to-r, gradient-to-t)
  - Grayscale, contrast-[1.25], brightness-[0.5] filters on image
- Headline: `TypewriterHeadline` component with text "Every brand is living a story."
  - Cormorant, `clamp(3.5rem, 9vw, 8rem)`, font-light, text-paper, centered
  - Use `TYPEWRITER_FAST` preset (wordDelay: 80, initialDelay: 200)
  - Scroll-triggered visibility: wrap in a div whose opacity is driven by `useTransform(scrollYProgress, [0.1, 0.2], [0, 1])`
- Second line: "Most are losing theirs."
  - Satoshi (font-sans), `clamp(1.2rem, 2vw, 1.6rem)`, uppercase, tracking-[0.2em], text-paper/55
  - NOT typewriter — simple `motion.p` fade-in
  - Scroll-triggered: `useTransform(scrollYProgress, [0.3, 0.38], [0, 1])` for opacity
- Villain body text: absorb key line from current VillainSection
  - "Vision gets buried by noise, drift, and generic language..."
  - Satoshi, `clamp(0.92rem, 1.36vw, 1.08rem)`, text-paper/45, max-w-xl, centered
  - Scroll-triggered: `useTransform(scrollYProgress, [0.45, 0.55], [0, 1])` for opacity
- Crop marks: `crop-marks crop-marks-lg` on an absolute-positioned div
- Timecode: `CUT 00:00:01:24` top-right, fades in late (scrollYProgress > 0.6)
- Content centered vertically using sticky positioning or flex within the tall container
- Use `position: sticky; top: 50%` on the content wrapper so it stays centered while the scroll container moves past

**Important scroll pattern:**

```tsx
const containerRef = useRef(null);
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start start', 'end end'],
});

// Derive all opacities from scrollYProgress
const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0, 0.15, 0.35]);
const headlineOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
const punchlineOpacity = useTransform(scrollYProgress, [0.3, 0.38], [0, 1]);
const bodyOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
const timecodeOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
```

The content wrapper uses `sticky top-[50vh] -translate-y-1/2` so all text stays centered as the user scrolls through the 150vh container.

**Step 2: Verify TypeScript compiles**

Run: `cd "/Users/pat/Sites/Protagonist Ink/next" && npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: Clean

**Step 3: Commit**

```bash
git add components/about/ActOne.tsx
git commit -m "feat(about): add ActOne — scroll-driven dark opening with typewriter reveal"
```

---

### Task 5: Create ActTwo — "The Realization"

**Files:**
- Create: `components/about/ActTwo.tsx`

**Step 1: Build ActTwo component**

Reference design doc section "ACT II — The Realization". Key requirements:

- Based heavily on current `MentorSection.tsx` — same structure but refined
- Container: `min-h-[100svh]`, `bg-paper`, overflow-hidden
- Grid: `grid-cols-1 md:grid-cols-5` (image gets 3 cols, text gets 2 on desktop)
- Amy's photo (`/images/about/amy.jpg`):
  - Full height of section on desktop (`min-h-full`)
  - Reduced filters vs current: `grayscale contrast-[1.15] brightness-[0.82]` (was 1.25/0.78)
  - Keep: `sepia-[0.08]`, grain overlay, amber tint `bg-amber-900/10`
  - Gradient: `bg-gradient-to-t from-ink/45 via-transparent to-transparent` (softer than current)
  - Caption: `Fig 1. Atlanta, GA — Home Base`
  - Hover: `group-hover:scale-105` with `duration-1000`
- Text side:
  - Scene label: `The Origin` in rust
  - Heading: "It started with a realization." — Cormorant, light, `clamp(2rem, 4vw, 3.35rem)`
  - Body paragraphs (from current MentorSection, keep as-is):
    - "Two careers. One late conversation..."
    - "So we did what any two people on the edge of something do: we built a raft."
  - Credits grid at bottom (keep from current MentorSection)
- Animation: same as current MentorSection
  - Image: `opacity 0→1, scale: 1.04→1` over 1.1s
  - Text: `opacity 0→1, x: 24→0` over 0.88s, delayed 0.15s
- Use `useInView` with `once: true, margin: '-15%'`

**Step 2: Verify TypeScript compiles**

Run: `cd "/Users/pat/Sites/Protagonist Ink/next" && npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: Clean

**Step 3: Commit**

```bash
git add components/about/ActTwo.tsx
git commit -m "feat(about): add ActTwo — Amy's origin story with warmer photo treatment"
```

---

### Task 6: Create ActThree — "What We Believe"

**Files:**
- Create: `components/about/ActThree.tsx`

**Step 1: Build ActThree component**

Reference design doc section "ACT III — What We Believe". This is the most complex new component. Key requirements:

- Three sequential full-viewport belief sections stacked vertically
- Each belief is its own scroll container with `min-h-[100vh]`
- Data array:

```ts
const BELIEFS = [
  {
    word: 'TRUTH',
    body: "Strategy without conviction is just noise. We start with what you actually believe, then build outward.",
    dark: true,
    color: 'text-paper', // word color on dark bg
  },
  {
    word: 'TENSION',
    body: "The line that lands changes the room. We find the sentence that carries your case without extra scaffolding.",
    dark: false,
    color: 'text-ink', // word color on light bg
  },
  {
    word: 'STORY',
    body: "Authenticity, passion, drama, thrill — these aren't soft assets. They're the only things audiences remember.",
    dark: true,
    color: 'text-rust', // climactic belief gets rust
  },
];
```

- Each belief sub-component (`BeliefPanel`):
  - Container ref + `useScroll({ target, offset: ['start start', 'end start'] })`
  - Giant word: `about-belief-word` class, `clamp(5rem, 18vw, 14rem)`, centered
  - Word opacity: `useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 1, 0.04])` — fades in, then becomes watermark
  - Body text: `useTransform(scrollYProgress, [0.35, 0.55], [0, 1])` for opacity, `[40, 0]` for y
  - Body: Satoshi, `1rem`, max-w-lg, centered, `text-paper/60` (dark) or `text-ink/60` (light)
  - Dark panels: `bg-trueblack texture-grain`
  - Light panels: `bg-paper texture-paper`
  - Content uses `sticky top-0 h-screen flex items-center justify-center flex-col` pattern

- The outer ActThree component just renders three BeliefPanels in sequence
- Heading hierarchy: each belief word is an `<h2>` for accessibility

**Step 2: Verify TypeScript compiles**

Run: `cd "/Users/pat/Sites/Protagonist Ink/next" && npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: Clean

**Step 3: Commit**

```bash
git add components/about/ActThree.tsx
git commit -m "feat(about): add ActThree — kinetic typography belief sequence (TRUTH/TENSION/STORY)"
```

---

### Task 7: Create ActFour — "How We Work"

**Files:**
- Create: `components/about/ActFour.tsx`

**Step 1: Build ActFour component**

Reference design doc section "ACT IV — How We Work". Two parts: methodology title cards + Patrick scene.

**Part A: Methodology Steps**

- Container: `bg-paper texture-paper`, `py-28 md:py-40`
- Scene label: "Methodology & Process"
- 4 steps with alternating alignment:

```ts
const STEPS = [
  { num: '01', title: 'Discovery', desc: "We start by listening. Brand audit, stakeholder conversations, audience mapping — finding the story hiding in plain sight.", align: 'left' as const },
  { num: '02', title: 'Architecture', desc: "Strategy meets screenplay. We build the narrative framework: protagonist, conflict, stakes, and arc.", align: 'right' as const },
  { num: '03', title: 'Integration', desc: "Story without execution is just daydreaming. We carry the narrative into identity, messaging, campaigns, and culture.", align: 'left' as const },
  { num: '04', title: 'The Result', desc: "Invisibility becomes recognition. Confusion becomes conviction. Same organization. New story. Different future.", align: 'right' as const },
];
```

- Each step row:
  - Number: `about-step-number` class, `clamp(4rem, 12vw, 9rem)`
  - Title: Cormorant, `clamp(1.4rem, 2.5vw, 2.2rem)`, font-light
  - Desc: Satoshi, ~0.95rem, text-ink/60, max-w-md
  - Left-aligned: content on left side, number slides from `x: -60`
  - Right-aligned: content on right side (`text-right`), number slides from `x: 60`
  - Use `useInView` per step with staggered margins
  - Step name/desc enter 0.1s after number

- Steps separated by `py-16 md:py-20` and thin `border-b border-ink/8`

**Part B: Patrick Scene**

- After the steps, embed the Patrick scene
- Port the existing `PatrickScene` function from `CastAndCrew.tsx` largely intact
- Keep: dark bg, parallax image, watermark name, blockquote, bottom rust line
- Keep: timecode `EXT. THE ARCHITECT — CONTINUOUS`
- Keep: blockquote "We don't write for the audience. We write for the room."
- Keep: all existing animation (parallax `useTransform`, staggered reveals)
- This is a copy-paste-and-clean of the existing PatrickScene code

**Step 2: Verify TypeScript compiles**

Run: `cd "/Users/pat/Sites/Protagonist Ink/next" && npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: Clean

**Step 3: Commit**

```bash
git add components/about/ActFour.tsx
git commit -m "feat(about): add ActFour — methodology title cards + Patrick scene"
```

---

### Task 8: Create ActFive — "The Departure"

**Files:**
- Create: `components/about/ActFive.tsx`

**Step 1: Build ActFive component**

Reference design doc section "ACT V — The Departure". The most important moment on the page.

- Container: `min-h-[100svh]`, `bg-trueblack`, flex center, overflow-hidden
- Film grain: higher opacity (0.07) for atmosphere
- Content centered, `max-w-3xl`, `text-center`
- Triggered by `useInView` on the container ref (`once: true, margin: '-10%'`)

Sequence (all delays calculated from `inView` becoming true):

1. Scene label: `SCENE 5 — FADE IN` — `about-scene-label text-paper/45`
   - `initial={{ opacity: 0 }}`, animate to 1 over 0.6s

2. Typewriter headline: `TypewriterHeadline` with text "Your story isn't missing."
   - `className`: Cormorant, `clamp(3rem, 8vw, 6.5rem)`, font-light, text-paper
   - Props: `wordDelay={120}`, `initialDelay={400}`, `showCursor={true}`
   - Only renders/triggers when `inView` is true (conditionally pass triggered state, or wrap in a div that controls visibility)
   - NOTE: TypewriterHeadline uses its own IntersectionObserver internally, so it will auto-trigger when visible. Just ensure the container is in view.

3. Second line: "It's waiting."
   - `motion.p` — Cormorant, same scale as headline, italic
   - Rust color on "waiting": `<em className="not-italic text-rust">waiting.</em>` (uses "not-italic" to keep surrounding italic, rust on the key word)
   - Wait: calculate total typewriter duration = 400 + (5 words × 120) + 800ms beat = ~1.8s
   - `initial={{ opacity: 0 }}`, animate `{{ opacity: 1 }}`, `transition={{ delay: 2.2, duration: 0.8, ease: ABOUT_EASE }}`
   - Only animate when `inView`

4. CTA block:
   - `motion.div` with delay: 2.2 + 0.8 + 1.2 = ~4.2s after inView
   - Subcopy: "Let's find it together." — Satoshi, 1rem, text-paper/58, max-w-md
   - Button: same style as current FadeInCta (`bg-[var(--color-rust)]` etc.)
   - Link to `/story-teardown`
   - Final timecode: `INT. YOUR BRAND — NOW`

**Important timing chain:**
```
inView → 0.0s: scene label fades in
       → 0.4s: typewriter starts (handled by TypewriterHeadline's initialDelay)
       → ~1.8s: typewriter finishes 5 words
       → ~2.6s: "It's waiting." fades in (0.8s after typewriter)
       → ~4.2s: CTA block fades in (1.2s after second line starts)
```

Since TypewriterHeadline manages its own trigger via IntersectionObserver, use a state variable `hasRevealed` set by a timeout after inView to coordinate the downstream reveals:

```tsx
const [phase, setPhase] = useState(0);
// phase 0 = nothing, 1 = label visible, 2 = typewriter done, 3 = second line, 4 = CTA

useEffect(() => {
  if (!inView) return;
  setPhase(1);
  const t1 = setTimeout(() => setPhase(2), 1800); // typewriter done
  const t2 = setTimeout(() => setPhase(3), 2600);  // second line
  const t3 = setTimeout(() => setPhase(4), 4200);  // CTA
  return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
}, [inView]);
```

**Step 2: Verify TypeScript compiles**

Run: `cd "/Users/pat/Sites/Protagonist Ink/next" && npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: Clean

**Step 3: Commit**

```bash
git add components/about/ActFive.tsx
git commit -m "feat(about): add ActFive — departure moment with typewriter reveal"
```

---

### Task 9: Wire up page.tsx with new components

**Files:**
- Modify: `app/about/page.tsx`

**Step 1: Replace page content**

```tsx
import ActOne from '@/components/about/ActOne';
import ActTwo from '@/components/about/ActTwo';
import ActThree from '@/components/about/ActThree';
import ActFour from '@/components/about/ActFour';
import ActFive from '@/components/about/ActFive';
import Breath from '@/components/about/Breath';

export const metadata = {
  title: 'About',
  description: 'Every brand is living a story. Most are losing theirs.',
};

export default function AboutPage() {
  return (
    <main>
      <ActOne />
      <Breath variant="void" />
      <ActTwo />
      <Breath variant="rule" />
      <ActThree />
      <Breath variant="timecode" timecode="INT. THE METHOD — CONTINUOUS" />
      <ActFour />
      <Breath variant="deep" />
      <ActFive />
    </main>
  );
}
```

Note: updated meta description to match new opening line.

**Step 2: Verify full build**

Run: `cd "/Users/pat/Sites/Protagonist Ink/next" && npm run build 2>&1 | tail -30`
Expected: Build succeeds. About page compiles.

**Step 3: Visual verification**

Run dev server and check `/about`:
- Scroll through all 5 acts + 4 breaths
- Verify Act I typewriter fires on scroll
- Verify breaths are empty (void variants) or have rust rule / timecode
- Verify Act III beliefs animate on scroll (word → watermark → body)
- Verify Act V typewriter sequence fires in order
- Verify all images load (Amy in Act II, Patrick in Act IV, typewriter bg in Act I)

**Step 4: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat(about): wire up Five-Act Reel page structure"
```

---

### Task 10: Remove old components

**Files:**
- Delete: `components/about/AboutHero.tsx`
- Delete: `components/about/VillainSection.tsx`
- Delete: `components/about/BeliefSection.tsx`
- Delete: `components/about/MentorSection.tsx`
- Delete: `components/about/ProductionNotes.tsx`
- Delete: `components/about/CastAndCrew.tsx`
- Delete: `components/about/FadeInCta.tsx`

**Step 1: Verify no other files import old components**

Run: `grep -r "AboutHero\|VillainSection\|BeliefSection\|MentorSection\|ProductionNotes\|CastAndCrew\|FadeInCta" --include="*.tsx" --include="*.ts" -l`

Expected: Only the old component files themselves (no other importers since page.tsx was updated in Task 9).

**Step 2: Delete old files**

```bash
cd "/Users/pat/Sites/Protagonist Ink/next"
rm components/about/AboutHero.tsx
rm components/about/VillainSection.tsx
rm components/about/BeliefSection.tsx
rm components/about/MentorSection.tsx
rm components/about/ProductionNotes.tsx
rm components/about/CastAndCrew.tsx
rm components/about/FadeInCta.tsx
```

**Step 3: Verify build still passes**

Run: `cd "/Users/pat/Sites/Protagonist Ink/next" && npm run build 2>&1 | tail -20`
Expected: Clean build

**Step 4: Commit**

```bash
git add -A components/about/
git commit -m "chore(about): remove old section components replaced by Five-Act Reel"
```

---

### Task 11: Polish pass — visual tuning and reduced-motion

**Files:**
- Modify: all new Act components as needed
- Modify: `components/about/Breath.tsx` if needed

**Step 1: Add prefers-reduced-motion support**

In each Act component, check for reduced motion and skip animations:

```tsx
// At top of each component
const prefersReduced = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;
```

For reduced motion: all content visible immediately, no scroll-driven opacity, no typewriter delays.

**Step 2: Visual polish in dev server**

Run dev server and scroll through the full page. Tune:
- Scroll trigger thresholds (are reveals happening at the right scroll positions?)
- Typewriter timing in Act V (does the sequence feel right?)
- Breath lengths (too long? too short? adjust min-h values)
- Act III belief word sizes on mobile (test at 375px width)
- Patrick parallax amount in Act IV
- Amy photo filters in Act II (is her face readable?)

**Step 3: Run lint**

Run: `cd "/Users/pat/Sites/Protagonist Ink/next" && npm run lint 2>&1 | head -30`
Expected: Clean or only pre-existing warnings

**Step 4: Final build verification**

Run: `cd "/Users/pat/Sites/Protagonist Ink/next" && npm run build 2>&1 | tail -20`
Expected: Clean build, no errors

**Step 5: Commit**

```bash
git add -A
git commit -m "feat(about): polish pass — reduced-motion support, visual tuning"
```

---

## Execution Notes

**Build order matters:** Tasks 1-3 are foundations (motion, CSS, Breath). Tasks 4-8 are the five acts (independent of each other but all depend on 1-3). Task 9 wires everything together. Task 10 cleans up. Task 11 polishes.

**Parallelizable:** Tasks 4, 5, 6, 7, 8 can be built in parallel since they're independent components. However, they should be visually verified together in Task 9.

**Most complex component:** ActThree (kinetic typography beliefs) — the scroll-driven word→watermark→body pattern needs careful threshold tuning.

**Most important component:** ActFive (departure) — the timing chain must feel natural. Test by scrolling to it and watching the full reveal sequence.

**Existing component reuse:**
- `TypewriterHeadline` (from `components/TypewriterHeadline.tsx`) — used in Act I and Act V
- PatrickScene logic (from current `CastAndCrew.tsx`) — copy into Act IV
