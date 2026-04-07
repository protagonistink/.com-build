'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

export default function ActInk() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-8%' });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-trueblack"
      style={{ height: '42vh' }}
      aria-hidden="true"
    >
      {/* Top fade — blends from paper above */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-paper to-transparent z-20 pointer-events-none" />

      {/* Video */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      >
        {!prefersReduced && inView && (
          <iframe
            src="https://player.vimeo.com/video/1104985427?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1&controls=0&background=1&title=0&byline=0&portrait=0&vimeo_logo=0&watch_full_video=0"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              /* 5:2 aspect ratio (padding=40%) cover math:
                 height = 40vw keeps native ratio at full width;
                 250vh ensures cover when viewport is taller than wide */
              width: '250vh',
              height: '40vw',
              minWidth: '100%',
              minHeight: '100%',
              transform: 'translate(-50%, -50%)',
              border: 'none',
            }}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
            title=""
          />
        )}
      </motion.div>

      {/* Film grain */}
      <div className="absolute inset-0 texture-grain opacity-[0.04] pointer-events-none z-10 mix-blend-overlay" />

      {/* Bottom editorial rule */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-paper/10 z-10" />
    </section>
  );
}
