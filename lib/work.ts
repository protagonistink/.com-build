import {createClient, defineQuery} from 'next-sanity';
import {PROJECTS} from '@/data/work-projects';
import {normalizeEnvValue} from '@/lib/env';
import type {
  CaseStudy,
  CaseStudySection,
  CaseStudySourceSection,
  ClimaxSection,
  CloserSection,
  DeliverablesSection,
  FlatShowcaseSection,
  PrologueSection,
  ShowcaseBlock,
  ShowcaseDetail,
  ShowcaseFrame,
  ShowcaseSection,
  ShowcaseSurface,
  VideoEmbedSection,
} from '@/types/work';

const DEFAULT_SANITY_PROJECT_ID = 'dkok2iir';
const DEFAULT_SANITY_DATASET = 'production';

interface CmsShowcaseBlock {
  _key: string;
  itemLabel?: string;
  layout?: string;
  imagePosition?: string;
  title?: string;
  body?: string;
  tagline?: string;
  imageUrl?: string;
  imageAlt?: string;
  statValue?: string;
  statLabel?: string;
  frames?: Array<{_key: string; alt?: string; label?: string; caption?: string; assetUrl?: string}>;
  details?: Array<{_key: string; label?: string; value?: string}>;
}

interface CmsSection {
  _type: string;
  _key: string;
  body?: string;
  objectiveLabel?: string;
  objectiveValue?: string;
  focusLabel?: string;
  focusValue?: string;
  label?: string;
  actLabel?: string;
  surface?: string;
  eyebrow?: string;
  imagePosition?: string;
  title?: string;
  tagline?: string;
  imageUrl?: string;
  imageAlt?: string;
  statValue?: string;
  statLabel?: string;
  items?: CmsShowcaseBlock[];
  frames?: Array<{_key: string; alt?: string; label?: string; caption?: string; assetUrl?: string}>;
  details?: Array<{_key: string; label?: string; value?: string}>;
  quote?: string;
  backgroundImageUrl?: string;
  backgroundImageAlt?: string;
  metrics?: Array<{_key: string; value?: string; label?: string}>;
  url?: string;
  caption?: string;
  aspectRatio?: string;
  headline?: string;
  subheadline?: string;
  deliverableItems?: Array<{_key: string; number?: string; title?: string; description?: string}>;
  ctaLabel?: string;
  ctaLink?: string;
  text?: string;
}

interface CmsCaseStudy {
  _id: string;
  title?: string;
  subtitle?: string;
  slug?: {current?: string};
  clientName?: string;
  sector?: string;
  engagementType?: string;
  publishedAt?: string;
  status?: string;
  caseNumber?: string;
  timeline?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  ogImageUrl?: string;
  seoDescription?: string;
  sections?: CmsSection[];
}

function getSanityClient() {
  const projectId =
    normalizeEnvValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) || DEFAULT_SANITY_PROJECT_ID;
  const dataset =
    normalizeEnvValue(process.env.NEXT_PUBLIC_SANITY_DATASET) || DEFAULT_SANITY_DATASET;

  return createClient({projectId, dataset, apiVersion: '2026-03-02', useCdn: false});
}

function toYear(value?: string) {
  if (!value) return String(new Date().getUTCFullYear());
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(new Date().getUTCFullYear());
  return String(date.getUTCFullYear());
}

function yearFromTimeline(value?: string) {
  const match = value?.match(/\b(19|20)\d{2}\b/);
  return match?.[0];
}

function normalizeSurface(surface?: string): ShowcaseSurface {
  return surface === 'light' ? 'light' : 'dark';
}

function mapFrames(
  frames?: Array<{_key: string; alt?: string; label?: string; caption?: string; assetUrl?: string}>,
): ShowcaseFrame[] | undefined {
  const nextFrames = frames
    ?.filter((frame) => frame.assetUrl)
    .map((frame) => ({
      _key: frame._key,
      src: frame.assetUrl!,
      alt: frame.alt || undefined,
      label: frame.label || undefined,
      caption: frame.caption || undefined,
    }));

  return nextFrames && nextFrames.length > 0 ? nextFrames : undefined;
}

