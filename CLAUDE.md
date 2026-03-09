# CLAUDE.md — Protagonist Ink (.com-build)

## Project Overview

Protagonist Ink is a story strategy and narrative consulting agency website built with **Next.js 16** (App Router), **React 19**, **Sanity CMS**, and **Tailwind CSS 4**. The site is deployed on **Vercel** and uses a cinematic/editorial design language throughout.

**Live URL:** https://www.protagonist.ink

## Tech Stack

- **Framework:** Next.js 16.1 (App Router, React 19)
- **CMS:** Sanity v5 (embedded Studio at `/studio`)
- **Styling:** Tailwind CSS 4 via `@tailwindcss/postcss`, plus global CSS custom properties
- **Animation:** Motion (Framer Motion v12), scroll-driven CSS reveals
- **Icons:** Lucide React
- **Analytics:** Vercel Analytics + Speed Insights
- **Deployment:** Vercel
- **Language:** TypeScript (strict mode)

## Commands

```bash
npm run dev      # Start dev server (next dev)
npm run build    # Production build (next build)
npm run start    # Start production server (next start)
npm run lint     # ESLint (eslint-config-next/core-web-vitals + typescript)
```

There are no test scripts configured. No CI/CD workflows exist — deploys happen via Vercel's Git integration.

## Project Structure

```
app/                    # Next.js App Router pages
  page.tsx              # Homepage (5-section editorial scroll)
  layout.tsx            # Root layout — fonts, Navbar, Footer, ScrollReveal
  globals.css           # Design system: colors, fonts, textures, animations
  blog/                 # Blog listing + [slug] detail pages
  about/                # About page (cinematic "acts" structure)
  work/                 # Portfolio — listing + [slug] case studies
  story-teardown/       # Lead capture form ("Story Loom")
  brand-guide/          # Brand style guide viewer
  figma-library/        # Figma design tokens page
  instagram-stories/    # Instagram story templates
  api/loom-submit/      # POST endpoint — form submissions → Asana + Notion + Make.com

components/             # React components
  Navbar.tsx            # Site navigation
  Footer.tsx            # Site footer
  ScrollReveal.tsx      # IntersectionObserver scroll animation controller
  TypewriterHeadline.tsx
  WorkRow.tsx
  home/                 # Homepage section components (Hero, Services, etc.)
  blog/                 # Blog list + detail components
    detail/             # Article detail: Prose, PostCredits, MoreInk, FAQ, etc.
  about/                # About page "Act" components (cinematic structure)
  brand-guide/          # Brand guide components

lib/                    # Shared utilities
  blog.ts               # Sanity client + GROQ queries for blog posts
  work.ts               # Work/portfolio data helpers
  env.ts                # Environment variable normalization

sanity/                 # Sanity CMS configuration
  schemaTypes/          # Content schemas: post, category, caseStudy

types/                  # TypeScript type definitions
  blog.ts               # BlogPost, PortableTextBlock, FaqItem
  work.ts               # Project, GalleryImage

data/                   # Static data files
  blog-posts.tsx        # (legacy — CMS is primary source)
  brandGuide.ts         # Brand guide data
  work-projects.ts      # Portfolio case study data

public/                 # Static assets
  images/brand/         # Logo variants (wordmark, symbol, favicon)
  images/about/         # Team photos
  images/work/          # Case study images
  logos/                # Client logos
  photos/               # Team headshots
  posters/              # Service poster graphics
```

## Design System & Conventions

### Fonts

The site uses a multi-font editorial system defined in `globals.css`:

| Token            | Font                    | Usage                          |
|------------------|-------------------------|--------------------------------|
| `--font-sans`    | Satoshi (Fontshare)     | Body, UI, technical labels     |
| `--font-display` | Cormorant Garamond      | Headlines, editorial display   |
| `--font-hand`    | Reenie Beanie           | Handwritten annotations        |
| `--font-hand-bold` | Nothing You Could Do | Bold handwriting accents       |
| `--font-permanent-marker` | Permanent Marker | Display accents          |

### Brand Colors

Defined as Tailwind theme tokens in `globals.css` under `@theme inline`:

| Token        | Hex       | Usage                                    |
|--------------|-----------|------------------------------------------|
| `ink`        | `#2C2C2C` | Primary background, deep charcoal        |
| `warmwhite`  | `#FAFAFA` | Foreground text, editorial breathing room |
| `rust`       | `#C83C2F` | CTAs, hover states, editorial punctuation |
| `indigo`     | `#2E2B5F` | Secondary accent (use sparingly)         |
| `coolgray`   | `#9B9EA4` | Captions, secondary text                 |
| `trueblack`  | `#0a0a0a` | Maximum depth (Screening Room)           |

