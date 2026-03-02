'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import { normalizeEnvValue } from './lib/env';

const DEFAULT_SANITY_PROJECT_ID = 'dkok2iir';
const DEFAULT_SANITY_DATASET = 'production';

function getPublicEnvWithDefault(name: 'NEXT_PUBLIC_SANITY_PROJECT_ID' | 'NEXT_PUBLIC_SANITY_DATASET') {
  const value = normalizeEnvValue(process.env[name]);
  if (value) return value;
  return name === 'NEXT_PUBLIC_SANITY_PROJECT_ID'
    ? DEFAULT_SANITY_PROJECT_ID
    : DEFAULT_SANITY_DATASET;
}

export default defineConfig({
  name: 'protagonist-ink',
  title: 'Protagonist Ink',
  basePath: '/studio',

  projectId: getPublicEnvWithDefault('NEXT_PUBLIC_SANITY_PROJECT_ID'),
  dataset: getPublicEnvWithDefault('NEXT_PUBLIC_SANITY_DATASET'),

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
