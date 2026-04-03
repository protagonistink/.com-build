import {defineArrayMember, defineField} from 'sanity';
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
