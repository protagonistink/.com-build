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
            {/* 0. Lightening scrim to lift image toward homepage brightness */}
            <div className="absolute inset-0 bg-white/15 pointer-events-none" />

            {/* 1. Perimeter darkening */}
            <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.5)] pointer-events-none" />

            {/* 2. Bottom gradient to protect headline text */}
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

            {/* 3. Left-edge fade for text legibility */}
            <div className="absolute top-0 left-0 bottom-0 w-1/2 bg-gradient-to-r from-black/70 to-transparent pointer-events-none" />
        </div>
    );
}
