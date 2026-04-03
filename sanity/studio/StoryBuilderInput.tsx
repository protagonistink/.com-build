import React from 'react';
import type {ArrayOfObjectsInputProps} from 'sanity';
import {StoryProgressBanner} from './StoryProgressBanner';

export function StoryBuilderInput(props: ArrayOfObjectsInputProps) {
  return (
    <>
      <StoryProgressBanner />
      {props.renderDefault(props)}
    </>
  );
}
