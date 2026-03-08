import type { CSSProperties } from 'react';

type Glyph = {
  width: number;
  paths: string[];
  yOffset?: number;
};

interface InkDisplayProps {
  text: string;
  className?: string;
  glyphClassName?: string;
  letterSpacing?: number;
  strokeWidth?: number;
}

const GLYPH_HEIGHT = 140;

// This is a deliberately small headline alphabet, not a full production font.
// Unsupported characters fall back to the site's existing hand face.
const GLYPHS: Record<string, Glyph> = {
  C: {
    width: 100,
    paths: ["M86 38 Q68 20 47 28 Q18 39 14 72 Q11 99 31 113 Q56 127 83 107"],
  },
  I: {
    width: 72,
    paths: ["M52 18 L34 118", "M24 26 Q44 14 63 27"],
  },
  M: {
    width: 116,
    paths: ["M12 113 Q19 84 28 38 Q31 18 40 43 Q48 66 60 84 Q68 70 79 40 Q84 25 93 113"],
  },
  a: {
    width: 82,
    paths: ["M68 79 Q61 55 42 58 Q22 62 19 86 Q18 107 33 115 Q52 124 66 111 Q74 103 74 116"],
  },
  b: {
    width: 80,
    paths: ["M52 18 L40 120", "M42 72 Q51 56 66 61 Q81 67 80 90 Q79 113 63 120 Q48 126 39 116"],
  },
  c: {
    width: 70,
    paths: ["M60 66 Q48 54 33 59 Q18 64 16 84 Q14 104 28 113 Q42 122 58 112"],
  },
  d: {
    width: 85,
    paths: ["M66 18 L58 117", "M58 76 Q48 57 31 62 Q15 69 15 91 Q16 111 31 119 Q48 127 63 113"],
  },
  e: {
    width: 78,
    paths: ["M66 84 Q58 57 39 59 Q19 62 17 87 Q16 107 31 116 Q48 125 63 111", "M24 86 Q42 78 62 81"],
  },
  g: {
    width: 84,
    paths: ["M66 77 Q57 58 41 61 Q23 65 19 86 Q16 107 31 116 Q48 126 62 112", "M64 112 Q69 124 67 134 Q64 148 48 149 Q35 150 26 143"],
  },
  h: {
    width: 84,
    paths: ["M45 18 L34 120", "M36 77 Q49 50 62 59 Q75 67 75 120"],
  },
  i: {
    width: 42,
    paths: ["M26 62 L21 118", "M34 43 Q39 35 45 42"],
    yOffset: -2,
  },
  k: {
    width: 98,
    paths: ["M48 18 L38 124", "M40 84 Q57 69 82 48", "M41 87 Q61 97 92 110"],
  },
  l: {
    width: 46,
    paths: ["M32 18 L22 120"],
  },
  m: {
    width: 114,
    paths: ["M14 118 Q21 82 31 61 Q42 42 50 63 L49 118", "M51 77 Q63 45 74 58 Q83 67 82 118", "M82 77 Q94 46 105 58 Q112 66 111 118"],
  },
  n: {
    width: 88,
    paths: ["M14 118 Q22 81 33 60 Q45 42 55 63 L53 118", "M55 77 Q67 45 81 59 Q89 67 87 118"],
  },
  o: {
    width: 82,
    paths: ["M69 67 Q60 56 45 59 Q26 63 22 84 Q18 108 34 118 Q51 127 67 114 Q81 101 79 80 Q77 72 69 67"],
  },
  p: {
    width: 82,
    paths: ["M36 60 L23 147", "M38 72 Q47 56 64 61 Q80 66 79 89 Q77 113 61 120 Q45 127 28 114"],
  },
  r: {
    width: 72,
    paths: ["M16 118 Q22 81 32 60 Q42 42 52 64", "M52 67 Q59 57 72 60"],
  },
  s: {
    width: 70,
    paths: ["M61 60 Q52 52 41 56 Q27 62 28 73 Q28 83 41 88 Q58 93 62 103 Q66 114 56 121 Q46 126 32 121 Q22 118 15 110"],
  },
  t: {
    width: 68,
    paths: ["M48 28 L35 119", "M20 67 Q42 59 63 67"],
  },
  u: {
    width: 86,
    paths: ["M18 61 Q17 85 22 104 Q28 122 37 117 Q45 112 45 92 Q45 70 47 63 Q49 55 56 58 Q67 62 74 118"],
  },
  w: {
    width: 124,
    paths: ["M12 63 Q13 84 19 104 Q26 123 34 116 Q41 109 42 90 Q43 65 50 60 Q58 55 67 118", "M67 118 Q71 84 77 62 Q83 45 92 58 Q100 69 111 118"],
  },
  y: {
    width: 86,
    paths: ["M18 61 Q17 84 22 102 Q28 121 37 116 Q45 111 45 92 Q45 71 48 62 Q51 53 58 58 Q69 65 75 118", "M61 118 Q66 130 64 142 Q61 150 47 150"],
  },
  '.': {
    width: 26,
    paths: ["M13 122 Q18 116 23 122"],
    yOffset: -2,
  },
  ',': {
    width: 28,
    paths: ["M14 123 Q20 118 23 125 Q24 132 17 140"],
  },
  "'": {
    width: 24,
    paths: ["M17 35 Q22 27 20 20"],
  },
  '-': {
    width: 44,
    paths: ["M9 88 Q22 84 36 88"],
  },
};

function cn(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(' ');
}

export default function InkDisplay({
  text,
  className,
  glyphClassName,
  letterSpacing = -0.08,
  strokeWidth = 10.5,
}: InkDisplayProps) {
  return (
    <span className={cn('inline-flex items-end align-bottom leading-none', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-flex items-end leading-none flex-wrap">
        {Array.from(text).map((char, index) => {
          if (char === ' ') {
            return (
              <span
                key={`${char}-${index}`}
                className="shrink-0"
                style={{
                  width: '0.34em',
                  marginLeft: index === 0 ? undefined : `${letterSpacing}em`,
                }}
              />
            );
          }

          const glyph = GLYPHS[char];
          const glyphStyle: CSSProperties = {
            marginLeft: index === 0 ? undefined : `${letterSpacing}em`,
          };

          if (!glyph) {
            return (
              <span
                key={`${char}-${index}`}
                className="inline-block shrink-0 font-hand not-italic"
                style={glyphStyle}
              >
                {char}
              </span>
            );
          }

          return (
            <span
              key={`${char}-${index}`}
              className={cn('inline-flex shrink-0', glyphClassName)}
              style={{
                ...glyphStyle,
                width: `${glyph.width / GLYPH_HEIGHT}em`,
                height: '1em',
                transform: glyph.yOffset ? `translateY(${glyph.yOffset / GLYPH_HEIGHT}em)` : undefined,
              }}
            >
              <svg
                viewBox={`0 0 ${glyph.width} ${GLYPH_HEIGHT}`}
                className="h-[1em] w-full overflow-visible"
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {glyph.paths.map((path) => (
                  <path key={path} d={path} vectorEffect="non-scaling-stroke" />
                ))}
              </svg>
            </span>
          );
        })}
      </span>
    </span>
  );
}
