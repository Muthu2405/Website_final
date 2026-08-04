import { useEffect, useRef, useState } from 'react';

/**
 * Hook to monitor FPS and performance metrics
 * @param {Object} options - Configuration
 * @param {boolean} options.enabled - Whether to track (default: true)
 * @param {number} options.sampleSize - Number of frames to average (default: 60)
 * @returns {Object} Performance metrics
 */
export function usePerformanceMonitor({ enabled = true, sampleSize = 60 } = {}) {
  const [metrics, setMetrics] = useState({
    fps: 60,
    frameTime: 16.67,
    minFps: 60,
    maxFps: 60
  });

  const framesRef = useRef([]);
  const lastTimeRef = useRef(performance.now());
  const rafRef = useRef(null);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const measure = (now) => {
      if (!enabledRef.current) return;

      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      const fps = 1000 / delta;
      framesRef.current.push(fps);

      if (framesRef.current.length > sampleSize) {
        framesRef.current.shift();
      }

      const avgFps = framesRef.current.reduce((a, b) => a + b, 0) / framesRef.current.length;
      const minFps = Math.min(...framesRef.current);
      const maxFps = Math.max(...framesRef.current);

      setMetrics({
        fps: Math.round(avgFps),
        frameTime: Math.round(delta * 100) / 100,
        minFps: Math.round(minFps),
        maxFps: Math.round(maxFps)
      });

      rafRef.current = requestAnimationFrame(measure);
    };

    rafRef.current = requestAnimationFrame(measure);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, sampleSize]);

  return metrics;
}

/**
 * Hook for Three.js render performance
 * @param {THREE.WebGLRenderer} renderer - Three.js renderer
 * @returns {Object} Renderer info
 */
export function useRendererStats(renderer) {
  const [stats, setStats] = useState({
    triangles: 0,
    calls: 0,
    points: 0,
    lines: 0,
    frame: 0
  });

  useEffect(() => {
    if (!renderer) return;

    const update = () => {
      const info = renderer.info;
      setStats({
        triangles: info.render.triangles,
        calls: info.render.calls,
        points: info.render.points,
        lines: info.render.lines,
        frame: info.render.frame
      });
    };

    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [renderer]);

  return stats;
}