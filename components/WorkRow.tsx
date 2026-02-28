'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/types/work';

export default function WorkRow({ project, index = 0 }: { project: Project; index?: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Desktop row */}
      <div
        ref={rowRef}
        className="hidden lg:grid grid-cols-12 gap-6 items-center py-8 -mx-6 px-6 relative overflow-hidden transition-colors duration-500 reveal reveal-left"
        style={{ transitionDelay: `${index * 0.08}s` }}
      >
        {/* Rust accent line — editorial mark */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-[3px] bg-rust transition-all duration-500 ease-out ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'
          }`}
        />

        {/* Ambient image wash — ghostly color bleed */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-out pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={project.image}
            alt=""
            fill
            className="object-cover blur-[80px] opacity-[0.07] scale-150"
            sizes="100vw"
            aria-hidden="true"
          />
        </div>

        {/* Scene number */}
        <div className="col-span-1 relative z-10">
          <span className="text-technical text-[11px] text-ink/25 group-hover:text-rust transition-colors duration-500">
            {project.scene}
          </span>
        </div>

        {/* Title + inline image peek */}
        <div className="col-span-4 relative z-10">
          <div className="flex items-center gap-6">
            <h2 className="font-serif text-3xl lg:text-[2.2rem] font-light italic text-ink/80 group-hover:text-ink transition-colors duration-500 leading-tight shrink-0">
              {project.title}
            </h2>

            {/* Image peek — the contact sheet frame */}
            <div
              className={`relative overflow-hidden rounded-sm shrink-0 transition-all duration-500 ease-out ${
                isHovered
                  ? 'w-[120px] h-[80px] opacity-100 translate-x-0'
                  : 'w-0 h-[80px] opacity-0 -translate-x-2'
              }`}
            >
              <Image
                src={project.image}
                alt=""
                fill
                className="object-cover"
                sizes="120px"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Client */}
        <div className="col-span-2 relative z-10">
          <span className="text-[13px] text-ink/40 group-hover:text-ink/60 transition-colors duration-500">
            {project.client}
          </span>
        </div>

        {/* Description */}
        <div className="col-span-3 relative z-10">
          <p className="text-[13px] text-ink/35 group-hover:text-ink/55 transition-colors duration-500 leading-relaxed pr-8">
            {project.description}
          </p>
        </div>

        {/* Year */}
        <div className="col-span-1 relative z-10">
          <span className="text-[12px] text-ink/25 tabular-nums">
            {project.year}
          </span>
        </div>

        {/* Ref */}
        <div className="col-span-1 text-right relative z-10">
          <span className="text-technical text-[10px] text-ink/20 group-hover:text-ink/40 transition-colors duration-500">
            {project.ref}
          </span>
        </div>
      </div>

      {/* Mobile / tablet card */}
      <div
        className="lg:hidden py-8 md:py-10 reveal reveal-left"
        style={{ transitionDelay: `${index * 0.08}s` }}
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <span className="text-technical text-[10px] text-ink/25 mt-2 shrink-0">
            {project.scene}
          </span>
          <span className="text-technical text-[10px] text-ink/20 mt-2 shrink-0">
            {project.ref}
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-light italic text-ink/80 leading-tight mb-3">
          {project.title}
        </h2>
        <div className="flex items-center gap-3 text-[12px] text-ink/35 mb-3">
          <span>{project.client}</span>
          <span className="text-ink/15">/</span>
          <span>{project.category}</span>
          <span className="text-ink/15">/</span>
          <span className="tabular-nums">{project.year}</span>
        </div>
        <p className="text-[13px] text-ink/35 leading-relaxed max-w-md">
          {project.description}
        </p>

        {/* Mobile image peek */}
        <div className="relative mt-6 aspect-[16/9] overflow-hidden bg-ink/[0.03]">
          <Image
            src={project.image}
            alt={project.imageDescription || project.title}
            fill
            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#FAFAFA] to-transparent" />
          <div className="absolute bottom-3 left-4">
            <span className="text-technical text-[9px] text-ink/30">
              {project.imageLabel}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
