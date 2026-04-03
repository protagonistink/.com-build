import React from 'react';
import {Card, Flex, Box, Stack, Text} from '@sanity/ui';
import type {PreviewProps} from 'sanity';

function renderMedia(media: PreviewProps['media']) {
  if (!media) return null;
  if (React.isValidElement(media)) return media;
  if (typeof media === 'function') {
    const Media = media;
    return <Media dimensions={{width: 96, height: 96, fit: 'crop', aspect: 1, dpr: 1}} layout="default" />;
  }
  return null;
}

export function CaseStudyBlockPreview(props: PreviewProps) {
  const media = renderMedia(props.media);
  const title = typeof props.title === 'string' ? props.title : props.fallbackTitle;
  const subtitle = typeof props.subtitle === 'string' ? props.subtitle : undefined;
  const description = typeof props.description === 'string' ? props.description : undefined;

  const isEmpty = !description && !props.imageUrl;

  return (
    <Card
      radius={3}
      padding={2}
      tone="transparent"
      style={{
        background: isEmpty
          ? 'rgba(25, 23, 22, 0.6)'
          : 'linear-gradient(180deg, rgba(34,31,30,0.98) 0%, rgba(25,23,22,0.98) 100%)',
        border: isEmpty
          ? '1px dashed rgba(250, 248, 244, 0.12)'
          : '1px solid rgba(250, 248, 244, 0.08)',
        boxShadow: isEmpty ? 'none' : 'inset 0 1px 0 rgba(250, 248, 244, 0.03)',
        opacity: isEmpty ? 0.7 : 1,
      }}
    >
      <Flex gap={3} align="flex-start">
        <Card
          radius={2}
          overflow="hidden"
          style={{
            width: 96,
            minWidth: 96,
            height: 72,
            background: 'rgba(250, 248, 244, 0.03)',
            border: '1px solid rgba(250, 248, 244, 0.06)',
          }}
        >
          <Flex align="center" justify="center" style={{width: '100%', height: '100%'}}>
            {props.imageUrl ? (
              <img
                src={props.imageUrl}
                alt=""
                style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
              />
            ) : (
              media || (
                <Box
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 999,
                    background: isEmpty
                      ? 'rgba(200, 60, 47, 0.3)'
                      : 'rgba(200, 60, 47, 0.9)',
                    boxShadow: '0 0 0 1px rgba(200, 60, 47, 0.18)',
                  }}
                />
              )
            )}
          </Flex>
        </Card>

        <Stack space={2} flex={1}>
          <Stack space={1}>
            <Flex align="center" gap={2}>
              <Text size={1} weight="semibold" style={{color: '#FAF8F4'}}>
                {title || 'Untitled block'}
              </Text>
              {isEmpty && (
                <Text
                  size={0}
                  style={{
                    color: 'rgba(200, 60, 47, 0.7)',
                    fontSize: '10px',
                    letterSpacing: '0.05em',
                  }}
                >
                  NEEDS COPY
                </Text>
              )}
            </Flex>
            {subtitle && (
              <Text
                size={1}
                style={{
                  color: '#C9C4BD',
                  letterSpacing: '0.02em',
                }}
              >
                {subtitle}
              </Text>
            )}
          </Stack>

          {description && (
            <Text
              size={1}
              muted
              style={{
                color: 'rgba(250, 248, 244, 0.56)',
                lineHeight: 1.5,
              }}
            >
              {description}
            </Text>
          )}
        </Stack>
      </Flex>
    </Card>
  );
}
