import {defineEnableDraftMode} from 'next-sanity/draft-mode';
import {createClient} from 'next-sanity';
import {getPublicSanityConfig} from '@/lib/env';

const {projectId, dataset} = getPublicSanityConfig();

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-03-02',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});

export const {GET} = defineEnableDraftMode({client});
