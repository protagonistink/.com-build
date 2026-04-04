import type { ReactNode } from 'react';
import type { PortableTextBlock } from '@/types/portableText';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  featured?: boolean;
  excerpt: string;
  category: string;
  mainImage: string | null;
  mainImageAlt?: string;
  openGraphImage?: string | null;
  openGraphImageAlt?: string;
  readTime: string;
  body?: ReactNode;
  sanityBody?: PortableTextBlock[];
  faqItems?: FaqItem[];
}
