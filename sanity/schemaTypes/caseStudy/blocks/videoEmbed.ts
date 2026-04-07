import {Play} from 'lucide-react';
import {defineField, defineType} from 'sanity';
import {CaseStudyBlockPreview} from '../../../studio/CaseStudyBlockPreview';
import {surfaceField} from '../shared';

export const videoEmbed = defineType({
  name: 'videoEmbed',
  title: 'Video',
  description: 'Embed a Vimeo or YouTube link.',
  type: 'object',
  icon: Play,
  fields: [
    surfaceField(),
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      description: 'Paste the Vimeo or YouTube link for the cut you want to show.',
      validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'A quiet label under the embed if it needs context.',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          {title: '16:9', value: '16/9'},
          {title: '21:9 (Cinematic)', value: '21/9'},
          {title: '4:3', value: '4/3'},
        ],
      },
      initialValue: '16/9',
    }),
  ],
  preview: {
    select: {caption: 'caption', url: 'url', surface: 'surface'},
    prepare: ({caption, url, surface}) => ({
      title: 'Video',
      subtitle:
        [surface === 'light' ? 'Light surface' : 'Dark surface', caption || url || 'Embedded video']
          .filter(Boolean)
          .join(' · '),
      description: url || undefined,
      media: Play,
    }),
  },
  components: {
    preview: CaseStudyBlockPreview,
  },
});
