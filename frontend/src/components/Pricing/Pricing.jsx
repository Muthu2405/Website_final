import React from 'react';
import { useData } from '../../context/DataContext';
import GlowCard from './GlowCard';

const INITIAL_PRICING = [
    {
        name: 'Starter',
        desc: 'A focused, budget-friendly site to get your business online fast.',
        price: '4,999',
        priceNote: 'one-time payment',
        ctaLabel: 'Get Started',
        features: [
            '1–3 pages', 'Responsive design', 'Contact form', 'Basic SEO',
            'Basic animations', 'Deployment included', '7-day support'
        ]
    },
    {
        name: 'Business',
        desc: 'Our most popular plan — a fuller site with an admin panel and basic backend.',
        price: '14,999',
        priceNote: 'one-time payment',
        popular: true,
        ctaLabel: 'Get Started',
        features: [
            'Up to 7 pages', 'Responsive design', 'Contact form', 'Basic SEO',
            'Advanced animations', 'Admin panel', 'Basic backend/API',
            'Database included', 'Deployment included', '30-day support'
        ]
    },
    {
        name: 'Premium',
        desc: 'A full-scale build with advanced backend, SEO, and custom animations.',
        price: '29,999+',
        priceNote: 'starting at, one-time payment',
        ctaLabel: 'Get Started',
        features: [
            '10–15+ pages', 'Responsive design', 'Contact form', 'Advanced SEO',
            'Custom animations', 'Admin panel', 'Advanced backend/API',
            'Database included', 'Deployment included', '60-day support'
        ]
    }
];

export default function Pricing() {
    const { pricing: contextPricing } = useData();
    const displayPricing = contextPricing && contextPricing.length > 0 ? contextPricing : INITIAL_PRICING;

    return (
        <section id="pricing" className="section-padding bg-[#0b0e17]/40">
            <div className="site-container">
                <div className="section-header reveal">
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider">Pricing</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Simple, Transparent Pricing</h2>
                    <p className="text-gray-400 mt-4">Choose a plan that fits your project needs. Custom quotes available.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 lg:gap-10 mt-12 lg:mt-16 card-gap-lg">
                    {displayPricing.map((plan, idx) => {
                        const featuresArray = Array.isArray(plan.features) ? plan.features : (typeof plan.features === 'string' ? plan.features.split(',').map(s => s.trim()).filter(Boolean) : []);
                        const priceDigits = String(plan.price).replace(/^[₹$]/, '');
                        return (
                            <GlowCard
                                key={idx}
                                glowColor={plan.popular ? 'purple' : 'blue'}
                                className={`reveal rounded-[20px] flex flex-col h-full ${plan.popular ? 'popular' : ''}`}
                                style={{ padding: '36px' }}
                            >
                                {plan.popular && <div className="popular-badge">Most Popular</div>}

                                <div className="price-row">
                                    <span className="dollar-sign">₹</span>
                                    <span className="price-value">{priceDigits}</span>
                                </div>
                                <p className="price-note">
                                    {plan.priceNote || 'one-time payment'}
                                    {plan.priceSubNote && <><br />{plan.priceSubNote}</>}
                                </p>

                                <a href="#contact" className="pricing-cta-btn">{plan.ctaLabel || 'Get Started'}</a>

                                <p className="pricing-desc">{plan.desc}</p>

                                <div className="pricing-divider" />

                                <ul className="pricing-feature-list-v2">
                                    {featuresArray.map((feat, fidx) => (
                                        <li key={fidx}><i className="fa-solid fa-circle-check"></i> {feat}</li>
                                    ))}
                                </ul>
                            </GlowCard>
                        );
                    })}
                </div>
                <div className="text-center mt-8 lg:mt-12">
                    <p className="text-gray-400">Need something custom? <a href="#contact" className="text-primary font-semibold">Contact us</a> for a tailored quote.</p>
                </div>
            </div>
        </section>
    );
}
