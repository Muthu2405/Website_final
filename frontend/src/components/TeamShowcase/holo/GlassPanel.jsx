import React from 'react';
import { motion } from 'framer-motion';

export default function GlassPanel({ children, className = '', ...motionProps }) {
  return (
    <motion.div
      className={`glass-panel relative rounded-2xl border border-cyan-400/20 bg-white/[0.045] backdrop-blur-2xl shadow-[0_0_50px_-8px_rgba(56,189,248,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] ${className}`}
      {...motionProps}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-cyan-400/[0.08] via-transparent to-indigo-400/[0.03]" />
      <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 rounded-tl-md border-l border-t border-cyan-300/50" />
      <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 rounded-tr-md border-r border-t border-cyan-300/50" />
      <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 rounded-bl-md border-b border-l border-cyan-300/30" />
      <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 rounded-br-md border-b border-r border-cyan-300/30" />
      {children}
    </motion.div>
  );
}
