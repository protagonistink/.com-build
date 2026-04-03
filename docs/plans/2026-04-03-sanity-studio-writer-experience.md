# Sanity Studio Writer Experience Overhaul

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the Sanity Studio from a schema-correct CMS into a premium, anxiety-reducing writing environment for a neurodivergent writer who needs to feel safe, oriented, and productive from their first session.

**Architecture:** All changes are studio-side (schema types, structure, config, custom components). The Next.js rendering pipeline and data-fetching layer stay untouched except for a new draft-preview API route. The hosted studio at `protagonistink.sanity.studio` will pick up all changes after the next deploy.

**Tech Stack:** Sanity v5, React, `@sanity/ui`, `next-sanity` v12, TypeScript, Lucide icons

---

## Task 1: Theme Refinement + Custom CSS Layer

**Files:**
- Modify: `sanity/theme.ts`
- Create: `sanity/studio/studioCSS.ts`
- Modify: `sanity.config.ts`

### Step 1: Update theme colors

In `sanity/theme.ts`, change the brand props:

```ts
const props = {
  '--brand-trueblack': '#131417',  // was #0A0A0A
  '--brand-ink': '#2C2C2C',
  '--brand-rust': '#C83C2F',
  '--brand-warmwhite': '#FAFAFA',
  // ...rest unchanged
};
```

Update the theme mappings:
```ts
'--black': props['--brand-trueblack'],        // #131417
'--component-bg': props['--brand-trueblack'],  // #131417
'--main-navigation-color': props['--brand-trueblack'], // #131417
```

### Step 2: Create custom CSS injection component

Create `sanity/studio/studioCSS.ts`:

```ts
// Injected via sanity.config.ts → studio.components.layout wrapper
// Targets the parts of the studio that buildLegacyTheme can't reach

export const studioCSS = `
  /* Larger, more readable array item previews */
  [data-testid="array-item"] {
    margin-bottom: 4px;
  }

  /* Stronger focus rings for tracking cursor position */
  [data-ui="TextInput"]:focus-within,
  [data-ui="TextArea"]:focus-within {
    box-shadow: 0 0 0 2px rgba(200, 60, 47, 0.4) !important;
  }

  /* Fieldset legends need more visual weight than field labels */
  [data-testid="fieldset-legend"] {
    font-size: 0.8125rem !important;
    letter-spacing: 0.04em !important;
    text-transform: uppercase !important;
    opacity: 0.6 !important;
  }

  /* Breathe between blocks in Story Builder array */
  [data-testid="array-item"] + [data-testid="array-item"] {
    margin-top: 6px;
  }

  /* Collapsed fieldset visual cue */
  [data-testid="fieldset"][data-collapsed="true"] {
    opacity: 0.7;
    border-left: 2px solid rgba(200, 60, 47, 0.2);
    padding-left: 8px;
  }
`;
```

### Step 3: Create a layout wrapper to inject the CSS

Create `sanity/studio/StudioLayoutWrapper.tsx`:

```tsx
import React from 'react';
import type {LayoutProps} from 'sanity';
import {studioCSS} from './studioCSS';

export function StudioLayoutWrapper(props: LayoutProps) {
  return (
    <>
      <style>{studioCSS}</style>
      {props.renderDefault(props)}
    </>
  );
}
```

### Step 4: Wire it into sanity.config.ts

In `sanity.config.ts`, add the layout wrapper:

```ts
import {StudioLayoutWrapper} from './sanity/studio/StudioLayoutWrapper';

// In defineConfig:
studio: {
  components: {
    logo: BrandLogo,
    layout: StudioLayoutWrapper,
  },
},
```

### Step 5: Verify the studio loads

Run: `npm run dev` and visit `/studio` (should redirect to hosted, but local dev should render)
Expected: Studio loads with slightly lifted background, stronger focus rings, more spacious array items.

### Step 6: Commit

```bash
git add sanity/theme.ts sanity/studio/studioCSS.ts sanity/studio/StudioLayoutWrapper.tsx sanity.config.ts
git commit -m "feat(studio): update theme to #131417 + inject custom CSS for spacing and focus"
```

---

## Task 2: Collapse Config Fields on All Showcase Blocks

**Files:**
- Modify: `sanity/schemaTypes/caseStudy/blocks/showcaseSplit.ts`
- Modify: `sanity/schemaTypes/caseStudy/blocks/showcaseFullBleed.ts`
- Modify: `sanity/schemaTypes/caseStudy/blocks/showcaseFilmStrip.ts`
- Modify: `sanity/schemaTypes/caseStudy/blocks/showcaseStat.ts`
- Modify: `sanity/schemaTypes/caseStudy/shared.ts`

The goal: every showcase block opens with writing fields visible and config fields (`actLabel`, `surface`, `eyebrow`) tucked into a collapsed "Settings" fieldset.

### Step 1: Update shared field helpers to accept a fieldset parameter

In `sanity/schemaTypes/caseStudy/shared.ts`, update each helper to accept an optional fieldset:

```ts
export function actLabelField(fieldset?: string) {
  return defineField({
    name: 'actLabel',
    title: 'Act Label',
    type: 'string',
    ...(fieldset && {fieldset}),
    description: 'Optional — The story beat this belongs to. Think "THE CHALLENGE" or "THE WORK."',
  });
}

export function surfaceField(fieldset?: string) {
  return defineField({
    name: 'surface',
    title: 'Surface',
    type: 'string',
    ...(fieldset && {fieldset}),
    description: 'Optional — Light reads like notes on paper. Dark reads like the finished reel.',
    options: {
      list: surfaceOptions,
      layout: 'radio',
    },
    initialValue: 'dark',
  });
}

export function eyebrowField(fieldset?: string) {
  return defineField({
    name: 'eyebrow',
    title: 'Eyebrow',
    type: 'string',
    ...(fieldset && {fieldset}),
    description: 'Optional — Micro-label above the headline if this beat needs a cue card.',
  });
}
```

