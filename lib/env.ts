export function normalizeEnvValue(value: string | undefined): string {
  if (!value) return '';
  return value.trim().replace(/^['"]|['"]$/g, '');
}

export function getRequiredEnv(name: string): string {
  const value = normalizeEnvValue(process.env[name]);
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}
