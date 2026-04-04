import React, {useCallback, useEffect, useState} from 'react';
import type {LayoutProps} from 'sanity';
import {studioCSS} from './studioCSS';

const focusToggleCSS = `
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

function applyFocusMode(active: boolean) {
  // Find all panes by data-testid="pane"
  const panes = document.querySelectorAll<HTMLElement>('[data-testid="pane"]');
  if (panes.length < 2) return;

  // Hide all panes except the last one (the document editor)
  for (let i = 0; i < panes.length - 1; i++) {
    panes[i].style.display = active ? 'none' : '';
    panes[i].style.width = active ? '0' : '';
    panes[i].style.minWidth = active ? '0' : '';
    panes[i].style.flex = active ? '0' : '';
  }

  // Also hide pane dividers (siblings between panes)
  const layout = document.querySelector<HTMLElement>('[data-ui="PaneLayout"]');
  if (layout) {
    const children = layout.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      // Dividers are elements between panes that aren't panes themselves
      if (!child.matches('[data-testid="pane"]') && child.tagName !== 'STYLE') {
        const nextPane = child.nextElementSibling as HTMLElement | null;
        const prevPane = child.previousElementSibling as HTMLElement | null;
        // If this is between two panes and one of them is hidden, hide the divider too
        if (active && (prevPane?.style.display === 'none' || nextPane?.matches('[data-testid="pane"]:last-of-type'))) {
          child.style.display = 'none';
        } else if (!active) {
          child.style.display = '';
        }
      }
    }
  }
}

export function StudioLayoutWrapper(props: LayoutProps) {
  const [focusMode, setFocusMode] = useState(false);

  const toggle = useCallback(() => {
    setFocusMode((prev) => {
      const next = !prev;
      applyFocusMode(next);
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

  // Re-apply on navigation changes (panes get re-rendered)
  useEffect(() => {
    if (!focusMode) return;
    const observer = new MutationObserver(() => {
      applyFocusMode(true);
    });
    const layout = document.querySelector('[data-ui="PaneLayout"]');
    if (layout) {
      observer.observe(layout, {childList: true});
    }
    return () => observer.disconnect();
  }, [focusMode]);

  // Clean up on unmount
  useEffect(() => {
    return () => applyFocusMode(false);
  }, []);

  return (
    <>
      <style>{studioCSS}</style>
      <style>{focusToggleCSS}</style>
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
