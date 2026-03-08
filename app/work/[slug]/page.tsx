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
  const projects = await getWorkProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // Derived booleans for beat visibility
  const hasColdOpen = Boolean(project.coldOpen);
  const hasStoryProblem = Boolean(project.internalStory || project.externalPerception || project.consequences);
  const hasWorld = Boolean((project.mentors && project.mentors.length > 0) || (project.villains && project.villains.length > 0));
  const hasReframe = Boolean(project.reframe);
  const hasArtifacts = Boolean(project.artifacts && project.artifacts.length > 0);
  const hasExecution = Boolean(project.executionSurfaces && project.executionSurfaces.length > 0);
  const hasShift = Boolean(project.shifts && project.shifts.length > 0);
  const hasMetrics = Boolean(project.metrics && project.metrics.length > 0);
  const hasExecutionOrShift = hasExecution || hasShift;

  // Meta pills for hero
  const heroPills = [
    project.engagementType,
    project.client,
    project.sector,
    project.year,
  ].filter(Boolean);

  // Cold Open metadata row
  const coldOpenMeta = [project.client, project.sector, project.engagementType].filter(Boolean).join(' \u00b7 ');

  return (
    <>
      {/* ================================================================
          BEAT 1: HERO — Cinematic opening
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
          BEATS 2–5: LIGHT BODY — Cold Open, Story Problem, World, Reframe
          ================================================================ */}
      {(hasColdOpen || hasStoryProblem || hasWorld || hasReframe) && (
        <section className="relative z-20 -mt-12 md:-mt-16 bg-[#FAFAFA] text-ink texture-paper rounded-t-[2.5rem] md:rounded-t-[3rem] shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">

          {/* ── Beat 2: Cold Open ── */}
          {hasColdOpen && (
            <div className="px-6 md:px-10 lg:px-12 py-20 md:py-28">
              <ScrollRevealWrapper direction="up" className="max-w-[1400px] mx-auto">
                <div className="max-w-3xl mx-auto text-center">
                  <p className="text-technical text-[10px] tracking-[0.25em] text-ink/25 mb-4">
                    THE COLD OPEN
                  </p>
                  {coldOpenMeta && (
                    <p className="text-[12px] text-ink/35 tracking-[0.1em] mb-8">
                      {coldOpenMeta}
                    </p>
                  )}
                  <p className="font-serif text-lg md:text-xl text-ink/70 leading-[1.8] max-w-3xl">
                    {project.coldOpen}
                  </p>
                </div>
              </ScrollRevealWrapper>
            </div>
          )}

          {/* ── Beat 3: Story Problem ── */}
          {hasStoryProblem && (
            <>
              <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
                <div className="h-px bg-ink/[0.06]" />
              </div>

              <div className="px-6 md:px-10 lg:px-12 py-20 md:py-28">
                <div className="max-w-[1400px] mx-auto">
                  <p className="text-technical text-[10px] tracking-[0.25em] text-ink/25 mb-12">
                    THE STORY PROBLEM
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                    {project.internalStory && (
                      <ScrollRevealWrapper delay={0}>
                        <p className="text-technical text-[10px] tracking-[0.25em] text-ink/25 mb-5">
                          INTERNAL STORY
                        </p>
                        <p className="text-[14px] md:text-[15px] text-ink/55 leading-[1.8]">
                          {project.internalStory}
                        </p>
                      </ScrollRevealWrapper>
                    )}
                    {project.externalPerception && (
                      <ScrollRevealWrapper delay={0.15}>
                        <p className="text-technical text-[10px] tracking-[0.25em] text-ink/25 mb-5">
                          EXTERNAL PERCEPTION
                        </p>
                        <p className="text-[14px] md:text-[15px] text-ink/55 leading-[1.8]">
                          {project.externalPerception}
                        </p>
                      </ScrollRevealWrapper>
                    )}
                    {project.consequences && (
                      <ScrollRevealWrapper delay={0.3}>
                        <p className="text-technical text-[10px] tracking-[0.25em] text-ink/25 mb-5">
                          CONSEQUENCES
                        </p>
                        <p className="text-[14px] md:text-[15px] text-ink/55 leading-[1.8]">
                          {project.consequences}
                        </p>
                      </ScrollRevealWrapper>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Beat 4: The World ── */}
          {hasWorld && (
            <>
              <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
                <div className="h-px bg-ink/[0.06]" />
              </div>

              <div className="px-6 md:px-10 lg:px-12 py-20 md:py-28">
                <div className="max-w-[1400px] mx-auto">
                  <p className="text-technical text-[10px] tracking-[0.25em] text-ink/25 mb-12">
                    THE WORLD
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                    {project.mentors && project.mentors.length > 0 && (
                      <ScrollRevealWrapper delay={0}>
                        <p className="text-technical text-[10px] tracking-[0.25em] text-ink/25 mb-6">
                          WHO&apos;S GETTING IT RIGHT
                        </p>
                        <div>
                          {project.mentors.map((mentor) => (
                            <div key={mentor.name} className="mb-6 last:mb-0">
                              <p className="text-[15px] font-medium text-ink/70 mb-1">{mentor.name}</p>
                              <p className="text-[14px] text-ink/45 leading-[1.7]">{mentor.observation}</p>
                            </div>
                          ))}
                        </div>
                      </ScrollRevealWrapper>
                    )}
                    {project.villains && project.villains.length > 0 && (
                      <ScrollRevealWrapper delay={0.15}>
                        <div className="border-l-2 border-rust/30 pl-6">
                          <p className="text-technical text-[10px] tracking-[0.25em] text-ink/25 mb-6">
                            WHAT YOU&apos;RE UP AGAINST
                          </p>
                          <div>
                            {project.villains.map((villain) => (
                              <div key={villain.name} className="mb-6 last:mb-0">
                                <p className="text-[15px] font-medium text-ink/70 mb-1">{villain.name}</p>
                                <p className="text-[14px] text-ink/45 leading-[1.7]">{villain.observation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </ScrollRevealWrapper>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Beat 5: The Reframe ── */}
          {hasReframe && (
            <>
              <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
                <div className="h-px bg-ink/[0.06]" />
              </div>

              <div className="px-6 md:px-10 lg:px-12 py-24 md:py-32">
                <div className="max-w-[1400px] mx-auto">
                  <p className="text-technical text-[10px] tracking-[0.25em] text-ink/25 mb-12">
                    THE REFRAME
                  </p>
                  <ScrollRevealWrapper direction="up">
                    <p className="font-serif text-3xl md:text-4xl lg:text-5xl italic text-ink/80 leading-[1.2] text-center max-w-4xl mx-auto">
                      {project.reframe}
                    </p>
                    {project.reframeAnnotation && (
                      <p className="font-hand text-lg md:text-xl text-rust/60 -rotate-2 mt-8 text-center">
                        {project.reframeAnnotation}
                      </p>
                    )}
                  </ScrollRevealWrapper>
                </div>
              </div>
            </>
          )}
        </section>
      )}

      {/* ================================================================
          BEAT 6: NARRATIVE ARCHITECTURE — Dark gallery
          ================================================================ */}
      {hasArtifacts && (
        <section className="bg-trueblack text-warmwhite py-20 md:py-28 texture-grain">
          <div className="px-6 md:px-10 lg:px-12 mb-12 md:mb-16">
            <div className="max-w-[1400px] mx-auto">
              <p className="text-technical text-[10px] tracking-[0.25em] text-white/20 mb-3">
                NARRATIVE ARCHITECTURE
              </p>
              <p className="font-serif text-lg italic text-white/30">
                Visual artifacts from the engagement
              </p>
            </div>
          </div>

          <div className="px-6 md:px-10 lg:px-12">
            <div className="max-w-[1400px] mx-auto">
              {project.artifacts!.length === 1 ? (
                <ScrollRevealWrapper delay={0} className="max-w-2xl mx-auto">
                  <div className="relative aspect-[3/2] overflow-hidden bg-white/[0.03]">
                    <Image
                      src={project.artifacts![0].src}
                      alt={project.artifacts![0].alt || project.artifacts![0].label || 'Artifact'}
                      fill
                      className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
                      sizes="(max-width: 768px) 100vw, 672px"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-[9px] tracking-[0.15em] text-white/25 font-mono mb-1">
                      {project.artifacts![0].label || 'FIG. 01'}
                    </p>
                    {project.artifacts![0].description && (
                      <p className="text-[12px] text-white/40 leading-relaxed">
                        {project.artifacts![0].description}
                      </p>
                    )}
                  </div>
                </ScrollRevealWrapper>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {project.artifacts!.map((artifact, i) => (
                    <ScrollRevealWrapper key={artifact.src} delay={i * 0.1}>
                      <div className="relative aspect-[3/2] overflow-hidden bg-white/[0.03]">
                        <Image
                          src={artifact.src}
                          alt={artifact.alt || artifact.label || `Artifact ${i + 1}`}
                          fill
                          className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="mt-4">
                        <p className="text-[9px] tracking-[0.15em] text-white/25 font-mono mb-1">
                          {artifact.label || `FIG. ${String(i + 1).padStart(2, '0')}`}
                        </p>
                        {artifact.description && (
                          <p className="text-[12px] text-white/40 leading-relaxed">
                            {artifact.description}
                          </p>
                        )}
                      </div>
                    </ScrollRevealWrapper>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================
          BEATS 7–8: EXECUTION + THE SHIFT — Light section
          ================================================================ */}
      {hasExecutionOrShift && (
        <section className="bg-[#FAFAFA] text-ink texture-paper">

          {/* ── Beat 7: Execution ── */}
          {hasExecution && (
            <div className="px-6 md:px-10 lg:px-12 py-20 md:py-28">
              <div className="max-w-[1400px] mx-auto">
                <p className="text-technical text-[10px] tracking-[0.25em] text-ink/25 mb-12">
                  THE EXECUTION
                </p>
                <ScrollRevealWrapper direction="up">
                  <div>
                    {project.executionSurfaces!.map((surface) => (
                      <div
                        key={surface.surface}
                        className="flex items-start gap-6 py-6 border-b border-ink/[0.06] last:border-b-0"
                      >
                        <span className="text-technical text-[11px] tracking-[0.2em] text-ink/40 w-32 shrink-0 pt-0.5">
                          {surface.surface}
                        </span>
                        <p className="text-[14px] text-ink/55 leading-[1.7]">
                          {surface.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollRevealWrapper>
              </div>
            </div>
          )}

          {/* ── Beat 8: The Shift ── */}
          {hasShift && (
            <>
              <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
                <div className="h-px bg-ink/[0.06]" />
              </div>

              <div className="px-6 md:px-10 lg:px-12 py-20 md:py-28">
                <div className="max-w-[1400px] mx-auto">
                  <p className="text-technical text-[10px] tracking-[0.25em] text-ink/25 mb-12">
                    THE SHIFT
                  </p>
                  <div className="border-l-2 border-rust/20 pl-8 ml-2">
                    {project.shifts!.map((shift) => (
                      <div key={shift.dimension} className="mb-8 last:mb-0">
                        <p className="text-technical text-[10px] tracking-[0.25em] text-ink/30 mb-2">
                          {shift.dimension.toUpperCase()}
                        </p>
                        <p className="text-[15px] text-ink/60 leading-[1.7]">
                          {shift.change}
                        </p>
                      </div>
                    ))}
                  </div>

                  {hasMetrics && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-ink/[0.06]">
                      {project.metrics!.map((metric) => (
                        <div key={metric.label}>
                          <p className="text-2xl md:text-3xl font-display font-medium text-ink/80">
                            {metric.value}
                          </p>
                          <p className="text-[11px] tracking-[0.15em] text-ink/30 mt-2">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </section>
      )}

      {/* ================================================================
          NAVIGATION FOOTER
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
