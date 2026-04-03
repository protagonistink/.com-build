import {BadgePercent} from 'lucide-react';
import {defineField, defineType} from 'sanity';
import {actLabelField, detailsField, eyebrowField, surfaceField} from '../shared';
import {CaseStudyBlockPreview} from '../../../studio/CaseStudyBlockPreview';

export const showcaseStat = defineType({
  name: 'showcaseStat',
  title: 'Numbers That Hit',
  description: 'A big stat with context that turns a number into a story beat.',
  type: 'object',
  icon: BadgePercent,
  fieldsets: [
    {name: 'settings', title: 'Settings', options: {collapsible: true, collapsed: true}},
    {name: 'stat', title: 'Stat', options: {columns: 2}},
  ],
  fields: [
    actLabelField('settings'),
    surfaceField('settings'),
    eyebrowField('settings'),
    defineField({
      name: 'statValue',
      title: 'Stat Value',
      type: 'string',
      fieldset: 'stat',
      placeholder: '340%',
      description: 'The number or shorthand that should hit first.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'statLabel',
      title: 'Stat Label',
      type: 'string',
      fieldset: 'stat',
      placeholder: 'increase in daily active users',
      description: 'What the number means in one line.',
    }),
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      placeholder: 'The number that changed the conversation',
      description: 'Optional supporting headline beside the number.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
      placeholder: 'Before the rebrand, engagement was a polite fiction. After launch, the numbers told a different story...',
      description: 'Context that turns the number into a story beat instead of a decorative stat.',
    }),
    detailsField(),
  ],
  preview: {
    select: {
      title: 'statValue',
      body: 'body',
      statLabel: 'statLabel',
      actLabel: 'actLabel',
      surface: 'surface',
    },
    prepare: ({title, body, statLabel, actLabel, surface}) => ({
      title: title || 'Numbers That Hit',
      subtitle: [actLabel, surface === 'light' ? 'Light surface' : 'Dark surface', statLabel || 'Big number + context']
        .filter(Boolean)
        .join(' · '),
      description: title || body || undefined,
      media: BadgePercent,
    }),
  },
  components: {
    preview: CaseStudyBlockPreview,
  },
});
