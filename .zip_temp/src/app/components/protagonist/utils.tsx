import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Images from Figma imports (re-declaring here for easy access across components)
// In a real app we might pass these as props, but for this generation we'll import them directly in the components if needed,
// or just use these constants if we can make the imports work.
// Since these are "figma:asset" imports, they must be at the top level of the file where they are used.
// So I will just export the Unsplash URLs here and the color palette.

export const COLORS = {
  ink: "#2C2C2C",
  warmWhite: "#FAFAFA",
  black: "#0A0A0A",
  rust: "#C83C2F",
  deepIndigo: "#2E2B5F",
  coolGray: "#9B9EA4",
};

export const IMAGES = {
  texture: "https://images.unsplash.com/photo-1766153550988-121007d31002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjB0ZXh0dXJlJTIwbGlnaHQlMjBsZWFrJTIwY2luZW1hdGljJTIwZ3JhaW58ZW58MXx8fHwxNzcxNzA4MzY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  portrait: "https://images.unsplash.com/photo-1761001312913-85febcd1b35a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBwb3J0cmFpdCUyMHNpbGhvdWV0dGUlMjBzaGFkb3clMjBtb29keXxlbnwxfHx8fDE3NzE3MDgzNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  architecture: "https://images.unsplash.com/photo-1765445603100-2c68185147cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlJTIwY29uY3JldGUlMjBsaWdodCUyMHNoYWRvdyUyMGFic3RyYWN0fGVufDF8fHx8MTc3MTcwODM2NXww&ixlib=rb-4.1.0&q=80&w=1080",
  ink: "https://images.unsplash.com/photo-1658303554241-b010c61f6dc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmslMjBpbiUyMHdhdGVyJTIwYWJzdHJhY3QlMjBibGFjayUyMGFuZCUyMHdoaXRlJTIwbWFjcm98ZW58MXx8fHwxNzcxNzA4MzY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  lightBeam: "https://images.unsplash.com/photo-1666883349853-ae08edcaa9d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodCUyMGJlYW0lMjB0aHJvdWdoJTIwZGFya25lc3MlMjBjaW5lbWF0aWMlMjBhdG1vc3BoZXJlJTIwZHVzdHxlbnwxfHx8fDE3NzE3MjU4NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  inkSpreading: "https://images.unsplash.com/photo-1620462654468-7adc0e3e0eb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmslMjBzcHJlYWRpbmclMjBpbiUyMHdhdGVyJTIwYmxhY2slMjBhbmQlMjB3aGl0ZSUyMG1hY3JvJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzcxNzI1ODcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  blurredLight: "https://images.unsplash.com/photo-1769521685437-12f319f39af4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGJsdXJyZWQlMjBtb3Rpb24lMjBsaWdodCUyMHN0cmVha3MlMjBjaW5lbWF0aWMlMjBtb29keXxlbnwxfHx8fDE3NzE3MjU4NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
