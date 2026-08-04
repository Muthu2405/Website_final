import React from 'react';
import './Process.css';

const PROCESS_STAGES = [
    { code: 'M-01', icon: 'fa-satellite-dish', title: 'Recon', subtitle: 'Discover', color: 'blue', desc: 'We start by understanding your goals, challenges, and opportunities.' },
    { code: 'M-02', icon: 'fa-route', title: 'Flight Plan', subtitle: 'Define', color: 'teal', desc: 'We define the scope, objectives, and success criteria together.' },
    { code: 'M-03', icon: 'fa-drafting-compass', title: 'Blueprint', subtitle: 'Design', color: 'green', desc: 'We create thoughtful, user-centered solutions.' },
    { code: 'M-04', icon: 'fa-microchip', title: 'Assembly', subtitle: 'Develop', color: 'gold', desc: 'We build with quality, following best practices and clean standards.' },
    { code: 'M-05', icon: 'fa-gauge-high', title: 'Systems Check', subtitle: 'Test', color: 'orange', desc: 'We test thoroughly to ensure reliability, performance, and security.' },
    { code: 'M-06', icon: 'fa-rocket', title: 'Liftoff', subtitle: 'Deploy', color: 'purple', desc: 'We deploy seamlessly into your environment with confidence.' },
    { code: 'M-07', icon: 'fa-tower-broadcast', title: 'Mission Control', subtitle: 'Support', color: 'indigo', desc: 'We stay with you, providing ongoing support and continuous improvement.' }
];

export default function Process() {
    return (
        <section id="process" className="section-padding process-section">
            <div className="site-container">
                <div className="section-header reveal">
                    <h3 className="font-display process-eyebrow">Mission <span>Trajectory</span></h3>
                    <h2 className="font-display">From Launch <span>to Orbit</span></h2>
                    <p>Seven flight phases on one continuous trajectory — each stage hands off cleanly into the next.</p>
                </div>

                <div className="process-timeline">
                    <div className="process-timeline-line" aria-hidden="true">
                        <div className="process-timeline-pulse"></div>
                    </div>

                    {PROCESS_STAGES.map((stage, i) => (
                        <div
                            key={i}
                            className={`process-stage reveal car-${stage.color}`}
                            style={{ '--stage-delay': `${i * 0.08}s` }}
                        >
                            <div className="process-stage-marker">
                                <span className="process-stage-hex">
                                    <i className={`fas ${stage.icon}`}></i>
                                </span>
                                <span className="process-stage-num">{stage.code}</span>
                            </div>

                            <div className="process-stage-card">
                                <div className="process-stage-copy">
                                    <h4>{stage.title} <span className="process-stage-subtitle">// {stage.subtitle}</span></h4>
                                    <p>{stage.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="process-banner reveal">
                    <span className="process-banner-dot" aria-hidden="true"></span>
                    <i className="fas fa-satellite"></i>
                    <span>Mission Status: <strong>All Systems Nominal.</strong> Seven Phases. One Trajectory.</span>
                </div>
            </div>
        </section>
    );
}
