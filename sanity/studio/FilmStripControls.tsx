import React from 'react';
import {Box, Card, Flex, Grid, Stack, Text} from '@sanity/ui';
import {type StringInputProps, set} from 'sanity';

function ControlCard(props: {
  selected: boolean;
  onClick: () => void;
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  const {selected, onClick, label, description, children} = props;

  return (
    <Card
      as="button"
      type="button"
      radius={3}
      padding={3}
      tone="transparent"
      onClick={onClick}
      style={{
        width: '100%',
        textAlign: 'left',
        cursor: 'pointer',
        border: selected
          ? '1px solid rgba(200, 60, 47, 0.9)'
          : '1px solid rgba(250, 248, 244, 0.08)',
        background: selected
          ? 'linear-gradient(180deg, rgba(200, 60, 47, 0.12) 0%, rgba(31, 28, 27, 0.96) 100%)'
          : 'linear-gradient(180deg, rgba(31, 28, 27, 0.98) 0%, rgba(22, 20, 19, 0.98) 100%)',
        boxShadow: selected ? '0 0 0 1px rgba(200, 60, 47, 0.18)' : 'none',
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

function StripFramePreview(props: {
  width: number;
  aspectRatio: string;
  gap?: number;
  padding?: number;
}) {
  const {width, aspectRatio, gap = 10, padding = 10} = props;
  const [w, h] = aspectRatio.split('/').map(Number);
  const height = Math.max(34, Math.round((width * h) / w));

  return (
    <Card
      radius={2}
      style={{
        height: 88,
        padding,
        border: '1px solid rgba(250, 248, 244, 0.08)',
        background: 'linear-gradient(180deg, #171413 0%, #0f0d0c 100%)',
        overflow: 'hidden',
      }}
    >
      <Flex align="center" style={{height: '100%', gap}}>
        {[0, 1, 2].map((index) => (
          <Box
            key={index}
            style={{
              width,
              minWidth: width,
              height,
              borderRadius: 6,
              border: '1px solid rgba(250, 248, 244, 0.08)',
              background:
                index === 1
                  ? 'linear-gradient(135deg, rgba(200, 60, 47, 0.28), rgba(250, 248, 244, 0.12))'
                  : 'linear-gradient(135deg, rgba(250, 248, 244, 0.08), rgba(250, 248, 244, 0.02))',
            }}
          />
        ))}
      </Flex>
    </Card>
  );
}

function RatioDiagram({ratio}: {ratio: string}) {
  return (
    <StripFramePreview
      width={ratio === '9/16' ? 22 : ratio === '1/1' ? 34 : ratio === '16/9' ? 42 : ratio === '3/2' ? 38 : 36}
      aspectRatio={ratio}
      gap={10}
      padding={10}
    />
  );
}

function WidthDiagram({value}: {value: string}) {
  return (
    <StripFramePreview
      width={value === 'compact' ? 20 : value === 'large' ? 42 : 30}
      aspectRatio="4/3"
      gap={10}
      padding={10}
    />
  );
}

function GapDiagram({value}: {value: string}) {
  return (
    <StripFramePreview
      width={28}
      aspectRatio="4/3"
      gap={value === 'tight' ? 6 : value === 'loose' ? 16 : 10}
      padding={10}
    />
  );
}

function PaddingDiagram({value}: {value: string}) {
  return (
    <StripFramePreview
      width={28}
      aspectRatio="4/3"
      gap={10}
      padding={value === 'compact' ? 4 : value === 'roomy' ? 18 : 10}
    />
  );
}

function FitDiagram({value}: {value: string}) {
  return (
    <Card
      radius={2}
      style={{
        height: 88,
        padding: 10,
        border: '1px solid rgba(250, 248, 244, 0.08)',
        background: 'linear-gradient(180deg, #171413 0%, #0f0d0c 100%)',
        overflow: 'hidden',
      }}
    >
      <Flex align="center" justify="center" style={{height: '100%'}}>
        <Box
          style={{
            width: 54,
            height: 40,
            borderRadius: 6,
            border: '1px solid rgba(250, 248, 244, 0.08)',
            background: 'rgba(250, 248, 244, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Box
            style={{
              width: value === 'contain' ? 34 : 54,
              height: value === 'contain' ? 26 : 40,
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(200, 60, 47, 0.28), rgba(250, 248, 244, 0.12))',
            }}
          />
        </Box>
      </Flex>
    </Card>
  );
}

function Picker(props: {
  value: string;
  onChange: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
    description: string;
    diagram: React.ReactNode;
  }>;
}) {
  const {value, onChange, options} = props;

  return (
    <Grid columns={[1, 2]} gap={3}>
      {options.map((option) => (
        <ControlCard
          key={option.value}
          selected={value === option.value}
          onClick={() => onChange(option.value)}
          label={option.label}
          description={option.description}
        >
          {option.diagram}
        </ControlCard>
      ))}
    </Grid>
  );
}

export function FilmStripAspectRatioInput(props: StringInputProps) {
  const value = typeof props.value === 'string' ? props.value : '4/3';

  return (
    <Picker
      value={value}
      onChange={(next) => props.onChange(set(next))}
      options={[
        {value: '4/3', label: '4:3', description: 'Default frame. Feels like still photography.', diagram: <RatioDiagram ratio="4/3" />},
        {value: '3/2', label: '3:2', description: 'Slightly wider without turning cinematic.', diagram: <RatioDiagram ratio="3/2" />},
        {value: '16/9', label: '16:9', description: 'Screen-shaped and more panoramic.', diagram: <RatioDiagram ratio="16/9" />},
        {value: '1/1', label: '1:1', description: 'Square frames, more graphic and modular.', diagram: <RatioDiagram ratio="1/1" />},
        {value: '9/16', label: '9:16', description: 'Vertical motion or phone-native framing.', diagram: <RatioDiagram ratio="9/16" />},
      ]}
    />
  );
}

export function FilmStripWidthInput(props: StringInputProps) {
  const value = typeof props.value === 'string' ? props.value : 'standard';

  return (
    <Picker
      value={value}
      onChange={(next) => props.onChange(set(next))}
      options={[
        {value: 'compact', label: 'Compact', description: 'More frames visible at once. Quicker rhythm.', diagram: <WidthDiagram value="compact" />},
        {value: 'standard', label: 'Standard', description: 'Balanced default for most case studies.', diagram: <WidthDiagram value="standard" />},
        {value: 'large', label: 'Large', description: 'Fewer, more immersive frames.', diagram: <WidthDiagram value="large" />},
      ]}
    />
  );
}

export function FilmStripGapInput(props: StringInputProps) {
  const value = typeof props.value === 'string' ? props.value : 'standard';

  return (
    <Picker
      value={value}
      onChange={(next) => props.onChange(set(next))}
      options={[
        {value: 'tight', label: 'Tight', description: 'Frames feel more continuous.', diagram: <GapDiagram value="tight" />},
        {value: 'standard', label: 'Standard', description: 'Enough separation without drift.', diagram: <GapDiagram value="standard" />},
        {value: 'loose', label: 'Loose', description: 'More gallery-like spacing between frames.', diagram: <GapDiagram value="loose" />},
      ]}
    />
  );
}

export function FilmStripPaddingInput(props: StringInputProps) {
  const value = typeof props.value === 'string' ? props.value : 'standard';

  return (
    <Picker
      value={value}
      onChange={(next) => props.onChange(set(next))}
      options={[
        {value: 'compact', label: 'Compact', description: 'Tighter vertical footprint.', diagram: <PaddingDiagram value="compact" />},
        {value: 'standard', label: 'Standard', description: 'Default breathing room around the strip.', diagram: <PaddingDiagram value="standard" />},
        {value: 'roomy', label: 'Roomy', description: 'More pause before and after the strip.', diagram: <PaddingDiagram value="roomy" />},
      ]}
    />
  );
}

export function FilmStripImageFitInput(props: StringInputProps) {
  const value = typeof props.value === 'string' ? props.value : 'cover';

  return (
    <Picker
      value={value}
      onChange={(next) => props.onChange(set(next))}
      options={[
        {value: 'cover', label: 'Crop to Fill', description: 'Each frame fills its box edge to edge.', diagram: <FitDiagram value="cover" />},
        {value: 'contain', label: 'Fit Whole Image', description: 'Shows the complete image inside the frame.', diagram: <FitDiagram value="contain" />},
      ]}
    />
  );
}
