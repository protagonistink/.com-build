import Link from 'next/link';
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextMarkComponentProps,
} from '@portabletext/react';
import type { PortableTextBlock } from '@/types/portableText';
import PullQuote from '@/components/blog/detail/PullQuote';
import FullBleedImage from '@/components/blog/detail/FullBleedImage';
import SectionDivider from '@/components/blog/detail/SectionDivider';

const PROJECT_ID = 'dkok2iir';
const DATASET = 'production';

function imageUrlFromRef(ref?: string) {
  if (!ref) return null;
  const match = ref.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/);
  if (!match) return null;
  const [, id, dimensions, format] = match;
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}`;
}

function PortableLink({
  children,
  value,
}: PortableTextMarkComponentProps<{ _type: 'link'; href?: string; blank?: boolean }>) {
  const href = value?.href;
  if (!href) return <>{children}</>;

  const className =
    'text-rust underline decoration-rust/30 underline-offset-4 transition-colors duration-200 hover:text-ink';

  if (/^https?:\/\//.test(href)) {
    return (
      <a
        href={href}
        target={value?.blank ? '_blank' : '_self'}
        rel={value?.blank ? 'noreferrer' : undefined}
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

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <div className="max-w-[680px] mx-auto px-6 md:px-10">
        <p className="text-base md:text-lg leading-relaxed md:leading-[1.8] text-ink/80">
          {children}
        </p>
      </div>
    ),
    h1: ({ children }) => (
      <div className="max-w-[820px] mx-auto px-6 md:px-10 pt-10 md:pt-12 pb-2">
        <h1 className="font-display text-[2.7rem] md:text-[4rem] leading-[0.94] tracking-tight text-ink">
          {children}
        </h1>
      </div>
    ),
    h2: ({ children }) => (
      <div className="max-w-[780px] mx-auto px-6 md:px-10 pt-8 md:pt-10 pb-2">
        <h2 className="font-display text-[2.35rem] md:text-[3.4rem] leading-[0.96] tracking-tight text-ink">
          {children}
        </h2>
      </div>
    ),
    h3: ({ children }) => (
      <div className="max-w-[760px] mx-auto px-6 md:px-10 pt-6 md:pt-8 pb-1">
        <h3 className="font-display text-[1.7rem] md:text-[2.35rem] leading-[1.02] tracking-tight text-ink/94">
          {children}
        </h3>
      </div>
    ),
    h4: ({ children }) => (
      <div className="max-w-[720px] mx-auto px-6 md:px-10 pt-5 pb-1">
        <h4 className="text-technical text-[0.78rem] md:text-[0.82rem] tracking-[0.18em] text-rust/90">
          {children}
        </h4>
      </div>
    ),
    blockquote: ({ children }) => (
      <blockquote className="max-w-[760px] mx-auto px-6 md:px-10 my-10 md:my-12 border-l border-rust/35 pl-6 md:pl-8 font-serif text-[1.3rem] md:text-[1.7rem] italic leading-relaxed text-ink/72">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="max-w-[680px] mx-auto px-6 md:px-10 list-disc space-y-3 pl-6 text-base md:text-lg leading-relaxed md:leading-[1.8] text-ink/80">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="max-w-[680px] mx-auto px-6 md:px-10 list-decimal space-y-3 pl-6 text-base md:text-lg leading-relaxed md:leading-[1.8] text-ink/80">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1 marker:text-rust/70">{children}</li>,
    number: ({ children }) => <li className="pl-1 marker:text-rust/70">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => (
      <span className="underline decoration-rust/40 underline-offset-4">{children}</span>
    ),
    'strike-through': ({ children }) => <span className="line-through">{children}</span>,
    code: ({ children }) => (
      <code className="rounded bg-ink/6 px-1.5 py-0.5 font-mono text-[0.9em] text-ink">
        {children}
      </code>
    ),
    link: PortableLink,
  },
  types: {
    image: ({ value }) => {
      const src = value?.asset?.url || value?.externalUrl || imageUrlFromRef(value?.asset?._ref);
      if (!src) return null;

      return (
        <figure className="max-w-[960px] mx-auto px-6 md:px-10 my-12 md:my-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={value?.alt || ''}
            className="w-full rounded-lg border border-ink/[0.08] object-cover"
          />
          {value?.caption ? (
            <figcaption className="mt-4 text-center text-sm text-ink/45 tracking-[0.02em]">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
    pullQuote: ({ value }) => <PullQuote text={value?.text || ''} />,
    fullBleedImage: ({ value }) => {
      const src = value?.asset?.url || imageUrlFromRef(value?.asset?._ref);
      if (!src) return null;
      return <FullBleedImage src={src} alt={value?.alt || ''} caption={value?.caption} />;
    },
    sectionDivider: ({ value }) => <SectionDivider variant={value?.variant ?? 'rule'} />,
  },
  hardBreak: () => <br />,
};

export default function SanityPortableText({ blocks }: { blocks: PortableTextBlock[] }) {
  return (
    <div className="space-y-6 md:space-y-8">
      <PortableText value={blocks} components={components} />
    </div>
  );
}
