import React, { useState } from 'react';

export default function Contact({
    title = "Contact Us",
    description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
    phone = "+1 (555) 123-4567",
    email = "hello@agency.com",
    web = { label: "agency.com", url: "https://agency.com" },
}) {
    const [status, setStatus] = useState('');

    const handleContact = (e) => {
        e.preventDefault();
        setStatus('Message sent successfully! We will get back to you soon.');
        e.target.reset();
        setTimeout(() => setStatus(''), 5000);
    };

    return (
        <section id="contact" className="section-padding bg-soft-dark">
            <div className="site-container">
                <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
                    <div className="mx-auto flex max-w-sm flex-col justify-between gap-10 reveal-left">
                        <div className="text-center lg:text-left">
                            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
                            <h2 className="mb-2 mt-2 text-3xl sm:text-4xl font-extrabold text-white lg:mb-1">
                                {title}
                            </h2>
                            <p className="text-gray-400 mt-4">{description}</p>
                        </div>
                        <div className="mx-auto w-fit lg:mx-0">
                            <h3 className="mb-6 text-center text-2xl font-semibold text-white lg:text-left">
                                Contact Details
                            </h3>
                            <ul className="space-y-3 text-gray-400">
                                <li>
                                    <span className="font-bold text-white">Phone: </span>
                                    {phone}
                                </li>
                                <li>
                                    <span className="font-bold text-white">Email: </span>
                                    <a href={`mailto:${email}`} className="underline hover:text-primary transition">
                                        {email}
                                    </a>
                                </li>
                                <li>
                                    <span className="font-bold text-white">Web: </span>
                                    <a href={web.url} target="_blank" rel="noreferrer" className="underline hover:text-primary transition">
                                        {web.label}
                                    </a>
                                </li>
                            </ul>
                            <div className="flex gap-4 mt-6">
                                <a href="#" onClick={e => e.preventDefault()} className="bg-dark-card p-3 rounded-full border border-gray-800 text-gray-400 hover:text-white hover:border-primary/50 transition"><i className="fab fa-linkedin-in text-lg"></i></a>
                                <a href="#" onClick={e => e.preventDefault()} className="bg-dark-card p-3 rounded-full border border-gray-800 text-gray-400 hover:text-white hover:border-primary/50 transition"><i className="fab fa-github text-lg"></i></a>
                                <a href="#" onClick={e => e.preventDefault()} className="bg-dark-card p-3 rounded-full border border-gray-800 text-gray-400 hover:text-white hover:border-primary/50 transition"><i className="fab fa-x-twitter text-lg"></i></a>
                                <a href="#" onClick={e => e.preventDefault()} className="bg-dark-card p-3 rounded-full border border-gray-800 text-gray-400 hover:text-white hover:border-primary/50 transition"><i className="fab fa-youtube text-lg"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-2xl border border-gray-800 bg-dark-card reveal-right" style={{ padding: '32px' }}>
                        <form id="contactForm" className="space-y-3" onSubmit={handleContact}>
                            <div className="flex gap-3">
                                <div className="contact-field w-full">
                                    <label htmlFor="firstname" className="block text-xs font-medium text-gray-300 mb-1">First Name</label>
                                    <input type="text" id="firstname" className="input-field" placeholder="First Name" required />
                                </div>
                                <div className="contact-field w-full">
                                    <label htmlFor="lastname" className="block text-xs font-medium text-gray-300 mb-1">Last Name</label>
                                    <input type="text" id="lastname" className="input-field" placeholder="Last Name" required />
                                </div>
                            </div>
                            <div className="contact-field">
                                <label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-1">Email</label>
                                <input type="email" id="email" className="input-field" placeholder="your@email.com" required />
                            </div>
                            <div className="contact-field">
                                <label htmlFor="subject" className="block text-xs font-medium text-gray-300 mb-1">Subject</label>
                                <input type="text" id="subject" className="input-field" placeholder="Project idea, question, etc." required />
                            </div>
                            <div className="contact-field">
                                <label htmlFor="message" className="block text-xs font-medium text-gray-300 mb-1">Message</label>
                                <textarea id="message" className="input-field" placeholder="Tell us about your project..." rows="3" required></textarea>
                            </div>
                            <button type="submit" className="btn-primary w-full text-sm py-2.5"><i className="fas fa-paper-plane mr-2"></i> Send Message</button>
                            <p id="formStatus" className="text-sm text-green-400 mt-2 text-center">{status}</p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}