### Step 2: Add collapsed Settings fieldset to each showcase block

For each of the four showcase blocks, add the `settings` fieldset and pass it to the shared fields.

**showcaseSplit.ts:**
```ts
fieldsets: [
  {name: 'settings', title: 'Settings', options: {collapsible: true, collapsed: true}},
  {name: 'story', title: 'Story Copy'},
  {name: 'layout', title: 'Layout', options: {collapsible: true, collapsed: true, columns: 2}},
],
fields: [
  actLabelField('settings'),
  surfaceField('settings'),
  eyebrowField('settings'),
  // imagePosition stays in 'layout' fieldset
  // story fields stay in 'story' fieldset
  // rest unchanged
],
```

**showcaseFullBleed.ts:**
```ts
fieldsets: [
  {name: 'settings', title: 'Settings', options: {collapsible: true, collapsed: true}},
],
fields: [
  actLabelField('settings'),
  surfaceField('settings'),
  eyebrowField('settings'),
  // title, body, image unchanged
],
```

**showcaseFilmStrip.ts:**
```ts
fieldsets: [
  {name: 'settings', title: 'Settings', options: {collapsible: true, collapsed: true}},
  {name: 'intro', title: 'Intro Copy'},
],
fields: [
  actLabelField('settings'),
  surfaceField('settings'),
  eyebrowField('settings'),
  // title, body in 'intro' fieldset
  // frames unchanged
],
```

**showcaseStat.ts:**
```ts
fieldsets: [
  {name: 'settings', title: 'Settings', options: {collapsible: true, collapsed: true}},
  {name: 'stat', title: 'Stat', options: {columns: 2}},
],
fields: [
  actLabelField('settings'),
  surfaceField('settings'),
  eyebrowField('settings'),
  // stat fields in 'stat' fieldset
  // rest unchanged
],
```

### Step 3: Verify blocks render correctly

Open the studio, create or edit a case study, go to Story tab, open any showcase block.
Expected: Writing fields are visible first. "Settings" is collapsed at the top.

### Step 4: Commit

```bash
git add sanity/schemaTypes/caseStudy/shared.ts sanity/schemaTypes/caseStudy/blocks/showcase*.ts
git commit -m "feat(studio): collapse config fields on all showcase blocks — writing first"
```

---

## Task 3: Rename Block Types to Story Language + Reorder Array

**Files:**
- Modify: `sanity/schemaTypes/caseStudy/blocks/showcaseSplit.ts`
- Modify: `sanity/schemaTypes/caseStudy/blocks/showcaseFullBleed.ts`
- Modify: `sanity/schemaTypes/caseStudy/blocks/showcaseFilmStrip.ts`
- Modify: `sanity/schemaTypes/caseStudy/blocks/showcaseStat.ts`
- Modify: `sanity/schemaTypes/caseStudy/blocks/videoEmbed.ts`
- Modify: `sanity/schemaTypes/caseStudy/blocks/deliverables.ts`
- Modify: `sanity/schemaTypes/caseStudy/blocks/prologue.ts`
- Modify: `sanity/schemaTypes/caseStudy/blocks/climax.ts`
- Modify: `sanity/schemaTypes/caseStudy/blocks/closer.ts`
- Modify: `sanity/schemaTypes/caseStudy.ts`

**Important:** Only change `title` and `description` on each type. Do NOT change `name` — that's the stored identifier and changing it would break existing data.

### Step 1: Update block titles and add descriptions

```ts
// prologue.ts
title: 'Prologue',
description: 'Set the scene. Who was this for, what was off, and why it mattered.',

// showcaseSplit.ts
title: 'Image + Text Beat',
description: 'One image and one story moment, side by side.',

// showcaseFullBleed.ts
title: 'Hero Image Moment',
description: 'One image takes over the whole page.',

// showcaseFilmStrip.ts
title: 'The Reel',
description: 'A horizontal strip of images. Think film frames.',

// showcaseStat.ts
title: 'Numbers That Hit',
description: 'A big stat with context that turns a number into a story beat.',

// videoEmbed.ts
title: 'Video',
description: 'Embed a Vimeo or YouTube link.',

// deliverables.ts
title: 'Deliverables',
description: 'The list of what got made.',

// climax.ts
title: 'Climax',
description: 'The payoff. Quote, metrics, proof.',

// closer.ts
title: 'Closer',
description: 'The last line. Make it land.',
```

### Step 2: Reorder the sections array in caseStudy.ts

Reorder for narrative flow and remove legacy from the picker:

```ts
defineField({
  name: 'sections',
  title: 'Story Builder',
  type: 'array',
  group: 'story',
  description: 'Build the case file beat by beat. Start with the Prologue, add your story beats, then close it out.',
  of: [
    defineArrayMember({type: 'prologue'}),
    defineArrayMember({type: 'showcaseSplit'}),
    defineArrayMember({type: 'showcaseFullBleed'}),
    defineArrayMember({type: 'showcaseFilmStrip'}),
    defineArrayMember({type: 'showcaseStat'}),
    defineArrayMember({type: 'videoEmbed'}),
    defineArrayMember({type: 'deliverables'}),
    defineArrayMember({type: 'climax'}),
    defineArrayMember({type: 'closer'}),
    // Legacy showcase removed from picker — existing data still renders via schema registration
  ],
}),
```

### Step 3: Update preview `prepare` functions

Update the `prepare` functions in each block to use the new titles as fallbacks:

