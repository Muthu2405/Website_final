import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';

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

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] || '').concat(parts.length > 1 ? parts[parts.length - 1][0] : '').toUpperCase();
}

function ProfileMenu() {
  const { currentUser, logout } = useData();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  if (!currentUser) {
    return (
      <a href="#contact" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="btn-primary text-sm px-5 py-2">
        <i className="fas fa-paper-plane mr-2"></i> Get Started
      </a>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold border border-white/10 hover:border-primary/50 transition"
        aria-label="Open profile menu"
        aria-expanded={open}
      >
        {getInitials(currentUser.name)}
      </button>
      {open && (
        <div
          className="absolute right-0 overflow-hidden"
          style={{
            marginTop: '12px',
            width: '256px',
            borderRadius: '12px',
            border: '1px solid #1f2937',
            background: '#0f1420',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{ padding: '16px', borderBottom: '1px solid #1f2937' }}>
            <p className="text-white font-semibold truncate">{currentUser.name}</p>
            <p className="text-gray-400 text-sm truncate">{currentUser.email}</p>
          </div>
          <button
            type="button"
            onClick={() => { setOpen(false); navigate('/profile'); }}
            className="w-full text-left text-sm text-gray-300 hover:text-white hover:bg-white/5 transition flex items-center gap-2"
            style={{ padding: '12px 16px' }}
          >
            <i className="fas fa-user text-primary w-4"></i> View Profile
          </button>
          {(currentUser.is_admin || currentUser.is_superuser) && (
            <button
              type="button"
              onClick={() => { setOpen(false); navigate('/admin'); }}
              className="w-full text-left text-sm text-gray-300 hover:text-white hover:bg-white/5 transition flex items-center gap-2"
              style={{ padding: '12px 16px' }}
            >
              <i className="fas fa-shield-halved text-primary w-4"></i> Admin Panel
            </button>
          )}
          <button
            type="button"
            onClick={() => { setOpen(false); logout(); navigate('/'); }}
            className="w-full text-left text-sm text-gray-300 hover:text-white hover:bg-white/5 transition flex items-center gap-2"
            style={{ padding: '12px 16px', borderTop: '1px solid #1f2937' }}
          >
            <i className="fas fa-sign-out-alt text-primary w-4"></i> Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const linkRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const { currentUser, logout } = useData();
  const navigate = useNavigate();

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
      <div className="px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
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
            <ProfileMenu />
          </div>

          <div className="lg:hidden flex items-center gap-4">
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
          {currentUser && (
            <div className="mt-4 pt-4 border-t border-gray-800 flex flex-col gap-1">
              <button
                type="button"
                onClick={() => { closeMobileMenu(); navigate('/profile'); }}
                className="text-left py-2 text-base font-medium text-gray-300 hover:text-white transition-colors"
              >
                <i className="fas fa-user text-primary mr-2"></i> View Profile
              </button>
              {(currentUser.is_admin || currentUser.is_superuser) && (
                <button
                  type="button"
                  onClick={() => { closeMobileMenu(); navigate('/admin'); }}
                  className="text-left py-2 text-base font-medium text-gray-300 hover:text-white transition-colors"
                >
                  <i className="fas fa-shield-halved text-primary mr-2"></i> Admin Panel
                </button>
              )}
              <button
                type="button"
                onClick={() => { closeMobileMenu(); logout(); navigate('/'); }}
                className="text-left py-2 text-base font-medium text-gray-300 hover:text-white transition-colors"
              >
                <i className="fas fa-sign-out-alt text-primary mr-2"></i> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}