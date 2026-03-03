/* eslint-disable @next/next/no-page-custom-font */
import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Protagonist Ink Brand Guide',
  robots: {
    index: false,
    follow: false,
  },
};

type GuideParts = {
  style: string;
  body: string;
};

async function readGuideParts(): Promise<GuideParts> {
  const filePath = path.join(process.cwd(), 'public/brand-guide/protagonist-ink-style-guide.html');
  const html = await fs.readFile(filePath, 'utf8');

  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/i);
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  return {
    style: styleMatch?.[1] ?? '',
    body: bodyMatch?.[1] ?? '',
  };
}

export default async function BrandGuidePage() {
  const { style, body } = await readGuideParts();

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#2C2C2C]">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Satoshi:wght@300;400;500;700&display=swap"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </main>
  );
}
