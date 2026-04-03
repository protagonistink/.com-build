import {ArrowRight, ExternalLink, PanelsTopLeft} from 'lucide-react';
import {useMemo} from 'react';
import {Button, Card, Flex, Stack, Text} from '@sanity/ui';
import {useRouter} from 'sanity/router';

interface PresentationPaneProps {
  document: {
    displayed?: {
      _id?: string;
      _type?: string;
      slug?: {current?: string};
      title?: string;
    };
  };
}

export function PresentationPane(props: PresentationPaneProps) {
  const router = useRouter();
  const documentId = props.document?.displayed?._id;
  const documentType = props.document?.displayed?._type;
  const slug = props.document?.displayed?.slug?.current;
  const previewPath =
    documentType === 'caseStudy' && slug
      ? `/work/${slug}`
      : documentType === 'post' && slug
        ? `/blog/${slug}`
        : '/';
  const publishedUrl = `https://www.protagonist.ink${previewPath}`;

  const href = useMemo(() => {
    if (!documentId || !documentType) return null;
    return router.resolveIntentLink('edit', {
      id: documentId,
      type: documentType,
      mode: 'presentation',
      preview: previewPath,
    });
  }, [documentId, documentType, previewPath, router]);

  return (
    <Flex align="center" justify="center" padding={5} style={{height: '100%'}}>
      <Card
        padding={5}
        radius={4}
        shadow={1}
        style={{
          width: '100%',
          maxWidth: 460,
          border: '1px solid rgba(250,248,244,0.08)',
          background: 'rgba(19,20,23,0.92)',
        }}
      >
        <Stack space={4}>
          <Flex align="center" gap={3}>
            <Card
              padding={3}
              radius={3}
              style={{
                background: 'rgba(196,92,68,0.12)',
                color: '#d88471',
              }}
            >
              <PanelsTopLeft size={18} />
            </Card>
            <Stack space={2}>
              <Text size={3} weight="semibold">
                Open live draft preview
              </Text>
              <Text muted size={1}>
                This keeps the CMS where it is. Use the real Presentation tool only when you want side-by-side draft updates.
              </Text>
            </Stack>
          </Flex>

          <Card
            padding={4}
            radius={3}
            tone={slug ? 'primary' : 'transparent'}
            style={{
              border: '1px solid rgba(250,248,244,0.08)',
            }}
          >
            <Stack space={3}>
              <Text size={1} muted>
                {slug ? `Draft route: ${previewPath}` : 'Generate a slug to map this document to the frontend route.'}
              </Text>
              <Flex gap={3} wrap="wrap">
                {href ? (
                  <Button
                    as="a"
                    href={href}
                    iconRight={ArrowRight}
                    mode="default"
                    text="Open live draft preview"
                    tone="primary"
                  />
                ) : null}
                {slug ? (
                  <Button
                    as="a"
                    href={publishedUrl}
                    iconRight={ExternalLink}
                    mode="ghost"
                    target="_blank"
                    text="Open published page"
                    tone="default"
                  />
                ) : null}
              </Flex>
              <Text size={1} muted>
                Presentation is the only place in Sanity where this document will live-refresh against draft edits.
              </Text>
            </Stack>
          </Card>
        </Stack>
      </Card>
    </Flex>
  );
}
