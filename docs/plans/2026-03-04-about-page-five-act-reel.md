# About Page Redesign: "The Five-Act Reel"

**Date:** 2026-03-04
**Status:** Approved (brainstorming complete)

## Design Intent

The current About page has cinematic *vocabulary* (timecodes, scene labels, film grain) but not cinematic *rhythm*. It reads like a screenplay's table of contents, not the film itself. Every section is filled — there's no silence, no scale shift, no moment where the page stops and lets something land.

This redesign restructures the page as a **five-act scroll film** with intentional emotional pacing. The scroll IS the story. Breaths between acts create anticipation. Scale shifts (giant type → whisper → full-bleed image) create the ups and downs of a real narrative. The departure moment reframes the entire page around the visitor.

### The Emotional Shape

```
Tension
  ▲
  │     ╱╲        ╱╲ ACT III
  │    ╱  ╲      ╱  ╲ (beliefs)    ╱╲ ACT V
  │   ╱    ╲    ╱    ╲            ╱  ╲ (departure)
  │  ╱ ACT I╲  ╱ ACT  ╲  ╱╲     ╱    ╲
  │ ╱(noise) ╲╱  II    ╲╱  ╲   ╱ ACT  ╲
  │╱          (origin)   ACT ╲ ╱  IV    ╲
  │                      IV   ╲ (method) ╲
  └──────────────────────────────────────────► Scroll
       dark    breath  light  breath  dark  breath  light  breath  dark
```

---

## Page Structure

```
page.tsx
├── ActOne          — "The Noise" (dark, oppressive, slow burn)
├── Breath          — void (black, grain, silence)
├── ActTwo          — "The Realization" (light breaks in, Amy, intimate)
├── Breath          — rust rule extends across viewport
├── ActThree        — "What We Believe" (kinetic typography, 3 beliefs)
├── Breath          — void with timecode
├── ActFour         — "How We Work" (method title cards + Patrick)
├── Breath          — longest void, grain intensifies
└── ActFive         — "The Departure" (typewriter reveal, final reframe)
```

### Components Mapping (old → new)

| Old Component    | New Component | Notes |
|------------------|---------------|-------|
| `AboutHero`      | `ActOne`      | Complete rewrite — dark opening shot, not light title card |
| `VillainSection` | merged into `ActOne` | Problem/noise content absorbed into opening |
| `BeliefSection`  | `ActThree`    | Reimagined as kinetic typography scroll sequence |
| `MentorSection`  | `ActTwo`      | Origin story restructured, Amy's photo as hero moment |
| `ProductionNotes`| `ActFour`     | Accordion → scroll-driven title card sequence |
| `CastAndCrew`    | split across `ActTwo` + `ActFour` | Amy in Act II, Patrick woven into Act IV |
| `FadeInCta`      | `ActFive`     | Rewritten as typewriter departure moment |
| (new)            | `Breath`      | Reusable void/silence component |

---

## Act-by-Act Specification

### ACT I — "The Noise"

