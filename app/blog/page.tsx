import { notFound } from 'next/navigation';

export const metadata = {
  title: 'The Ink — Protagonist Ink',
  description:
    'Frameworks, analyses, and architectural blueprints for brands that refuse to be ignored. Strictly signal. Zero noise.',
};

export default function BlogPage() {
  notFound();
}
