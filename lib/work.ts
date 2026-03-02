import { createClient } from 'next-sanity';
import { PROJECTS } from '@/data/work-projects';
import { normalizeEnvValue } from '@/lib/env';
import type { Project } from '@/types/work';

const DEFAULT_SANITY_PROJECT_ID = 'dkok2iir';
const DEFAULT_SANITY_DATASET = 'production';

interface PortableTextSpan {
  _type: 'span';
  text?: string;
}

interface PortableTextBlock {
  _type: 'block';
  children?: PortableTextSpan[];
}

interface CmsCaseStudy {
  _id: string;
  title?: string;
  slug?: { current?: string };
  clientName?: string;
  publishedAt?: string;
  summary?: string;
  status?: string;
  challenge?: PortableTextBlock[];
  approach?: PortableTextBlock[];
  outcome?: PortableTextBlock[];
  fullStory?: PortableTextBlock[];
  ctaVariant?: string;
  industry?: string;
  businessCategory?: string;
  campaignCategory?: string;
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

function toText(blocks?: PortableTextBlock[]) {
  if (!Array.isArray(blocks)) return '';
  return blocks
    .filter((block) => block?._type === 'block')
    .map((block) => (block.children || []).map((child) => child.text || '').join(''))
    .map((text) => text.trim())
    .filter(Boolean)
    .join(' ');
}

function toFirstSentence(value: string) {
  if (!value) return '';
  const [sentence] = value.split(/(?<=[.!?])\s+/);
  return sentence?.trim() || value.trim();
}

function toYear(value?: string) {
  if (!value) return String(new Date().getUTCFullYear());
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(new Date().getUTCFullYear());
  return String(date.getUTCFullYear());
}

function mapCmsCaseStudy(item: CmsCaseStudy, index: number): Project | null {
  const title = item.title?.trim();
  const slug = item.slug?.current?.trim();
  if (!title || !slug) return null;

  const summary = (item.summary || '').trim();
  const challengeText = toText(item.challenge);
  const approachText = toText(item.approach);
  const outcomeText = toText(item.outcome);
  const storyText = toText(item.fullStory);
  const image = item.heroImageUrl || item.ogImageUrl || '/images/work/scene-01.png';
  const fallbackDescription = summary || storyText || challengeText || approachText || outcomeText;
  const fallbackProblem = challengeText || summary || storyText || 'Narrative alignment challenge.';
  const fallbackApproach =
    approachText || storyText || 'Narrative architecture and messaging system design.';
  const campaignTitle = title;
  const businessCategory = (
    item.businessCategory ||
    item.industry ||
    'Brand & Culture'
  ).trim();
  const campaignCategory = (
    item.campaignCategory ||
    item.ctaVariant ||
    'Brand Strategy'
  ).trim();

  return {
    id: index + 1,
    slug,
    scene: `SCENE ${String(index + 1).padStart(2, '0')}`,
    ref: `CASE-${String(index + 1).padStart(2, '0')}`,
    title: campaignTitle,
    tagline: toFirstSentence(summary || approachText || challengeText || title),
    client: (item.clientName || 'Client').trim(),
    campaignTitle,
    businessCategory,
    campaignCategory,
    category: campaignCategory,
    description: item.seoDescription || fallbackDescription || title,
    year: toYear(item.publishedAt),
    image,
    imageLabel: 'Case Study',
    imageDescription: item.heroImageAlt || title,
    tensionStatement: toFirstSentence(challengeText || summary || title),
    sector: businessCategory,
    situation: summary || storyText || fallbackProblem,
    problem: fallbackProblem,
    engagementSummary: fallbackApproach,
    before: toFirstSentence(challengeText || summary || title),
    after: toFirstSentence(outcomeText || approachText || summary || title),
    galleryImages: [
      {
        src: image,
        label: `FIG. 01 // ${String(index + 1).padStart(3, '0')}`,
        description: title,
      },
    ],
  };
}

async function getCmsCaseStudies(): Promise<Project[]> {
  const client = getSanityClient();

  try {
    const records = await client.fetch<CmsCaseStudy[]>(
      `*[_type == "caseStudy" && defined(slug.current) && coalesce(status, "published") == "published"]
      | order(coalesce(publishedAt, _updatedAt) desc) {
        _id,
        title,
        slug,
        clientName,
        publishedAt,
        summary,
        status,
        challenge,
        approach,
        outcome,
        fullStory,
        ctaVariant,
        industry,
        businessCategory,
        campaignCategory,
        seoDescription,
        "heroImageUrl": heroImage.asset->url,
        "heroImageAlt": heroImage.alt,
        "ogImageUrl": ogImage.asset->url
      }`
    );

    return records
      .map(mapCmsCaseStudy)
      .filter((item): item is Project => Boolean(item));
  } catch {
    return [];
  }
}

export async function getWorkProjects(): Promise<Project[]> {
  const cmsProjects = await getCmsCaseStudies();
  return cmsProjects.length > 0 ? cmsProjects : PROJECTS;
}

export async function getWorkProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getWorkProjects();
  return projects.find((project) => project.slug === slug);
}
