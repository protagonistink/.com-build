import React from 'react';
import {Box, Flex, Text} from '@sanity/ui';
import {type StringInputProps, set} from 'sanity';

function PillToggle({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: {label: string; value: string}[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Flex gap={2} align="center">
      <Text size={0} style={{color: 'rgba(250,248,244,0.35)', fontSize: 10, whiteSpace: 'nowrap'}}>
        {label}
      </Text>
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
              padding: '3px 8px',
              fontSize: 10,
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
    </Flex>
  );
}

function AlignmentIcon({value, active}: {value: 'left' | 'center' | 'right'; active: boolean}) {
  const lineColor = active ? 'rgba(200, 60, 47, 0.92)' : 'rgba(250, 248, 244, 0.38)';
  const faintLine = active ? 'rgba(200, 60, 47, 0.38)' : 'rgba(250, 248, 244, 0.18)';
  const justify =
    value === 'center' ? 'center' : value === 'right' ? 'flex-end' : 'flex-start';

  return (
    <Flex direction="column" gap={1} justify="center" style={{width: 18, height: 12}}>
      <Flex justify={justify}>
        <Box style={{height: 2, width: 12, background: lineColor, borderRadius: 2}} />
      </Flex>
      <Flex justify={justify}>
        <Box style={{height: 1, width: 16, background: faintLine, borderRadius: 2}} />
      </Flex>
      <Flex justify={justify}>
        <Box style={{height: 1, width: 10, background: faintLine, borderRadius: 2}} />
      </Flex>
    </Flex>
  );
}

/**
 * This replaces the native `surface` field input.
 * It renders the surface toggle inline as a compact pill.
 */
export function SurfaceToggleInput(props: StringInputProps) {
  const value = (props.value as string) || 'dark';

  return (
    <PillToggle
      label="Surface"
      options={[
        {label: 'Dark', value: 'dark'},
        {label: 'Light', value: 'light'},
      ]}
      value={value}
      onChange={(v) => props.onChange(set(v))}
    />
  );
}

/**
 * Compact text style picker — replaces the native radio input.
 */
export function CopyStyleInput(props: StringInputProps) {
  const value = (props.value as string) || 'default';

  return (
    <PillToggle
      label="Style"
      options={[
        {label: 'Default', value: 'default'},
        {label: 'Display', value: 'display'},
        {label: 'Pull Quote', value: 'pull-quote'},
      ]}
      value={value}
      onChange={(v) => props.onChange(set(v))}
    />
  );
}

/**
 * Compact text alignment picker.
 */
export function TextAlignInput(props: StringInputProps) {
  const value = (props.value as string) || 'left';

  return (
    <Flex gap={2} align="center">
      <Text size={0} style={{color: 'rgba(250,248,244,0.35)', fontSize: 10, whiteSpace: 'nowrap'}}>
        Align
      </Text>
      <Flex
        gap={0}
        style={{
          border: '1px solid rgba(250, 248, 244, 0.1)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        {([
          {label: 'Left', value: 'left' as const},
          {label: 'Center', value: 'center' as const},
          {label: 'Right', value: 'right' as const},
        ]).map((opt, i) => {
          const active = value === opt.value;

          return (
            <button
              key={opt.value}
              type="button"
              aria-label={opt.label}
              title={opt.label}
              onClick={() => props.onChange(set(opt.value))}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 30,
                height: 22,
                cursor: 'pointer',
                border: 'none',
                background: active ? 'rgba(200, 60, 47, 0.15)' : 'transparent',
                transition: 'all 0.12s ease',
                borderRight: i < 2 ? '1px solid rgba(250, 248, 244, 0.06)' : 'none',
              }}
            >
              <AlignmentIcon value={opt.value} active={active} />
            </button>
          );
        })}
      </Flex>
    </Flex>
  );
}
