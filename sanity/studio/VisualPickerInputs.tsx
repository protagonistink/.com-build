import React from 'react';
import {Box, Card, Flex, Grid, Stack, Text} from '@sanity/ui';
import {PatchEvent, set, StringInputProps, unset} from 'sanity';

function handleSelect(
  nextValue: string,
  currentValue: string | undefined,
  onChange: StringInputProps['onChange'],
) {
  onChange(PatchEvent.from(nextValue === currentValue ? unset() : set(nextValue)));
}

function PickerCard(props: {
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  label: string;
  description: string;
}) {
  const {selected, disabled, onClick, children, label, description} = props;

  return (
    <Card
      as="button"
      type="button"
      radius={3}
      padding={3}
      tone="transparent"
      disabled={disabled}
      onClick={onClick}
      style={{
        width: '100%',
        textAlign: 'left',
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: selected
          ? '1px solid rgba(200, 60, 47, 0.9)'
          : '1px solid rgba(250, 248, 244, 0.08)',
        background: selected
          ? 'linear-gradient(180deg, rgba(200, 60, 47, 0.12) 0%, rgba(31, 28, 27, 0.96) 100%)'
          : 'linear-gradient(180deg, rgba(31, 28, 27, 0.98) 0%, rgba(22, 20, 19, 0.98) 100%)',
        boxShadow: selected ? '0 0 0 1px rgba(200, 60, 47, 0.18)' : 'none',
        opacity: disabled ? 0.45 : 1,
      }}
    >
      <Stack space={3}>
        {children}
        <Stack space={2}>
          <Text size={1} weight="semibold" style={{color: '#FAF8F4'}}>
            {label}
          </Text>
          <Text size={1} style={{color: 'rgba(250, 248, 244, 0.56)', lineHeight: 1.4}}>
            {description}
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
}

function SplitLayoutDiagram(props: {imageOnLeft: boolean; tone: 'dark' | 'light'}) {
  const {imageOnLeft, tone} = props;
  const storyBg = tone === 'dark' ? 'rgba(250, 248, 244, 0.06)' : '#FAF8F4';
  const imageBg = tone === 'dark' ? 'rgba(250, 248, 244, 0.14)' : 'rgba(20, 18, 17, 0.14)';
  const line = tone === 'dark' ? 'rgba(250, 248, 244, 0.08)' : 'rgba(20, 18, 17, 0.08)';

  return (
    <Grid columns={2} gap={2} style={{height: 88}}>
      {(imageOnLeft ? ['image', 'story'] : ['story', 'image']).map((part, index) => (
        <Card
          key={`${part}-${index}`}
          radius={2}
          style={{
            background: part === 'image' ? imageBg : storyBg,
            border: `1px solid ${line}`,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {part === 'image' ? (
            <>
              <Box
                style={{
                  position: 'absolute',
                  inset: 8,
                  borderRadius: 6,
                  background:
                    tone === 'dark'
                      ? 'linear-gradient(135deg, rgba(200, 60, 47, 0.22), rgba(250, 248, 244, 0.08))'
                      : 'linear-gradient(135deg, rgba(200, 60, 47, 0.18), rgba(20, 18, 17, 0.08))',
                }}
              />
              <Box
                style={{
                  position: 'absolute',
                  right: 12,
                  bottom: 12,
                  width: 28,
                  height: 2,
                  background: tone === 'dark' ? 'rgba(250, 248, 244, 0.22)' : 'rgba(20, 18, 17, 0.18)',
                }}
              />
            </>
          ) : (
            <Flex direction="column" gap={2} padding={3}>
              <Box style={{width: '65%', height: 3, background: tone === 'dark' ? '#FAF8F4' : '#1A1716', opacity: 0.72}} />
              <Box style={{width: '88%', height: 2, background: tone === 'dark' ? '#FAF8F4' : '#1A1716', opacity: 0.22}} />
              <Box style={{width: '82%', height: 2, background: tone === 'dark' ? '#FAF8F4' : '#1A1716', opacity: 0.22}} />
              <Box style={{width: '74%', height: 2, background: tone === 'dark' ? '#FAF8F4' : '#1A1716', opacity: 0.22}} />
            </Flex>
          )}
        </Card>
      ))}
    </Grid>
  );
}

export function SurfacePickerInput(props: StringInputProps) {
  const value = typeof props.value === 'string' ? props.value : 'dark';

  return (
    <Grid columns={[1, 2]} gap={3}>
      <PickerCard
        selected={value === 'dark'}
        disabled={props.readOnly}
        onClick={() => handleSelect('dark', value, props.onChange)}
        label="Dark Surface"
        description="Finished reel. Better for contrast, mood, and image-led sections."
      >
        <Card
          radius={2}
          style={{
            height: 88,
            border: '1px solid rgba(250, 248, 244, 0.08)',
            background: 'linear-gradient(180deg, #171413 0%, #0f0d0c 100%)',
          }}
        >
          <Flex direction="column" gap={2} padding={3}>
            <Box style={{width: 42, height: 3, background: '#FAF8F4', opacity: 0.88}} />
            <Box style={{width: '90%', height: 2, background: '#FAF8F4', opacity: 0.18}} />
            <Box style={{width: '82%', height: 2, background: '#FAF8F4', opacity: 0.18}} />
            <Box style={{width: '66%', height: 2, background: '#FAF8F4', opacity: 0.18}} />
          </Flex>
        </Card>
      </PickerCard>

      <PickerCard
        selected={value === 'light'}
        disabled={props.readOnly}
        onClick={() => handleSelect('light', value, props.onChange)}
        label="Light Surface"
        description="Notes on paper. Better when the copy should breathe more than the image."
      >
        <Card
          radius={2}
          style={{
            height: 88,
            border: '1px solid rgba(20, 18, 17, 0.08)',
            background: 'linear-gradient(180deg, #faf8f4 0%, #f1ece5 100%)',
          }}
        >
          <Flex direction="column" gap={2} padding={3}>
            <Box style={{width: 42, height: 3, background: '#1A1716', opacity: 0.76}} />
            <Box style={{width: '90%', height: 2, background: '#1A1716', opacity: 0.14}} />
            <Box style={{width: '82%', height: 2, background: '#1A1716', opacity: 0.14}} />
            <Box style={{width: '66%', height: 2, background: '#1A1716', opacity: 0.14}} />
          </Flex>
        </Card>
      </PickerCard>
    </Grid>
  );
}

export function ImagePositionPickerInput(props: StringInputProps) {
  const value = typeof props.value === 'string' ? props.value : 'left';

  return (
    <Grid columns={[1, 2]} gap={3}>
      <PickerCard
        selected={value === 'left'}
        disabled={props.readOnly}
        onClick={() => handleSelect('left', value, props.onChange)}
        label="Image Left"
        description="Lead with the frame, let the copy answer it."
      >
        <SplitLayoutDiagram imageOnLeft tone="dark" />
      </PickerCard>

      <PickerCard
        selected={value === 'right'}
        disabled={props.readOnly}
        onClick={() => handleSelect('right', value, props.onChange)}
        label="Image Right"
        description="Lead with the copy, let the frame land second."
      >
        <SplitLayoutDiagram imageOnLeft={false} tone="dark" />
      </PickerCard>
    </Grid>
  );
}
