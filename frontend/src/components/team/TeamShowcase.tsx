'use client';

import { useState, useEffect, useRef, useCallback, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaGlobe, FaFileAlt, FaCode, FaDatabase, FaServer, FaCube } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ThreeScene } from '@/components/three';
import { GlassPanel, TechCard, ProjectCard } from '@/components/ui';
import { Button, ResumeButton, GitHubButton, LiveDemoButton } from '@/components/ui/Buttons';
import { useReducedMotion, useMouseParallax, useScrollAnimation } from '@/hooks';
import { developerData } from '@/data/developer';
import { framerVariants, sceneAnimations } from '@/lib/animations';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const ThreeSceneWrapper = lazy(() => import('./ThreeSceneWrapper').then(m => ({ default: m.ThreeSceneWrapper })));

interface TeamShowcaseProps {
  className?: string;
}

export function TeamShowcase({ className }: TeamShowcaseProps) {
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [visiblePanels, setVisiblePanels] = useState({ left: false, center: false, right: false });
  const [scrollProgress, setScrollProgress] = useState(0);
  const reducedMotion = useReducedMotion();
  const { mouse } = useMouseParallax();
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const centerPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const scrollAnimation = useScrollAnimation({
    trigger: containerRef.current ?? 'body',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    onUpdate: (progress) => {
      setScrollProgress(progress.progress);
    },
  });

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    timeline
      .to('.cube-face', {
        rotationY: (i: number) => i * 90,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power3.inOut',
      })
      .to('.panel-left', { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5')
      .to('.panel-center', { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.7')
      .to('.panel-right', { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.9')
      .call(() => setVisiblePanels({ left: true, center: true, right: true }));

    return () => timeline.kill();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to('.avatar-float', {
        y: -20,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.to('.particle-field', {
        rotation: 360,
        duration: 60,
        ease: 'none',
        repeat: -1,
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to('.holographic-platform', {
            rotationY: progress * 720,
            duration: 0.5,
            ease: 'none',
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSceneLoad = useCallback(() => {
    setSceneLoaded(true);
  }, []);

  const handleSceneProgress = useCallback((progress: number) => {
    setLoadProgress(progress);
  }, []);

  if (!sceneLoaded) {
    return (
      <div
        ref={containerRef}
        className={cn('relative w-full h-screen overflow-hidden', className)}
        role="region"
        aria-label="Team Showcase Loading"
      >
        <div className="absolute inset-0 bg-[#050510] z-10 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              className="w-32 h-32 mx-auto mb-6 relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{ filter: 'drop-shadow(0 0 30px rgba(0, 255, 255, 0.5))' }}
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
                  className="animate-spin"
                />
              </svg>
            </motion.div>
            <motion.div
              className="text-[#00ffff] font-mono text-xl mb-4"
              animate={{ textContent: [0, loadProgress] }}
            >
              {Math.floor(loadProgress)}%
            </motion.div>
            <motion.div
              className="w-64 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#00ffff] to-[#ff4081] rounded-full"
                animate={{ width: `${loadProgress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </motion.div>
            <p className="text-gray-500 text-sm mt-6">Initializing cinematic experience...</p>
          </div>
        </div>
        <Canvas
          camera={{ position: [0, 1.5, 3.5], fov: 50 }}
          gl={{ preserveDrawingBuffer: true, alpha: true, antialias: true }}
        >
          <Suspense fallback={null}>
            <ThreeSceneWrapper
              onLoad={handleSceneLoad}
              onProgress={handleSceneProgress}
              reducedMotion={reducedMotion}
              scrollProgress={scrollProgress}
            />
          </Suspense>
        </Canvas>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full h-screen overflow-hidden', className)}
      role="region"
      aria-label="Team Showcase - Interactive Developer Profile"
    >
      <Canvas
        camera={{ position: [0, 1.5, 3.5], fov: 50 }}
        gl={{ preserveDrawingBuffer: true, alpha: true, antialias: true }}
        style={{ zIndex: 0 }}
      >
        <ThreeScene
          onLoad={handleSceneLoad}
          onProgress={handleSceneProgress}
          reducedMotion={reducedMotion}
          scrollProgress={scrollProgress}
        />
      </Canvas>

      <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00ffff]/5 via-transparent to-[#ff4081]/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,255,0.03)_0%,_transparent_70%)]" />
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#00ffff]/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-20 h-full flex items-center justify-center px-4 lg:px-8 pointer-events-auto">
        <div className="w-full max-w-[1800px] h-full flex gap-4 lg:gap-6 items-stretch">
          <motion.div
            ref={leftPanelRef}
            className="panel-left flex-1 lg:max-w-[380px] min-w-0"
            variants={framerVariants.slidePanel}
            initial="initial"
            animate="animate"
            transition={framerVariants.slidePanel.transition}
            style={{ willChange: 'transform, opacity' }}
          >
            <LeftPanel developer={developerData} visible={visiblePanels.left} reducedMotion={reducedMotion} />
          </motion.div>

          <motion.div
            ref={centerPanelRef}
            className="panel-center flex-1 lg:max-w-[600px] min-w-0 flex items-center justify-center"
            variants={framerVariants.scaleIn}
            initial="initial"
            animate="animate"
            transition={framerVariants.scaleIn.transition}
            style={{ willChange: 'transform, opacity' }}
          >
            <CenterPanel developer={developerData} visible={visiblePanels.center} reducedMotion={reducedMotion} mouse={mouse} />
          </motion.div>

          <motion.div
            ref={rightPanelRef}
            className="panel-right flex-1 lg:max-w-[380px] min-w-0"
            variants={framerVariants.slidePanelRight}
            initial="initial"
            animate="animate"
            transition={framerVariants.slidePanelRight.transition}
            style={{ willChange: 'transform, opacity' }}
          >
            <RightPanel developer={developerData} visible={visiblePanels.right} reducedMotion={reducedMotion} />
          </motion.div>
        </div>
      </div>

      <ScrollIndicator progress={scrollProgress} reducedMotion={reducedMotion} />
    </div>
  );
}

function LeftPanel({ developer, visible, reducedMotion }: { developer: typeof developerData; visible: boolean; reducedMotion: boolean }) {
  if (!visible) return null;

  return (
    <div className="h-full flex flex-col gap-4 lg:gap-6 p-4 lg:p-6 overflow-y-auto custom-scrollbar">
      <GlassPanel variant="primary" intensity={1} className="flex-1 flex flex-col gap-6">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden border border-white/10 bg-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00ffff]/20 to-[#ff4081]/20" />
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <span className="text-6xl lg:text-8xl">👨‍💻</span>
            </div>
          </div>
          <div>
            <motion.h2
              className="text-2xl lg:text-3xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {developer.name}
            </motion.h2>
            <motion.p
              className="text-lg text-[#00ffff] font-medium mt-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {developer.role}
            </motion.p>
          </div>
        </div>

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-gray-300 leading-relaxed text-base">{developer.bio}</p>
        </motion.div>

        <motion.div
          className="pt-4 border-t border-white/10 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex items-center gap-3 text-gray-300">
            <FaEnvelope className="w-5 h-5 text-[#00ffff]" aria-hidden="true" />
            <a href={`mailto:${developer.email}`} className="hover:text-[#00ffff] transition-colors">{developer.email}</a>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <FaMapMarkerAlt className="w-5 h-5 text-[#00ffff]" aria-hidden="true" />
            <span>{developer.location}</span>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <GitHubButton href={developer.social.github} size="sm">GitHub</GitHubButton>
          <Button variant="secondary" size="sm" asChild>
            <a href={developer.social.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="w-4 h-4 mr-2" aria-hidden="true" />
              LinkedIn
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href={developer.social.portfolio} target="_blank" rel="noopener noreferrer">
              <FaGlobe className="w-4 h-4 mr-2" aria-hidden="true" />
              Portfolio
            </a>
          </Button>
        </motion.div>

        <motion.div
          className="pt-4 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <ResumeButton
            onClick={() => window.open(developer.social.resume!, '_blank')}
            fullWidth
            size="lg"
          >
            <FaFileAlt className="w-5 h-5" aria-hidden="true" />
            Download Resume
          </ResumeButton>
        </motion.div>
      </GlassPanel>

      <GlassPanel variant="secondary" intensity={0.8} className="flex-1 min-h-[300px] flex flex-col gap-4">
        <motion.h3
          className="text-lg font-semibold text-white flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <FaCode className="w-5 h-5 text-[#00ffff]" aria-hidden="true" />
          Featured Projects
        </motion.h3>
        <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
          {developer.featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isVisible={visible} />
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}

function CenterPanel({
  developer,
  visible,
  reducedMotion,
  mouse,
}: {
  developer: typeof developerData;
  visible: boolean;
  reducedMotion: boolean;
  mouse: { x: number; y: number };
}) {
  if (!visible) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          transform: `perspective(1000px) rotateY(${mouse.x * 10}deg) rotateX(${-mouse.y * 5}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#00ffff]/10 via-transparent to-[#ff4081]/10 rounded-3xl blur-3xl" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#00ffff]/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="mb-6 flex items-center justify-center gap-4">
          <span className="px-3 py-1 rounded-full text-xs font-mono text-[#00ffff] border border-[#00ffff]/30 bg-[#00ffff]/10">
            LIVE AVATAR
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono text-[#ff4081] border border-[#ff4081]/30 bg-[#ff4081]/10">
            AI-ENHANCED
          </span>
        </div>
        <p className="text-gray-400 text-sm max-w-xs mx-auto">
          Real-time 3D avatar with procedural animation, mouse tracking, and dynamic lighting
        </p>
      </motion.div>
    </div>
  );
}

function RightPanel({ developer, visible, reducedMotion }: { developer: typeof developerData; visible: boolean; reducedMotion: boolean }) {
  if (!visible) return null;

  return (
    <div className="h-full flex flex-col gap-4 lg:gap-6 p-4 lg:p-6 overflow-y-auto custom-scrollbar">
      <GlassPanel variant="accent" intensity={1} className="flex-1 flex flex-col gap-4">
        <motion.h3
          className="text-lg font-semibold text-white flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <FaCube className="w-5 h-5 text-[#ff4081]" aria-hidden="true" />
          Technology Dashboard
        </motion.h3>
        <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar">
          {developer.skills.map((category, catIndex) => (
            <motion.div
              key={category.category}
              className="space-y-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + catIndex * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                <span className="w-6 h-6 rounded-lg flex items-center justify-center font-bold"
                  style={{ background: `linear-gradient(135deg, ${category.color}22, transparent)`, color: category.color }}>
                  {category.icon}
                </span>
                {category.category}
                <span className="flex-1 h-px bg-white/10" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <TechCard
                    key={skill.id}
                    skill={skill}
                    index={catIndex * 10 + skillIndex}
                    isVisible={visible}
                    onHover={() => {}}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}

function ScrollIndicator({ progress, reducedMotion }: { progress: number; reducedMotion: boolean }) {
  if (reducedMotion) return null;

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      aria-hidden="true"
    >
      <motion.div
        className="w-px h-24 bg-gradient-to-b from-[#00ffff] to-transparent"
        animate={{ scaleY: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="w-6 h-6 rounded-full border-2 border-[#00ffff]/50 flex items-center justify-center"
        animate={{
          rotate: 360,
          borderColor: ['#00ffff', '#ff4081', '#00ffff'],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: 'linear-gradient(135deg, #00ffff, #ff4081)' }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
      <motion.span
        className="text-xs font-mono text-[#00ffff]/70"
        animate={{ textContent: [0, Math.round(progress * 100)] }}
      >
        {Math.round(progress * 100)}%
      </motion.span>
    </motion.div>
  );
}

export default TeamShowcase;