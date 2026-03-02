import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS } from '@/data/work-projects';

export const metadata = {
  title: 'The Work — Protagonist Ink',
  description: 'Narrative architecture in action. Case studies in brand strategy, story, and structure.',
};

export default function WorkPage() {
  return (
    <main>
      {/* Masthead */}
      <section className="w-full bg-trueblack text-warmwhite min-h-[60vh] md:min-h-[65vh] flex flex-col justify-end relative overflow-hidden texture-grain">
        {/* Faint editorial grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--color-coolgray) 1px, transparent 1px), linear-gradient(to bottom, var(--color-coolgray) 1px, transparent 1px)',
            backgroundSize: '4rem 4rem',
          }}
        />

        {/* Decorative mark */}
        <div className="absolute top-32 right-8 md:right-16 lg:right-24 font-serif text-[8rem] md:text-[12rem] lg:text-[16rem] text-warmwhite/[0.02] italic leading-none pointer-events-none select-none">
          ¶
        </div>

        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-12 pt-40 pb-16 md:pb-20 lg:pb-24 relative z-10">
          <div
            className="flex items-center gap-4 mb-10 md:mb-14"
            style={{ opacity: 0, animation: 'pi-fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both' }}
          >
            <div className="w-8 h-px bg-rust" />
            <p className="text-technical text-[10px] tracking-[0.25em] text-coolgray/70">
              Protagonist Ink
            </p>
          </div>

          <h1
            className="font-display text-6xl md:text-8xl lg:text-[120px] leading-[0.82] tracking-tighter max-w-5xl"
            style={{ opacity: 0, animation: 'pi-fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both' }}
          >
            The{' '}
            <span className="italic text-warmwhite/60 font-light">Work</span>
          </h1>

          <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="hidden md:block md:col-span-2">
              <div
                className="w-px h-20 bg-rust/40"
                style={{ opacity: 0, animation: 'pi-fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.55s both' }}
              />
            </div>
            <div
              className="md:col-span-5 md:col-start-8"
              style={{ opacity: 0, animation: 'pi-fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.6s both' }}
            >
              <p className="font-serif italic text-lg md:text-xl text-coolgray/80 leading-relaxed">
                Narrative architecture in action. From friction to conviction, case by case.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project list */}
      <section className="bg-[#FAFAFA]">
        {PROJECTS.map((project, i) => (
          <Link
            key={project.id}
            href={`/work/${project.slug}`}
            className="group block border-b border-ink/[0.06] relative overflow-hidden"
          >
            {/* Hover image background */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-700 ease-out">
              <Image
                src={project.image}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />

            {/* Ghost scene number */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 font-serif text-[10rem] md:text-[12rem] italic pointer-events-none select-none text-ink/[0.03] group-hover:-translate-x-6 group-hover:text-warmwhite/[0.06] transition-all duration-700 ease-out">
              {String(i + 1).padStart(2, '0')}
            </div>

            {/* Rust accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-rust origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out z-10" />

            <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 py-12 md:py-16 lg:py-20 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start relative z-10">
              {/* Metadata column */}
              <div className="md:col-span-3 flex md:flex-col gap-4 md:gap-3 pt-1">
                <span className="text-technical text-[11px] tracking-[0.2em] italic text-ink/25 group-hover:text-warmwhite/50 transition-colors duration-500">
                  {project.scene}
                </span>
                <span className="hidden md:block w-0 h-px bg-rust group-hover:w-10 transition-all duration-500 ease-out" />
                <span className="md:hidden w-4 h-px bg-rust/40 self-center" />
                <span className="text-technical text-[11px] tracking-[0.2em] italic text-ink/25 group-hover:text-warmwhite/50 transition-colors duration-500">
                  {project.client}
                </span>
                <span className="text-technical text-[11px] tracking-[0.2em] italic text-ink/25 group-hover:text-warmwhite/50 transition-colors duration-500">
                  {project.year}
                </span>
              </div>

              {/* Content column */}
              <div className="md:col-span-8 md:col-start-5 group-hover:translate-x-2 transition-transform duration-500 ease-out">
                <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight mb-5 md:mb-6 text-ink/80 group-hover:text-warmwhite transition-colors duration-500">
                  {project.title}
                </h2>
                <p className="font-serif italic text-base md:text-lg leading-relaxed max-w-2xl text-ink/45 group-hover:text-warmwhite/60 transition-colors duration-500">
                  {project.tagline}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
