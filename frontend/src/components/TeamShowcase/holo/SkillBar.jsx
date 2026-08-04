import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getSkillIcon } from './skillIcons';

export default function SkillBar({ skill, delay, inView }) {
  const [hovered, setHovered] = useState(false);
  const Icon = getSkillIcon(skill.icon);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="group"
      aria-label={`${skill.name} proficiency ${skill.level} percent`}
    >
      <div className="mb-1.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-medium text-cyan-50/90">
          <Icon className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
          <span>{skill.name}</span>
        </div>
        <span className="font-mono text-[10px] text-cyan-300/70">{skill.level}%</span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400 shadow-[0_0_8px_rgba(56,189,248,0.7)]"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${skill.level}%` : 0 }}
          transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-none absolute -top-8 left-0 z-10 whitespace-nowrap rounded-md border border-cyan-400/20 bg-slate-900/90 px-2 py-1 text-[10px] text-cyan-100 shadow-lg"
        >
          {skill.name} · {skill.level}% proficiency
        </motion.div>
      )}
    </div>
  );
}