function mapDetails(details?: Array<{_key: string; label?: string; value?: string}>): ShowcaseDetail[] | undefined {
  const nextDetails = details
    ?.filter((detail) => detail.label?.trim())
    .map((detail) => ({
      _key: detail._key,
      label: detail.label!.trim(),
      value: (detail.value || '').trim(),
    }));

  return nextDetails && nextDetails.length > 0 ? nextDetails : undefined;
}

function mapLegacyShowcaseBlock(block: CmsShowcaseBlock): ShowcaseBlock {
  return {
    _key: block._key,
    layout: (block.layout as ShowcaseBlock['layout']) || 'split',
    imagePosition: (block.imagePosition as 'left' | 'right') || undefined,
    eyebrow: block.itemLabel?.trim() || undefined,
    itemLabel: block.itemLabel?.trim() || undefined,
    title: block.title?.trim() || undefined,
    body: block.body?.trim() || undefined,
    tagline: block.tagline?.trim() || undefined,
    image: block.imageUrl ? {src: block.imageUrl, alt: block.imageAlt || undefined} : undefined,
    statValue: block.statValue?.trim() || undefined,
    statLabel: block.statLabel?.trim() || undefined,
    frames: mapFrames(block.frames),
    details: mapDetails(block.details),
  };
}

function mapFlatSectionToShowcaseBlock(section: FlatShowcaseSection): ShowcaseBlock {
  switch (section._type) {
    case 'showcaseSplit':
      return {
        _key: section._key,
        layout: 'split',
        imagePosition: section.imagePosition,
        eyebrow: section.eyebrow,
        title: section.title,
        tagline: section.tagline,
        body: section.body,
        image: section.image,
        details: section.details,
      };
    case 'showcaseFullBleed':
      return {
        _key: section._key,
        layout: 'fullBleed',
        eyebrow: section.eyebrow,
        title: section.title,
        body: section.body,
        image: section.image,
      };
    case 'showcaseFilmStrip':
      return {
        _key: section._key,
        layout: 'filmStrip',
        eyebrow: section.eyebrow,
        title: section.title,
        body: section.body,
        frames: section.frames,
      };
    case 'showcaseStat':
      return {
        _key: section._key,
        layout: 'stat',
        eyebrow: section.eyebrow,
        title: section.title,
        body: section.body,
        statValue: section.statValue,
        statLabel: section.statLabel,
        details: section.details,
      };
  }
}

function isFlatShowcaseSection(section: CaseStudySourceSection): section is FlatShowcaseSection {
  return (
    section._type === 'showcaseSplit' ||
    section._type === 'showcaseFullBleed' ||
    section._type === 'showcaseFilmStrip' ||
    section._type === 'showcaseStat'
  );
}

function normalizeCaseStudySections(sections: CaseStudySourceSection[]): CaseStudySection[] {
  const normalized: CaseStudySection[] = [];
  let currentShowcase: ShowcaseSection | null = null;

  const flushShowcase = () => {
    if (currentShowcase && currentShowcase.items && currentShowcase.items.length > 0) {
      normalized.push(currentShowcase);
    }
    currentShowcase = null;
  };

  for (const section of sections) {
    if (section._type === 'showcase') {
      flushShowcase();
      normalized.push(section);
      continue;
    }

    if (isFlatShowcaseSection(section)) {
      const label = section.actLabel?.trim() || undefined;
      const surface = normalizeSurface(section.surface);

      if (
        !currentShowcase ||
        currentShowcase.label !== label ||
        normalizeSurface(currentShowcase.surface) !== surface
      ) {
        flushShowcase();
        currentShowcase = {
          _type: 'showcase',
          _key: `group-${section._key}`,
          label,
          surface,
          items: [],
        };
      }

      currentShowcase.items!.push(mapFlatSectionToShowcaseBlock(section));
      continue;
    }

    flushShowcase();
    normalized.push(section);
  }

  flushShowcase();
  return normalized;
}

