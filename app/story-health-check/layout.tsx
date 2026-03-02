import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Story Health Check',
  description:
    'Is your brand narrative working as hard as you are? The Story Health Check diagnoses what is missing, what is muddled, and what to fix first — so every word earns its place.',
};

export default function StoryHealthCheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
