export const developer = {
  id: 'dev-001',
  name: 'Alex Rivera',
  role: 'Senior Full Stack Engineer',
  bio: 'I build cinematic, high-performance web experiences — from real-time 3D interfaces to scalable backend systems. Obsessed with the details that make software feel alive.',
  photo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=256&h=256&fit=crop&auto=format',
  location: 'Bengaluru, India',
  email: 'alex.rivera@example.com',
  social: {
    email: 'mailto:alex.rivera@example.com',
    github: 'https://github.com/alexrivera',
    linkedin: 'https://linkedin.com/in/alexrivera',
    portfolio: 'https://alexrivera.dev',
    resume: '/assets/alex-rivera-resume.pdf',
  },
  projects: [
    {
      id: 'proj-1',
      title: 'Orbit Analytics',
      description: 'Real-time data visualization platform processing 2M+ events/day with sub-100ms latency dashboards.',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&auto=format',
      tech: ['React', 'TypeScript', 'WebSocket', 'AWS'],
      githubUrl: 'https://github.com/alexrivera/orbit-analytics',
      liveUrl: 'https://orbit-analytics.example.com',
    },
    {
      id: 'proj-2',
      title: 'Nebula Commerce',
      description: 'Headless e-commerce engine with a 3D product configurator built in React Three Fiber.',
      thumbnail: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=200&fit=crop&auto=format',
      tech: ['Next.js', 'Three.js', 'Node.js', 'PostgreSQL'],
      githubUrl: 'https://github.com/alexrivera/nebula-commerce',
      liveUrl: 'https://nebula-commerce.example.com',
    },
    {
      id: 'proj-3',
      title: 'Pulse CI',
      description: 'Self-hosted CI/CD pipeline orchestrator with live build visualization and Slack ops bots.',
      thumbnail: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=200&fit=crop&auto=format',
      tech: ['Python', 'Docker', 'GitHub Actions'],
      githubUrl: 'https://github.com/alexrivera/pulse-ci',
      liveUrl: 'https://pulse-ci.example.com',
    },
  ],
  skillCategories: [
    {
      name: 'Frontend',
      skills: [
        { name: 'React', level: 95, icon: 'react' },
        { name: 'Next.js', level: 90, icon: 'nextjs' },
        { name: 'TypeScript', level: 92, icon: 'typescript' },
        { name: 'Tailwind', level: 88, icon: 'tailwind' },
      ],
    },
    {
      name: 'Backend',
      skills: [
        { name: 'Node.js', level: 87, icon: 'nodejs' },
        { name: 'Python', level: 80, icon: 'python' },
        { name: 'Express', level: 85, icon: 'express' },
      ],
    },
    {
      name: 'Database',
      skills: [
        { name: 'MongoDB', level: 82, icon: 'mongodb' },
        { name: 'PostgreSQL', level: 84, icon: 'postgresql' },
      ],
    },
    {
      name: 'DevOps',
      skills: [
        { name: 'Docker', level: 78, icon: 'docker' },
        { name: 'AWS', level: 75, icon: 'aws' },
        { name: 'GitHub Actions', level: 80, icon: 'githubactions' },
      ],
    },
    {
      name: '3D',
      skills: [
        { name: 'Three.js', level: 83, icon: 'threejs' },
        { name: 'React Three Fiber', level: 85, icon: 'r3f' },
      ],
    },
  ],
};
