import React, {useCallback} from 'react';
import {Box, Card, Flex, Grid, Stack, Text, TextInput} from '@sanity/ui';
import {type StringInputProps, useFormValue, set, unset} from 'sanity';

// ─── Compact layout card ────────────────────────────────────────────────────

function LayoutCard({
  selected,
  onClick,
  label,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      as="button"
      type="button"
      radius={2}
      padding={2}
      tone="transparent"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        border: selected
          ? '1px solid rgba(200, 60, 47, 0.8)'
          : '1px solid rgba(250, 248, 244, 0.08)',
        background: selected
          ? 'rgba(200, 60, 47, 0.1)'
          : 'rgba(250, 248, 244, 0.02)',
        textAlign: 'center',
        transition: 'all 0.12s ease',
      }}
    >
      <Stack space={2}>
        <Flex align="center" justify="center" style={{height: 40}}>
          {children}
        </Flex>
        <Text
          size={0}
          weight={selected ? 'semibold' : 'regular'}
          style={{
            color: selected ? 'rgba(200, 60, 47, 0.9)' : 'rgba(250, 248, 244, 0.5)',
            fontSize: '10px',
            letterSpacing: '0.02em',
          }}
        >
          {label}
        </Text>
      </Stack>
    </Card>
  );
}

// ─── Layout wireframe icons ─────────────────────────────────────────────────

function IconSplitLeft() {
  return (
    <Flex gap={1} style={{width: 36, height: 28}}>
      <Box style={{flex: 1, borderRadius: 2, background: 'rgba(200, 60, 47, 0.25)'}} />
      <Flex direction="column" gap={1} justify="center" style={{flex: 1}}>
        <Box style={{height: 2, width: '80%', background: 'rgba(250,248,244,0.4)'}} />
        <Box style={{height: 1, width: '100%', background: 'rgba(250,248,244,0.15)'}} />
        <Box style={{height: 1, width: '90%', background: 'rgba(250,248,244,0.15)'}} />
      </Flex>
    </Flex>
  );
}

function IconSplitRight() {
  return (
    <Flex gap={1} style={{width: 36, height: 28}}>
      <Flex direction="column" gap={1} justify="center" style={{flex: 1}}>
        <Box style={{height: 2, width: '80%', background: 'rgba(250,248,244,0.4)'}} />
        <Box style={{height: 1, width: '100%', background: 'rgba(250,248,244,0.15)'}} />
        <Box style={{height: 1, width: '90%', background: 'rgba(250,248,244,0.15)'}} />
      </Flex>
      <Box style={{flex: 1, borderRadius: 2, background: 'rgba(200, 60, 47, 0.25)'}} />
    </Flex>
  );
}

function IconFullWidth() {
  return (
    <Stack space={1} style={{width: 36, height: 28}}>
      <Box style={{height: 16, borderRadius: 2, background: 'rgba(200, 60, 47, 0.25)'}} />
      <Box style={{height: 2, width: '70%', background: 'rgba(250,248,244,0.4)'}} />
      <Box style={{height: 1, width: '90%', background: 'rgba(250,248,244,0.15)'}} />
    </Stack>
  );
}

function IconCopyOnly() {
  return (
    <Flex align="center" justify="center" style={{width: 36, height: 28}}>
      <Stack space={1}>
        <Box style={{height: 2, width: 24, background: 'rgba(250,248,244,0.4)', margin: '0 auto'}} />
        <Box style={{height: 1, width: 32, background: 'rgba(250,248,244,0.15)'}} />
        <Box style={{height: 1, width: 28, background: 'rgba(250,248,244,0.15)'}} />
        <Box style={{height: 1, width: 24, background: 'rgba(250,248,244,0.15)'}} />
      </Stack>
    </Flex>
  );
}

// ─── Pill toggle ────────────────────────────────────────────────────────────

function PillToggle({
  options,
  value,
  onChange,
}: {
  options: {label: string; value: string}[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Flex
      gap={0}
      style={{
        border: '1px solid rgba(250, 248, 244, 0.1)',
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      {options.map((opt, i) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          style={{
            padding: '4px 10px',
            fontSize: 10,
            letterSpacing: '0.02em',
            cursor: 'pointer',
            border: 'none',
            background: value === opt.value ? 'rgba(200, 60, 47, 0.15)' : 'transparent',
            color: value === opt.value ? 'rgba(200, 60, 47, 0.9)' : 'rgba(250, 248, 244, 0.4)',
            fontWeight: value === opt.value ? 600 : 400,
            transition: 'all 0.12s ease',
            borderRight: i < options.length - 1 ? '1px solid rgba(250, 248, 244, 0.06)' : 'none',
          }}
        >
          {opt.label}
        </button>
      ))}
    </Flex>
  );
}

// ─── Main: replaces the imagePosition field input ───────────────────────────
// This component also controls surface, imageDisplay, actLabel, and eyebrow
// by patching sibling fields on the parent object.

export function BeatConfigStrip(props: StringInputProps) {
  const {onChange, path} = props;

  // Read sibling field values from the parent object
  const parentPath = path.slice(0, -1);
  const imagePosition = (useFormValue([...parentPath, 'imagePosition']) as string) || 'left';
  const surface = (useFormValue([...parentPath, 'surface']) as string) || 'dark';
  const imageDisplay = (useFormValue([...parentPath, 'imageDisplay']) as string) || 'cover';
  const actLabel = (useFormValue([...parentPath, 'actLabel']) as string) || '';
  const eyebrow = (useFormValue([...parentPath, 'eyebrow']) as string) || '';

  const showImageFit = imagePosition !== 'copyOnly';

  // Patch the imagePosition field (this field's own onChange)
  const setLayout = useCallback(
    (val: string) => {
      onChange(set(val));
    },
    [onChange],
  );

  // Patch sibling fields using document-level patches
  const patchSibling = useCallback(
    (fieldName: string, val: string) => {
      // We need to use the onChange from props but target sibling paths
      // Since StringInputProps.onChange only patches this field,
      // we'll use the native form patching via the path
      props.onChange(set(val, [fieldName]));
    },
    [props],
  );

  // Unfortunately StringInputProps.onChange can only patch its own field.
  // To patch siblings we need to render via the parent. Let's use a different approach:
  // Render the default hidden fields and just handle imagePosition here,
  // while the other fields use their own inputs rendered by the parent.

  // Actually — the cleanest approach: this component ONLY handles the layout picker.
  // The rest (surface, imageDisplay, actLabel, eyebrow) render as their own fields
  // but we'll make them compact via the schema layout.

  return (
    <Grid columns={4} gap={2}>
      <LayoutCard selected={imagePosition === 'left'} onClick={() => setLayout('left')} label="Left">
        <IconSplitLeft />
      </LayoutCard>
      <LayoutCard selected={imagePosition === 'right'} onClick={() => setLayout('right')} label="Right">
        <IconSplitRight />
      </LayoutCard>
      <LayoutCard selected={imagePosition === 'full'} onClick={() => setLayout('full')} label="Full">
        <IconFullWidth />
      </LayoutCard>
      <LayoutCard selected={imagePosition === 'copyOnly'} onClick={() => setLayout('copyOnly')} label="Copy">
        <IconCopyOnly />
      </LayoutCard>
    </Grid>
  );
}
