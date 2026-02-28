# Story Health Check v2 — Design & Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Second-pass overhaul of the Story Health Check page based on founder review. Restructure section order to create a tighter funnel, replace sales-heavy interstitial with methodology/connection piece, add motion/parallax throughout, fix navbar theming, remove decorative cruft, and make the paid audit feel like a gift reveal rather than an upsell.

**Architecture:** Primary changes in `app/story-health-check/page.tsx` (~800 lines) and `components/Navbar.tsx` (navbar theming). Two new images replace existing ones in `/public/`. No new components needed — leverages existing `TypewriterHeadline`, `ParallaxHeroBackground`, and `ScrollReveal`.

**Tech Stack:** Next.js App Router, React, Tailwind CSS v4, motion/react (Framer Motion), Lucide icons, Protagonist Ink design system (--color-ink, --color-rust, --color-paper)

**Image Assets (already in `/public/images/pages/`):**
- `girlfounder_conference.jpg` → replaces `girlontablet.jpg` in paid Story Audit section
- `storybook_bg.jpg` → replaces `hero-typewriter.png` in methodology interstitial

---

## Task 1: Verify Image Assets

**Files:**
- Existing: `public/images/pages/girlfounder_conference.jpg` (replaces girlontablet.jpg reference in paid audit section)
- Existing: `public/images/pages/storybook_bg.jpg` (replaces hero-typewriter.png reference in methodology interstitial)

**Step 1:** Verify both images exist and are valid:
```bash
file public/images/pages/girlfounder_conference.jpg public/images/pages/storybook_bg.jpg
```

**Step 2:** Note the image paths for Tasks 5 and 8:
- Interstitial background: `/images/pages/storybook_bg.jpg`
- Paid audit photo: `/images/pages/girlfounder_conference.jpg`

**Verification:** Both files confirmed as valid image files.

---

## Task 2: Fix Navbar Theming — Dark on Load, Light on Scroll

**Files:**
- Modify: `components/Navbar.tsx`

**Current behavior:** The `isHealthCheck` flag forces the navbar to always use the light theme (white bg, dark text) on the `/story-health-check` route.

**Target behavior:** On initial load, use the dark/global navbar (gray bg, white logo, white text). On scroll past the hero (~400-500px), transition to white navbar with dark copy. This is the exact same pattern already working for `/work/[slug]` detail pages.

**Step 1: Remove isHealthCheck override**

Remove the `isHealthCheck` constant and its usage in the `useLightTheme` calculation:

```tsx
// REMOVE this line:
const isHealthCheck = pathname === '/story-health-check';

// CHANGE this line:
// FROM:
const useLightTheme = isWorkIndex || isHealthCheck || (isWorkDetail && isScrolled);
// TO:
const useLightTheme = isWorkIndex || (isWorkDetail && isScrolled);
```

**Step 2: Add health check to dark hero logic**

Add `/story-health-check` to the same scroll-based dark→light transition used by work detail pages:

```tsx
const isHealthCheck = pathname === '/story-health-check';
const useDarkHero = isWorkDetail || isHealthCheck;
const heroThreshold = (isWorkDetail || isHealthCheck) ? 400 : 20;
const useLightTheme = isWorkIndex || (useDarkHero && isScrolled);
```

**Step 3: Update hero section background**

In `page.tsx`, make the hero section use a dark background so the dark navbar looks natural:
- Change the hero wrapper from `bg-paper` to `bg-ink` with light text
- The hero image (`writers-room.jpg`) should be full-bleed with a dark overlay
- Headline, eyebrow, and CTA text become white/light variants

**Verification:** Load the page — navbar should be dark gray with white text. Scroll down 400px — navbar should transition to white with dark text. No flash of wrong theme.

---

## Task 3: Hero Section Updates — Eyebrow, Animation, Dark Theme

**Files:**
- Modify: `app/story-health-check/page.tsx` (hero section, lines ~80-150)

**Changes:**

1. **Eyebrow text:** Change "Diagnostic Series 01" → "Story Audit"

2. **TypewriterHeadline:** Replace the static `<h1>` with the existing `TypewriterHeadline` component for the main headline. Import it at the top of the file. Configure with appropriate delays.

3. **Dark hero treatment:** Convert hero from light paper background to dark cinematic treatment:
   - Outer wrapper: `bg-ink` instead of `bg-paper`
   - `writers-room.jpg` becomes a parallax background image using `ParallaxHeroBackground` component (already exists), with dark overlay
   - All text becomes white/light: headline `text-paper`, eyebrow badge adjusted for dark bg, subheadline `text-paper/70`
   - CTA button: use `bg-rust text-paper` (the editorial accent)

4. **Nav link fix:** The hero CTA currently links to `#free-loom`. Change it to scroll to `#story-loom` (the welcome card, see Task 6). Also ensure the nav "Story Health Check" link loads the page at the top (no anchor).

**Verification:** Hero renders dark with parallax background, typewriter animation fires on load, text is legible, eyebrow reads "Story Audit".

---

## Task 4: Crisis Mirror — Remove Watermark, Push Messaging

