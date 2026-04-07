# Case Study Arc Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the fixed case study template with an 8-beat story-arc system — new Sanity schema, new TypeScript types, updated data layer, and redesigned detail page.

**Architecture:** Fixed Arc Template. Every case study follows the same 8-beat narrative sequence (Hero → Cold Open → Story Problem → The World → The Reframe → Narrative Architecture → Execution → The Shift). Sanity schema has dedicated fields per beat. Empty beats are skipped in rendering. Visual approach: cinematic hero, editorial body.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Sanity v5, next-sanity v12

**Design doc:** `docs/plans/2026-03-08-case-study-arc-design.md`

---

## Task 1: Update Sanity Schema

**Files:**
- Modify: `sanity/schemaTypes/caseStudy.ts` (full rewrite, currently lines 1-144)

**Step 1: Replace the schema with new beat-based fields**

Replace the entire contents of `sanity/schemaTypes/caseStudy.ts` with:

```typescript
import { defineField, defineType, defineArrayMember } from 'sanity';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Studies',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'coldOpen', title: 'Cold Open' },
    { name: 'storyProblem', title: 'Story Problem' },
    { name: 'theWorld', title: 'The World' },
    { name: 'reframe', title: 'The Reframe' },
    { name: 'artifacts', title: 'Narrative Architecture' },
    { name: 'execution', title: 'Execution' },
    { name: 'theShift', title: 'The Shift' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ── Hero ──────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Cinematic title (e.g., "What Comes Next?")',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Transformation Subtitle',
      description: 'The narrative shift (e.g., From "Minor League Drum Corps" to "Premier Performer Incubator")',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      type: 'string',
      group: 'hero',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Scheduled', value: 'scheduled' },
          { title: 'Published', value: 'published' },
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      group: 'hero',
    }),
    defineField({
      name: 'clientName',
      title: 'Client / Organization',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'sector',
      title: 'Sector',
      description: 'Industry or domain (e.g., "Performing Arts", "Health Tech")',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'engagementType',
      title: 'Engagement Type',
      description: 'What you did (e.g., "Brand Strategy", "Narrative Architecture")',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      group: 'hero',
      options: {
        hotspot: true,
        aiAssist: { imageDescriptionField: 'alt' },
      },
      fields: [defineField({ name: 'alt', type: 'string' })],
    }),

    // ── Cold Open ────────────────────────────────────
    defineField({
      name: 'coldOpen',
      title: 'Cold Open',
      description: 'One paragraph: what was happening before you showed up. Max 3-4 sentences.',
      type: 'text',
      rows: 4,
      group: 'coldOpen',
    }),

    // ── Story Problem ────────────────────────────────
    defineField({
      name: 'internalStory',
      title: 'Internal Story',
      description: 'What the organization tells itself.',
      type: 'text',
      rows: 4,
      group: 'storyProblem',
    }),
    defineField({
      name: 'externalPerception',
      title: 'External Perception',
      description: 'What the market/audience actually hears.',
      type: 'text',
      rows: 4,
      group: 'storyProblem',
    }),
    defineField({
      name: 'consequences',
      title: 'Consequences',
      description: 'What\'s at stake if nothing changes.',
      type: 'text',
      rows: 4,
      group: 'storyProblem',
    }),

    // ── The World ────────────────────────────────────
    defineField({
      name: 'mentors',
      title: 'Who\'s Getting It Right',
      type: 'array',
      group: 'theWorld',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', type: 'string', title: 'Name' }),
            defineField({ name: 'observation', type: 'text', title: 'Observation', rows: 2 }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'observation' },
          },
        }),
      ],
    }),
    defineField({
      name: 'villains',
      title: 'What You\'re Up Against',
      type: 'array',
      group: 'theWorld',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', type: 'string', title: 'Name' }),
            defineField({ name: 'observation', type: 'text', title: 'Observation', rows: 2 }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'observation' },
          },
        }),
      ],
    }),

    // ── The Reframe ──────────────────────────────────
    defineField({
      name: 'reframe',
      title: 'The Reframe',
      description: 'The insight moment. 1-2 sentences, short and sharp.',
      type: 'text',
      rows: 3,
      group: 'reframe',
    }),
    defineField({
      name: 'reframeAnnotation',
      title: 'Red Pen Annotation',
      description: 'Optional handwriting margin note (e.g., "This. This is where it turned.")',
      type: 'string',
      group: 'reframe',
    }),

    // ── Narrative Architecture ───────────────────────
    defineField({
      name: 'artifacts',
      title: 'Artifacts',
      description: 'Visual proof of strategy: messaging hierarchies, language shifts, arc diagrams.',
      type: 'array',
      group: 'artifacts',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
            aiAssist: { imageDescriptionField: 'alt' },
          },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt Text' }),
            defineField({ name: 'label', type: 'string', title: 'Label' }),
            defineField({ name: 'description', type: 'string', title: 'Description' }),
          ],
        }),
      ],
    }),

    // ── Execution (optional) ─────────────────────────
    defineField({
      name: 'executionSurfaces',
      title: 'Execution Surfaces',
      description: 'Where the strategy landed: website, decks, campaigns, workshops.',
      type: 'array',
      group: 'execution',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'surface', type: 'string', title: 'Surface' }),
            defineField({ name: 'description', type: 'text', title: 'Description', rows: 2 }),
            defineField({
              name: 'image',
              type: 'image',
              title: 'Image',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
            }),
          ],
          preview: {
            select: { title: 'surface', subtitle: 'description' },
          },
        }),
      ],
    }),

    // ── The Shift ────────────────────────────────────
    defineField({
      name: 'shifts',
      title: 'Shifts',
      description: 'What changed — cultural shifts before numerical ones.',
      type: 'array',
      group: 'theShift',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'dimension', type: 'string', title: 'Dimension' }),
            defineField({ name: 'change', type: 'text', title: 'Change', rows: 2 }),
          ],
          preview: {
            select: { title: 'dimension', subtitle: 'change' },
          },
        }),
      ],
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      description: 'Optional supporting numbers.',
      type: 'array',
      group: 'theShift',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label' }),
            defineField({ name: 'value', type: 'string', title: 'Value' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        }),
      ],
    }),

    // ── SEO ──────────────────────────────────────────
    defineField({ name: 'seoTitle', type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', type: 'text', group: 'seo' }),
    defineField({
      name: 'ogImage',
      type: 'image',
      group: 'seo',
      options: {
        hotspot: true,
        aiAssist: { imageDescriptionField: 'alt' },
      },
      fields: [defineField({ name: 'alt', type: 'string' })],
    }),
    defineField({ name: 'canonicalUrl', type: 'url', group: 'seo' }),
    defineField({ name: 'noIndex', type: 'boolean', group: 'seo' }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'clientName',
      media: 'heroImage',
    },
  },
});
```

