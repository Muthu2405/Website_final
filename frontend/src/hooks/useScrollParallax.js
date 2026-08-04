import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook for scroll-triggered camera parallax
 * @param {Object} options - Configuration
 * @param {number} options.start - Scroll start position
 * @param {number} options.end - Scroll end position
 * @param {Function} options.onUpdate - Callback with progress (0-1)
 * @returns {Object} ScrollTrigger instance for cleanup
 */
export function useScrollParallax({ start = 'top bottom', end = 'bottom top', onUpdate, scrub = 1 }) {
  const triggerRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  useEffect(() => {
    if (!triggerRef.current) return;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: triggerRef.current,
      start,
      end,
      scrub,
      onUpdate: (self) => {
        if (onUpdate) onUpdate(self.progress);
      }
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [start, end, scrub, onUpdate]);

  return { triggerRef, scrollTrigger: scrollTriggerRef.current };
}

/**
 * Hook for multiple parallax layers
 * @param {Array} layers - Array of { ref, speed, start, end }
 * @returns {Array} Array of refs
 */
export function useParallaxLayers(layers) {
  const refs = useRef([]);

  useEffect(() => {
    const triggers = layers.map((layer, index) => {
      const ref = refs.current[index] = layer.ref || { current: null };
      return ScrollTrigger.create({
        trigger: ref.current || triggerRef.current,
        start: layer.start || 'top bottom',
        end: layer.end || 'bottom top',
        scrub: layer.scrub !== undefined ? layer.scrub : true,
        onUpdate: (self) => {
          if (layer.onUpdate) layer.onUpdate(self.progress * (layer.speed || 1));
        }
      });
    });

    return () => triggers.forEach(t => t.kill());
  }, [layers]);

  return refs;
}

/**
 * Hook to get scroll progress of an element
 * @param {React.RefObject} elementRef - Element to track
 * @returns {number} Scroll progress (0-1)
 */
export function useScrollProgress(elementRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!elementRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: elementRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => setProgress(self.progress)
    });

    return () => trigger.kill();
  }, [elementRef]);

  return progress;
}