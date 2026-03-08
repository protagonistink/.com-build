import Link from 'next/link';
import type { PortableTextBlock, PortableTextMarkDef, PortableTextSpan } from '@/types/blog';

const PROJECT_ID = 'dkok2iir';
const DATASET = 'production';

function imageUrlFromRef(ref?: string) {
  if (!ref) return null;
  const match = ref.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/);
  if (!match) return null;
  const [, id, dimensions, format] = match;
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}`;
}

function renderSpanText(span: PortableTextSpan, markDefs: PortableTextMarkDef[] = []) {
  let content: React.ReactNode = span.text;

  for (const mark of span.marks || []) {
    if (mark === 'strong') {
      content = <strong key={`${span._key || span.text}-strong`}>{content}</strong>;
      continue;
    }

    if (mark === 'em') {
      content = <em key={`${span._key || span.text}-em`}>{content}</em>;
      continue;
    }

    const def = markDefs.find((item) => item._key === mark && item._type === 'link');
    if (def?.href) {
      const isExternal = /^https?:\/\//.test(def.href);
      content = isExternal ? (
        <a
          key={`${span._key || span.text}-link`}
          href={def.href}
          target="_blank"
          rel="noreferrer"
          className="text-rust underline decoration-rust/30 underline-offset-4 transition-colors duration-200 hover:text-ink"
        >
          {content}
        </a>
      ) : (
        <Link
          key={`${span._key || span.text}-link`}
          href={def.href}
          className="text-rust underline decoration-rust/30 underline-offset-4 transition-colors duration-200 hover:text-ink"
        >
          {content}
        </Link>
      );
    }
  }

  return content;
}

function renderInlineContent(block: PortableTextBlock) {
  return (block.children || []).map((span, index) => (
    <span key={span._key || `${block._key || block.style || 'block'}-${index}`}>
      {renderSpanText(span, block.markDefs)}
    </span>
  ));
}

function renderList(blocks: PortableTextBlock[], startIndex: number) {
  const first = blocks[startIndex];
  const listType = first.listItem;
  const items: PortableTextBlock[] = [];
  let cursor = startIndex;

  while (cursor < blocks.length) {
    const block = blocks[cursor];
    if (block._type !== 'block' || block.listItem !== listType) break;
    items.push(block);
    cursor += 1;
  }

  const ListTag = listType === 'number' ? 'ol' : 'ul';
  const className =
    listType === 'number'
      ? 'max-w-[680px] mx-auto px-6 md:px-10 list-decimal space-y-3 pl-6 text-base md:text-lg leading-relaxed md:leading-[1.8] text-ink/80'
      : 'max-w-[680px] mx-auto px-6 md:px-10 list-disc space-y-3 pl-6 text-base md:text-lg leading-relaxed md:leading-[1.8] text-ink/80';

  return {
    nextIndex: cursor - 1,
    node: (
      <ListTag key={`list-${first._key || startIndex}`} className={className}>
        {items.map((item, index) => (
          <li key={item._key || `item-${index}`} className="pl-1 marker:text-rust/70">
            {renderInlineContent(item)}
          </li>
        ))}
      </ListTag>
    ),
  };
}

export default function SanityPortableText({ blocks }: { blocks: PortableTextBlock[] }) {
  const nodes: React.ReactNode[] = [];

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];

    if (block._type === 'image') {
      const src = imageUrlFromRef(block.asset?._ref);
      if (!src) continue;

      nodes.push(
        <figure key={block._key || `image-${index}`} className="max-w-[960px] mx-auto px-6 md:px-10 my-12 md:my-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={block.alt || ''}
            className="w-full rounded-lg border border-ink/[0.08] object-cover"
          />
          {block.caption && (
            <figcaption className="mt-4 text-center text-sm text-ink/45 tracking-[0.02em]">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
      continue;
    }

    if (block._type !== 'block') continue;

    if (block.listItem) {
      const { nextIndex, node } = renderList(blocks, index);
      nodes.push(node);
      index = nextIndex;
      continue;
    }

    const content = renderInlineContent(block);
    const key = block._key || `${block.style || 'normal'}-${index}`;

    if (block.style === 'h2') {
      nodes.push(
        <div key={key} className="max-w-[780px] mx-auto px-6 md:px-10 pt-8 md:pt-10 pb-2">
          <h2 className="font-display text-[2.35rem] md:text-[3.4rem] leading-[0.96] tracking-tight text-ink">
            {content}
          </h2>
        </div>
      );
      continue;
    }

    if (block.style === 'h3') {
      nodes.push(
        <div key={key} className="max-w-[760px] mx-auto px-6 md:px-10 pt-6 md:pt-8 pb-1">
          <h3 className="font-display text-[1.7rem] md:text-[2.35rem] leading-[1.02] tracking-tight text-ink/94">
            {content}
          </h3>
        </div>
      );
      continue;
    }

    if (block.style === 'h4') {
      nodes.push(
        <div key={key} className="max-w-[720px] mx-auto px-6 md:px-10 pt-5 pb-1">
          <h4 className="text-technical text-[0.78rem] md:text-[0.82rem] tracking-[0.18em] text-rust/90">
            {content}
          </h4>
        </div>
      );
      continue;
    }

    if (block.style === 'blockquote') {
      nodes.push(
        <blockquote
          key={key}
          className="max-w-[760px] mx-auto px-6 md:px-10 my-10 md:my-12 border-l border-rust/35 pl-6 md:pl-8 font-serif text-[1.3rem] md:text-[1.7rem] italic leading-relaxed text-ink/72"
        >
          {content}
        </blockquote>
      );
      continue;
    }

    nodes.push(
      <div key={key} className="max-w-[680px] mx-auto px-6 md:px-10">
        <p className="text-base md:text-lg leading-relaxed md:leading-[1.8] text-ink/80">
          {content}
        </p>
      </div>
    );
  }

  return <div className="space-y-6 md:space-y-8">{nodes}</div>;
}