**Step 2: Verify the schema compiles**

Run: `cd "/Users/pat/Sites/Protagonist Ink/next" && npx tsc --noEmit sanity/schemaTypes/caseStudy.ts 2>&1 | head -20`

If TypeScript errors appear about imports, check that `defineArrayMember` is available in the installed sanity version.

**Step 3: Commit**

```bash
git add sanity/schemaTypes/caseStudy.ts
git commit -m "feat(sanity): rewrite case study schema for 8-beat story arc"
```

---

## Task 2: Update TypeScript Types

**Files:**
- Modify: `types/work.ts` (full rewrite, currently lines 1-32)

**Step 1: Replace the Project interface with the new arc structure**

```typescript
export interface ArtifactImage {
  src: string;
  alt?: string;
  label?: string;
  description?: string;
}

export interface WorldEntry {
  name: string;
  observation: string;
}

export interface ExecutionSurface {
  surface: string;
  description: string;
  image?: { src: string; alt?: string };
}

export interface ShiftDimension {
  dimension: string;
  change: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface CaseStudy {
  // Identity
  id: number;
  slug: string;
  scene: string;
  ref: string;

  // Hero
  title: string;
  subtitle?: string;
  client: string;
  sector?: string;
  engagementType?: string;
  year: string;
  image: string;
  imageAlt?: string;

  // Cold Open
  coldOpen?: string;

  // Story Problem
  internalStory?: string;
  externalPerception?: string;
  consequences?: string;

  // The World
  mentors?: WorldEntry[];
  villains?: WorldEntry[];

  // The Reframe
  reframe?: string;
  reframeAnnotation?: string;

  // Narrative Architecture
  artifacts?: ArtifactImage[];

  // Execution
  executionSurfaces?: ExecutionSurface[];

  // The Shift
  shifts?: ShiftDimension[];
  metrics?: Metric[];

  // SEO
  description: string;

  // Listing page (derived)
  category: string;
  tagline: string;
}

// Backward-compat alias — remove once listing page is updated
export type Project = CaseStudy;
```

