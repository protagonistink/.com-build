import type { ReactNode } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  category: string;
  mainImage: string | null;
  readTime: string;
  body?: ReactNode;
}
