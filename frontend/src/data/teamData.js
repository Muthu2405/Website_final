/**
 * Team Showcase Data
 * Contains developer profiles, projects, and technology categories
 */

export const DEVELOPERS = [
  {
    id: 1,
    name: "Muthukumar",
    role: "Full Stack Developer & Cloud Engineer",
    experience: "1+ Years",
    projects: "5+ Projects",
    bio: "Full stack developer and cloud engineer building end-to-end applications spanning data pipelines, APIs, and modern web frontends, with hands-on AWS deployment experience and a growing focus on agentic AI systems.",
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_10cfef659-1778787023536.png",
    photoAlt: "Developer in astronaut suit, dark industrial space station background, dramatic blue rim lighting, deep shadows",
    technologies: [
      "Python", "Django", "Flask", "FastAPI", "REST API",
      "AWS", "React", "TypeScript", "Next.js", "Tailwind CSS",
      "PostgreSQL", "Docker", "GitHub Actions", "Agentic AI"
    ],
    contact: {
      email: "muthu200524@gmail.com",
      linkedin: "linkedin.com/in/kmuthukumar-r2405",
      github: "github.com/Muthu2405",
      instagram: "@muthu2405",
      phone: "+91-XXXXXXXXXX"
    },
    accentColor: "#4a6fa5",
    featured: true
  },
  {
    id: 2,
    name: "Navaneetha Krishnan",
    role: "Frontend Developer",
    experience: "2+ Years",
    projects: "8+ Projects",
    bio: "Frontend specialist crafting pixel-perfect, performant user interfaces with React ecosystem. Passionate about animation, accessibility, and developer experience.",
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_195597aae-1772497150188.png",
    photoAlt: "Developer portrait, dark moody space station corridor, blue LED ambient lighting, atmospheric shadows, cinematic",
    technologies: [
      "React", "Next.js", "TypeScript", "Tailwind CSS",
      "Framer Motion", "GSAP", "Three.js", "React Three Fiber",
      "GraphQL", "Storybook", "Jest", "Cypress"
    ],
    contact: {
      email: "navaneetha@example.com",
      linkedin: "linkedin.com/in/navaneetha",
      github: "github.com/navaneetha",
      instagram: "@navaneetha",
      phone: "+91-XXXXXXXXXX"
    },
    accentColor: "#6b4fa5",
    featured: false
  },
  {
    id: 3,
    name: "Ramya",
    role: "Backend Engineer",
    experience: "3+ Years",
    projects: "12+ Projects",
    bio: "Backend engineer designing scalable systems, APIs, and data architectures. Expert in cloud infrastructure, databases, and distributed systems.",
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1b7bd2969-1779628662236.png",
    photoAlt: "Engineer portrait, dark server room background, cool blue server rack glow, deep cinematic shadows",
    technologies: [
      "Node.js", "Python", "Go", "PostgreSQL", "MongoDB",
      "Redis", "Kubernetes", "Docker", "AWS", "Terraform",
      "GraphQL", "gRPC", "Kafka", "Elasticsearch"
    ],
    contact: {
      email: "ramya@example.com",
      linkedin: "linkedin.com/in/ramya",
      github: "github.com/ramya",
      instagram: "@ramya_dev",
      phone: "+91-XXXXXXXXXX"
    },
    accentColor: "#2a7a5a",
    featured: false
  }
];

export const PROJECTS = [
  {
    id: 1,
    title: "Agentic AI Platform",
    description: "Multi-agent AI system for automated code review and deployment orchestration. Built with LangChain, FastAPI, and React.",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
    tech: ["Python", "LangChain", "FastAPI", "React", "PostgreSQL", "Redis"],
    github: "https://github.com/muthu2405/agentic-ai",
    demo: "https://agentic-ai-demo.vercel.app",
    featured: true
  },
  {
    id: 2,
    title: "Cloud Infrastructure Dashboard",
    description: "Real-time AWS resource monitoring and cost optimization dashboard with automated alerts.",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    tech: ["React", "TypeScript", "AWS", "D3.js", "Node.js", "DynamoDB"],
    github: "https://github.com/muthu2405/cloud-dashboard",
    demo: "https://cloud-dash-demo.vercel.app",
    featured: true
  },
  {
    id: 3,
    title: "Real-time Collaboration Editor",
    description: "Collaborative code editor with operational transformation, presence, and conflict resolution.",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
    tech: ["React", "Yjs", "WebRTC", "Node.js", "PostgreSQL", "Redis"],
    github: "https://github.com/muthu2405/collab-editor",
    demo: "https://collab-editor-demo.vercel.app",
    featured: true
  },
  {
    id: 4,
    title: "3D Portfolio Visualizer",
    description: "Immersive Three.js portfolio with WebGL shaders, physics, and interactive storytelling.",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop",
    tech: ["Three.js", "React Three Fiber", "GSAP", "GLSL", "Blender"],
    github: "https://github.com/muthu2405/3d-portfolio",
    demo: "https://3d-portfolio-demo.vercel.app",
    featured: false
  },
  {
    id: 5,
    title: "DevOps Automation Suite",
    description: "CI/CD pipeline automation with infrastructure as code, testing, and deployment strategies.",
    thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=250&fit=crop",
    tech: ["GitHub Actions", "Terraform", "Docker", "Kubernetes", "ArgoCD"],
    github: "https://github.com/muthu2405/devops-suite",
    demo: null,
    featured: false
  }
];

