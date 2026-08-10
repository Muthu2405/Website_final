"use client";
import { useState, useEffect } from "react";
const iconPaths = {
  email: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  linkedin: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
  github: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22",
  instagram: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 2h9A5.5 5.5 0 0122 7.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2z",
  phone: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z",
  portfolio: "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
};
function getHref(type, value) {
  switch (type) {
    case "email":
      return `mailto:${value}`;
    case "phone":
      return `tel:${value.replace(/[^+\d]/g, "")}`;
    case "linkedin":
    case "github":
    case "portfolio":
      return value.startsWith("http") ? value : `https://${value}`;
    case "instagram":
      return `https://instagram.com/${value.replace(/^@/, "")}`;
    default:
      return "#";
  }
}
function ContactIcon({ type, value, delay, visible }) {
  const [hovered, setHovered] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setShow(true), delay);
      return () => clearTimeout(t);
    } else {
      setShow(false);
    }
  }, [visible, delay]);
  if (!value) return null;
  return <div className="relative">
      <a
    href={getHref(type, value)}
    target={type === "email" || type === "phone" ? void 0 : "_blank"}
    rel={type === "email" || type === "phone" ? void 0 : "noopener noreferrer"}
    aria-label={`${type}: ${value}`}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    className="cursor-pointer"
    style={{
      opacity: show ? 1 : 0,
      transform: show ? "scale(1)" : "scale(0.5)",
      transition: `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
      width: "24px",
      height: "24px",
      borderRadius: "4px",
      border: "1px solid rgba(0,212,255,0.3)",
      background: hovered ? "rgba(0,212,255,0.2)" : "rgba(0,212,255,0.05)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: hovered ? "0 0 12px rgba(0,212,255,0.6), 0 0 24px rgba(0,212,255,0.3)" : "0 0 6px rgba(0,212,255,0.2)",
      animation: show ? "contactPulse 2s ease-in-out infinite" : void 0
    }}
  >
        <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#00D4FF"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="12"
    height="12"
  >
          <path d={iconPaths[type]} />
        </svg>
      </a>

      {
    /* Tooltip */
  }
      {hovered && <div
    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 pointer-events-none"
    style={{
      background: "rgba(8,14,26,0.95)",
      border: "1px solid rgba(0,212,255,0.3)",
      borderRadius: "3px",
      padding: "2px 6px",
      fontSize: "8px",
      color: "#00D4FF",
      fontFamily: "monospace",
      whiteSpace: "nowrap",
      zIndex: 50,
      boxShadow: "0 0 10px rgba(0,212,255,0.3)"
    }}
  >
          {value}
        </div>}
    </div>;
}
export {
  ContactIcon as default
};
