"use client";

function TruckSVG({ developer, isHovering, phase }) {
  const accent = developer?.rocketColor || "#00e5ff";

  return (
    <svg
      viewBox="0 0 520 260"
      width="520"
      height="260"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", overflow: "visible" }}
    >
      <defs>
        <linearGradient id="cabHull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b96a3" />
          <stop offset="40%" stopColor="#454f5c" />
          <stop offset="100%" stopColor="#14181e" />
        </linearGradient>
        <linearGradient id="containerHull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#66707c" />
          <stop offset="38%" stopColor="#313841" />
          <stop offset="100%" stopColor="#0d1013" />
        </linearGradient>
        <linearGradient id="cockpitGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d8f6ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#082230" stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id="thrusterCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f3feff" stopOpacity="1" />
          <stop offset="35%" stopColor={accent} stopOpacity="0.95" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hoverGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.65" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dishFace" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#e4e9ee" />
          <stop offset="55%" stopColor="#aab4bf" />
          <stop offset="100%" stopColor="#5d6771" />
        </radialGradient>
        <linearGradient id="dishRim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c7cfd6" />
          <stop offset="100%" stopColor="#454f58" />
        </linearGradient>
        <linearGradient id="edgeGlow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={accent} stopOpacity="0" />
          <stop offset="50%" stopColor={accent} stopOpacity="0.95" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hullSheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <ellipse cx="270" cy="236" rx="235" ry="15" fill={accent} opacity="0.1" />
      <ellipse cx="270" cy="236" rx="235" ry="15" fill="url(#hoverGlow)" opacity="0.35" />

      <path d="M150,30 L462,30 Q472,30 472,40 L472,178 Q472,188 462,188 L150,188 Z" fill="url(#containerHull)" stroke="#04060a" strokeWidth="1.5" />
      <path d="M150,30 L462,30 Q472,30 472,40 L472,58 L150,58 Z" fill="url(#hullSheen)" />
      <path d="M150,30 L172,30 L162,188 L150,188 Z" fill="#04060a" opacity="0.35" />
      <rect x="150" y="70" width="322" height="2.5" fill="url(#edgeGlow)" />
      <rect x="150" y="146" width="322" height="2.5" fill="url(#edgeGlow)" />
      <path d="M330,40 L455,40 L448,178 L323,178 Z" fill="rgba(255,255,255,0.03)" />
      {[195, 235, 275, 315, 355, 395, 435].map((x, i) => (
        <line key={i} x1={x} y1="34" x2={x - 8} y2="184" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}

      <rect x="150" y="30" width="322" height="158" rx="10" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.25" />

      <text x="310" y="112" textAnchor="middle" fontFamily="sans-serif" fontWeight="700" fontSize="19" fill={accent} opacity="0.9" letterSpacing="3">AGENCY</text>
      <line x1="270" y1="120" x2="350" y2="120" stroke={accent} strokeWidth="0.8" opacity="0.4" />

      {[180, 240, 300, 360, 420].map((cx, i) => (
        <circle
          key={i}
          cx={cx}
          cy="37"
          r="2"
          fill={accent}
          style={{ animation: "ledPulse 1.6s ease-in-out infinite", animationDelay: `${i * 0.15}s` }}
        />
      ))}

      <rect x="452" y="150" width="16" height="26" rx="3" fill="#171b21" stroke="#454f5c" strokeWidth="1" />
      <circle cx="460" cy="163" r="4" fill="url(#thrusterCore)" />
      <line x1="474" y1="163" x2="486" y2="163" stroke={accent} strokeWidth="1.5" opacity="0.5" />

      <path d="M42,186 L42,110 Q42,96 55,92 L92,92 Q104,92 111,80 L124,54 Q129,44 141,44 L150,44 L150,186 Z" fill="url(#cabHull)" stroke="#04060a" strokeWidth="1.5" />
      <path d="M42,110 L92,92 Q98,98 96,108 L48,124 Z" fill="url(#hullSheen)" opacity="0.5" />
      <path d="M96,84 Q108,84 115,72 L126,50 Q130,46 137,46 L145,46 L145,84 Z" fill="url(#cockpitGlass)" stroke="#454f5c" strokeWidth="1" />
      <path d="M100,82 L118,54 L127,54 L110,82 Z" fill="rgba(220,250,255,0.45)" />
      <path d="M97,68 L104,68 L101,80 L96,80 Z" fill={accent} opacity="0.3" />
      <line x1="92" y1="92" x2="92" y2="186" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />

      <line x1="52" y1="98" x2="80" y2="98" stroke={accent} strokeWidth="0.8" opacity="0.45" />
      <rect x="46" y="136" width="10" height="26" rx="2" fill="#0d1013" stroke="#3a424c" strokeWidth="1" />
      <circle cx="51" cy="149" r="2.5" fill={accent} />
      <rect x="70" y="132" width="8" height="3" rx="1.5" fill="#b3bcc6" />

      <rect x="38" y="172" width="106" height="12" rx="3" fill="#0d1013" stroke="#3a424c" strokeWidth="1" />
      <rect x="42" y="175" width="18" height="6" rx="1" fill={accent} opacity="0.65" />
      <circle cx="132" cy="178" r="2" fill={accent} opacity="0.8" />

      <circle cx="46" cy="120" r="9" fill="url(#thrusterCore)" />
      <circle cx="46" cy="120" r="4" fill="#f3feff" />

      {[83, 192, 300, 408].map((cx, i) => (
        <g key={i}>
          <ellipse cx={cx} cy="218" rx="28" ry="8" fill="url(#hoverGlow)" />
          <ellipse cx={cx} cy="200" rx="25" ry="9" fill="#20262e" stroke={accent} strokeWidth="1.2" opacity="0.9" />
          <ellipse cx={cx} cy="200" rx="16" ry="6" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.6" />
          <ellipse cx={cx} cy="200" rx="8" ry="3.5" fill="#171b21" />
        </g>
      ))}

      <line x1="60" y1="188" x2="460" y2="188" stroke={accent} strokeWidth="1" opacity="0.45" />

      <rect x="469" y="150" width="0" height="0" fill="none" style={{ animation: phase === "departing" ? "ledPulse 0.4s ease-in-out infinite" : "none" }} />
    </svg>
  );
}

export { TruckSVG as default };