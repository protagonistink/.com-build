import {Film} from 'lucide-react';
import {defineArrayMember, defineField, defineType} from 'sanity';
import {actLabelField, eyebrowField, surfaceField} from '../shared';
import {CaseStudyBlockPreview} from '../../../studio/CaseStudyBlockPreview';

export const showcaseFilmStrip = defineType({
  name: 'showcaseFilmStrip',
  title: 'The Reel',
  description: 'A horizontal strip of images. Think film frames.',
  type: 'object',
  icon: Film,
  fieldsets: [
    {name: 'settings', title: 'Settings', options: {collapsible: true, collapsed: true}},
    {name: 'intro', title: 'Intro Copy'},
  ],
  fields: [
    actLabelField('settings'),
    surfaceField('settings'),
    eyebrowField('settings'),
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      fieldset: 'intro',
      placeholder: 'From wireframe to final cut',
      description: 'Optional opener above the strip.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
      fieldset: 'intro',
      placeholder: 'Each frame represents a different stage of the visual identity...',
      description: 'Optional context for what the viewer is looking at.',
    }),
    defineField({
      name: 'frames',
      title: 'Frames',
      type: 'array',
      description: 'Build the strip frame by frame.',
      validation: (rule) => rule.min(1),
      of: [
        defineArrayMember({
          type: 'image',
          title: 'Frame',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Cue-card label for this frame.',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional small note at the edge of the frame.',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      body: 'body',
      actLabel: 'actLabel',
      surface: 'surface',
      media: 'frames.0',
    },
    prepare: ({title, body, actLabel, surface, media}) => ({
      title: title || 'The Reel',
      subtitle: [actLabel, surface === 'light' ? 'Light surface' : 'Dark surface', 'Horizontal sequence']
        .filter(Boolean)
        .join(' · '),
      description: title || body || undefined,
      media: media || Film,
    }),
  },
  components: {
    preview: CaseStudyBlockPreview,
  },
});
