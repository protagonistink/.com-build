export const studioCSS = `
  /* Stronger focus rings for tracking cursor position */
  [data-ui="TextInput"]:focus-within,
  [data-ui="TextArea"]:focus-within {
    box-shadow: 0 0 0 2px rgba(200, 60, 47, 0.4) !important;
  }

  /* Fieldset legends need more visual weight than field labels */
  [data-testid="fieldset-legend"] {
    font-size: 0.8125rem !important;
    letter-spacing: 0.04em !important;
    text-transform: uppercase !important;
    opacity: 0.6 !important;
  }

  /* Breathe between blocks in Story Builder array */
  [data-testid="array-item"] + [data-testid="array-item"] {
    margin-top: 6px;
  }

  /* Collapsed fieldset visual cue */
  [data-testid="fieldset"][data-collapsed="true"] {
    opacity: 0.7;
    border-left: 2px solid rgba(200, 60, 47, 0.2);
    padding-left: 8px;
  }
`;
