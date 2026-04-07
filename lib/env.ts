const DEFAULT_SANITY_PROJECT_ID = 'dkok2iir';
const DEFAULT_SANITY_DATASET = 'production';

export function normalizeEnvValue(value: string | undefined): string {
  if (!value) return '';
  return value.trim().replace(/^['"]|['"]$/g, '');
}

export function getRequiredEnv(name: string): string {
  const value = normalizeEnvValue(process.env[name]);
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export function getPublicSanityConfig() {
  return {
    projectId: normalizeEnvValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) || DEFAULT_SANITY_PROJECT_ID,
    dataset: normalizeEnvValue(process.env.NEXT_PUBLIC_SANITY_DATASET) || DEFAULT_SANITY_DATASET,
  };
}
