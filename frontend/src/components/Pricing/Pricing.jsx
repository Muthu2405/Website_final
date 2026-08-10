import React from 'react';
import { useData } from '../../context/DataContext';
import GlowCard from './GlowCard';

const INITIAL_PRICING = [
    {
        name: 'Basic',
        desc: 'Free and open-source forever. Get started now.',
        price: '0',
        priceNote: 'Free forever',
        ctaLabel: 'Get started for free',
        features: ['1 website template', '9 blocks and sections', '4 custom animations']
    },
    {
        name: 'Standard',
        desc: 'Lifetime access. Free updates. No recurring fees.',
        price: '499',
        priceNote: 'one-time payment',
        priceSubNote: 'plus local taxes',
        popular: true,
        ctaLabel: 'Get all-access',
        features: ['Up to 15 pages', 'Admin dashboard & analytics', 'Advanced SEO setup', '30-day priority support']
    },
    {
        name: 'Premium',
        desc: 'Lifetime access. Free updates. No recurring fees.',
        price: '2,499',
        priceNote: 'one-time payment',
        priceSubNote: 'plus local taxes',
        ctaLabel: 'Get all-access for your team',
        features: ['All pages, components & sections available for your entire team']
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
                        const priceDigits = String(plan.price).replace(/^\$/, '');
                        return (
                            <GlowCard
                                key={idx}
                                glowColor={plan.popular ? 'purple' : 'blue'}
                                className={`reveal rounded-[20px] flex flex-col h-full ${plan.popular ? 'popular' : ''}`}
                                style={{ padding: '36px' }}
                            >
                                {plan.popular && <div className="popular-badge">Most Popular</div>}

                                <div className="price-row">
                                    <span className="dollar-sign">$</span>
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
