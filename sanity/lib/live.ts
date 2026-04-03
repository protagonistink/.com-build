import {createClient} from 'next-sanity';
import {defineLive} from 'next-sanity/live';
import {getRequiredEnv, normalizeEnvValue} from '@/lib/env';

const DEFAULT_SANITY_PROJECT_ID = 'dkok2iir';
const DEFAULT_SANITY_DATASET = 'production';

const projectId =
  normalizeEnvValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) || DEFAULT_SANITY_PROJECT_ID;
const dataset =
  normalizeEnvValue(process.env.NEXT_PUBLIC_SANITY_DATASET) || DEFAULT_SANITY_DATASET;

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-03-02',
  useCdn: true,
  stega: {studioUrl: '/studio'},
});

const token = getRequiredEnv('SANITY_API_READ_TOKEN');

export const {sanityFetch, SanityLive} = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
