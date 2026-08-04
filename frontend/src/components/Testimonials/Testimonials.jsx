import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { useData } from '../../context/DataContext';

const PLACEHOLDER_TESTIMONIALS = [
    { quote: "Working with this team was a game changer. The site was delivered fast and looks incredible.", name: "Sarah Chen", role: "Founder, Lumen Studio" },
    { quote: "They understood our vision immediately and shipped a product that exceeded expectations.", name: "Marcus Webb", role: "CTO, Northbeam" },
    { quote: "Communication was excellent throughout, and the final result was polished and performant.", name: "Priya Nair", role: "Product Lead, Fintra" },
    { quote: "Our conversion rate jumped noticeably after the redesign. Couldn't be happier with the outcome.", name: "Daniel Ortiz", role: "Marketing Director, Vellum" },
];

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

// Normalize either data shape { text/review, name, role/company, image } into { quote, author, role, avatar }
function normalize(raw) {
    const quote = raw.quote || raw.text || raw.review;
    const author = raw.name || raw.author || 'Anonymous Client';
    const role = raw.role || raw.company || 'Client';
    const safeQuote = quote && quote.trim() ? quote : FALLBACK_TEXT;
    return {
        quote: safeQuote,
        author,
        role,
        avatar: raw.image || raw.avatar || initialsAvatar(author)
    };
}

export default function Testimonials() {
    const { testimonials: contextTestimonials } = useData();
    const source = contextTestimonials && contextTestimonials.length > 0
        ? contextTestimonials
        : PLACEHOLDER_TESTIMONIALS;
    const testimonials = source.map(normalize);

    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [displayedQuote, setDisplayedQuote] = useState(testimonials[0]?.quote || FALLBACK_TEXT);
    const [displayedRole, setDisplayedRole] = useState(testimonials[0]?.role || 'Client');
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleSelect = (index) => {
        if (index === activeIndex || isAnimating) return;
        setIsAnimating(true);

        setTimeout(() => {
            setDisplayedQuote(testimonials[index].quote);
            setDisplayedRole(testimonials[index].role);
            setActiveIndex(index);
            setTimeout(() => setIsAnimating(false), 400);
        }, 200);
    };

    if (testimonials.length === 0) return null;

    return (
        <section id="testimonials" className="section-padding relative overflow-hidden">
            <div className="site-container">
                <div className="section-header reveal">
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">What Clients Say</h2>
                    <p className="text-gray-400 mt-4">Real feedback from teams we've partnered with.</p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-10 py-16">
                {/* Quote Container */}
                <div className="relative px-8">
                    <span className="absolute -left-2 -top-6 text-7xl font-serif text-white/[0.06] select-none pointer-events-none">
                        "
                    </span>

                    <p
                        className={cn(
                            "text-2xl md:text-3xl font-light text-white text-center max-w-lg leading-relaxed transition-all duration-400 ease-out",
                            isAnimating ? "opacity-0 blur-sm scale-[0.98]" : "opacity-100 blur-0 scale-100",
                        )}
                    >
                        {displayedQuote}
                    </p>

                    <span className="absolute -right-2 -bottom-8 text-7xl font-serif text-white/[0.06] select-none pointer-events-none">
                        "
                    </span>
                </div>

                <div className="flex flex-col items-center gap-6 mt-2">
                    {/* Role text */}
                    <p
                        className={cn(
                            "text-xs text-gray-400 tracking-[0.2em] uppercase transition-all duration-500 ease-out",
                            isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
                        )}
                    >
                        {displayedRole}
                    </p>

                    <div className="flex items-center justify-center gap-2 flex-wrap">
                        {testimonials.map((testimonial, index) => {
                            const isActive = activeIndex === index;
                            const isHovered = hoveredIndex === index && !isActive;
                            const showName = isActive || isHovered;

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleSelect(index)}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className={cn(
                                        "relative flex items-center rounded-full cursor-pointer",
                                        "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                                        isActive ? "bg-white shadow-lg" : "bg-transparent hover:bg-white/10",
                                        showName ? "gap-2 pl-2 py-1.5" : "gap-0 p-0.5",
                                    )}
                                    style={showName ? { paddingRight: '16px' } : undefined}
                                >
                                    {/* Avatar with smooth ring animation */}
                                    <div className="relative flex-shrink-0">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.author}
                                            onError={(e) => { e.currentTarget.src = initialsAvatar(testimonial.author); }}
                                            className={cn(
                                                "rounded-full object-cover",
                                                "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                                                isActive ? "w-8 h-8 ring-2 ring-white" : "w-8 h-8 ring-0 hover:scale-105",
                                            )}
                                        />
                                    </div>

                                    <div
                                        className={cn(
                                            "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                                            showName ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0",
                                        )}
                                    >
                                        <div className="overflow-hidden">
                                            <span
                                                className={cn(
                                                    "text-sm font-semibold whitespace-nowrap block",
                                                    "transition-colors duration-300",
                                                    isActive ? "text-gray-900" : "text-gray-200",
                                                )}
                                            >
                                                {testimonial.author}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}