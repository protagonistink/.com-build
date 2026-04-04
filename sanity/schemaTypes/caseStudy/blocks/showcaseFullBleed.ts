import {Image as ImageIcon} from 'lucide-react';
import {defineField, defineType} from 'sanity';
import {actLabelField, eyebrowField, imageField, surfaceField} from '../shared';
import {CaseStudyBlockPreview} from '../../../studio/CaseStudyBlockPreview';

export const showcaseFullBleed = defineType({
  name: 'showcaseFullBleed',
  title: 'Hero Image Moment',
  description: 'One image takes over the whole page.',
  type: 'object',
  icon: ImageIcon,
  fieldsets: [
    {name: 'settings', title: 'Settings', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    actLabelField('settings'),
    surfaceField('settings'),
    eyebrowField('settings'),
    defineField({
      name: 'title',
      title: 'Overlay Headline',
      type: 'string',
      placeholder: 'The moment it clicked',
      description: 'If the image needs a line on top of it, write it here.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
      placeholder: 'Three months of iteration, compressed into a single frame...',
      description: 'Optional supporting copy if the frame needs more than the headline.',
    }),
    defineField({
      name: 'imageDisplay',
      title: 'Image Fit',
      type: 'string',
      fieldset: 'settings',
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
    imageField('image', 'Image', 'The frame that should take over the page.'),
  ],
  preview: {
    select: {
      title: 'title',
      actLabel: 'actLabel',
      surface: 'surface',
      media: 'image',
    },
    prepare: ({title, actLabel, surface, media}) => ({
      title: title || 'Hero Image Moment',
      subtitle: [actLabel, surface === 'light' ? 'Light surface' : 'Dark surface', 'Image with overlay']
        .filter(Boolean)
        .join(' · '),
      description: title || undefined,
      media: media || ImageIcon,
    }),
  },
  components: {
    preview: CaseStudyBlockPreview,
  },
});
