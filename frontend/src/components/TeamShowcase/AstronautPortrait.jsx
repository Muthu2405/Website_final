"use client";
import { useState, useEffect, useRef } from "react";
import AppImage from "@/components/ui/AppImage";
function AstronautPortrait({ developer, visorOpen, showContent }) {
  const [visorProgress, setVisorProgress] = useState(0);
  const animRef = useRef(0);
  const startTimeRef = useRef(null);
  const directionRef = useRef("open");
  useEffect(() => {
    if (visorOpen) {
      directionRef.current = "open";
    } else {
      directionRef.current = "close";
    }
    startTimeRef.current = null;
    const animate = (timestamp) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const duration = 600;
      const progress = Math.min(1, elapsed / duration);
      const eased = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      if (directionRef.current === "open") {
        setVisorProgress(eased);
      } else {
        setVisorProgress(1 - eased);
      }
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [visorOpen]);
  return <div
    className="relative w-full h-full flex items-center justify-center"
    style={{
      opacity: showContent ? 1 : 0,
      transition: "opacity 0.5s ease"
    }}
  >
      {
    /* Astronaut suit background */
  }
      <div
    className="relative rounded-lg overflow-hidden"
    style={{
      width: "148px",
      height: "240px",
      background: "linear-gradient(180deg, #1a2535 0%, #0d1825 50%, #080e18 100%)",
      border: "1px solid #1e3a5f",
      boxShadow: "0 0 20px rgba(0,212,255,0.15)"
    }}
  >
        {
    /* Developer photo */
  }
        <div
    className="absolute inset-0"
    style={{
      clipPath: `inset(0 0 ${(1 - visorProgress) * 100}% 0)`,
      transition: void 0
    }}
  >
          <AppImage
    src={developer.photo}
    alt={developer.photoAlt}
    fill
    className="object-cover object-top"
    sizes="148px"
    style={{ filter: "contrast(1.1) brightness(0.9)" }}
  />
          {
    /* Blue tint overlay */
  }
          <div
    className="absolute inset-0"
    style={{
      background: "linear-gradient(180deg, rgba(0,80,150,0.3) 0%, rgba(0,30,80,0.5) 100%)"
    }}
  />
        </div>

        {
    /* Helmet overlay (top portion based on visor progress) */
  }
        <div
    className="absolute top-0 left-0 right-0"
    style={{
      height: `${(1 - visorProgress) * 100}%`,
      background: "linear-gradient(180deg, #1a2535 0%, #0d1825 60%, rgba(10,20,40,0.9) 100%)",
      borderBottom: visorProgress > 0 && visorProgress < 1 ? "1px solid #00D4FF" : "none",
      boxShadow: visorProgress > 0 && visorProgress < 1 ? "0 2px 8px rgba(0,212,255,0.4)" : "none"
    }}
  >
          {
    /* Visor shutter segments */
  }
          {Array.from({ length: 5 }).map((_, i) => {
    const segmentProgress = Math.max(0, Math.min(1, visorProgress * 5 - i));
    return <div
      key={i}
      className="absolute left-0 right-0"
      style={{
        top: `${i * 20}%`,
        height: "20%",
        background: "linear-gradient(180deg, #1e2d3f 0%, #151f2e 100%)",
        borderBottom: "1px solid #0d1825",
        transform: `scaleY(${1 - segmentProgress})`,
        transformOrigin: "top",
        opacity: 1 - segmentProgress * 0.8
      }}
    />;
  })}

          {
    /* Visor glass reflection */
  }
          {visorProgress < 0.5 && <div
    className="absolute inset-0"
    style={{
      background: "linear-gradient(135deg, rgba(100,160,255,0.15) 0%, rgba(0,80,200,0.1) 30%, transparent 60%)"
    }}
  />}
        </div>

        {
    /* Helmet frame */
  }
        <div
    className="absolute inset-0 rounded-lg pointer-events-none"
    style={{
      border: "2px solid rgba(139,155,180,0.4)",
      boxShadow: "inset 0 0 15px rgba(0,212,255,0.05)"
    }}
  />

        {
    /* Breathing animation overlay */
  }
        <div
    className="absolute inset-0 pointer-events-none"
    style={{
      animation: "breathing 4s ease-in-out infinite",
      background: "radial-gradient(ellipse at 50% 120%, rgba(0,212,255,0.04) 0%, transparent 70%)"
    }}
  />

        {
    /* Helmet bottom details */
  }
        <div
    className="absolute bottom-0 left-0 right-0"
    style={{
      height: "30px",
      background: "linear-gradient(180deg, transparent, rgba(0,20,50,0.8))"
    }}
  >
          <div className="flex justify-center gap-2 pt-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#00D4FF", opacity: 0.6 }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#00ff88", opacity: 0.6 }} />
          </div>
        </div>

        {
    /* Side LED indicators */
  }
        <div
    className="absolute left-1 top-1/3"
    style={{
      width: "3px",
      height: "20px",
      background: "linear-gradient(180deg, #00D4FF, transparent)",
      borderRadius: "2px",
      animation: "ledPulse 1.5s ease-in-out infinite"
    }}
  />
        <div
    className="absolute right-1 top-1/3"
    style={{
      width: "3px",
      height: "20px",
      background: "linear-gradient(180deg, #00D4FF, transparent)",
      borderRadius: "2px",
      animation: "ledPulse 1.5s ease-in-out infinite 0.75s"
    }}
  />
      </div>
    </div>;
}
export {
  AstronautPortrait as default
};
