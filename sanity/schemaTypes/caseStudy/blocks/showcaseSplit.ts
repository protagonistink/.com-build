import {Columns2} from 'lucide-react';
import {defineField, defineType} from 'sanity';
import {detailsField, imageField} from '../shared';
import {CaseStudyBlockPreview} from '../../../studio/CaseStudyBlockPreview';
import {BeatConfigStrip} from '../../../studio/BeatConfigStrip';

export const showcaseSplit = defineType({
  name: 'showcaseSplit',
  title: 'Image + Text Beat',
  description: 'One image and one story moment, side by side.',
  type: 'object',
  icon: Columns2,
  fieldsets: [
    {name: 'story', title: 'Story Copy'},
    {name: 'design', title: 'Design', options: {collapsible: true, collapsed: true, columns: 2}},
  ],
  fields: [
    // Layout picker — compact cards, first thing the writer sees
    defineField({
      name: 'imagePosition',
      title: 'Layout',
      type: 'string',
      description: 'Pick the shape of this beat.',
      options: {
        list: [
          {title: 'Image Left', value: 'left'},
          {title: 'Image Right', value: 'right'},
          {title: 'Full Width Image', value: 'full'},
          {title: 'Copy Only', value: 'copyOnly'},
        ],
        layout: 'radio',
      },
      initialValue: 'left',
      components: {
        input: BeatConfigStrip,
      },
    }),

    // Story fields — immediately after layout
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      fieldset: 'story',
      placeholder: 'The system nobody was using',
      description: 'Optional — The headline for this beat. A working title is fine.',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      fieldset: 'story',
      placeholder: 'A complete interface overhaul in 14 weeks',
      description: 'A short line beneath the headline if the beat needs a second strike.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
      fieldset: 'story',
      placeholder: 'The old platform had 340 daily users. The new one needed to feel inevitable from day one...',
      description: 'Optional — What happened here, in plain language. Don\'t overthink it.',
    }),

    // Image — after story
    imageField('image', 'Image', 'The frame that carries this beat. Not needed for Copy Only layout.'),

    // Design fieldset — collapsed, secondary controls
    defineField({
      name: 'surface',
      title: 'Surface',
      type: 'string',
      fieldset: 'design',
      description: 'Dark or light background.',
      options: {
        list: [
          {title: 'Dark', value: 'dark'},
          {title: 'Light', value: 'light'},
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
    }),
    defineField({
      name: 'imageDisplay',
      title: 'Image Fit',
      type: 'string',
      fieldset: 'design',
      description: 'Crop to fill or show the whole image.',
      options: {
        list: [
          {title: 'Crop to fill', value: 'cover'},
          {title: 'Fit whole image', value: 'contain'},
        ],
        layout: 'radio',
      },
      initialValue: 'cover',
      hidden: ({parent}) => (parent as Record<string, unknown>)?.imagePosition === 'copyOnly',
    }),
    defineField({
      name: 'actLabel',
      title: 'Act Label',
      type: 'string',
      fieldset: 'design',
      placeholder: 'THE CHALLENGE',
      description: 'The story beat this belongs to.',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      fieldset: 'design',
      placeholder: 'Optional micro-label',
      description: 'Micro-label above the headline.',
    }),

    // Details — at the bottom
    detailsField(),
  ],
  preview: {
    select: {
      title: 'title',
      actLabel: 'actLabel',
      surface: 'surface',
      imagePosition: 'imagePosition',
      media: 'image',
    },
    prepare: ({title, actLabel, surface, imagePosition, media}) => {
      const layoutLabel = imagePosition === 'full'
        ? 'Full width'
        : imagePosition === 'copyOnly'
          ? 'Copy only'
          : imagePosition === 'right'
            ? 'Image right'
            : 'Image left';

      return {
        title: title || 'Image + Text Beat',
        subtitle: [actLabel, surface === 'light' ? 'Light' : 'Dark', layoutLabel]
          .filter(Boolean)
          .join(' · '),
        description: title || undefined,
        media: media || Columns2,
      };
    },
  },
  components: {
    preview: CaseStudyBlockPreview,
  },
});
