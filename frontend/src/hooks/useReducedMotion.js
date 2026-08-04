import { useEffect, useState } from 'react';

/**
 * Hook to detect user's reduced motion preference
 * @returns {boolean} True if user prefers reduced motion
 */
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);

    const handler = (event) => setPrefersReduced(event.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

/**
 * Hook to get reduced motion value for animation configs
 * @param {Object} options - Animation options
 * @param {number} options.duration - Normal duration
 * @param {number} options.reducedDuration - Duration when reduced motion
 * @returns {Object} Animation config with adjusted duration
 */
export function useMotionConfig({ duration = 1, reducedDuration = 0.01 }) {
  const prefersReduced = useReducedMotion();
  return {
    duration: prefersReduced ? reducedDuration : duration,
    transition: prefersReduced ? { duration: reducedDuration } : { duration }
  };
}