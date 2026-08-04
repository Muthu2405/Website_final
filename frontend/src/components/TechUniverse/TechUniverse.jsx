import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

const TECH_DATA = {
    frontend: [
        { id: 'html5', name: 'HTML5', category: 'Frontend', logo: '5', color: '#e34f26', flameColor: '#f06529', status: 'mastered', experience: 90, popularity: 5, difficulty: 'Beginner', desc: 'Standard markup language.' },
        { id: 'css3', name: 'CSS3', category: 'Frontend', logo: '3', color: '#2965f1', flameColor: '#2965f1', status: 'mastered', experience: 88, popularity: 5, difficulty: 'Beginner', desc: 'Style sheet language.' },
        { id: 'javascript', name: 'JavaScript', category: 'Frontend', logo: 'JS', color: '#f7df1e', flameColor: '#f0db4f', status: 'mastered', experience: 92, popularity: 5, difficulty: 'Intermediate', desc: 'Dynamic programming language.' },
        { id: 'typescript', name: 'TypeScript', category: 'Frontend', logo: 'TS', color: '#3178c6', flameColor: '#3178c6', status: 'learning', experience: 65, popularity: 5, difficulty: 'Intermediate', desc: 'Typed JS superset.' },
        { id: 'react', name: 'React', category: 'Frontend', logo: '⚛', color: '#61dafb', flameColor: '#61dafb', status: 'mastered', experience: 85, popularity: 5, difficulty: 'Intermediate', desc: 'UI library.' },
        { id: 'nextjs', name: 'Next.js', category: 'Frontend', logo: 'N', color: '#e2e8f0', flameColor: '#94a3b8', status: 'learning', experience: 55, popularity: 5, difficulty: 'Advanced', desc: 'React framework.' },
        { id: 'vuejs', name: 'Vue.js', category: 'Frontend', logo: 'V', color: '#42b883', flameColor: '#42b883', status: 'unlocked', experience: 30, popularity: 4, difficulty: 'Intermediate', desc: 'Progressive framework.' },
        { id: 'angular', name: 'Angular', category: 'Frontend', logo: 'A', color: '#dd0031', flameColor: '#b52e31', status: 'locked', experience: 10, popularity: 4, difficulty: 'Advanced', desc: 'TypeScript framework.' },
        { id: 'tailwind', name: 'Tailwind', category: 'Frontend', logo: '~', color: '#06b6d4', flameColor: '#0ea5e9', status: 'mastered', experience: 82, popularity: 5, difficulty: 'Beginner', desc: 'Utility CSS framework.' },
        { id: 'bootstrap', name: 'Bootstrap', category: 'Frontend', logo: 'B', color: '#a78bfa', flameColor: '#a78bfa', status: 'mastered', experience: 78, popularity: 5, difficulty: 'Beginner', desc: 'Responsive CSS framework.' },
        { id: 'mui', name: 'MUI', category: 'Frontend', logo: 'M', color: '#38bdf8', flameColor: '#38bdf8', status: 'unlocked', experience: 40, popularity: 4, difficulty: 'Intermediate', desc: 'Material-UI components.' },
        { id: 'sass', name: 'SASS', category: 'Frontend', logo: 'S', color: '#f472b6', flameColor: '#c6538c', status: 'unlocked', experience: 45, popularity: 4, difficulty: 'Beginner', desc: 'CSS preprocessor.' },
        { id: 'jquery', name: 'jQuery', category: 'Frontend', logo: '$', color: '#38bdf8', flameColor: '#0769ad', status: 'mastered', experience: 70, popularity: 3, difficulty: 'Beginner', desc: 'DOM manipulation.' },
        { id: 'vite', name: 'Vite', category: 'Frontend', logo: '⚡', color: '#a78bfa', flameColor: '#646cff', status: 'learning', experience: 50, popularity: 4, difficulty: 'Intermediate', desc: 'Frontend tooling.' },
        { id: 'webpack', name: 'Webpack', category: 'Frontend', logo: 'W', color: '#60a5fa', flameColor: '#1c78c0', status: 'unlocked', experience: 35, popularity: 4, difficulty: 'Advanced', desc: 'Module bundler.' }
    ],
    backend: [
        { id: 'python', name: 'Python', category: 'Backend', logo: 'Py', color: '#3776ab', flameColor: '#f9c000', status: 'mastered', experience: 92, popularity: 5, difficulty: 'Beginner', desc: 'High-level language.' },
        { id: 'django', name: 'Django', category: 'Backend', logo: 'Dj', color: '#44b78b', flameColor: '#44b78b', status: 'mastered', experience: 88, popularity: 5, difficulty: 'Intermediate', desc: 'Python web framework.' },
        { id: 'drf', name: 'DRF', category: 'Backend', logo: 'DR', color: '#f87171', flameColor: '#ff6b6b', status: 'mastered', experience: 82, popularity: 4, difficulty: 'Intermediate', desc: 'Django REST toolkit.' },
        { id: 'fastapi', name: 'FastAPI', category: 'Backend', logo: 'Fa', color: '#009688', flameColor: '#009688', status: 'learning', experience: 55, popularity: 4, difficulty: 'Intermediate', desc: 'Async Python API.' },
        { id: 'flask', name: 'Flask', category: 'Backend', logo: 'Fl', color: '#e2e8f0', flameColor: '#94a3b8', status: 'unlocked', experience: 42, popularity: 4, difficulty: 'Beginner', desc: 'Lightweight WSGI.' },
        { id: 'nodejs', name: 'Node.js', category: 'Backend', logo: 'Nd', color: '#68a063', flameColor: '#68a063', status: 'learning', experience: 58, popularity: 5, difficulty: 'Intermediate', desc: 'JS runtime.' },
        { id: 'expressjs', name: 'Express', category: 'Backend', logo: 'Ex', color: '#cbd5e1', flameColor: '#e2e8f0', status: 'learning', experience: 52, popularity: 5, difficulty: 'Intermediate', desc: 'Node.js framework.' },
        { id: 'php', name: 'PHP', category: 'Backend', logo: 'Ph', color: '#8892bf', flameColor: '#8892bf', status: 'unlocked', experience: 30, popularity: 4, difficulty: 'Beginner', desc: 'Scripting language.' },
        { id: 'laravel', name: 'Laravel', category: 'Backend', logo: 'La', color: '#f9322c', flameColor: '#f9322c', status: 'locked', experience: 8, popularity: 4, difficulty: 'Intermediate', desc: 'PHP framework.' },
        { id: 'java', name: 'Java', category: 'Backend', logo: 'Jv', color: '#e76f00', flameColor: '#e76f00', status: 'unlocked', experience: 28, popularity: 5, difficulty: 'Intermediate', desc: 'OOP language.' },
        { id: 'springboot', name: 'Spring Boot', category: 'Backend', logo: 'Sp', color: '#6db33f', flameColor: '#68bd45', status: 'locked', experience: 5, popularity: 4, difficulty: 'Advanced', desc: 'Java framework.' },
        { id: 'graphql', name: 'GraphQL', category: 'Backend', logo: 'Gq', color: '#e10098', flameColor: '#e10098', status: 'learning', experience: 48, popularity: 4, difficulty: 'Advanced', desc: 'Query language.' },
        { id: 'mysql', name: 'MySQL', category: 'Database', logo: 'My', color: '#4479a1', flameColor: '#00758f', status: 'mastered', experience: 80, popularity: 5, difficulty: 'Beginner', desc: 'RDBMS.' },
        { id: 'postgresql', name: 'PostgreSQL', category: 'Database', logo: 'Pg', color: '#6ba3d6', flameColor: '#336791', status: 'mastered', experience: 78, popularity: 5, difficulty: 'Intermediate', desc: 'Advanced RDBMS.' },
        { id: 'sqlite', name: 'SQLite', category: 'Database', logo: 'Sq', color: '#7dd3fc', flameColor: '#0ea5e9', status: 'mastered', experience: 72, popularity: 4, difficulty: 'Beginner', desc: 'Embedded SQL.' },
        { id: 'mongodb', name: 'MongoDB', category: 'Database', logo: 'Mo', color: '#47a248', flameColor: '#4db33d', status: 'learning', experience: 55, popularity: 5, difficulty: 'Intermediate', desc: 'NoSQL document DB.' },
        { id: 'redis', name: 'Redis', category: 'Database', logo: 'Rd', color: '#dc382d', flameColor: '#d32f2f', status: 'unlocked', experience: 38, popularity: 4, difficulty: 'Intermediate', desc: 'In-memory data store.' },
        { id: 'firebase', name: 'Firebase', category: 'Database', logo: 'Fb', color: '#ffca28', flameColor: '#f57c00', status: 'learning', experience: 48, popularity: 4, difficulty: 'Beginner', desc: 'Google platform.' }
    ],
    cloud: [
        { id: 'aws', name: 'AWS', category: 'Cloud', logo: 'Aw', color: '#ff9900', flameColor: '#ff9900', status: 'learning', experience: 52, popularity: 5, difficulty: 'Advanced', desc: 'Cloud platform.' },
        { id: 'ec2', name: 'EC2', category: 'Cloud', logo: 'E2', color: '#ff9900', flameColor: '#ff9900', status: 'learning', experience: 42, popularity: 4, difficulty: 'Advanced', desc: 'Virtual servers.' },
        { id: 's3', name: 'S3', category: 'Cloud', logo: 'S3', color: '#ff9900', flameColor: '#ff9900', status: 'unlocked', experience: 35, popularity: 4, difficulty: 'Intermediate', desc: 'Object storage.' },
        { id: 'lambda', name: 'Lambda', category: 'Cloud', logo: 'λ', color: '#ff9900', flameColor: '#ff9900', status: 'unlocked', experience: 30, popularity: 4, difficulty: 'Advanced', desc: 'Serverless compute.' },
        { id: 'rds', name: 'RDS', category: 'Cloud', logo: 'Rd', color: '#ff9900', flameColor: '#ff9900', status: 'learning', experience: 25, popularity: 3, difficulty: 'Advanced', desc: 'Managed DB.' },
        { id: 'cloudfront', name: 'CloudFront', category: 'Cloud', logo: 'Cf', color: '#ff9900', flameColor: '#ff9900', status: 'locked', experience: 8, popularity: 3, difficulty: 'Advanced', desc: 'CDN service.' },
        { id: 'route53', name: 'Route53', category: 'Cloud', logo: 'R53', color: '#ff9900', flameColor: '#ff9900', status: 'locked', experience: 5, popularity: 3, difficulty: 'Advanced', desc: 'DNS service.' },
        { id: 'docker', name: 'Docker', category: 'Cloud', logo: 'Do', color: '#2496ed', flameColor: '#2496ed', status: 'learning', experience: 55, popularity: 5, difficulty: 'Intermediate', desc: 'Containerization.' },
        { id: 'kubernetes', name: 'Kubernetes', category: 'Cloud', logo: 'K8', color: '#326ce5', flameColor: '#326ce5', status: 'locked', experience: 12, popularity: 4, difficulty: 'Advanced', desc: 'Orchestration.' },
        { id: 'render', name: 'Render', category: 'Cloud', logo: 'Rn', color: '#46e3b7', flameColor: '#46e3b7', status: 'unlocked', experience: 40, popularity: 3, difficulty: 'Intermediate', desc: 'Cloud host.' },
        { id: 'vercel', name: 'Vercel', category: 'Cloud', logo: 'V', color: '#e2e8f0', flameColor: '#94a3b8', status: 'mastered', experience: 72, popularity: 4, difficulty: 'Intermediate', desc: 'Frontend cloud.' },
        { id: 'netlify', name: 'Netlify', category: 'Cloud', logo: 'Nt', color: '#00c7b7', flameColor: '#00c7b7', status: 'unlocked', experience: 45, popularity: 4, difficulty: 'Beginner', desc: 'Web automation.' },
        { id: 'github', name: 'GitHub', category: 'Cloud', logo: 'Gh', color: '#cbd5e1', flameColor: '#f5f5f5', status: 'mastered', experience: 85, popularity: 5, difficulty: 'Beginner', desc: 'Code hosting.' },
        { id: 'git', name: 'Git', category: 'Cloud', logo: 'Gt', color: '#f05032', flameColor: '#f05032', status: 'mastered', experience: 80, popularity: 5, difficulty: 'Beginner', desc: 'Version control.' },
        { id: 'postman', name: 'Postman', category: 'Cloud', logo: 'Pm', color: '#ff6c37', flameColor: '#ff6c37', status: 'mastered', experience: 78, popularity: 4, difficulty: 'Beginner', desc: 'API dev platform.' },
        { id: 'figma', name: 'Figma', category: 'Cloud', logo: 'Fg', color: '#f24e1e', flameColor: '#f24e1e', status: 'unlocked', experience: 42, popularity: 4, difficulty: 'Intermediate', desc: 'Design tool.' },
        { id: 'linux', name: 'Linux', category: 'Cloud', logo: 'Lx', color: '#fcc624', flameColor: '#fcc624', status: 'learning', experience: 58, popularity: 5, difficulty: 'Intermediate', desc: 'OS kernel.' }
    ]
};