```ts
// showcaseSplit.ts prepare:
title: title || 'Image + Text Beat',

// showcaseFullBleed.ts prepare:
title: title || 'Hero Image Moment',

// showcaseFilmStrip.ts prepare:
title: title || 'The Reel',

// showcaseStat.ts prepare:
title: title || 'Numbers That Hit',
```

### Step 4: Commit

```bash
git add sanity/schemaTypes/caseStudy.ts sanity/schemaTypes/caseStudy/blocks/*.ts
git commit -m "feat(studio): rename blocks to story language, reorder for narrative flow"
```

---

## Task 4: Reorganize Case Study Hero — Separate Publishing from Creative

**Files:**
- Modify: `sanity/schemaTypes/caseStudy.ts`

### Step 1: Add a Publishing group and move fields

```ts
groups: [
  {name: 'hero', title: 'Hero', default: true},
  {name: 'story', title: 'Story'},
  {name: 'publishing', title: 'Publishing'},
  {name: 'seo', title: 'SEO'},
],
```

Move `slug`, `status`, `publishedAt` to the `publishing` group:

```ts
defineField({
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  group: 'publishing',
  options: {source: 'title', maxLength: 96},
  description: 'URL handle — auto-generated from the title. You can usually ignore this.',
  validation: (rule) => rule.required(),
}),
defineField({
  name: 'status',
  title: 'Status',
  type: 'string',
  group: 'publishing',
  description: 'Nothing goes live until this says "Published." You\'re safe to save drafts anytime.',
  options: {
    list: [
      {title: 'Draft — just getting ideas down', value: 'draft'},
      {title: 'Ready for Review — I think this is done', value: 'scheduled'},
      {title: 'Published — live on the site', value: 'published'},
    ],
    layout: 'radio',
  },
  initialValue: 'draft',
}),
defineField({
  name: 'publishedAt',
  title: 'Published At',
  type: 'datetime',
  group: 'publishing',
  description: 'Optional — set this when the case file should officially go live.',
}),
```

The Hero tab now only has: Title, Subtitle, Case File Details fieldset (Client, Sector, Engagement Type, Case Number, Timeline), Hero Image.

### Step 2: Commit

```bash
git add sanity/schemaTypes/caseStudy.ts
git commit -m "feat(studio): move publishing fields out of Hero tab — creative space only"
```

---

## Task 5: Add Placeholders + Soften Descriptions Across All Blocks

**Files:**
- Modify: `sanity/schemaTypes/caseStudy/blocks/showcaseSplit.ts`
- Modify: `sanity/schemaTypes/caseStudy/blocks/showcaseFullBleed.ts`
- Modify: `sanity/schemaTypes/caseStudy/blocks/showcaseFilmStrip.ts`
- Modify: `sanity/schemaTypes/caseStudy/blocks/showcaseStat.ts`
- Modify: `sanity/schemaTypes/caseStudy/blocks/climax.ts`
- Modify: `sanity/schemaTypes/caseStudy/blocks/deliverables.ts`
- Modify: `sanity/schemaTypes/caseStudy/blocks/closer.ts`
- Modify: `sanity/schemaTypes/caseStudy/blocks/prologue.ts`

### Step 1: Add placeholders to all text/string fields

Every writing field should have a `placeholder` showing what a good entry looks like. These are *examples*, not instructions.

```ts
// prologue.ts — body
placeholder: 'When Loom & Ledger came to us, their digital presence was a patchwork of three acquisitions and no coherent voice...',

// showcaseSplit.ts — title
placeholder: 'The system nobody was using',
// showcaseSplit.ts — body
placeholder: 'The old platform had 340 daily users. The new one needed to feel inevitable from day one...',
// showcaseSplit.ts — tagline
placeholder: 'A complete interface overhaul in 14 weeks',

// showcaseFullBleed.ts — title
placeholder: 'The moment it clicked',
// showcaseFullBleed.ts — body
placeholder: 'Three months of iteration, compressed into a single frame...',

// showcaseFilmStrip.ts — title
placeholder: 'From wireframe to final cut',
// showcaseFilmStrip.ts — body
placeholder: 'Each frame represents a different stage of the visual identity...',

// showcaseStat.ts — statValue
placeholder: '340%',
// showcaseStat.ts — statLabel
placeholder: 'increase in daily active users',
// showcaseStat.ts — title
placeholder: 'The number that changed the conversation',
// showcaseStat.ts — body
placeholder: 'Before the rebrand, engagement was a polite fiction. After launch, the numbers told a different story...',

// climax.ts — quote
placeholder: '"We didn\'t just get a new website. We got a new way of talking about what we do."',

// deliverables.ts — headline
placeholder: 'What We Built',
// deliverables.ts — subheadline
placeholder: 'The tangible outputs of a 14-week engagement',

// closer.ts — text
placeholder: 'Every brand has a story. Most of them just need someone to find the thread.',
```

### Step 2: Soften key descriptions

Update descriptions on required fields to reduce pressure:

```ts
// prologue.ts — body
description: 'Set the table. Who was this for, what was off, and why did it matter? A rough draft is fine — you can sharpen it later.',

// climax.ts — quote
description: 'The line that earns the ending. A testimonial, a payoff, or whatever sentence lands the whole case. Leave blank if nothing fits yet.',

// closer.ts — text
description: 'The line you want ringing in the room after everything else stops. Just get it down — it doesn\'t have to be perfect.',

// showcaseSplit.ts — title
description: 'Optional — The headline for this beat. A working title is fine.',

// showcaseSplit.ts — body
description: 'Optional — What happened here, in plain language. Don\'t overthink it.',
```

### Step 3: Commit

```bash
git add sanity/schemaTypes/caseStudy/blocks/*.ts
git commit -m "feat(studio): add placeholders and soften descriptions — permission to be rough"
```

