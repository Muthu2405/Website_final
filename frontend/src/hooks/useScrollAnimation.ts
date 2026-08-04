'use client';

import { useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollProgress {
  progress: number;
  direction: 'up' | 'down';
  velocity: number;
}

interface UseScrollAnimationOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  onUpdate?: (progress: ScrollProgress) => void;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({
    progress: 0,
    direction: 'down',
    velocity: 0,
  });

  const { trigger = 'body', start = 'top top', end = 'bottom bottom', scrub = 1, onUpdate } = options;

  useEffect(() => {
    let lastProgress = 0;
    let lastTime = performance.now();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger,
        start,
        end,
        scrub,
        onUpdate: (self) => {
          const now = performance.now();
          const deltaTime = now - lastTime;
          const velocity = deltaTime > 0 ? (self.progress - lastProgress) / deltaTime * 1000 : 0;

          const progressData: ScrollProgress = {
            progress: self.progress,
            direction: self.direction === -1 ? 'up' : 'down',
            velocity: Math.abs(velocity),
          };

          setScrollProgress(progressData);
          onUpdate?.(progressData);

          lastProgress = self.progress;
          lastTime = now;
        },
      });
    });

    return () => ctx.revert();
  }, [trigger, start, end, scrub, onUpdate]);

  return scrollProgress;
}

export function useScrollTrigger(
  trigger: string | Element,
  animation: (self: ScrollTrigger) => void,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    pinSpacing?: boolean;
    anticipatePin?: number;
  } = {}
) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger,
        start: options.start ?? 'top 80%',
        end: options.end ?? 'bottom 20%',
        scrub: options.scrub ?? false,
        pin: options.pin ?? false,
        pinSpacing: options.pinSpacing ?? true,
        anticipatePin: options.anticipatePin ?? 0,
        onEnter: () => animation(ScrollTrigger.getById(trigger as string)!),
        onEnterBack: () => animation(ScrollTrigger.getById(trigger as string)!),
        onLeave: () => {},
        onLeaveBack: () => {},
      });
    });

    return () => ctx.revert();
  }, [trigger, options.start, options.end, options.scrub, options.pin, options.pinSpacing, options.anticipatePin]);
}

export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1,
        ...options,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef, options.rootMargin, options.threshold]);

  return { isIntersecting, entry };
}