**Files:**
- Modify: `app/story-health-check/page.tsx` (Crisis Mirror section, lines ~156-201)

**Changes:**

1. **Remove "Curse of Knowledge" watermark:** Delete the large rotated text element that reads "Curse of Knowledge" — it's decorative cruft that confuses visitors.

2. **Push "why this matters" messaging harder:** The current symptoms box lists what's broken but doesn't drive home the stakes. Add a brief, punchy paragraph before or after the symptoms that connects the symptoms to real business consequences. Something like:
   > "Every day your story leaks, you're paying for it — in abandoned carts, in meetings that don't convert, in funding rounds that stall. The curse of knowledge isn't just a concept. It's the reason your revenue has a ceiling."

3. **Keep the editorial layout:** Maintain the sticky left column with number + heading, scrollable right column with symptoms. This pattern works.

**Verification:** No giant rotated watermark text visible. Symptoms section reads with urgency. Layout unchanged.

---

## Task 5: Transform Methodology Interstitial (was "Two Paths Forward")

**Files:**
- Modify: `app/story-health-check/page.tsx` (Cinematic Strip section, lines ~207-227)

**Changes:**

This is a significant content transformation. The current section shows a typewriter image with "Two paths forward. One free. One surgical." — which is sales copy that appears before the visitor even knows what Protagonist Ink does.

**New purpose:** A connection/methodology moment. About why story matters, what PI does, how they help founders connect with their audiences.

1. **Background image:** Replace `hero-typewriter.png` reference with `/images/pages/storybook_bg.jpg`. This becomes a full-bleed atmospheric background.

2. **Increase height:** Change from `h-[44vh] md:h-[56vh]` to `min-h-[65vh] md:min-h-[75vh]` — give this breathing room.

3. **Content rewrite:** Replace the "Two paths forward" copy with methodology-focused content:
   - A heading like: "Every founder has a story worth telling."
   - Body copy (2-3 sentences) about PI's mission: helping founders articulate their vision, connect with their audience, and close the gap between what they've built and how people experience it
   - This is the visitor's first real introduction to what Protagonist Ink actually does

4. **Smooth the gradient:** The current paper-to-transparent gradient is too harsh. Use a more gradual gradient with additional stops, or switch to a dark overlay that fades the storybook background at the edges. Text must be fully legible.

5. **Add subtle parallax:** Apply a slower parallax rate to the background image (similar to hero treatment).

**Verification:** Section is noticeably taller. Background shows storybook illustration. Copy introduces PI's methodology. No readability issues with gradient. No mention of "two paths" or pricing.

---

## Task 6: Free Loom Welcome Card

**Files:**
- Modify: `app/story-health-check/page.tsx` (Free Loom Form section, lines ~234-430)

**Changes:**

Currently the form jumps straight to "What's your name?" — the visitor has no context about what they're starting. Add a welcome card as the entry point.

1. **Add welcome card state:** Add a new state `showWelcome` (default `true`). When `showWelcome` is true, display the welcome card. When the user clicks "Begin Your Story Audit" (or similar CTA), set `showWelcome` to false and reveal the multi-step form.

2. **Welcome card design:**
   - `id="story-loom"` (anchor target for hero CTA)
   - Centered card with editorial typography
   - Heading: "Your Free Story Teardown" or "The 5-Minute Story Loom"
   - 2-3 lines explaining what happens: "Answer a few questions about your brand story. Within 48 hours, you'll receive a personalized Loom video diagnosing the narrative leaks costing you conversions."
   - Prominent CTA button: "Get Started →" or "Begin Your Audit →"
   - Visual treatment: subtle border, the editorial "Option 01 // $0" badge can sit above

3. **Transition animation:** When CTA is clicked, welcome card fades out and form step 1 fades in (use Framer Motion `AnimatePresence`).

**Verification:** Page loads showing welcome card, not the form. Clicking CTA reveals the form at step 1. Anchor link from hero scrolls to this card.

---

## Task 7: Section Reorder — Testimonials Move Up, FAQ/CTA Swap

**Files:**
- Modify: `app/story-health-check/page.tsx` (major section reordering)

**Current order:**
1. Hero
2. Crisis Mirror
3. Cinematic Strip (methodology interstitial)
4. Free Loom Form
5. Narrative Pivot
6. Paid Story Audit
7. The Choice
8. Testimonials
9. FAQ
10. Closing CTA
11. Sticky Bar

**New order:**
1. Hero (dark, parallax, typewriter)
2. Crisis Mirror (no watermark, harder messaging)
3. Methodology Interstitial (transformed, storybook bg)
4. Free Loom (welcome card + form)
5. **Testimonials** ← moved up from position 8
6. Narrative Pivot ("teardown stops the bleeding / audit cures the disease")
7. Paid Story Audit (reveal/gift energy)
8. The Choice (no "Section 04" eyebrow, + full-width testimonial quote)
9. Closing CTA ("Stop guessing. Start converting.")
10. **FAQ** ← swapped, now at bottom
11. Sticky Bar

