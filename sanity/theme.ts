import { buildLegacyTheme } from 'sanity';

const props = {
  // Brand Colors
  '--brand-trueblack': '#131417',
  '--brand-ink': '#2C2C2C',
  '--brand-rust': '#C83C2F',
  '--brand-warmwhite': '#FAFAFA',

  // System Colors (mapped to brand)
  '--state-info-color': '#C83C2F', // rust
  '--state-success-color': '#C83C2F', // rust
  '--state-warning-color': '#f2e8b0',
  '--state-danger-color': '#C83C2F', // rust
};

export const sanityTheme = buildLegacyTheme({
  // Base theme colors
  '--black': props['--brand-trueblack'],
  '--white': props['--brand-warmwhite'],

  '--gray': props['--brand-ink'],
  '--gray-base': props['--brand-ink'],

  '--component-bg': props['--brand-trueblack'],
  '--component-text-color': props['--brand-warmwhite'],

  // Brands
  '--brand-primary': props['--brand-rust'],

  // Default button
  '--default-button-color': props['--brand-ink'],
  '--default-button-primary-color': props['--brand-rust'],

  // State
  '--state-info-color': props['--state-info-color'],
  '--state-success-color': props['--state-success-color'],
  '--state-warning-color': props['--state-warning-color'],
  '--state-danger-color': props['--state-danger-color'],

  // Navbar
  '--main-navigation-color': props['--brand-trueblack'],
  '--main-navigation-color--inverted': props['--brand-warmwhite'],

  // Focus
  '--focus-color': props['--brand-rust'],

  // Fonts
  '--font-family-base': '"Satoshi", "Avenir Next", "Segoe UI", system-ui, sans-serif',
});
