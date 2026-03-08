export interface ArtifactImage {
  src: string;
  alt?: string;
  label?: string;
  description?: string;
}

export interface WorldEntry {
  name: string;
  observation: string;
}

export interface ExecutionSurface {
  surface: string;
  description: string;
  image?: { src: string; alt?: string };
}

export interface ShiftDimension {
  dimension: string;
  change: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface CaseStudy {
  // Identity
  id: number;
  slug: string;
  scene: string;
  ref: string;

  // Hero
  title: string;
  subtitle?: string;
  client: string;
  sector?: string;
  engagementType?: string;
  year: string;
  image: string;
  imageAlt?: string;

  // Cold Open
  coldOpen?: string;

  // Story Problem
  internalStory?: string;
  externalPerception?: string;
  consequences?: string;

  // The World
  mentors?: WorldEntry[];
  villains?: WorldEntry[];

  // The Reframe
  reframe?: string;
  reframeAnnotation?: string;

  // Narrative Architecture
  artifacts?: ArtifactImage[];

  // Execution
  executionSurfaces?: ExecutionSurface[];

  // The Shift
  shifts?: ShiftDimension[];
  metrics?: Metric[];

  // SEO
  description: string;

  // Listing page (derived)
  category: string;
  tagline: string;
}

// Backward-compat alias — remove once all references are updated
export type Project = CaseStudy;