### CSS Utilities

- `.texture-grain` — Film-grain overlay for dark sections
- `.texture-paper` — Paper texture for light sections
- `.crop-marks` / `.crop-marks-lg` — Editorial crop marks
- `.reveal` — Scroll-triggered fade-up animation (via `ScrollReveal` component)
- `.reveal-left` — Slide-from-left variant
- `.font-hand` / `.font-hand-bold` — Handwriting font classes
- `.tape-strip` — Masking tape visual effect
- `.text-technical` / `.text-narrative` — Typography utility classes
- `.drop-cap` — Drop cap for opening paragraphs

### Animation

- Scroll reveals use `IntersectionObserver` in `ScrollReveal.tsx` — elements get `.revealed` class
- The `reveal-enabled` class on `<body>` prevents flash of unstyled content
- Motion (Framer Motion) is used for interactive animations
- `prefers-reduced-motion: reduce` is fully respected

## Data Flow

### Blog Posts

Blog content is managed in **Sanity CMS**. The data flow is:

1. Content edited in Sanity Studio (at `/studio`)
2. `lib/blog.ts` creates a Sanity client and fetches posts via GROQ queries
3. Posts are mapped from CMS shape (`CmsPost`) to app shape (`BlogPost`)
4. Rich text body is rendered via `SanityPortableText.tsx` using `@portabletext/react`

### Story Loom (Lead Capture)

The `/story-teardown` page contains a multi-step form. Submissions hit `POST /api/loom-submit` which:

1. Validates input (rate limiting, honeypot, timing check, optional Turnstile CAPTCHA)
2. Creates task in **Asana** (primary destination)
3. Creates page in **Notion** (optional fan-out)
4. Fires webhook to **Make.com** (optional, non-blocking)

### Work/Portfolio

Case study data lives in `data/work-projects.ts` (static) with Sanity schema (`caseStudy.ts`) available for future CMS migration.

## Environment Variables

See `.env.example` for the full list. Key variables:

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes* | Sanity project ID (defaults to `dkok2iir`) |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes* | Sanity dataset (defaults to `production`) |
| `ASANA_ACCESS_TOKEN` | Yes | Asana API token for Story Loom submissions |
| `ASANA_PROJECT_ID` | Yes | Target Asana project GID |
| `NOTION_TOKEN` | No | Optional Notion integration token |
| `NOTION_DATABASE_ID` | No | Optional Notion database for fan-out |
| `MAKE_LOOM_WEBHOOK_URL` | No | Optional Make.com webhook |
| `TURNSTILE_SECRET_KEY` | No | Cloudflare Turnstile bot protection |

*Sanity vars have hardcoded defaults so the site builds without them.

## Path Aliases

TypeScript path alias `@/*` maps to the project root (configured in `tsconfig.json`). Always use `@/` imports:

```ts
import { getBlogPosts } from '@/lib/blog';
import type { BlogPost } from '@/types/blog';
```

## Key Conventions

1. **App Router only** — All routes use the Next.js App Router (`app/` directory). No Pages Router.
2. **Server Components by default** — Only add `'use client'` when the component needs interactivity, browser APIs, or hooks.
3. **Tailwind + CSS custom properties** — Use Tailwind utility classes with the brand tokens. Complex animations and textures are in `globals.css`.
4. **Editorial naming** — Components follow a cinematic/editorial metaphor: "Acts" (about page sections), "Screening Room", "PostCredits", "Prose", etc.
5. **No test suite** — There are no unit or integration tests currently.
6. **ESLint** — Uses `eslint-config-next` with core-web-vitals and TypeScript rules. Run `npm run lint` before committing.
7. **Image sources** — Remote images from `cdn.sanity.io`, `images.unsplash.com`, and `picsum.photos` are allowed in `next.config.ts`.
8. **Redirects** — `/journal` → `/blog`, `/story-health-check` → `/story-teardown`, `/contact` → `/#story-teardown` (configured in `next.config.ts`).

## Working with Sanity

- Studio is embedded at `/studio` (configured in `sanity.config.ts`)
- Schema types: `post`, `category`, `caseStudy` (in `sanity/schemaTypes/`)
- Plugins: Structure Tool, Vision, Media, Unsplash, AI Assist
- GROQ queries live in `lib/blog.ts`
- Sanity CLI config is in `sanity.cli.ts`

## Accessibility

- Focus-visible ring (`2px solid rust`, `3px offset`) on all interactive elements
- `prefers-reduced-motion` media query disables animations
- Semantic HTML structure throughout
