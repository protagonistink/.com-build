import Image from 'next/image';

interface InlineFigureProps {
  src: string;
  alt: string;
  caption?: string;
  aspect?: 'natural' | '4/3';
}

export default function InlineFigure({ src, alt, caption, aspect = '4/3' }: InlineFigureProps) {
  return (
    <figure className="max-w-[680px] mx-auto px-6 md:px-10 py-4">
      <div className={`relative rounded-lg overflow-hidden border border-ink/[0.06] ${aspect === '4/3' ? 'aspect-[4/3]' : ''}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 680px"
        />
      </div>
      {caption && (
        <figcaption className="text-technical text-[11px] tracking-[0.15em] text-ink/30 text-right mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
