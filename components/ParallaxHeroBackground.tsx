'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';

export default function ParallaxHeroBackground({ src, alt }: { src: string; alt: string }) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    // Parallax effect: image container moves down at 30% speed of scroll
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

    return (
        <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div style={{ y }} className="absolute inset-0 h-[120%] -top-[10%]">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
            </motion.div>

            {/* Cinematic Vignette Layers */}
            {/* 1. Subtle perimeter darkening to frame the shot naturally */}
            <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.4)] pointer-events-none" />

            {/* 2. Focused dark gradient from the bottom to protect the headline text */}
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

            {/* 3. Left-edge fade so text stays legible against the illustration */}
            <div className="absolute top-0 left-0 bottom-0 w-1/2 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
        </div>
    );
}
