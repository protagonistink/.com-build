import Image from 'next/image';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';

interface FullBleedImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export default function FullBleedImage({ src, alt, caption }: FullBleedImageProps) {
  return (
    <ScrollRevealWrapper>
      <figure className="max-w-[960px] mx-auto px-6 md:px-10 py-4">
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-ink/[0.06]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 960px"
          />
        </div>
        {caption && (
          <figcaption className="text-technical text-[11px] tracking-[0.15em] text-ink/30 text-right mt-3">
            {caption}
          </figcaption>
        )}
      </figure>
    </ScrollRevealWrapper>
  );
}
