---
name: Protagonist Ink
description: A contemporary editorial studio site — expressive serif typography, one disciplined red, and the clarity of a well-edited publication.
colors:
  paper: "#FAFAF7"
  ink: "#282828"
  red: "#C83C2F"
  red-press: "#A93226"
  red-on-ink: "#E86A57"
  indigo: "#252B54"
  graphite: "#6D6A64"
  proof: "#E1D5D2"
  paper-muted: "#A8A49C"
typography:
  hero:
    fontFamily: "\"Ethic Serif\", Newsreader, Georgia, serif"
    fontSize: "clamp(64px, 7.8vw, 112px)"
    fontWeight: 400
    lineHeight: 1.036
    letterSpacing: "-0.025em"
  statement:
    fontFamily: "\"Ethic Serif\", Newsreader, Georgia, serif"
    fontSize: "clamp(36px, 4.4vw, 64px)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.02em"
  heading-sans:
    fontFamily: "Satoshi, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: "clamp(36px, 4vw, 56px)"
    fontWeight: 500
    lineHeight: 1.07
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Satoshi, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "Satoshi, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Satoshi, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.06em"
  nav:
    fontFamily: "Satoshi, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.3
  caption:
    fontFamily: "Satoshi, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.45
rounded:
  none: "0px"
  soft: "2px"
  pill: "999px"
spacing:
  space-1: "4px"
  space-2: "8px"
  space-3: "16px"
  space-4: "24px"
  space-5: "32px"
  space-6: "48px"
  space-7: "64px"
  space-8: "96px"
  space-9: "144px"
components:
  button-primary:
    backgroundColor: "{colors.red}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    typography: "{typography.nav}"
    height: "56px"
    padding: "0 32px"
  button-primary-hover:
    backgroundColor: "{colors.red-press}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
  button-on-ink:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    typography: "{typography.nav}"
    height: "56px"
    padding: "0 32px"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 2px"
---

# Design System: Protagonist Ink

## 1. Overview

**Creative North Star: "Editorial"**

