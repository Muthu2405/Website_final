import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiGlobe, FiMail, FiMapPin, FiDownload } from 'react-icons/fi';
import GlassPanel from './GlassPanel';
import ProjectCard from './ProjectCard';

const listContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const listItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function LeftPanel({ developer, visible }) {
  return (
    <GlassPanel
      className="flex h-full w-full flex-col overflow-y-auto p-5"
      initial={{ opacity: 0, x: -60 }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div variants={listContainer} initial="hidden" animate={visible ? 'show' : 'hidden'}>
        <motion.div variants={listItem} className="flex items-center gap-3">
          <img
            src={developer.photo}
            alt={`${developer.name} portrait`}
            className="h-16 w-16 rounded-full border border-cyan-400/30 object-cover shadow-[0_0_20px_-4px_rgba(56,189,248,0.6)]"
          />
          <div>
            <h1 className="text-lg font-bold text-white">{developer.name}</h1>
            <p className="text-xs font-medium text-cyan-300">{developer.role}</p>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-cyan-100/50">
              <FiMapPin className="h-3 w-3" /> {developer.location}
            </p>
          </div>
        </motion.div>

        <motion.p variants={listItem} className="mt-4 text-[12px] leading-relaxed text-cyan-100/70">
          {developer.bio}
        </motion.p>

        <motion.div variants={listItem} className="mt-4 flex flex-wrap gap-2">
          <a
            href={developer.social.email}
            className="flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-[11px] text-cyan-100/80 transition hover:border-cyan-400/40 hover:text-cyan-200"
            aria-label="Email"
          >
            <FiMail className="h-3.5 w-3.5" /> Email
          </a>
          <a
            href={developer.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-[11px] text-cyan-100/80 transition hover:border-cyan-400/40 hover:text-cyan-200"
            aria-label="GitHub profile"
          >
            <FiGithub className="h-3.5 w-3.5" /> GitHub
          </a>
          <a
            href={developer.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-[11px] text-cyan-100/80 transition hover:border-cyan-400/40 hover:text-cyan-200"
            aria-label="LinkedIn profile"
          >
            <FiLinkedin className="h-3.5 w-3.5" /> LinkedIn
          </a>
          <a
            href={developer.social.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-[11px] text-cyan-100/80 transition hover:border-cyan-400/40 hover:text-cyan-200"
            aria-label="Portfolio site"
          >
            <FiGlobe className="h-3.5 w-3.5" /> Portfolio
          </a>
        </motion.div>

        <motion.a
          variants={listItem}
          href={developer.social.resume}
          download
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-400/10 py-2 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
        >
          <FiDownload className="h-3.5 w-3.5" /> Download Resume
        </motion.a>

        <motion.h2
          variants={listItem}
          className="mb-3 mt-6 font-mono text-xs uppercase tracking-[0.25em] text-cyan-300/80"
        >
          Featured Projects
        </motion.h2>

        <motion.div variants={listContainer} className="flex flex-col gap-3">
          {developer.projects.map((project) => (
            <motion.div key={project.id} variants={listItem}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </GlassPanel>
  );
}
