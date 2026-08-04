export const animationConfig = {
  durations: {
    instant: 0.1,
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8,
    cinematic: 1.2,
    epic: 2,
  },
  easings: {
    linear: 'linear',
    easeIn: 'easeIn',
    easeOut: 'easeOut',
    easeInOut: 'easeInOut',
    spring: [0.25, 0.46, 0.45, 0.94] as const,
    bounce: [0.68, -0.55, 0.265, 1.55] as const,
    elastic: [0.175, 0.885, 0.32, 1.275] as const,
    sharp: [0.4, 0, 0.2, 1] as const,
    smooth: [0.25, 0.1, 0.25, 1] as const,
    cinematic: [0.23, 1, 0.32, 1] as const,
  },
  stagger: {
    tight: 0.03,
    normal: 0.08,
    loose: 0.15,
    section: 0.2,
  },
  delays: {
    immediate: 0,
    fast: 0.1,
    normal: 0.2,
    slow: 0.4,
    entrance: 0.6,
  },
};

export const sceneAnimations = {
  cubeReveal: {
    duration: 1.5,
    ease: animationConfig.easings.cinematic,
    stagger: 0.1,
  },
  panelSlide: {
    duration: 1,
    ease: animationConfig.easings.spring,
    stagger: 0.15,
  },
  avatarRise: {
    duration: 1.2,
    ease: animationConfig.easings.cinematic,
  },
  uiFadeIn: {
    duration: 0.8,
    ease: animationConfig.easings.easeOut,
    stagger: 0.06,
  },
  techIcons: {
    duration: 0.6,
    ease: animationConfig.easings.bounce,
    stagger: 0.05,
  },
};

export const gsapDefaults = {
  duration: animationConfig.durations.normal,
  ease: animationConfig.easings.cinematic,
  stagger: animationConfig.stagger.normal,
};

export const framerVariants = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: animationConfig.durations.slow, ease: animationConfig.easings.spring },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
    transition: { duration: animationConfig.durations.slow, ease: animationConfig.easings.spring },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
    transition: { duration: animationConfig.durations.slow, ease: animationConfig.easings.spring },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: { duration: animationConfig.durations.slow, ease: animationConfig.easings.spring },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: animationConfig.durations.normal, ease: animationConfig.easings.spring },
  },
  rotateIn: {
    initial: { opacity: 0, rotate: -180, scale: 0.5 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    exit: { opacity: 0, rotate: 180, scale: 0.5 },
    transition: { duration: animationConfig.durations.cinematic, ease: animationConfig.easings.cinematic },
  },
  slidePanel: {
    initial: { opacity: 0, x: -100, scaleX: 0.8 },
    animate: { opacity: 1, x: 0, scaleX: 1 },
    exit: { opacity: 0, x: 100, scaleX: 0.8 },
    transition: { duration: animationConfig.durations.cinematic, ease: animationConfig.easings.cinematic },
  },
  slidePanelRight: {
    initial: { opacity: 0, x: 100, scaleX: 0.8 },
    animate: { opacity: 1, x: 0, scaleX: 1 },
    exit: { opacity: 0, x: -100, scaleX: 0.8 },
    transition: { duration: animationConfig.durations.cinematic, ease: animationConfig.easings.cinematic },
  },
  cubeUnfold: {
    initial: { opacity: 0, rotateX: -90, scale: 0.5 },
    animate: { opacity: 1, rotateX: 0, scale: 1 },
    transition: { duration: animationConfig.durations.epic, ease: animationConfig.easings.cinematic },
  },
  avatarRise: {
    initial: { opacity: 0, y: 100, scale: 0.5 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: animationConfig.durations.epic, ease: animationConfig.easings.cinematic },
  },
  techIcon: {
    initial: { opacity: 0, scale: 0, rotate: -180 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    transition: { duration: animationConfig.durations.slow, ease: animationConfig.easings.bounce },
  },
  projectCard: {
    initial: { opacity: 0, y: 40, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: animationConfig.durations.slower, ease: animationConfig.easings.spring },
  },
};

export const scrollAnimations = {
  parallax: (speed = 0.5) => ({
    transform: `translateY(${speed * 100}%)`,
  }),
  reveal: {
    opacity: [0, 1],
    y: [50, 0],
    transition: { duration: 1, ease: animationConfig.easings.cinematic },
  },
  staggerChildren: (stagger = 0.1) => ({
    transition: { staggerChildren: stagger },
  }),
};