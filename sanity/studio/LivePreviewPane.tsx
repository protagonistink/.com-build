import React, {useEffect, useState, useRef, useCallback} from 'react';
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
  const [isDraft, setIsDraft] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const buildPreviewUrl = useCallback(async () => {
    if (!slug) {
      setPreviewUrl(null);
      setLoading(false);
      return;
    }

    const path = docType === 'post' ? `/blog/${slug}` : `/work/${slug}`;
    const origin = window.location.origin.includes('localhost')
      ? 'http://localhost:3000'
      : 'https://www.protagonist.ink';

    setLoading(true);
    try {
      const {createPreviewSecret} = await import('@sanity/preview-url-secret/create-secret');
      const {secret} = await createPreviewSecret(
        client,
        '@sanity/presentation',
        window.location.href,
      );
      const url = new URL(`${origin}/api/draft-mode/enable`);
      url.searchParams.set('sanity-preview-secret', secret);
      url.searchParams.set('sanity-preview-pathname', path);
      setPreviewUrl(url.toString());
      setIsDraft(true);
    } catch (err) {
      console.warn('[LivePreviewPane] Draft mode failed, showing published:', err);
      setPreviewUrl(`${origin}${path}`);
      setIsDraft(false);
    }
    setLoading(false);
  }, [slug, docType, client]);

  useEffect(() => {
    buildPreviewUrl();
  }, [buildPreviewUrl]);

  const reload = useCallback(() => {
    if (iframeRef.current) {
      const src = iframeRef.current.src;
      iframeRef.current.src = '';
      setTimeout(() => { if (iframeRef.current) iframeRef.current.src = src; }, 50);
    }
  }, []);

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
          padding: '8px 16px',
          borderBottom: '1px solid rgba(250,248,244,0.08)',
          color: 'rgba(250,248,244,0.5)',
          fontSize: 11,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
        }}
      >
        <span>
          {isDraft
            ? 'Draft preview — showing unpublished changes'
            : 'Published preview — open Presentation for live drafts'}
        </span>
        <Flex gap={2}>
          {!isDraft && (
            <button
              onClick={buildPreviewUrl}
              style={{
                background: 'rgba(200,60,47,0.1)',
                border: '1px solid rgba(200,60,47,0.2)',
                color: 'rgba(200,60,47,0.8)',
                padding: '3px 8px',
                borderRadius: 4,
                fontSize: 10,
                cursor: 'pointer',
              }}
            >
              Retry draft
            </button>
          )}
          <button
            onClick={reload}
            style={{
              background: 'rgba(250,248,244,0.06)',
              border: '1px solid rgba(250,248,244,0.1)',
              color: 'rgba(250,248,244,0.6)',
              padding: '3px 8px',
              borderRadius: 4,
              fontSize: 10,
              cursor: 'pointer',
            }}
          >
            Reload
          </button>
        </Flex>
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
        title="Preview"
      />
    </div>
  );
}
