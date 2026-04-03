'use client';

import React from 'react';
import {visionTool} from '@sanity/vision';
import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {media} from 'sanity-plugin-media';
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash';
import {normalizeEnvValue} from './lib/env';
import {schemaTypes} from './sanity/schemaTypes';
import {structure} from './sanity/structure';
import {BrandLogo} from './sanity/studio/BrandLogo';
import {StoryProgressBanner} from './sanity/studio/StoryProgressBanner';
import {StudioLayoutWrapper} from './sanity/studio/StudioLayoutWrapper';
import {caseStudyTemplates} from './sanity/templates';
import {sanityTheme} from './sanity/theme';

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
    structureTool({structure}),
    media(),
    visionTool(),
    unsplashImageAsset(),
  ],

  studio: {
    components: {
      logo: BrandLogo,
      layout: StudioLayoutWrapper,
    },
  },

  schema: {
    types: schemaTypes,
    templates: (prev) => {
      const filtered = prev.filter((t) => t.schemaType !== 'caseStudy');
      return [...filtered, ...caseStudyTemplates];
    },
  },
  
  theme: sanityTheme,

  document: {
    components: {
      unstable_layout: (props) => {
        if (props.documentType === 'caseStudy') {
          return React.createElement(
            React.Fragment,
            null,
            React.createElement(StoryProgressBanner),
            props.renderDefault(props),
          );
        }
        return props.renderDefault(props);
      },
    },
  },
});