function mapCmsSection(section: CmsSection): CaseStudySourceSection | null {
  switch (section._type) {
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
        prologueDetails = legacy.length > 0 ? (legacy as ShowcaseDetail[]) : undefined;
      }
      return {
        _type: 'prologue',
        _key: section._key,
        body: section.body?.trim() || undefined,
        details: prologueDetails,
      } satisfies PrologueSection;
    }

    case 'showcase':
      return {
        _type: 'showcase',
        _key: section._key,
        label: section.label?.trim() || undefined,
        surface: normalizeSurface(section.surface),
        items: section.items?.map(mapLegacyShowcaseBlock),
      } satisfies ShowcaseSection;

    case 'showcaseSplit':
      return {
        _type: 'showcaseSplit',
        _key: section._key,
        actLabel: section.actLabel?.trim() || undefined,
        surface: normalizeSurface(section.surface),
        eyebrow: section.eyebrow?.trim() || undefined,
        imagePosition: (section.imagePosition as 'left' | 'right') || undefined,
        title: section.title?.trim() || undefined,
        tagline: section.tagline?.trim() || undefined,
        body: section.body?.trim() || undefined,
        image: section.imageUrl ? {src: section.imageUrl, alt: section.imageAlt || undefined} : undefined,
        details: mapDetails(section.details),
      };

    case 'showcaseFullBleed':
      return {
        _type: 'showcaseFullBleed',
        _key: section._key,
        actLabel: section.actLabel?.trim() || undefined,
        surface: normalizeSurface(section.surface),
        eyebrow: section.eyebrow?.trim() || undefined,
        title: section.title?.trim() || undefined,
        body: section.body?.trim() || undefined,
        image: section.imageUrl ? {src: section.imageUrl, alt: section.imageAlt || undefined} : undefined,
      };

    case 'showcaseFilmStrip':
      return {
        _type: 'showcaseFilmStrip',
        _key: section._key,
        actLabel: section.actLabel?.trim() || undefined,
        surface: normalizeSurface(section.surface),
        eyebrow: section.eyebrow?.trim() || undefined,
        title: section.title?.trim() || undefined,
        body: section.body?.trim() || undefined,
        frames: mapFrames(section.frames),
      };

    case 'showcaseStat':
      return {
        _type: 'showcaseStat',
        _key: section._key,
        actLabel: section.actLabel?.trim() || undefined,
        surface: normalizeSurface(section.surface),
        eyebrow: section.eyebrow?.trim() || undefined,
        title: section.title?.trim() || undefined,
        body: section.body?.trim() || undefined,
        statValue: section.statValue?.trim() || undefined,
        statLabel: section.statLabel?.trim() || undefined,
        details: mapDetails(section.details),
      };

    case 'climax':
      return {
        _type: 'climax',
        _key: section._key,
        label: section.label?.trim() || undefined,
        quote: section.quote?.trim() || undefined,
        backgroundImage: section.backgroundImageUrl
          ? {src: section.backgroundImageUrl, alt: section.backgroundImageAlt || undefined}
          : undefined,
        metrics: section.metrics
          ?.filter((metric) => metric.value?.trim())
          .map((metric) => ({
            _key: metric._key,
            value: metric.value!.trim(),
            label: (metric.label || '').trim(),
          })),
      } satisfies ClimaxSection;

    case 'videoEmbed':
      if (!section.url) return null;
      return {
        _type: 'videoEmbed',
        _key: section._key,
        url: section.url,
        caption: section.caption?.trim() || undefined,
        aspectRatio: section.aspectRatio || '16/9',
      } satisfies VideoEmbedSection;

    case 'deliverables':
      return {
        _type: 'deliverables',
        _key: section._key,
        headline: section.headline?.trim() || undefined,
        subheadline: section.subheadline?.trim() || undefined,
        items: (section.deliverableItems || []).map((item) => ({
          _key: item._key,
          number: item.number?.trim() || undefined,
          title: item.title?.trim() || undefined,
          description: item.description?.trim() || undefined,
        })),
        ctaLabel: section.ctaLabel?.trim() || undefined,
        ctaLink: section.ctaLink?.trim() || undefined,
      } satisfies DeliverablesSection;

    case 'closer':
      if (!section.text?.trim()) return null;
      return {
        _type: 'closer',
        _key: section._key,
        text: section.text.trim(),
      } satisfies CloserSection;

    default:
      return null;
  }
}

