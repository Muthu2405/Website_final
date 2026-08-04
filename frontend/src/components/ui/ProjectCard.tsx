'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types';
import { cn } from '@/lib/utils';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectCardProps {
  project: Project;
  index: number;
  isVisible: boolean;
}

export function ProjectCard({ project, index, isVisible }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      className={cn(
        'group relative rounded-xl overflow-hidden transition-all duration-300',
        'bg-white/3 border border-white/5 backdrop-blur-sm',
        'hover:border-[#00ffff]/30 hover:bg-white/5',
        'cursor-pointer'
      )}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, scale: 1.01 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: hovered
          ? '0 0 60px rgba(0, 255, 255, 0.1), 0 16px 48px rgba(0, 0, 0, 0.4)'
          : '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div className="relative aspect-video overflow-hidden">
        <motion.img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700"
          whileHover={{ scale: 1.08 }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm text-white hover:bg-[#00ffff]/20 hover:border-[#00ffff]/50 transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`View ${project.title} on GitHub`}
          >
            <FaGithub className="w-5 h-5" />
          </motion.a>
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm text-white hover:bg-[#00ffff]/20 hover:border-[#00ffff]/50 transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`View ${project.title} live demo`}
          >
            <FaExternalLinkAlt className="w-5 h-5" />
          </motion.a>
        </div>
        {project.featured && (
          <motion.div
            className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold"
            style={{
              background: 'linear-gradient(135deg, #ff4081, #00ffff)',
              color: '#050510',
            }}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.5, ease: 'backOut' }}
          >
            Featured
          </motion.div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <motion.span
            className="px-2 py-0.5 rounded text-xs font-mono"
            style={{
              background: `linear-gradient(135deg, ${project.techStack[0]?.includes('React') ? '#61DAFB' : '#00FFFF'}22, transparent)`,
              border: `1px solid ${project.techStack[0]?.includes('React') ? '#61DAFB' : '#00FFFF'}44`,
              color: project.techStack[0]?.includes('React') ? '#61DAFB' : '#00FFFF',
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
          >
            {project.techStack[0]}
          </motion.span>
          <motion.span
            className="px-2 py-0.5 rounded text-xs font-mono text-gray-500 bg-white/5 border border-white/10"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + index * 0.05 }}
          >
            +{project.techStack.length - 1}
          </motion.span>
        </div>
        <motion.h3
          className="text-lg font-semibold text-white mb-2 group-hover:text-[#00ffff] transition-colors"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.05 }}
        >
          {project.title}
        </motion.h3>
        <motion.p
          className="text-gray-400 text-sm line-clamp-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 + index * 0.05 }}
        >
          {project.description}
        </motion.p>
        <motion.div
          className="mt-4 flex flex-wrap gap-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + index * 0.05 }}
        >
          {project.techStack.slice(1, 4).map((tech, i) => (
            <motion.span
              key={i}
              className="px-2 py-0.5 rounded text-xs font-mono text-gray-300 bg-white/5 border border-white/10"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ background: 'linear-gradient(90deg, transparent, #00ffff, transparent)' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </motion.article>
  );
}

import { useState } from 'react';