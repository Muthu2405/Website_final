import React, { useEffect, useState } from 'react';


export default function Intro({ onComplete }) {
    const [phase, setPhase] = useState('start'); // 'start' -> 'logo' -> 'caption' -> 'lift' -> 'done'

    useEffect(() => {
        console.log("Intro mounted, starting sequence");
        const t1 = setTimeout(() => {
            document.body.classList.add('stars-on');
        }, 300);

        const t2 = setTimeout(() => {
            setPhase('logo');
        }, 1600);

        const t3 = setTimeout(() => {
            setPhase('caption');
        }, 4600);

        const t4 = setTimeout(() => {
            setPhase('lift');
            document.body.classList.add('rocket-fly');
        }, 7600);

        const t5 = setTimeout(() => {
            document.body.classList.remove('rocket-fly');
            setPhase('done');
            if (onComplete) onComplete();
        }, 10300);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
            clearTimeout(t5);
            document.body.classList.remove('stars-on', 'rocket-fly');
        };
    }, [onComplete]);

    if (phase === 'done') return null;

    return (
        <>
            {/* phase: logo */}
            <div className={`phase ${phase === 'logo' ? 'visible' : ''}`} id="phase-logo">
                <svg className="bu-mark" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="g1" cx="40%" cy="35%">
                            <stop offset="0%" stopColor="#f6d488"/>
                            <stop offset="100%" stopColor="#c9791f"/>
                        </radialGradient>
                    </defs>
                    <path d="M50 10 C 70 10 88 28 88 50 C 88 60 84 68 78 74" fill="none" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M50 90 C 30 90 12 72 12 50 C 12 40 16 32 22 26" fill="none" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="50" cy="50" r="9" fill="url(#g1)"/>
                    <circle cx="78" cy="74" r="2.4" fill="#f6d488"/>
                    <circle cx="22" cy="26" r="2.4" fill="#f6d488"/>
                </svg>
                <div className="bu-title">BUSINESS UNIVERSE</div>
                <div className="bu-tagline">Build <b>·</b> Grow <b>·</b> Succeed</div>
            </div>

            {/* phase: caption */}
            <div className={`phase ${(phase === 'caption' || phase === 'lift') ? 'visible' : ''} ${phase === 'lift' ? 'lift-away' : ''}`} id="phase-caption">
                <div className="caption-text">Every successful venture<br />was once just a dream<br /><span className="hi">waiting for its world.</span></div>
                <div className="rule"></div>
            </div>

            {/* rocket */}
            <svg id="rocket" viewBox="0 0 60 140" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="30" cy="120" rx="10" ry="26" fill="url(#flame)"/>
                <defs>
                    <linearGradient id="flame" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fff2c9"/>
                        <stop offset="50%" stopColor="#f6b545"/>
                        <stop offset="100%" stopColor="#e2543a" stopOpacity="0"/>
                    </linearGradient>
                </defs>
                <path d="M30 4 C 42 22 46 46 46 70 L46 96 L14 96 L14 70 C14 46 18 22 30 4 Z" fill="#e9ecf2"/>
                <path d="M14 96 L2 118 L14 108 Z" fill="#c9791f"/>
                <path d="M46 96 L58 118 L46 108 Z" fill="#c9791f"/>
                <circle cx="30" cy="46" r="8" fill="#4fa8e0" stroke="#1a2a3a" strokeWidth="2"/>
            </svg>
        </>
    );
}
