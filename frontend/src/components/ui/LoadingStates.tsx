'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'shimmer';
}

export function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  animation = 'shimmer',
}: SkeletonProps) {
  const baseStyles = 'relative overflow-hidden bg-white/5 rounded';
  const variantStyles = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-xl',
  };

  return (
    <motion.div
      className={cn(baseStyles, variantStyles[variant], className)}
      style={{ width, height }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          transform: 'translateX(-100%)',
        }}
        animate={{ transform: ['translateX(-100%)', 'translateX(100%)'] }}
        transition={{
          duration: animation === 'pulse' ? 1.5 : animation === 'wave' ? 2 : 1.5,
          repeat: Infinity,
          ease: animation === 'pulse' ? 'easeInOut' : 'linear',
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

interface SkeletonCardProps {
  className?: string;
  lines?: number;
  showImage?: boolean;
  showActions?: boolean;
}

export function SkeletonCard({
  className,
  lines = 3,
  showImage = true,
  showActions = true,
}: SkeletonCardProps) {
  return (
    <div className={cn('rounded-xl bg-white/3 border border-white/5 p-4 space-y-3', className)}>
      {showImage && (
        <Skeleton variant="rectangular" width="100%" height="200" animation="wave" />
      )}
      <Skeleton variant="text" width="60%" height="24" animation="shimmer" />
      <Skeleton variant="text" width="80%" height="16" animation="shimmer" />
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} variant="circular" width="60" height="24" animation="pulse" />
        ))}
      </div>
      {[...Array(lines)].map((_, i) => (
        <Skeleton key={i} variant="text" width={`${70 + Math.random() * 20}%`} height="14" animation="shimmer" />
      ))}
      {showActions && (
        <div className="flex gap-2 pt-2 border-t border-white/5">
          <Skeleton variant="rectangular" width="100" height="36" animation="pulse" />
          <Skeleton variant="rectangular" width="100" height="36" animation="pulse" />
        </div>
      )}
    </div>
  );
}

interface SkeletonGridProps {
  columns?: number;
  rows?: number;
  gap?: number;
  cardProps?: SkeletonCardProps;
}

export function SkeletonGrid({
  columns = 3,
  rows = 2,
  gap = 4,
  cardProps,
}: SkeletonGridProps) {
  return (
    <div className={cn('grid gap-', gap)}>
      <style jsx>{`
        .grid { grid-template-columns: repeat(${columns}, 1fr); }
        @media (max-width: 1024px) { .grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }
      `}</style>
      {[...Array(rows * columns)].map((_, i) => (
        <SkeletonCard key={i} {...cardProps} />
      ))}
    </div>
  );
}

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  progress?: number;
  className?: string;
}

export function LoadingOverlay({
  visible,
  message = 'Loading...',
  progress,
  className,
}: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <motion.div
      className={cn('fixed inset-0 z-50 flex items-center justify-center bg-[#050510]/95 backdrop-blur-sm', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="alert"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="text-center space-y-6">
        <motion.div
          className="w-24 h-24 mx-auto relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{ filter: 'drop-shadow(0 0 30px rgba(0, 255, 255, 0.5))' }}
          aria-hidden="true"
        >
          <svg className="w-full h-full text-[#00ffff]" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="180 100"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
        <div className="space-y-2">
          <motion.p className="text-[#00ffff] font-mono text-lg">
            {progress !== undefined ? `${Math.round(progress)}%` : message}
          </motion.p>
          {progress !== undefined && (
            <motion.div className="w-64 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00ffff] to-[#ff4081] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </motion.div>
          )}
        </div>
        <motion.p className="text-gray-500 text-sm">
          {progress !== undefined ? 'Initializing cinematic experience...' : 'Please wait'}
        </motion.p>
      </div>
    </motion.div>
  );
}

interface ProgressiveImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function ProgressiveImage({
  src,
  alt,
  placeholder,
  className,
  onLoad,
  onError,
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {!loaded && !error && placeholder && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
          style={{
            backgroundImage: `url(${placeholder})`,
            filter: 'blur(20px) brightness(0.3)',
            transform: 'scale(1.1)',
          }}
          aria-hidden="true"
        />
      )}
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5" aria-hidden="true">
          <motion.div
            className="w-8 h-8 border-2 border-[#00ffff]/50 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-700',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={() => {
          setLoaded(true);
          onLoad?.();
        }}
        onError={() => {
          setError(true);
          onError?.();
        }}
        loading="lazy"
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5 text-gray-500" role="img" aria-label="Failed to load image">
          <span className="text-sm">Failed to load</span>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';