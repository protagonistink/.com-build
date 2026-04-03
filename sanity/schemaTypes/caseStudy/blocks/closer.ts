import {Pilcrow} from 'lucide-react';
import {defineField, defineType} from 'sanity';
import {CaseStudyBlockPreview} from '../../../studio/CaseStudyBlockPreview';

export const closer = defineType({
  name: 'closer',
  title: 'Closer',
  description: 'The last line. Make it land.',
  type: 'object',
  icon: Pilcrow,
  fields: [
    defineField({
      name: 'text',
      title: 'Closing Line',
      type: 'text',
      rows: 3,
      placeholder: 'Every brand has a story. Most of them just need someone to find the thread.',
      description: 'The line you want ringing in the room after everything else stops. Just get it down — it doesn\'t have to be perfect.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {text: 'text'},
    prepare: ({text}) => ({
      title: 'Closer',
      subtitle: text ? text.slice(0, 96) : 'Closing line',
      description: text ? text.slice(0, 180) : undefined,
      media: Pilcrow,
    }),
  },
  components: {
    preview: CaseStudyBlockPreview,
  },
});
