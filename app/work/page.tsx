import Link from 'next/link';
import { PROJECTS } from '@/data/work-projects';
import WorkRow from '@/components/WorkRow';
import TypewriterHeadline from '@/components/TypewriterHeadline';

export const metadata = {
  title: 'Work — Protagonist Ink',
  description: 'Case studies in narrative strategy. Where story meets structure.',
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-ink">
      {/* Hero header */}
      <section className="pt-36 md:pt-44 lg:pt-52 pb-16 md:pb-20 px-6 md:px-10 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-technical text-[10px] md:text-[11px] tracking-[0.25em] text-ink/30 mb-6">
            ARCHIVE // CASE STUDIES
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[0.95] tracking-[-0.02em] text-ink/90 max-w-4xl">
            <TypewriterHeadline text="Selected Work" />
          </h1>
          <p className="font-serif text-xl md:text-2xl italic text-ink/40 mt-6 max-w-xl leading-relaxed">
            Narrative strategy for companies whose story had stopped working.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
        <div className="h-px bg-ink/10" />
      </div>

      {/* Project table */}
      <section className="px-6 md:px-10 lg:px-12 py-4">
        <div className="max-w-[1400px] mx-auto">
          {/* Column headers — desktop only */}
          <div className="hidden lg:grid grid-cols-12 gap-6 py-5 text-[10px] uppercase tracking-[0.25em] text-ink/25">
            <div className="col-span-1">No.</div>
            <div className="col-span-4">Project</div>
            <div className="col-span-2">Client</div>
            <div className="col-span-3">Description</div>
            <div className="col-span-1">Year</div>
            <div className="col-span-1 text-right">Ref</div>
          </div>

          <div className="divide-y divide-ink/[0.06]">
            {PROJECTS.map((project, i) => (
              <WorkRow key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-6 md:px-10 lg:px-12 pt-12 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="h-px bg-ink/10 mb-16" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <p className="text-technical text-[10px] tracking-[0.25em] text-ink/25 mb-4">
                NEXT STEP
              </p>
              <p className="font-serif text-2xl md:text-3xl italic text-ink/50 leading-relaxed max-w-md">
                Every case study started the same way&mdash;a conversation about what wasn&rsquo;t working.
              </p>
            </div>
            <Link
              href="/#story-health-check"
              className="text-[12px] uppercase tracking-[0.25em] text-rust hover:text-ink transition-colors duration-500 border-b border-rust/40 hover:border-ink/40 pb-1 shrink-0"
            >
              Book a Narrative Strategy Call &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
