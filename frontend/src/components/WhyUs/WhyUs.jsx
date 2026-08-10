import React from 'react';

const WHY_DATA = [
    { icon: '🖌️', title: 'Clean Code', desc: 'Well-structured, maintainable code following best practices.', tags: ['DRY', 'Tested', 'Documented'] },
    { icon: '📱', title: 'Responsive Design', desc: 'Perfect on every device — desktop, tablet, and mobile.', tags: ['Desktop', 'Tablet', 'Mobile'] },
    { icon: '⚡', title: 'Fast Delivery', desc: 'We respect deadlines and deliver on time, every time.', tags: ['On-Time', 'Agile', 'Tracking'] },
    { icon: '💰', title: 'Affordable Pricing', desc: 'Competitive rates without compromising on quality.', tags: ['Transparent', 'Flexible', 'No Hidden'] },
    { icon: '🛟', title: 'Post-launch Support', desc: "We're here to help even after your project goes live.", tags: ['24/7 Support', 'Bug Fixes', 'Enhancements'] },
    { icon: '🔄', title: 'Regular Updates', desc: 'Keep your site secure and up-to-date with our maintenance.', tags: ['Security', 'Performance', 'Content'] },
    { icon: '💬', title: 'Transparent Communication', desc: 'Clear, honest updates throughout the project lifecycle.', tags: ['Standups', 'Reports', 'Slack'] },
    { icon: '🚀', title: 'Modern Technologies', desc: 'We use the latest tools and frameworks for optimal results.', tags: ['React', 'Django', 'Tailwind', 'PostgreSQL'] }
];

export default function WhyUs() {
    // Duplicate data to create continuous scroll effect
    const duplicatedData = [...WHY_DATA, ...WHY_DATA, ...WHY_DATA];

    return (
        <section id="why-us" className="section-padding bg-soft-dark">
            <div className="site-container">
                <div className="section-intro mb-12 reveal">
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider">Why Us</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Why Choose Our Agency</h2>
                    <p className="text-gray-400 mt-4">We deliver quality, reliability, and value with every project.
                </p>
                </div>
                <div className="why-us-marquee">
                    <div className="why-us-track" id="whyUsTrack">
                        {duplicatedData.map((item, index) => (
                            <div key={index} className="why-card-sm">
                                <div className="why-icon card-icon">{item.icon}</div>
                                <div className="why-title card-title">{item.title}</div>
                                <div className="why-desc card-description">{item.desc}</div>
                                <div className="marquee-track">
                                    <div className="marquee-content">
                                        {item.tags.map((t, i) => (
                                            <span key={i}><i className="fas fa-star text-primary"></i> {t}</span>
                                        ))}
                                        {item.tags.map((t, i) => (
                                            <span key={`dup-${i}`}><i className="fas fa-star text-primary"></i> {t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}