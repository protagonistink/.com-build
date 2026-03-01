import type { BlogPost } from '@/types/blog';

export const BLOG_CATEGORIES = [
  'Narrative Architecture',
  'Founder Psychology',
  'AI & Human Craft',
  'Field Notes',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Architecture of a Narrative',
    slug: 'architecture-of-narrative',
    publishedAt: '2026-02-28',
    excerpt:
      'How structural engineering principles apply to storytelling in the modern digital age.',
    category: 'Narrative Architecture',
    mainImage: 'https://picsum.photos/seed/architecture/1920/1080',
  },
  {
    id: '2',
    title: 'Shadows in the System',
    slug: 'shadows-in-the-system',
    publishedAt: '2026-02-15',
    excerpt:
      'Identifying the unseen forces that shape user behavior and brand perception.',
    category: 'Founder Psychology',
    mainImage: null,
  },
  {
    id: '3',
    title: 'Precision Over Persuasion',
    slug: 'precision-over-persuasion',
    publishedAt: '2026-01-30',
    excerpt:
      'Why the era of marketing fluff is dead, and exactitude is the new currency.',
    category: 'AI & Human Craft',
    mainImage: 'https://picsum.photos/seed/noir2/1600/900',
  },
  {
    id: '4',
    title: 'The Geometry of Trust',
    slug: 'geometry-of-trust',
    publishedAt: '2026-01-12',
    excerpt:
      'Mapping the coordinates where brand promises meet consumer reality.',
    category: 'Narrative Architecture',
    mainImage: null,
  },
  {
    id: '5',
    title: 'Echoes in the Void',
    slug: 'echoes-in-the-void',
    publishedAt: '2025-12-05',
    excerpt:
      'When a brand speaks but no one listens: diagnosing the silent disconnect.',
    category: 'Founder Psychology',
    mainImage: 'https://picsum.photos/seed/noir5/1400/900',
  },
  {
    id: '6',
    title: 'Calculated Risks',
    slug: 'calculated-risks',
    publishedAt: '2025-11-20',
    excerpt: 'A mathematical approach to creative leaps and brand evolution.',
    category: 'Field Notes',
    mainImage: 'https://picsum.photos/seed/noir3/1200/800',
  },
];
