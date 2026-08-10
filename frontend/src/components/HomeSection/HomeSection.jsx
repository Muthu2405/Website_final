import React, { useState, useEffect, useRef } from 'react';
import './HomeSection.css';

const slides = [
  {
    icon: '🌊',
    title: 'Deep Ocean Tech',
    desc: 'Cutting-edge marine technology solutions for exploration, surveillance, and sustainable ocean operations.',
    tags: ['Cybernautic', 'Marine Tech', 'Deep Ocean']
  }, 
  {
    icon: '🦈',
    title: 'Predator Class',
    desc: 'High-performance autonomous underwater vehicles (AUVs) designed for extreme depth and precision missions.',
    tags: ['AUV', 'Autonomous', 'Deep Sea']
  }, 
  {
    icon: '🔬',
    title: 'Marine Innovation',
    desc: 'Advanced sensor systems, AI-driven analytics, and next-gen communication for underwater ecosystems.',
    tags: ['Sensors', 'AI Analytics', 'Comms']
  }
];

export default function HomeSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [imgError, setImgError] = useState(false);
  
  const flipTimerRef = useRef(null);
  const slideTimerRef = useRef(null);
  
  const currentData = slides[currentSlide];

  const nextSlideAction = () => {
    setIsFlipped(prevFlipped => {
      if (!prevFlipped) {
        return true;
      } else {
        slideTimerRef.current = setTimeout(() => {
          setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 300);
        return false;
      }
    });
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    flipTimerRef.current = setInterval(nextSlideAction, 3000);
  };

  const stopAutoPlay = () => {
    if (flipTimerRef.current) {
      clearInterval(flipTimerRef.current);
      flipTimerRef.current = null;
    }
    if (slideTimerRef.current) {
      clearTimeout(slideTimerRef.current);
      slideTimerRef.current = null;
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const handleDotClick = (index) => {
    if (index === currentSlide && isFlipped) {
      setIsFlipped(false);
      stopAutoPlay();
      startAutoPlay();
      return;
    }
    
    if (isFlipped) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsFlipped(true);
      }, 400);
    } else {
      setCurrentSlide(index);
      setIsFlipped(true);
    }
    stopAutoPlay();
    startAutoPlay();
  };

  const handleWrapperClick = (e) => {
    if (e.target.closest('.flip-card-indicators')) return;
    
    setIsFlipped(prev => !prev);
    stopAutoPlay();
    startAutoPlay();
  };

  return (
    <section id="home" className="hero-space pt-16">
      <div className="site-container hero-content py-20">
        <div className="hero-grid">
          <div className="hero-text reveal-left">
            <span className="hero-badge">
              <i className="fas fa-rocket mr-2"></i> Launch Your Digital Presence
            </span>
            <h1 className="hero-title">
              We Build <span className="text-primary">Amazing</span> Digital Experiences
            </h1>
            <p className="hero-description">
              Full-stack development solution delivering modern, scalable, and high-performance web solutions tailored to your business.
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn-primary"><i className="fas fa-paper-plane mr-2"></i> Get a Quote</a>
              <a href="#portfolio" className="btn-outline"><i className="fas fa-eye mr-2"></i> View Work</a>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">30+</span>
                <span className="stat-label">Happy Clients</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4.9</span>
                <span className="stat-label">Avg. Rating</span>
              </div>
            </div>
          </div>
          {/* ── FLIPPING CARD CAROUSEL ── */}
          <div className="hero-card reveal-right">
            <div className="flip-card-container" id="flipCardContainer">
              <div 
                className={`flip-card-wrapper ${isFlipped ? 'flipped' : ''}`}
                onClick={handleWrapperClick}
              >
                {/* Front: Image */}
                <div className="flip-card-front">
                  <img 
                    src="Gemini_Generated_Image_urrussurrussurru.png" 
                    alt="CYBERNAUTIC Marine Tech" 
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                    onLoad={() => setImgError(false)}
                    style={{ display: imgError ? 'none' : 'block' }}
                  />
                  <div className="brand-overlay" style={{ display: imgError ? 'flex' : 'none' }}>
                    <h2>CYBERNAUTIC</h2>
                    <div className="sub">MARINE TECH</div>
                    <div className="est">DEEP OCEAN · EST.2026</div>
                    <div className="predator">PREDATOR</div>
                  </div>
                  {/* fallback if image fails */}
                  <div className="brand-overlay" id="fallbackBrand" style={{ display: 'none' }}>
                    <h2>CYBERNAUTIC</h2>
                    <div className="sub">MARINE TECH</div>
                    <div className="est">DEEP OCEAN · EST.2026</div>
                    <div className="predator">PREDATOR</div>
                  </div>
                </div>
                {/* Back: Content */}
                <div className="flip-card-back" id="flipCardBack">
                  <div className="back-icon">{currentData.icon}</div>
                  <h3>{currentData.title}</h3>
                  <p>{currentData.desc}</p>
                  <div className="back-tags">
                    {currentData.tags.map((tag, i) => (
                      <span key={i}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Indicators */}
              <div className="flip-card-indicators" id="flipIndicators">
                {slides.map((_, i) => (
                  <span 
                    key={i}
                    className={`dot ${i === currentSlide ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDotClick(i);
                    }}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}