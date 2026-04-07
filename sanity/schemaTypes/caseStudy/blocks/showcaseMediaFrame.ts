import {Film} from 'lucide-react';
import {defineField, defineType} from 'sanity';
import {FilmStripImageFitInput} from '../../../studio/FilmStripControls';

export const showcaseMediaFrame = defineType({
  name: 'showcaseMediaFrame',
  title: 'Media Frame',
  description: 'A single still or motion frame for media-led sequences.',
  type: 'object',
  icon: Film,
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
      description: 'Describe what matters in the frame.',
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
    defineField({
      name: 'displayMode',
      title: 'Display Mode',
      type: 'string',
      initialValue: 'cover',
      options: {
        list: [
          {title: 'Crop to fill', value: 'cover'},
          {title: 'Fit whole frame', value: 'contain'},
        ],
        layout: 'radio',
      },
      components: {
        input: FilmStripImageFitInput,
      },
      description: 'Choose whether this frame crops or shows the full image/video inside the frame.',
    }),
  ],
  preview: {
    select: {
      mediaType: 'mediaType',
      image: 'image',
      label: 'label',
      caption: 'caption',
      displayMode: 'displayMode',
    },
    prepare: ({mediaType, image, label, caption, displayMode}) => ({
      title: label || caption || 'Frame',
      subtitle: `${mediaType === 'video' ? 'Video' : 'Image'} frame · ${
        displayMode === 'contain' ? 'fit whole frame' : 'crop to fill'
      }`,
      media: image || Film,
    }),
  },
});
