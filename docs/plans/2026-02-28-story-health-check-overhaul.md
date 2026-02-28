# Story Health Check Page Overhaul — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Overhaul the Story Health Check page (`app/story-health-check/page.tsx`) to enforce a single conversion funnel (Free Loom → Paid Audit upsell), fix brand violations (button discipline, SaaS pricing cards, error-state symptoms box, stock photo), resolve WCAG accessibility failures, and rename "Human Audit" → "Story Audit" site-wide.

**Architecture:** Single-file refactor — all changes happen in `app/story-health-check/page.tsx` (769 lines). No new components, no new API routes. The page structure is reorganized into a clear funnel: Hook → Lead Capture → Upsell → Social Proof → Close. The editorial design language (A24/cinematic) must be preserved and strengthened, not diluted.

**Tech Stack:** Next.js App Router, React (useState), Tailwind CSS v4, Lucide icons, Protagonist Ink design system (--color-ink, --color-rust, --color-paper)

---

## Task 1: Rename "Human Audit" → "Story Audit" (Global Find-Replace)

**Files:**
- Modify: `app/story-health-check/page.tsx` (8+ locations)

**Step 1: Rename all instances**

Find and replace these exact strings across the file:

| Line | Old | New |
|------|-----|-----|
| ~269 | `Book the Human Audit →` | `Book the Story Audit →` |
| ~422 | `id="human-audit"` | `id="story-audit"` |
| ~452 | `The Human` | `The Story` |
| ~561 | `Human Audit` (choice card heading) | `Story Audit` |
| ~575 | `Book the Human Audit` (choice card CTA) | `Book the Story Audit` |
| ~720 | `The Human Audit fixes it` | `The Story Audit fixes it` |
| ~727 | `Book the Human Audit — $1,500` | `Book the Story Audit — $1,500` |
| ~761 | `Book the Audit` | `Book the Story Audit` |

Also scan for any `#human-audit` anchor links and replace with `#story-audit`.

**Step 2: Verify no "Human Audit" references remain**

Run: `grep -n "Human Audit\|human-audit" "app/story-health-check/page.tsx"`
Expected: 0 matches

**Step 3: Verify build**

Run: `npm run build`
Expected: Clean build, no errors

**Step 4: Commit**

```bash
git add app/story-health-check/page.tsx
git commit -m "rename: Human Audit → Story Audit across story-health-check page"
```

---

## Task 2: Hero CTA Restructure (Single Rust Button + Quiet Text-Link)

**Files:**
- Modify: `app/story-health-check/page.tsx:116-128`

**Step 1: Change primary CTA button color and copy**

Current (line ~119):
```tsx
<div className="relative bg-ink text-paper font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold px-8 py-4 flex items-center gap-3 transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
    <PlayCircle className="w-4 h-4" />
    Get a Free Story Analysis
</div>
```

Replace with:
```tsx
<div className="relative bg-rust text-paper font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold px-8 py-4 flex items-center gap-3 transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
    <PlayCircle className="w-4 h-4" />
    Send Your URL for a Free Teardown
</div>
```

Changes: `bg-ink` → `bg-rust`. Copy updated.

**Step 2: Replace bordered secondary button with quiet text-link**

Current (lines ~124-127):
```tsx
<a href={DUBSADO_URL} className="font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold text-ink/50 hover:text-rust transition-colors px-6 py-4 border border-ink/20 hover:border-rust flex items-center gap-2">
    Or book the paid audit — $1,500
    <ArrowRight className="w-3 h-3" />
</a>
```

Replace with:
```tsx
<a href={DUBSADO_URL} className="font-sans text-[0.6rem] tracking-[0.15em] text-ink/40 hover:text-rust transition-colors flex items-center gap-1.5">
    Already know you need the deep dive? Book the $1,500 Story Audit
    <ArrowRight className="w-3 h-3" />
</a>
```

Changes: Removed border, padding, uppercase, bold. Made it a quiet, understated text-link. No box, no weight. Just a "fast pass" for high-intent visitors.

**Step 3: Verify visually**

Run: `npm run dev`
Check: Hero shows one bold rust button + one quiet text-link underneath. No bordered buttons.

**Step 4: Commit**

```bash
git add app/story-health-check/page.tsx
git commit -m "feat: hero CTA restructure — single rust button + quiet text-link upsell"
```

---

