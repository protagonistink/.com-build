export type GuideLink = {
  label: string;
  href: string;
};

export type GuideSection = {
  id: string;
  sectionLabel: string;
  title: string;
  body: string;
  links?: GuideLink[];
};

export type PhotographyRepo = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

export type NavGroup = {
  label: string;
  href: string;
  items: GuideLink[];
};

export const navGroups: NavGroup[] = [
  {
    label: 'What We Believe',
    href: '#what-we-believe',
    items: [
      { label: 'Narrative First', href: '#narrative-first' },
      { label: 'Strategic Tension', href: '#strategic-tension' },
      { label: 'Audience Respect', href: '#audience-respect' },
    ],
  },
  {
    label: 'Identity & Design',
    href: '#identity-design',
    items: [
      { label: 'Color System', href: '#color-system' },
      { label: 'Logo System', href: '#logo-system' },
      { label: 'Typography', href: '#typography' },
      { label: 'Layout Elements', href: '#layout-elements' },
      { label: 'Photography Repos', href: '#photography-repos' },
    ],
  },
  {
    label: 'Copy & Voice',
    href: '#copy-voice',
    items: [
      { label: 'Voice Framework', href: '#voice-framework' },
      { label: 'Editorial Rules', href: '#editorial-rules' },
      { label: 'Messaging Defaults', href: '#messaging-defaults' },
    ],
  },
  {
    label: 'Code Ref',
    href: '#code-ref',
    items: [
      { label: 'Token Reference', href: '#token-reference' },
      { label: 'Component Rules', href: '#component-rules' },
      { label: 'CMS Notes', href: '#cms-notes' },
    ],
  },
];

export const sections: GuideSection[] = [
  {
    id: 'narrative-first',
    sectionLabel: '01',
    title: 'Narrative First',
    body: 'Everything starts with the story architecture: tension, movement, stakes, and earned resolution. Visual style is in service of narrative clarity, never a replacement for it.',
    links: [
      { label: 'Story Principles', href: '/story-teardown' },
      { label: 'Founder Positioning', href: '/about' },
    ],
  },
  {
    id: 'strategic-tension',
    sectionLabel: '02',
    title: 'Strategic Tension',
    body: 'The work should balance opposites without flattening them: cinematic and precise, poetic and useful, premium and human. We design at that edge on purpose.',
  },
  {
    id: 'audience-respect',
    sectionLabel: '03',
    title: 'Audience Respect',
    body: 'No manipulation language, no empty urgency, no fake certainty. We assume an intelligent audience and write with structure, not noise.',
  },
  {
    id: 'color-system',
    sectionLabel: '04',
    title: 'Color System',
    body: 'Core palette stays tight: Ink (#2C2C2C), Warm White (#FAFAFA), Rust (#C83C2F), and Cool Gray (#9B9EA4). Rust is punctuation, not wallpaper.',
  },
  {
    id: 'logo-system',
    sectionLabel: '05',
    title: 'Logo System',
    body: 'Wordmark and symbol are used with deliberate restraint. The symbol can scale as a structural watermark in hero contexts when opacity stays low and edges stay clean.',
    links: [
      { label: 'Black Wordmark', href: '/images/brand/black_wordmark_trans.png' },
      { label: 'White Wordmark', href: '/images/brand/white_wordmark_trans.png' },
      { label: 'Symbol (Hi-Res)', href: '/images/brand/symbol_trans_white3k.png' },
    ],
  },
  {
    id: 'typography',
    sectionLabel: '06',
    title: 'Typography',
    body: 'Cormorant Garamond carries display and editorial voice. Satoshi carries interface and utility. Keep contrast clear: expressive headline, disciplined support copy.',
  },
  {
    id: 'layout-elements',
    sectionLabel: '07',
    title: 'Layout Elements',
    body: 'Grid spacing should feel editorial, not dashboard-like. Use breathing room to create hierarchy. Favor subtle movement and linework over decorative clutter.',
  },
  {
    id: 'voice-framework',
    sectionLabel: '08',
    title: 'Voice Framework',
    body: 'Voice is direct, precise, and soberly confident. Avoid overpromising language. If a sentence sounds like ad-tech filler, cut it.',
  },
  {
    id: 'editorial-rules',
    sectionLabel: '09',
    title: 'Editorial Rules',
    body: 'Use exact words over safe words. Keep sentence rhythm varied but intentional. Remove rhetorical fluff and generic hooks.',
  },
  {
    id: 'messaging-defaults',
    sectionLabel: '10',
    title: 'Messaging Defaults',
    body: 'Primary copy should speak to transformation and consequence: what changes, why it matters, and what action comes next.',
  },
  {
    id: 'token-reference',
    sectionLabel: '11',
    title: 'Token Reference',
    body: 'Tokens live in global CSS and should be reused consistently for color, typography, spacing rhythm, and emphasis states.',
    links: [
      { label: 'Global CSS', href: '/app/globals.css' },
      { label: 'Theme Notes', href: '#component-rules' },
    ],
  },
  {
    id: 'component-rules',
    sectionLabel: '12',
    title: 'Component Rules',
    body: 'Components should preserve brand cadence: clean surfaces, disciplined accents, and no ornamental complexity that obscures action.',
  },
  {
    id: 'cms-notes',
    sectionLabel: '13',
    title: 'CMS Notes',
    body: 'Best path for maintainability: store photography repos and brand references as Sanity documents, then render them in this guide through typed queries.',
    links: [
      { label: 'Sanity Studio', href: '/studio' },
      { label: 'Content Models', href: '/studio/structure' },
    ],
  },
];

export const photographyRepos: PhotographyRepo[] = [
  {
    id: 'repo-cinematic-portraits',
    title: 'Cinematic Portraits',
    description: 'Human-scale tension, side-lit faces, editorial framing, implied stakes.',
    image: 'https://picsum.photos/seed/protagonist-cinematic/1200/900',
    href: 'https://unsplash.com',
  },
  {
    id: 'repo-founder-action',
    title: 'Founder In Motion',
    description: 'Working hands, planning boards, rehearsal energy, in-progress momentum.',
    image: 'https://picsum.photos/seed/protagonist-motion/1200/900',
    href: 'https://www.pexels.com',
  },
  {
    id: 'repo-editorial-space',
    title: 'Editorial Environments',
    description: 'Quiet rooms, tools, textured surfaces, architecture that supports narrative.',
    image: 'https://picsum.photos/seed/protagonist-editorial/1200/900',
    href: 'https://www.gettyimages.com',
  },
];
