import React, {useCallback, useEffect, useState} from 'react';
import type {LayoutProps} from 'sanity';
import {studioCSS} from './studioCSS';

const focusModeCSS = `
  body.focus-mode [data-testid="pane"] ~ [data-testid="pane"] ~ [data-testid="pane"],
  body.focus-mode [data-testid="pane"]:first-child,
  body.focus-mode [data-testid="pane"]:first-child + [data-testid="pane"] {
    /* Hide all panes except the last (document) pane */
  }

  body.focus-mode [data-ui="PaneLayout"] > [data-ui="Pane"]:not(:last-child) {
    display: none !important;
  }

  body.focus-mode [data-ui="PaneLayout"] > [data-testid="pane-divider"] {
    display: none !important;
  }

  .focus-toggle {
    position: fixed;
    bottom: 16px;
    left: 16px;
    z-index: 10000;
    background: rgba(19, 20, 23, 0.9);
    border: 1px solid rgba(250, 248, 244, 0.12);
    color: rgba(250, 248, 244, 0.6);
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 11px;
    font-family: inherit;
    cursor: pointer;
    backdrop-filter: blur(8px);
    transition: all 0.15s ease;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .focus-toggle:hover {
    background: rgba(19, 20, 23, 1);
    border-color: rgba(250, 248, 244, 0.2);
    color: rgba(250, 248, 244, 0.85);
  }

  .focus-toggle.active {
    background: rgba(200, 60, 47, 0.15);
    border-color: rgba(200, 60, 47, 0.3);
    color: rgba(200, 60, 47, 0.9);
  }

  .focus-toggle kbd {
    font-size: 9px;
    opacity: 0.5;
    letter-spacing: 0.03em;
  }
`;

export function StudioLayoutWrapper(props: LayoutProps) {
  const [focusMode, setFocusMode] = useState(false);

  const toggle = useCallback(() => {
    setFocusMode((prev) => {
      const next = !prev;
      if (next) {
        document.body.classList.add('focus-mode');
      } else {
        document.body.classList.remove('focus-mode');
      }
      return next;
    });
  }, []);

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === '\\') {
        e.preventDefault();
        toggle();
      }
    }
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [toggle]);

  // Clean up class on unmount
  useEffect(() => {
    return () => document.body.classList.remove('focus-mode');
  }, []);

  return (
    <>
      <style>{studioCSS}</style>
      <style>{focusModeCSS}</style>
      {props.renderDefault(props)}
      <button
        type="button"
        className={`focus-toggle ${focusMode ? 'active' : ''}`}
        onClick={toggle}
        title="Toggle focus mode (⌘\\)"
      >
        {focusMode ? '◀ Show panels' : '▶ Focus mode'}
        <kbd>⌘\</kbd>
      </button>
    </>
  );
}
