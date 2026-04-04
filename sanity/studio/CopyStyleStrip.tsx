import React from 'react';
import {Flex, Text} from '@sanity/ui';
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
    <PillToggle
      label="Align"
      options={[
        {label: '⫷', value: 'left'},
        {label: '☰', value: 'center'},
        {label: '⫸', value: 'right'},
      ]}
      value={value}
      onChange={(v) => props.onChange(set(v))}
    />
  );
}
