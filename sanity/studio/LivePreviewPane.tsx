import React, {useEffect, useState, useRef} from 'react';
import {Card, Flex, Spinner, Text} from '@sanity/ui';
import {useClient} from 'sanity';

interface LivePreviewPaneProps {
  document: {
    displayed: {
      slug?: {current?: string};
      _type?: string;
      [key: string]: unknown;
    };
  };
}

export function LivePreviewPane(props: LivePreviewPaneProps) {
  const slug = props?.document?.displayed?.slug?.current;
  const docType = props?.document?.displayed?._type;
  const client = useClient({apiVersion: '2026-03-02'});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!slug) {
      setPreviewUrl(null);
      setLoading(false);
      return;
    }

    const path = docType === 'post' ? `/blog/${slug}` : `/work/${slug}`;
    const origin = window.location.origin.includes('localhost')
      ? 'http://localhost:3000'
      : 'https://www.protagonist.ink';

    async function getPreviewUrl() {
      setLoading(true);
      try {
        // Use the preview-url-secret to create a validated draft mode URL
        const {createPreviewSecret} = await import('@sanity/preview-url-secret/create-secret');
        const {secret} = await createPreviewSecret(
          client,
          '@sanity/presentation',
          window.location.href,
        );
        // The enable endpoint validates this secret via the Sanity API
        const url = new URL(`${origin}/api/draft-mode/enable`);
        url.searchParams.set('sanity-preview-secret', secret);
        url.searchParams.set('sanity-preview-pathname', path);
        setPreviewUrl(url.toString());
      } catch {
        // Fall back to published URL
        setPreviewUrl(`${origin}${path}`);
      }
      setLoading(false);
    }

    getPreviewUrl();
  }, [slug, docType, client]);

  if (!slug) {
    return (
      <Flex align="center" justify="center" padding={5} style={{height: '100%'}}>
        <Card padding={4} radius={3} tone="caution" border>
          <Text size={1}>Add a title and generate a slug to see the preview.</Text>
        </Card>
      </Flex>
    );
  }

  if (loading) {
    return (
      <Flex align="center" justify="center" style={{height: '100%'}}>
        <Spinner muted />
      </Flex>
    );
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%', background: '#131417'}}>
      <div
        style={{
          padding: '10px 16px',
          borderBottom: '1px solid rgba(250,248,244,0.08)',
          color: 'rgba(250,248,244,0.5)',
          fontSize: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>Live preview</span>
        <button
          onClick={() => iframeRef.current?.contentWindow?.location.reload()}
          style={{
            background: 'rgba(250,248,244,0.06)',
            border: '1px solid rgba(250,248,244,0.1)',
            color: 'rgba(250,248,244,0.6)',
            padding: '4px 10px',
            borderRadius: 4,
            fontSize: 11,
            cursor: 'pointer',
          }}
        >
          Reload
        </button>
      </div>
      <iframe
        ref={iframeRef}
        src={previewUrl!}
        style={{
          width: '100%',
          flex: 1,
          border: 'none',
          background: '#131417',
        }}
        title="Live preview"
      />
    </div>
  );
}
