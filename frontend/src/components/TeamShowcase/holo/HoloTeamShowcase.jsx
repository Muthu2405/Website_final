import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { developer } from './developerData';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

// R3F Canvas is heavy — code-split it out of the main bundle.
const CubeIntro = lazy(() => import('./three/CubeIntro'));

export default function HoloTeamShowcase() {
  const [phase, setPhase] = useState('idle');
  const [bgVisible, setBgVisible] = useState(false);
  const timers = useRef([]);
  const sectionRef = useRef(null);
  const sceneWrapRef = useRef(null);
  const started = useRef(false);

  // Kick off the reveal sequence the first time the section enters the viewport.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const add = (fn, delay) => timers.current.push(setTimeout(fn, delay));

    const runSequence = () => {
      if (started.current) return;
      started.current = true;
      add(() => setBgVisible(true), 50); // 1. fade background
      add(() => setPhase('cube'), 100); // 2 & 3. cube appears + rotates
      add(() => setPhase('unfolding'), 1400); // 4. cube unfolds
      add(() => setPhase('reveal'), 2300); // 5-8. panels slide out, tech icons stagger in
    };

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      once: true,
      onEnter: runSequence,
    });

    // Subtle scroll-scrubbed parallax on the center column while the section is in frame.
    const parallax = gsap.fromTo(
      sceneWrapRef.current,
      { yPercent: 4, rotateX: 3 },
      {
        yPercent: -4,
        rotateX: -3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );

    return () => {
      timers.current.forEach(clearTimeout);
      trigger.kill();
      parallax.scrollTrigger?.kill();
      parallax.kill();
    };
  }, []);

  const revealed = phase === 'reveal';

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#04060f] py-20"
      aria-label="Team showcase"
    >
      {/* Ambient background */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: bgVisible ? 1 : 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#04060f,rgba(4,6,15,0.4)_40%,#04060f)]" />
        <div className="holo-grid-floor absolute inset-x-0 bottom-0 h-1/2 opacity-30" />
      </motion.div>

      {/* Section title */}
      <motion.div
        className="relative z-10 mb-12 px-4 text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={bgVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.7 }}
      >
        <span className="text-sm font-semibold uppercase tracking-wider text-cyan-400">Our Team</span>
        <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Meet our developers</h2>
        <p className="mx-auto mt-4 max-w-xl text-gray-400">
          Our crew of space-ready engineers, riding in one at a time.
        </p>
      </motion.div>

      {/* Cube intro overlay */}
      <AnimatePresence>
        {(phase === 'cube' || phase === 'unfolding') && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-[40vh] w-[40vh] max-w-[420px]">
              <Suspense fallback={null}>
                <CubeIntro unfolding={phase === 'unfolding'} />
              </Suspense>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Three-panel layout — generous horizontal breathing room from the viewport edge */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-6 px-6 sm:px-10 md:grid-cols-[420px_140px_420px] md:px-16 lg:grid-cols-[480px_160px_480px] lg:px-24">
        <div className="hidden md:block">
          <LeftPanel developer={developer} visible={revealed} />
        </div>

        {/* Center column — decorative ambient space, doubles as breathing room between panels */}
        <div ref={sceneWrapRef} className="relative hidden min-h-[520px] [perspective:1200px] md:flex md:items-center md:justify-center">
          <motion.div
            className="holo-orb h-20 w-20 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <div className="hidden md:block">
          <RightPanel categories={developer.skillCategories} visible={revealed} />
        </div>

        {/* Mobile-only stacked panels */}
        <div className="col-span-1 flex flex-col gap-4 md:hidden">
          {revealed && (
            <>
              <LeftPanel developer={developer} visible={revealed} />
              <RightPanel categories={developer.skillCategories} visible={revealed} />
            </>
          )}
        </div>
      </div>

      <style>{`
        .holo-grid-floor {
          background-image:
            linear-gradient(rgba(56, 189, 248, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.12) 1px, transparent 1px);
          background-size: 48px 48px;
          -webkit-mask-image: linear-gradient(to top, black, transparent);
          mask-image: linear-gradient(to top, black, transparent);
        }
        .holo-orb {
          background: radial-gradient(circle at 35% 30%, rgba(224,242,254,0.9), rgba(56,189,248,0.25) 45%, transparent 70%);
          box-shadow: 0 0 80px 20px rgba(56,189,248,0.25);
        }
      `}</style>
    </section>
  );
}