---

## Task 6: Story Templates (Short / Full / Data-Driven)

**Files:**
- Create: `sanity/templates.ts`
- Modify: `sanity.config.ts`

### Step 1: Create the templates file

Create `sanity/templates.ts`:

```ts
import type {Template} from 'sanity';

function generateKey() {
  return Math.random().toString(36).slice(2, 10);
}

const shortStory = {
  sections: [
    {_type: 'prologue', _key: generateKey()},
    {_type: 'showcaseSplit', _key: generateKey(), surface: 'dark'},
    {_type: 'closer', _key: generateKey()},
  ],
};

const fullStory = {
  sections: [
    {_type: 'prologue', _key: generateKey()},
    {_type: 'showcaseSplit', _key: generateKey(), surface: 'dark'},
    {_type: 'showcaseFullBleed', _key: generateKey(), surface: 'dark'},
    {_type: 'showcaseSplit', _key: generateKey(), surface: 'dark', imagePosition: 'right'},
    {_type: 'climax', _key: generateKey(), label: 'THE CLIMAX'},
    {_type: 'closer', _key: generateKey()},
  ],
};

const dataDrivenStory = {
  sections: [
    {_type: 'prologue', _key: generateKey()},
    {_type: 'showcaseStat', _key: generateKey(), surface: 'dark'},
    {_type: 'showcaseSplit', _key: generateKey(), surface: 'dark'},
    {_type: 'showcaseStat', _key: generateKey(), surface: 'light'},
    {_type: 'showcaseFilmStrip', _key: generateKey(), surface: 'dark'},
    {_type: 'climax', _key: generateKey(), label: 'THE CLIMAX'},
    {_type: 'closer', _key: generateKey()},
  ],
};

export const caseStudyTemplates: Template[] = [
  {
    id: 'case-study-short',
    title: 'Short Case File',
    description: 'Quick portfolio piece — opening, one beat, closing.',
    schemaType: 'caseStudy',
    value: {status: 'draft', ...shortStory},
  },
  {
    id: 'case-study-full',
    title: 'Full Story Arc',
    description: 'The standard arc — prologue, three beats, climax, closer.',
    schemaType: 'caseStudy',
    value: {status: 'draft', ...fullStory},
  },
  {
    id: 'case-study-data',
    title: 'Data-Driven Case',
    description: 'Results-heavy — stats, visuals, proof, payoff.',
    schemaType: 'caseStudy',
    value: {status: 'draft', ...dataDrivenStory},
  },
];
```

### Step 2: Wire templates into sanity.config.ts

```ts
import {caseStudyTemplates} from './sanity/templates';

// In defineConfig:
schema: {
  types: schemaTypes,
  templates: (prev) => {
    // Remove the default caseStudy template (blank document)
    const filtered = prev.filter((t) => t.schemaType !== 'caseStudy');
    return [...filtered, ...caseStudyTemplates];
  },
},
```

### Step 3: Verify template picker

Open the studio, click "+" to create a new Case Study.
Expected: Three template options appear instead of a blank document.

### Step 4: Commit

```bash
git add sanity/templates.ts sanity.config.ts
git commit -m "feat(studio): add story templates — Short, Full Arc, Data-Driven"
```

---

## Task 7: Filtered Structure Views (Needs Attention / In Progress / Published)

**Files:**
- Modify: `sanity/structure/index.ts`

### Step 1: Replace the flat Case Files list with filtered views

```ts
import {FolderOpenDot, Newspaper, Settings2, Tags, AlertCircle, PenTool, Globe, BookOpen} from 'lucide-react';
import type {StructureResolver} from 'sanity/structure';

function documentList(
  S: Parameters<StructureResolver>[0],
  schemaType: 'post' | 'category',
  title: string,
  icon: React.ComponentType,
) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .schemaType(schemaType)
    .child(
      S.documentTypeList(schemaType)
        .title(title)
        .canHandleIntent((intentName, params) =>
          ['create', 'edit'].includes(intentName) && params.type === schemaType,
        ),
    );
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Protagonist Ink')
    .items([
      // Welcome guide (Task 8)
      S.listItem()
        .title('Site Settings')
        .icon(Settings2)
        .child(S.editor().id('siteSettings').schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),

      // Case Files — grouped by status
      S.listItem()
        .title('Case Files')
        .icon(FolderOpenDot)
        .child(
          S.list()
            .title('Case Files')
            .items([
              S.listItem()
                .title('Drafts — In Progress')
                .icon(PenTool)
                .child(
                  S.documentList()
                    .title('Drafts')
                    .schemaType('caseStudy')
                    .filter('_type == "caseStudy" && coalesce(status, "draft") == "draft"')
                    .canHandleIntent((intentName, params) =>
                      ['create', 'edit'].includes(intentName) && params.type === 'caseStudy',
                    ),
                ),
              S.listItem()
                .title('Ready for Review')
                .icon(AlertCircle)
                .child(
                  S.documentList()
                    .title('Ready for Review')
                    .schemaType('caseStudy')
                    .filter('_type == "caseStudy" && status == "scheduled"'),
                ),
              S.listItem()
                .title('Published')
                .icon(Globe)
                .child(
                  S.documentList()
                    .title('Published')
                    .schemaType('caseStudy')
                    .filter('_type == "caseStudy" && status == "published"'),
                ),
              S.divider(),
              S.listItem()
                .title('All Case Files')
                .icon(FolderOpenDot)
                .child(
                  S.documentTypeList('caseStudy')
                    .title('All Case Files')
                    .canHandleIntent((intentName, params) =>
                      ['create', 'edit'].includes(intentName) && params.type === 'caseStudy',
                    ),
                ),
            ]),
        ),
      S.divider(),
      documentList(S, 'post', 'Blog', Newspaper),
      documentList(S, 'category', 'Taxonomy', Tags),
    ]);
```

