import {Newspaper} from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Blog Posts',
  type: 'document',
  icon: Newspaper,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      description: 'The headline. Make it count — this is what shows in search and on the blog index.',
      placeholder: 'The Quiet Power of Saying Less',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      description: 'URL handle — auto-generated from the title. You can usually ignore this.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      group: 'content',
      description: 'When this post goes live. Set this to today if you want it published now.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      group: 'content',
      description: 'A short summary for the blog index and social previews. Two to three sentences is enough.',
      placeholder: 'Most brands talk too much. Here is what happens when you stop...',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'content',
      description: 'The hero image for this post. Shows at the top and in social previews.',
      options: {
        hotspot: true,
      },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
    }),
    defineField({
      name: 'mainImageUrl',
      title: 'Main Image URL',
      type: 'url',
      group: 'content',
      description: 'Optional — External image URL if you are not uploading directly.',
    }),
    defineField({
      name: 'body',
      type: 'array',
      group: 'content',
      description: 'The full post. Write in blocks — paragraphs, images, pull quotes, dividers.',
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
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'settings',
      description: 'Nothing goes live until this says "Published." You\'re safe to save drafts anytime.',
      options: {
        list: [
          {title: 'Draft — just getting ideas down', value: 'draft'},
          {title: 'Published — live on the site', value: 'published'},
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'categories',
      type: 'array',
      group: 'settings',
      description: 'Optional — Tag this post with one or more categories.',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      group: 'settings',
      description: 'Optional — Featured posts appear first on the blog index.',
    }),
    defineField({
      name: 'seo',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({
          name: 'metaTitle',
          type: 'string',
          description: 'Override the page title for search engines. Keep it under 60 characters.',
          validation: (Rule) =>
            Rule.max(60).warning('SEO titles over 60 characters get truncated in search results.'),
        }),
        defineField({
          name: 'metaDescription',
          type: 'text',
          description: 'The snippet search engines show. Keep it under 160 characters.',
          validation: (Rule) =>
            Rule.max(160).warning('SEO descriptions over 160 characters get cut off in search results.'),
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Social sharing image override. Falls back to the main image.',
          options: {
            hotspot: true,
          },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
        }),
        defineField({
          name: 'focusKeyword',
          type: 'string',
          description: 'Optional — The primary keyword you want this post to rank for.',
        }),
        defineField({
          name: 'canonicalUrl',
          type: 'url',
          description: 'Optional — Only set this if the content lives on another URL first.',
        }),
      ],
    }),
    defineField({
      name: 'schema',
      type: 'object',
      group: 'seo',
      description: 'Optional — Structured data for search engines. Patrick handles this.',
      fields: [
        defineField({
          name: 'type',
          type: 'string',
          description: 'Schema.org type for this post.',
        }),
        defineField({
          name: 'faqItems',
          title: 'FAQ Items',
          type: 'array',
          description: 'FAQ entries that generate rich snippets in search results.',
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
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
    },
  },
});
