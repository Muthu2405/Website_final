import React from 'react';
import RocketShowcase from './RocketShowcase';
import './TeamShowcase.css';

export default function Team() {
  return (
    <section id="team" className="section-padding bg-[#0b0e17]/30">
      <div className="site-container">
        <div className="section-header reveal" style={{ position: 'relative', zIndex: 5 }}>
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Team</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Meet our developers</h2>
          <p className="text-gray-400 mt-4">Our crew of space-ready engineers, riding in one at a time.</p>
        </div>
        <div
    id="team-react-mount"
    className="relative w-full"
    style={{ position: "relative" }}
  >
          <RocketShowcase />
        </div>
      </div>
    </section>
  );
}