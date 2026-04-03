import {Trophy} from 'lucide-react';
import {defineArrayMember, defineField, defineType} from 'sanity';
import {imageField} from '../shared';
import {CaseStudyBlockPreview} from '../../../studio/CaseStudyBlockPreview';

export const climax = defineType({
  name: 'climax',
  title: 'Climax',
  description: 'The payoff. Quote, metrics, proof.',
  type: 'object',
  icon: Trophy,
  fieldsets: [{name: 'metrics', title: 'Impact Metrics', options: {columns: 2}}],
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      initialValue: 'THE CLIMAX',
      description: 'The beat marker for the payoff.',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      placeholder: '"We didn\'t just get a new website. We got a new way of talking about what we do."',
      description: 'The line that earns the ending. A testimonial, a payoff, or whatever sentence lands the whole case. Leave blank if nothing fits yet.',
    }),
    imageField('backgroundImage', 'Background Image', 'Optional atmosphere behind the payoff section.'),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      description: 'Only add the proof points that sharpen the payoff.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'climaxMetric',
          title: 'Metric',
          fieldsets: [{name: 'pair', title: 'Metric', options: {columns: 2}}],
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              fieldset: 'pair',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              fieldset: 'pair',
            }),
          ],
          preview: {
            select: {title: 'value', subtitle: 'label'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {quote: 'quote', metricCount: 'metrics'},
    prepare: ({quote, metricCount}) => ({
      title: 'Climax',
      subtitle: quote ? quote.slice(0, 96) : `${metricCount?.length || 0} proof points`,
      description: quote ? quote.slice(0, 180) : undefined,
    }),
  },
  components: {
    preview: CaseStudyBlockPreview,
  },
});