**Implementation:** This is a cut-and-paste operation on large JSX blocks. Be careful to preserve all state references and IntersectionObserver refs.

**Verification:** All sections render in the correct new order. No broken refs or missing state. Scroll through entire page to confirm flow. Sticky bar still works.

---

## Task 8: Paid Story Audit — Gift/Reveal Energy

**Files:**
- Modify: `app/story-health-check/page.tsx` (Paid Story Audit section, lines ~451-549)

**Changes:**

The paid section should feel like discovering a gift, not being upsold. "One more thing" energy.

1. **Image replacement:** Use `/images/pages/girlfounder_conference.jpg` (replacing `girlontablet.jpg` reference). Same bleeding-edge layout on the right side.

2. **Entrance animation:** Wrap the section in a scroll-triggered reveal with more dramatic timing:
   - Initial state: slightly scaled down (0.97), opacity 0
   - On scroll into view: scale up to 1.0, opacity to 1, with a slower easing (0.8s duration)
   - This should feel like a curtain being drawn back

3. **Copy framing:** The section intro should feel like a generous offer, not a pitch. Consider leading with something like: "Loved the teardown? There's more where that came from." — then present the $1,500 audit as the full treatment.

4. **Keep risk reversal:** "If we can't identify a fixable narrative leak..." stays exactly as-is.

**Verification:** Section appears with a smooth reveal animation on scroll. New photo renders correctly. Risk reversal copy intact. Feels like a reveal, not a sales pitch.

---

## Task 9: The Choice Section — Remove Eyebrow, Add Full-Width Quote

**Files:**
- Modify: `app/story-health-check/page.tsx` (The Choice section, lines ~555-622)

**Changes:**

1. **Remove "Section 04" eyebrow badge:** Delete the eyebrow element entirely. This isn't a new section — it's the culmination of the two options presented above.

2. **Add full-width testimonial quote:** Below the side-by-side comparison cards, add one large, impactful testimonial quote that spans the full width. Use a cinematic treatment:
   - Large Cormorant Garamond italic text
   - Generous padding/whitespace
   - Attribution below
   - Pull the most compelling quote from the existing testimonials, or use a new one focused on transformation/results

**Verification:** No "Section 04" eyebrow visible. Full-width quote renders below the comparison. Quote is legible and impactful.

---

## Task 10: Add Motion & Parallax Throughout

**Files:**
- Modify: `app/story-health-check/page.tsx` (multiple sections)

**Changes:**

The page currently feels flat and static. Add life with:

1. **Hero parallax:** Already handled in Task 3 (ParallaxHeroBackground)

2. **Hero TypewriterHeadline:** Already handled in Task 3

3. **Scroll-triggered section reveals:** For each major section, add a subtle fade-up + slight translate-y animation triggered by IntersectionObserver. Use `motion/react`'s `useInView` hook or the existing `ScrollReveal` wrapper:
   - Crisis Mirror: fade in from left (sticky column) and right (symptoms)
   - Methodology Interstitial: background parallax + text fade-in
   - Free Loom welcome card: scale up from 0.98 + opacity
   - Testimonials: staggered card reveals
   - Paid Audit: dramatic reveal (Task 8)
   - Choice section: cards slide in from left/right

4. **Smooth scroll behavior:** Ensure anchor links (`#story-loom`) use smooth scrolling.

**Verification:** Scroll through entire page — each section should have a subtle entrance animation. No janky or overlapping animations. Performance is smooth (no layout shifts).

---

## Task 11: Final Polish — Gradient Fix, Spacing, Cleanup

**Files:**
- Modify: `app/story-health-check/page.tsx`

**Changes:**

1. **Methodology interstitial gradient:** Verify the gradient is smooth and text is fully legible. If needed, add intermediate gradient stops or increase overlay opacity.

2. **Update section numbers:** With the new order, verify that any visible "01", "02", "03" section indicators still make sense. Adjust numbering to match the new flow.

3. **Clean up unused code:** Remove any commented-out code, unused state, or orphaned refs from the reordering.

4. **Test all interactive elements:**
   - Form submission flow (welcome card → steps → success)
   - Anchor links (hero CTA → welcome card)
   - Sticky bar context switching
   - Email link in CTA sections
   - Responsive behavior (mobile/tablet/desktop)

**Verification:** Full page scroll-through on desktop and mobile. All interactive elements work. No console errors. No visual bugs. Clean code with no orphaned references.

---

## Dependency Graph

```
Task 1 (images) ← Task 5 (interstitial bg), Task 8 (audit photo)
Task 2 (navbar) ← Task 3 (dark hero needs matching navbar)
Task 3 (hero) — independent after Task 2
Task 4 (crisis mirror) — independent
Task 5 (interstitial) ← Task 1
Task 6 (welcome card) — independent
Task 7 (reorder) ← Tasks 3-6 (reorder sections that are already modified)
Task 8 (audit reveal) ← Task 1, Task 7
Task 9 (choice section) ← Task 7
Task 10 (motion) ← Task 7 (apply to reordered page)
Task 11 (polish) ← all other tasks
```

**Suggested execution order:** 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11
