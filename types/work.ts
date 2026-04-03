export type ShowcaseSurface = 'dark' | 'light';
export type ShowcaseLayout = 'split' | 'fullBleed' | 'filmStrip' | 'stat';

export interface PrologueSection {
  _type: 'prologue';
  _key: string;
  body?: string;
  details?: ShowcaseDetail[];
}

export interface ShowcaseFrame {
  _key: string;
  src: string;
  alt?: string;
  label?: string;
  caption?: string;
}

export interface ShowcaseDetail {
  _key: string;
  label: string;
  value: string;
}

export interface ShowcaseBlock {
  _key: string;
  layout: ShowcaseLayout;
  imagePosition?: 'left' | 'right';
  imageDisplay?: 'cover' | 'contain';
  eyebrow?: string;
  itemLabel?: string;
  title?: string;
  body?: string;
  tagline?: string;
  image?: {src: string; alt?: string};
  statValue?: string;
  statLabel?: string;
  frames?: ShowcaseFrame[];
  details?: ShowcaseDetail[];
}

export interface ShowcaseSection {
  _type: 'showcase';
  _key: string;
  label?: string;
  surface?: ShowcaseSurface;
  items?: ShowcaseBlock[];
}

export interface LegacyShowcaseSection extends ShowcaseSection {
  _type: 'showcase';
}

export interface ShowcaseSplitSection {
  _type: 'showcaseSplit';
  _key: string;
  actLabel?: string;
  surface?: ShowcaseSurface;
  eyebrow?: string;
  imagePosition?: 'left' | 'right';
  imageDisplay?: 'cover' | 'contain';
  title?: string;
  tagline?: string;
  body?: string;
  image?: {src: string; alt?: string};
  details?: ShowcaseDetail[];
}

export interface ShowcaseFullBleedSection {
  _type: 'showcaseFullBleed';
  _key: string;
  actLabel?: string;
  surface?: ShowcaseSurface;
  eyebrow?: string;
  title?: string;
  body?: string;
  image?: {src: string; alt?: string};
}

export interface ShowcaseFilmStripSection {
  _type: 'showcaseFilmStrip';
  _key: string;
  actLabel?: string;
  surface?: ShowcaseSurface;
  eyebrow?: string;
  title?: string;
  body?: string;
  frames?: ShowcaseFrame[];
}

export interface ShowcaseStatSection {
  _type: 'showcaseStat';
  _key: string;
  actLabel?: string;
  surface?: ShowcaseSurface;
  eyebrow?: string;
  title?: string;
  body?: string;
  statValue?: string;
  statLabel?: string;
  details?: ShowcaseDetail[];
}

export type FlatShowcaseSection =
  | ShowcaseSplitSection
  | ShowcaseFullBleedSection
  | ShowcaseFilmStripSection
  | ShowcaseStatSection;

export interface ClimaxMetric {
  _key: string;
  value: string;
  label: string;
}

export interface ClimaxSection {
  _type: 'climax';
  _key: string;
  label?: string;
  quote?: string;
  backgroundImage?: {src: string; alt?: string};
  metrics?: ClimaxMetric[];
}

export interface VideoEmbedSection {
  _type: 'videoEmbed';
  _key: string;
  url: string;
  caption?: string;
  aspectRatio?: string;
}

export interface DeliverableItem {
  _key: string;
  number?: string;
  title?: string;
  description?: string;
}

export interface DeliverablesSection {
  _type: 'deliverables';
  _key: string;
  headline?: string;
  subheadline?: string;
  items?: DeliverableItem[];
  ctaLabel?: string;
  ctaLink?: string;
}

export interface CloserSection {
  _type: 'closer';
  _key: string;
  text: string;
}

export type CaseStudySourceSection =
  | PrologueSection
  | LegacyShowcaseSection
  | FlatShowcaseSection
  | ClimaxSection
  | VideoEmbedSection
  | DeliverablesSection
  | CloserSection;

export type CaseStudySection =
  | PrologueSection
  | ShowcaseSection
  | ClimaxSection
  | VideoEmbedSection
  | DeliverablesSection
  | CloserSection;

export interface CaseStudy {
  id: number;
  slug: string;
  scene: string;
  ref: string;
  title: string;
  subtitle?: string;
  client: string;
  sector?: string;
  engagementType?: string;
  year: string;
  image: string;
  imageAlt?: string;
  caseNumber?: string;
  timeline?: string;
  sections: CaseStudySection[];
  description: string;
  category: string;
  tagline: string;
}

export type Project = CaseStudy;
