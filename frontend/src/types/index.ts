export interface Developer {
  id: string;
  name: string;
  role: string;
  bio: string;
  email: string;
  location: string;
  avatar: string;
  social: SocialLinks;
  featuredProjects: Project[];
  skills: SkillCategory[];
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  portfolio: string;
  resume?: string;
  twitter?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

export interface SkillCategory {
  category: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  proficiency: number;
  description: string;
  color: string;
  glowColor: string;
}

export interface ThreeSceneProps {
  onLoad: () => void;
  onProgress: (progress: number) => void;
  reducedMotion: boolean;
}

export interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  intensity?: number;
}

export interface TechCardProps {
  skill: Skill;
  index: number;
  isVisible: boolean;
  onHover: (hovered: boolean) => void;
}

export interface ProjectCardProps {
  project: Project;
  index: number;
  isVisible: boolean;
}

export interface AnimationConfig {
  duration: number;
  ease: string;
  delay: number;
  stagger: number;
}

export interface ViewportSize {
  width: number;
  height: number;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface ScrollProgress {
  progress: number;
  direction: 'up' | 'down';
}