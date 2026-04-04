import {createClient} from 'next-sanity';
import {defineLive} from 'next-sanity/live';
import {normalizeEnvValue} from '@/lib/env';

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
  useCdn: false,
  stega: {studioUrl: '/studio'},
});

// serverToken is server-only; browserToken uses the NEXT_PUBLIC_ variant (optional — live
// updates in the browser are disabled if not set, but server rendering works regardless).
export const {sanityFetch, SanityLive} = defineLive({
  client,
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN,
});
