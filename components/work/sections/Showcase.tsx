'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';
import type { ShowcaseSection, ShowcaseBlock } from '@/types/work';

// ─── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({ src, alt, label, caption, onClose }: {
  src: string; alt: string; label?: string; caption?: string; onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-trueblack/95 backdrop-blur-sm cursor-zoom-out"
      onClick={onClose}
    >
      <div
        className="relative max-w-[90vw] max-h-[90vh] flex flex-col gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden" style={{ maxHeight: '80vh' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-w-[90vw] max-h-[80vh] object-contain block"
          />
        </div>
        {(label || caption) && (
          <div className="flex justify-between items-center text-[10px] font-mono text-white/30 uppercase tracking-widest px-1">
            <span>{label}</span>
            {caption && <span className="text-white/15">{caption}</span>}
          </div>
        )}
      </div>
      <button
        onClick={onClose}
        className="absolute top-6 right-8 text-white/30 hover:text-white text-[11px] font-mono tracking-widest uppercase transition-colors"
      >
        ESC / CLOSE
      </button>
    </div>
  );
}

// ─── Shared content panel ───────────────────────────────────────────────────

function ContentPanel({ block, isDark }: { block: ShowcaseBlock; isDark: boolean }) {
  const style = block.copyStyle || 'default';
  const align = block.textAlign || 'left';

  const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
  const detailsAlign = align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : '';
  const maxWidth = align === 'center' ? '' : 'max-w-md';

  const headlineSize = style === 'display'
    ? 'text-4xl md:text-5xl'
    : style === 'pull-quote'
      ? 'text-2xl md:text-3xl italic'
      : 'text-3xl md:text-4xl';

  const bodySize = style === 'display'
    ? 'text-lg md:text-xl leading-[1.6]'
    : style === 'pull-quote'
      ? 'text-base md:text-lg leading-[1.8] italic'
      : 'text-base leading-[1.8]';

  return (
    <div className={`flex flex-col justify-center p-8 md:p-12 lg:p-16 ${alignClass}`}>
      <div>
        {(block.eyebrow || block.itemLabel) && (
          <p className={`text-[10px] font-bold uppercase tracking-[0.28em] mb-4 ${
            isDark ? 'text-rust/90' : 'text-rust'
          }`}>
            {block.eyebrow || block.itemLabel}
          </p>
        )}
        {block.title && (
          <h3 className={`${headlineSize} font-serif font-medium leading-[1.1] mb-4 ${
            isDark ? 'text-white' : 'text-ink'
          }`}>
            {block.title}
          </h3>
        )}
        {block.tagline && (
          <p className={`text-sm font-bold uppercase tracking-wide mb-5 ${
            isDark ? 'text-white/30' : 'text-ink/30'
          }`}>
            {block.tagline}
          </p>
        )}
        {block.body && (
          <p className={`${bodySize} ${maxWidth} ${
            isDark ? 'text-white/30' : 'text-ink/35'
          }`}>
            {block.body}
          </p>
        )}
        {block.details && block.details.length > 0 && (
          <div className={`flex flex-wrap gap-4 pt-4 mt-6 border-t ${detailsAlign} ${
            isDark ? 'border-white/[0.06]' : 'border-ink/[0.06]'
          }`}>
            {block.details.map((d) => (
              <span key={d._key} className={`text-[10px] font-bold uppercase tracking-widest ${
                isDark ? 'text-white/20' : 'text-ink/20'
              }`}>
                {d.label} {d.value}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Layout: Copy Only (centered text, no image) ──────────────────────────

function CopyOnlyBlock({ block, isDark }: { block: ShowcaseBlock; isDark: boolean }) {
  const borderColor = isDark ? 'border-white/[0.06]' : 'border-ink/[0.06]';

  // Default to center for copy-only, but respect the field if set
  const centeredBlock = {...block, textAlign: block.textAlign || 'center'} as ShowcaseBlock;

  return (
    <div className={`border-t ${borderColor}`}>
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <ContentPanel block={centeredBlock} isDark={isDark} />
      </div>
    </div>
  );
}

// ─── Layout: Full Width Image (image top, text below) ─────────────────────

function FullWidthBlock({ block, isDark }: { block: ShowcaseBlock; isDark: boolean }) {
  const borderColor = isDark ? 'border-white/[0.06]' : 'border-ink/[0.06]';

  return (
    <div className={`border-t ${borderColor}`}>
      {block.image && (
        <div className={`relative overflow-hidden h-[300px] md:h-[500px] lg:h-[600px] ${
          isDark ? 'bg-[#111111]' : 'bg-[#f3eee8]'
        }`}>
          {block.imageDisplay === 'contain' ? (
            <div className="absolute inset-4 md:inset-8">
              <Image
                src={block.image.src}
                alt={block.image.alt || block.title || ''}
                fill
                className="object-contain object-center grayscale opacity-60 hover:grayscale-0 hover:opacity-80 transition-all duration-700"
                sizes="100vw"
              />
            </div>
          ) : (
            <Image
              src={block.image.src}
              alt={block.image.alt || block.title || ''}
              fill
              className="object-cover object-center grayscale opacity-60 hover:grayscale-0 hover:opacity-80 transition-all duration-700"
              sizes="100vw"
            />
          )}
        </div>
      )}
      <ContentPanel block={block} isDark={isDark} />
    </div>
  );
}

// ─── Layout: Split (image + text side by side) ──────────────────────────────

function SplitBlock({ block, index, isDark }: { block: ShowcaseBlock; index: number; isDark: boolean }) {
  const imageFirst = block.imagePosition ? block.imagePosition === 'left' : index % 2 === 0;
  const borderColor = isDark ? 'border-white/[0.06]' : 'border-ink/[0.06]';

  // Route to specialized layouts
  if (block.imagePosition === 'copyOnly') {
    return <CopyOnlyBlock block={block} isDark={isDark} />;
  }
  if (block.imagePosition === 'full') {
    return <FullWidthBlock block={block} isDark={isDark} />;
  }

  if (!block.image) {
    return (
      <div className={`border-t ${borderColor}`}>
        <ContentPanel block={block} isDark={isDark} />
      </div>
    );
  }

  const image = (
    <div className={`min-h-[250px] md:min-h-[400px] relative overflow-hidden ${
      isDark ? 'bg-[#111111]' : 'bg-[#f3eee8]'
    }`}>
      {block.imageDisplay === 'contain' ? (
        <div className="absolute inset-4 md:inset-6">
          <Image
            src={block.image.src}
            alt={block.image.alt || block.title || ''}
            fill
            className="object-contain object-center grayscale opacity-60 hover:grayscale-0 hover:opacity-80 transition-all duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ) : (
        <Image
          src={block.image.src}
          alt={block.image.alt || block.title || ''}
          fill
          className="object-cover object-center grayscale opacity-60 hover:grayscale-0 hover:opacity-80 transition-all duration-700"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
    </div>
  );

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 border-t ${borderColor}`}>
      {imageFirst ? (
        <>
          <div className={`border-b md:border-b-0 md:border-r ${borderColor}`}>{image}</div>
          <ContentPanel block={block} isDark={isDark} />
        </>
      ) : (
        <>
          <ContentPanel block={block} isDark={isDark} />
          <div className={`border-t md:border-t-0 md:border-l ${borderColor}`}>{image}</div>
        </>
      )}
    </div>
  );
}

// ─── Layout: Full Bleed (image with overlay card) ───────────────────────────

function FullBleedBlock({ block }: { block: ShowcaseBlock }) {
  return (
    <div className="border-b border-white/[0.06] h-[300px] md:h-[450px] lg:h-[550px] overflow-hidden relative">
      {block.image && (
        <Image
          src={block.image.src}
          alt={block.image.alt || block.title || ''}
          fill
          className="object-cover object-top grayscale opacity-60"
          sizes="100vw"
        />
      )}
      <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 max-w-sm bg-trueblack/90 p-5 md:p-8 border border-white/[0.06]">
        {block.title && (
          <h3 className="text-xl md:text-2xl font-serif font-medium text-white leading-tight">
            {block.title}
          </h3>
        )}
      </div>
    </div>
  );
}

// ─── Layout: Film Strip (horizontal scroll) ─────────────────────────────────

function FilmStripBlock({ block }: { block: ShowcaseBlock }) {
  const frames = block.frames;
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; label?: string; caption?: string } | null>(null);

  if (!frames || frames.length === 0) return null;

  return (
    <>
      <div className="border-t border-white/[0.04] overflow-hidden">
        <div className="relative py-10 md:py-14">
          <div className="absolute top-0 left-0 w-full h-5 film-strip-edge opacity-20" />
          <div className="flex gap-6 overflow-x-auto no-scrollbar py-6 md:py-10 px-6 md:px-12">
            {frames.map((frame, i) => (
              <div
                key={frame._key}
                className="flex-none w-[360px] md:w-[560px] group film-frame cursor-zoom-in"
                onClick={() => setLightbox({ src: frame.src, alt: frame.alt || `Frame ${i + 1}`, label: frame.label, caption: frame.caption })}
              >
                <div className="border border-white/[0.08] p-1.5 bg-white/[0.01] group-hover:border-white/20 transition-colors duration-300">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <Image
                      src={frame.src}
                      alt={frame.alt || `Frame ${i + 1}`}
                      fill
                      className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 768px) 360px, 560px"
                    />
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center text-[10px] font-mono text-white/25 uppercase tracking-widest">
                  <span>{frame.label || `FRAME ${String(i + 1).padStart(3, '0')}`}</span>
                  {frame.caption && <span className="text-white/15">{frame.caption}</span>}
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-5 film-strip-edge opacity-20" />
        </div>
      </div>
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          label={lightbox.label}
          caption={lightbox.caption}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}

// ─── Layout: Stat (big number + text) ───────────────────────────────────────

function StatBlock({ block, index, isDark }: { block: ShowcaseBlock; index: number; isDark: boolean }) {
  const statFirst = index % 2 === 0;
  const borderColor = isDark ? 'border-white/[0.06]' : 'border-ink/[0.06]';

  const stat = (
    <div className={`flex items-center justify-center p-8 md:p-12 min-h-[250px] md:min-h-[350px] ${
      isDark ? 'bg-white/[0.02]' : 'bg-[#1a1a1a]'
    }`}>
      <div className="text-center">
        <span className="text-7xl md:text-[120px] font-bold font-serif leading-none tracking-tighter text-rust">
          {block.statValue}
        </span>
        {block.statLabel && (
          <span className="block text-[10px] font-bold tracking-[0.3em] uppercase text-white/25 mt-4">
            {block.statLabel}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 border-t ${borderColor}`}>
      {statFirst ? (
        <>
          {stat}
          <ContentPanel block={block} isDark={isDark} />
        </>
      ) : (
        <>
          <ContentPanel block={block} isDark={isDark} />
          {stat}
        </>
      )}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function Showcase({ section }: { section: ShowcaseSection }) {
  if (!section.items || section.items.length === 0) return null;

  const isDark = section.surface !== 'light';
  const borderColor = isDark ? 'border-white/[0.06]' : 'border-ink/[0.06]';

  return (
    <section className={isDark ? 'bg-trueblack' : 'bg-warmwhite texture-paper'}>
      <div className={`max-w-screen-2xl mx-auto ${isDark ? `border-x ${borderColor}` : ''}`}>
        {section.label && (
          <div className={`px-6 md:px-8 py-6 md:py-8 border-b ${borderColor}`}>
            <span className="text-[10px] font-bold tracking-[0.5em] text-rust uppercase">
              {section.label}
            </span>
          </div>
        )}
        {section.items.map((block, i) => (
          <ScrollRevealWrapper key={block._key} direction="up">
            {block.layout === 'fullBleed' ? (
              <FullBleedBlock block={block} />
            ) : block.layout === 'filmStrip' ? (
              <FilmStripBlock block={block} />
            ) : block.layout === 'stat' ? (
              <StatBlock block={block} index={i} isDark={isDark} />
            ) : (
              <SplitBlock block={block} index={i} isDark={isDark} />
            )}
          </ScrollRevealWrapper>
        ))}
      </div>
    </section>
  );
}
