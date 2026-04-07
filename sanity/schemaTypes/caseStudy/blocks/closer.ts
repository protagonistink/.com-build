import {Pilcrow} from 'lucide-react';
import {defineType} from 'sanity';
import {storyBodyField, storyBodyPreview} from '../shared';
import {CaseStudyBlockPreview} from '../../../studio/CaseStudyBlockPreview';

export const closer = defineType({
  name: 'closer',
  title: 'Closer',
  description: 'The last line. Make it land.',
  type: 'object',
  icon: Pilcrow,
  fields: [
    storyBodyField({
      name: 'text',
      title: 'Closing Line',
      placeholder: 'Every brand has a story. Most of them just need someone to find the thread.',
      description: 'The line you want ringing in the room after everything else stops. Use emphasis and line breaks if the cadence needs them.',
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {text: 'text'},
    prepare: ({text}) => ({
      title: 'Closer',
      subtitle: storyBodyPreview(text).slice(0, 96) || 'Closing line',
      description: storyBodyPreview(text).slice(0, 180) || undefined,
      media: Pilcrow,
    }),
  },
  components: {
    preview: CaseStudyBlockPreview,
  },
});
