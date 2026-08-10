import React, { useState } from 'react';

const FAQ_DATA = [
    {
        question: "How long does development take?",
        answer: "Timeline depends on project complexity. A basic website takes 7-14 days, while complex web applications can take 4-8 weeks. We'll provide a detailed timeline during discovery."
    },
    {
        question: "Do you provide hosting?",
        answer: "Yes, we can help you set up hosting on platforms like Render, Vercel, or AWS. We also offer ongoing maintenance and hosting management services."
    },
    {
        question: "Do you maintain websites?",
        answer: "Absolutely. We offer maintenance packages that include regular updates, security patches, performance monitoring, and content updates."
    },
    {
        question: "Can you redesign an existing website?",
        answer: "Yes! We specialize in website redesigns — modernizing design, improving UX, optimizing performance, and migrating to modern frameworks."
    },
    {
        question: "What technologies do you use?",
        answer: "We primarily use Django, React, PostgreSQL, Tailwind CSS, and deploy on Render/Vercel. We're flexible and can adapt to your tech stack preferences."
    },
    {
        question: "Do you sign NDAs?",
        answer: "Yes, we're happy to sign NDAs to protect your ideas and sensitive information. Your privacy and trust are our top priorities."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept bank transfers, PayPal, and major credit cards. Payment terms are typically 50% upfront and 50% upon completion."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="section-padding bg-[radial-gradient(60%_260px_at_50%_0%,rgba(59,130,246,0.12),transparent)]">
            <div className="site-container">
                <div className="section-intro mb-16 reveal">
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider">FAQ</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Frequently Asked Questions</h2>
                    <p className="text-gray-400 mt-4">Everything you need to know before getting started.</p>
                </div>
                <div className="flex flex-col gap-6 reveal" style={{ maxWidth: '640px', width: '100%', margin: '0 auto' }}>
                    {FAQ_DATA.map((faq, index) => (
                        <div
                            key={index}
                            className={`rounded-lg border transition-colors overflow-hidden ${
                                openIndex === index
                                    ? 'border-primary/40 bg-white/[0.04]'
                                    : 'border-gray-800 bg-dark-card'
                            }`}
                        >
                            <button
                                type="button"
                                className="w-full flex items-center justify-between gap-6 text-left"
                                style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '8px', paddingBottom: '8px' }}
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="text-lg font-medium text-white">{faq.question}</span>
                                <svg
                                    width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    className={`shrink-0 text-primary ${openIndex === index ? "rotate-180" : ""} transition-transform duration-300 ease-in-out`}
                                >
                                    <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <div
                                className={`grid transition-all duration-300 ease-in-out ${
                                    openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                }`}
                            >
                                <div className="overflow-hidden">
                                    <p className="text-base text-gray-400 leading-relaxed pb-6" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}