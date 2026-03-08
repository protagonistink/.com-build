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
  artifacts?: Array<{ label?: string; description?: string; alt?: string; assetUrl?: string }>;
  executionSurfaces?: Array<{ surface?: string; description?: string; imageUrl?: string; imageAlt?: string }>;
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
