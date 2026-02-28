'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Observes `.reveal` elements and adds `.revealed` when they enter viewport.
 * Rebinds on route changes and watches DOM mutations so late-mounted content animates.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add('reveal-enabled');
    document.querySelectorAll<HTMLElement>('[data-reveal-bound]').forEach((el) => {
      el.removeAttribute('data-reveal-bound');
    });
    const boundElements = new Set<HTMLElement>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
          entry.target.removeAttribute('data-reveal-bound');
          boundElements.delete(entry.target as HTMLElement);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const observeReveals = () => {
      const elements = document.querySelectorAll<HTMLElement>('.reveal:not(.revealed)');

      elements.forEach((el) => {
        if (boundElements.has(el)) return;
        el.setAttribute('data-reveal-bound', 'true');
        boundElements.add(el);
        observer.observe(el);
      });
    };

    observeReveals();
    requestAnimationFrame(observeReveals);
    const latePass = window.setTimeout(observeReveals, 180);

    const mutationObserver = new MutationObserver(() => {
      observeReveals();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(latePass);
      mutationObserver.disconnect();
      observer.disconnect();
      boundElements.forEach((el) => el.removeAttribute('data-reveal-bound'));
      boundElements.clear();
    };
  }, [pathname]);

  return null;
}