**Step 2: Commit**

```bash
git add types/work.ts
git commit -m "feat(types): replace Project interface with CaseStudy for story arc"
```

---

## Task 3: Update Data Layer

**Files:**
- Modify: `lib/work.ts` (full rewrite, currently lines 1-185)
- Modify: `data/work-projects.ts` (update to match new types)

**Step 1: Rewrite `lib/work.ts` with new CMS interface and GROQ query**

Key changes:
- New `CmsCaseStudy` interface matching the new Sanity schema fields
- Updated GROQ query to fetch all new fields (mentors, villains, artifacts, shifts, etc.)
- New `mapCmsCaseStudy()` that maps to the `CaseStudy` type
- Keep `toText()`, `toFirstSentence()`, `toYear()` utilities
- Keep fallback-to-hardcoded pattern

```typescript
import { createClient } from 'next-sanity';
import { PROJECTS } from '@/data/work-projects';
import { normalizeEnvValue } from '@/lib/env';
import type { CaseStudy } from '@/types/work';

const DEFAULT_SANITY_PROJECT_ID = 'dkok2iir';
const DEFAULT_SANITY_DATASET = 'production';

interface CmsCaseStudy {
  _id: string;
  title?: string;
  subtitle?: string;
  slug?: { current?: string };
  clientName?: string;
  sector?: string;
  engagementType?: string;
  publishedAt?: string;
  status?: string;

  coldOpen?: string;

  internalStory?: string;
  externalPerception?: string;
  consequences?: string;

  mentors?: Array<{ name?: string; observation?: string }>;
  villains?: Array<{ name?: string; observation?: string }>;

  reframe?: string;
  reframeAnnotation?: string;

  artifacts?: Array<{
    label?: string;
    description?: string;
    alt?: string;
    assetUrl?: string;
  }>;

  executionSurfaces?: Array<{
    surface?: string;
    description?: string;
    imageUrl?: string;
    imageAlt?: string;
  }>;

  shifts?: Array<{ dimension?: string; change?: string }>;
  metrics?: Array<{ label?: string; value?: string }>;

  seoDescription?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  ogImageUrl?: string;
}

function getSanityClient() {
  const projectId =
    normalizeEnvValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) || DEFAULT_SANITY_PROJECT_ID;
  const dataset =
    normalizeEnvValue(process.env.NEXT_PUBLIC_SANITY_DATASET) || DEFAULT_SANITY_DATASET;

  return createClient({
    projectId,
    dataset,
    apiVersion: '2026-03-02',
    useCdn: false,
  });
}

function toYear(value?: string) {
  if (!value) return String(new Date().getUTCFullYear());
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(new Date().getUTCFullYear());
  return String(date.getUTCFullYear());
}

function mapCmsCaseStudy(item: CmsCaseStudy, index: number): CaseStudy | null {
  const title = item.title?.trim();
  const slug = item.slug?.current?.trim();
  if (!title || !slug) return null;

  const image = item.heroImageUrl || item.ogImageUrl || '/images/work/scene-01.png';

  return {
    id: index + 1,
    slug,
    scene: `SCENE ${String(index + 1).padStart(2, '0')}`,
    ref: `CASE-${String(index + 1).padStart(2, '0')}`,

    title,
    subtitle: item.subtitle?.trim() || undefined,
    client: (item.clientName || 'Client').trim(),
    sector: item.sector?.trim() || undefined,
    engagementType: item.engagementType?.trim() || undefined,
    year: toYear(item.publishedAt),
    image,
    imageAlt: item.heroImageAlt || title,

    coldOpen: item.coldOpen?.trim() || undefined,

    internalStory: item.internalStory?.trim() || undefined,
    externalPerception: item.externalPerception?.trim() || undefined,
    consequences: item.consequences?.trim() || undefined,

    mentors: item.mentors
      ?.filter((m) => m.name?.trim())
      .map((m) => ({ name: m.name!.trim(), observation: (m.observation || '').trim() })),
    villains: item.villains
      ?.filter((v) => v.name?.trim())
      .map((v) => ({ name: v.name!.trim(), observation: (v.observation || '').trim() })),

    reframe: item.reframe?.trim() || undefined,
    reframeAnnotation: item.reframeAnnotation?.trim() || undefined,

    artifacts: item.artifacts
      ?.filter((a) => a.assetUrl)
      .map((a, i) => ({
        src: a.assetUrl!,
        alt: a.alt || undefined,
        label: a.label || `FIG. ${String(i + 1).padStart(2, '0')}`,
        description: a.description || undefined,
      })),

    executionSurfaces: item.executionSurfaces
      ?.filter((e) => e.surface?.trim())
      .map((e) => ({
        surface: e.surface!.trim(),
        description: (e.description || '').trim(),
        image: e.imageUrl ? { src: e.imageUrl, alt: e.imageAlt || undefined } : undefined,
      })),

    shifts: item.shifts
      ?.filter((s) => s.dimension?.trim())
      .map((s) => ({ dimension: s.dimension!.trim(), change: (s.change || '').trim() })),
    metrics: item.metrics
      ?.filter((m) => m.label?.trim())
      .map((m) => ({ label: m.label!.trim(), value: (m.value || '').trim() })),

    description: item.seoDescription || item.coldOpen || title,
    category: item.engagementType || item.sector || 'Brand Strategy',
    tagline: item.subtitle || item.coldOpen?.split(/[.!?]/)[0]?.trim() || title,
  };
}

const CASE_STUDY_QUERY = `
  *[_type == "caseStudy" && defined(slug.current) && coalesce(status, "published") == "published"]
  | order(coalesce(publishedAt, _updatedAt) desc) {
    _id,
    title,
    subtitle,
    slug,
    clientName,
    sector,
    engagementType,
    publishedAt,
    status,

    coldOpen,

    internalStory,
    externalPerception,
    consequences,

    mentors,
    villains,

    reframe,
    reframeAnnotation,

    "artifacts": artifacts[] {
      label,
      description,
      "alt": alt,
      "assetUrl": asset->url
    },

    executionSurfaces[] {
      surface,
      description,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    },

    shifts,
    metrics,

    seoDescription,
    "heroImageUrl": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    "ogImageUrl": ogImage.asset->url
  }
