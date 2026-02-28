import React from "react";
import { motion } from "motion/react";
import { cn, IMAGES } from "./utils";
import { ArrowRight } from "lucide-react";

const Headline = () => (
  <h2 className="text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[0.95] tracking-tight font-['Cormorant_Garamond'] text-[#2C2C2C]">
    <span className="block font-light">Most founders can feel</span>
    <span className="block italic">when their story isn’t</span>
    <span className="block font-light">working.</span>
  </h2>
);

const BodyText = () => (
  <div className="space-y-6 font-['Karla'] text-[#2C2C2C] text-lg leading-relaxed max-w-md">
    <p>
      The problem isn’t your product. It’s that your narrative hasn’t caught up to what you actually built.
    </p>
    <div className="w-12 h-[1px] bg-[#C83C2F]"></div>
    <p className="opacity-80 text-base">
      Investors nod politely. Customers need too much explaining. The board keeps reframing what you do. When the story is right, everything else gets easier.
    </p>
    <a href="#" className="inline-flex items-center gap-2 text-[#C83C2F] text-xs font-bold tracking-[0.1em] uppercase mt-4 group">
      Get the Story Health Check
      <span className="group-hover:translate-x-1 transition-transform"><ArrowRight size={14} /></span>
    </a>
  </div>
);

// Variation 1: Image Forward (Overlap/Bleed)
export const NarrativeV1 = () => {
  return (
    <section className="relative w-full py-24 bg-[#FAFAFA] overflow-hidden">
      <div className="container mx-auto px-8 grid grid-cols-12 gap-8 items-center">
        {/* Image overlaps the text area slightly */}
        <div className="col-span-12 lg:col-span-7 relative z-10">
          <div className="aspect-[4/5] w-full overflow-hidden shadow-2xl">
            <img 
              src={IMAGES.portrait} 
              alt="Narrative Visual" 
              className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-700 hover:scale-105"
            />
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-8 -left-8 w-full h-full border border-[#2C2C2C]/10 -z-10 hidden lg:block"></div>
        </div>

        <div className="col-span-12 lg:col-span-5 relative z-20 lg:-ml-24 mt-8 lg:mt-0 bg-[#FAFAFA]/90 backdrop-blur-sm p-8 lg:p-12 shadow-lg border-l-4 border-[#C83C2F]">
          <Headline />
          <div className="mt-8">
            <BodyText />
          </div>
        </div>
      </div>
    </section>
  );
};

// Variation 2: Type Forward (Editorial)
export const NarrativeV2 = () => {
  return (
    <section className="relative w-full py-32 bg-[#FAFAFA]">
      <div className="container mx-auto px-8 grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-10 lg:col-start-2 text-center mb-16">
          <h2 className="text-[4rem] md:text-[6rem] lg:text-[7.5rem] leading-[0.85] tracking-tight font-['Cormorant_Garamond'] text-[#2C2C2C]">
            Most founders can <span className="italic text-[#9B9EA4]">feel</span> when <br className="hidden md:block"/>
            their story isn’t working.
          </h2>
        </div>

        <div className="col-span-12 grid grid-cols-12 gap-8 items-start mt-12 border-t border-[#2C2C2C]/10 pt-12">
          {/* Small integrated image */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3 lg:col-start-2">
            <div className="aspect-[3/4] overflow-hidden">
              <img src={IMAGES.architecture} className="w-full h-full object-cover grayscale contrast-125" alt="Detail" />
            </div>
          </div>
          
          <div className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-6">
            <p className="font-['Karla'] text-2xl md:text-3xl leading-tight text-[#2C2C2C] mb-8 font-light">
              The problem isn’t your product. It’s that your narrative hasn’t caught up to what you actually built.
            </p>
            <BodyText />
          </div>
        </div>
      </div>
    </section>
  );
};

// Variation 3: Minimal High Contrast (Stark)
export const NarrativeV3 = () => {
  return (
    <section className="relative w-full py-24 bg-[#2C2C2C] text-[#FAFAFA]">
      <div className="container mx-auto px-8 grid grid-cols-12 gap-8 h-full items-center">
        
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-center border-r border-[#FAFAFA]/10 pr-8">
           <h2 className="text-[3.5rem] md:text-[5rem] lg:text-[6rem] leading-[0.9] tracking-tight font-['Cormorant_Garamond'] text-[#FAFAFA]">
            Most founders <br/>
            <span className="italic text-[#C83C2F] ml-16">can feel</span> <br/>
            when it breaks.
          </h2>
        </div>

        <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex flex-col justify-center space-y-12">
          <div className="relative">
             <img 
              src={IMAGES.ink} 
              alt="Ink" 
              className="w-full h-64 object-cover opacity-40 mix-blend-screen"
            />
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#C83C2F]"></div>
          </div>

          <div className="space-y-6">
            <p className="font-['Karla'] text-[#9B9EA4] text-xl leading-relaxed">
              It’s not the product. It’s the narrative lag.
            </p>
            <p className="font-['Karla'] text-[#FAFAFA] text-lg leading-relaxed">
              Investors nod politely. Customers need explaining. The board reframes you.
              <br/>
              <span className="text-[#C83C2F] block mt-4 font-bold uppercase tracking-widest text-xs">It stops here.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
