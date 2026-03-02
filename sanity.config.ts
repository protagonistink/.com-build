'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import { getRequiredEnv } from './lib/env';

function requiredPublicEnv(name: 'NEXT_PUBLIC_SANITY_PROJECT_ID' | 'NEXT_PUBLIC_SANITY_DATASET') {
  return getRequiredEnv(name);
}

export default defineConfig({
  name: 'protagonist-ink',
  title: 'Protagonist Ink',
  basePath: '/studio',

  projectId: requiredPublicEnv('NEXT_PUBLIC_SANITY_PROJECT_ID'),
  dataset: requiredPublicEnv('NEXT_PUBLIC_SANITY_DATASET'),

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
