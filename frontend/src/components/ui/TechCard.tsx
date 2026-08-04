'use client';

import { motion } from 'framer-motion';
import { Skill } from '@/types';
import { cn } from '@/lib/utils';

interface TechCardProps {
  skill: Skill;
  index: number;
  isVisible: boolean;
  onHover: (hovered: boolean) => void;
}

export function TechCard({ skill, index, isVisible, onHover }: TechCardProps) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    onHover(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    onHover(false);
  };

  return (
    <motion.div
      className={cn(
        'group relative rounded-xl p-4 overflow-hidden transition-all duration-300',
        'bg-white/3 border border-white/5 backdrop-blur-sm',
        'hover:border-[#00ffff]/30 hover:bg-white/5',
        'cursor-pointer'
      )}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, scale: 1.02 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        boxShadow: hovered
          ? `0 0 40px ${skill.glowColor}, 0 8px 32px rgba(0, 0, 0, 0.3)`
          : '0 4px 20px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${skill.glowColor} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex items-center gap-3">
        <motion.div
          className="flex items-center justify-center rounded-xl"
          style={{
            width: 56,
            height: 56,
            background: `linear-gradient(135deg, ${skill.color}22, ${skill.glowColor}22)`,
            border: `1px solid ${skill.color}44`,
            boxShadow: hovered ? `0 0 30px ${skill.glowColor}` : 'none',
          }}
          animate={{
            scale: hovered ? 1.1 : 1,
            rotate: hovered ? 5 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <span className="text-2xl font-bold" style={{ color: skill.color }}>
            {skill.icon}
          </span>
        </motion.div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white truncate">{skill.name}</h4>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${skill.color}, ${skill.glowColor})`,
                  boxShadow: `0 0 10px ${skill.glowColor}`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.proficiency}%` }}
                transition={{ duration: 1.2, delay: 0.3 + index * 0.05, ease: 'easeOut' }}
              />
            </div>
            <span className="text-xs font-mono text-gray-400 w-10 text-right">
              {skill.proficiency}%
            </span>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      <motion.div
        className="absolute top-4 right-4 w-8 h-8 rounded-lg opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${skill.glowColor} 0%, transparent 70%)`,
        }}
        animate={{ opacity: hovered ? 0.3 : 0, scale: hovered ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

import { useState } from 'react';