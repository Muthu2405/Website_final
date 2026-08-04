import React from 'react';
import { motion } from 'framer-motion';
import GlassPanel from './GlassPanel';
import SkillBar from './SkillBar';

const categoryContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const categoryItem = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function RightPanel({ categories, visible }) {
  return (
    <GlassPanel
      className="flex h-full w-full flex-col overflow-y-auto p-5"
      initial={{ opacity: 0, x: 60 }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-cyan-300/80">
        Technology Dashboard
      </h2>

      <motion.div
        variants={categoryContainer}
        initial="hidden"
        animate={visible ? 'show' : 'hidden'}
        className="flex flex-col gap-5"
      >
        {categories.map((cat) => (
          <motion.section key={cat.name} variants={categoryItem} aria-labelledby={`cat-${cat.name}`}>
            <h3
              id={`cat-${cat.name}`}
              className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-indigo-300/80"
            >
              {cat.name}
            </h3>
            <div className="flex flex-col gap-3">
              {cat.skills.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} delay={0.15 + i * 0.08} inView={visible} />
              ))}
            </div>
          </motion.section>
        ))}
      </motion.div>
    </GlassPanel>
  );
}