export const TECH_CATEGORIES = [
  {
    id: "frontend",
    name: "Frontend",
    icon: "FaReact",
    color: "#61DAFB",
    skills: [
      { name: "React", level: 95, icon: "FaReact" },
      { name: "Next.js", level: 90, icon: "FaNodeJs" },
      { name: "TypeScript", level: 92, icon: "FaCode" },
      { name: "Tailwind CSS", level: 88, icon: "FaCss3Alt" },
      { name: "Framer Motion", level: 85, icon: "FaMagic" },
      { name: "GSAP", level: 82, icon: "FaMagic" },
      { name: "Three.js", level: 78, icon: "FaCube" },
      { name: "React Three Fiber", level: 75, icon: "FaCube" }
    ]
  },
  {
    id: "backend",
    name: "Backend",
    icon: "FaServer",
    color: "#339933",
    skills: [
      { name: "Node.js", level: 90, icon: "FaNodeJs" },
      { name: "Python", level: 95, icon: "FaPython" },
      { name: "Express.js", level: 88, icon: "FaCode" },
      { name: "FastAPI", level: 85, icon: "FaBolt" },
      { name: "GraphQL", level: 80, icon: "FaCode" },
      { name: "REST API", level: 92, icon: "FaExchangeAlt" },
      { name: "gRPC", level: 70, icon: "FaCode" },
      { name: "WebSockets", level: 78, icon: "FaWifi" }
    ]
  },
  {
    id: "database",
    name: "Database",
    icon: "FaDatabase",
    color: "#336791",
    skills: [
      { name: "PostgreSQL", level: 90, icon: "FaDatabase" },
      { name: "MongoDB", level: 85, icon: "FaDatabase" },
      { name: "Redis", level: 82, icon: "FaMemory" },
      { name: "DynamoDB", level: 75, icon: "FaDatabase" },
      { name: "Elasticsearch", level: 70, icon: "FaSearch" },
      { name: "Prisma ORM", level: 80, icon: "FaCode" }
    ]
  },
  {
    id: "devops",
    name: "DevOps",
    icon: "FaTools",
    color: "#2496ED",
    skills: [
      { name: "Docker", level: 90, icon: "FaDocker" },
      { name: "AWS", level: 88, icon: "FaAws" },
      { name: "GitHub Actions", level: 85, icon: "FaGithub" },
      { name: "Kubernetes", level: 75, icon: "FaKubernetes" },
      { name: "Terraform", level: 80, icon: "FaCode" },
      { name: "ArgoCD", level: 70, icon: "FaSync" },
      { name: "Linux", level: 85, icon: "FaLinux" },
      { name: "CI/CD", level: 90, icon: "FaInfinity" }
    ]
  },
  {
    id: "3d",
    name: "3D & Graphics",
    icon: "FaCube",
    color: "#8B5CF6",
    skills: [
      { name: "Three.js", level: 82, icon: "FaCube" },
      { name: "React Three Fiber", level: 78, icon: "FaCube" },
      { name: "GLSL Shaders", level: 70, icon: "FaCode" },
      { name: "Blender", level: 65, icon: "FaCube" },
      { name: "WebGL", level: 75, icon: "FaCode" },
      { name: "Post-processing", level: 72, icon: "FaMagic" }
    ]
  }
];

export const ICON_MAP = {
  FaReact: "react",
  FaNodeJs: "node-js",
  FaCode: "code",
  FaCss3Alt: "css3-alt",
  FaMagic: "magic",
  FaCube: "cube",
  FaServer: "server",
  FaPython: "python",
  FaBolt: "bolt",
  FaExchangeAlt: "exchange-alt",
  FaWifi: "wifi",
  FaDatabase: "database",
  FaMemory: "memory",
  FaSearch: "search",
  FaTools: "tools",
  FaDocker: "docker",
  FaAws: "aws",
  FaGithub: "github",
  FaKubernetes: "kubernetes",
  FaSync: "sync",
  FaLinux: "linux",
  FaInfinity: "infinity"
};