## Task 3: Fix "Error State" Symptoms Box (Crisis Mirror)

**Files:**
- Modify: `app/story-health-check/page.tsx:159-181`

**Step 1: Remove red border and corner accents from wrapper**

Current (line ~159):
```tsx
<div className="p-10 bg-white border border-rust/30 relative overflow-hidden reveal shadow-sm mt-16">
```

Replace with:
```tsx
<div className="p-10 bg-white relative overflow-hidden reveal shadow-sm mt-16">
```

Change: Removed `border border-rust/30`.

**Step 2: Remove corner accent divs**

Delete lines ~160-161 entirely:
```tsx
<div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-rust opacity-50 m-2 pointer-events-none" />
<div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-rust opacity-50 m-2 pointer-events-none" />
```

**Step 3: Replace × marks with em-dashes in muted color**

For each of the 3 list items (lines ~169, ~173, ~177), replace:
```tsx
<span className="text-rust font-sans text-sm mt-1 not-italic">×</span>
```

With:
```tsx
<span className="text-ink/30 font-sans text-sm mt-1 not-italic">—</span>
```

Changes: `×` → `—` (em-dash). `text-rust` → `text-ink/30` (muted dark gray). This reads as a clinical diagnostic list, not a system error.

**Step 4: Verify visually**

Check: Symptoms list appears as editorial diagnostic — no red box, no error-state visual language. Em-dashes in muted gray.

**Step 5: Commit**

```bash
git add app/story-health-check/page.tsx
git commit -m "fix: symptoms box — remove error-state styling, use em-dashes"
```

---

## Task 4: Replace Stock Photo in Cinematic Strip

**Files:**
- Modify: `app/story-health-check/page.tsx:190-210`

**Step 1: Swap image source and alt text**

Current (line ~192):
```tsx
<Image
    src="/hero-city.jpg"
    alt="City intersection at night — the scale of the noise every company is competing against"
    fill
    className="object-cover grayscale contrast-125"
    style={{ objectPosition: 'center 60%' }}
/>
```

Replace with:
```tsx
<Image
    src="/hero-typewriter.png"
    alt="Close-up of typewriter keys — the analog craft behind every narrative"
    fill
    className="object-cover grayscale contrast-125"
    style={{ objectPosition: 'center 50%' }}
/>
```

Change: `/hero-city.jpg` → `/hero-typewriter.png`. Alt text updated. Object position adjusted. The typewriter image aligns with the maker/analog moodboard. If `hero-typewriter.png` doesn't feel right visually, alternative: `/subtle_blueprint_film_blend.png`.

**Step 2: Verify visually**

Check: Cinematic strip shows textural, process-oriented image — no generic stock of blurry pedestrians.

**Step 3: Commit**

```bash
git add app/story-health-check/page.tsx
git commit -m "fix: replace stock photo with analog/process image in cinematic strip"
```

---

## Task 5: Enforce Button Discipline (Rust-Only CTAs)

**Files:**
- Modify: `app/story-health-check/page.tsx` (4 locations)

The rule: **Every primary action button = `bg-rust text-paper`**. Secondary actions = text-links with arrows. No black buttons, no white buttons.

**Step 1: Fix form Next button (line ~393)**

Current:
```tsx
className="bg-ink text-paper font-sans text-[0.65rem] uppercase tracking-widest px-6 py-3 hover:bg-rust transition-all duration-300 flex items-center gap-2 font-bold group disabled:opacity-30 disabled:cursor-not-allowed"
```

Replace:
```tsx
className="bg-rust text-paper font-sans text-[0.65rem] uppercase tracking-widest px-6 py-3 hover:bg-rust/85 transition-all duration-300 flex items-center gap-2 font-bold group disabled:opacity-30 disabled:cursor-not-allowed"
```

Change: `bg-ink` → `bg-rust`. `hover:bg-rust` → `hover:bg-rust/85`.

**Step 2: Fix Story Audit section CTA (line ~487)**

Current:
```tsx
<div className="relative bg-white text-ink font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold px-8 py-4 flex items-center gap-3 transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
```

Replace:
```tsx
<div className="relative bg-rust text-paper font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold px-8 py-4 flex items-center gap-3 transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
```

Change: `bg-white text-ink` → `bg-rust text-paper`.

**Step 3: Fix closing CTA button (line ~726)**

