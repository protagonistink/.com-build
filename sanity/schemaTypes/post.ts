import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Blog Posts',
  type: 'document',
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
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
    }),
    defineField({
      name: 'mainImageUrl',
      title: 'Main Image URL',
      type: 'url',
      description: 'Optional external image URL fallback when no uploaded asset is set.',
    }),
    defineField({
      name: 'mainImageAlt',
      title: 'Main Image Alt Text',
      type: 'string',
      description: 'Alternative text for the main image URL fallback.',
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image (Legacy)',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
      description: 'Legacy top-level OG image field kept for backwards compatibility.',
    }),
    defineField({
      name: 'seo',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', type: 'string' }),
        defineField({ name: 'metaDescription', type: 'text' }),
        defineField({
          name: 'ogImage',
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
        }),
        defineField({ name: 'focusKeyword', type: 'string' }),
        defineField({ name: 'canonicalUrl', type: 'url' }),
      ],
    }),
    defineField({
      name: 'schema',
      type: 'object',
      fields: [defineField({ name: 'type', type: 'string' })],
    }),
    defineField({
      name: 'readingTime',
      type: 'number',
      title: 'Reading Time (Minutes)',
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
