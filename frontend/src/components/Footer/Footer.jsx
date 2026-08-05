import React from 'react';

const footerLinks = [
    {
        label: 'Quick Links',
        links: [
            { title: 'Home', href: '#home' },
            { title: 'About', href: '#about' },
            { title: 'Team', href: '#team' },
            { title: 'Services', href: '#services' },
            { title: 'Contact', href: '#contact' },
        ],
    },
    {
        label: 'Services',
        links: [
            { title: 'Web Development', href: '#' },
            { title: 'Web Applications', href: '#' },
            { title: 'AI Integration', href: '#' },
            { title: 'Backend Development', href: '#' },
            { title: 'Website Redesign', href: '#' },
        ],
    },
    {
        label: 'Company',
        links: [
            { title: 'Portfolio', href: '#portfolio' },
            { title: 'Process', href: '#process' },
            { title: 'Pricing', href: '#pricing' },
            { title: 'Testimonials', href: '#testimonials' },
        ],
    },
    {
        label: 'Social Links',
        links: [
            { title: 'LinkedIn', href: '#', icon: 'fab fa-linkedin-in' },
            { title: 'GitHub', href: '#', icon: 'fab fa-github' },
            { title: 'X', href: '#', icon: 'fab fa-x-twitter' },
            { title: 'YouTube', href: '#', icon: 'fab fa-youtube' },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="relative flex flex-col items-center justify-center border-t border-gray-800 bg-[radial-gradient(35%_128px_at_50%_0%,rgba(255,255,255,0.08),transparent)] pb-12 lg:pb-16 text-white" style={{ paddingTop: '64px' }}>
            <div className="bg-gray-500/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />
            <div className="site-container grid gap-8 xl:grid-cols-3 xl:gap-8">
                <div className="space-y-4 reveal">
                    <span className="text-2xl font-extrabold">Agency<span className="text-primary">.</span></span>
                    <p className="text-gray-400 mt-8 text-sm md:mt-4 max-w-xs">
                        Building digital experiences that drive growth and innovation.
                    </p>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
                    {footerLinks.map((section, index) => (
                        <div key={section.label} className="mb-10 md:mb-0 reveal" style={{ transitionDelay: `${0.1 + index * 0.1}s` }}>
                            <h3 className="text-xs uppercase tracking-wider text-gray-500">{section.label}</h3>
                            <ul className="text-gray-400 mt-4 space-y-2 text-sm">
                                {section.links.map((link) => (
                                    <li key={link.title}>
                                        <a
                                            href={link.href}
                                            onClick={link.href === '#' ? (e) => e.preventDefault() : undefined}
                                            className="hover:text-white inline-flex items-center transition-all duration-300"
                                        >
                                            {link.icon && <i className={`${link.icon} me-2`}></i>}
                                            {link.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="site-container border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 reveal">
                <p>&copy; {new Date().getFullYear()} Agency. All rights reserved.</p>
                <div className="flex gap-4 mt-2 sm:mt-0">
                    <a href="#" onClick={e => e.preventDefault()} className="footer-link">Privacy Policy</a>
                    <a href="#" onClick={e => e.preventDefault()} className="footer-link">Terms & Conditions</a>
                    <a href="#" onClick={e => e.preventDefault()} className="footer-link">Refund Policy</a>
                </div>
            </div>
        </footer>
    );
}