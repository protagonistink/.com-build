import { defineField, defineType, defineArrayMember } from 'sanity';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Studies',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'coldOpen', title: 'Cold Open' },
    { name: 'storyProblem', title: 'Story Problem' },
    { name: 'theWorld', title: 'The World' },
    { name: 'reframe', title: 'The Reframe' },
    { name: 'artifacts', title: 'Narrative Architecture' },
    { name: 'execution', title: 'Execution' },
    { name: 'theShift', title: 'The Shift' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ─── Hero ──────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'hero',
      description: 'Cinematic title for this case study. Think movie poster, not slide deck.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: 'hero',
      description:
        'The transformation line. Format: From "old state" to "new state" (e.g. From "invisible" to "unmissable").',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'hero',
      options: { source: 'title', maxLength: 96 },
      description: 'URL-friendly identifier. Auto-generated from the title.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'hero',
      description: 'Publishing workflow status.',
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
      title: 'Published At',
      type: 'datetime',
      group: 'hero',
      description: 'Date this case study goes live. Used for sorting and display.',
    }),
    defineField({
      name: 'clientName',
      title: 'Client / Organization',
      type: 'string',
      group: 'hero',
      description: 'The protagonist of this story. Who did we do this work for?',
    }),
    defineField({
      name: 'sector',
      title: 'Sector',
      type: 'string',
      group: 'hero',
      description: 'Industry or domain (e.g. Healthcare, SaaS, Hospitality).',
    }),
    defineField({
      name: 'engagementType',
      title: 'Engagement Type',
      type: 'string',
      group: 'hero',
      description: 'What we actually did (e.g. Brand Identity, Content Strategy, Web Design).',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'hero',
      description: 'The defining visual for this case study. Think cinematic, not corporate.',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility and SEO.',
        }),
      ],
    }),

    // ─── Cold Open ─────────────────────────────────────────────────────
    defineField({
      name: 'coldOpen',
      title: 'Cold Open',
      type: 'text',
      group: 'coldOpen',
      rows: 4,
      description:
        'One paragraph that drops the reader into the moment before everything changed. Set the scene — what was happening when the client first reached out?',
    }),

    // ─── Story Problem ─────────────────────────────────────────────────
    defineField({
      name: 'internalStory',
      title: 'Internal Story',
      type: 'text',
      group: 'storyProblem',
      rows: 4,
      description:
        'The story the client told themselves about who they were. What did they believe was true about their brand?',
    }),
    defineField({
      name: 'externalPerception',
      title: 'External Perception',
      type: 'text',
      group: 'storyProblem',
      rows: 4,
      description:
        'How the outside world actually saw them. Where was the gap between intention and impression?',
    }),
    defineField({
      name: 'consequences',
      title: 'Consequences',
      type: 'text',
      group: 'storyProblem',
      rows: 4,
      description:
        'What was at stake? What would happen if nothing changed? Make the reader feel the cost of inaction.',
    }),

    // ─── The World ─────────────────────────────────────────────────────
    defineField({
      name: 'mentors',
      title: 'Mentors',
      type: 'array',
      group: 'theWorld',
      description:
        'People, frameworks, or ideas that guided the work. Who helped shape the direction?',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Mentor',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              description: 'Person, framework, or guiding idea.',
            }),
            defineField({
              name: 'observation',
              title: 'Observation',
              type: 'text',
              rows: 2,
              description: 'What insight or guidance did they provide?',
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'observation' },
          },
        }),
      ],
    }),
    defineField({
      name: 'villains',
      title: 'Villains',
      type: 'array',
      group: 'theWorld',
      description:
        'Forces working against progress. Could be competitors, internal politics, market conditions, or bad assumptions.',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Villain',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              description: 'The opposing force or obstacle.',
            }),
            defineField({
              name: 'observation',
              title: 'Observation',
              type: 'text',
              rows: 2,
              description: 'How did this force manifest? What damage was it doing?',
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'observation' },
          },
        }),
      ],
    }),

    // ─── The Reframe ───────────────────────────────────────────────────
    defineField({
      name: 'reframe',
      title: 'The Reframe',
      type: 'text',
      group: 'reframe',
      rows: 3,
      description:
        'The pivotal insight. 1-2 sentences that capture the shift in thinking that unlocked everything. This is the "aha" moment.',
    }),
    defineField({
      name: 'reframeAnnotation',
      title: 'Reframe Annotation',
      type: 'string',
      group: 'reframe',
      description:
        'Optional handwriting-style margin note. A raw, unpolished thought scrawled in the margins. Keep it short and punchy.',
    }),

    // ─── Narrative Architecture ────────────────────────────────────────
    defineField({
      name: 'artifacts',
      title: 'Artifacts',
      type: 'array',
      group: 'artifacts',
      description:
        'Key deliverables and visual evidence of the work. Logos, layouts, brand boards, campaign shots — the proof.',
      of: [
        defineArrayMember({
          type: 'image',
          title: 'Artifact',
          options: {
            hotspot: true,
            aiAssist: {
              imageDescriptionField: 'alt',
            },
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Accessible description of the artifact.',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Short label shown on the artifact (e.g. "Brand Mark v2").',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              description: 'Brief explanation of what this artifact is and why it matters.',
            }),
          ],
        }),
      ],
    }),

    // ─── Execution ─────────────────────────────────────────────────────
    defineField({
      name: 'executionSurfaces',
      title: 'Execution Surfaces',
      type: 'array',
      group: 'execution',
      description:
        'Where the new story showed up in the real world. Website, packaging, social, signage — every touchpoint.',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Surface',
          fields: [
            defineField({
              name: 'surface',
              title: 'Surface',
              type: 'string',
              description: 'The touchpoint or channel (e.g. "Website", "Packaging", "Social Media").',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              description: 'What changed on this surface? What story does it tell now?',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
                aiAssist: {
                  imageDescriptionField: 'alt',
                },
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: 'Accessible description of the surface image.',
                }),
              ],
            }),
          ],
          preview: {
            select: { title: 'surface', subtitle: 'description', media: 'image' },
          },
        }),
      ],
    }),

    // ─── The Shift ─────────────────────────────────────────────────────
    defineField({
      name: 'shifts',
      title: 'Shifts',
      type: 'array',
      group: 'theShift',
      description:
        'Qualitative transformations. What changed beyond the numbers? Think identity, confidence, market position.',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Shift',
          fields: [
            defineField({
              name: 'dimension',
              title: 'Dimension',
              type: 'string',
              description: 'What dimension changed (e.g. "Brand Perception", "Team Alignment").',
            }),
            defineField({
              name: 'change',
              title: 'Change',
              type: 'text',
              rows: 2,
              description: 'Describe the before-and-after. Make the transformation concrete.',
            }),
          ],
          preview: {
            select: { title: 'dimension', subtitle: 'change' },
          },
        }),
      ],
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      group: 'theShift',
      description:
        'Hard numbers that tell the story. Revenue lift, engagement rates, conversion changes — the receipts.',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Metric',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'What was measured (e.g. "Organic Traffic", "Revenue Growth").',
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'The result (e.g. "+340%", "$1.2M", "3x").',
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        }),
      ],
    }),

    // ─── SEO ───────────────────────────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Custom title for search engines. Falls back to the main title if left blank.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
      description: 'Meta description for search results. Keep it under 160 characters.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      group: 'seo',
      description: 'Image shown when this page is shared on social media. 1200x630px recommended.',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Accessible description of the social sharing image.',
        }),
      ],
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      group: 'seo',
      description:
        'Set this only if this content originally lives elsewhere. Tells search engines where the "real" version is.',
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      group: 'seo',
      description: 'Hide this page from search engines. Useful for drafts or internal-only case studies.',
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
