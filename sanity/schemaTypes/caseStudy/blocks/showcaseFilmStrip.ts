import {Film} from 'lucide-react';
import {defineArrayMember, defineField, defineType} from 'sanity';
import {surfaceField} from '../shared';
import {CaseStudyBlockPreview} from '../../../studio/CaseStudyBlockPreview';

export const showcaseFilmStrip = defineType({
  name: 'showcaseFilmStrip',
  title: 'Film Strip',
  description: 'A horizontal strip of media frames. Think film stills and motion clips.',
  type: 'object',
  icon: Film,
  fieldsets: [
    {name: 'settings', title: 'Settings', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    surfaceField('settings'),
    defineField({
      name: 'frames',
      title: 'Frames',
      type: 'array',
      description: 'Build the strip frame by frame with images or uploaded video.',
      validation: (rule) => rule.min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'showcaseFilmStripFrame',
          title: 'Frame',
          fields: [
            defineField({
              name: 'mediaType',
              title: 'Media Type',
              type: 'string',
              initialValue: 'image',
              options: {
                list: [
                  {title: 'Image', value: 'image'},
                  {title: 'Video', value: 'video'},
                ],
                layout: 'radio',
              },
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              hidden: ({parent}) => (parent as {mediaType?: string})?.mediaType === 'video',
              validation: (rule) =>
                rule.custom((value, context) => {
                  const parent = context.parent as {mediaType?: string} | undefined;
                  if (parent?.mediaType === 'video') return true;
                  return value ? true : 'Add an image for image frames.';
                }),
            }),
            defineField({
              name: 'video',
              title: 'Video',
              type: 'file',
              options: {accept: 'video/*'},
              hidden: ({parent}) => (parent as {mediaType?: string})?.mediaType !== 'video',
              validation: (rule) =>
                rule.custom((value, context) => {
                  const parent = context.parent as {mediaType?: string} | undefined;
                  if (parent?.mediaType !== 'video') return true;
                  return value ? true : 'Add a video for video frames.';
                }),
            }),
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
          preview: {
            select: {
              mediaType: 'mediaType',
              image: 'image',
              label: 'label',
              caption: 'caption',
            },
            prepare: ({mediaType, image, label, caption}) => ({
              title: label || caption || 'Frame',
              subtitle: mediaType === 'video' ? 'Video frame' : 'Image frame',
              media: image || Film,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      surface: 'surface',
      media: 'frames.0.image',
      frames: 'frames',
    },
    prepare: ({surface, media, frames}) => ({
      title: 'Film Strip',
      subtitle: [surface === 'light' ? 'Light surface' : 'Dark surface', `${frames?.length || 0} frame${frames?.length === 1 ? '' : 's'}`]
        .filter(Boolean)
        .join(' · '),
      media: media || Film,
    }),
  },
  components: {
    preview: CaseStudyBlockPreview,
  },
});
