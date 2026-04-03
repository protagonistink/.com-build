import {defineEnableDraftMode} from 'next-sanity/draft-mode';
import {createClient} from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dkok2iir',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-03-02',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});

export const {GET} = defineEnableDraftMode({client});
