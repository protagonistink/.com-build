export const ABOUT_EASE = [0.22, 1, 0.36, 1] as const;

export const ABOUT_VIEWPORT = {
  once: true,
  amount: 0.2,
} as const;

export const ABOUT_FADE_UP = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: ABOUT_VIEWPORT,
} as const;

export const ABOUT_SCROLL_EASE = [0.16, 1, 0.3, 1] as const;

export const TYPEWRITER_SLOW = { wordDelay: 120, initialDelay: 400 } as const;
export const TYPEWRITER_FAST = { wordDelay: 80, initialDelay: 200 } as const;
