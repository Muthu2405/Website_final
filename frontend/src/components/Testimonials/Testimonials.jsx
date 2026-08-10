import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';

const PLACEHOLDER_TESTIMONIALS = [
    {
        text: "Working with this team was a game changer. The site was delivered fast and looks incredible.",
        highlight: "game changer",
        name: "Sarah Chen",
        role: "Founder, Lumen Studio"
    },
    {
        text: "They understood our vision immediately and shipped a product that exceeded expectations.",
        highlight: "exceeded expectations",
        name: "Marcus Webb",
        role: "CTO, Northbeam"
    },
    {
        text: "Communication was excellent throughout, and the final result was polished and performant.",
        highlight: "polished and performant",
        name: "Priya Nair",
        role: "Product Lead, Fintra"
    },
    {
        text: "Our conversion rate jumped noticeably after the redesign. Couldn't be happier with the outcome.",
        highlight: "conversion rate jumped",
        name: "Daniel Ortiz",
        role: "Marketing Director, Vellum"
    },
    {
        text: "From kickoff to launch, everything felt effortless. Genuinely the smoothest project we've run.",
        highlight: "smoothest project",
        name: "Elena Vasquez",
        role: "Head of Growth, Northline"
    },
    {
        text: "The attention to detail was obvious in every screen. Our users noticed the difference immediately.",
        highlight: "attention to detail",
        name: "James Okafor",
        role: "Founder, Driftworks"
    },
    {
        text: "Support was there whenever we needed it, and the team clearly cared about getting things right.",
        highlight: "cared about getting things right",
        name: "Renee Adeyemi",
        role: "COO, Fieldstone"
    },
    {
        text: "The new build is faster, cleaner, and noticeably easier for our customers to navigate.",
        highlight: "faster, cleaner",
        name: "Tomas Novak",
        role: "Head of Product, Vantree"
    },
    {
        text: "Every milestone shipped on time, and the quality never slipped as the scope grew.",
        highlight: "quality never slipped",
        name: "Ingrid Solberg",
        role: "VP Engineering, Halcyon"
    }
];

// Deterministic color per name so the same person always gets the same avatar color
const AVATAR_COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#f97316', '#ec4899', '#22c55e'];

function colorForName(name = '') {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function initialsFor(name = '') {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '?';
    return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
}

// Inline SVG data URI — never breaks, no network request, always matches the person's name
function initialsAvatar(name) {
    const bg = colorForName(name);
    const initials = initialsFor(name);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
        <rect width="100" height="100" rx="50" fill="${bg}"/>
        <text x="50" y="50" dy=".35em" text-anchor="middle" font-family="Inter, sans-serif" font-size="38" font-weight="600" fill="#fff">${initials}</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const FALLBACK_TEXT = "A great experience working with this team from start to finish.";

function TestimonialCard({ text, review, highlight, image, name, role, company }) {
    // Legacy onboarding seed data stores { review, company } instead of
    // { text, role } — support both shapes so every card renders real content.
    const rawText = text || review;
    const safeName = name || 'Anonymous Client';
    const safeRole = role || company || 'Client';
    const safeText = rawText && rawText.trim() ? rawText : FALLBACK_TEXT;
    const avatarSrc = image || initialsAvatar(safeName);

    return (
        <motion.li
            whileHover={{
                scale: 1.03,
                y: -8,
                transition: { type: 'spring', stiffness: 400, damping: 17 }
            }}
            whileFocus={{
                scale: 1.03,
                y: -8,
                transition: { type: 'spring', stiffness: 400, damping: 17 }
            }}
            tabIndex={0}
            className="p-8 rounded-3xl border border-gray-800 shadow-lg shadow-black/20 max-w-xs w-full bg-white/5 backdrop-blur-sm transition-colors duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
            <blockquote className="m-0 p-0">
                <p className="text-gray-300 leading-relaxed font-normal m-0">
                    {highlight && safeText.includes(highlight)
                        ? safeText.split(highlight).map((part, idx, arr) => (
                            <React.Fragment key={idx}>
                                {part}
                                {idx !== arr.length - 1 && (
                                    <span className="text-primary font-semibold">{highlight}</span>
                                )}
                            </React.Fragment>
                        ))
                        : safeText}
                </p>
                <footer className="flex items-center gap-3 mt-6">
                    <img
                        width={40}
                        height={40}
                        src={avatarSrc}
                        alt={safeName}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.src = initialsAvatar(safeName); }}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-800 group-hover:ring-primary/40 transition-all duration-300 ease-in-out"
                    />
                    <div className="flex flex-col">
                        <cite className="font-semibold not-italic tracking-tight leading-5 text-white">
                            {safeName}
                        </cite>
                        <span className="text-sm leading-5 tracking-tight text-gray-500 mt-0.5">
                            {safeRole}
                        </span>
                    </div>
                </footer>
            </blockquote>
        </motion.li>
    );
}

function TestimonialsColumn({ testimonials, className, duration = 15 }) {
    return (
        <div className={className}>
            <motion.ul
                animate={{ translateY: '-50%' }}
                transition={{
                    duration,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatType: 'loop',
                }}
                className="flex flex-col gap-6 pb-6 list-none m-0 p-0"
            >
                {[0, 1].map((rep) => (
                    <React.Fragment key={rep}>
                        {testimonials.map((t, i) => (
                            <TestimonialCard key={`${rep}-${i}`} {...t} />
                        ))}
                    </React.Fragment>
                ))}
            </motion.ul>
        </div>
    );
}

export default function Testimonials() {
    const { testimonials: contextTestimonials } = useData();
    const testimonials = contextTestimonials && contextTestimonials.length > 0
        ? contextTestimonials
        : PLACEHOLDER_TESTIMONIALS;

    // Split into up to 3 columns, filling each as evenly as possible
    // and cycling through the source list if there aren't enough items.
    const perColumn = Math.max(3, Math.ceil(testimonials.length / 3));
    const extended = testimonials.length >= perColumn * 3
        ? testimonials
        : Array.from({ length: perColumn * 3 }, (_, i) => testimonials[i % testimonials.length]);

    const firstColumn = extended.slice(0, perColumn);
    const secondColumn = extended.slice(perColumn, perColumn * 2);
    const thirdColumn = extended.slice(perColumn * 2, perColumn * 3);

    return (
        <section id="testimonials" className="section-padding relative overflow-hidden">
            <div className="site-container">
                <div className="section-header reveal">
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">What Clients Say</h2>
                    <p className="text-gray-400 mt-4">Real feedback from teams we've partnered with.</p>
                </div>
            </div>

            <div
                className="flex justify-center gap-6 mt-12 lg:mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
                role="region"
                aria-label="Scrolling Testimonials"
            >
                <TestimonialsColumn testimonials={firstColumn} duration={15} />
                <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
                <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
            </div>
        </section>
    );
}
