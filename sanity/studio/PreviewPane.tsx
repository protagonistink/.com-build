import React from 'react';

interface PreviewPaneProps {
  document: {
    displayed: {
      slug?: {current?: string};
      [key: string]: unknown;
    };
  };
}

export function PreviewPane(props: PreviewPaneProps) {
  const slug = props?.document?.displayed?.slug?.current;

  if (!slug) {
    return (
      <div style={{padding: 24, color: 'rgba(250,248,244,0.5)', fontFamily: 'inherit'}}>
        Add a title and generate a slug to see the preview.
      </div>
    );
  }

  const siteUrl = typeof window !== 'undefined'
    ? (window.location.origin.includes('localhost') ? 'http://localhost:3000' : 'https://protagonist.ink')
    : 'https://protagonist.ink';

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%', background: '#131417'}}>
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(250,248,244,0.08)',
          color: 'rgba(250,248,244,0.72)',
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        This pane shows the published page. Draft preview lives in Presentation, not here.
      </div>
      <iframe
        src={`${siteUrl}/work/${slug}`}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          background: '#131417',
        }}
        title="Published case study preview"
      />
    </div>
  );
}