The site behaves like a well-edited page, not a piece of software. Paper (#FAFAF7) is the dominant field and ink (#282828) carries nearly all the reading; the palette otherwise stays quiet so that the one accent, editorial red (#C83C2F), keeps a single consistent job across the whole site: the primary button, the headline's closing full stop, engagement labels, and title fields. There is no "one accent per screen" rule limiting it, but there is also no second or third accent color diluting it. Two sections deliberately invert to a dark ink field with paper text — the featured case study and the closing invitation — functioning like a change of paper stock partway through a magazine, not a theme toggle.

Typography carries most of the system's personality. A serif (Ethic Serif, currently standing in on Newsreader) is reserved for the hero headline and major statements, set large, in sentence case, with intentional line breaks — never for routine headings. Satoshi, a workhorse grotesk, carries everything functional: navigation, buttons, captions, labels, body copy, and even some substantial headings, at a scale that gives it real authority rather than treating it as secondary to the serif. The system explicitly rejects literal writing-process iconography (book pages, typewriters, screenplay formatting, blueprints, ink splashes, red-pen marks, chapter numbering) as brand devices — the methodology is not the visual subject, and story is carried by sequence, emphasis and language instead.

**Key Characteristics:**
- Paper-dominant, ink-for-text, one red accent with a fixed job, two deliberate dark-field reversals
- Serif for hero/statement moments only; Satoshi carries everything else with real authority
- Flat throughout: no shadows, no elevation, depth from hairline rules and whitespace
- Square photography and form fields against fully pill-shaped buttons — the system's one geometric contrast
- Spacing is deliberately uneven: tight within a group, generous (96–144px) between sections

## 2. Colors

The palette is restrained: a paper/ink editorial base plus one working red, with graphite and a dark indigo held in reserve for narrow, specific roles.

### Primary
- **Editorial Red** (#C83C2F): the site's only accent, with one consistent job everywhere it appears — primary button fill, the headline's final full stop, engagement labels ("REBRAND," "WEBSITE"), title fields. 4.85:1 on paper, so it's used for real text, not just marks. On ink it drops to 2.91:1 and fails text contrast; use **Red-on-Ink** there instead.
- **Red Press** (#A93226): hover/pressed state for red buttons and links on paper. 6.33:1 with paper text.
- **Red-on-Ink** (#E86A57): a proposed tint, outside the core approved palette, for the rare case red type must sit on the ink field (4.65:1). Not for buttons or marks — text only, and only on dark surfaces.

### Secondary
- **Indigo** (#252B54): an occasional substantial dark field, used as a single mood shift, never as a default replacement for the ink dark sections. Carries paper text at 12.94:1. Never pair red directly on indigo (2.67:1, fails for text or control boundaries); on indigo, buttons are paper-fill with indigo text.

### Neutral
- **Paper** (#FAFAF7): the dominant background and reading field across nearly the entire site.
- **Ink** (#282828): primary text color on paper (14.10:1) and the fill for the two dark-field sections.
- **Graphite** (#6D6A64): captions and secondary information on paper (5.15:1). Fails on ink — use Paper-Muted there instead.
- **Paper-Muted** (#A8A49C): secondary text and captions when the surface is ink (5.94:1).
- **Proof** (#E1D5D2): an optional quiet supporting surface for pulled quotes and evidence blocks. Not a default box for every callout.

### Named Rules
**The One Job Rule.** Editorial red has exactly one recurring function set — primary actions, the headline's full stop, engagement labels — and never appears as decoration, illustration fill, or a second competing accent. Every other color stays out of its lane.

**The Two-Reversal Rule.** Only two sections on the page invert to a dark (ink) field: the featured case study and the closing invitation. Dark fields are a deliberate change of pace, not a section-by-section alternating pattern.

## 3. Typography

**Display Font:** "Ethic Serif" (with Newsreader, Georgia fallback while the licensed web files are pending)
**Body Font:** Satoshi (with Helvetica Neue, Arial fallback)

**Character:** An editorial serif for moments that deserve to be read slowly, paired with a precise, confident grotesk that carries every functional surface without feeling like an afterthought.

### Hierarchy
- **Hero** (400 weight, `clamp(64px, 7.8vw, 112px)`, line-height 1.036, letter-spacing -0.025em): the fixed headline, "It's time to write your sequel." — sentence case, intentional line breaks, word-for-word fixed.
- **Statement** (400 weight, `clamp(36px, 4.4vw, 64px)`, line-height 1.06): major editorial statements and section heads carried by the serif; not every heading gets this treatment.
- **Heading (sans)** (500 weight, `clamp(36px, 4vw, 56px)`, line-height 1.07, letter-spacing -0.02em): Satoshi headings with direct authority — work titles, section heads that should read plain rather than literary.
- **Lede** (400 weight, 24px desktop / 20–24px mobile, line-height 1.4): the supporting description directly under the hero.
- **Body** (400 weight, 18–20px at every breakpoint, line-height 1.55): running copy, capped at 55–70 characters per line.
- **Label** (500 weight, 14px, letter-spacing 0.06em, uppercase): engagement labels and short eyebrows only — capitals limited to a word or two, never a passage.

### Named Rules
**The No-Literary-Props Rule.** Nothing in the type system illustrates the writing process itself — no typewriter faces, no manuscript textures, no screenplay slug lines. The serif communicates editorial authority through scale and restraint, not costume.

## 4. Elevation

The system is flat by design: no box-shadows exist anywhere in the built CSS. Depth and separation come from hairline rules (1px, `rule` on paper / `rule-on-ink` on dark fields) between meaningful content blocks, and from generous, unequal whitespace between compositions (96px) and between major sections (144px), never from blur or drop shadow.

### Named Rules
**The Flat-by-Default Rule.** No shadows anywhere in this system, at any elevation. Separation is drawn with hairline rules and space, never simulated depth.

## 5. Components

Every component stays restrained and exact: minimal chrome, precise geometry, no ornament competing with the content it frames.

### Buttons
- **Shape:** fully rounded, pill (`border-radius: 999px`) — the system's only rounded geometry.
- **Primary (on paper):** red fill (#C83C2F), paper text, 56px min-height, 0 32px padding, Satoshi 500 16px. Hover shifts fill to Red Press (#A93226).
- **On ink:** paper fill, ink text; hover shifts fill to pure white.
- **Secondary / tertiary:** underlined text links, not a bordered button variant. Inline links are always underlined, never color alone.
- **Focus:** 2px solid focus ring (`--focus`, red on paper, paper on ink), 3px offset.

### Cards / Containers
The system deliberately avoids cards as a default. Images and text sit unboxed in the grid; a bounded surface appears only when it genuinely aids comprehension — the "proof" tint (#E1D5D2) behind a pulled quote is the one recurring exception, not a general card pattern.

- **Corner Style:** square (`radius-none`, 0px) for photography and the proof surface.
- **Background:** Proof (#E1D5D2) for pulled-quote/evidence blocks only.
- **Shadow Strategy:** none — see Elevation.

### Inputs / Fields
- **Style:** transparent background, no border box; a single 1px bottom rule (`rgba(250,250,247,.4)` on the dark contact form) is the entire field boundary. Near-square corners (2px, `radius-soft`).
- **Focus:** bottom rule shifts to solid paper.
- **Error:** bottom rule shifts to Red-on-Ink (`aria-invalid="true"`).
- **Labels:** always visible above the field, 14px 500 weight — never placeholder-as-label.

### Navigation
Sentence-case Satoshi 500 16px links (Work, Approach, About, Contact), wordmark links home, min 44px touch targets. On mobile, the nav collapses to a toggle that reveals a full-width paper panel with 20px links; no hover-only behavior anywhere since mobile has no hover.

### Work Entry (signature component)
Image, engagement label, title and one-line description read as a single group; captions sit directly under their image. No hover-only information and no carousels hiding proof — everything the entry has to show is visible by default.

## 6. Do's and Don'ts

### Do:
- **Do** keep editorial red to its one job: primary buttons, the headline's full stop, engagement labels, title fields — never a second decorative accent.
- **Do** use Red-on-Ink (#E86A57) instead of Red (#C83C2F) for any red text on an ink or indigo field; plain Red fails contrast there (2.91:1).
- **Do** reserve the serif (Ethic Serif / Newsreader fallback) for the hero and major statements; give Satoshi real authority everywhere else, including substantial headings.
- **Do** separate sections with generous, unequal space (96px between compositions, 144px between major sections) and hairline rules, never with shadows or boxes.
- **Do** keep photography and form fields square (0–2px radius) so the fully pill-shaped buttons remain the system's one deliberate rounded contrast.
- **Do** provide a visible label above every form field, a visible focus ring, and 44px minimum touch targets throughout.

### Don't:
- **Don't** use book pages, typewriters, screenplay formatting, blueprints, ink splashes, red-pen annotations or chapter metaphors as brand devices — the methodology is not the visual subject.
- **Don't** add a second or third accent color; the palette outside paper/ink/graphite is red, indigo and proof, used exactly as specified, nothing else.
- **Don't** add box-shadows, glassmorphism, or any simulated elevation — this system is flat by rule, not by omission.
- **Don't** wrap work entries, quotes, or general content in cards by default; unboxed is the baseline, and a bounded surface is the rare exception.
- **Don't** invert more than the featured case study and the closing invitation to a dark field — dark sections are a deliberate, limited change of pace, not an alternating pattern.
- **Don't** run any motion outside the hero, except the How we work stages easing open and shut when a visitor hovers, focuses or taps them (no typewriter effects, rotating words, scroll-jacking, parallax, custom cursors, autoplay sound), and always pause/remove motion under `prefers-reduced-motion`.
- **Don't** invent clients, projects, testimonials, metrics or outcomes anywhere the design system touches copy or imagery; unresolved content stays visibly bracketed.
