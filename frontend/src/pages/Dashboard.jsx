import React, { useEffect } from 'react';
import StarfieldBackground from '../components/StarfieldBackground/StarfieldBackground';
import Nav from '../components/Nav/Nav';
import HomeSection from '../components/HomeSection/HomeSection';
import About from '../components/About/About';
import Team from '../components/TeamShowcase/Team';
import Services from '../components/Services/Services';
import Portfolio from '../components/Portfolio/Portfolio';
import TechUniverse from '../components/TechUniverse/TechUniverse';
import Process from '../components/Process/Process';
import Pricing from '../components/Pricing/Pricing';
import Testimonials from '../components/Testimonials/Testimonials';
import WhyUs from '../components/WhyUs/WhyUs';
import FAQ from '../components/FAQ/FAQ';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';

export default function Dashboard() {
  useEffect(() => {
    document.documentElement.classList.add('dashboard-active');
    document.body.classList.add('dashboard-active');

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');
    const revealedNodes = new Set();
    const classObservers = new Map();

    // React owns `className` on these elements. Once a data-driven re-render
    // happens (e.g. testimonials/portfolio data arriving from the API), React
    // reconciles className back to its JSX value and silently strips the
    // 'visible' class we add here. A MutationObserver lets us notice that and
    // re-apply 'visible' immediately, so the reveal survives re-renders.
    const ensureVisible = (el) => {
      if (!el.classList.contains('visible')) {
        el.classList.add('visible');
      }
    };

    const watchForReactOverwrite = (el) => {
      if (classObservers.has(el)) return;
      const mo = new MutationObserver(() => {
        if (revealedNodes.has(el) && !el.classList.contains('visible')) {
          ensureVisible(el);
        }
      });
      mo.observe(el, { attributes: true, attributeFilter: ['class'] });
      classObservers.set(el, mo);
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealedNodes.add(entry.target);
          ensureVisible(entry.target);
          watchForReactOverwrite(entry.target);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach((el) => revealObserver.observe(el));

    return () => {
      document.documentElement.classList.remove('dashboard-active');
      document.body.classList.remove('dashboard-active');
      revealObserver.disconnect();
      classObservers.forEach((mo) => mo.disconnect());
      classObservers.clear();
      revealedNodes.clear();
    };
  }, []);

  return (
    <div id="dashboard-app">
      <StarfieldBackground />
      <div className="particles-container" id="particlesContainer"></div>
      <Nav />
      <HomeSection />
      <About />
      <Team />
      <Services />
      <Portfolio />
      <TechUniverse />
      <Process />
      <Pricing />
      <Testimonials />
      <WhyUs />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}