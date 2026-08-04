import React, { useState } from 'react';
import Intro from './Intro';
import PlanetChooser from './PlanetChooser';
import './Onboarding.css';

import RegistrationPortal from './RegistrationPortal';
import LoginPortal from './LoginPortal';
import Dashboard from '../Dashboard';

export default function Onboarding() {
    const [showIntro, setShowIntro] = useState(true);
    const [activePlanet, setActivePlanet] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const handleSelectPlanet = (planet) => {
        setActivePlanet(planet);
    };

    const handleRegistrationComplete = (user) => {
        setActivePlanet(null);
        setShowSuccess(true);
    };

    const handleLoginComplete = (user) => {
        setShowLogin(false);
    };

    return (
        <div id="app">
            <div id="sky"></div>
            <div id="stars-layer"></div>

            {showIntro ? (
                <>
                    <Intro onComplete={() => setShowIntro(false)} />
                    <button id="skip-intro" onClick={() => setShowIntro(false)}>Skip intro</button>
                </>
            ) : (
                <>
                    {!activePlanet && !showSuccess && !showLogin && (
                        <>
                            <PlanetChooser onSelectPlanet={handleSelectPlanet} />
                            <button id="show-login" className="btn-secondary" onClick={() => setShowLogin(true)} style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 50, width: 'auto', padding: '8px 18px' }}>Log In</button>
                        </>
                    )}
                    
                    {activePlanet && !showLogin && (
                        <RegistrationPortal 
                            planet={activePlanet} 
                            onBack={() => setActivePlanet(null)} 
                            onComplete={handleRegistrationComplete} 
                            onSwitchToLogin={() => { setActivePlanet(null); setShowLogin(true); }}
                        />
                    )}

                    {showLogin && (
                        <LoginPortal
                            onBack={() => setShowLogin(false)}
                            onSwitchToSignup={() => setShowLogin(false)}
                            onComplete={handleLoginComplete}
                        />
                    )}

                    {showSuccess && (
                        <div className="overlay-view show" id="success-view" style={{ zIndex: 100 }}>
                            <div className="overlay-bg"></div>
                            <div className="success-view" style={{ position: 'relative', zIndex: 2 }}>
                                <div className="icon-badge ok">✅</div>
                                <h2>Welcome! 🎉</h2>
                                <p>Your account has been created successfully.</p>
                                <button className="btn-primary" onClick={() => { setShowSuccess(false); setShowLogin(true); }} style={{ maxWidth: '240px' }}>Go to Login</button>
                            </div>
                        </div>
                    )}

                </>
            )}
            
            {/* toast */}
            <div className="toast" id="toast"></div>
        </div>
    );
}
