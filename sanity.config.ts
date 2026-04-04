'use client';

import {visionTool} from '@sanity/vision';
import {defineConfig} from 'sanity';
import {defineDocuments, defineLocations, presentationTool} from 'sanity/presentation';
import {structureTool} from 'sanity/structure';
import {media} from 'sanity-plugin-media';
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash';
import {normalizeEnvValue} from './lib/env';
import {schemaTypes} from './sanity/schemaTypes';
import {structure} from './sanity/structure';
import {BrandLogo} from './sanity/studio/BrandLogo';
import {StudioLayoutWrapper} from './sanity/studio/StudioLayoutWrapper';
import {caseStudyTemplates} from './sanity/templates';
import {sanityTheme} from './sanity/theme';

const DEFAULT_SANITY_PROJECT_ID = 'dkok2iir';
const DEFAULT_SANITY_DATASET = 'production';

const presentationDocuments = defineDocuments([
  {
    route: '/work/:slug',
    filter: `_type == "caseStudy" && slug.current == $slug`,
    params: ({params}) => ({slug: params.slug}),
  },
  {
    route: '/blog/:slug',
    filter: `_type == "post" && slug.current == $slug`,
    params: ({params}) => ({slug: params.slug}),
  },
  {
    route: '/',
    type: 'siteSettings',
  },
]);

const presentationLocations = {
  caseStudy: defineLocations({
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    resolve: (document) => {
      if (!document?.slug) {
        return {
          message: 'Generate a slug before opening this case study in Presentation.',
          tone: 'caution',
        };
      }

      return {
        locations: [
          {
            title: document.title || 'Untitled case study',
            href: `/work/${document.slug}`,
          },
        ],
      };
    },
  }),
  post: defineLocations({
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    resolve: (document) => {
      if (!document?.slug) {
        return {
          message: 'Generate a slug before opening this post in Presentation.',
          tone: 'caution',
        };
      }

      return {
        locations: [
          {
            title: document.title || 'Untitled post',
            href: `/blog/${document.slug}`,
          },
        ],
      };
    },
  }),
  siteSettings: defineLocations({
    select: {
      title: 'title',
    },
    resolve: () => ({
      locations: [
        {
          title: 'Homepage',
          href: '/',
        },
      ],
    }),
  }),
};

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
    presentationTool({
      allowOrigins: ['https://www.protagonist.ink', 'https://protagonist.ink', 'http://localhost:3000'],
      previewUrl: {
        origin: 'https://www.protagonist.ink',
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
      resolve: {
        mainDocuments: presentationDocuments,
        locations: presentationLocations,
      },
    }),
    media(),
    visionTool({defaultApiVersion: '2026-03-02'}),
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

});
