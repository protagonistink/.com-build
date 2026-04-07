import {createClient} from 'next-sanity';
import {defineLive} from 'next-sanity/live';
import {getPublicSanityConfig} from '@/lib/env';

const {projectId, dataset} = getPublicSanityConfig();

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-03-02',
  useCdn: false,
  stega: {studioUrl: 'https://protagonistink.sanity.studio/'},
});

// serverToken is server-only; browserToken uses the NEXT_PUBLIC_ variant (optional — live
// updates in the browser are disabled if not set, but server rendering works regardless).
export const {sanityFetch, SanityLive} = defineLive({
  client,
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN,
  fetchOptions: {
    revalidate: 0,
  },
});