Current:
```tsx
<div className="relative bg-ink text-paper font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold px-10 py-5 flex items-center gap-3 ...">
```

Replace:
```tsx
<div className="relative bg-rust text-paper font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold px-10 py-5 flex items-center gap-3 ...">
```

Change: `bg-ink` → `bg-rust`.

**Step 4: Fix sticky bar button (line ~760)**

Current:
```tsx
className="bg-ink hover:bg-rust text-white px-6 py-4 md:px-10 md:py-4 font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold flex items-center gap-4 transition-all hover:pr-8 shadow-sm group"
```

Replace:
```tsx
className="bg-rust hover:bg-rust/85 text-paper px-6 py-4 md:px-10 md:py-4 font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold flex items-center gap-4 transition-all hover:pr-8 shadow-sm group"
```

Change: `bg-ink hover:bg-rust` → `bg-rust hover:bg-rust/85`. `text-white` → `text-paper`.

**Step 5: Verify — no remaining non-rust primary buttons**

Run: `grep -n "bg-ink.*text-paper\|bg-white.*text-ink\|bg-black" "app/story-health-check/page.tsx" | grep -v "//"`
Expected: No primary CTA buttons with bg-ink or bg-white remaining. (Non-button elements with `bg-ink text-paper` for section backgrounds are fine.)

**Step 6: Commit**

```bash
git add app/story-health-check/page.tsx
git commit -m "fix: enforce rust-only button discipline across all CTAs"
```

---

## Task 6: Fix WCAG Accessibility — Layer Numbers on Dark Background

**Files:**
- Modify: `app/story-health-check/page.tsx:508`

**Step 1: Change layer numbers to high-contrast color**

Current (line ~508):
```tsx
<span className="font-sans text-[0.6rem] text-rust font-bold tracking-widest mt-1 flex-shrink-0">{layer.num}</span>
```

Replace:
```tsx
<span className="font-sans text-[0.6rem] text-paper/70 font-bold tracking-widest mt-1 flex-shrink-0">{layer.num}</span>
```

