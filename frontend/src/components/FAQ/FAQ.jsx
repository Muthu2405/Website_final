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
        <section id="faq" className="section-padding bg-[#0b0e17]/30">
            <div className="site-container">
                <div className="section-intro mb-16 reveal">
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider">FAQ</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Frequently Asked Questions</h2>
                    <p className="text-gray-400 mt-4">Everything you need to know before getting started.
                </p>
                </div>
                <div className="bg-dark-card rounded-2xl p-6 sm:p-10 reveal space-y-3">
                    {FAQ_DATA.map((faq, index) => (
                        <div
                            key={index}
                            className={`faq-item rounded-xl border transition-colors ${
                                openIndex === index
                                    ? 'border-primary/40 bg-white/[0.03]'
                                    : 'border-gray-800'
                            }`}
                        >
                            <div
                                className="faq-question flex justify-between items-center gap-6 text-white font-semibold cursor-pointer px-5 py-5 sm:py-6"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="leading-relaxed">{faq.question}</span>
                                <i className={`fas fa-chevron-down text-primary shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}></i>
                            </div>
                            <div className={`faq-answer text-gray-400 leading-relaxed px-5 pb-5 sm:pb-6 ${openIndex !== index ? 'hidden' : ''}`}>
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}