function mapCmsCaseStudy(item: CmsCaseStudy, index: number): CaseStudy | null {
  const title = item.title?.trim();
  const slug = item.slug?.current?.trim();
  if (!title || !slug) return null;

  const fallbackProject = PROJECTS.find((project) => project.slug === slug);
  const image =
    item.heroImageUrl ||
    item.ogImageUrl ||
    fallbackProject?.image ||
    '/images/work/scene-01.png';
  const year = yearFromTimeline(item.timeline) || toYear(item.publishedAt);
  const sourceSections = (item.sections || [])
    .map(mapCmsSection)
    .filter((section): section is CaseStudySourceSection => section !== null);

  return {
    id: index + 1,
    slug,
    scene: fallbackProject?.scene || `SCENE ${String(index + 1).padStart(2, '0')}`,
    ref: fallbackProject?.ref || `CASE-${String(index + 1).padStart(2, '0')}`,
    title,
    subtitle: item.subtitle?.trim() || undefined,
    client: (item.clientName || fallbackProject?.client || 'Client').trim(),
    sector: item.sector?.trim() || fallbackProject?.sector || undefined,
    engagementType: item.engagementType?.trim() || fallbackProject?.engagementType || undefined,
    year,
    image,
    imageAlt: item.heroImageAlt || fallbackProject?.imageAlt || title,
    caseNumber: item.caseNumber?.trim() || fallbackProject?.caseNumber || undefined,
    timeline: item.timeline?.trim() || fallbackProject?.timeline || undefined,
    sections: normalizeCaseStudySections(sourceSections),
    description: item.seoDescription || fallbackProject?.description || title,
    category: item.engagementType || item.sector || fallbackProject?.category || 'Brand Strategy',
    tagline: item.subtitle || fallbackProject?.tagline || title,
  };
}

const CASE_STUDY_QUERY = defineQuery(/* groq */ `
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
    caseNumber,
    timeline,
    seoDescription,
    "heroImageUrl": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    "ogImageUrl": ogImage.asset->url,
    sections[] {
      _type,
      _key,
      body,
      objectiveLabel,
      objectiveValue,
      focusLabel,
      focusValue,
      label,
      actLabel,
      surface,
      eyebrow,
      imagePosition,
      title,
      tagline,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      statValue,
      statLabel,
      "frames": frames[] {
        _key,
        alt,
        label,
        caption,
        "assetUrl": asset->url
      },
      details[] {
        _key,
        label,
        value
      },
      "items": items[] {
        _key,
        itemLabel,
        layout,
        imagePosition,
        title,
        body,
        tagline,
        "imageUrl": image.asset->url,
        "imageAlt": image.alt,
        statValue,
        statLabel,
        "frames": frames[] {
          _key,
          alt,
          label,
          caption,
          "assetUrl": asset->url
        },
        details[] {
          _key,
          label,
          value
        }
      },
      quote,
      "backgroundImageUrl": backgroundImage.asset->url,
      "backgroundImageAlt": backgroundImage.alt,
      "metrics": metrics[] {
        _key,
        value,
        label
      },
      url,
      caption,
      aspectRatio,
      headline,
      subheadline,
      "deliverableItems": items[] {
        _key,
        number,
        title,
        description
      },
      ctaLabel,
      ctaLink,
      text
    }
  }
`);

async function getCmsCaseStudies(): Promise<CaseStudy[]> {
  const client = getSanityClient();
  try {
    const records = await client.fetch<CmsCaseStudy[]>(CASE_STUDY_QUERY);
    return records.map(mapCmsCaseStudy).filter((item): item is CaseStudy => Boolean(item));
  } catch {
    return [];
  }
}

export async function getWorkProjects(): Promise<CaseStudy[]> {
  const cmsProjects = await getCmsCaseStudies();
  if (cmsProjects.length === 0) return PROJECTS;

  const cmsSlugs = new Set(cmsProjects.map((project) => project.slug));
  const extras = PROJECTS.filter((project) => !cmsSlugs.has(project.slug));
  return [...cmsProjects, ...extras.map((project, index) => ({...project, id: cmsProjects.length + index + 1}))];
}

export async function getWorkProjectBySlug(slug: string): Promise<CaseStudy | undefined> {
  const projects = await getWorkProjects();
  return projects.find((project) => project.slug === slug);
}
