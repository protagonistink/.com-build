'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { assist } from '@sanity/assist';
import { media } from 'sanity-plugin-media';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { pexelsImageAsset } from 'sanity-plugin-asset-source-pexels';
import { youtubeInput } from 'sanity-plugin-youtube-input';
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

const pexelsApiKey = normalizeEnvValue(process.env.NEXT_PUBLIC_PEXELS_API_KEY);
const youtubeApiKey = normalizeEnvValue(process.env.NEXT_PUBLIC_YOUTUBE_API_KEY);

export default defineConfig({
  name: 'protagonist-ink',
  title: 'Protagonist Ink',
  basePath: '/studio',

  projectId: getPublicEnvWithDefault('NEXT_PUBLIC_SANITY_PROJECT_ID'),
  dataset: getPublicEnvWithDefault('NEXT_PUBLIC_SANITY_DATASET'),

  plugins: [
    structureTool(),
    visionTool(),
    media(),
    unsplashImageAsset(),
    pexelsApiKey ? pexelsImageAsset({ API_KEY: pexelsApiKey }) : pexelsImageAsset({ useProxyClient: true }),
    youtubeInput({ apiKey: youtubeApiKey }),
    assist(),
  ],

  schema: {
    types: schemaTypes,
  },
});
