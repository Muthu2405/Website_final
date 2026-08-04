import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';

const INITIAL_PROJECTS = [
    { title: 'E-Commerce Platform', desc: 'Full-featured online store with payment gateway and inventory management.', longDesc: 'A comprehensive e-commerce solution built for scale, featuring a secure checkout flow, integrated payment gateway, real-time inventory tracking, and an admin panel for managing products, orders, and customers. Built with performance and SEO in mind so the store loads fast and ranks well.', tags: ['Django', 'React', 'PostgreSQL'], img: 'https://placehold.co/600x400/1e293b/ffffff?text=Project+1' },
    { title: 'AI Chatbot Dashboard', desc: 'Admin dashboard for managing AI-powered customer support chatbots.', longDesc: 'An admin dashboard that lets support teams configure, monitor, and fine-tune AI-powered chatbots. Includes conversation analytics, intent management, live handoff to human agents, and OpenAI-based response generation with guardrails for brand-safe replies.', tags: ['React', 'Django REST', 'OpenAI'], img: 'https://placehold.co/600x400/0f172a/ffffff?text=Project+2' },
    { title: 'Task Management App', desc: 'Collaborative task management with real-time updates and team workspaces.', longDesc: 'A Trello-style collaborative workspace with drag-and-drop boards, real-time updates via WebSockets, team permissions, and activity history — built to help distributed teams stay aligned without constant status meetings.', tags: ['Django', 'React', 'WebSockets'], img: 'https://placehold.co/600x400/1e293b/ffffff?text=Project+3' },
    { title: 'Booking & Scheduling App', desc: 'Real-time appointment booking system with calendar sync and reminders.', longDesc: 'A real-time booking system with two-way calendar sync, automated SMS/email reminders, buffer-time rules, and a customer-facing widget that can be embedded on any website to reduce no-shows and manual scheduling back-and-forth.', tags: ['Node.js', 'React', 'MongoDB'], img: 'https://placehold.co/600x400/0f172a/ffffff?text=Project+4' },
    { title: 'Analytics Dashboard', desc: 'Interactive data visualization dashboard for business intelligence.', longDesc: 'A business intelligence dashboard that pulls data from multiple sources into one interactive view — with drill-down charts, custom date ranges, and exportable reports built with D3.js on top of a Django REST backend.', tags: ['Django', 'D3.js', 'PostgreSQL'], img: 'https://placehold.co/600x400/1e293b/ffffff?text=Project+5' },
    { title: 'Learning Management System', desc: 'Course platform with video lessons, quizzes, and progress tracking.', longDesc: 'A full LMS platform supporting video lessons stored on AWS S3, auto-graded quizzes, per-student progress tracking, and certificates on completion — designed to be white-labeled for different course creators.', tags: ['React', 'Django REST', 'AWS S3'], img: 'https://placehold.co/600x400/0f172a/ffffff?text=Project+6' }
];

const DURATION = 900;
const EASE = 'cubic-bezier(.45,.05,.55,.95)';

function ProjectFace({ project }) {
    const [imgError, setImgError] = useState(false);

    // Reset the broken-image flag whenever the project (and therefore the
    // image src) changes, since this component instance is reused across
    // rotations instead of being remounted.
    useEffect(() => {
        setImgError(false);
    }, [project && project.img]);

    if (!project) return null;
    const title = project.title || project.name;
    const tagsArray = Array.isArray(project.tags) ? project.tags : (typeof project.tech === 'string' ? project.tech.split(',').map(s => s.trim()).filter(Boolean) : []);
    const hasImage = !!project.img;
    
    return (
        <>
            {hasImage && (
                <img 
                    src={project.img} 
                    alt={title} 
                    style={{ display: imgError ? 'none' : 'block' }}
                    onError={() => setImgError(true)}
                    onLoad={() => setImgError(false)}
                />
            )}
            {(!hasImage || imgError) && (
                <div className="img-fallback">
                    <i className="fas fa-image"></i>
                </div>
            )}
            <div className="flip-body card-content card-padding-lg">
                <h4 className="card-title">{title}</h4>
                <p className="card-description">{project.desc}</p>
                <div className="flip-tags card-tags">
                    {tagsArray.map((t, idx) => (
                        <span key={idx} className="tech-tag">{t}</span>
                    ))}
                </div>
                <div className="flip-links card-footer">
                    <a href="#" onClick={(e) => e.preventDefault()}><i className="fab fa-github mr-1"></i> Code</a>
                    <a href="#" onClick={(e) => e.preventDefault()}><i className="fas fa-external-link-alt mr-1"></i> Demo</a>
                </div>
            </div>
        </>
    );
}