function getStatusLabel(s) { return { unlocked: 'Unlocked', learning: 'Learning', mastered: 'Mastered', locked: 'Locked' }[s] || 'Unknown'; }
function getStatusEmoji(s) { return { unlocked: '🔓', learning: '📖', mastered: '🏆', locked: '🔒' }[s] || '❓'; }
function getStars(v) { return '★'.repeat(v) + '☆'.repeat(5 - v); }
function getExpLevel(v) { 
    if (v >= 80) return 'Expert'; 
    if (v >= 60) return 'Advanced'; 
    if (v >= 40) return 'Intermediate'; 
    if (v >= 20) return 'Beginner'; 
    return 'Novice'; 
}

const findTech = (id) => {
    for (const items of Object.values(TECH_DATA)) {
        const f = items.find(t => t.id === id);
        if (f) return f;
    }
    return null;
};

// --- Helper component to spawn particles ---
// Particles are now managed by React state in TechUniverse

function TechCard({ tech, inFleet, toggleFleet, onOpenInfo, onMouseEnter, onMouseLeave, onSpawnParticles }) {
    const cardRef = useRef(null);
    const label = tech.name.length > 6 ? tech.name.slice(0, 5) + '…' : tech.name;

    const handleMouseEnter = () => {
        if (tech.status !== 'locked' && cardRef.current) {
            const engine = cardRef.current.querySelector('.rocket-engine');
            if (engine) {
                const rect = engine.getBoundingClientRect();
                if (onSpawnParticles) onSpawnParticles(rect.left + rect.width / 2, rect.bottom, tech.flameColor || tech.color, 8);
            }
        }
        onMouseEnter?.();
    };

    const handleDoubleClick = (e) => {
        e.stopPropagation();
        if (!cardRef.current || cardRef.current.classList.contains('launching')) return;
        cardRef.current.classList.add('launching');
        const rect = cardRef.current.getBoundingClientRect();
        if (onSpawnParticles) onSpawnParticles(rect.left + rect.width / 2, rect.bottom - 10, tech.flameColor || tech.color, 30);
        let frame = 0;
        const trail = setInterval(() => {
            if (!cardRef.current) { clearInterval(trail); return; }
            const r = cardRef.current.getBoundingClientRect();
            if (r.bottom < 0 || frame > 22) { clearInterval(trail); return; }
            if (onSpawnParticles) onSpawnParticles(r.left + r.width / 2, r.bottom - 6, tech.flameColor || tech.color, 5);
            frame++;
        }, 40);
        setTimeout(() => { 
            if (cardRef.current) cardRef.current.classList.remove('launching');
            clearInterval(trail); 
        }, 1050);
    };

    return (
        <div 
            ref={cardRef}
            className={`tech-card status-${tech.status} ${inFleet ? 'in-fleet' : ''} card-padding-md`}
            data-id={tech.id}
            style={{ '--accent': tech.color, '--flame': tech.flameColor || tech.color }}
            onClick={(e) => {
                if (e.target.closest('.card-check')) return;
                onOpenInfo(tech.id);
            }}
            onDoubleClick={handleDoubleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <button 
                className="card-check" 
                aria-label="Toggle fleet"
                onClick={(e) => {
                    e.stopPropagation();
                    if (tech.status !== 'locked') toggleFleet(tech.id);
                }}
            >
                <i className="fas fa-check"></i>
            </button>
            <div className="card-logo-badge" style={{ color: tech.color }}>{tech.logo}</div>
            <div className="rocket-visual">
                <div className="rocket-stack">
                    <div className="rocket-nose"></div>
                    <div className="rocket-body">
                        <div className="rocket-label">{label}</div>
                        <div className="rocket-stripe"></div>
                    </div>
                    <div className="rocket-fins"><div className="fin left"></div><div className="fin right"></div></div>
                    <div className="rocket-engine"></div>
                    <div className="rocket-flame">
                        <div className="flame-glow"></div>
                        <div className="flame-outer"></div>
                        <div className="flame-core"></div>
                        <div className="flame-sparks"></div>
                    </div>
                </div>
            </div>
            <div className="card-name">{tech.name}</div>
            <div className="card-category">{tech.category}</div>
            {tech.status === 'locked' && <div className="lock-overlay"><i className="fas fa-lock"></i></div>}
        </div>
    );
}

function GalaxyGrid({ techs, title, subtitle, color, direction, fleet, toggleFleet, onOpenInfo, onSpawnParticles }) {
    const trackRef = useRef(null);
    // Duplicate items for seamless infinite marquee
    const items = [...techs, ...techs];
    const isRtl = direction === 'rl';

    return (
        <div className="marquee-wrap" style={{ '--gcolor': color }}>
            <div className="galaxy-heading">
                <span className="dot"></span>
                <h3>{title}</h3>
                <span className="dot"></span>
            </div>
            <div className="galaxy-sub">{subtitle}</div>
            <div 
                ref={trackRef}
                className={isRtl ? 'marquee-track-rl' : 'marquee-track-lr'}
            >
                {items.map((tech, idx) => (
                    <TechCard 
                        key={`${tech.id}-${idx}`}
                        tech={tech}
                        inFleet={fleet.some(f => f.id === tech.id)}
                        toggleFleet={toggleFleet}
                        onOpenInfo={onOpenInfo}
                        onSpawnParticles={onSpawnParticles}
                        onMouseEnter={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'; }}
                        onMouseLeave={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running'; }}
                    />
                ))}
            </div>
        </div>
    );
}

export default function TechUniverse() {
    const [fleet, setFleet] = useState([]);
    const [selectedTechId, setSelectedTechId] = useState(null);
    const [ambientNodes, setAmbientNodes] = useState([]);
    const [particles, setParticles] = useState([]);

    const handleSpawnParticles = useCallback((x, y, color, count = 8) => {
        const newParticles = [];
        const now = Date.now();
        for (let i = 0; i < count; i++) {
            const size = 2 + Math.random() * 5;
            const angle = Math.PI / 2 + (Math.random() - 0.5) * 0.9;
            const speed = 30 + Math.random() * 80;
            const dx1 = Math.cos(angle) * speed;
            const dy1 = Math.sin(angle) * speed + 20;
            newParticles.push({
                id: `p-${now}-${Math.random()}`,
                x: x + (Math.random() - 0.5) * 16,
                y: y,
                size, color, dx1, dy1,
                duration: 0.5 + Math.random() * 0.5
            });
        }
        setParticles(prev => [...prev, ...newParticles]);
        
        setTimeout(() => {
            setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
        }, 1200);
    }, []);

    useEffect(() => {
        // Generate ambient stars
        const nodes = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            size: 1 + Math.random() * 2,
            left: Math.random() * 100,
            top: Math.random() * 100,
            opacity1: 0.05 + Math.random() * 0.08,
            opacity2: 0.1 + Math.random() * 0.15,
            duration: 18 + Math.random() * 12,
        }));
        setAmbientNodes(nodes);
    }, []);

    const toggleFleet = (id) => {
        setFleet(prev => {
            const exists = prev.some(t => t.id === id);
            if (exists) return prev.filter(t => t.id !== id);
            const tech = findTech(id);
            if (tech) return [...prev, tech];
            return prev;
        });
    };

    const handleOpenInfo = (id) => setSelectedTechId(id);
    const handleCloseInfo = () => setSelectedTechId(null);

    const selectedTech = selectedTechId ? findTech(selectedTechId) : null;

    return (
        <section id="tech-universe" className="section-padding tech-universe">
            {/* Ambient background particles */}
            <div className="ambient-stars" aria-hidden="true">
                {ambientNodes.map(node => (
                    <div 
                        key={node.id} 
                        className="ambient-node"
                        style={{
                            left: `${node.left}%`,
                            top: `${node.top}%`,
                            width: `${node.size}px`,
                            height: `${node.size}px`,
                            opacity: node.opacity1,
                            animationDuration: `${node.duration}s`
                        }}
                    />
                ))}
            </div>

            <div className="section-header reveal">
                <h2 className="font-display">Explore Our <span>Tech Fleet</span></h2>
            </div>

            <GalaxyGrid
                techs={TECH_DATA.frontend}
                title="Frontend Universe"
                color="#3b82f6"
                direction="rl"
                fleet={fleet}
                toggleFleet={toggleFleet}
                onOpenInfo={handleOpenInfo}
                onSpawnParticles={handleSpawnParticles}
            />
            <div className="galaxy-rule"></div>
            <GalaxyGrid
                techs={TECH_DATA.backend}
                title="Backend & Database"
                color="#8b5cf6"
                direction="lr"
                fleet={fleet}
                toggleFleet={toggleFleet}
                onOpenInfo={handleOpenInfo}
                onSpawnParticles={handleSpawnParticles}
            />
            <div className="galaxy-rule"></div>
            <GalaxyGrid
                techs={TECH_DATA.cloud}
                title="Cloud & DevOps"
                color="#f59e0b"
                direction="rl"
                fleet={fleet}
                toggleFleet={toggleFleet}
                onOpenInfo={handleOpenInfo}
                onSpawnParticles={handleSpawnParticles}
            />

            {/* INFO PANEL */}
            {selectedTech && (
                <div className="info-panel-overlay active" onClick={handleCloseInfo}>
                    <div className="info-panel" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={handleCloseInfo}><i className="fas fa-times"></i></button>
                        <div className="panel-header">
                            <div className="panel-logo" style={{ color: selectedTech.color }}>{selectedTech.logo}</div>
                            <div>
                                <h3 className="panel-title">{selectedTech.name}</h3>
                                <span className="panel-category">{selectedTech.category}</span>
                            </div>
                        </div>
                        <div className="panel-body">
                            <p className="desc">{selectedTech.desc}</p>
                            <div className="meta-grid">
                                <div className="meta-item"><span className="label">Experience</span><span className="value">{selectedTech.experience}% ({getExpLevel(selectedTech.experience)})</span></div>
                                <div className="meta-item"><span className="label">Status</span><span className="value">{getStatusLabel(selectedTech.status)} {getStatusEmoji(selectedTech.status)}</span></div>
                                <div className="meta-item"><span className="label">Popularity</span><span className="value">{getStars(selectedTech.popularity)}</span></div>
                                <div className="meta-item"><span className="label">Difficulty</span><span className="value">{selectedTech.difficulty}</span></div>
                            </div>
                            <div className="experience-bar">
                                <div className="bar-label"><span>Proficiency</span><span>{selectedTech.experience}%</span></div>
                                <div className="bar-track"><div className="bar-fill" style={{ width: `${selectedTech.experience}%`, background: `linear-gradient(90deg, ${selectedTech.color}, ${selectedTech.flameColor || selectedTech.color})` }}></div></div>
                            </div>
                        </div>
                        <div className="panel-actions">
                            <button className="btn-fleet" onClick={(e) => { e.stopPropagation(); if (selectedTech.status !== 'locked') toggleFleet(selectedTech.id); }}>
                                <i className={`fas ${fleet.some(f => f.id === selectedTech.id) ? 'fa-check' : 'fa-plus'}`}></i>
                                {fleet.some(f => f.id === selectedTech.id) ? 'In Fleet' : 'Add to Fleet'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* PARTICLES CONTAINER */}
            <div id="particlesContainer" className="particles-container">
                {particles.map(p => (
                    <div 
                        key={p.id}
                        className="particle"
                        style={{
                            left: `${p.x}px`,
                            top: `${p.y}px`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            background: p.color,
                            boxShadow: `0 0 12px ${p.color}aa`,
                            '--dx1': `${p.dx1}px`,
                            '--dy1': `${p.dy1}px`,
                            animation: `particle-rise ${p.duration}s ease-out forwards`
                        }}
                    />
                ))}
            </div>
        </section>
    );
}