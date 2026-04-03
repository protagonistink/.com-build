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
  ],
});
