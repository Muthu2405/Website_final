import React from 'react';

export default function Footer() {
    return (
        <footer className="text-white pt-16 pb-8">
            <div className="site-container">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="reveal">
                        <span className="text-2xl font-extrabold">Agency<span className="text-primary">.</span></span>
                        <p className="text-gray-400 text-sm mt-3 max-w-xs">Building digital experiences that drive growth and innovation.</p>
                        <div className="flex gap-3 mt-4">
                            <a href="#" onClick={e => e.preventDefault()} className="text-gray-400 hover:text-white transition"><i className="fab fa-linkedin-in"></i></a>
                            <a href="#" onClick={e => e.preventDefault()} className="text-gray-400 hover:text-white transition"><i className="fab fa-github"></i></a>
                            <a href="#" onClick={e => e.preventDefault()} className="text-gray-400 hover:text-white transition"><i className="fab fa-x-twitter"></i></a>
                            <a href="#" onClick={e => e.preventDefault()} className="text-gray-400 hover:text-white transition"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                    <div className="reveal" style={{ transitionDelay: '0.1s' }}>
                        <h5 className="font-bold text-white mb-3">Quick Links</h5>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#home" className="footer-link">Home</a></li>
                            <li><a href="#about" className="footer-link">About</a></li>
                            <li><a href="#team" className="footer-link">Team</a></li>
                            <li><a href="#services" className="footer-link">Services</a></li>
                            <li><a href="#contact" className="footer-link">Contact</a></li>
                        </ul>
                    </div>
                    <div className="reveal" style={{ transitionDelay: '0.2s' }}>
                        <h5 className="font-bold text-white mb-3">Services</h5>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" onClick={e => e.preventDefault()} className="footer-link">Web Development</a></li>
                            <li><a href="#" onClick={e => e.preventDefault()} className="footer-link">Web Applications</a></li>
                            <li><a href="#" onClick={e => e.preventDefault()} className="footer-link">AI Integration</a></li>
                            <li><a href="#" onClick={e => e.preventDefault()} className="footer-link">Backend Development</a></li>
                            <li><a href="#" onClick={e => e.preventDefault()} className="footer-link">Website Redesign</a></li>
                        </ul>
                    </div>
                    <div className="reveal" style={{ transitionDelay: '0.3s' }}>
                        <h5 className="font-bold text-white mb-3">Contact</h5>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><i className="fas fa-envelope mr-2 text-primary"></i> hello@agency.com</li>
                            <li><i className="fas fa-phone mr-2 text-primary"></i> +1 (555) 123-4567</li>
                            <li><i className="fas fa-map-marker-alt mr-2 text-primary"></i> 123 Tech St, New York, NY</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 reveal">
                    <p>&copy; {new Date().getFullYear()} Agency. All rights reserved.</p>
                    <div className="flex gap-4 mt-2 sm:mt-0">
                        <a href="#" onClick={e => e.preventDefault()} className="footer-link">Privacy Policy</a>
                        <a href="#" onClick={e => e.preventDefault()} className="footer-link">Terms & Conditions</a>
                        <a href="#" onClick={e => e.preventDefault()} className="footer-link">Refund Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}