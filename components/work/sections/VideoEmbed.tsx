import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';
import type { VideoEmbedSection } from '@/types/work';

export function getEmbedUrl(url: string): string | null {
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) {
    const params = new URLSearchParams({
      dnt: '1',
      title: '0',
      byline: '0',
      portrait: '0',
      badge: '0',
      vimeo_logo: '0',
      watch_full_video: '0',
    });

    return `https://player.vimeo.com/video/${vimeoMatch[1]}?${params.toString()}`;
  }

  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  if (ytMatch) return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;

  return null;
}

export default function VideoEmbed({ section }: { section: VideoEmbedSection }) {
  const embedUrl = getEmbedUrl(section.url);
  if (!embedUrl) return null;

  const aspectRatio = section.aspectRatio || '16/9';

  return (
    <section className="bg-trueblack py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <ScrollRevealWrapper direction="up">
          <div
            className="relative w-full overflow-hidden bg-white/[0.02] border border-white/10"
            style={{ aspectRatio }}
          >
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={section.caption || 'Video'}
            />
          </div>
          {section.caption && (
            <p className="mt-4 text-[11px] font-mono tracking-widest text-white/25 uppercase text-center">
              {section.caption}
            </p>
          )}
        </ScrollRevealWrapper>
      </div>
    </section>
  );
}
