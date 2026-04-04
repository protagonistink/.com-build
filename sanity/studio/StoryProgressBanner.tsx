import React from 'react';
import {Card, Flex, Box, Text} from '@sanity/ui';
import {useFormValue} from 'sanity';
import {hasPortableTextContent} from '../../lib/portableText';
import type {PortableTextValue} from '../../types/portableText';

interface Section {
  _type: string;
  _key: string;
  body?: string | unknown[];
  text?: string;
  title?: string;
  quote?: string;
  headline?: string;
  statValue?: string;
  url?: string;
  frames?: unknown[];
}

const BEAT_CHECKS: Record<string, (s: Section) => boolean> = {
  prologue: (s) =>
    Boolean((typeof s.body === 'string' && s.body.trim()) || hasPortableTextContent(s.body as PortableTextValue | undefined)),
  showcaseSplit: (s) =>
    Boolean(
      s.title?.trim() ||
        (typeof s.body === 'string' && s.body.trim()) ||
        hasPortableTextContent(s.body as PortableTextValue | undefined),
    ),
  showcaseFullBleed: (s) =>
    Boolean(
      s.title?.trim() ||
        (typeof s.body === 'string' && s.body.trim()) ||
        hasPortableTextContent(s.body as PortableTextValue | undefined),
    ),
  showcaseFilmStrip: (s) => Boolean(s.frames && s.frames.length > 0),
  showcaseStat: (s) => Boolean(s.statValue?.trim()),
  videoEmbed: (s) => Boolean(s.url?.trim()),
  deliverables: (s) => Boolean(s.headline?.trim()),
  climax: (s) => Boolean(s.quote?.trim()),
  closer: (s) => Boolean(s.text?.trim()),
};

const BEAT_LABELS: Record<string, string> = {
  prologue: 'Prologue',
  showcaseSplit: 'Beat',
  showcaseFullBleed: 'Beat',
  showcaseFilmStrip: 'Reel',
  showcaseStat: 'Stats',
  videoEmbed: 'Video',
  deliverables: 'Deliverables',
  climax: 'Climax',
  closer: 'Closer',
};

export function StoryProgressBanner() {
  const sections = useFormValue(['sections']) as Section[] | undefined;

  if (!sections || sections.length === 0) {
    return (
      <Card padding={3} tone="caution" radius={2} marginBottom={3}>
        <Text size={1} muted>
          No story beats yet. Switch to the Story tab and add some blocks to get started.
        </Text>
      </Card>
    );
  }

  const beats = sections.map((section) => {
    const checker = BEAT_CHECKS[section._type];
    const filled = checker ? checker(section) : false;
    const label = BEAT_LABELS[section._type] || section._type;
    return {label, filled};
  });

  const filledCount = beats.filter((b) => b.filled).length;
  const totalCount = beats.length;

  return (
    <Card
      padding={3}
      radius={2}
      marginBottom={3}
      style={{
        background: 'rgba(250, 248, 244, 0.03)',
        border: '1px solid rgba(250, 248, 244, 0.06)',
      }}
    >
      <Flex align="center" gap={3}>
        <Text size={0} style={{color: 'rgba(250, 248, 244, 0.5)', whiteSpace: 'nowrap', letterSpacing: '0.05em'}}>
          STORY SHAPE
        </Text>
        <Flex gap={1} align="center" wrap="wrap" flex={1}>
          {beats.map((beat, i) => (
            <Flex key={i} align="center" gap={1}>
              <Box
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  background: beat.filled
                    ? 'rgba(200, 60, 47, 0.9)'
                    : 'rgba(250, 248, 244, 0.1)',
                  transition: 'background 0.2s',
                }}
              />
              <Text
                size={0}
                style={{
                  color: beat.filled ? 'rgba(250, 248, 244, 0.7)' : 'rgba(250, 248, 244, 0.25)',
                  fontSize: '10px',
                }}
              >
                {beat.label}
              </Text>
              {i < beats.length - 1 && (
                <Text size={0} style={{color: 'rgba(250, 248, 244, 0.1)', margin: '0 2px'}}>
                  ·
                </Text>
              )}
            </Flex>
          ))}
        </Flex>
        <Text size={0} style={{color: 'rgba(250, 248, 244, 0.4)', whiteSpace: 'nowrap'}}>
          {filledCount}/{totalCount}
        </Text>
      </Flex>
    </Card>
  );
}
