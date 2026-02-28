'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types/work';

interface DossierViewProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export default function DossierView({ project, isOpen, onClose }: DossierViewProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div
        className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <div className="relative mt-auto h-[92vh] bg-[#FAFAFA] shadow-2xl overflow-hidden flex flex-col rounded-t-[2px]">
        <div className="relative h-[40vh] w-full shrink-0 group">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/20 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-8 right-8 z-10 w-12 h-12 bg-white flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
            aria-label="Close dossier"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute bottom-12 left-12">
            <div className="flex flex-col gap-2">
              <span className="text-technical text-[10px] text-white tracking-[0.3em] font-bold">CASE_STUDY // {project.ref}</span>
              <h1 className="text-narrative text-6xl md:text-8xl text-white leading-tight">
                {project.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-12 py-16 md:px-20 md:py-24">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-20">
            <aside className="w-full md:w-64 shrink-0 flex flex-col gap-12">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <span className="text-technical text-[10px] text-ink/40 font-bold uppercase">Client</span>
                  <span className="text-technical text-sm text-ink font-bold">{project.client}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-technical text-[10px] text-ink/40 font-bold uppercase">Sector</span>
                  <span className="text-technical text-sm text-ink">{project.category}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-technical text-[10px] text-ink/40 font-bold uppercase">Year</span>
                  <span className="text-technical text-sm text-ink">{project.year}</span>
                </div>
              </div>

              <div className="h-px bg-ink/10" />

              <div className="flex flex-col gap-4">
                <span className="text-technical text-[9px] text-rust font-bold">PROJECT MEMO</span>
                <p className="font-sans text-[13px] leading-relaxed text-ink/62 italic font-light">
                  {project.imageDescription || 'Strategic narrative documentation for this engagement.'}
                </p>
              </div>
            </aside>

            <main className="flex-1 flex flex-col gap-16">
              <div className="flex flex-col gap-8">
                <h3 className="text-narrative text-3xl text-ink max-w-2xl leading-relaxed">
                  &quot;{project.tensionStatement || project.description}&quot;
                </h3>

                <div className="flex flex-col gap-8 text-ink/80 font-sans font-light text-lg md:text-xl leading-relaxed max-w-3xl">
                  <p>{project.situation}</p>
                  <p>{project.problem}</p>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/work/${project.slug}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-rust hover:text-ink transition-colors"
                  >
                    Open Full Dossier
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="aspect-[4/5] bg-ink/5 relative overflow-hidden rounded-[2px]">
                  <Image
                    src={project.image}
                    alt="Detail view"
                    fill
                    className="object-cover opacity-80 mix-blend-multiply transition-transform duration-[2s] hover:scale-110"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <span className="text-technical text-[9px] text-ink/40 font-bold">FIG_01 // ARCHIVE_FRAME</span>
                  </div>
                </div>
                <div className="flex flex-col justify-end p-8 border border-ink/10 rounded-[2px]">
                  <p className="text-narrative text-lg text-ink/62">
                    {project.engagementSummary}
                  </p>
                </div>
              </div>

              <div className="h-px bg-ink/10 mt-12" />

              <footer className="flex items-center justify-between opacity-45 mb-20">
                <span className="text-technical text-[9px] font-bold tracking-[0.5em] uppercase text-ink">END OF DOSSIER PREVIEW</span>
                <span className="font-mono text-[9px] text-ink">REF: {project.ref} / {project.year}</span>
              </footer>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
