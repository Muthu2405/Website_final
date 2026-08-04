import { useEffect, useRef } from 'react';

/**
 * Mounts a legacy (pre-React) page: injects its scoped <style>, its body
 * markup, then runs its original <script> exactly as it ran in the old
 * standalone HTML file. On unmount it removes all three so it doesn't leak
 * globals, ids, or styles into other routes.
 */
export default function LegacyPage({ css, html, script, pageId }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.setAttribute('data-legacy-page', pageId);
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    const scriptEl = document.createElement('script');
    scriptEl.setAttribute('data-legacy-page', pageId);
    // Wrap in an IIFE: a bare <script>'s top-level const/let bindings live
    // in the page's global scope for the whole session, even after the
    // <script> element is removed. Without this wrapper, a remount (e.g.
    // React StrictMode's dev double-invoke) redeclares those bindings and
    // throws "Identifier 'X' has already been declared".
    scriptEl.textContent = `(function(){\n${script}\n})();`;
    document.body.appendChild(scriptEl);

    return () => {
      styleEl.remove();
      scriptEl.remove();
      document.querySelectorAll(`[data-legacy-page="${pageId}"]`).forEach((n) => n.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      id={`${pageId}-root`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
