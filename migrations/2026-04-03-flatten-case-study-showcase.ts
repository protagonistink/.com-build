import {at, defineMigration, set} from 'sanity/migrate';

type LegacyShowcaseItem = {
  _key?: string;
  _type?: 'showcaseBlock';
  itemLabel?: string;
  layout?: 'split' | 'fullBleed' | 'filmStrip' | 'stat';
  imagePosition?: 'left' | 'right';
  title?: string;
  body?: string;
  tagline?: string;
  image?: unknown;
  statValue?: string;
  statLabel?: string;
  frames?: unknown[];
  details?: unknown[];
};

type LegacySection = {
  _key?: string;
  _type?: string;
  label?: string;
  surface?: 'dark' | 'light';
  items?: LegacyShowcaseItem[];
  [key: string]: unknown;
};

function uniqueKey(seed: string, seen: Set<string>) {
  let key = seed;
  let count = 1;

  while (!key || seen.has(key)) {
    key = `${seed}-${count}`;
    count += 1;
  }

  seen.add(key);
  return key;
}

function mapItemToFlatSection(
  section: LegacySection,
  item: LegacyShowcaseItem,
  seenKeys: Set<string>,
  index: number,
) {
  const baseKey = `${section._key || 'showcase'}-${item._key || `item-${index + 1}`}`;
  const _key = uniqueKey(baseKey, seenKeys);
  const actLabel = section.label || undefined;
  const surface = section.surface || 'dark';
  const eyebrow = item.itemLabel || undefined;

  switch (item.layout) {
    case 'fullBleed':
      return {
        _type: 'showcaseFullBleed',
        _key,
        actLabel,
        surface,
        eyebrow,
        title: item.title,
        body: item.body,
        image: item.image,
      };

    case 'filmStrip':
      return {
        _type: 'showcaseFilmStrip',
        _key,
        actLabel,
        surface,
        eyebrow,
        title: item.title,
        body: item.body,
        frames: item.frames || [],
      };

    case 'stat':
      return {
        _type: 'showcaseStat',
        _key,
        actLabel,
        surface,
        eyebrow,
        title: item.title,
        body: item.body,
        statValue: item.statValue,
        statLabel: item.statLabel,
        details: item.details || [],
      };

    case 'split':
    default:
      return {
        _type: 'showcaseSplit',
        _key,
        actLabel,
        surface,
        eyebrow,
        imagePosition: item.imagePosition || 'left',
        title: item.title,
        tagline: item.tagline,
        body: item.body,
        image: item.image,
        details: item.details || [],
      };
  }
}

export default defineMigration({
  title: 'Flatten legacy showcase wrappers into top-level case-study story blocks',
  documentTypes: ['caseStudy'],
  migrate: {
    document(document) {
      const sections = Array.isArray(document.sections) ? (document.sections as LegacySection[]) : [];
      const hasLegacyShowcase = sections.some((section) => section?._type === 'showcase');
      if (!hasLegacyShowcase) return;

      const seenKeys = new Set<string>();
      const nextSections: Record<string, unknown>[] = [];

      sections.forEach((section, sectionIndex) => {
        const existingKey = typeof section?._key === 'string' ? section._key : `section-${sectionIndex + 1}`;
        seenKeys.add(existingKey);

        if (section?._type !== 'showcase') {
          nextSections.push({...section, _key: existingKey});
          return;
        }

        const items = Array.isArray(section.items) ? section.items : [];
        items.forEach((item, itemIndex) => {
          nextSections.push(mapItemToFlatSection(section, item, seenKeys, itemIndex));
        });
      });

      return [at('sections', set(nextSections))];
    },
  },
});