### Step 2: Commit

```bash
git add sanity/structure/index.ts
git commit -m "feat(studio): add filtered case file views — Drafts, Review, Published"
```

---

## Task 8: Welcome / Writer's Guide Document in Sidebar

**Files:**
- Create: `sanity/studio/WritersGuide.tsx`
- Modify: `sanity/structure/index.ts`

### Step 1: Create the guide component

Create `sanity/studio/WritersGuide.tsx`:

```tsx
import React from 'react';
import {Card, Stack, Text, Box, Heading} from '@sanity/ui';

export function WritersGuide() {
  return (
    <Card padding={5} sizing="border">
      <Stack space={5}>
        <Stack space={3}>
          <Heading as="h1" size={3}>
            Welcome to the Studio
          </Heading>
          <Text size={2} muted>
            Everything you need to know to write case files without breaking anything.
          </Text>
        </Stack>

        <Card padding={4} radius={3} tone="positive" border>
          <Stack space={3}>
            <Text size={2} weight="semibold">
              You can't break the live site from here.
            </Text>
            <Text size={1} muted>
              Everything saves as a draft first. Nothing goes live until the status is set to
              "Published." Save as often as you want — messy drafts are expected and encouraged.
            </Text>
          </Stack>
        </Card>

        <Stack space={3}>
          <Heading as="h2" size={1}>
            What makes a case file?
          </Heading>
          <Stack space={2}>
            <Text size={1}>
              <strong>Hero tab</strong> — Title, subtitle, client name, hero image. This is the
              opening frame visitors see first.
            </Text>
            <Text size={1}>
              <strong>Story tab</strong> — The beats of the case file. When you create a new one,
              you'll pick a template that gives you a skeleton to fill in.
            </Text>
            <Text size={1}>
              <strong>Publishing tab</strong> — Status and publish date. Patrick handles this part —
              you can skip it.
            </Text>
            <Text size={1}>
              <strong>SEO tab</strong> — Search engine details. Also Patrick's territory.
            </Text>
          </Stack>
        </Stack>

        <Stack space={3}>
          <Heading as="h2" size={1}>
            Quick start
          </Heading>
          <Stack space={2}>
            <Text size={1}>1. Go to <strong>Case Files → Drafts</strong></Text>
            <Text size={1}>2. Click <strong>+</strong> and pick a story shape</Text>
            <Text size={1}>3. Fill in the <strong>Hero</strong> tab (title + client name is enough to start)</Text>
            <Text size={1}>4. Switch to the <strong>Story</strong> tab and fill in the blocks</Text>
            <Text size={1}>5. Save anytime. Come back anytime. That's it.</Text>
          </Stack>
        </Stack>

        <Stack space={3}>
          <Heading as="h2" size={1}>
            Things you can safely ignore
          </Heading>
          <Stack space={2}>
            <Text size={1}>
              <strong>Settings</strong> inside story blocks — those are visual toggles (dark/light
              background, labels). They have sensible defaults. Leave them alone unless Patrick asks
              you to change one.
            </Text>
            <Text size={1}>
              <strong>SEO fields</strong> — meta titles, descriptions, canonical URLs. Not your job.
            </Text>
            <Text size={1}>
              <strong>Slug</strong> — auto-generated from your title. Don't touch it.
            </Text>
          </Stack>
        </Stack>

        <Card padding={4} radius={3} tone="transparent" border style={{borderStyle: 'dashed'}}>
          <Stack space={2}>
            <Text size={1} weight="semibold">
              Stuck?
            </Text>
            <Text size={1} muted>
              Every field has a description underneath it that tells you what goes there. The
              gray placeholder text inside empty fields shows you an example. If you're still
              unsure, just write something rough — it's a draft, not a tattoo.
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Card>
  );
}
```

### Step 2: Add the guide to the structure sidebar

In `sanity/structure/index.ts`, add above Site Settings:

```ts
import {WritersGuide} from '../studio/WritersGuide';
import {BookOpen} from 'lucide-react';

// At the top of the items array:
S.listItem()
  .title("Writer's Guide")
  .icon(BookOpen)
  .child(
    S.component(WritersGuide)
      .id('writers-guide')
      .title("Writer's Guide"),
  ),
S.divider(),
```

### Step 3: Commit

```bash
git add sanity/studio/WritersGuide.tsx sanity/structure/index.ts
git commit -m "feat(studio): add Writer's Guide — pinned welcome doc for new writers"
```

---

## Task 9: Replace Prologue Hardcoded Detail Pairs with Flexible Array

**Files:**
- Modify: `sanity/schemaTypes/caseStudy/blocks/prologue.ts`
- Modify: `lib/work.ts` (update mapping)
- Modify: `types/work.ts` (update type)
- Modify: `components/work/sections/Prologue.tsx` (update rendering)

### Step 1: Check current Prologue rendering

Read `components/work/sections/Prologue.tsx` and `types/work.ts` to understand the current contract.

### Step 2: Update the Prologue schema

Replace the hardcoded pairs with `detailsField()`:

```ts
import {BookOpen} from 'lucide-react';
import {defineField, defineType} from 'sanity';
import {detailsField} from '../shared';
import {CaseStudyBlockPreview} from '../../../studio/CaseStudyBlockPreview';

export const prologue = defineType({
  name: 'prologue',
  title: 'Prologue',
  type: 'object',
  icon: BookOpen,
  description: 'Set the scene. Who was this for, what was off, and why it mattered.',
  fields: [
    defineField({
      name: 'body',
      title: 'Opening Frame',
      type: 'text',
      rows: 5,
      description: 'Set the table. Who was this for, what was off, and why did it matter? A rough draft is fine — you can sharpen it later.',
      placeholder: 'When Loom & Ledger came to us, their digital presence was a patchwork of three acquisitions and no coherent voice...',
      validation: (rule) => rule.required(),
    }),
    detailsField(),
  ],
  // preview unchanged
});
```

