import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook to track normalized mouse position (-1 to 1)
 * @param {HTMLElement} containerRef - Optional container to track within
 * @returns {{x: number, y: number, isInside: boolean}} Normalized mouse position
 */
export function useMousePosition(containerRef = null) {
  const [position, setPosition] = useState({ x: 0, y: 0, isInside: false });
  const rafRef = useRef(null);

  const handleMouseMove = useCallback((event) => {
    let rect;
    if (containerRef && containerRef.current) {
      rect = containerRef.current.getBoundingClientRect();
    } else {
      rect = { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
    }

    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

    setPosition({ x, y, isInside: true });
  }, [containerRef]);

  const handleMouseLeave = useCallback(() => {
    setPosition(prev => ({ ...prev, isInside: false }));
  }, []);

  useEffect(() => {
    const target = containerRef?.current || window;

    target.addEventListener('mousemove', handleMouseMove);
    if (target !== window) {
      target.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      target.removeEventListener('mousemove', handleMouseMove);
      if (target !== window) {
        target.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef, handleMouseMove, handleMouseLeave]);

  return position;
}

/**
 * Hook for smooth mouse follow with lerp
 * @param {Object} target - Target position {x, y}
 * @param {number} smoothness - Lerp factor (0-1)
 * @returns {{x: number, y: number}} Smoothed position
 */
export function useSmoothFollow(target, smoothness = 0.1) {
  const [current, setCurrent] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const lerp = () => {
      setCurrent(prev => ({
        x: prev.x + (target.x - prev.x) * smoothness,
        y: prev.y + (target.y - prev.y) * smoothness
      }));
      rafRef.current = requestAnimationFrame(lerp);
    };
    rafRef.current = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, smoothness]);

  return current;
}