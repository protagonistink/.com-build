import {Film} from 'lucide-react';
import {defineArrayMember, defineField, defineType} from 'sanity';
import {surfaceField} from '../shared';
import {CaseStudyBlockPreview} from '../../../studio/CaseStudyBlockPreview';
import {
  FilmStripAspectRatioInput,
  FilmStripGapInput,
  FilmStripPaddingInput,
  FilmStripWidthInput,
} from '../../../studio/FilmStripControls';

export const showcaseFilmStrip = defineType({
  name: 'showcaseFilmStrip',
  title: 'Film Strip',
  description: 'A horizontal strip of media frames. Think film stills and motion clips.',
  type: 'object',
  icon: Film,
  fieldsets: [
    {name: 'settings', title: 'Settings', options: {collapsible: true, collapsed: true}},
    {name: 'design', title: 'Design', options: {collapsible: true, collapsed: true, columns: 2}},
  ],
  fields: [
    surfaceField('settings'),
    defineField({
      name: 'frameAspectRatio',
      title: 'Frame Aspect Ratio',
      type: 'string',
      fieldset: 'design',
      initialValue: '4/3',
      options: {
        list: [
          {title: '4:3', value: '4/3'},
          {title: '3:2', value: '3/2'},
          {title: '16:9', value: '16/9'},
          {title: '1:1', value: '1/1'},
          {title: '9:16', value: '9/16'},
        ],
        layout: 'radio',
      },
      components: {
        input: FilmStripAspectRatioInput,
      },
    }),
    defineField({
      name: 'frameWidth',
      title: 'Frame Size',
      type: 'string',
      fieldset: 'design',
      initialValue: 'standard',
      options: {
        list: [
          {title: 'Compact', value: 'compact'},
          {title: 'Standard', value: 'standard'},
          {title: 'Large', value: 'large'},
        ],
        layout: 'radio',
      },
      components: {
        input: FilmStripWidthInput,
      },
    }),
    defineField({
      name: 'frameGap',
      title: 'Frame Spacing',
      type: 'string',
      fieldset: 'design',
      initialValue: 'standard',
      options: {
        list: [
          {title: 'Tight', value: 'tight'},
          {title: 'Standard', value: 'standard'},
          {title: 'Loose', value: 'loose'},
        ],
        layout: 'radio',
      },
      components: {
        input: FilmStripGapInput,
      },
    }),
    defineField({
      name: 'stripPadding',
      title: 'Strip Padding',
      type: 'string',
      fieldset: 'design',
      initialValue: 'standard',
      options: {
        list: [
          {title: 'Compact', value: 'compact'},
          {title: 'Standard', value: 'standard'},
          {title: 'Roomy', value: 'roomy'},
        ],
        layout: 'radio',
      },
      components: {
        input: FilmStripPaddingInput,
      },
    }),
    defineField({
      name: 'frames',
      title: 'Frames',
      type: 'array',
      description: 'Build the strip frame by frame with images or uploaded video.',
      validation: (rule) => rule.min(1),
      of: [
        defineArrayMember({
          type: 'showcaseMediaFrame',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      surface: 'surface',
      media: 'frames.0.image',
      frames: 'frames',
      frameAspectRatio: 'frameAspectRatio',
      frameWidth: 'frameWidth',
    },
    prepare: ({surface, media, frames, frameAspectRatio, frameWidth}) => ({
      title: 'Film Strip',
      subtitle: [
        surface === 'light' ? 'Light surface' : 'Dark surface',
        frameWidth || 'standard',
        frameAspectRatio || '4/3',
        `${frames?.length || 0} frame${frames?.length === 1 ? '' : 's'}`,
      ]
        .filter(Boolean)
        .join(' · '),
      media: media || Film,
    }),
  },
  components: {
    preview: CaseStudyBlockPreview,
  },
});