**Emotional beat:** Tension. Unease. The world as it is.
**Background:** Dark (#0a0a0a). Near-black on load.
**Duration:** ~150vh (scroll-driven reveal creates pacing)

#### Opening Sequence

The screen starts almost fully black. As the user scrolls, light bleeds in gradually — like a projector warming up. This is achieved via scroll-linked opacity on the background image (`/hero-typewriter.png`) using `useScroll` + `useTransform`.

The first words appear using the `TypewriterHeadline` component at massive scale:

```
"Every brand is living a story."
```

Cormorant, `clamp(3.5rem, 9vw, 8rem)`, light weight, centered. Word-by-word blur reveal (existing `typewriter-word` keyframe). Triggered when the text scrolls into position.

After a scroll pause (~30vh of continued dark), a second line appears at smaller scale:

```
"Most are losing theirs."
```

`clamp(1.2rem, 2vw, 1.6rem)`, Satoshi, uppercase, tracked out. Fade-in, no typewriter. This is the gut punch — the tonal shift from poetic to blunt.

Below this, the "villain" content from the current VillainSection integrates as atmospheric body text — not a separate section, but a continuation of the opening mood. The typewriter background image is now visible at ~30-40% opacity, adding texture without competing.

**Timecode:** `CUT 00:00:01:24` in upper right, fading in late.
**Crop marks:** Yes, large variant.
**Exit:** Content fades as scroll continues into the first Breath.

#### Technical Notes

- Container: `min-h-[150vh]` to allow scroll-driven pacing
- Background image opacity: `useTransform(scrollYProgress, [0, 0.2, 0.5], [0, 0.15, 0.35])`
- Headline trigger: appears when scrollYProgress passes ~0.15
- Second line trigger: scrollYProgress ~0.35
- Body text: scrollYProgress ~0.5
- All transforms use `ABOUT_EASE`

---

### BREATH — The Void

**Reusable component** used between every act. Variants:

1. **Black void** (after Act I, after Act III): Pure black (#050505), film grain at 0.06 opacity, `min-h-[45vh]`. Nothing else. The emptiness IS the design.

2. **Rust rule** (after Act II): Paper background. A single rust-colored horizontal rule animates from center outward using `scaleX: 0 → 1` over 1.4s. `min-h-[30vh]`.

3. **Timecode void** (after Act III): Black void with a single centered timecode that fades in: `INT. THE METHOD — CONTINUOUS`. `min-h-[40vh]`.

4. **Deep void** (after Act IV): The longest breath. Black. Grain slightly more intense (0.08 opacity). `min-h-[55vh]`. This is the pause before the final beat. The audience leans forward.

#### Technical Notes

```tsx
interface BreathProps {
  variant: 'void' | 'rule' | 'timecode' | 'deep';
  timecode?: string;
}
```

- Scroll-driven opacity on grain (subtle pulse as you scroll through)
- Timecode variant: text fades in at scrollYProgress ~0.5 of the breath container
- All variants use `texture-grain` on dark, no texture on rule variant

---

### ACT II — "The Realization"

**Emotional beat:** Relief. Intimacy. The human moment.
**Background:** Light (paper/warmwhite). This is where light breaks in after the darkness.
**Duration:** Standard section height, ~100vh

#### Layout

**Amy's photo is the hero.** Full viewport width on mobile. On desktop, a 60/40 split where the image commands the left 60%.

The photo treatment is warmer than current — less filtered, more human:
- Keep grayscale but reduce contrast filter (1.15 instead of 1.25)
- Brightness up slightly (0.82 instead of 0.78)
- Keep the amber tint and grain, but dial back so her face reads clearly
- The photo should feel like a still from a documentary, not a mood texture

**Text side** (right 40% on desktop, below on mobile):

Scene label: `The Origin` in rust.

Heading (Cormorant, light): "It started with a realization."

The origin story told as **continuous narrative** — not sectioned with headers, but flowing paragraphs. Two or three short paragraphs. The current copy is close:

> Two careers. One late conversation. A quiet realization that kept repeating: exceptional organizations were being overlooked not because they lacked merit, but because their narrative couldn't carry the weight of their work.

> So we did what any two people on the edge of something do: we built a raft.

Keep the "Credits" grid at the bottom — it works as cinematic metadata.

#### Animation

- Image enters: `opacity 0→1, scale: 1.04→1` over 1.1s
- Text enters: `opacity 0→1, x: 24→0` over 0.88s, delayed 0.15s
- Hover on image: `scale: 1.05` over 1000ms (the slow push-in)

---

### ACT III — "What We Believe"

**Emotional beat:** Power. Conviction. The thesis.
**Background:** Alternating — each belief gets its own full-viewport treatment.
**Duration:** ~300vh (three beliefs × ~100vh each)

This is the biggest departure from the current page. Instead of a 3-column grid, each belief becomes a **full-viewport typographic moment**.

#### Sequence

**Belief 1: TRUTH**
- Dark background (#0a0a0a)
- The word `TRUTH` fills the viewport, Cormorant, `clamp(5rem, 18vw, 14rem)`, centered
- Typewriter word reveal (it's one word, so it appears as a single dramatic beat with the blur effect)
- As user scrolls, the big word fades to ~5% opacity and becomes a watermark
- Body text resolves beneath: "Strategy without conviction is just noise. We start with what you actually believe, then build outward."
- Body in Satoshi, `1rem`, `text-paper/60`

**Belief 2: TENSION**
- Light background (paper)
- Same pattern: giant word → watermark → body text resolves
- `TENSION` in ink color
- Body: "The line that lands changes the room. We find the sentence that carries your case without extra scaffolding."

**Belief 3: STORY**
- Dark background
- `STORY` in rust color — the only belief word that gets color
- This is the climactic belief, the core of the brand
- Body: "Authenticity, passion, drama, thrill — these aren't soft assets. They're the only things audiences remember."

#### Technical Notes

- Each belief is a separate scroll container (`min-h-[100vh]`)
- Big word: scroll-linked opacity from 1 → 0.04 as body text appears
- Body text: scroll-linked opacity from 0 → 1, y from 40 → 0
- Use `useScroll` with `target` ref and `offset: ["start start", "end start"]`
- Light/dark alternation: belief containers have their own bg colors
- The alternation creates visual rhythm without explicit transitions

---

### ACT IV — "How We Work"

**Emotional beat:** Confidence. Craft. Rhythm.
**Background:** Light (paper), with Patrick's dark scene embedded.
**Duration:** ~120vh

#### Layout

Not an accordion. A **scroll-driven title card sequence**.

Each methodology step is introduced by its number at massive scale, sliding in from alternating sides:

```
Step 1: number slides from LEFT
    01   Discovery
         One-line description

Step 2: number slides from RIGHT
                        02   Architecture
                             One-line description

Step 3: number slides from LEFT
    03   Integration
         One-line description

Step 4: number slides from RIGHT
                        04   The Result
                             One-line description
```

Numbers: Cormorant, `clamp(4rem, 12vw, 9rem)`, ink/[0.06] (ghost weight), bold.
Step names: Cormorant, `clamp(1.4rem, 2.5vw, 2.2rem)`, light.
Descriptions: Satoshi, ~0.95rem, ink/60. One line each. Tight.

These scroll past with **staggered `useInView` triggers** — each step enters as the previous one is fully visible. The alternating left/right alignment creates lateral rhythm within the vertical scroll.

#### Patrick Integration

After the four steps, Patrick's scene appears — not as a separate section, but as the visual punctuation of the methodology. His image behind/alongside the process. The current PatrickScene treatment (dark, parallax, watermark name, blockquote) works well here — it's the architect at work.

Keep the existing PatrickScene largely intact but:
- The timecode changes to: `EXT. THE ARCHITECT — CONTINUOUS`
- The blockquote stays: "We don't write for the audience. We write for the room."
- This becomes the visual anchor for the methodology — the person behind the process

#### Technical Notes

- Steps container: `max-w-[1400px]`, alternating `text-left`/`text-right`
- Numbers enter with `x: -60→0` (left) or `x: 60→0` (right), `opacity: 0→1`
- Step name and description enter `0.1s` after number
- Use existing `ABOUT_EASE` for all transitions
- PatrickScene: keep existing parallax implementation (`useScroll` + `useTransform`)

---

### ACT V — "The Departure"

**Emotional beat:** The reframe. The moment they carry with them.
**Background:** Dark (#0a0a0a), film grain.
**Duration:** ~100vh, but the content is minimal — the space IS the point.

This is the most important moment on the page.

#### The Sequence

Full black screen. Film grain. Centered content.

First, a timecode fades in: `SCENE 5 — FADE IN`

Then, using `TypewriterHeadline` at the **largest scale on the page**:

```
"Your story isn't missing."
```

Cormorant, `clamp(3rem, 8vw, 6.5rem)`, light weight, paper color. Word-by-word blur reveal. `wordDelay: 120` (slower than default — let each word land).

After the headline completes, a beat (800ms), then the second line fades in (NOT typewriter — a simple opacity reveal, contrasting the mechanical typewriter with something softer):

```
"It's waiting."
```

Same scale, but italic. Rust color on "waiting." This is the emotional turn — the page was about Protagonist Ink's story, but this line makes it about YOU.

After another beat (1200ms), the CTA fades in:

- Subcopy: "Let's find it together." — Satoshi, `1rem`, paper/58, max-w-md
- Button: existing rust CTA style, "Start your story teardown →"
- Final timecode below: `INT. YOUR BRAND — NOW`

#### Copy Note: "Your story isn't missing. It's waiting."

This is the departure line. It works because:
1. It reframes — the whole page was about PI's story, this flips to the visitor
2. It's hopeful without being saccharine
3. "Isn't missing" acknowledges the frustration (your story exists, you haven't lost it)
4. "It's waiting" implies agency — it's ready when you are
5. The brand name "Protagonist" lands retroactively — YOU are the protagonist

#### Technical Notes

- Container: `min-h-[100svh]`, flex center
- Typewriter: `initialDelay: 400`, `wordDelay: 120`, `showCursor: true`
- Second line: `motion.p` with `initial={{ opacity: 0 }}`, `animate={{ opacity: 1 }}`, delay calculated from typewriter completion (~2.5s after trigger)
- CTA block: additional 1.2s delay after second line
- All triggered by `useInView` on the container
- Grain opacity: 0.07 (slightly higher than standard for atmosphere)

---

## Shared Technical Decisions

### Motion System

Keep `motion.ts` with `ABOUT_EASE` and `ABOUT_VIEWPORT`. Add:

```ts
export const ABOUT_SCROLL_EASE = [0.16, 1, 0.3, 1] as const; // for scroll-driven transforms
export const TYPEWRITER_SLOW = { wordDelay: 120, initialDelay: 400 };
export const TYPEWRITER_FAST = { wordDelay: 80, initialDelay: 200 };
```

### CSS Additions to globals.css

New utility classes:

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

### Existing Components to Keep

- `TypewriterHeadline` — used in Act I and Act V
- `PatrickScene` from `CastAndCrew` — relocated to Act IV, minimal changes
- `motion.ts` constants — extended, not replaced
- All CSS utility classes (`.about-scene-label`, `.about-caption`, `.about-timecode`, `.about-rule`, `.crop-marks`, `.texture-grain`, `.texture-paper`)

### Components to Remove After Migration

- `AboutHero.tsx` — replaced by `ActOne`
- `VillainSection.tsx` — merged into `ActOne`
- `BeliefSection.tsx` — replaced by `ActThree`
- `MentorSection.tsx` — replaced by `ActTwo`
- `ProductionNotes.tsx` — replaced by `ActFour`
- `CastAndCrew.tsx` — split across `ActTwo` (Amy) + `ActFour` (Patrick)
- `FadeInCta.tsx` — replaced by `ActFive`

### New Component Files

```
components/about/
├── motion.ts          (keep, extend)
├── ActOne.tsx         (new)
├── ActTwo.tsx         (new)
├── ActThree.tsx       (new)
├── ActFour.tsx        (new)
├── ActFive.tsx        (new)
└── Breath.tsx         (new)
```

### Page Structure

```tsx
// app/about/page.tsx
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
```

---

## Photography Notes

- **Amy's photo** (`/images/about/amy.jpg`): Good. Featured prominently in Act II. Dial back filters to let her face read.
- **Patrick's photo** (`/images/about/patrick.jpg`): "Fine." Keep in Act IV with heavy atmospheric treatment (dark scene, parallax, gradients). The filtering actually helps here since the photo isn't as strong — it becomes mood rather than portrait.
- **Background image** (`/hero-typewriter.png`): Reused in Act I as atmospheric backdrop, same role as current VillainSection.

---

## Performance Considerations

- Scroll-driven animations use `useScroll` + `useTransform` (GPU-accelerated via Framer Motion)
- Act III beliefs: each belief is a separate component that only mounts its scroll listener when near viewport
- Images: maintain existing `next/image` optimization with `sizes` attributes
- TypewriterHeadline: uses IntersectionObserver (lightweight, already proven in production)
- Breath components: pure CSS, no JS, minimal DOM

---

## Accessibility

- All motion respects `prefers-reduced-motion` — falls back to immediate reveals
- Typewriter headline: full text in DOM from render (animation is visual-only, screen readers get full text)
- Belief words: proper heading hierarchy (`h2` for each belief word)
- Skip-to-content link maintained
- CTA button: full keyboard accessibility (existing pattern)
- Breath voids: `aria-hidden="true"` since they carry no semantic content
