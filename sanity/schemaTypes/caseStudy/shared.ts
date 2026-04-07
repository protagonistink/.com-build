import {defineArrayMember, defineField} from 'sanity';
import type {ArrayRule} from 'sanity';
import {SurfacePickerInput} from '../../studio/VisualPickerInputs';

export const surfaceOptions = [
  {title: 'Dark Surface', value: 'dark'},
  {title: 'Light Surface', value: 'light'},
];

export function actLabelField(fieldset?: string) {
  return defineField({
    name: 'actLabel',
    title: 'Act Label',
    type: 'string',
    ...(fieldset && {fieldset}),
    description: 'Optional — The story beat this belongs to. Think “THE CHALLENGE” or “THE WORK.”',
  });
}

export function surfaceField(fieldset?: string) {
  return defineField({
    name: 'surface',
    title: 'Surface',
    type: 'string',
    ...(fieldset && {fieldset}),
    description: 'Optional — Light reads like notes on paper. Dark reads like the finished reel.',
    options: {
      list: surfaceOptions,
      layout: 'radio',
    },
    initialValue: 'dark',
    components: {
      input: SurfacePickerInput,
    },
  });
}

export function eyebrowField(fieldset?: string) {
  return defineField({
    name: 'eyebrow',
    title: 'Eyebrow',
    type: 'string',
    ...(fieldset && {fieldset}),
    description: 'Optional — Micro-label above the headline if this beat needs a cue card.',
  });
}

export function imageField(name: string, title: string, description: string) {
  return defineField({
    name,
    title,
    type: 'image',
    description,
    options: {
      hotspot: true,
    },
    fields: [
      defineField({
        name: 'alt',
        title: 'Alt Text',
        type: 'string',
        description: 'Describe what matters in the frame, not just what is technically visible.',
      }),
    ],
  });
}

export function detailsField() {
  return defineField({
    name: 'details',
    title: 'Supporting Details',
    type: 'array',
    description: 'Optional specs, proof points, or metadata that should sit quietly under the main beat.',
    of: [
      defineArrayMember({
        type: 'object',
        name: 'showcaseDetail',
        title: 'Detail',
        fields: [
          defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
          }),
          defineField({
            name: 'value',
            title: 'Value',
            type: 'string',
          }),
        ],
        preview: {
          select: {title: 'label', subtitle: 'value'},
        },
      }),
    ],
  });
}

export function storyBodyPreview(value?: unknown) {
  if (typeof value === 'string') return value.trim();
  if (!Array.isArray(value)) return '';

  return value
    .map((block) =>
      Array.isArray(block?.children)
        ? block.children
            .filter((child: {_type?: string; text?: string}) => child?._type === 'span')
            .map((child: {_type?: string; text?: string}) => child.text || '')
            .join('')
        : block?.quote || block?.title || block?.label || block?.caption || '',
    )
    .join('\n')
    .trim();
}

export function storyBodyField({
  fieldset,
  ...config
}: {
  name: string;
  title: string;
  description?: string;
  placeholder?: string;
  fieldset?: string;
  validation?: (rule: ArrayRule<unknown[]>) => ArrayRule<unknown[]>;
  deprecated?: {reason: string};
  readOnly?: boolean;
  hidden?: ({value}: {value: unknown}) => boolean;
  initialValue?: undefined;
}) {
  return defineField({
    ...config,
    ...(fieldset && {fieldset}),
    type: 'array',
    of: [
      defineArrayMember({
        type: 'block',
        styles: [
          {title: 'Paragraph', value: 'normal'},
          {title: 'Subhead', value: 'h2'},
          {title: 'Eyebrow', value: 'h3'},
          {title: 'Quote', value: 'blockquote'},
        ],
        lists: [
          {title: 'Bullet List', value: 'bullet'},
          {title: 'Numbered List', value: 'number'},
        ],
        marks: {
          decorators: [
            {title: 'Bold', value: 'strong'},
            {title: 'Italic', value: 'em'},
            {title: 'Code', value: 'code'},
          ],
          annotations: [
            defineArrayMember({
              name: 'link',
              type: 'object',
              title: 'Link',
              fields: [
                defineField({
                  name: 'href',
                  type: 'url',
                  title: 'URL',
                  validation: (rule) => rule.required().uri({scheme: ['http', 'https', 'mailto', 'tel']}),
                }),
                defineField({
                  name: 'blank',
                  type: 'boolean',
                  title: 'Open in new tab',
                  initialValue: true,
                }),
              ],
            }),
          ],
        },
      }),
      defineArrayMember({
        name: 'bodyImage',
        title: 'Image',
        type: 'image',
        options: {hotspot: true},
        fields: [
          defineField({
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'caption',
            title: 'Caption',
            type: 'string',
          }),
        ],
      }),
      defineArrayMember({
        name: 'bodyVideo',
        title: 'Video',
        type: 'object',
        fields: [
          defineField({
            name: 'url',
            title: 'Video URL',
            type: 'url',
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'caption',
            title: 'Caption',
            type: 'string',
          }),
          defineField({
            name: 'aspectRatio',
            title: 'Aspect Ratio',
            type: 'string',
            initialValue: '16/9',
            options: {
              list: [
                {title: '16:9', value: '16/9'},
                {title: '4:3', value: '4/3'},
                {title: '1:1', value: '1/1'},
                {title: '9:16', value: '9/16'},
              ],
              layout: 'radio',
            },
          }),
        ],
        preview: {
          select: {title: 'caption', subtitle: 'url'},
          prepare: ({title, subtitle}) => ({
            title: title || 'Video',
            subtitle: subtitle || 'Embedded video',
          }),
        },
      }),
      defineArrayMember({
        name: 'imageGallery',
        title: 'Multiple Images',
        type: 'object',
        fields: [
          defineField({
            name: 'title',
            title: 'Gallery Label',
            type: 'string',
          }),
          defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            validation: (rule) => rule.min(2).max(4),
            of: [
              defineArrayMember({
                type: 'image',
                options: {hotspot: true},
                fields: [
                  defineField({
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                    validation: (rule) => rule.required(),
                  }),
                  defineField({
                    name: 'caption',
                    title: 'Caption',
                    type: 'string',
                  }),
                ],
              }),
            ],
          }),
        ],
        preview: {
          select: {title: 'title', images: 'images'},
          prepare: ({title, images}) => ({
            title: title || 'Image Gallery',
            subtitle: `${images?.length || 0} image${images?.length === 1 ? '' : 's'}`,
          }),
        },
      }),
      defineArrayMember({
        name: 'statCallout',
        title: 'Stat',
        type: 'object',
        fields: [
          defineField({
            name: 'value',
            title: 'Value',
            type: 'string',
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'text',
            title: 'Context',
            type: 'text',
            rows: 3,
          }),
        ],
        preview: {
          select: {title: 'value', subtitle: 'label'},
        },
      }),
      defineArrayMember({
        name: 'promoCard',
        title: 'Promo',
        type: 'object',
        fields: [
          defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'text',
            title: 'Body',
            type: 'text',
            rows: 3,
          }),
          defineField({
            name: 'ctaLabel',
            title: 'CTA Label',
            type: 'string',
          }),
          defineField({
            name: 'ctaHref',
            title: 'CTA URL',
            type: 'url',
          }),
        ],
        preview: {
          select: {title: 'title', subtitle: 'ctaLabel'},
          prepare: ({title, subtitle}) => ({
            title: title || 'Promo',
            subtitle: subtitle || 'Callout card',
          }),
        },
      }),
    ],
  });
}
