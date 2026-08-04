'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AccessibleContainerProps {
  children: ReactNode;
  label: string;
  description?: string;
  liveRegion?: 'polite' | 'assertive' | 'off';
}

export function AccessibleContainer({
  children,
  label,
  description,
  liveRegion = 'polite',
}: AccessibleContainerProps) {
  const descId = useRef(`desc-${Math.random().toString(36).substring(7)}`);

  return (
    <div
      role="region"
      aria-label={label}
      aria-describedby={description ? descId.current : undefined}
    >
      {description && (
        <div id={descId.current} className="sr-only" aria-live={liveRegion}>
          {description}
        </div>
      )}
      {children}
    </div>
  );
}

interface SkipLinkProps {
  href: string;
  label: string;
}

export function SkipLink({ href, label }: SkipLinkProps) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#00ffff] focus:text-[#050510] focus:font-bold focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ffff] focus:ring-offset-2 focus:ring-offset-[#050510]"
    >
      {label}
    </a>
  );
}

interface FocusTrapProps {
  children: ReactNode;
  enabled?: boolean;
  onDeactivate?: () => void;
}

export function FocusTrap({ children, enabled = true, onDeactivate }: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    previousActiveElement.current = document.activeElement as HTMLElement;
    containerRef.current.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = containerRef.current?.querySelectorAll<
        HTMLElement
      >(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
      onDeactivate?.();
    };
  }, [enabled, onDeactivate]);

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className="focus:outline-none"
    >
      {children}
    </div>
  );
}

interface AnnouncerProps {
  message: string;
  priority?: 'polite' | 'assertive';
}

export function Announcer({ message, priority = 'polite' }: AnnouncerProps) {
  const [announce, setAnnounce] = useState('');

  useEffect(() => {
    setAnnounce(message);
    const timer = setTimeout(() => setAnnounce(''), 1000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {announce}
    </div>
  );
}

import { useState } from 'react';