import { useEffect } from 'react';

export function useSmoothScroll() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest('a[href^="#"]');

      if (!anchor) return;
      const htmlAnchor = anchor as HTMLAnchorElement;
      if (htmlAnchor.target === '_blank' || anchor.hasAttribute('download')) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const targetElement = document.querySelector(href);
      if (!targetElement) return;

      e.preventDefault();

      const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

      targetElement.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });

      // Update URL without scrolling
      if (history.pushState) {
        history.pushState(null, '', href);
      }

      // Set focus for accessibility
      const focusableElement = targetElement.querySelector<HTMLElement>(
        'a, button, input, [tabindex]:not([tabindex="-1"])'
      );

      const focusTarget = focusableElement ?? (targetElement instanceof HTMLElement ? targetElement : null);
      if (!focusTarget) return;

      if (focusTarget === targetElement && focusTarget.getAttribute('tabindex') !== '-1') {
        focusTarget.setAttribute('tabindex', '-1');
      }

      try {
        focusTarget.focus({ preventScroll: true });
      } catch {
        focusTarget.focus();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}
