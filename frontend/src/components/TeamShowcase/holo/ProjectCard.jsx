import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

export default function ProjectCard({ project }) {
  return (
    <motion.article
      whileHover={{ y: -3, boxShadow: '0 0 24px -6px rgba(56,189,248,0.45)' }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
    >
      <div className="relative h-20 w-full overflow-hidden bg-slate-800/60">
        <img
          src={project.thumbnail}
          alt={`${project.title} thumbnail`}
          className="h-full w-full object-cover opacity-80"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
      </div>

      <div className="p-3">
        <h4 className="text-sm font-semibold text-cyan-50">{project.title}</h4>
        <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-cyan-100/60">
          {project.description}
        </p>

        <div className="mt-2 flex flex-wrap gap-1">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded border border-cyan-400/20 bg-cyan-400/10 px-1.5 py-0.5 font-mono text-[9px] text-cyan-200"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-3 flex gap-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-[10px] text-cyan-100/80 transition hover:border-cyan-400/40 hover:text-cyan-200"
            aria-label={`View ${project.title} source on GitHub`}
          >
            <FiGithub className="h-3 w-3" /> Code
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-md border border-cyan-400/25 bg-cyan-400/10 px-2 py-1 text-[10px] text-cyan-200 transition hover:bg-cyan-400/20"
            aria-label={`Open ${project.title} live demo`}
          >
            <FiExternalLink className="h-3 w-3" /> Live
          </a>
        </div>
      </div>
    </motion.article>
  );
}
