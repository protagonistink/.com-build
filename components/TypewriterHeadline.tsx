'use client';

import { useEffect, useRef, useState } from 'react';

interface TypewriterHeadlineProps {
  text: string;
  className?: string;
  /** Delay between each word in ms */
  wordDelay?: number;
  /** Delay before the first word appears in ms */
  initialDelay?: number;
  /** Show a blinking cursor after the last word */
  showCursor?: boolean;
  /** Color class for the cursor (defaults to rust) */
  cursorColor?: string;
}

export default function TypewriterHeadline({
  text,
  className = '',
  wordDelay = 90,
  initialDelay = 200,
  showCursor = false,
  cursorColor = 'bg-[var(--color-rust)]',
}: TypewriterHeadlineProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [cursorGone, setCursorGone] = useState(false);
  const words = text.split(/\s+/);
  const totalDuration = initialDelay + words.length * wordDelay;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // After 4 blink cycles, smoothly fade the cursor away
  useEffect(() => {
    if (!triggered || !showCursor) return;
    const BLINK_DURATION = 1400; // matches cursor-blink keyframe duration (ms)
    const BLINK_CYCLES = 4;
    const delay = totalDuration + 300 + BLINK_DURATION * BLINK_CYCLES + 200;
    const timer = setTimeout(() => setCursorGone(true), delay);
    return () => clearTimeout(timer);
  }, [triggered, showCursor, totalDuration]);

  return (
    <span ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            opacity: triggered ? 1 : 0,
            animation: triggered
              ? `typewriter-word 0.45s cubic-bezier(0.22, 1, 0.36, 1) ${initialDelay + i * wordDelay}ms both`
              : 'none',
          }}
        >
          {word}
          {i < words.length - 1 && <>&nbsp;</>}
        </span>
      ))}
      {showCursor && (
        <span
          className="inline-block ml-[0.08em] align-baseline"
          style={{
            opacity: triggered && !cursorGone ? 1 : 0,
            transition: cursorGone ? 'opacity 0.8s ease' : undefined,
            animation: triggered && !cursorGone
              ? `typewriter-word 0.3s ease ${totalDuration}ms both, cursor-blink 1.4s step-end ${totalDuration + 300}ms 4`
              : 'none',
          }}
        >
          <span
            className={`inline-block w-[2px] ${cursorColor}`}
            style={{ height: '0.65em', verticalAlign: '-0.04em' }}
            aria-hidden="true"
          />
        </span>
      )}
    </span>
  );
}