### Step 3: Update the PrologueSection type in `types/work.ts`

Change from:
```ts
objectiveLabel?: string;
objectiveValue?: string;
focusLabel?: string;
focusValue?: string;
```

To:
```ts
details?: Array<{_key: string; label: string; value: string}>;
```

### Step 4: Update the mapping in `lib/work.ts`

In `mapCmsSection`, update the prologue case to map the new `details` field. Also maintain backwards compatibility by converting the old hardcoded pairs if `details` is empty but the old fields exist:

```ts
case 'prologue': {
  // Support both old (objectiveLabel/Value, focusLabel/Value) and new (details array)
  let prologueDetails = mapDetails(section.details);
  if (!prologueDetails) {
    const legacy: Array<{_key: string; label?: string; value?: string}> = [];
    if (section.objectiveLabel?.trim()) {
      legacy.push({_key: 'legacy-1', label: section.objectiveLabel.trim(), value: (section.objectiveValue || '').trim()});
    }
    if (section.focusLabel?.trim()) {
      legacy.push({_key: 'legacy-2', label: section.focusLabel.trim(), value: (section.focusValue || '').trim()});
    }
    prologueDetails = legacy.length > 0 ? legacy as Array<{_key: string; label: string; value: string}> : undefined;
  }
  return {
    _type: 'prologue',
    _key: section._key,
    body: section.body?.trim() || undefined,
    details: prologueDetails,
  } satisfies PrologueSection;
}
```

### Step 5: Update the Prologue rendering component

Read the component first, then update it to render from `details` array instead of the hardcoded pairs.

### Step 6: Update the GROQ query

In the CASE_STUDY_QUERY in `lib/work.ts`, the prologue section already fetches `details[]` via the generic section projection. No GROQ changes needed since the query fetches all section fields generically.

### Step 7: Commit

```bash
git add sanity/schemaTypes/caseStudy/blocks/prologue.ts types/work.ts lib/work.ts components/work/sections/Prologue.tsx
git commit -m "feat: replace Prologue hardcoded detail pairs with flexible details array"
```

---

## Task 10: Improve CaseStudyBlockPreview — Empty State + Larger Icons

**Files:**
- Modify: `sanity/studio/CaseStudyBlockPreview.tsx`

### Step 1: Add empty-state visual differentiation

Update the preview component to detect when a block has no substantive content and render a dimmer, dashed-border card:

```tsx
import React from 'react';
import {Card, Flex, Box, Stack, Text} from '@sanity/ui';
import type {PreviewProps} from 'sanity';

function renderMedia(media: PreviewProps['media']) {
  if (!media) return null;
  if (React.isValidElement(media)) return media;
  if (typeof media === 'function') {
    const Media = media;
    return <Media dimensions={{width: 96, height: 96, fit: 'crop', aspect: 1, dpr: 1}} layout="default" />;
  }
  return null;
}

export function CaseStudyBlockPreview(props: PreviewProps) {
  const media = renderMedia(props.media);
  const title = typeof props.title === 'string' ? props.title : props.fallbackTitle;
  const subtitle = typeof props.subtitle === 'string' ? props.subtitle : undefined;
  const description = typeof props.description === 'string' ? props.description : undefined;

  // Detect empty blocks: no description means no real content has been written
  const isEmpty = !description && !props.imageUrl;

  return (
    <Card
      radius={3}
      padding={2}
      tone="transparent"
      style={{
        background: isEmpty
          ? 'rgba(25, 23, 22, 0.6)'
          : 'linear-gradient(180deg, rgba(34,31,30,0.98) 0%, rgba(25,23,22,0.98) 100%)',
        border: isEmpty
          ? '1px dashed rgba(250, 248, 244, 0.12)'
          : '1px solid rgba(250, 248, 244, 0.08)',
        boxShadow: isEmpty ? 'none' : 'inset 0 1px 0 rgba(250, 248, 244, 0.03)',
        opacity: isEmpty ? 0.7 : 1,
      }}
    >
      <Flex gap={3} align="flex-start">
        <Card
          radius={2}
          overflow="hidden"
          style={{
            width: 96,
            minWidth: 96,
            height: 72,
            background: 'rgba(250, 248, 244, 0.03)',
            border: '1px solid rgba(250, 248, 244, 0.06)',
          }}
        >
          <Flex align="center" justify="center" style={{width: '100%', height: '100%'}}>
            {props.imageUrl ? (
              <img
                src={props.imageUrl}
                alt=""
                style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
              />
            ) : (
              media || (
                <Box
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 999,
                    background: isEmpty
                      ? 'rgba(200, 60, 47, 0.3)'
                      : 'rgba(200, 60, 47, 0.9)',
                    boxShadow: '0 0 0 1px rgba(200, 60, 47, 0.18)',
                  }}
                />
              )
            )}
          </Flex>
        </Card>

        <Stack space={2} flex={1}>
          <Stack space={1}>
            <Flex align="center" gap={2}>
              <Text size={1} weight="semibold" style={{color: '#FAF8F4'}}>
                {title || 'Untitled block'}
              </Text>
              {isEmpty && (
                <Text
                  size={0}
                  style={{
                    color: 'rgba(200, 60, 47, 0.7)',
                    fontSize: '10px',
                    letterSpacing: '0.05em',
                  }}
                >
                  NEEDS COPY
                </Text>
              )}
            </Flex>
            {subtitle && (
              <Text
                size={1}
                style={{
                  color: '#C9C4BD',
                  letterSpacing: '0.02em',
                }}
              >
                {subtitle}
              </Text>
            )}
          </Stack>

          {description && (
            <Text
              size={1}
              muted
              style={{
                color: 'rgba(250, 248, 244, 0.56)',
                lineHeight: 1.5,
              }}
            >
              {description}
            </Text>
          )}
        </Stack>
      </Flex>
    </Card>
  );
}
```

