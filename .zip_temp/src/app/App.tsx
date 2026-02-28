import React, { useState } from "react";
import { HeroV1, HeroV2, HeroV3 } from "./components/protagonist/HeroVariations";
import { NarrativeV1, NarrativeV2, NarrativeV3 } from "./components/protagonist/NarrativeVariations";
import { CapabilitiesV1, CapabilitiesV2, CapabilitiesV3 } from "./components/protagonist/CapabilitiesVariations";
import { cn } from "./components/protagonist/utils";

type SectionType = "hero" | "narrative" | "capabilities";
type VariationType = 1 | 2 | 3;

const VariationSelector = ({ 
  current, 
  onChange 
}: { 
  current: VariationType; 
  onChange: (v: VariationType) => void 
}) => (
  <div className="flex gap-2 mb-4 bg-white/10 backdrop-blur-md p-1 rounded-full inline-flex border border-white/20">
    {[1, 2, 3].map((v) => (
      <button
        key={v}
        onClick={() => onChange(v as VariationType)}
        className={cn(
          "px-4 py-1 rounded-full text-xs uppercase font-bold tracking-widest transition-all",
          current === v 
            ? "bg-[#C83C2F] text-white shadow-lg" 
            : "text-neutral-500 hover:text-neutral-900 bg-transparent"
        )}
      >
        Var {v}
      </button>
    ))}
  </div>
);

export default function App() {
  const [heroVar, setHeroVar] = useState<VariationType>(1);
  const [narrativeVar, setNarrativeVar] = useState<VariationType>(1);
  const [capabilitiesVar, setCapabilitiesVar] = useState<VariationType>(1);

  return (
    <div className="min-h-screen bg-[#E5E5E5] font-['Karla'] pb-32">
      {/* Header for the Review Page */}
      <header className="fixed top-0 left-0 w-full bg-[#0A0A0A] text-white z-50 py-3 px-6 flex justify-between items-center border-b border-[#2C2C2C]">
        <div className="text-sm font-bold tracking-widest uppercase text-[#9B9EA4]">
          Protagonist Ink <span className="text-[#C83C2F]">Redesign</span>
        </div>
        <div className="text-xs text-[#555]">
          Senior Design Review
        </div>
      </header>

      <div className="pt-20 container mx-auto px-4 max-w-7xl space-y-24">
        
        {/* HERO SECTION REVIEW */}
        <div className="space-y-4">
          <div className="flex justify-between items-end border-b border-neutral-300 pb-2">
            <div>
              <h2 className="text-xl font-bold text-[#0A0A0A]">1. Hero Section</h2>
              <p className="text-sm text-[#555]">Goal: Fix flatness, add depth & editorial hierarchy.</p>
            </div>
            <VariationSelector current={heroVar} onChange={setHeroVar} />
          </div>
          
          <div className="border border-neutral-200 shadow-2xl rounded-lg overflow-hidden relative group">
             {/* Render Hero Variation */}
             <div className="bg-white min-h-[800px]">
               {heroVar === 1 && <HeroV1 />}
               {heroVar === 2 && <HeroV2 />}
               {heroVar === 3 && <HeroV3 />}
             </div>
             <div className="absolute top-4 right-4 bg-black/80 text-white text-[10px] px-2 py-1 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
               {heroVar === 1 && "Ghosted Clarity + Texture"}
               {heroVar === 2 && "Stark Typographic"}
               {heroVar === 3 && "Aggressive Image Integration"}
             </div>
          </div>
        </div>

        {/* NARRATIVE SECTION REVIEW */}
        <div className="space-y-4">
          <div className="flex justify-between items-end border-b border-neutral-300 pb-2">
            <div>
              <h2 className="text-xl font-bold text-[#0A0A0A]">2. Narrative Section</h2>
              <p className="text-sm text-[#555]">Goal: Connect image & headline, fix decorative feel.</p>
            </div>
            <VariationSelector current={narrativeVar} onChange={setNarrativeVar} />
          </div>

          <div className="border border-neutral-200 shadow-2xl rounded-lg overflow-hidden relative group">
             <div className="bg-white min-h-[600px] flex items-center">
               {narrativeVar === 1 && <NarrativeV1 />}
               {narrativeVar === 2 && <NarrativeV2 />}
               {narrativeVar === 3 && <NarrativeV3 />}
             </div>
             <div className="absolute top-4 right-4 bg-black/80 text-white text-[10px] px-2 py-1 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
               {narrativeVar === 1 && "Image Forward (Bleed)"}
               {narrativeVar === 2 && "Type Forward (Editorial)"}
               {narrativeVar === 3 && "Minimal High-Contrast"}
             </div>
          </div>
        </div>

        {/* CAPABILITIES SECTION REVIEW */}
        <div className="space-y-4">
          <div className="flex justify-between items-end border-b border-neutral-300 pb-2">
            <div>
              <h2 className="text-xl font-bold text-[#0A0A0A]">3. Capabilities Transition</h2>
              <p className="text-sm text-[#555]">Goal: Create a turn/pivot, escalation.</p>
            </div>
            <VariationSelector current={capabilitiesVar} onChange={setCapabilitiesVar} />
          </div>

          <div className="border border-neutral-200 shadow-2xl rounded-lg overflow-hidden relative group">
             <div className="bg-white min-h-[600px] flex items-center">
               {capabilitiesVar === 1 && <CapabilitiesV1 />}
               {capabilitiesVar === 2 && <CapabilitiesV2 />}
               {capabilitiesVar === 3 && <CapabilitiesV3 />}
             </div>
             <div className="absolute top-4 right-4 bg-black/80 text-white text-[10px] px-2 py-1 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
               {capabilitiesVar === 1 && "Tone Shift (Escalation)"}
               {capabilitiesVar === 2 && "Deep Indigo Structure"}
               {capabilitiesVar === 3 && "Broken Grid (Tension)"}
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
