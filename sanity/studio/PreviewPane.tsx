import React from 'react';
import {useFormValue} from 'sanity';

export function PreviewPane() {
  const slug = useFormValue(['slug', 'current']) as string | undefined;

  if (!slug) {
    return (
      <div style={{padding: 24, color: 'rgba(250,248,244,0.5)', fontFamily: 'inherit'}}>
        Add a title and generate a slug to see the preview.
      </div>
    );
  }

  const siteUrl = typeof window !== 'undefined'
    ? (window.location.origin.includes('localhost') ? 'http://localhost:3000' : 'https://protagonistink.com')
    : 'https://protagonistink.com';

  return (
    <iframe
      src={`${siteUrl}/work/${slug}`}
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        background: '#131417',
      }}
      title="Case study preview"
    />
  );
}
