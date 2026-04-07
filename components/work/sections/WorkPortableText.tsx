import type {ReactNode} from 'react';
import Link from 'next/link';
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextMarkComponentProps,
} from '@portabletext/react';
import type { PortableTextBlock, PortableTextValue } from '@/types/portableText';

type WorkPortableTextProps = {
  value: PortableTextValue | string;
  isDark: boolean;
  align?: 'left' | 'center' | 'right';
  variant?: 'prologue' | 'default' | 'display' | 'pull-quote';
  className?: string;
};

const PROJECT_ID = 'dkok2iir';
const DATASET = 'production';

function imageUrlFromRef(ref?: string) {
  if (!ref) return null;
  const match = ref.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/);
  if (!match) return null;
  const [, id, dimensions, format] = match;
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}`;
}

function getEmbedUrl(url?: string): string | null {
  if (!url) return null;

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

  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;

  return null;
}

function PortableLink({
  children,
  value,
}: PortableTextMarkComponentProps<{ _type: 'link'; href?: string; blank?: boolean }>) {
  const href = value?.href;
  if (!href) return <>{children}</>;

  const className =
    'underline decoration-rust/35 underline-offset-4 transition-colors duration-200 hover:text-rust';

  if (/^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a
        href={href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noreferrer noopener' : undefined}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function PortableHref({
  href,
  blank,
  children,
}: {
  href?: string;
  blank?: boolean;
  children: ReactNode;
}) {
  if (!href) return <>{children}</>;

  const className =
    'underline decoration-rust/35 underline-offset-4 transition-colors duration-200 hover:text-rust';

  if (/^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a
        href={href}
        target={blank ? '_blank' : undefined}
        rel={blank ? 'noreferrer noopener' : undefined}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function getStyles({
  isDark,
  align = 'left',
  variant = 'default',
}: Pick<WorkPortableTextProps, 'isDark' | 'align' | 'variant'>) {
  const textTone = isDark ? 'text-white/72' : 'text-ink/70';
  const headingTone = isDark ? 'text-white' : 'text-ink';
  const eyebrowTone = isDark ? 'text-rust/88' : 'text-rust';
  const quoteTone = isDark ? 'text-white/82' : 'text-ink/82';
  const width = align === 'center' ? 'max-w-xl mx-auto' : 'max-w-md';
  const alignment = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';

  if (variant === 'prologue') {
    return {
      wrapper: `space-y-6 ${alignment}`,
      normal: `font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.3] tracking-tight ${headingTone}`,
      h2: `font-serif text-[1.3rem] md:text-[1.65rem] lg:text-[1.9rem] leading-[1.25] tracking-tight ${headingTone}`,
      h3: `text-[0.72rem] font-bold uppercase tracking-[0.28em] ${eyebrowTone}`,
      blockquote: `border-l border-rust/35 pl-5 md:pl-6 font-serif text-[1.2rem] md:text-[1.45rem] italic leading-[1.45] ${quoteTone}`,
    };
  }

  const bodySize =
    variant === 'display'
      ? 'text-lg md:text-xl leading-[1.6]'
      : variant === 'pull-quote'
        ? 'text-base md:text-lg leading-[1.8] italic'
        : 'text-base leading-[1.8]';

  const h2Size =
    variant === 'display'
      ? 'text-2xl md:text-3xl'
      : variant === 'pull-quote'
        ? 'text-xl md:text-2xl italic'
        : 'text-xl md:text-2xl';

  return {
    wrapper: `${width} ${alignment} space-y-4`,
    normal: `${bodySize} ${textTone}`,
    h2: `font-serif font-medium leading-[1.2] tracking-tight ${h2Size} ${headingTone}`,
    h3: `text-[0.7rem] font-bold uppercase tracking-[0.24em] ${eyebrowTone}`,
    blockquote: `border-l border-rust/30 pl-4 font-serif text-[1.1rem] md:text-[1.3rem] italic leading-[1.6] ${quoteTone}`,
    list: `${bodySize} ${textTone}`,
  };
}

export default function WorkPortableText({
  value,
  isDark,
  align = 'left',
  variant = 'default',
  className,
}: WorkPortableTextProps) {
  const styles = getStyles({isDark, align, variant});

  if (typeof value === 'string') {
    return (
      <div className={`${styles.wrapper} ${className || ''}`.trim()}>
        <p className={styles.normal}>{value}</p>
      </div>
    );
  }

  const components: PortableTextComponents = {
    block: {
      normal: ({children}) => <p className={styles.normal}>{children}</p>,
      h2: ({children}) => <h4 className={styles.h2}>{children}</h4>,
      h3: ({children}) => <p className={styles.h3}>{children}</p>,
      blockquote: ({children}) => <blockquote className={styles.blockquote}>{children}</blockquote>,
    },
    list: {
      bullet: ({children}) => <ul className={`list-disc pl-6 space-y-2 ${styles.list}`}>{children}</ul>,
      number: ({children}) => <ol className={`list-decimal pl-6 space-y-2 ${styles.list}`}>{children}</ol>,
    },
    listItem: {
      bullet: ({children}) => <li>{children}</li>,
      number: ({children}) => <li>{children}</li>,
    },
    marks: {
      strong: ({children}) => <strong>{children}</strong>,
      em: ({children}) => <em>{children}</em>,
      code: ({children}) => (
        <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.9em] text-current">
          {children}
        </code>
      ),
      link: PortableLink,
    },
    types: {
      bodyImage: ({value}) => {
        const src = value?.asset?.url || imageUrlFromRef(value?.asset?._ref);
        if (!src) return null;

        return (
          <figure className="my-8 space-y-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={value?.alt || ''}
              className="w-full rounded-sm border border-white/10 object-cover"
            />
            {value?.caption ? (
              <figcaption className="text-[11px] uppercase tracking-[0.16em] text-white/30">
                {value.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      },
      bodyVideo: ({value}) => {
        const embedUrl = getEmbedUrl(value?.url);
        if (!embedUrl) return null;

        return (
          <figure className="my-8 space-y-3">
            <div
              className="relative w-full overflow-hidden rounded-sm border border-white/10 bg-white/[0.02]"
              style={{aspectRatio: value?.aspectRatio || '16/9'}}
            >
              <iframe
                src={embedUrl}
                className="absolute inset-0 h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={value?.caption || 'Video'}
              />
            </div>
            {value?.caption ? (
              <figcaption className="text-[11px] uppercase tracking-[0.16em] text-white/30">
                {value.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      },
      imageGallery: ({value}) => {
        const images = Array.isArray(value?.images) ? value.images : [];
        if (images.length === 0) return null;

        return (
          <section className="my-8 space-y-4">
            {value?.title ? (
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-rust/90">{value.title}</p>
            ) : null}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {images.map((image: PortableTextBlock, index: number) => {
                const src = image?.asset?.url || imageUrlFromRef(image?.asset?._ref);
                if (!src) return null;

                return (
                  <figure key={image._key || index} className="space-y-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={image?.alt || ''}
                      className="w-full rounded-sm border border-white/10 object-cover"
                    />
                    {image?.caption ? (
                      <figcaption className="text-[11px] uppercase tracking-[0.14em] text-white/30">
                        {image.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                );
              })}
            </div>
          </section>
        );
      },
      statCallout: ({value}) => (
        <section className="my-8 rounded-sm border border-rust/20 bg-rust/[0.07] p-6">
          <div className="space-y-2">
            <p className="font-serif text-5xl leading-none tracking-tight text-rust">{value?.value}</p>
            {value?.label ? (
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">{value.label}</p>
            ) : null}
            {value?.text ? <p className={styles.normal}>{value.text}</p> : null}
          </div>
        </section>
      ),
      promoCard: ({value}) => (
        <section className="my-8 rounded-sm border border-white/10 bg-white/[0.03] p-6">
          <div className="space-y-3">
            {value?.title ? <h5 className={styles.h2}>{value.title}</h5> : null}
            {value?.text ? <p className={styles.normal}>{value.text}</p> : null}
            {value?.ctaLabel && value?.ctaHref ? (
              <div>
                <PortableHref href={value.ctaHref}>{value.ctaLabel}</PortableHref>
              </div>
            ) : null}
          </div>
        </section>
      ),
    },
    hardBreak: () => <br />,
  };

  return (
    <div className={`${styles.wrapper} ${className || ''}`.trim()}>
      <PortableText value={value} components={components} />
    </div>
  );
}
