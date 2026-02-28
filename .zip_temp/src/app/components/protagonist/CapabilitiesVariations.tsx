import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn, IMAGES } from "./utils";

// Variation 1: The Shift (Typography Enacting Transformation)
// Replaces the "Split" concept.
// This variation uses the typography itself to show the change.
export const CapabilitiesV1 = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // A clip-path transition that reveals the "roman" version over the "italic" version
  const clipPath = useTransform(scrollYProgress, [0.45, 0.55], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);

  return (
    <section ref={containerRef} className="relative w-full h-[80vh] bg-[#FAFAFA] flex flex-col justify-center items-center overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: `url(https://grainy-gradients.vercel.app/noise.svg)` }}></div>
      
      <div className="container mx-auto px-8 relative z-10 text-center">
        <div className="flex flex-col items-center">
          <span className="block font-light text-[#9B9EA4] text-[1rem] md:text-[1.25rem] mb-6 tracking-[0.2em] uppercase font-['Karla']">
            We write your
          </span>
          
          <div className="relative text-[14vw] md:text-[9rem] leading-[0.85] font-['Cormorant_Garamond']">
             {/* Base Layer: The "Before" state - Italic, lighter */}
             <span className="block italic font-light text-[#2C2C2C] opacity-30 blur-[2px]">transformation.</span>
             
             {/* Overlay Layer: The "After" state - Roman, Solid, Rust Color - Revealed on Scroll */}
             <motion.div 
               style={{ clipPath }}
               className="absolute top-0 left-0 w-full h-full text-[#C83C2F] font-normal not-italic drop-shadow-sm"
             >
               transformation.
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Variation 2: The Unrestrained (Visceral, Chaotic, Breaking the Grid)
// REVISED: Huge, aggressive, no "process" feel.
export const CapabilitiesV2 = () => {
  return (
    <section className="relative w-full min-h-[90vh] bg-[#E5E5E5] overflow-hidden flex items-center justify-center py-24">
      {/* Aggressive Background Texture */}
      <div className="absolute inset-0 opacity-10 mix-blend-difference pointer-events-none select-none">
         <img 
            src={IMAGES.ink} 
            alt="Texture" 
            className="w-full h-full object-cover scale-150 rotate-180 grayscale contrast-150"
          />
      </div>

      <div className="w-full relative z-10 container mx-auto px-4">
        <div className="relative flex flex-col items-center justify-center text-center">
          
          {/* "We write your" - A sharp interjection */}
          <div className="absolute -top-12 left-[5%] md:left-[20%] z-20 -rotate-3 mix-blend-hard-light">
            <span className="font-['Karla'] text-[#FAFAFA] text-sm md:text-lg font-bold tracking-[0.2em] uppercase bg-[#0A0A0A] px-4 py-2 shadow-2xl">
              We write your
            </span>
          </div>

          {/* "TRANSFORMATION" - Broken, Huge */}
          <div className="font-['Cormorant_Garamond'] font-bold text-[#0A0A0A] leading-[0.75] tracking-tighter mix-blend-multiply w-full relative">
            <div className="text-[20vw] opacity-90 relative -left-[5vw]">TRANS</div>
            <div className="text-[20vw] text-[#C83C2F] italic font-light relative z-10 mix-blend-darken translate-x-[5vw]">FOR</div>
            <div className="text-[20vw] opacity-80 relative left-[5vw]">MATION</div>
          </div>

          {/* Chaotic Scribble */}
          <div className="absolute top-[60%] -left-[10%] w-[120%] h-[2px] bg-[#C83C2F] -rotate-6 opacity-60 mix-blend-multiply"></div>
        </div>
      </div>
    </section>
  );
};

// Variation 3: The Liminal (Atmospheric, No Spotlight)
// REVISED: Removing the "light beam". Using "void" aesthetic.
export const CapabilitiesV3 = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  
  const opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0.2, 0.4], [50, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#080808] text-[#FAFAFA] overflow-hidden flex items-center justify-center">
      {/* The Void - Pure, deep dark with subtle gradient */}
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#111111]/40 to-[#000000]"></div>
      </div>
      
      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ backgroundImage: `url(https://grainy-gradients.vercel.app/noise.svg)` }}></div>

      <div className="relative z-10 container mx-auto px-8 max-w-4xl">
        <motion.div 
          style={{ opacity, y }}
          className="flex flex-col items-center text-center space-y-16"
        >
          {/* Vertical Anchor */}
          <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-[#555] to-transparent opacity-60"></div>

          <h2 className="font-['Cormorant_Garamond'] text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] leading-[1.1] font-light tracking-wide text-[#E5E5E5]">
            <span className="opacity-50 text-base md:text-xl block mb-6 font-['Karla'] uppercase tracking-[0.3em] font-normal text-[#9B9EA4]">We write your</span>
            <span className="italic text-[#FAFAFA] font-normal block">transformation.</span>
          </h2>

           {/* Vertical Anchor continues */}
           <div className="w-[1px] h-32 bg-gradient-to-b from-[#555] via-[#555]/30 to-transparent opacity-60"></div>
        </motion.div>
      </div>
    </section>
  );
};
