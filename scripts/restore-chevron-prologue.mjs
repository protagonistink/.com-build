import {getCliClient} from 'sanity/cli';

const client = getCliClient({
  apiVersion: '2026-03-02',
  useCdn: false,
});

const id = 'drafts.a62f2fdf-a199-42a3-b79c-04175fd3cf76';

const originalBody = [
  {
    _key: 'restored-1',
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _key: 'restored-span-1',
        _type: 'span',
        marks: [],
        text: "It's the 21st Century. Energy is evolving. One of the world's biggest oil companies was ready to evolve with it.",
      },
    ],
  },
];

const doc = await client.fetch(`*[_id == $id][0]{sections}`, {id}, {perspective: 'raw'});
if (!doc?.sections) {
  throw new Error('Draft case study not found');
}

const sections = doc.sections.map((section, index) =>
  index === 0 ? {...section, body: originalBody} : section,
);

await client.patch(id).set({sections}).commit({autoGenerateArrayKeys: false});
console.log('Chevron prologue restored exactly.');