### Step 2: Commit

```bash
git add sanity/studio/CaseStudyBlockPreview.tsx
git commit -m "feat(studio): preview cards show empty state + NEEDS COPY badge"
```

---

## Task 11: Story Progress Banner on Case Study Documents

**Files:**
- Create: `sanity/studio/StoryProgressBanner.tsx`
- Modify: `sanity.config.ts`

### Step 1: Create the progress banner component

Create `sanity/studio/StoryProgressBanner.tsx`:

```tsx
import React from 'react';
import {Card, Flex, Box, Text} from '@sanity/ui';
import {useFormValue} from 'sanity';

interface Section {
  _type: string;
  _key: string;
  body?: string;
  text?: string;
  title?: string;
  quote?: string;
  headline?: string;
  statValue?: string;
  url?: string;
  frames?: unknown[];
}

const BEAT_CHECKS: Record<string, (s: Section) => boolean> = {
  prologue: (s) => Boolean(s.body?.trim()),
  showcaseSplit: (s) => Boolean(s.title?.trim() || s.body?.trim()),
  showcaseFullBleed: (s) => Boolean(s.title?.trim() || s.body?.trim()),
  showcaseFilmStrip: (s) => Boolean(s.frames && s.frames.length > 0),
  showcaseStat: (s) => Boolean(s.statValue?.trim()),
  videoEmbed: (s) => Boolean(s.url?.trim()),
  deliverables: (s) => Boolean(s.headline?.trim()),
  climax: (s) => Boolean(s.quote?.trim()),
  closer: (s) => Boolean(s.text?.trim()),
};

// Named beats for display
const BEAT_LABELS: Record<string, string> = {
  prologue: 'Prologue',
  showcaseSplit: 'Beat',
  showcaseFullBleed: 'Beat',
  showcaseFilmStrip: 'Reel',
  showcaseStat: 'Stats',
  videoEmbed: 'Video',
  deliverables: 'Deliverables',
  climax: 'Climax',
  closer: 'Closer',
};

export function StoryProgressBanner() {
  const sections = useFormValue(['sections']) as Section[] | undefined;

  if (!sections || sections.length === 0) {
    return (
      <Card padding={3} tone="caution" radius={2} marginBottom={3}>
        <Text size={1} muted>
          No story beats yet. Switch to the Story tab and add some blocks to get started.
        </Text>
      </Card>
    );
  }

  const beats = sections.map((section) => {
    const checker = BEAT_CHECKS[section._type];
    const filled = checker ? checker(section) : false;
    const label = BEAT_LABELS[section._type] || section._type;
    return {label, filled};
  });

  const filledCount = beats.filter((b) => b.filled).length;
  const totalCount = beats.length;

  return (
    <Card
      padding={3}
      radius={2}
      marginBottom={3}
      style={{
        background: 'rgba(250, 248, 244, 0.03)',
        border: '1px solid rgba(250, 248, 244, 0.06)',
      }}
    >
      <Flex align="center" gap={3}>
        <Text size={0} style={{color: 'rgba(250, 248, 244, 0.5)', whiteSpace: 'nowrap', letterSpacing: '0.05em'}}>
          STORY SHAPE
        </Text>
        <Flex gap={1} align="center" wrap="wrap" flex={1}>
          {beats.map((beat, i) => (
            <Flex key={i} align="center" gap={1}>
              <Box
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  background: beat.filled
                    ? 'rgba(200, 60, 47, 0.9)'
                    : 'rgba(250, 248, 244, 0.1)',
                  transition: 'background 0.2s',
                }}
              />
              <Text
                size={0}
                style={{
                  color: beat.filled ? 'rgba(250, 248, 244, 0.7)' : 'rgba(250, 248, 244, 0.25)',
                  fontSize: '10px',
                }}
              >
                {beat.label}
              </Text>
              {i < beats.length - 1 && (
                <Text size={0} style={{color: 'rgba(250, 248, 244, 0.1)', margin: '0 2px'}}>
                  ·
                </Text>
              )}
            </Flex>
          ))}
        </Flex>
        <Text size={0} style={{color: 'rgba(250, 248, 244, 0.4)', whiteSpace: 'nowrap'}}>
          {filledCount}/{totalCount}
        </Text>
      </Flex>
    </Card>
  );
}
```

### Step 2: Register the banner as a document form component

In `sanity.config.ts`, add the banner via `document.components`:

```ts
import {StoryProgressBanner} from './sanity/studio/StoryProgressBanner';

// In defineConfig:
document: {
  components: {
    // Banner at the top of case study documents
    unstable_banner: (props) => {
      if (props.documentType === 'caseStudy') {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(StoryProgressBanner),
          props.renderDefault(props),
        );
      }
      return props.renderDefault(props);
    },
  },
},
```

Note: Import React at the top of `sanity.config.ts`.

### Step 3: Verify the banner

Open any case study in the studio.
Expected: A story progress bar appears at the top showing filled/empty beats.

### Step 4: Commit

```bash
git add sanity/studio/StoryProgressBanner.tsx sanity.config.ts
git commit -m "feat(studio): add story progress banner to case study documents"
```

---

## Task 12: Live Preview Pane (Presentation Tool)