`;

async function getCmsCaseStudies(): Promise<CaseStudy[]> {
  const client = getSanityClient();

  try {
    const records = await client.fetch<CmsCaseStudy[]>(CASE_STUDY_QUERY);
    return records
      .map(mapCmsCaseStudy)
      .filter((item): item is CaseStudy => Boolean(item));
  } catch {
    return [];
  }
}

export async function getWorkProjects(): Promise<CaseStudy[]> {
  const cmsProjects = await getCmsCaseStudies();
  return cmsProjects.length > 0 ? cmsProjects : PROJECTS;
}

export async function getWorkProjectBySlug(slug: string): Promise<CaseStudy | undefined> {
  const projects = await getWorkProjects();
  return projects.find((project) => project.slug === slug);
}
```

**Step 2: Update `data/work-projects.ts` fallback data to match new `CaseStudy` type**

Update the hardcoded projects array to use the new field names. Keep 2-3 sample projects with representative data for all 8 beats. Remove the old `situation`, `problem`, `engagementSummary`, `before`, `after`, `tensionStatement` fields and replace with `coldOpen`, `internalStory`, `externalPerception`, `consequences`, `mentors`, `villains`, `reframe`, `shifts`, etc.

Note: The listing page (`app/work/page.tsx`) uses `category`, `client`, `tagline`, `image`, `title`, `slug`, `scene` — all of which are still present in the new type. The listing page should continue to work without changes.

**Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

**Step 4: Commit**

```bash
git add lib/work.ts data/work-projects.ts
git commit -m "feat(data): rewrite work data layer for 8-beat story arc"
```

---

## Task 4: Rewrite Case Study Detail Page — Hero + Cold Open

**Files:**
- Modify: `app/work/[slug]/page.tsx` (lines 1-302, full rewrite across Tasks 4-6)

**Step 1: Update imports and data fetching**

Change the `Project` import to `CaseStudy`. Update `generateMetadata` to use `subtitle` for description fallback. Keep `generateStaticParams` as-is.

**Step 2: Rewrite the Hero section (lines 55-116)**

Key changes from current:
- Add **subtitle** below the title — serif italic, the transformation line
- Change meta pills to show: `engagementType`, `client`, `sector`, `year` (4 pills instead of 3)
- Keep all cinematic elements: ParallaxHeroBackground, camera metadata, TypewriterHeadline, scroll indicator

**Step 3: Replace the Tension section (lines 121-134) with Cold Open**

- Section eyebrow: "THE COLD OPEN" (was "THE TENSION")
- Add inline metadata row: Client · Sector · Engagement — separated by middot, small sans
- Single paragraph of `project.coldOpen` in serif body 18-20px
- Keep the paper-lifts-over-dark transition
- Skip this section if `coldOpen` is empty

**Step 4: Verify Hero + Cold Open render**

Run dev server, navigate to `/work/[slug]`, check:
- Hero displays title + subtitle + 4 meta pills
- Cold Open shows metadata row + paragraph
- Paper transition effect works

**Step 5: Commit**

```bash
git add app/work/[slug]/page.tsx
git commit -m "feat(work): rewrite hero + cold open for story arc"
```

---

## Task 5: Story Problem + The World + The Reframe

**Files:**
- Modify: `app/work/[slug]/page.tsx` (continuing from Task 4)

**Step 1: Replace Situation/Problem/Engagement (lines 140-170) with Story Problem**

- Section eyebrow: "THE STORY PROBLEM" (was three separate labels)
- Three columns: Internal Story / External Perception / Consequences
- Keep: 3-column grid, `text-technical` labels, `text-ink/55` body, ScrollRevealWrapper, 1px dividers
- Skip section if all three fields are empty

**Step 2: Add The World section (new — insert after Story Problem)**

- Section eyebrow: "THE WORLD"
- Two-column layout:
  - Left: "WHO'S GETTING IT RIGHT" header + list of mentors (name in semi-bold, observation below)
  - Right: "WHAT YOU'RE UP AGAINST" header + list of villains, with a thin `border-l-2 border-rust/30` on the left edge of the villains column
- Skip section if both `mentors` and `villains` are empty

**Step 3: Replace Before/After (lines 176-204) with The Reframe**

- Section eyebrow: "THE REFRAME"
- Centered oversized serif text (Cormorant, 3xl-5xl), `text-ink/80`
- If `reframeAnnotation` exists: render it in `font-hand text-rust/60` at an angle (`-rotate-2`), positioned as a margin note
- Extra generous vertical padding (py-24 md:py-32)
- Skip section if `reframe` is empty

**Step 4: Verify all three sections render**

Check dev server for:
- Story Problem shows three columns with correct content
- The World shows two-column mentor/villain layout
- The Reframe shows oversized centered text with optional handwriting annotation

**Step 5: Commit**

```bash
git add app/work/[slug]/page.tsx
git commit -m "feat(work): add Story Problem, The World, and The Reframe beats"
```

---

## Task 6: Narrative Architecture + Execution + The Shift + Nav

**Files:**
- Modify: `app/work/[slug]/page.tsx` (continuing)

**Step 1: Replace The Rolls gallery (lines 210-261) with Narrative Architecture**

