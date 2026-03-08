import type { ReactNode } from 'react';

export interface PortableTextMarkDef {
  _key: string;
  _type: string;
  href?: string;
}

export interface PortableTextSpan {
  _type: 'span';
  _key?: string;
  text: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _type: string;
  _key?: string;
  style?: string;
  children?: PortableTextSpan[];
  listItem?: 'bullet' | 'number';
  level?: number;
  markDefs?: PortableTextMarkDef[];
  alt?: string;
  caption?: string;
  asset?: {
    _ref?: string;
    _type?: string;
  };
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
  openGraphImage?: string | null;
  openGraphImageAlt?: string;
  readTime: string;
  body?: ReactNode;
  sanityBody?: PortableTextBlock[];
  faqItems?: FaqItem[];
}
