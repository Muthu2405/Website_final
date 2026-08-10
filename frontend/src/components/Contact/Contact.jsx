import React, { useState } from 'react';

export default function Contact() {
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
                <div className="section-intro mb-16 reveal">
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Let's Work Together</h2>
                    <p className="text-gray-400 mt-4">Have a project in mind? Reach out and let's make something great.
                </p>
                </div>
                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    <div className="reveal-left">
                        <form id="contactForm" className="space-y-4" onSubmit={handleContact}>
                            <div className="contact-field">
                                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                                <input type="text" className="input-field" placeholder="Your name" required />
                            </div>
                            <div className="contact-field">
                                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                <input type="email" className="input-field" placeholder="your@email.com" required />
                            </div>
                            <div className="contact-field">
                                <label className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                                <input type="text" className="input-field" placeholder="Project idea, question, etc." required />
                            </div>
                            <div className="contact-field">
                                <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                                <textarea className="input-field" placeholder="Tell us about your project..." rows="5" required></textarea>
                            </div>
                            <button type="submit" className="btn-primary w-full"><i className="fas fa-paper-plane mr-2"></i> Send Message</button>
                            <p id="formStatus" className="text-sm text-green-400 mt-2 text-center">{status}</p>
                        </form>
                    </div>
                    <div className="space-y-6 reveal-right">
                        <div className="bg-dark-card contact-info-card rounded-2xl p-6">
                            <h4 className="font-bold text-white text-lg"><i className="fas fa-envelope text-primary mr-2"></i> Email</h4>
                            <p className="text-gray-400">hello@agency.com</p>
                        </div>
                        <div className="bg-dark-card contact-info-card rounded-2xl p-6">
                            <h4 className="font-bold text-white text-lg"><i className="fas fa-phone text-primary mr-2"></i> Phone / WhatsApp</h4>
                            <p className="text-gray-400">+1 (555) 123-4567</p>
                        </div>
                        <div className="bg-dark-card contact-info-card rounded-2xl p-6">
                            <h4 className="font-bold text-white text-lg"><i className="fas fa-clock text-primary mr-2"></i> Working Hours</h4>
                            <p className="text-gray-400">Mon - Fri: 9:00 AM - 6:00 PM (EST)</p>
                        </div>
                        <div className="flex gap-4">
                            <a href="#" onClick={e => e.preventDefault()} className="bg-dark-card p-3 rounded-full border border-gray-800 text-gray-400 hover:text-white hover:border-primary/50 transition"><i className="fab fa-linkedin-in text-lg"></i></a>
                            <a href="#" onClick={e => e.preventDefault()} className="bg-dark-card p-3 rounded-full border border-gray-800 text-gray-400 hover:text-white hover:border-primary/50 transition"><i className="fab fa-github text-lg"></i></a>
                            <a href="#" onClick={e => e.preventDefault()} className="bg-dark-card p-3 rounded-full border border-gray-800 text-gray-400 hover:text-white hover:border-primary/50 transition"><i className="fab fa-x-twitter text-lg"></i></a>
                            <a href="#" onClick={e => e.preventDefault()} className="bg-dark-card p-3 rounded-full border border-gray-800 text-gray-400 hover:text-white hover:border-primary/50 transition"><i className="fab fa-youtube text-lg"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}