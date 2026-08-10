"use client";
import React, { useEffect, useState, useRef } from "react";
import ParticleShield from "./ParticleShield";
import AstronautPortrait from "./AstronautPortrait";
import TechChip from "./TechChip";
import ContactIcon from "./ContactIcon";
function DeveloperModule({ developer, isRevealing, isClosing, phase }) {
  const [showContent, setShowContent] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showBio, setShowBio] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [visorOpen, setVisorOpen] = useState(false);
  const [ledActive, setLedActive] = useState(false);
  const [particlesVisible, setParticlesVisible] = useState(true);
  const timersRef = useRef([]);
  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };
  const addTimer = (fn, delay) => {
    const t = setTimeout(fn, delay);
    timersRef.current.push(t);
  };
  useEffect(() => {
    if (isRevealing && !isClosing) {
      clearAllTimers();
      setParticlesVisible(true);
      setShowContent(false);
      setShowName(false);
      setShowRole(false);
      setShowStats(false);
      setShowBio(false);
      setShowChips(false);
      setShowContact(false);
      setVisorOpen(false);
      setLedActive(false);
      addTimer(() => setLedActive(true), 200);
      addTimer(() => setParticlesVisible(false), 600);
      addTimer(() => setShowContent(true), 900);
      addTimer(() => setVisorOpen(true), 1100);
      addTimer(() => setShowName(true), 1400);
      addTimer(() => setShowRole(true), 1700);
      addTimer(() => setShowStats(true), 2e3);
      addTimer(() => setShowBio(true), 2300);
      addTimer(() => setShowChips(true), 2600);
      addTimer(() => setShowContact(true), 3200);
    }
    if (isClosing) {
      clearAllTimers();
      addTimer(() => setShowContact(false), 0);
      addTimer(() => setShowChips(false), 200);
      addTimer(() => setShowBio(false), 400);
      addTimer(() => setShowStats(false), 600);
      addTimer(() => setShowRole(false), 700);
      addTimer(() => setShowName(false), 800);
      addTimer(() => setVisorOpen(false), 900);
      addTimer(() => setShowContent(false), 1100);
      addTimer(() => setParticlesVisible(true), 1e3);
      addTimer(() => setLedActive(false), 1300);
    }
    return () => clearAllTimers();
  }, [isRevealing, isClosing]);
  return <div
    className="relative"
    style={{
      width: "520px",
      height: "280px"
    }}
  >
      {
    /* Outer frame */
  }
      <div
    className="absolute inset-0 rounded-lg overflow-hidden"
    style={{
      background: "radial-gradient(ellipse at 50% 0%, rgba(0,80,140,0.18) 0%, transparent 60%), linear-gradient(135deg, #0a1220 0%, #080e1a 50%, #0a1220 100%)",
      border: "2px solid #1e3a5f",
      boxShadow: ledActive ? "0 0 30px rgba(0,212,255,0.4), 0 0 60px rgba(0,212,255,0.15), inset 0 0 30px rgba(0,212,255,0.05)" : "0 4px 20px rgba(0,0,0,0.8)",
      transition: "box-shadow 0.5s ease"
    }}
  >
        {
    /* Inner bevel layer — 1px cyan hairline + top/bottom inset shadow to fake a milled edge. */
  }
        <div
    className="absolute inset-0 rounded-lg pointer-events-none"
    style={{
      border: "1px solid rgba(0,212,255,0.18)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.5), inset 1px 0 0 rgba(255,255,255,0.03), inset -1px 0 0 rgba(0,0,0,0.35)"
    }}
  />
        {
    /* LED edge strip top — soft outer glow + a 1px solid core line for a continuous tube read */
  }
        <div
    className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
    style={{
      background: ledActive ? "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.3) 15%, #00D4FF 50%, rgba(0,212,255,0.3) 85%, transparent 100%)" : "transparent",
      boxShadow: ledActive ? "0 0 12px rgba(0,212,255,0.9), 0 0 24px rgba(0,212,255,0.4), inset 0 -1px 0 rgba(0,212,255,0.5)" : "none",
      transition: "all 0.5s ease"
    }}
  />
        {
    /* LED edge strip bottom — mirrored */
  }
        <div
    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-lg"
    style={{
      background: ledActive ? "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.3) 15%, #00D4FF 50%, rgba(0,212,255,0.3) 85%, transparent 100%)" : "transparent",
      boxShadow: ledActive ? "0 0 12px rgba(0,212,255,0.9), 0 0 24px rgba(0,212,255,0.4), inset 0 1px 0 rgba(0,212,255,0.5)" : "none",
      transition: "all 0.5s ease"
    }}
  />

        {
    /* Corner bolts — layered for a milled, recessed look. */
  }
        {[
    { top: 6, left: 6 },
    { top: 6, right: 6 },
    { bottom: 6, left: 6 },
    { bottom: 6, right: 6 }
  ].map((pos, i) => <React.Fragment key={i}>
            {
    /* Outer recess (darker ring that the bolt sits in) */
  }
            <div
    className="absolute w-3.5 h-3.5 rounded-full"
    style={{
      ...pos,
      background: "radial-gradient(circle, #1a2535 0%, #080e1a 100%)",
      boxShadow: "inset 0 0 2px rgba(0,0,0,0.8), 0 1px 1px rgba(0,0,0,0.5)"
    }}
  />
            {
    /* Bolt head (offset 1.5px inside the recess) */
  }
            <div
    className="absolute w-2.5 h-2.5 rounded-full"
    style={{
      top: pos.top !== void 0 ? pos.top + 2 : void 0,
      bottom: pos.bottom !== void 0 ? pos.bottom + 2 : void 0,
      left: pos.left !== void 0 ? pos.left + 2 : void 0,
      right: pos.right !== void 0 ? pos.right + 2 : void 0,
      background: "radial-gradient(circle at 35% 30%, #a8b8cc 0%, #5a6a7d 45%, #2a3545 100%)",
      border: "0.5px solid #4a5568"
    }}
  />
            {
    /* Specular highlight on the bolt head */
  }
            <div
    className="absolute w-1 h-1 rounded-full"
    style={{
      top: pos.top !== void 0 ? pos.top + 2.5 : void 0,
      bottom: pos.bottom !== void 0 ? pos.bottom + 2.5 : void 0,
      left: pos.left !== void 0 ? pos.left + 2.8 : void 0,
      right: pos.right !== void 0 ? pos.right + 2.8 : void 0,
      background: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 70%)"
    }}
  />
          </React.Fragment>)}

        {
    /* Hazard stripe top bar — hairlined top/bottom + slightly higher contrast */
  }
        <div
    className="absolute top-0 left-10 right-10 h-3 overflow-hidden rounded-sm"
    style={{ marginTop: "4px" }}
  >
          <div
    style={{
      height: "100%",
      background: "repeating-linear-gradient(45deg, #ffaa00 0px, #ffaa00 4px, #1a2535 4px, #1a2535 8px)",
      opacity: 0.6,
      boxShadow: "inset 0 1px 0 rgba(255,200,100,0.4), inset 0 -1px 0 rgba(0,0,0,0.5)"
    }}
  />
        </div>

        {
    /* WARNING label */
  }
        <div
    className="absolute top-1 right-12 flex items-center gap-1"
    style={{ zIndex: 5 }}
  >
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#ffaa00", animation: ledActive ? "ledPulse 1s ease-in-out infinite" : void 0 }} />
          <span style={{ fontSize: "7px", color: "#ffaa00", fontFamily: "monospace", letterSpacing: "0.1em" }}>ACTIVE</span>
        </div>

        {
    /* Ventilation grills (left side) */
  }
        <div className="absolute left-1 top-8 bottom-8 w-2 flex flex-col gap-1 justify-center">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="w-full h-px" style={{ backgroundColor: "rgba(139,155,180,0.3)" }} />)}
        </div>
        <div className="absolute right-1 top-8 bottom-8 w-2 flex flex-col gap-1 justify-center">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="w-full h-px" style={{ backgroundColor: "rgba(139,155,180,0.3)" }} />)}
        </div>

        {
    /* Main content area */
  }
        <div className="absolute inset-0 flex" style={{ padding: "14px 18px 14px 20px" }}>
          {
    /* Left: Portrait */
  }
          <div className="flex-shrink-0" style={{ width: "160px" }}>
            <AstronautPortrait
    developer={developer}
    visorOpen={visorOpen}
    showContent={showContent}
  />
          </div>

          {
    /* Divider */
  }
          <div
    className="flex-shrink-0 mx-3"
    style={{
      width: "1px",
      background: "linear-gradient(180deg, transparent, #1e3a5f, #00D4FF, #1e3a5f, transparent)",
      opacity: ledActive ? 1 : 0.3,
      transition: "opacity 0.5s ease"
    }}
  />

          {
    /* Right: Info — wrapped in a thin glass panel for depth */
  }
          <div
    className="flex-1 flex flex-col justify-between overflow-hidden"
    style={{
      padding: "2px 6px",
      borderLeft: "1px solid rgba(0,212,255,0.08)",
      background: "linear-gradient(180deg, rgba(8,14,26,0.5) 0%, rgba(8,14,26,0.15) 40%, transparent 100%)",
      borderRadius: "2px"
    }}
  >
            {
    /* Name */
  }
            <div>
              <div
    style={{
      opacity: showName ? 1 : 0,
      transform: showName ? "translateY(0)" : "translateY(10px)",
      transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
    }}
  >
                <h2
    className="font-bold leading-none"
    style={{
      fontSize: "28px",
      color: "#ffffff",
      textShadow: "0 0 20px rgba(0,212,255,0.5)",
      letterSpacing: "-0.02em"
    }}
  >
                  {developer.name}
                </h2>
              </div>

              {
    /* Role */
  }
              <div
    style={{
      opacity: showRole ? 1 : 0,
      transform: showRole ? "translateX(0)" : "translateX(-10px)",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      marginTop: "2px"
    }}
  >
                <span
    style={{
      fontSize: "11px",
      color: "#00D4FF",
      fontFamily: "monospace",
      letterSpacing: "0.15em",
      textTransform: "uppercase"
    }}
  >
                  ◈ {developer.role}
                </span>
              </div>

              {
    /* Stats */
  }
              <div
    className="mt-2 pb-1.5"
    style={{
      opacity: showStats ? 1 : 0,
      transform: showStats ? "translateY(0)" : "translateY(8px)",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      borderBottom: "1px solid rgba(0,212,255,0.12)"
    }}
  >
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 flex items-center justify-center" style={{ color: "#8B9BB4" }}>
                      <svg viewBox="0 0 12 12" fill="none" width="12" height="12">
                        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M6 3v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span style={{ fontSize: "10px", color: "#8B9BB4", fontFamily: "monospace" }}>EXPERIENCE</span>
                    <span style={{ fontSize: "11px", color: "#ffffff", fontFamily: "monospace", fontWeight: 600 }}>{developer.experience}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 flex items-center justify-center" style={{ color: "#8B9BB4" }}>
                      <svg viewBox="0 0 12 12" fill="none" width="12" height="12">
                        <rect x="1" y="3" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M4 3V2a2 2 0 014 0v1" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <span style={{ fontSize: "10px", color: "#8B9BB4", fontFamily: "monospace" }}>PROJECTS</span>
                    <span style={{ fontSize: "11px", color: "#ffffff", fontFamily: "monospace", fontWeight: 600 }}>{developer.projects}</span>
                  </div>
                </div>
              </div>
            </div>

            {
    /* Technologies label */
  }
            <div>
              <div
    style={{
      opacity: showChips ? 1 : 0,
      transition: "opacity 0.3s ease",
      marginBottom: "4px"
    }}
  >
                <span style={{ fontSize: "8px", color: "#00D4FF", fontFamily: "monospace", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  TECHNOLOGIES
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {developer.technologies.map((tech, i) => <TechChip key={tech} tech={tech} index={i} visible={showChips} />)}
              </div>
            </div>

            {
    /* Bio */
  }
            <div
    style={{
      opacity: showBio ? 1 : 0,
      transform: showBio ? "translateY(0)" : "translateY(6px)",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
    }}
  >
              <div style={{ marginBottom: "3px" }}>
                <span style={{ fontSize: "8px", color: "#00D4FF", fontFamily: "monospace", letterSpacing: "0.15em" }}>ABOUT ME</span>
              </div>
              <p style={{ fontSize: "10.5px", color: "#a3b1c5", lineHeight: "1.55", fontFamily: "monospace", margin: 0 }}>
                {developer.bio}
              </p>
            </div>

            {
    /* Contact */
  }
            <div
    className="flex items-center gap-2"
    style={{
      opacity: showContact ? 1 : 0,
      transform: showContact ? "translateY(0)" : "translateY(6px)",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
    }}
  >
              <span style={{ fontSize: "8px", color: "#00D4FF", fontFamily: "monospace", letterSpacing: "0.1em" }}>CONNECT</span>
              <div className="flex gap-2">
                <ContactIcon type="email" value={developer.contact.email} delay={0} visible={showContact} />
                <ContactIcon type="linkedin" value={developer.contact.linkedin} delay={100} visible={showContact} />
                <ContactIcon type="github" value={developer.contact.github} delay={200} visible={showContact} />
                <ContactIcon type="instagram" value={developer.contact.instagram} delay={300} visible={showContact} />
                <ContactIcon type="phone" value={developer.contact.phone} delay={400} visible={showContact} />
              </div>
            </div>
          </div>
        </div>

        {
    /* Scan line effect — slower (4s) and slightly brighter */
  }
        <div
    className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
    style={{ zIndex: 20 }}
  >
          <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "2px",
      background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.55), transparent)",
      boxShadow: "0 0 6px rgba(0,212,255,0.6)",
      animation: ledActive ? "scanLine 4s linear infinite" : void 0
    }}
  />
        </div>

        {
    /* Particle shield overlay */
  }
        <ParticleShield visible={particlesVisible} />
      </div>
    </div>;
}
export {
  DeveloperModule as default
};
