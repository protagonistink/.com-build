import {Newspaper} from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Blog Posts',
  type: 'document',
  icon: Newspaper,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
    }),
    defineField({
      name: 'mainImageUrl',
      title: 'Main Image URL',
      type: 'url',
      description: 'Optional external image URL fallback when no uploaded asset is set.',
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt Text' }),
            defineField({ name: 'caption', type: 'string', title: 'Caption' }),
            defineField({
              name: 'externalUrl',
              type: 'url',
              title: 'External Image URL',
              description:
                'Optional fallback for externally hosted images when no Sanity asset is attached.',
            }),
          ],
        },
        {
          type: 'object',
          name: 'pullQuote',
          title: 'Pull Quote',
          fields: [
            defineField({ name: 'text', type: 'text', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'text' } },
        },
        {
          type: 'image',
          name: 'fullBleedImage',
          title: 'Full Bleed Image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt Text' }),
            defineField({ name: 'caption', type: 'string', title: 'Caption' }),
          ],
        },
        {
          type: 'object',
          name: 'sectionDivider',
          title: 'Section Divider',
          fields: [
            defineField({
              name: 'variant',
              type: 'string',
              initialValue: 'rule',
              options: {
                list: [
                  { title: 'Rule', value: 'rule' },
                  { title: 'Marker (§)', value: 'marker' },
                  { title: 'Space', value: 'space' },
                ],
                layout: 'radio',
              },
            }),
          ],
          preview: { select: { title: 'variant' } },
        },
      ],
    }),
    defineField({
      name: 'seo',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', type: 'string' }),
        defineField({ name: 'metaDescription', type: 'text' }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Optional social-sharing override. If empty, the main image will be used.',
          options: {
            hotspot: true,
          },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
        }),
        defineField({ name: 'focusKeyword', type: 'string' }),
        defineField({ name: 'canonicalUrl', type: 'url' }),
      ],
    }),
    defineField({
      name: 'schema',
      type: 'object',
      fields: [
        defineField({ name: 'type', type: 'string' }),
        defineField({
          name: 'faqItems',
          title: 'FAQ Items',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'faqItem',
              fields: [
                defineField({ name: 'question', type: 'string', validation: (Rule) => Rule.required() }),
                defineField({ name: 'answer', type: 'text', validation: (Rule) => Rule.required() }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
    },
  },
});
