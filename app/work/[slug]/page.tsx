import Link from 'next/link';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { getWorkProjectBySlug, getWorkProjects } from '@/lib/work';
import TypewriterHeadline from '@/components/TypewriterHeadline';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';
import ParallaxHeroBackground from '@/components/ParallaxHeroBackground';
import SectionRenderer from '@/components/work/sections/SectionRenderer';

export async function generateStaticParams() {
  const projects = await getWorkProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getWorkProjectBySlug(slug);

  if (!project) {
    return { title: 'Case Study' };
  }

  const ogImage = project.image || '/images/og-default.jpg';
  const description = project.subtitle || project.description;
  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      images: [{ url: ogImage, alt: project.imageAlt || project.title }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      images: [ogImage],
    },
  };
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { isEnabled: preview } = await draftMode();
  const projects = await getWorkProjects(preview);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // Meta pills for hero
  const heroPills = [
    project.engagementType,
    project.client,
    project.sector,
    project.year,
  ].filter(Boolean);

  return (
    <>
      {/* ================================================================
          HERO — Cinematic opening (kept from original)
          ================================================================ */}
      <section className="relative min-h-[90vh] md:min-h-screen bg-trueblack text-warmwhite overflow-hidden texture-grain">
        {/* Hero image */}
        <ParallaxHeroBackground
          src={project.image}
          alt={project.imageAlt || project.title}
        />

        {/* Camera metadata overlay — top right */}
        <div className="absolute top-32 md:top-40 right-6 md:right-10 lg:right-12 z-10 text-right hidden md:block">
          <div className="flex flex-col gap-1 text-[9px] tracking-[0.15em] text-white/40 font-mono drop-shadow-md">
            {project.caseNumber && (
              <span>CASE STUDY // {project.caseNumber}</span>
            )}
            {project.timeline && (
              <span>TIMELINE // {project.timeline}</span>
            )}
            {!project.caseNumber && <span>{project.scene}</span>}
            {!project.timeline && <span>{project.ref}</span>}
            <span>f/2.8 — 1/250s</span>
            <span>ISO 400</span>
            <span className="flex items-center gap-1.5 justify-end mt-1 text-white/60">
              <span className="w-1.5 h-1.5 rounded-full bg-rust animate-rec shadow-[0_0_8px_rgba(200,60,47,0.6)]" />
              REC
            </span>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col justify-end min-h-[90vh] md:min-h-screen px-6 md:px-10 lg:px-12 pb-16 md:pb-24">
          <div className="max-w-[1400px] mx-auto w-full">
            {/* Breadcrumb */}
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/50 mb-10 md:mb-14 drop-shadow-md">
              <Link href="/work" className="hover:text-white transition-colors duration-300">The Work</Link>
              <span>/</span>
              <span className="text-white/80">{project.title}</span>
            </div>

            {/* Meta pills */}
            <div className="flex flex-wrap gap-3 mb-8 drop-shadow-md">
              {heroPills.map((pill) => (
                <span
                  key={pill}
                  className="text-[10px] uppercase tracking-[0.2em] text-white/50 border border-white/20 px-3 py-1.5 bg-black/10 backdrop-blur-sm"
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-medium leading-[0.92] tracking-[-0.02em] mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
              <TypewriterHeadline text={project.title} initialDelay={400} />
            </h1>

            {/* Subtitle */}
            {project.subtitle && (
              <p className="font-serif text-xl md:text-2xl italic text-white/70 max-w-2xl leading-relaxed mt-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
                {project.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 drop-shadow-md">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/40" />
          <span className="text-[8px] uppercase tracking-[0.3em] text-white/40">Scroll</span>
        </div>
      </section>

      {/* ================================================================
          COMPOSABLE SECTIONS
          ================================================================ */}
      <SectionRenderer sections={project.sections} />

      {/* ================================================================
          NAVIGATION FOOTER
          ================================================================ */}
      <section className="bg-trueblack text-warmwhite px-6 md:px-10 lg:px-12 pt-16 md:pt-24 pb-12 border-t border-white/5">
        <ScrollRevealWrapper direction="up" className="max-w-[1400px] mx-auto">
          <div className="h-px bg-white/[0.06] mb-16 md:mb-20" />

          <Link href={`/work/${nextProject.slug}`} className="group block mb-16 md:mb-20">
            <p className="text-technical text-[10px] tracking-[0.25em] text-white/25 mb-6">
              NEXT CASE STUDY
            </p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light italic text-white/50 group-hover:text-white/90 transition-colors duration-700 leading-tight mb-4">
              {nextProject.title}
            </h2>
            <p className="font-serif text-lg md:text-xl italic text-white/30 group-hover:text-white/50 transition-colors duration-500 max-w-lg leading-relaxed">
              {nextProject.tagline}
            </p>
          </Link>

          <div className="h-px bg-white/[0.06] mb-8" />

          <div className="flex justify-between items-center">
            <Link
              href="/work"
              className="text-[11px] uppercase tracking-[0.25em] text-white/30 hover:text-white transition-colors duration-300"
            >
              &larr; All Work
            </Link>
            <Link
              href="/#story-teardown"
              className="text-[11px] uppercase tracking-[0.25em] text-rust hover:text-white transition-colors duration-300"
            >
              Book a Call &rarr;
            </Link>
          </div>
        </ScrollRevealWrapper>
      </section>
    </>
  );
}
