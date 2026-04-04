export interface PortableTextMarkDef {
  _key: string;
  _type: string;
  href?: string;
  blank?: boolean;
}

export interface PortableTextSpan {
  _type: 'span';
  _key?: string;
  text: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _type: string;
  _key?: string;
  style?: string;
  children?: PortableTextSpan[];
  listItem?: 'bullet' | 'number';
  level?: number;
  markDefs?: PortableTextMarkDef[];
  alt?: string;
  caption?: string;
  externalUrl?: string;
  title?: string;
  text?: string;
  value?: string;
  label?: string;
  quote?: string;
  attribution?: string;
  url?: string;
  aspectRatio?: string;
  ctaLabel?: string;
  ctaHref?: string;
  images?: Array<{
    _key?: string;
    alt?: string;
    caption?: string;
    asset?: {
      _ref?: string;
      _type?: string;
      url?: string;
    };
  }>;
  asset?: {
    _ref?: string;
    _type?: string;
    url?: string;
  };
}

export type PortableTextValue = PortableTextBlock[];
