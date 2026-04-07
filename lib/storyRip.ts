export const STORY_RIP_STAGE_OPTIONS = [
  'Pre-seed',
  'Seed',
  'Series A',
  'Bootstrapped',
  'Other',
] as const;

export type StoryRipStage = (typeof STORY_RIP_STAGE_OPTIONS)[number];

const STORY_RIP_STAGE_SET = new Set<string>(STORY_RIP_STAGE_OPTIONS);

export function normalizeStoryRipStage(stage: string) {
  const trimmed = stage.trim();
  if (!trimmed) return 'Other';
  if (STORY_RIP_STAGE_SET.has(trimmed)) return trimmed as StoryRipStage;
  return 'Other';
}
