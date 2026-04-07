import { STORY_RIP_STAGE_OPTIONS } from '@/lib/storyRip';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';

export type StoryRipFormData = {
  name: string;
  email: string;
  company: string;
  url: string;
  miss: string;
  stage: string;
};

export type StoryRipStep = {
  field: keyof StoryRipFormData;
  label: string;
  type: 'text' | 'email' | 'url' | 'textarea' | 'select';
  placeholder?: string;
  options?: string[];
  required: boolean;
};

export const STORY_RIP_STEPS: StoryRipStep[] = [
  { field: 'name', label: "What's your name?", type: 'text', placeholder: 'First name is fine.', required: true },
  { field: 'email', label: 'Where should we send the Loom?', type: 'email', placeholder: 'you@company.com', required: true },
  {
    field: 'company',
    label: 'Company and what you do — one sentence.',
    type: 'text',
    placeholder: '"Acme — we help SaaS companies reduce churn."',
    required: false,
  },
  { field: 'url', label: 'Drop the link you want reviewed.', type: 'url', placeholder: 'www.your-story.com', required: true },
  {
    field: 'miss',
    label: 'What do you wish prospects understood faster?',
    type: 'textarea',
    placeholder: "Don't overthink it — that gap is usually the leak.",
    required: false,
  },
  {
    field: 'stage',
    label: 'What stage are you at?',
    type: 'select',
    options: [...STORY_RIP_STAGE_OPTIONS],
    required: false,
  },
];

export const EMPTY_STORY_RIP_FORM: StoryRipFormData = {
  name: '',
  email: '',
  company: '',
  url: '',
  miss: '',
  stage: '',
};

export function normalizeWebUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}

export function isValidWebUrl(value: string) {
  const normalized = normalizeWebUrl(value);
  if (!normalized) return false;

  try {
    const parsed = new URL(normalized);
    if (!['http:', 'https:'].includes(parsed.protocol)) return false;
    return parsed.hostname.includes('.') && !parsed.hostname.startsWith('.') && !parsed.hostname.endsWith('.');
  } catch {
    return false;
  }
}

export function getStoryRipFieldError(field: keyof StoryRipFormData, value: string) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (field === 'email' && !isValidEmail(trimmed)) return 'Enter a valid email address.';
  if (field === 'url' && !isValidWebUrl(trimmed)) {
    return 'Enter a valid URL (example: yoursite.com or https://yoursite.com).';
  }
  return '';
}