function Slot({ initialIndex, dir, projects, staggerDelay, onClick }) {
    // Number of slots rendered side-by-side (Portfolio always mounts 3).
    // Stepping by that count (instead of a hardcoded 3) keeps each slot
    // cycling through a distinct subset of projects regardless of how
    // many projects are actually loaded, and avoids indexing past the
    // end of a short custom project list.
    const slotCount = 3;
    const step = Math.min(slotCount, Math.max(1, projects.length));

    const [activeIndex, setActiveIndex] = useState(initialIndex % projects.length);
    const [incomingIndex, setIncomingIndex] = useState((initialIndex + step) % projects.length);
    const [phase, setPhase] = useState('idle');

    // If the underlying project list changes length (e.g. loaded from
    // storage after first render), keep indices in range.
    useEffect(() => {
        setActiveIndex(prev => prev % projects.length);
        setIncomingIndex(prev => prev % projects.length);
    }, [projects.length]);

    useEffect(() => {
        // Don't bother animating if there's nothing to rotate to.
        if (projects.length <= 1) return undefined;

        let interval;
        let innerTimeout;

        const outerTimer = setTimeout(() => {
            interval = setInterval(() => {
                setPhase('animating');

                innerTimeout = setTimeout(() => {
                    setPhase('idle');
                    setActiveIndex(prev => (prev + step) % projects.length);
                    setIncomingIndex(prev => (prev + step) % projects.length);
                }, DURATION + 30);
            }, 3600);
        }, staggerDelay);

        return () => {
            clearTimeout(outerTimer);
            clearInterval(interval);
            clearTimeout(innerTimeout);
        };
    }, [staggerDelay, projects.length, step]);
    
    const activeTransform = phase === 'idle' 
        ? 'translateY(0%)' 
        : (dir === 'a' ? 'translateY(100%)' : 'translateY(-100%)');
        
    const incomingTransform = phase === 'idle'
        ? (dir === 'a' ? 'translateY(-100%)' : 'translateY(100%)')
        : 'translateY(0%)';
        
    const transition = phase === 'idle' ? 'none' : `transform ${DURATION}ms ${EASE}`;

    return (
        <div className="flip-slot" data-slot={initialIndex} data-dir={dir}>
            <div className="slide-viewport" onClick={() => onClick(projects[activeIndex])}>
                <div 
                    className="slide-face slide-current" 
                    style={{ transform: activeTransform, transition }}
                >
                    <ProjectFace project={projects[activeIndex]} />
                </div>
                <div 
                    className="slide-face slide-incoming" 
                    style={{ transform: incomingTransform, transition }}
                >
                    <ProjectFace project={projects[incomingIndex]} />
                </div>
            </div>
        </div>
    );
}

export default function Portfolio() {
    const { projects: contextProjects } = useData();
    const projects = contextProjects && contextProjects.length > 0 ? contextProjects : INITIAL_PROJECTS;
    
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section id="portfolio" className="section-padding bg-[#0b0e17]/30">
            <div className="site-container">
                <div className="section-header reveal">
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider"><i className="fas fa-briefcase mr-1"></i> Our Work</span>
                    <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-2">Featured <span>Projects</span></h2>
                    <p className="text-gray-400 mt-4">A showcase of our best work across different industries and technologies.</p>
                </div>
                <div className="flip-board reveal card-gap-xl" id="projectsFlipBoard">
                    <Slot initialIndex={0} dir="a" projects={projects} staggerDelay={0} onClick={setSelectedProject} />
                    <Slot initialIndex={1} dir="b" projects={projects} staggerDelay={220} onClick={setSelectedProject} />
                    <Slot initialIndex={2} dir="a" projects={projects} staggerDelay={440} onClick={setSelectedProject} />
                </div>
                <p className="text-center text-gray-500 text-xs mt-5">
                    <i className="fas fa-mouse-pointer mr-1"></i> Auto-rotating showcase · click a panel to view details
                </p>
            </div>

            {/* PROJECT DETAIL MODAL */}
            {selectedProject && (() => {
                const title = selectedProject.title || selectedProject.name;
                const tagsArray = Array.isArray(selectedProject.tags) ? selectedProject.tags : (typeof selectedProject.tech === 'string' ? selectedProject.tech.split(',').map(s => s.trim()).filter(Boolean) : []);
                return (
                <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
                    <div className="modal-content project-modal-content relative card-padding-lg" onClick={(e) => e.stopPropagation()}>
                        <span className="close-modal" onClick={() => setSelectedProject(null)}>&times;</span>
                        <img src={selectedProject.img} alt={title} />
                        <h3 className="card-title">{title}</h3>
                        <p className="card-description">{selectedProject.longDesc || selectedProject.desc}</p>
                        <div className="flip-tags card-tags">
                            {tagsArray.map((t, idx) => (
                                <span key={idx} className="tech-tag">{t}</span>
                            ))}
                        </div>
                        <div className="flip-links card-footer">
                            <a href="#" onClick={(e) => e.preventDefault()}><i className="fab fa-github mr-1"></i> View Code</a>
                            <a href="#" onClick={(e) => e.preventDefault()}><i className="fas fa-external-link-alt mr-1"></i> Live Demo</a>
                        </div>
                    </div>
                </div>
                );
            })()}
        </section>
    );
}