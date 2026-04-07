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
      name: 'body',
      title: 'Closing Line',
      placeholder: 'Every brand has a story. Most of them just need someone to find the thread.',
      description: 'The line you want ringing in the room after everything else stops. Use emphasis and line breaks if the cadence needs them.',
      validation: (rule) => rule.required().min(1),
    }),
    storyBodyField({
      name: 'text',
      title: 'Closing Line (Deprecated)',
      placeholder: 'Every brand has a story. Most of them just need someone to find the thread.',
      description: 'Legacy closer field. Use the rich media Closing Line field above instead.',
      validation: (rule) => rule.min(1),
      deprecated: {
        reason: 'Use the “body” field instead. This legacy field is kept only so existing closer content continues to load.',
      },
      readOnly: true,
      hidden: ({value}) => value === undefined,
      initialValue: undefined,
    }),
  ],
  preview: {
    select: {body: 'body', text: 'text'},
    prepare: ({body, text}) => ({
      title: 'Closer',
      subtitle: storyBodyPreview(body || text).slice(0, 96) || 'Closing line',
      description: storyBodyPreview(body || text).slice(0, 180) || undefined,
      media: Pilcrow,
    }),
  },
  components: {
    preview: CaseStudyBlockPreview,
  },
});
