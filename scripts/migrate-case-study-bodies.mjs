import {getCliClient} from 'sanity/cli';

const client = getCliClient({
  apiVersion: '2026-03-02',
  useCdn: false,
});

const BODY_SECTION_TYPES = new Set([
  'prologue',
  'showcaseSplit',
  'showcaseFullBleed',
  'showcaseFilmStrip',
  'showcaseStat',
]);

function stringToPortableText(value) {
  return value
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\n+/g, ' ').trim())
    .filter(Boolean)
    .map((text, index) => ({
      _key: `migrated-${index + 1}`,
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _key: `span-${index + 1}`,
          _type: 'span',
          marks: [],
          text,
        },
      ],
    }));
}

const docs = await client.fetch(
  `*[_type == "caseStudy"]{_id,title,sections}`,
  {},
  {perspective: 'raw'},
);

let updatedCount = 0;

for (const doc of docs) {
  if (!Array.isArray(doc.sections)) continue;

  let changed = false;
  const sections = doc.sections.map((section) => {
    if (!BODY_SECTION_TYPES.has(section?._type)) return section;
    if (typeof section?.body !== 'string') return section;

    changed = true;
    return {
      ...section,
      body: stringToPortableText(section.body),
    };
  });

  if (!changed) continue;

  await client.patch(doc._id).set({sections}).commit({autoGenerateArrayKeys: false});
  updatedCount += 1;
  console.log(`Updated ${doc._id}${doc.title ? ` — ${doc.title}` : ''}`);
}

console.log(`Done. Migrated ${updatedCount} case study document${updatedCount === 1 ? '' : 's'}.`);
