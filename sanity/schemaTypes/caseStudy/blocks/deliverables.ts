import {Package} from 'lucide-react';
import {defineArrayMember, defineField, defineType} from 'sanity';
import {CaseStudyBlockPreview} from '../../../studio/CaseStudyBlockPreview';

export const deliverables = defineType({
  name: 'deliverables',
  title: 'Deliverables',
  description: 'The list of what got made.',
  type: 'object',
  icon: Package,
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      placeholder: 'What We Built',
      description: 'Name the body of work without sounding like a services menu.',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'string',
      placeholder: 'The tangible outputs of a 14-week engagement',
      description: 'Optional line that frames what the list represents.',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      description: 'The outputs that made the work tangible.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'deliverableItem',
          title: 'Deliverable',
          fieldsets: [{name: 'lead', title: 'Lead', options: {columns: 2}}],
          fields: [
            defineField({
              name: 'number',
              title: 'Number',
              type: 'string',
              fieldset: 'lead',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              fieldset: 'lead',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'number'},
          },
        }),
      ],
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
    }),
  ],
  preview: {
    select: {headline: 'headline', items: 'items'},
    prepare: ({headline, items}) => ({
      title: headline || 'Deliverables',
      subtitle: `${items?.length || 0} deliverables`,
      description: headline || undefined,
      media: Package,
    }),
  },
  components: {
    preview: CaseStudyBlockPreview,
  },
});
