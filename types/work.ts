export interface GalleryImage {
  src: string;
  label: string;
  description: string;
}

export interface Project {
  id: number;
  slug: string;
  scene: string;
  ref: string;
  title: string;
  tagline: string;
  client: string;
  category: string;
  description: string;
  year: string;
  image: string;
  imageLabel?: string;
  imageDescription?: string;
  tensionStatement?: string;
  sector?: string;
  situation: string;
  problem: string;
  engagementSummary: string;
  before: string;
  after: string;
  galleryImages?: GalleryImage[];
}
