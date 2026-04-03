import type {Template} from 'sanity';

function generateKey() {
  return Math.random().toString(36).slice(2, 10);
}

const shortStory = {
  sections: [
    {_type: 'prologue', _key: generateKey()},
    {_type: 'showcaseSplit', _key: generateKey(), surface: 'dark'},
    {_type: 'closer', _key: generateKey()},
  ],
};

const fullStory = {
  sections: [
    {_type: 'prologue', _key: generateKey()},
    {_type: 'showcaseSplit', _key: generateKey(), surface: 'dark'},
    {_type: 'showcaseFullBleed', _key: generateKey(), surface: 'dark'},
    {_type: 'showcaseSplit', _key: generateKey(), surface: 'dark', imagePosition: 'right'},
    {_type: 'climax', _key: generateKey(), label: 'THE CLIMAX'},
    {_type: 'closer', _key: generateKey()},
  ],
};

const dataDrivenStory = {
  sections: [
    {_type: 'prologue', _key: generateKey()},
    {_type: 'showcaseStat', _key: generateKey(), surface: 'dark'},
    {_type: 'showcaseSplit', _key: generateKey(), surface: 'dark'},
    {_type: 'showcaseStat', _key: generateKey(), surface: 'light'},
    {_type: 'showcaseFilmStrip', _key: generateKey(), surface: 'dark'},
    {_type: 'climax', _key: generateKey(), label: 'THE CLIMAX'},
    {_type: 'closer', _key: generateKey()},
  ],
};

export const caseStudyTemplates: Template[] = [
  {
    id: 'case-study-short',
    title: 'Short Case File',
    description: 'Quick portfolio piece — opening, one beat, closing.',
    schemaType: 'caseStudy',
    value: {status: 'draft', ...shortStory},
  },
  {
    id: 'case-study-full',
    title: 'Full Story Arc',
    description: 'The standard arc — prologue, three beats, climax, closer.',
    schemaType: 'caseStudy',
    value: {status: 'draft', ...fullStory},
  },
  {
    id: 'case-study-data',
    title: 'Data-Driven Case',
    description: 'Results-heavy — stats, visuals, proof, payoff.',
    schemaType: 'caseStudy',
    value: {status: 'draft', ...dataDrivenStory},
  },
];
