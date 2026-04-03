import {Clapperboard} from 'lucide-react';
import {defineArrayMember, defineField, defineType} from 'sanity';

export const legacyShowcase = defineType({
  name: 'showcase',
  title: 'Legacy Showcase',
  type: 'object',
  icon: Clapperboard,
  description: 'Deprecated. Kept only so existing case studies can be read and migrated safely.',
  deprecated: {
    reason: 'Use the flat story-builder blocks instead. This wrapper exists only for backwards compatibility.',
  },
  readOnly: true,
  hidden: ({value}) => value === undefined,
  fields: [
    defineField({
      name: 'label',
      title: 'Section Label',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'surface',
      title: 'Surface',
      type: 'string',
      readOnly: true,
      options: {
        list: [
          {title: 'Dark', value: 'dark'},
          {title: 'Light', value: 'light'},
        ],
      },
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      readOnly: true,
      of: [
        defineArrayMember({
          type: 'object',
          name: 'showcaseBlock',
          title: 'Legacy Block',
          readOnly: true,
          fields: [
            defineField({
              name: 'layout',
              title: 'Layout',
              type: 'string',
              options: {
                list: [
                  {title: 'Split — image + text', value: 'split'},
                  {title: 'Full Bleed — image with overlay', value: 'fullBleed'},
                  {title: 'Film Strip — horizontal scroll', value: 'filmStrip'},
                  {title: 'Stat — big number + text', value: 'stat'},
                ],
              },
            }),
            defineField({
              name: 'imagePosition',
              title: 'Image Position',
              type: 'string',
              options: {
                list: [
                  {title: 'Left', value: 'left'},
                  {title: 'Right', value: 'right'},
                ],
              },
              hidden: ({parent}) => parent?.layout !== 'split',
            }),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'body', title: 'Body', type: 'text', rows: 3}),
            defineField({name: 'tagline', title: 'Tagline', type: 'string'}),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
            }),
            defineField({name: 'statValue', title: 'Stat Value', type: 'string'}),
            defineField({name: 'statLabel', title: 'Stat Label', type: 'string'}),
            defineField({
              name: 'frames',
              title: 'Frames',
              type: 'array',
              hidden: ({parent}) => parent?.layout !== 'filmStrip',
              of: [
                defineArrayMember({
                  type: 'image',
                  title: 'Frame',
                  options: {hotspot: true},
                  fields: [
                    defineField({name: 'alt', title: 'Alt Text', type: 'string'}),
                    defineField({name: 'label', title: 'Label', type: 'string'}),
                    defineField({name: 'caption', title: 'Caption', type: 'string'}),
                  ],
                }),
              ],
            }),
            defineField({
              name: 'details',
              title: 'Details',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  title: 'Detail',
                  fields: [
                    defineField({name: 'label', title: 'Label', type: 'string'}),
                    defineField({name: 'value', title: 'Value', type: 'string'}),
                  ],
                  preview: {
                    select: {title: 'label', subtitle: 'value'},
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {title: 'title', layout: 'layout'},
            prepare: ({title, layout}) => ({
              title: title || 'Legacy block',
              subtitle: layout || 'Legacy layout',
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {label: 'label', items: 'items'},
    prepare: ({label, items}) => ({
      title: label || 'Legacy Showcase',
      subtitle: `${items?.length || 0} legacy item${items?.length === 1 ? '' : 's'}`,
      media: Clapperboard,
    }),
  },
});
