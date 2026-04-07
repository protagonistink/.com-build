import React, {useCallback} from 'react';
import {Box, Card, Flex, Stack, Text} from '@sanity/ui';
import {type StringInputProps, set} from 'sanity';

type LayoutValue = 'left' | 'right' | 'full' | 'copyOnly';

function normalizeLayoutValue(value: unknown): LayoutValue {
  if (value === 'mediaRight' || value === 'right') return 'right';
  if (value === 'full') return 'full';
  if (value === 'copyOnly') return 'copyOnly';
  return 'left';
}

function LayoutCard({
  selected,
  onClick,
  label,
  description,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      as="button"
      type="button"
      radius={2}
      padding={3}
      tone="transparent"
      onClick={onClick}
      aria-pressed={selected}
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
        minHeight: 104,
      }}
    >
      <Stack space={3}>
        <Flex align="center" justify="center" style={{height: 32}}>
          {children}
        </Flex>
        <Stack space={2}>
          <Text
            size={1}
            weight={selected ? 'semibold' : 'regular'}
            style={{
              color: selected ? 'rgba(200, 60, 47, 0.9)' : 'rgba(250, 248, 244, 0.72)',
              fontSize: '13px',
              lineHeight: 1.2,
            }}
          >
            {label}
          </Text>
          <Text
            size={0}
            style={{
              color: 'rgba(250, 248, 244, 0.42)',
              fontSize: '11px',
              lineHeight: 1.35,
            }}
          >
            {description}
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
}

function IconSplitLeft() {
  return (
    <Flex gap={2} style={{width: 42, height: 26}}>
      <Box style={{flex: 1, borderRadius: 2, background: 'rgba(200, 60, 47, 0.3)'}} />
      <Flex direction="column" gap={1} justify="center" style={{flex: 1}}>
        <Box style={{height: 2, width: '78%', background: 'rgba(250,248,244,0.42)'}} />
        <Box style={{height: 1, width: '100%', background: 'rgba(250,248,244,0.16)'}} />
        <Box style={{height: 1, width: '84%', background: 'rgba(250,248,244,0.16)'}} />
      </Flex>
    </Flex>
  );
}

function IconSplitRight() {
  return (
    <Flex gap={2} style={{width: 42, height: 26}}>
      <Flex direction="column" gap={1} justify="center" style={{flex: 1}}>
        <Box style={{height: 2, width: '78%', background: 'rgba(250,248,244,0.42)'}} />
        <Box style={{height: 1, width: '100%', background: 'rgba(250,248,244,0.16)'}} />
        <Box style={{height: 1, width: '84%', background: 'rgba(250,248,244,0.16)'}} />
      </Flex>
      <Box style={{flex: 1, borderRadius: 2, background: 'rgba(200, 60, 47, 0.3)'}} />
    </Flex>
  );
}

function IconFullWidth() {
  return (
    <Stack space={1} style={{width: 42, height: 26}}>
      <Box style={{height: 14, borderRadius: 2, background: 'rgba(200, 60, 47, 0.3)'}} />
      <Box style={{height: 2, width: '72%', background: 'rgba(250,248,244,0.42)'}} />
      <Box style={{height: 1, width: '92%', background: 'rgba(250,248,244,0.16)'}} />
    </Stack>
  );
}

function IconCopyOnly() {
  return (
    <Flex align="center" justify="center" style={{width: 42, height: 26}}>
      <Stack space={1}>
        <Box style={{height: 2, width: 26, background: 'rgba(250,248,244,0.42)', margin: '0 auto'}} />
        <Box style={{height: 1, width: 34, background: 'rgba(250,248,244,0.16)'}} />
        <Box style={{height: 1, width: 29, background: 'rgba(250,248,244,0.16)'}} />
        <Box style={{height: 1, width: 24, background: 'rgba(250,248,244,0.16)'}} />
      </Stack>
    </Flex>
  );
}

export function BeatConfigStrip(props: StringInputProps) {
  const {onChange, readOnly, value} = props;
  const layoutMode = normalizeLayoutValue(value);

  const setLayout = useCallback(
    (val: LayoutValue) => {
      if (!readOnly) onChange(set(val));
    },
    [onChange, readOnly],
  );

  return (
    <Box
      style={{
        display: 'grid',
        gap: 12,
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      }}
    >
      <LayoutCard
        selected={layoutMode === 'left'}
        onClick={() => setLayout('left')}
        label="Media Left"
        description="Media on the left, copy on the right."
      >
        <IconSplitLeft />
      </LayoutCard>
      <LayoutCard
        selected={layoutMode === 'right'}
        onClick={() => setLayout('right')}
        label="Media Right"
        description="Copy on the left, media on the right."
      >
        <IconSplitRight />
      </LayoutCard>
      <LayoutCard
        selected={layoutMode === 'full'}
        onClick={() => setLayout('full')}
        label="Full Width"
        description="Media across the top, copy underneath."
      >
        <IconFullWidth />
      </LayoutCard>
      <LayoutCard
        selected={layoutMode === 'copyOnly'}
        onClick={() => setLayout('copyOnly')}
        label="Copy Only"
        description="No media. Just the writing."
      >
        <IconCopyOnly />
      </LayoutCard>
    </Box>
  );
}