Change: `text-rust` → `text-paper/70`. On `bg-ink` (#2C2C2C), `text-paper/70` (#FAFAFA at 70% opacity) provides approximately 7:1 contrast ratio, well above WCAG AA (4.5:1). The original `text-rust` (#C83C2F) on `bg-ink` only achieves ~2.5:1 — a clear WCAG failure.

**Step 2: Verify contrast**

Check: Numbers 01, 02, 03, 04 are now clearly readable against the dark charcoal background.

**Step 3: Commit**

```bash
git add app/story-health-check/page.tsx
git commit -m "a11y: fix WCAG contrast for layer numbers on dark background"
```

---

## Task 7: Destroy SaaS Pricing Cards → Editorial Ledger

**Files:**
- Modify: `app/story-health-check/page.tsx:526-582`

This is the largest single change. The current side-by-side SaaS-style cards commoditize the service. Replace with an editorial ledger: two text columns separated by a single 1px vertical rule. No colored boxes.

**Step 1: Replace the entire grid + cards block**

Delete the current `grid grid-cols-1 md:grid-cols-2` block (lines ~536–582) and replace with:

```tsx
<div className="flex flex-col md:flex-row gap-0 reveal reveal-delay-1">
    {/* Free Loom Column */}
    <div className="flex-1 py-12 md:pr-16">
        <p className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ink/40 mb-4">Free</p>
        <h3 className="font-display text-4xl text-ink mb-3 italic">Story Loom</h3>
        <p className="font-display text-lg text-ink/60 italic mb-8">A 5-minute video teardown of your narrative blind spots.</p>
        <ul className="space-y-4 font-sans text-[0.8rem] text-ink/70 mb-10">
            <li className="flex items-start gap-3">
                <span className="text-rust mt-0.5"><CheckCircle2 className="w-3.5 h-3.5" /></span>
                <span>First-impression audit of your homepage or pitch deck</span>
            </li>
            <li className="flex items-start gap-3">
                <span className="text-rust mt-0.5"><CheckCircle2 className="w-3.5 h-3.5" /></span>
                <span>Narrative gap identification</span>
            </li>
            <li className="flex items-start gap-3">
                <span className="text-rust mt-0.5"><CheckCircle2 className="w-3.5 h-3.5" /></span>
                <span>Delivered via personalized Loom within 48 hours</span>
            </li>
        </ul>
        <a href="#free-loom" className="font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold text-rust hover:text-ink transition-colors flex items-center gap-2">
            Send Your URL
            <ArrowRight className="w-3 h-3" />
        </a>
    </div>

    {/* Vertical Rule */}
    <div className="hidden md:block w-px bg-ink/15 self-stretch" />
    <div className="md:hidden h-px bg-ink/15 w-full" />

    {/* Paid Audit Column */}
    <div className="flex-1 py-12 md:pl-16">
        <p className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ink/40 mb-4">$1,500</p>
        <h3 className="font-display text-4xl text-ink mb-3 italic">Story Audit</h3>
        <p className="font-display text-lg text-ink/60 italic mb-8">A 5-day deep dive that rebuilds your narrative from the spine out.</p>
        <ul className="space-y-4 font-sans text-[0.8rem] text-ink/70 mb-10">
            <li className="flex items-start gap-3">
                <span className="text-rust mt-0.5"><CheckCircle2 className="w-3.5 h-3.5" /></span>
                <span>The Spine — your foundational narrative architecture</span>
            </li>
            <li className="flex items-start gap-3">
                <span className="text-rust mt-0.5"><CheckCircle2 className="w-3.5 h-3.5" /></span>
                <span>The Script — rewritten homepage and pitch deck copy</span>
            </li>
            <li className="flex items-start gap-3">
                <span className="text-rust mt-0.5"><CheckCircle2 className="w-3.5 h-3.5" /></span>
                <span>The Stage — content strategy and channel playbook</span>
            </li>
        </ul>
        <a href={DUBSADO_URL} className="group relative inline-flex">
            <div className="absolute inset-0 bg-rust transform translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            <div className="relative bg-rust text-paper font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold px-8 py-4 flex items-center gap-3 transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                Book the Story Audit
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
        </a>
    </div>
</div>
```

Key design decisions:
- No colored boxes. Text sits directly on the warm-white page.
- Single 1px vertical rule (`w-px bg-ink/15`) separates the columns. On mobile, it becomes a horizontal rule.
- The Free Loom side uses a text-link CTA (secondary). The Story Audit side uses the offset-shadow rust button (primary). This reinforces the conversion hierarchy.
- Deliverable names (The Spine, The Script, The Stage) are listed cleanly.

> **Anchoring tradeoff acknowledged:** Destroying the side-by-side cards loses the price-anchoring psychology of "$0 vs $1,500" in matching containers. The editorial ledger trades anchoring for brand coherence — premium brands don't box their services. The price labels ("Free" / "$1,500") at the top of each column preserve *some* anchoring, but it's softer. This is the right call for the target audience (founder-led brands who smell commoditization a mile away), but worth monitoring conversion data post-launch.
>
> **Future ticket:** Consider a lightweight email-capture fallback (e.g., "Not ready for either? Get the free newsletter →") below the ledger for visitors who aren't ready to commit to even the free Loom. Out of scope for this sprint — flag for follow-up.

**Step 2: Verify visually**

Check on desktop: Two text columns, separated by thin vertical line. No cards, no boxes, no SaaS visual language.
Check on mobile: Stacked vertically with horizontal rule separator.

**Step 3: Commit**

```bash
git add app/story-health-check/page.tsx
git commit -m "feat: destroy SaaS pricing cards, replace with editorial ledger"
```

---

## Task 8: Closing CTA — Replace Bordered Button with Quiet Text-Link Escape Valve

**Files:**
- Modify: `app/story-health-check/page.tsx:730-735`

The closing CTA should lead with ONE dominant choice: Book the Story Audit. But we don't strand interested-but-not-ready visitors at a dead end. A quiet text-link gives them a "back door" to the free Loom without competing visually with the primary conversion.

**Step 1: Replace the bordered secondary button with a quiet text-link**

Current (lines ~732-735):
```tsx
<a href="#free-loom" className="font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold text-ink/50 hover:text-rust transition-colors px-6 py-5 border border-ink/20 hover:border-rust flex items-center gap-3">
    <PlayCircle className="w-4 h-4" />
    Or start with the free Loom
</a>
```

Replace with:
```tsx
<a href="#free-loom" className="font-sans text-[0.6rem] tracking-[0.15em] text-ink/30 hover:text-rust transition-colors flex items-center gap-1.5 mt-6">
    Not ready? Send your URL for the free teardown first
    <ArrowRight className="w-3 h-3" />
</a>
```

Changes: Removed border, padding, uppercase, bold, PlayCircle icon. Dropped opacity to `text-ink/30`. Added `mt-6` for breathing room below the rust button. This reads as a whisper, not a competing option.

**Step 2: Verify visually**

Check: Final CTA section shows one dominant rust button ("Book the Story Audit — $1,500") with a barely-there text-link underneath for the free option. The visual weight ratio should be ~90/10.

**Step 3: Commit**

```bash
git add app/story-health-check/page.tsx
git commit -m "feat: closing CTA — replace bordered button with quiet text-link escape valve"
```

---

## Task 9: Narrative Pivot Interstitial (Free → Paid Bridge)

**Files:**
- Modify: `app/story-health-check/page.tsx` — insert between the Loom form section and the Story Audit section

Without a narrative transition, the page jumps from "here's a free thing" to "now pay $1,500." The pivot interstitial bridges the two with a single editorial line that reframes the free Loom as triage and positions the paid audit as the real treatment.

**Step 1: Identify insertion point**

The Loom form section ends around line ~420 (closing `</section>` of the free-loom section).
The Story Audit section begins around line ~422 (`<section id="story-audit"`).

**Step 2: Insert the interstitial between the two sections**

Add this block between the two sections:

```tsx
{/* Narrative Pivot — Free → Paid Bridge */}
<section className="py-24 md:py-32 bg-paper texture-paper relative">
    <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="font-display text-3xl md:text-4xl lg:text-5xl text-ink italic leading-tight reveal">
            A 5-minute teardown stops the bleeding.
        </p>
        <p className="font-display text-3xl md:text-4xl lg:text-5xl text-ink/40 italic leading-tight mt-4 reveal reveal-delay-1">
            A 5-day audit cures the disease.
        </p>
    </div>
</section>
```

Design decisions:
- Same font-display italic as the rest of the editorial voice.
- First line in full `text-ink` — the free Loom is the thing they already understand.
- Second line in `text-ink/40` — the paid audit is introduced softly, almost like a whisper. It creates intrigue without hard-selling.
- Centered, generous padding (`py-24 md:py-32`). This is a breathing moment, not a content section.
- No CTA here. Let the copy do the work. The paid audit section immediately follows.

**Step 3: Verify visually**

Check: Between the Loom form and Story Audit sections, there's a centered editorial interstitial with two lines of italic display text. It should feel like a chapter break, not a sales pitch.

**Step 4: Commit**

```bash
git add app/story-health-check/page.tsx
git commit -m "feat: add narrative pivot interstitial bridging free Loom → paid Story Audit"
```

---

## Task 10: Sticky Bar Context-Swap (Free CTA → Paid CTA on Scroll)

**Files:**
- Modify: `app/story-health-check/page.tsx:750-765` (sticky bar) and top-of-component state/effect

The sticky bar currently pushes the $1,500 audit CTA at all times, including when cold traffic hasn't even seen the free Loom offer yet. Fix: show the free CTA ("Send Your URL →") initially, then swap to the paid CTA ("Book the Story Audit") after the user scrolls past the Loom form section.

**Step 1: Add state and IntersectionObserver for scroll tracking**

Near the top of the component (after existing `useState` declarations, around line ~40), add:

```tsx
const [pastLoomForm, setPastLoomForm] = useState(false);
```

Then add an effect (after existing effects, around line ~70):

```tsx
useEffect(() => {
    const loomSection = document.getElementById('free-loom');
    if (!loomSection) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
            // When the free-loom section scrolls out of view (above viewport), swap CTA
            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                setPastLoomForm(true);
            } else if (entry.isIntersecting) {
                setPastLoomForm(false);
            }
        },
        { threshold: 0 }
    );

    observer.observe(loomSection);
    return () => observer.disconnect();
}, []);
```

Logic: The observer watches `#free-loom`. When the section exits the viewport upward (`!isIntersecting && top < 0`), the user has scrolled past it and seen the free offer. Swap to paid CTA. If they scroll back up, swap back.

**Step 2: Update the sticky bar CTA to be context-aware**

Current sticky bar button (lines ~758-763):
```tsx
<a href={DUBSADO_URL} className="bg-rust hover:bg-rust/85 text-paper ...">
    Book the Story Audit
    <ArrowRight className="w-4 h-4 ..." />
</a>
```

Replace with:
```tsx
<a
    href={pastLoomForm ? DUBSADO_URL : '#free-loom'}
    className="bg-rust hover:bg-rust/85 text-paper px-6 py-4 md:px-10 md:py-4 font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold flex items-center gap-4 transition-all hover:pr-8 shadow-sm group"
>
    {pastLoomForm ? 'Book the Story Audit' : 'Send Your URL'}
    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
</a>
```

Changes:
- `href` swaps between `#free-loom` (scroll to form) and `DUBSADO_URL` (external booking).
- Button label swaps between "Send Your URL" (free) and "Book the Story Audit" (paid).
- Everything else (color, size, style) stays identical. The button doesn't visually "flash" — just the text and destination change.

**Step 3: Verify behavior**

Check:
1. Load page, scroll to sticky bar appearing → shows "Send Your URL"
2. Scroll past the Loom form section → sticky bar swaps to "Book the Story Audit"
3. Scroll back up past the form → swaps back to "Send Your URL"
4. Click "Send Your URL" → smooth-scrolls to `#free-loom`
5. Click "Book the Story Audit" → navigates to Dubsado URL

**Step 4: Commit**

```bash
git add app/story-health-check/page.tsx
git commit -m "feat: sticky bar context-swap — free CTA before form, paid CTA after"
```

---

## Task 11: Final Verification Pass

**Step 1: Full build check**

Run: `npm run build`
Expected: Clean build, zero errors, zero warnings.

**Step 2: Lint check**

Run: `npm run lint`
Expected: No lint errors.

**Step 3: Grep for remaining violations**

```bash
# No remaining "Human Audit" references
grep -n "Human Audit\|human-audit" "app/story-health-check/page.tsx"

# No bg-ink primary CTA buttons (excluding section backgrounds)
grep -n "bg-ink text-paper.*uppercase\|bg-white text-ink.*uppercase" "app/story-health-check/page.tsx"

# No border-rust on symptoms box
grep -n "border-rust/30" "app/story-health-check/page.tsx"
```

Expected: All greps return 0 matches.

**Step 4: Visual checklist**

- [ ] Hero: Single rust "Send Your URL" button + quiet text-link underneath
- [ ] Symptoms: No red border, em-dashes instead of × marks
- [ ] Cinematic strip: Typewriter image, no stock city photo
- [ ] Form: Rust "Next" button
- [ ] Story Audit section: Rust CTA, readable layer numbers
- [ ] Choice section: Editorial ledger, no SaaS cards
- [ ] Social proof: Unchanged
- [ ] Closing CTA: Dominant rust button + quiet text-link escape valve (not a bordered button)
- [ ] Narrative pivot: Interstitial between Loom form and Story Audit ("stops the bleeding / cures the disease")
- [ ] Sticky bar: Shows "Send Your URL" before Loom form, swaps to "Book the Story Audit" after scrolling past
- [ ] Sticky bar click: "Send Your URL" → scrolls to #free-loom, "Book the Story Audit" → Dubsado URL
- [ ] All "Human Audit" → "Story Audit" complete

**Step 5: Commit (if any final tweaks)**

```bash
git add app/story-health-check/page.tsx
git commit -m "chore: final verification pass — all directives implemented"
```

---

## Summary of All Changes

| # | Directive | Section | Lines Affected |
|---|-----------|---------|----------------|
| 1 | Rename Human → Story Audit | Global | 8+ locations |
| 2 | Hero CTA restructure | Hero | 116-128 |
| 3 | Fix error-state symptoms | Crisis Mirror | 159-181 |
| 4 | Replace stock photo | Cinematic Strip | 190-210 |
| 5 | Button discipline (4 buttons) | Multiple | 393, 487, 726, 760 |
| 6 | WCAG contrast fix | Story Audit layers | 508 |
| 7 | Destroy SaaS cards → editorial ledger | The Choice | 526-582 |
| 8 | Closing CTA escape valve (text-link) | Closing CTA | 730-735 |
| 9 | Narrative pivot interstitial | New section (between Loom form & Story Audit) | Insert ~420 |
| 10 | Sticky bar context-swap (free → paid) | Sticky bar + component state | 40, 70, 750-765 |
| 11 | Final verification | All | — |
