import {Columns2} from 'lucide-react';
import {defineField, defineType} from 'sanity';
import {actLabelField, detailsField, eyebrowField, imageField, surfaceField} from '../shared';
import {CaseStudyBlockPreview} from '../../../studio/CaseStudyBlockPreview';

export const showcaseSplit = defineType({
  name: 'showcaseSplit',
  title: 'Image + Text Beat',
  description: 'One image and one story moment, side by side.',
  type: 'object',
  icon: Columns2,
  fieldsets: [
    {name: 'settings', title: 'Settings', options: {collapsible: true, collapsed: true}},
    {name: 'story', title: 'Story Copy'},
    {name: 'layout', title: 'Layout', options: {collapsible: true, collapsed: true, columns: 2}},
  ],
  fields: [
    actLabelField('settings'),
    surfaceField('settings'),
    eyebrowField('settings'),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      fieldset: 'layout',
      description: 'Which side should carry the image weight?',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'imageDisplay',
      title: 'Image Fit',
      type: 'string',
      fieldset: 'layout',
      description: 'Should the image fill the frame by cropping, or stay fully visible inside it?',
      options: {
        list: [
          {title: 'Crop to fill', value: 'cover'},
          {title: 'Fit whole image', value: 'contain'},
        ],
        layout: 'radio',
      },
      initialValue: 'cover',
    }),
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
    imageField('image', 'Image', 'The frame that carries the other half of this split.'),
    detailsField(),
  ],
  preview: {
    select: {
      title: 'title',
      actLabel: 'actLabel',
      surface: 'surface',
      eyebrow: 'eyebrow',
      media: 'image',
    },
    prepare: ({title, actLabel, surface, eyebrow, media}) => ({
      title: title || 'Image + Text Beat',
      subtitle: [actLabel, surface === 'light' ? 'Light surface' : 'Dark surface', eyebrow || 'Image + text']
        .filter(Boolean)
        .join(' · '),
      description: title || undefined,
      media: media || Columns2,
    }),
  },
  components: {
    preview: CaseStudyBlockPreview,
  },
});
