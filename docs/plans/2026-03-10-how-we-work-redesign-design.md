# How We Work Redesign — Design Doc

**Date:** 2026-03-10
**Component:** `components/about/ActFour.tsx`
**Status:** Approved

---

## Problem

The current "How We Work" section (ActFour) reads like a SaaS onboarding flow — alternating left/right cards with ghost numbers and badge pills. Compared to the cinematic hero, horizontal-scroll beliefs, and moody founder portraits surrounding it, this section feels like it belongs on a different website.

The page rhythm is also broken: ActProof (light) → ActFour (light) → ActFounders (light) creates three consecutive light sections, flattening the cinematic alternation the rest of the page establishes.

## Design Direction

**Story meets structure.** The layout communicates method through typographic precision — numbering, ruled lines, whitespace. The copy communicates humanity — "We start by listening," "We roll out the red carpet." The tension between those two things is the design. No decoration. No gimmicks.

This is NOT a film-strip section (ActOne owns that), NOT a horizontal scroll (ActThree owns that), and NOT a process diagram. It's a dark, quiet, typographically rigorous section that lets the words breathe.

---

## Copy

### Eyebrow
NARRATIVE ARCHITECTURE

### Header Statement (scroll-reveal)
We build the blueprint. The narrative. The creative.
You build the transformation.

### Beat 1
**Headline:** We start by listening.
**Body:** Brand audit, stakeholder conversations, audience mapping. Our Narrative Audit reveals the story hiding in plain sight.

### Beat 2
**Headline:** We blend strategy with story structure.
**Body:** We build the narrative framework, your main characters, and your top level messaging.

### Beat 3
**Headline:** We roll out the red carpet.
**Body:** Identity, messaging, copy, campaigns, and culture. Because story without execution is just daydreaming.

---

## Environment

- **Background:** Trueblack (`--color-trueblack`, #0a0a0a) with `.texture-grain` overlay at ~0.055 opacity
- **Transitions:** Gradient fade from paper → trueblack at top (~80px), trueblack → paper at bottom. Lights dim, not cut.
- **Container:** `max-w-[1400px]`, centered, generous padding (`py-24 md:py-32`)
- **Purpose:** Creates the missing dark beat between ActProof and ActFounders

---

## Header Block

### Eyebrow
- Text: "NARRATIVE ARCHITECTURE"
- Style: Rust color, Satoshi, all-caps, letter-spacing ~0.2em, ~11px
- Uses existing `about-scene-label` pattern but inverted for dark bg (rust instead of gray)

### Statement — Scroll-Linked Text Reveal
- The header statement uses a word-by-word scroll-linked opacity reveal (similar to Magic UI TextReveal)
- All words visible at ~20% opacity (`text-paper/20`). Each word transitions to full `paper` opacity as scroll progress reaches its position
- Container height: ~180vh (enough scroll distance to feel meditative, not tedious)
- Text stays sticky-centered vertically while the container scrolls
- Typography: Cormorant, light weight, `clamp(1.8rem, 4vw, 3.4rem)`, centered
- "You build the transformation." renders in `--color-rust` instead of paper — the counterpoint lands in a different color as it reveals
- On reduced motion: all text renders at full opacity immediately, no scroll interaction

### Ruled Line
- Thin horizontal rule (`border-paper/10`, 1px) spanning content width beneath the header block
- Marks the transition from manifesto to method

---

## Three Beats

Vertically stacked, each beat is simply a headline and body paragraph. Separated by thin ruled lines.

### Layout (Desktop)
- Single column, left-aligned
- Each beat occupies the full content width with a `max-w-2xl` on the text to maintain readable line lengths
- Generous vertical spacing between beats (~py-10 md:py-14)

### Layout (Mobile)
- Same structure, single column, stacked
- Reduced vertical spacing

### Typography per Beat
- **Headline:** Cormorant, light weight, paper color, `clamp(1.4rem, 2.2vw, 1.8rem)`, `line-height: 1.1`
- **Body:** Satoshi, paper/55 opacity, `~0.95rem`, `line-height: 1.65`, `mt-3`, `max-w-xl`

### Separators
- Thin horizontal ruled lines (`border-paper/8`, 1px) between each beat
- Full content width
- These create the manuscript/treatment feel — like reading pages in a bound document
- No ruled line after the final beat (the section just ends into the gradient-out)

---

## Animation

Minimal and deliberate. The scroll-reveal on the header IS the animation moment. The beats don't need to compete.

### Header
- Eyebrow: simple fade-in on mount/scroll-enter (`ABOUT_FADE_UP` pattern)
- Statement: scroll-linked word-by-word reveal (described above)
- Ruled line: fade-in after header reveal completes

### Three Beats
- Each beat fades up on scroll-enter using `useInView` with `once: true`
- Stagger: 0s, 0.1s, 0.2s delay between beats
- Standard `ABOUT_EASE` curve, ~0.7s duration
- No lateral movement — just vertical fade-up (`y: 20 → 0`)

### Reduced Motion
- All scroll-linked animation disabled
- Text renders at full opacity immediately
- Beats render without animation
- `useReducedMotion()` check, consistent with all other About page sections

---

## What This Does NOT Include

- **No badges/pills** — the current version has them; they read as SaaS
- **No scene numbers or labels** (2.4.1 PROCESS, etc.) — those were copy-deck wayfinding, not UI
- **No deliverables metadata** — body copy does the work
- **No ghost numbers** — current pattern, being replaced
- **No alternating left/right** — reads as process diagram; consistent alignment reads as document
- **No icons or illustrations** — typography is the visual
- **No handwritten annotations** — Permanent Marker on dark bg is a first-thought move
- **No film-strip elements** — ActOne owns that motif
- **No horizontal scroll** — ActThree owns that mechanic

---

## Files to Modify

- `components/about/ActFour.tsx` — full rewrite of the component
- No new files needed; no changes to other components

## Dependencies

- `motion/react` (already installed) — for scroll-linked reveal and fade-up animations
- No new packages required; the text reveal is implemented directly with Framer Motion's `useScroll` and `useTransform`
