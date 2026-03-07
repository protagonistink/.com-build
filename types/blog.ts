import type { ReactNode } from 'react';

export interface PortableTextSpan {
  _type: 'span';
  text: string;
}

export interface PortableTextBlock {
  _type: 'block';
  style?: string;
  children?: PortableTextSpan[];
}

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
  readTime: string;
  body?: ReactNode;
  sanityBody?: PortableTextBlock[];
  faqItems?: FaqItem[];
}
