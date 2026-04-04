import {Settings2, Globe} from 'lucide-react';
import {defineArrayMember, defineField, defineType} from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: Settings2,
  groups: [
    {name: 'branding', title: 'Branding', default: true},
    {name: 'seo', title: 'Global SEO'},
    {name: 'social', title: 'Social Presence'},
    {name: 'navigation', title: 'Navigation'},
    {name: 'cta', title: 'Call to Action'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      group: 'branding',
      description: 'The primary name of your digital home.',
      placeholder: 'Protagonist Ink',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright / Brand Mark',
      type: 'string',
      group: 'branding',
      description: 'The line that sits at the foot of every page.',
      placeholder: '© 2026 Protagonist Ink. Built for the bold.',
    }),
    defineField({
      name: 'description',
      title: 'Global Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      description: 'The core narrative for search engines and social previews.',
      placeholder: 'A creative agency dedicated to the craft of storytelling and digital transformation.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Global Open Graph Image',
      type: 'image',
      group: 'seo',
      description: 'The fallback image for sharing your site home.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      group: 'social',
      description: 'Where else the brand lives.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Twitter / X', value: 'twitter'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'Threads', value: 'threads'},
                  {title: 'Other', value: 'other'},
                ],
              },
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ],
          preview: {
            select: {title: 'platform', subtitle: 'url'},
            prepare: ({title, subtitle}) => ({
              title: title ? title.charAt(0).toUpperCase() + title.slice(1) : 'Social Link',
              subtitle,
              media: Globe,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'navigation',
      title: 'Main Navigation',
      type: 'array',
      group: 'navigation',
      description: 'The links that appear in the site header. Drag to reorder.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navItem',
          title: 'Nav Item',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'What the link says in the nav bar.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'linkType',
              title: 'Link Type',
              type: 'string',
              description: 'Is this a page on your site or an outside link?',
              options: {
                list: [
                  {title: 'Internal Page', value: 'internal'},
                  {title: 'External URL', value: 'external'},
                ],
                layout: 'radio',
              },
              initialValue: 'internal',
            }),
            defineField({
              name: 'internalPath',
              title: 'Page Path',
              type: 'string',
              description: 'The path on your site, like /about or /work',
              placeholder: '/about',
              hidden: ({parent}) => parent?.linkType !== 'internal',
            }),
            defineField({
              name: 'externalUrl',
              title: 'External URL',
              type: 'url',
              description: 'Full URL including https://',
              hidden: ({parent}) => parent?.linkType !== 'external',
            }),
            defineField({
              name: 'highlighted',
              title: 'Highlight',
              type: 'boolean',
              description: 'Optional — Makes this link visually stand out (like a CTA button).',
              initialValue: false,
            }),
          ],
          preview: {
            select: {title: 'label', linkType: 'linkType', path: 'internalPath', url: 'externalUrl'},
            prepare: ({title, linkType, path, url}) => ({
              title: title || 'Nav Item',
              subtitle: linkType === 'external' ? url : path,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'ctaHeadline',
      title: 'CTA Headline',
      type: 'string',
      group: 'cta',
      description: 'The big line above the call-to-action button on the homepage.',
      placeholder: 'Want to know if your story lands?',
    }),
    defineField({
      name: 'ctaBody',
      title: 'CTA Body',
      type: 'text',
      rows: 2,
      group: 'cta',
      description: 'Optional — A supporting line under the headline.',
      placeholder: 'Every week without a clear story means your competitors don\'t have to be better — just louder.',
    }),
    defineField({
      name: 'ctaButtonLabel',
      title: 'Button Label',
      type: 'string',
      group: 'cta',
      description: 'What the button says.',
      placeholder: 'We\'ll Tear Down Your Story',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'Button Link',
      type: 'string',
      group: 'cta',
      description: 'Where the button goes. Can be a path like /story-teardown or a full URL.',
      placeholder: '/story-teardown',
    }),
  ],
});
