"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import TruckSVG from "./TruckSVG";

// Move developers array to INITIAL_DEVELOPERS
const INITIAL_DEVELOPERS = [
  {
    id: 1,
    name: "Muthukumar",
    role: "Full Stack Developer and Cloud Engineer",
    experience: "1+ Years",
    projects: "5+ Projects",
    bio: "Full stack developer and cloud engineer building end-to-end applications spanning data pipelines, APIs, and modern web frontends, with hands-on AWS deployment experience and a growing focus on agentic AI systems.",
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_10cfef659-1778787023536.png",
    photoAlt: "Developer in astronaut suit, dark industrial space station background, dramatic blue rim lighting, deep shadows",
    technologies: ["Python", "Django", "Flask", "FastAPI", "REST API", "AWS", "React", "HTML", "CSS", "JavaScript", "SQL", "PostgreSQL", "Agentic AI"],
    contact: { email: "muthu200524@gmail.com", linkedin: "linkedin.com/in/kmuthukumar-r2405", github: "github.com/Muthu2405", instagram: "", phone: "" },
    rocketColor: "#4a6fa5"
  },
  {
    id: 2,
    name: "Navaneetha Krishnan",
    role: "Developer",
    experience: "X+ Years",
    projects: "X+ Projects",
    bio: "Placeholder bio — add role details, focus areas, and highlights here.",
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_195597aae-1772497150188.png",
    photoAlt: "Developer portrait, dark moody space station corridor, blue LED ambient lighting, atmospheric shadows, cinematic",
    technologies: ["Add", "Tech", "Stack", "Here"],
    contact: { email: "placeholder@example.com", linkedin: "linkedin.com/in/placeholder", github: "github.com/placeholder", instagram: "@placeholder", phone: "" },
    rocketColor: "#6b4fa5"
  },
  {
    id: 3,
    name: "Ramya",
    role: "Developer",
    experience: "X+ Years",
    projects: "X+ Projects",
    bio: "Placeholder bio — add role details, focus areas, and highlights here.",
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1b7bd2969-1779628662236.png",
    photoAlt: "Engineer portrait, dark server room background, cool blue server rack glow, deep cinematic shadows",
    technologies: ["Add", "Tech", "Stack", "Here"],
    contact: { email: "placeholder@example.com", linkedin: "linkedin.com/in/placeholder", github: "github.com/placeholder", instagram: "@placeholder", phone: "" },
    rocketColor: "#2a7a5a"
  }
];
function RocketShowcase() {
  const developers = INITIAL_DEVELOPERS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState("waiting");
  const [posX, setPosX] = useState(130);
  const [transitionStyle, setTransitionStyle] = useState("none");
  const [showModule, setShowModule] = useState(false);
  const [moduleReveal, setModuleReveal] = useState(false);
  const [moduleClose, setModuleClose] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const timers = useRef([]);
  const rafRef = useRef(null);
  const clearAll = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };
  const after = (fn, ms) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  };
  const developer = developers[currentIndex] || developers[0];
  const runSequence = useCallback((index) => {
    clearAll();
    // Ensure index is within bounds of developers array
    const safeIndex = index % developers.length;
    setCurrentIndex(safeIndex);
    setPhase("waiting");
    setTransitionStyle("none");
    setPosX(130);
    setShowModule(false);
    setModuleReveal(false);
    setModuleClose(false);
    setIsHovering(false);
    setIsExpanded(false);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => {
        setPhase("entering");
        setTransitionStyle("left 2s cubic-bezier(0.22, 1, 0.36, 1)");
        setPosX(50);
        after(() => {
          setPhase("hovering");
          setTransitionStyle("none");
          setIsHovering(true);
          setShowModule(true);
        }, 2050);
        after(() => {
          setPhase("revealing");
          setModuleReveal(true);
        }, 2600);
        after(() => {
          setPhase("displaying");
        }, 3800);
        after(() => {
          setPhase("closing");
          setModuleReveal(false);
          setModuleClose(true);
          setIsExpanded(false);
        }, 7050);
        after(() => {
          setPhase("departing");
          setIsHovering(false);
          setShowModule(false);
          setModuleClose(false);
          setTransitionStyle("left 1.8s cubic-bezier(0.55, 0, 1, 0.45)");
          setPosX(-35);
        }, 8400);
        after(() => {
          const next = (safeIndex + 1) % developers.length;
          runSequence(next);
        }, 10600);
      });
    });
  }, [developers.length]);
  useEffect(() => {
    const t = setTimeout(() => runSequence(0), 400);
    return () => {
      clearTimeout(t);
      clearAll();
    };
  }, []);
  return <div className="relative w-full overflow-hidden" style={{ height: "420px" }}>

      {
    /* ── Rocket + Ropes + Card ── all move together as one unit */
  }
      <div
    style={{
      position: "absolute",
      // Vertically: rocket center sits at ~38% from top so card hangs in lower half
      top: "32%",
      left: `${posX}%`,
      transform: "translateX(-50%)",
      transition: transitionStyle,
      willChange: "left",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}
  >
        {
    /* Rocket with hover float, relatively positioned so the compact
       screen overlay below can be pinned exactly over the cockpit window */
  }
        <div
    className={isHovering ? "rocket-hover" : ""}
    style={{ willChange: "transform", position: "relative" }}
  >
          <TruckSVG developer={developer} isHovering={isHovering} phase={phase} />

          {
    /* Info screen embedded in the truck's cargo container panel */
  }
          {showModule && <div
    onClick={() => moduleReveal && setIsExpanded(true)}
    style={{
      position: "absolute",
      left: "153px",
      top: "40px",
      width: "314px",
      height: "144px",
      borderRadius: "4px",
      overflow: "hidden",
      display: "flex",
      padding: "8px 10px",
      gap: "8px",
      textAlign: "left",
      cursor: moduleReveal ? "pointer" : "default",
      background: "radial-gradient(circle at 50% 0%, #0a1a2a 0%, #050d16 100%)",
      border: "1px solid rgba(0,212,255,0.6)",
      boxShadow: "inset 0 0 10px rgba(0,212,255,0.35), 0 0 6px rgba(0,212,255,0.4)",
      animation: moduleReveal ? "screenFadeIn 0.4s ease forwards" : moduleClose ? "screenFadeOut 0.3s ease forwards" : "none",
      opacity: moduleReveal ? 1 : 0
    }}
  >
            {
    /* scanline texture + sweep for a real screen feel */
  }
            <div
    style={{
      position: "absolute",
      inset: 0,
      background: "repeating-linear-gradient(0deg, rgba(0,212,255,0.06) 0px, rgba(0,212,255,0.06) 1px, transparent 1px, transparent 3px)",
      pointerEvents: "none"
    }}
  />
            <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      height: "18px",
      background: "linear-gradient(180deg, rgba(0,212,255,0.4), transparent)",
      animation: "scanLine 3s linear infinite",
      pointerEvents: "none"
    }}
  />

            {
    /* Left: tiny portrait chip */
  }
            <div
    style={{
      position: "relative",
      flexShrink: 0,
      width: "54px",
      height: "100%",
      borderRadius: "3px",
      overflow: "hidden",
      border: "1px solid rgba(0,212,255,0.35)",
      background: "#050d16"
    }}
  >
              <img
    src={developer.photo}
    alt={developer.photoAlt}
    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
  />
            </div>

            {
    /* Right: full details */
  }
            <div style={{ position: "relative", flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{ color: "#00D4FF", fontSize: "13px", fontWeight: 700, letterSpacing: "0.3px", lineHeight: 1.1, textShadow: "0 0 4px rgba(0,212,255,0.8)" }}>{developer.name}</span>
                <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "8px", lineHeight: 1.1 }}>{developer.role}</span>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "3px" }}>
                <span style={{ fontSize: "6.5px", color: "#8B9BB4", fontFamily: "monospace" }}>EXP <span style={{ color: "#fff" }}>{developer.experience}</span></span>
                <span style={{ fontSize: "6.5px", color: "#8B9BB4", fontFamily: "monospace" }}>PROJECTS <span style={{ color: "#fff" }}>{developer.projects}</span></span>
              </div>
              <p style={{ fontSize: "6.5px", color: "#a3b1c5", lineHeight: 1.35, margin: "4px 0 0", fontFamily: "monospace", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {developer.bio}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "3px", marginTop: "4px" }}>
                {developer.technologies.slice(0, 8).map((tech) => <span
    key={tech}
    style={{
      fontSize: "5.5px",
      color: "#00D4FF",
      border: "1px solid rgba(0,212,255,0.35)",
      borderRadius: "2px",
      padding: "1px 3px",
      fontFamily: "monospace",
      whiteSpace: "nowrap"
    }}
  >
                    {tech}
                  </span>)}
              </div>
              <div style={{ marginTop: "auto", fontSize: "5.5px", color: "#8B9BB4", fontFamily: "monospace", paddingTop: "3px" }}>
                {developer.contact.email} &nbsp;|&nbsp; {developer.contact.github}
              </div>
            </div>
          </div>}
        </div>
      </div>

      {
    /* Expanded modal — click screen to open, click backdrop or X to close */
  }
      {isExpanded && <div
    onClick={() => setIsExpanded(false)}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,4,10,0.75)",
      backdropFilter: "blur(4px)",
      animation: "screenFadeIn 0.25s ease forwards"
    }}
  >
        <div
    onClick={(e) => e.stopPropagation()}
    style={{
      position: "relative",
      width: "min(640px, 90vw)",
      maxHeight: "85vh",
      overflowY: "auto",
      display: "flex",
      gap: "20px",
      padding: "24px",
      borderRadius: "10px",
      background: "radial-gradient(circle at 50% 0%, #0a1a2a 0%, #050d16 100%)",
      border: "1px solid rgba(0,212,255,0.6)",
      boxShadow: "0 0 40px rgba(0,212,255,0.3), inset 0 0 20px rgba(0,212,255,0.1)"
    }}
  >
          <button
    onClick={() => setIsExpanded(false)}
    style={{
      position: "absolute",
      top: "10px",
      right: "10px",
      width: "26px",
      height: "26px",
      borderRadius: "50%",
      border: "1px solid rgba(0,212,255,0.5)",
      background: "rgba(0,20,32,0.8)",
      color: "#00D4FF",
      fontSize: "14px",
      lineHeight: 1,
      cursor: "pointer"
    }}
  >
            ✕
          </button>

          <img
    src={developer.photo}
    alt={developer.photoAlt}
    style={{
      width: "180px",
      height: "220px",
      objectFit: "cover",
      borderRadius: "6px",
      border: "1px solid rgba(0,212,255,0.35)",
      flexShrink: 0
    }}
  />

          <div style={{ flex: 1, minWidth: 0, color: "#fff" }}>
            <h3 style={{ margin: 0, fontSize: "26px", fontWeight: 700, color: "#00D4FF", textShadow: "0 0 10px rgba(0,212,255,0.6)" }}>
              {developer.name}
            </h3>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {developer.role}
            </div>

            <div style={{ display: "flex", gap: "20px", marginTop: "12px" }}>
              <div>
                <div style={{ fontSize: "9px", color: "#8B9BB4", fontFamily: "monospace" }}>EXPERIENCE</div>
                <div style={{ fontSize: "13px", fontWeight: 600 }}>{developer.experience}</div>
              </div>
              <div>
                <div style={{ fontSize: "9px", color: "#8B9BB4", fontFamily: "monospace" }}>PROJECTS</div>
                <div style={{ fontSize: "13px", fontWeight: 600 }}>{developer.projects}</div>
              </div>
            </div>

            <div style={{ marginTop: "14px" }}>
              <div style={{ fontSize: "9px", color: "#00D4FF", fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: "4px" }}>ABOUT ME</div>
              <p style={{ margin: 0, fontSize: "12.5px", lineHeight: 1.6, color: "#a3b1c5" }}>{developer.bio}</p>
            </div>

            <div style={{ marginTop: "14px" }}>
              <div style={{ fontSize: "9px", color: "#00D4FF", fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: "6px" }}>TECHNOLOGIES</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {developer.technologies.map((tech) => <span
    key={tech}
    style={{
      fontSize: "11px",
      color: "#00D4FF",
      border: "1px solid rgba(0,212,255,0.35)",
      borderRadius: "4px",
      padding: "3px 8px"
    }}
  >
                    {tech}
                  </span>)}
              </div>
            </div>

            <div style={{ marginTop: "16px", fontSize: "11.5px", color: "#8B9BB4", lineHeight: 1.9 }}>
              <div>{developer.contact.email}</div>
              <div>{developer.contact.linkedin}</div>
              <div>{developer.contact.github}</div>
              <div>{developer.contact.instagram} &nbsp;·&nbsp; {developer.contact.phone}</div>
            </div>
          </div>
        </div>
      </div>}

      {
    /* Developer dots indicator */
  }
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5" style={{ zIndex: 20 }}>
        {developers.map((_, i) => <div
    key={i}
    className="rounded-full transition-all duration-500"
    style={{
      width: i === currentIndex ? "20px" : "8px",
      height: "8px",
      backgroundColor: i === currentIndex ? "var(--primary)" : "rgba(255,255,255,0.2)",
      boxShadow: i === currentIndex ? "0 0 10px var(--primary)" : "none"
    }}
  />)}
      </div>
    </div>;
}
export {
  RocketShowcase as default
};
