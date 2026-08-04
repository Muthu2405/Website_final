'use client';

import { useEffect, useState, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface UseMouseParallaxReturn {
  mouse: MousePosition;
  setMouse: (position: MousePosition) => void;
  normalized: MousePosition;
}

export function useMouseParallax(): UseMouseParallaxReturn {
  const [mouse, setMouse] = useState<MousePosition>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    setMouse({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const normalized = {
    x: mouse.x * 0.5 + 0.5,
    y: mouse.y * 0.5 + 0.5,
  };

  return { mouse, setMouse, normalized };
}