'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface ScrollRevealWrapperProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'left' | 'right' | 'down';
}

export default function ScrollRevealWrapper({
    children,
    className = '',
    delay = 0,
    direction = 'up',
}: ScrollRevealWrapperProps) {
    const getVariants = () => {
        switch (direction) {
            case 'left':
                return { hidden: { opacity: 0, x: -48 }, visible: { opacity: 1, x: 0 } };
            case 'right':
                return { hidden: { opacity: 0, x: 48 }, visible: { opacity: 1, x: 0 } };
            case 'down':
                return { hidden: { opacity: 0, y: -48 }, visible: { opacity: 1, y: 0 } };
            case 'up':
            default:
                return { hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0 } };
        }
    };

    return (
        <motion.div
            variants={getVariants()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{
                duration: 0.9,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
