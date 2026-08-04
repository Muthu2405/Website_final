import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#team', label: 'Team' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#tech-universe', label: 'Tech Universe' },
  { href: '#process', label: 'Process' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const linkRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    LINKS.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Measure the active link so the glow indicator can glide beneath it
  useEffect(() => {
    const el = linkRefs.current[activeSection];
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    } else {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

  const closeMobileMenu = () => setMobileOpen(false);

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    closeMobileMenu();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      // Update the URL hash without jumping
      window.history.pushState(null, '', targetId);
    }
  };

  return (
    <nav className="nav-blur fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="flex items-center gap-2" aria-label="Agency Home">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <i className="fas fa-rocket text-white text-sm"></i>
            </div>
            <span className="text-xl font-bold font-display tracking-wide text-white">
              Agency<span className="text-primary">.</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            <div className="relative flex items-center gap-8 text-sm font-medium text-gray-300 bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-full px-6 py-2.5 border border-white/10 shadow-lg">
              {/* Animated glow indicator behind the active link */}
              <motion.div
                className="absolute h-8 rounded-full bg-gradient-to-r from-blue-500/40 to-purple-500/40 blur-md -z-10"
                animate={{
                  left: indicator.left,
                  width: indicator.width,
                  opacity: indicator.opacity,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  ref={(el) => (linkRefs.current[link.href] = el)}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={`relative px-1 py-1 hover:text-white transition-colors duration-200 whitespace-nowrap ${activeSection === link.href ? 'text-white' : ''}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="btn-primary text-sm px-5 py-2">
              <i className="fas fa-paper-plane mr-2"></i> Get Started
            </a>
          </div>

          <div className="lg:hidden flex items-center">
            <button 
              className="text-gray-300 hover:text-white transition-colors" 
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <i className={`text-2xl ${mobileOpen ? "fas fa-times" : "fas fa-bars"}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobileMenu"
          className={`lg:hidden ${mobileOpen ? 'flex' : 'hidden'} flex-col py-6 border-t border-gray-800 animate-slide-down bg-black/20 backdrop-blur-xl rounded-b-2xl`}
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className={`block py-3 text-base font-medium text-gray-300 hover:text-white transition-colors ${activeSection === link.href ? 'text-primary' : ''}`}
            >
              {link.label}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={(e) => handleScroll(e, '#contact')}
            className="btn-primary text-center mt-4"
          >
            <i className="fas fa-paper-plane mr-2"></i> Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
