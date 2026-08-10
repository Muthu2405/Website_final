import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../../context/DataContext';

const INITIAL_SERVICES = [
    {
        icon: 'fa-globe',
        title: 'Website Development',
        desc: 'Custom websites built with modern frameworks — responsive, fast, and SEO-friendly.',
        tags: ['React', 'Django', 'Tailwind'],
        price: '$499',
        time: '7-14 days'
    }, {
        icon: 'fa-layer-group',
        title: 'Web Application Development',
        desc: 'Complex, data-driven web apps with robust backends and intuitive interfaces.',
        tags: ['React', 'Django REST', 'PostgreSQL'],
        price: '$999',
        time: '14-28 days'
    }, {
        icon: 'fa-database',
        title: 'Backend Development',
        desc: 'Scalable, secure, and performant server-side logic with REST APIs and microservices.',
        tags: ['Django', 'Node.js', 'PostgreSQL'],
        price: '$799',
        time: '10-20 days'
    }, {
        icon: 'fa-paint-brush',
        title: 'Frontend Development',
        desc: 'Pixel-perfect, interactive UIs built with React and modern CSS frameworks.',
        tags: ['React', 'Tailwind', 'Framer'],
        price: '$399',
        time: '5-10 days'
    }, {
        icon: 'fa-robot',
        title: 'AI Integration',
        desc: 'Leverage AI/ML capabilities — chatbots, recommendation systems, and automation.',
        tags: ['OpenAI', 'Python', 'Django'],
        price: '$1,299',
        time: '14-30 days'
    }, {
        icon: 'fa-sync-alt',
        title: 'Website Redesign',
        desc: 'Modernize your existing website with fresh design, better UX, and improved performance.',
        tags: ['UI/UX', 'React', 'SEO'],
        price: '$599',
        time: '7-14 days'
    }
];

export default function Services() {
    const { services } = useData();
    const displayServices = services && services.length > 0 ? services : INITIAL_SERVICES;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const trackRef = useRef(null);
    const totalCards = displayServices.length;

    useEffect(() => {
        if (isHovered) return;
        
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % totalCards);
        }, 3000);
        
        return () => clearInterval(interval);
    }, [isHovered, totalCards]);

    useEffect(() => {
        if (trackRef.current) {
            const cardWidth = trackRef.current.children[0]?.offsetWidth || 300;
            const gap = 24;
            const offset = -(currentIndex * (cardWidth + gap));
            trackRef.current.style.transform = `translateX(${offset}px)`;
        }
    }, [currentIndex]);

    const handleResize = () => {
        if (trackRef.current) {
            const cardWidth = trackRef.current.children[0]?.offsetWidth || 300;
            const gap = 24;
            const offset = -(currentIndex * (cardWidth + gap));
            trackRef.current.style.transform = `translateX(${offset}px)`;
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [currentIndex]);

    return (
        <section id="services" className="section-padding bg-soft-dark">
            <div className="site-container">
                <div className="section-intro mb-12 reveal">
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider">What We Do</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Our Services</h2>
                    <p className="text-gray-400 mt-4">End-to-end development services tailored to your unique needs.
                </p>
                </div>
                <div 
                    className="services-carousel-container" 
                    id="servicesCarousel"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div 
                        className="services-carousel-track flex transition-transform duration-500 ease-out card-gap-md" 
                        id="servicesTrack" 
                        ref={trackRef}
                    >
                        {displayServices.map((service, index) => {
                            const title = service.title || service.name;
                            const tagsArray = Array.isArray(service.tags) ? service.tags : (typeof service.tech === 'string' ? service.tech.split(',').map(s => s.trim()).filter(Boolean) : []);
                            return (
                                <div key={index} className={`service-card shrink-0 card-padding-md ${index === currentIndex ? 'active' : ''}`}>
                                    <div className="service-icon card-icon"><i className={`fas ${service.icon || 'fa-cog'}`}></i></div>
                                    <h4 className="card-title">{title}</h4>
                                    <p className="card-description">{service.desc}</p>
                                    <div className="card-tags">
                                        {tagsArray.map((t, idx) => (
                                            <span key={idx} className="tech-tag">{t}</span>
                                        ))}
                                    </div>
                                    <div className="card-footer">
                                        <span className="text-gray-400">{service.time || ''}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="services-dots" id="servicesDots">
                    {displayServices.map((_, index) => (
                        <span 
                            key={index} 
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        ></span>
                    ))}
                </div>
            </div>
        </section>
    );
}