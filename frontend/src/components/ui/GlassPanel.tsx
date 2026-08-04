'use client';

import { ReactNode, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassPanelProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'dark';
  intensity?: number;
  blur?: number;
  border?: boolean;
  glow?: boolean;
  className?: string;
}

const variantStyles = {
  primary: 'bg-white/5 border-white/10',
  secondary: 'bg-white/3 border-white/5',
  accent: 'bg-[#00ffff]/5 border-[#00ffff]/10',
  dark: 'bg-black/30 border-white/5',
};

const variantGlow = {
  primary: 'shadow-[0_0_40px_rgba(255,255,255,0.05)]',
  secondary: 'shadow-[0_0_20px_rgba(255,255,255,0.02)]',
  accent: 'shadow-[0_0_60px_rgba(0,255,255,0.15)]',
  dark: 'shadow-[0_0_40px_rgba(0,0,0,0.5)]',
};

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  (
    {
      children,
      variant = 'primary',
      intensity = 1,
      blur = 20,
      border = true,
      glow = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const backdropBlur = `backdrop-blur-[${blur}px]`;
    const bgOpacity = intensity;

    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative rounded-2xl overflow-hidden',
          backdropBlur,
          border && variantStyles[variant],
          glow && variantGlow[variant],
          'transition-all duration-300',
          className
        )}
        style={{
          ...style,
          backgroundColor: `rgba(255, 255, 255, ${0.02 * intensity})`,
          boxShadow: glow
            ? `0 0 40px rgba(0, 255, 255, ${0.1 * intensity}), 0 8px 32px rgba(0, 0, 0, ${0.3 * intensity}), inset 0 1px 0 rgba(255, 255, 255, ${0.05 * intensity})`
            : `0 8px 32px rgba(0, 0, 0, ${0.3 * intensity}), inset 0 1px 0 rgba(255, 255, 255, ${0.05 * intensity})`,
        }}
        whileHover={{
          boxShadow: glow
            ? `0 0 80px rgba(0, 255, 255, ${0.2 * intensity}), 0 16px 48px rgba(0, 0, 0, ${0.4 * intensity}), inset 0 1px 0 rgba(255, 255, 255, ${0.1 * intensity})`
            : `0 16px 48px rgba(0, 0, 0, ${0.4 * intensity}), inset 0 1px 0 rgba(255, 255, 255, ${0.1 * intensity})`,
          scale: 1.005,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        {...props}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#00ffff]/10 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-10 p-6 lg:p-8">{children}</div>
      </motion.div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';