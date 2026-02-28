'use client';

import React from 'react';
import Image from 'next/image';
import { Project } from '@/types/work';

interface WorkPortalProps {
  activeProject: Project | null;
}

export default function WorkPortal({ activeProject }: WorkPortalProps) {
  if (!activeProject) {
    return (
      <div className="flex-1 h-full bg-ink flex items-center justify-center overflow-hidden">
        <div className="text-technical text-[10px] text-white/15 tracking-[0.45em]">
          SELECT A CASE TO PREVIEW
        </div>

        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white" />
          <div className="absolute top-[10%] left-[10%] w-8 h-8 border-t border-l border-white" />
          <div className="absolute bottom-[10%] right-[10%] w-8 h-8 border-b border-r border-white" />
          <div className="absolute top-1/2 left-12 transform -translate-y-1/2 text-[8px] tracking-widest text-white -rotate-90 origin-left">
            PREVIEW_IDLE
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full bg-ink relative overflow-hidden">
      <div className="absolute inset-0 transition-opacity duration-300 pointer-events-none">
        <div key={activeProject.id} className="relative w-full h-full animate-in fade-in zoom-in-95 duration-200">
          <Image
            src={activeProject.image}
            alt={activeProject.title}
            fill
            className="object-cover desaturate-[0.2] contrast-[1.1] brightness-[0.8]"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
          <div className="absolute inset-0 bg-ink/20 mix-blend-multiply" />
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none texture-grain" />

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-12 left-12 flex gap-4 items-center">
              <div className="w-12 h-px bg-white/20" />
              <span className="text-technical text-[10px] text-white/45">{activeProject.ref}</span>
              <div className="w-1.5 h-1.5 rounded-full border border-rust/40" />
            </div>

            <div className="absolute bottom-12 right-12 flex flex-col items-end gap-2">
              <span className="text-technical text-[8px] text-white/25 tracking-tighter">{activeProject.scene} · PORTAL</span>
              <div className="w-32 h-[1px] bg-white/10" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-12 right-12 z-10 pointer-events-none">
        <div className="flex flex-col gap-8 max-w-xl animate-in slide-in-from-bottom-8 duration-500 ease-out">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-rust" />
              <span className="text-technical text-[10px] text-white/60 tracking-[0.2em] uppercase">
                {activeProject.imageLabel || 'VISUAL ARTIFACT'}
              </span>
            </div>
            <h2 className="text-narrative text-6xl md:text-7xl text-white leading-none">{activeProject.title}</h2>
          </div>

          <div className="max-w-md">
            <p className="font-sans text-white/82 text-lg leading-relaxed font-light italic">
              &quot;{activeProject.tensionStatement || activeProject.description}&quot;
            </p>
          </div>
        </div>
      </div>

      <div className="absolute top-12 right-12 flex items-center gap-2 z-10">
        <div className="w-2 h-2 bg-rust rounded-full animate-pulse shadow-[0_0_8px_rgba(200,60,47,0.5)]" />
        <span className="text-technical text-[10px] text-white/80">ACTIVE PREVIEW</span>
      </div>
    </div>
  );
}
