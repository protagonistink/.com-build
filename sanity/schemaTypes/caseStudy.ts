import {FolderOpenDot} from 'lucide-react';
import {defineArrayMember, defineField, defineType} from 'sanity';
import {StoryBuilderInput} from '../studio/StoryBuilderInput';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Studies',
  type: 'document',
  icon: FolderOpenDot,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'story', title: 'Story'},
    {name: 'publishing', title: 'Publishing'},
    {name: 'seo', title: 'SEO'},
  ],
  fieldsets: [
    {name: 'identity', title: 'Case File Details', group: 'hero', options: {columns: 2}},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'hero',
      description: 'The case file title. It should feel like a held breath, not a slide headline.',
      placeholder: 'The Silent Transformation',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: 'hero',
      description: 'The transformation line. What changed, for whom, and why it mattered.',
      placeholder: 'From fragmented legacy systems to a cohesive digital signature.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'publishing',
      options: {source: 'title', maxLength: 96},
      description: 'URL handle — auto-generated from the title. You can usually ignore this.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'publishing',
      description: 'Nothing goes live until this says "Published." You\'re safe to save drafts anytime.',
      options: {
        list: [
          {title: 'Draft — just getting ideas down', value: 'draft'},
          {title: 'Ready for Review — I think this is done', value: 'scheduled'},
          {title: 'Published — live on the site', value: 'published'},
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'publishing',
      description: 'Optional — set this when the case file should officially go live.',
    }),
    defineField({
      name: 'clientName',
      title: 'Client / Organization',
      type: 'string',
      group: 'hero',
      fieldset: 'identity',
      description: 'Whose story are we stepping into?',
      placeholder: 'Loom & Ledger',
    }),
    defineField({
      name: 'sector',
      title: 'Sector',
      type: 'string',
      group: 'hero',
      fieldset: 'identity',
      description: 'The world this work had to move inside of.',
      placeholder: 'Luxury Retail',
    }),
    defineField({
      name: 'engagementType',
      title: 'Engagement Type',
      type: 'string',
      group: 'hero',
      fieldset: 'identity',
      description: 'How to frame the work at a glance.',
      placeholder: 'Creative Strategy',
    }),
    defineField({
      name: 'caseNumber',
      title: 'Case Number',
      type: 'string',
      group: 'hero',
      fieldset: 'identity',
      description: 'Short file number for the hero treatment. Think “042,” not a database ID.',
      placeholder: '042',
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
      group: 'hero',
      fieldset: 'identity',
      description: 'How long the work lived. “14 weeks” is enough.',
      placeholder: '14 Weeks',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'hero',
      description: 'The image that should carry the opening frame.',
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
      name: 'sections',
      title: 'Story Builder',
      type: 'array',
      group: 'story',
      description: 'Build the case file beat by beat. Start with the Prologue, add your story beats, then close it out.',
      validation: (rule) =>
        rule.custom((sections) => {
          if (!sections || sections.length === 0) return true;
          const types = (sections as Array<{_type: string}>).map((s) => s._type);
          const warnings: string[] = [];
          if (!types.includes('prologue')) {
            warnings.push('Most case files start with a Prologue');
          }
          if (!types.includes('closer')) {
            warnings.push('A Closer gives the story a landing');
          }
          if (warnings.length > 0) {
            return {message: warnings.join('. ') + '.', level: 'warning'} as unknown as string;
          }
          return true;
        }),
      of: [
        defineArrayMember({type: 'prologue'}),
        defineArrayMember({type: 'showcaseSplit'}),
        defineArrayMember({type: 'showcaseFullBleed'}),
        defineArrayMember({type: 'showcaseFilmStrip'}),
        defineArrayMember({type: 'showcaseStat'}),
        defineArrayMember({type: 'videoEmbed'}),
        defineArrayMember({type: 'deliverables'}),
        defineArrayMember({type: 'climax'}),
        defineArrayMember({type: 'closer'}),
      ],
      components: {
        input: StoryBuilderInput,
      },
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Search title if it needs to differ from the on-page title.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
      description: 'The concise version someone should see before they click.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      group: 'seo',
      description: 'Social-sharing override if the hero frame is not the right crop.',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alt Text', type: 'string'}),
      ],
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      group: 'seo',
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      group: 'seo',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'clientName', media: 'heroImage'},
    prepare: ({title, subtitle, media}) => ({
      title,
      subtitle: subtitle || 'Case file',
      media,
    }),
  },
});
