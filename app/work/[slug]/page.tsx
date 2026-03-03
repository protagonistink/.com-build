import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getWorkProjectBySlug, getWorkProjects } from '@/lib/work';
import TypewriterHeadline from '@/components/TypewriterHeadline';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';
import ParallaxHeroBackground from '@/components/ParallaxHeroBackground';

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

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = await getWorkProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      {/* ================================================================
          DARK HERO — Cinematic opening
          ================================================================ */}
      <section className="relative min-h-[90vh] md:min-h-screen bg-trueblack text-warmwhite overflow-hidden texture-grain">
        {/* Hero image */}
        <ParallaxHeroBackground
          src={project.image}
          alt={project.imageDescription || project.title}
        />

        {/* Camera metadata overlay — top right */}
        <div className="absolute top-32 md:top-40 right-6 md:right-10 lg:right-12 z-10 text-right hidden md:block">
          <div className="flex flex-col gap-1 text-[9px] tracking-[0.15em] text-white/40 font-mono drop-shadow-md">
            <span>{project.scene}</span>
            <span>{project.ref}</span>
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
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 border border-white/20 px-3 py-1.5 bg-black/10 backdrop-blur-sm">
                {project.category}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 border border-white/20 px-3 py-1.5 bg-black/10 backdrop-blur-sm">
                {project.client}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 border border-white/20 px-3 py-1.5 bg-black/10 backdrop-blur-sm">
                {project.year}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-medium leading-[0.92] tracking-[-0.02em] mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
              <TypewriterHeadline text={project.title} initialDelay={400} />
            </h1>

            {/* Tagline */}
            <p className="font-serif text-xl md:text-2xl italic text-white/80 max-w-lg leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 drop-shadow-md">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/40" />
          <span className="text-[8px] uppercase tracking-[0.3em] text-white/40">Scroll</span>
        </div>
      </section>

      {/* ================================================================
          LIGHT BODY — Editorial reading experience
          ================================================================ */}
      <section className="relative z-20 -mt-12 md:-mt-16 bg-[#FAFAFA] text-ink texture-paper rounded-t-[2.5rem] md:rounded-t-[3rem] shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
        {/* Tension statement — the bridge */}
        <div className="px-6 md:px-10 lg:px-12 py-20 md:py-28">
          <ScrollRevealWrapper direction="up" className="max-w-[1400px] mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-technical text-[10px] tracking-[0.25em] text-ink/25 mb-8">
                THE TENSION
              </p>
              <p className="font-serif text-3xl md:text-4xl lg:text-5xl italic text-ink/70 leading-[1.2]">
                &ldquo;{project.tensionStatement}&rdquo;
              </p>
            </div>
          </ScrollRevealWrapper>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="h-px bg-ink/[0.06]" />
        </div>

        {/* Situation / Problem / Engagement — three-column narrative */}
        <div className="px-6 md:px-10 lg:px-12 py-20 md:py-28">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              <ScrollRevealWrapper delay={0}>
                <p className="text-technical text-[10px] tracking-[0.25em] text-ink/25 mb-5">
                  THE SITUATION
                </p>
                <p className="text-[14px] md:text-[15px] text-ink/55 leading-[1.8]">
                  {project.situation}
                </p>
              </ScrollRevealWrapper>
              <ScrollRevealWrapper delay={0.15}>
                <p className="text-technical text-[10px] tracking-[0.25em] text-ink/25 mb-5">
                  THE PROBLEM
                </p>
                <p className="text-[14px] md:text-[15px] text-ink/55 leading-[1.8]">
                  {project.problem}
                </p>
              </ScrollRevealWrapper>
              <ScrollRevealWrapper delay={0.3}>
                <p className="text-technical text-[10px] tracking-[0.25em] text-ink/25 mb-5">
                  THE ENGAGEMENT
                </p>
                <p className="text-[14px] md:text-[15px] text-ink/55 leading-[1.8]">
                  {project.engagementSummary}
                </p>
              </ScrollRevealWrapper>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="h-px bg-ink/[0.06]" />
        </div>

        {/* Before / After — the transformation */}
        <div className="px-6 md:px-10 lg:px-12 py-20 md:py-28">
          <div className="max-w-[1400px] mx-auto">
            <ScrollRevealWrapper direction="up" className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-ink/[0.06]">
              <div className="p-10 md:p-14 border-b md:border-b-0 md:border-r border-ink/[0.06]">
                <p className="text-technical text-[10px] tracking-[0.25em] text-ink/20 mb-8">
                  BEFORE
                </p>
                <p className="font-serif text-xl md:text-2xl italic text-ink/30 leading-relaxed">
                  &ldquo;{project.before}&rdquo;
                </p>
                <p className="text-[11px] text-ink/15 mt-6 tracking-wide">
                  Category language. Low distinction.
                </p>
              </div>
              <div className="p-10 md:p-14">
                <p className="text-technical text-[10px] tracking-[0.25em] text-rust mb-8">
                  AFTER
                </p>
                <p className="font-serif text-xl md:text-2xl italic text-ink/80 leading-relaxed">
                  &ldquo;{project.after}&rdquo;
                </p>
                <p className="text-[11px] text-ink/35 mt-6 tracking-wide">
                  Clear stakes. Clear position.
                </p>
              </div>
            </ScrollRevealWrapper>
          </div>
        </div>
      </section>

      {/* ================================================================
          THE ROLLS — Film-strip image gallery
          ================================================================ */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <section className="bg-trueblack text-warmwhite py-20 md:py-28 texture-grain overflow-hidden">
          <div className="px-6 md:px-10 lg:px-12 mb-12 md:mb-16">
            <div className="max-w-[1400px] mx-auto flex items-end justify-between">
              <div>
                <p className="text-technical text-[10px] tracking-[0.25em] text-white/20 mb-3">
                  THE ROLLS
                </p>
                <p className="font-serif text-lg italic text-white/30">
                  Visual artifacts from the engagement
                </p>
              </div>
              <p className="text-[9px] tracking-[0.15em] text-white/15 font-mono hidden md:block">
                {project.galleryImages.length} FRAMES // {project.scene}
              </p>
            </div>
          </div>

          {/* Horizontal scroll gallery */}
          <div className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar px-6 md:px-10 lg:px-12 pb-8 snap-x snap-mandatory">
            {project.galleryImages.map((img, i) => (
              <ScrollRevealWrapper direction="left" delay={i * 0.1} key={i} className="shrink-0 w-[80vw] md:w-[55vw] lg:w-[40vw] group snap-center">
                <div className="relative aspect-[3/2] overflow-hidden bg-white/[0.03] cursor-grab active:cursor-grabbing">
                  <Image
                    src={img.src}
                    alt={img.description}
                    fill
                    className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-1000 ease-out"
                    sizes="(max-width: 768px) 80vw, (max-width: 1024px) 55vw, 40vw"
                  />
                  {/* Film-strip perforations */}
                  <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>
                <div className="flex items-start justify-between mt-4 gap-4">
                  <div>
                    <p className="text-[9px] tracking-[0.15em] text-white/20 font-mono mb-1">
                      {img.label}
                    </p>
                    <p className="text-[12px] text-white/35 leading-relaxed">
                      {img.description}
                    </p>
                  </div>
                  <span className="text-[9px] text-white/10 font-mono shrink-0 mt-0.5">
                    FIG. {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </ScrollRevealWrapper>
            ))}
          </div>
        </section>
      )}

      {/* ================================================================
          NEXT PROJECT + BACK NAV — white bg, editorial
          ================================================================ */}
      <section className="bg-[#FAFAFA] text-ink px-6 md:px-10 lg:px-12 pt-16 md:pt-24 pb-12">
        <ScrollRevealWrapper direction="up" className="max-w-[1400px] mx-auto">
          <div className="h-px bg-ink/[0.06] mb-16 md:mb-20" />

          <Link href={`/work/${nextProject.slug}`} className="group block mb-16 md:mb-20">
            <p className="text-technical text-[10px] tracking-[0.25em] text-ink/25 mb-6">
              NEXT CASE STUDY
            </p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light italic text-ink/50 group-hover:text-ink/90 transition-colors duration-700 leading-tight mb-4">
              {nextProject.title}
            </h2>
            <p className="font-serif text-lg md:text-xl italic text-ink/30 group-hover:text-ink/50 transition-colors duration-500 max-w-lg leading-relaxed">
              {nextProject.tagline}
            </p>
          </Link>

          <div className="h-px bg-ink/[0.06] mb-8" />

          <div className="flex justify-between items-center">
            <Link
              href="/work"
              className="text-[11px] uppercase tracking-[0.25em] text-ink/30 hover:text-ink transition-colors duration-300"
            >
              &larr; All Work
            </Link>
            <Link
              href="/#story-teardown"
              className="text-[11px] uppercase tracking-[0.25em] text-rust hover:text-ink transition-colors duration-300"
            >
              Book a Call &rarr;
            </Link>
          </div>
        </ScrollRevealWrapper>
      </section>
    </>
  );
}
