'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memoryUsed?: number;
  memoryTotal?: number;
}

export function usePerformanceMonitor(sampleSize = 60) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    frameTime: 16.67,
  });
  const framesRef = useRef<number[]>([]);
  const lastTimeRef = useRef(performance.now());
  const animationFrameRef = useRef<number>();

  const measureFrame = useCallback(() => {
    const now = performance.now();
    const frameTime = now - lastTimeRef.current;
    lastTimeRef.current = now;

    framesRef.current.push(frameTime);
    if (framesRef.current.length > sampleSize) {
      framesRef.current.shift();
    }

    const avgFrameTime = framesRef.current.reduce((a, b) => a + b, 0) / framesRef.current.length;
    const fps = 1000 / avgFrameTime;

    setMetrics({
      fps: Math.round(fps),
      frameTime: Math.round(avgFrameTime * 100) / 100,
      memoryUsed: (performance as any).memory?.usedJSHeapSize
        ? Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)
        : undefined,
      memoryTotal: (performance as any).memory?.totalJSHeapSize
        ? Math.round((performance as any).memory.totalJSHeapSize / 1024 / 1024)
        : undefined,
    });

    animationFrameRef.current = requestAnimationFrame(measureFrame);
  }, [sampleSize]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(measureFrame);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [measureFrame]);

  return metrics;
}

export function useFrameBudget(budget = 16.67) {
  const metrics = usePerformanceMonitor();
  const [overBudget, setOverBudget] = useState(false);

  useEffect(() => {
    setOverBudget(metrics.frameTime > budget);
  }, [metrics.frameTime, budget]);

  return { metrics, overBudget };
}