**Files:**
- Create: `app/api/draft/route.ts`
- Create: `app/api/disable-draft/route.ts`
- Modify: `sanity.config.ts`
- Modify: `sanity/structure/index.ts`
- Create: `lib/sanity.ts` (shared client config)

This is the most impactful feature but also the most infrastructure-heavy. It requires:
1. A preview API route to enable Next.js draft mode
2. A Sanity API read token (environment variable)
3. The `presentation` plugin or an iframe preview pane in the structure

### Step 1: Create a shared Sanity client config

Create `lib/sanity.ts`:

```ts
import {createClient} from 'next-sanity';
import {normalizeEnvValue} from './env';

export const projectId = normalizeEnvValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) || 'dkok2iir';
export const dataset = normalizeEnvValue(process.env.NEXT_PUBLIC_SANITY_DATASET) || 'production';
export const apiVersion = '2026-03-02';

export function getClient(preview?: {token: string}) {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !preview,
    perspective: preview ? 'previewDrafts' : 'published',
    stega: {enabled: false},
  });

  if (preview) {
    return client.withConfig({token: preview.token});
  }
  return client;
}
```

### Step 2: Create the draft mode API route

Create `app/api/draft/route.ts`:

```ts
import {draftMode} from 'next/headers';
import {redirect} from 'next/navigation';

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const slug = searchParams.get('slug') || '/';

  (await draftMode()).enable();
  redirect(slug);
}
```

Create `app/api/disable-draft/route.ts`:

```ts
import {draftMode} from 'next/headers';
import {NextResponse} from 'next/server';

export async function GET() {
  (await draftMode()).disable();
  return NextResponse.json({status: 'Draft mode disabled'});
}
```

### Step 3: Add an iframe preview pane to the Case Files structure

This is the simpler approach vs. the full `presentation` plugin — an iframe showing the live site URL for the current document:

In `sanity/structure/index.ts`, add a preview view for case studies:

```ts
import {Iframe} from 'sanity-plugin-iframe-pane'; // Need to install this

// Or use a simpler custom component approach:
```

**Alternative (no extra dependency):** Create `sanity/studio/PreviewPane.tsx`:

```tsx
import React from 'react';
import {useFormValue} from 'sanity';

export function PreviewPane() {
  const slug = useFormValue(['slug', 'current']) as string | undefined;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://protagonistink.com';

  if (!slug) {
    return (
      <div style={{padding: 24, color: 'rgba(250,248,244,0.5)'}}>
        Add a title and generate a slug to see the preview.
      </div>
    );
  }

  return (
    <iframe
      src={`${siteUrl}/work/${slug}`}
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        background: '#131417',
      }}
      title="Case study preview"
    />
  );
}
```

Then update the Case Files structure to use split views:

```ts
// In structure/index.ts, update the case study document views:
import {PreviewPane} from '../studio/PreviewPane';

// Replace documentList for case studies with a custom child that includes views:
S.documentTypeList('caseStudy')
  .title('Drafts')
  .child((documentId) =>
    S.document()
      .documentId(documentId)
      .schemaType('caseStudy')
      .views([
        S.view.form(),
        S.view
          .component(PreviewPane)
          .title('Preview')
          .icon(/* Eye icon */),
      ]),
  ),
```

### Important Note

The live preview showing *draft* content (not just published) requires:
1. A `SANITY_API_READ_TOKEN` environment variable on the Next.js app
2. The data-fetching layer to conditionally use draft perspective when `draftMode()` is enabled
3. This is a larger change to `lib/work.ts`

**Recommendation:** Ship the basic iframe preview first (showing published content). It still gives the writer confidence about "what the page looks like." Draft-aware preview is a fast follow once the token is configured.

### Step 4: Commit

```bash
git add app/api/draft/route.ts app/api/disable-draft/route.ts lib/sanity.ts sanity/studio/PreviewPane.tsx sanity/structure/index.ts
git commit -m "feat(studio): add preview pane for case studies"
```

---

## Task 13: Validation Nudges on Sections Array

**Files:**
- Modify: `sanity/schemaTypes/caseStudy.ts`

### Step 1: Add warning-level validation to the sections field

```ts
defineField({
  name: 'sections',
  title: 'Story Builder',
  type: 'array',
  group: 'story',
  description: 'Build the case file beat by beat. Start with the Prologue, add your story beats, then close it out.',
  validation: (rule) =>
    rule.custom((sections) => {
      if (!sections || sections.length === 0) return true; // Don't nag empty docs
      const types = sections.map((s: {_type: string}) => s._type);
      const warnings: string[] = [];
      if (!types.includes('prologue')) {
        warnings.push('Most case files start with a Prologue');
      }
      if (!types.includes('closer')) {
        warnings.push('A Closer gives the story a landing');
      }
      if (warnings.length > 0) {
        return {message: warnings.join('. ') + '.', level: 'warning'} as unknown as string;
      }
      return true;
    }),
  of: [/* ... unchanged */],
}),
```

### Step 2: Commit

```bash
git add sanity/schemaTypes/caseStudy.ts
git commit -m "feat(studio): add gentle validation nudges for story completeness"
```

---

## Execution Order

Tasks are listed in implementation order. Tasks 1-8 are pure studio/schema work with no Next.js rendering changes. Task 9 touches the rendering pipeline. Tasks 10-11 are studio polish. Task 12 is infrastructure. Task 13 is a quick add.

**Recommended checkpoints:**
- After Task 3: Deploy and have the writer try creating a case study. Get feedback before continuing.
- After Task 8: Second feedback round — the full "first session" experience should feel different.
- After Task 11: The progress banner is the emotional payoff. Check if it resonates.
- Task 12: Ship separately once the preview token is configured.
