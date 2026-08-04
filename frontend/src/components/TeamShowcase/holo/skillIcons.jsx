import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGithubactions,
  SiThreedotjs,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';
import { TbBoxMultiple } from 'react-icons/tb';

const ICON_MAP = {
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  nodejs: SiNodedotjs,
  python: SiPython,
  express: SiExpress,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  docker: SiDocker,
  aws: FaAws,
  githubactions: SiGithubactions,
  threejs: SiThreedotjs,
  r3f: TbBoxMultiple,
};

export function getSkillIcon(key) {
  return ICON_MAP[key] ?? TbBoxMultiple;
}
