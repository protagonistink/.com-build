import { defineField, defineType } from 'sanity';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Studies',
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
      name: 'status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Scheduled', value: 'scheduled' },
          { title: 'Published', value: 'published' },
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'clientName',
      type: 'string',
      title: 'Client / Organization',
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [defineField({ name: 'alt', type: 'string' })],
    }),
    defineField({
      name: 'summary',
      type: 'text',
    }),
    defineField({
      name: 'challenge',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'approach',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'outcome',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'fullStory',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: {
            hotspot: true,
            aiAssist: {
              imageDescriptionField: 'alt',
            },
          },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt Text' }),
            defineField({ name: 'caption', type: 'string', title: 'Caption' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'ctaVariant',
      type: 'string',
    }),
    defineField({
      name: 'seoTitle',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      type: 'text',
    }),
    defineField({
      name: 'ogImage',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [defineField({ name: 'alt', type: 'string' })],
    }),
    defineField({
      name: 'canonicalUrl',
      type: 'url',
    }),
    defineField({
      name: 'noIndex',
      type: 'boolean',
    }),
    defineField({
      name: 'industry',
      type: 'string',
      title: 'Industry',
    }),
    defineField({
      name: 'businessCategory',
      type: 'string',
      title: 'Business Category',
    }),
    defineField({
      name: 'campaignCategory',
      type: 'string',
      title: 'Campaign Category',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'clientName',
      media: 'heroImage',
    },
  },
});