- Section eyebrow: "NARRATIVE ARCHITECTURE" (was "THE ROLLS")
- Dark section: `bg-trueblack texture-grain`
- Grid layout instead of horizontal scroll: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Each artifact: Image with `aspect-[3/2]`, monospace figure label, description
- No film-strip perforations — clean dark editorial
- Skip section if `artifacts` is empty or undefined

**Step 2: Add Execution section (new — insert after Narrative Architecture)**

- Light background (paper)
- Section eyebrow: "THE EXECUTION"
- Simple list layout: each surface as a row with name (tracked sans, semi-bold) + description (body text)
- Optional thumbnail image per surface
- Skip entirely if `executionSurfaces` is empty

**Step 3: Add The Shift section (new — insert before navigation)**

- Light background (paper)
- Section eyebrow: "THE SHIFT"
- Vertical list of shift dimensions:
  - Each row: dimension label in `text-technical` + change description in body text
  - Thin `border-l-2 border-rust/20` on the left edge of the whole list (subtle accent)
- If `metrics` exist, add a sub-section below: small cards or inline items showing label + value
- Skip section if `shifts` is empty

**Step 4: Keep navigation footer (lines 266-299) as-is**

The Next Case Study + All Work / Book a Call navigation remains unchanged. Just verify it still works with the `CaseStudy` type (it only uses `title`, `slug`, `tagline`).

**Step 5: Verify the complete page renders**

Navigate through the entire page on dev server:
- All 8 beats render in order (or skip if empty)
- Dark/light transitions are smooth
- Scroll animations fire correctly
- Next case study navigation works
- No TypeScript errors, no console errors

**Step 6: Commit**

```bash
git add app/work/[slug]/page.tsx
git commit -m "feat(work): complete story arc — Architecture, Execution, Shift beats"
```

---

## Task 7: Update Work Listing Page (if needed)

**Files:**
- Check: `app/work/page.tsx` (lines 1-146)

**Step 1: Verify listing page still works**

The listing page uses: `slug`, `title`, `client`, `category`, `image`, `tagline`, `scene`, `campaignTitle`, `businessCategory`. Check these fields are all present in the new `CaseStudy` type.

Fields that changed:
- `campaignTitle` — no longer exists. Use `title` instead.
- `businessCategory` — no longer exists. Use `sector` instead.
- `campaignCategory` — no longer exists. Use `engagementType` instead.

**Step 2: Update field references in listing page**

Replace:
- `project.campaignTitle` → `project.title`
- `project.businessCategory` → `project.sector`
- `project.campaignCategory` → `project.engagementType`

**Step 3: Verify listing page renders correctly**

Navigate to `/work`, confirm all projects display with correct metadata.

**Step 4: Commit**

```bash
git add app/work/page.tsx
git commit -m "fix(work): update listing page field references for new CaseStudy type"
```

---

## Task 8: Deploy Sanity Schema

**Step 1: Deploy the updated schema to Sanity**

Run: `cd "/Users/pat/Sites/Protagonist Ink/next" && npx sanity deploy` (or however the project deploys schema)

Check Sanity Studio at `https://protagonistink.sanity.studio/` — verify:
- Case Studies document type shows grouped fields (Hero, Cold Open, Story Problem, etc.)
- Array fields (mentors, villains, artifacts, shifts, metrics) work correctly
- Image fields accept uploads

**Step 2: Create a test case study in Sanity Studio**

Fill in all beats to verify the full pipeline from CMS → frontend.

---

## Task 9: Final Verification and Cleanup

**Step 1: Remove unused files/code**

- Remove old Portable Text block handling from `lib/work.ts` (the `toText()` function and `PortableTextBlock` interfaces are no longer needed since we moved away from Portable Text for case study content)
- Clean up any unused imports

**Step 2: Full page test**

- Navigate to each case study page
- Verify all beats render or skip correctly
- Check responsive layout (mobile, tablet, desktop)
- Verify SEO metadata generates correctly
- Check that the listing page still works

**Step 3: Final commit**

```bash
git add -A
git commit -m "chore: cleanup unused code from case study migration"
```
