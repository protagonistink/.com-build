import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn, IMAGES } from "./utils";
import imgProtagonistInk from "figma:asset/b2ad16d7fc7aaa9fc242befb714b3a1f50aa5d5a.png";

// Shared Components
const Nav = ({ theme = "dark" }: { theme?: "dark" | "light" }) => (
  <nav className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50">
    <img src={imgProtagonistInk} alt="Protagonist Ink" className={cn("h-8", theme === "light" && "invert")} />
    <div className={cn("hidden md:flex gap-8 text-xs font-bold tracking-[0.1em] uppercase", theme === "light" ? "text-neutral-900" : "text-neutral-200")}>
      <a href="#">Work</a>
      <a href="#">About</a>
      <a href="#">Journal</a>
      <a href="#" className="text-[#C83C2F]">Story Health Check</a>
    </div>
  </nav>
);

const CTA = () => (
  <a
    href="#"
    className="group inline-flex items-center gap-3 text-[#C83C2F] text-sm font-bold tracking-[0.1em] uppercase hover:text-[#e04536] transition-colors"
  >
    Story Health Check $750
    <span className="group-hover:translate-x-1 transition-transform duration-300">
      <ArrowRight size={16} />
    </span>
  </a>
);

// Variation 1: Ghosted "Clarity"
export const HeroV1 = () => {
  return (
    <section className="relative h-screen w-full bg-[#0A0A0A] overflow-hidden flex flex-col justify-center">
      <Nav theme="dark" />
      
      {/* Ghosted Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none opacity-5 mix-blend-overlay">
        <span className="font-['Cormorant_Garamond'] text-[40vw] leading-none text-[#FAFAFA] italic whitespace-nowrap ml-[-10vw]">
          Clarity
        </span>
      </div>

      {/* Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url(${IMAGES.texture})`, backgroundSize: 'cover' }}
      />

      <div className="container mx-auto px-8 relative z-10 grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-9">
          <h1 className="text-[#FAFAFA] text-[5rem] md:text-[8rem] lg:text-[9rem] leading-[0.85] tracking-tight mb-8 font-['Cormorant_Garamond']">
            <span className="block font-normal">The noise</span>
            <span className="block italic font-light text-[#9B9EA4] ml-12 md:ml-24">is winning.</span>
          </h1>
        </div>
        
        <div className="col-span-12 lg:col-start-2 lg:col-span-5 mt-8 md:mt-12 space-y-8">
          <p className="font-['Karla'] text-[#9B9EA4] text-lg md:text-xl leading-relaxed max-w-lg">
            You have something real to say. Board misalignment, AI-generated sprawl, and fragmented messaging are burying it. Every week without a clear story is a week your competitors don’t have to be better — just louder.
          </p>
          <CTA />
        </div>
      </div>
    </section>
  );
};

// Variation 2: Typographic (Stark, Editorial)
export const HeroV2 = () => {
  return (
    <section className="relative h-screen w-full bg-[#FAFAFA] text-[#0A0A0A] overflow-hidden flex flex-col justify-center">
      <Nav theme="light" />
      
      {/* Subtle Grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: `url(https://grainy-gradients.vercel.app/noise.svg)` }}></div>

      <div className="container mx-auto px-8 relative z-10 grid grid-cols-12 gap-4 h-full items-center">
        <div className="col-span-12 lg:col-span-10 flex flex-col justify-center h-full relative">
          {/* Vertical Line for Tension */}
          <div className="absolute left-[-2rem] top-0 bottom-0 w-[1px] bg-[#2C2C2C] opacity-10 hidden lg:block"></div>

          <h1 className="text-[#2C2C2C] text-[6rem] md:text-[10rem] leading-[0.8] tracking-[-0.04em] font-['Cormorant_Garamond'] mb-12">
            <span className="block font-medium">The noise</span>
            <span className="block italic font-light text-[#C83C2F] translate-x-12 md:translate-x-24">is winning.</span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16 ml-2 md:ml-12">
            <p className="font-['Karla'] text-[#2C2C2C] text-lg md:text-xl leading-relaxed max-w-md font-medium border-l border-[#C83C2F] pl-6">
              You have something real to say. But fragmented messaging is burying it.
            </p>
            <div className="mb-2">
              <CTA />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Variation 3: Image Integrated (Aggressive)
export const HeroV3 = () => {
  return (
    <section className="relative h-screen w-full bg-[#0A0A0A] text-[#FAFAFA] overflow-hidden">
      <Nav theme="dark" />
      
      <div className="absolute inset-0 z-0">
        <img 
          src={IMAGES.ink} 
          alt="Ink Texture" 
          className="w-full h-full object-cover opacity-60 mix-blend-luminosity scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-8 relative z-10 h-full flex flex-col justify-center grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8">
          <h1 className="text-[#FAFAFA] text-[5rem] md:text-[8.5rem] leading-[0.85] tracking-tighter font-['Cormorant_Garamond'] relative">
            <span className="relative z-10 block font-normal mix-blend-difference">The noise</span>
            <span className="relative z-10 block italic font-light ml-8 md:ml-20 text-transparent bg-clip-text bg-gradient-to-r from-[#FAFAFA] to-[#9B9EA4]">is winning.</span>
          </h1>
        </div>

        <div className="col-span-12 lg:col-start-1 lg:col-span-5 mt-12 pl-4 border-l-2 border-[#C83C2F]/50">
          <p className="font-['Karla'] text-[#D1D5DC] text-lg leading-relaxed mb-8">
            Board misalignment, AI-generated sprawl, and fragmented messaging are burying your story.
          </p>
          <CTA />
        </div>
      </div>
    </section>
  );
};
