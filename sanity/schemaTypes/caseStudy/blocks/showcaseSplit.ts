import {Columns2} from 'lucide-react';
import {defineField, defineType} from 'sanity';
import {detailsField, storyBodyField, storyBodyPreview} from '../shared';
import {CaseStudyBlockPreview} from '../../../studio/CaseStudyBlockPreview';
import {BeatConfigStrip} from '../../../studio/BeatConfigStrip';
import {SurfaceToggleInput, CopyStyleInput, MediaTypeInput, TextAlignInput} from '../../../studio/CopyStyleStrip';

function resolveLayout(parent: Record<string, unknown> | undefined) {
  const imagePosition = parent?.imagePosition;
  if (imagePosition === 'left' || imagePosition === 'right' || imagePosition === 'full' || imagePosition === 'copyOnly') {
    return imagePosition;
  }

  const layoutMode = parent?.layoutMode;
  if (layoutMode === 'mediaLeft' || layoutMode === 'mediaRight' || layoutMode === 'full' || layoutMode === 'copyOnly') {
    return layoutMode === 'mediaRight' ? 'right' : layoutMode === 'mediaLeft' ? 'left' : layoutMode;
  }
  return 'left';
}

export const showcaseSplit = defineType({
  name: 'showcaseSplit',
  title: 'Image + Text Beat',
  description: 'One image and one story moment, side by side.',
  type: 'object',
  icon: Columns2,
  fieldsets: [
    {name: 'copyControls', title: 'Text Settings', options: {columns: 2}},
    {name: 'story', title: 'Story Copy'},
    {name: 'design', title: 'Advanced', options: {collapsible: true, collapsed: true, columns: 2}},
  ],
  fields: [
    defineField({
      name: 'imagePosition',
      title: 'Layout',
      type: 'string',
      description: 'Pick the shape of this beat.',
      options: {
        list: [
          {title: 'Media Left', value: 'left'},
          {title: 'Media Right', value: 'right'},
          {title: 'Full Width Image', value: 'full'},
          {title: 'Copy Only', value: 'copyOnly'},
        ],
        layout: 'radio',
      },
      initialValue: 'left',
      components: {
        input: BeatConfigStrip,
      },
    }),
    defineField({
      name: 'layoutMode',
      title: 'Deprecated Layout Mode',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      description: 'Choose whether this beat carries an image or a video.',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      components: {
        input: MediaTypeInput,
      },
      hidden: ({parent}) => resolveLayout(parent as Record<string, unknown> | undefined) === 'copyOnly',
    }),

    defineField({
      name: 'surface',
      title: 'Surface',
      type: 'string',
      options: {
        list: [
          {title: 'Dark', value: 'dark'},
          {title: 'Light', value: 'light'},
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
      components: {
        input: SurfaceToggleInput,
      },
    }),

    defineField({
      name: 'copyStyle',
      title: 'Text Style',
      type: 'string',
      fieldset: 'copyControls',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Display', value: 'display'},
          {title: 'Pull Quote', value: 'pull-quote'},
        ],
        layout: 'radio',
      },
      initialValue: 'default',
      components: {
        input: CopyStyleInput,
      },
    }),
    defineField({
      name: 'textAlign',
      title: 'Text Alignment',
      type: 'string',
      fieldset: 'copyControls',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'left',
      components: {
        input: TextAlignInput,
      },
    }),

    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      fieldset: 'story',
      placeholder: 'The system nobody was using',
      description: 'Optional — The headline for this beat. A working title is fine.',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      fieldset: 'story',
      placeholder: 'A complete interface overhaul in 14 weeks',
      description: 'A short line beneath the headline if the beat needs a second strike.',
    }),
    storyBodyField({
      name: 'body',
      title: 'Body',
      fieldset: 'story',
      placeholder: 'The old platform had 340 daily users. The new one needed to feel inevitable from day one...',
      description: 'Optional — What happened here, in plain language. Don\'t overthink it.',
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'The frame that carries this beat. Not needed for Copy Only layout.',
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
      hidden: ({parent}) => {
        const current = parent as Record<string, unknown>;
        return resolveLayout(current) === 'copyOnly' || current?.mediaType === 'video';
      },
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Paste a YouTube or Vimeo URL for this beat.',
      hidden: ({parent}) => {
        const current = parent as Record<string, unknown>;
        return resolveLayout(current) === 'copyOnly' || current?.mediaType !== 'video';
      },
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as Record<string, unknown> | undefined;
          if (resolveLayout(parent) === 'copyOnly' || parent?.mediaType !== 'video') return true;
          return typeof value === 'string' && value.trim()
            ? true
            : 'Add a video URL when this beat is set to video.';
        }),
    }),
    defineField({
      name: 'videoCaption',
      title: 'Video Caption',
      type: 'string',
      description: 'Optional caption under the player.',
      hidden: ({parent}) => {
        const current = parent as Record<string, unknown>;
        return resolveLayout(current) === 'copyOnly' || current?.mediaType !== 'video';
      },
    }),
    defineField({
      name: 'videoAspectRatio',
      title: 'Video Aspect Ratio',
      type: 'string',
      description: 'Shape of the embedded player.',
      options: {
        list: [
          {title: '16:9', value: '16/9'},
          {title: '4:3', value: '4/3'},
          {title: '1:1', value: '1/1'},
          {title: '9:16', value: '9/16'},
        ],
        layout: 'radio',
      },
      initialValue: '16/9',
      hidden: ({parent}) => {
        const current = parent as Record<string, unknown>;
        return resolveLayout(current) === 'copyOnly' || current?.mediaType !== 'video';
      },
    }),

    defineField({
      name: 'imageDisplay',
      title: 'Image Fit',
      type: 'string',
      fieldset: 'design',
      description: 'Crop to fill or show the whole image.',
      options: {
        list: [
          {title: 'Crop to fill', value: 'cover'},
          {title: 'Fit whole image', value: 'contain'},
        ],
        layout: 'radio',
      },
      initialValue: 'cover',
      hidden: ({parent}) => {
        const current = parent as Record<string, unknown>;
        return resolveLayout(current) === 'copyOnly' || current?.mediaType === 'video';
      },
    }),
    defineField({
      name: 'actLabel',
      title: 'Act Label',
      type: 'string',
      fieldset: 'design',
      placeholder: 'THE CHALLENGE',
      description: 'The story beat this belongs to.',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      fieldset: 'design',
      placeholder: 'Optional micro-label',
      description: 'Micro-label above the headline.',
    }),

    // Details
    detailsField(),
  ],
  preview: {
    select: {
      title: 'title',
      body: 'body',
      actLabel: 'actLabel',
      surface: 'surface',
      imagePosition: 'imagePosition',
      layoutMode: 'layoutMode',
      mediaType: 'mediaType',
      media: 'image',
    },
    prepare: ({title, body, actLabel, surface, layoutMode, imagePosition, mediaType, media}) => {
      const resolvedLayout = imagePosition === 'right' || layoutMode === 'mediaRight'
        ? 'mediaRight'
        : imagePosition === 'full' || layoutMode === 'full'
          ? 'full'
          : imagePosition === 'copyOnly' || layoutMode === 'copyOnly'
            ? 'copyOnly'
            : imagePosition === 'left' || layoutMode === 'mediaLeft'
              ? 'mediaLeft'
              : 'mediaLeft';

      const layoutLabel = resolvedLayout === 'full'
        ? 'Full width'
        : resolvedLayout === 'copyOnly'
          ? 'Copy only'
          : resolvedLayout === 'mediaRight'
            ? 'Media right'
            : 'Media left';
      const mediaLabel = resolvedLayout === 'copyOnly'
        ? undefined
        : mediaType === 'video'
          ? 'Video'
          : 'Image';
      const bodyPreview = storyBodyPreview(body);

      return {
        title: title || 'Image + Text Beat',
        subtitle: [actLabel, surface === 'light' ? 'Light' : 'Dark', layoutLabel, mediaLabel]
          .filter(Boolean)
          .join(' · '),
        description: title || bodyPreview || undefined,
        media: media || Columns2,
      };
    },
  },
  components: {
    preview: CaseStudyBlockPreview,
  },
});
