import React from 'react';
import type {LayoutProps} from 'sanity';
import {studioCSS} from './studioCSS';

export function StudioLayoutWrapper(props: LayoutProps) {
  return (
    <>
      <style>{studioCSS}</style>
      {props.renderDefault(props)}
    </>
  );
}
