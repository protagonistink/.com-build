'use client';

import React from 'react';
import { Project } from '@/types/work';

interface WorkLedgerProps {
  projects: Project[];
  activeProjectId: number | null;
  onHover: (id: number | null) => void;
  onClick: (project: Project) => void;
}

export default function WorkLedger({ projects, activeProjectId, onHover, onClick }: WorkLedgerProps) {
  return (
    <div className="relative flex-1 min-w-0 h-full bg-[#FAFAFA] overflow-y-auto no-scrollbar selection:bg-rust/20 selection:text-ink">
      <header className="sticky top-0 z-20 bg-[#FAFAFA]/95 backdrop-blur-sm border-b border-ink/10 px-8 md:px-12 py-10 transition-colors duration-500">
        <div className="flex flex-col gap-8 max-w-2xl">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-rust flex items-center justify-center rounded-[1px]">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-rec" />
              </span>
              <span className="text-technical text-[10px] text-ink/60 uppercase tracking-[0.2em]">
                Portfolio Archive
              </span>
            </div>
            <h1 className="text-narrative text-5xl md:text-7xl text-ink leading-[0.9] tracking-tight">
              Case Study Gallery
            </h1>
          </div>

          <div className="pl-6 border-l border-rust/40 max-w-lg">
            <p className="font-sans text-ink/72 text-base md:text-lg leading-relaxed font-light">
              Four strategic narratives. Open any scene to inspect tension, intervention, and outcome.
            </p>
          </div>
        </div>
      </header>

      <main className="px-8 md:px-12 py-12 pb-32">
        <div className="flex items-center justify-between pb-4 border-b border-ink/80 mb-2">
          <span className="text-technical text-[11px] font-bold text-ink">CASE STUDIES</span>
          <span className="font-mono text-[10px] text-ink/40 tracking-widest">VOL. 01 — ACTIVE FILES</span>
        </div>

        <div className="divide-y divide-ink/10">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`group relative py-12 cursor-pointer transition-all duration-500 ease-out ${activeProjectId === project.id
                  ? 'bg-ink/[0.03] -mx-8 md:-mx-12 px-8 md:px-12'
                  : 'opacity-65 hover:opacity-100'
                }`}
              onMouseEnter={() => onHover(project.id)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onClick(project)}
            >
              {activeProjectId === project.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-rust origin-bottom animate-[scale-y_0.4s_ease-out]" />
              )}

              <div className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="w-32 flex flex-col gap-1 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-technical font-bold text-[12px] transition-colors duration-300 ${activeProjectId === project.id ? 'text-rust' : 'text-ink'}`}>
                      {project.scene}
                    </span>
                    {activeProjectId === project.id && <div className="w-1.5 h-1.5 bg-rust rounded-full" />}
                  </div>
                  <span className="text-technical text-[10px] text-ink/40 font-medium tracking-wider">{project.ref}</span>
                </div>

                <div className="flex-1 flex flex-col gap-4">
                  <h2 className={`text-narrative transition-all duration-500 origin-left ${activeProjectId === project.id ? 'text-4xl md:text-5xl text-rust' : 'text-3xl md:text-4xl text-ink'}`}>
                    {project.title}
                  </h2>

                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-technical font-bold text-[11px] text-ink">{project.client}</span>
                    <span className="text-ink/10 font-thin">|</span>
                    <span className="text-technical text-[11px] text-ink/60">{project.category}</span>
                  </div>

                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeProjectId === project.id ? 'max-h-32 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <p className="text-narrative text-lg text-ink/62 max-w-md">{project.description}</p>
                    <div className="mt-6 flex items-center gap-2 text-rust group-hover:gap-3 transition-all duration-300">
                      <span className="text-technical text-[10px] font-bold">OPEN DOSSIER</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform group-hover:translate-x-1 duration-300">
                        <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block w-16 text-right shrink-0">
                  <span className="text-technical text-[10px] text-ink/25 font-medium">{project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="absolute bottom-8 left-12 flex flex-col gap-4 opacity-30">
        <div className="w-px h-12 bg-ink/20" />
        <span className="text-technical text-[8px] -rotate-90 origin-left -translate-y-2">ARCHIVE_END</span>
      </div>
    </div>
  );
}
