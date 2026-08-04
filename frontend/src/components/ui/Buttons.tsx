'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { FaPaperPlane, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  glow?: boolean;
}

const variantStyles = {
  primary: 'bg-gradient-to-r from-[#00ffff] to-[#0099cc] text-[#050510] hover:from-[#00ccff] hover:to-[#0088bb]',
  secondary: 'bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-white/40',
  ghost: 'bg-transparent text-white hover:bg-white/5',
  accent: 'bg-gradient-to-r from-[#ff4081] to-[#ff0066] text-white hover:from-[#ff5a96] hover:to-[#ff0055]',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'left',
      loading = false,
      fullWidth = false,
      glow = true,
      className,
      style,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold rounded-xl',
          'transition-all duration-300 ease-out',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ffff]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050510]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        style={{
          ...style,
          boxShadow: glow && variant !== 'ghost' && !isDisabled
            ? '0 0 30px rgba(0, 255, 255, 0.3), 0 4px 20px rgba(0, 0, 0, 0.3)'
            : '0 4px 20px rgba(0, 0, 0, 0.2)',
        }}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.02, y: -2 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        {...props}
      >
        {loading && (
          <motion.span
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            aria-hidden="true"
          />
        )}
        {!loading && icon && iconPosition === 'left' && (
          <motion.span className="flex-shrink-0" aria-hidden="true">{icon}</motion.span>
        )}
        <span className="relative z-10">{children}</span>
        {!loading && icon && iconPosition === 'right' && (
          <motion.span className="flex-shrink-0" aria-hidden="true">{icon}</motion.span>
        )}
        {glow && variant !== 'ghost' && !isDisabled && (
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
            style={{
              background: variant === 'accent'
                ? 'radial-gradient(circle at center, rgba(255, 64, 129, 0.4) 0%, transparent 70%)'
                : 'radial-gradient(circle at center, rgba(0, 255, 255, 0.4) 0%, transparent 70%)',
            }}
            initial={{ scale: 0.8 }}
            whileHover={{ opacity: 0.6, scale: 1.2 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          />
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export const ResumeButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'icon'>>(
  (props, ref) => (
    <Button
      ref={ref}
      variant="primary"
      icon={<FaDownload className="w-5 h-5" />}
      iconPosition="left"
      glow={true}
      {...props}
    />
  )
);

ResumeButton.displayName = 'ResumeButton';

export const GitHubButton = forwardRef<HTMLAnchorElement, Omit<ButtonProps, 'variant' | 'icon'>>(
  (
    {
      children,
      href,
      variant = 'secondary',
      icon = <FaGithub className="w-5 h-5" />,
      iconPosition = 'left',
      glow = false,
      ...props
    },
    ref
  ) => (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold rounded-xl',
        'transition-all duration-300 ease-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ffff]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050510]',
        variantStyles[variant],
        sizeStyles.md,
        props.className
      )}
      style={{
        ...props.style,
        boxShadow: glow ? '0 0 30px rgba(0, 255, 255, 0.3), 0 4px 20px rgba(0, 0, 0, 0.3)' : undefined,
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <motion.span className="flex-shrink-0" aria-hidden="true">{icon}</motion.span>
      <span className="relative z-10">{children}</span>
    </motion.a>
  )
);

GitHubButton.displayName = 'GitHubButton';

export const LiveDemoButton = forwardRef<HTMLAnchorElement, Omit<ButtonProps, 'variant' | 'icon'>>(
  (
    {
      children,
      href,
      variant = 'accent',
      icon = <FaExternalLinkAlt className="w-5 h-5" />,
      iconPosition = 'right',
      glow = true,
      ...props
    },
    ref
  ) => (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold rounded-xl',
        'transition-all duration-300 ease-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4081]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050510]',
        variantStyles[variant],
        sizeStyles.md,
        props.className
      )}
      style={{
        ...props.style,
        boxShadow: glow ? '0 0 30px rgba(255, 64, 129, 0.4), 0 4px 20px rgba(0, 0, 0, 0.3)' : undefined,
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <motion.span className="flex-shrink-0" aria-hidden="true">{icon}</motion.span>
    </motion.a>
  )
);

LiveDemoButton.displayName = 'LiveDemoButton';