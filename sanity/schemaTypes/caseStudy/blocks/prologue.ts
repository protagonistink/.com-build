import {BookOpen} from 'lucide-react';
import {defineField, defineType} from 'sanity';
import {detailsField} from '../shared';
import {CaseStudyBlockPreview} from '../../../studio/CaseStudyBlockPreview';

export const prologue = defineType({
  name: 'prologue',
  title: 'Prologue',
  description: 'Set the scene. Who was this for, what was off, and why it mattered.',
  type: 'object',
  icon: BookOpen,
  fields: [
    defineField({
      name: 'body',
      title: 'Opening Frame',
      type: 'text',
      rows: 5,
      placeholder: 'When Loom & Ledger came to us, their digital presence was a patchwork of three acquisitions and no coherent voice...',
      description: 'Set the table. Who was this for, what was off, and why did it matter? A rough draft is fine — you can sharpen it later.',
      validation: (rule) => rule.required(),
    }),
    detailsField(),
  ],
  preview: {
    select: {body: 'body'},
    prepare: ({body}) => ({
      title: 'Prologue',
      subtitle: body ? body.slice(0, 96) : 'Opening setup',
      description: body ? body.slice(0, 180) : undefined,
    }),
  },
  components: {
    preview: CaseStudyBlockPreview,
  },
});
