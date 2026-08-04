"use client";

function CarHUD({ developer, isHovering, phase }) {
  const accent = developer?.rocketColor || "#00e5ff";
  const active = isHovering || phase === "hovering" || phase === "displaying";

  return (
    <svg
      viewBox="0 0 520 300"
      width="520"
      height="300"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", overflow: "visible" }}
    >
      <defs>
        <linearGradient id="hudPanelFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.10" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
        </linearGradient>
        <radialGradient id="hudGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hudSweep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0" />
          <stop offset="50%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* starfield */}
      {[
        [20, 20, 1], [80, 10, 0.7], [500, 15, 0.9], [10, 150, 0.8], [505, 200, 1],
        [40, 280, 0.7], [480, 270, 0.8], [250, 8, 0.6], [300, 292, 0.7],
      ].map(([cx, cy, r], i) => (
        <circle key={`s-${i}`} cx={cx} cy={cy} r={r} fill="#dfe8ff"
          style={{ animation: "starTwinkle 2.6s ease-in-out infinite", animationDelay: `${(i % 4) * 0.5}s` }} />
      ))}

      {/* ambient glow behind panel */}
      <ellipse cx="260" cy="150" rx="260" ry="130" fill="url(#hudGlow)" opacity={active ? 0.55 : 0.3} />

      {/* ── main HUD frame ── */}
      <rect x="8" y="8" width="504" height="284" rx="8" fill="url(#hudPanelFill)" stroke={accent} strokeWidth="1.2" opacity="0.9" />

      {/* corner brackets */}
      {[
        [8, 8, 1, 1], [512, 8, -1, 1], [8, 292, 1, -1], [512, 292, -1, -1],
      ].map(([x, y, dx, dy], i) => (
        <path key={`c-${i}`}
          d={`M${x + dx * 22},${y} L${x},${y} L${x},${y + dy * 22}`}
          fill="none" stroke={accent} strokeWidth="2.4" strokeLinecap="round" opacity="0.95" />
      ))}

      {/* scanline sweep */}
      <rect x="10" y="10" width="500" height="24" fill="url(#hudSweep)" opacity="0.6" style={{ animation: "scanLine 3.2s linear infinite" }} clipPath="inset(0)" />

      {/* header */}
      <circle cx="26" cy="28" r="5" fill="none" stroke={accent} strokeWidth="1.3" />
      <circle cx="26" cy="28" r="1.8" fill={accent} style={{ animation: "ledPulse 1.6s ease-in-out infinite" }} />
      <text x="38" y="32" fontFamily="sans-serif" fontWeight="700" fontSize="15" fill="#eaf6ff" letterSpacing="0.5">Developer Profile</text>
      <line x1="8" y1="44" x2="512" y2="44" stroke={accent} strokeWidth="0.8" opacity="0.35" />

      {/* close / min icons top-right */}
      <rect x="472" y="20" width="12" height="9" rx="1.5" fill="none" stroke={accent} strokeWidth="1" opacity="0.7" />
      <line x1="492" y1="18" x2="500" y2="26" stroke={accent} strokeWidth="1.3" opacity="0.7" />
      <line x1="500" y1="18" x2="492" y2="26" stroke={accent} strokeWidth="1.3" opacity="0.7" />

      {/* ── left: data / code panel ── */}
      <rect x="20" y="54" width="150" height="210" rx="3" fill="rgba(0,0,0,0.25)" stroke={accent} strokeWidth="0.6" opacity="0.6" />
      <text x="27" y="68" fontFamily="monospace" fontSize="7" fill={accent} opacity="0.8" letterSpacing="1">{`> DEV.SPECFILE`}</text>

      <text x="27" y="82" fontFamily="monospace" fontSize="8" fill="#eaf6ff" fontWeight="700">{developer?.name || "Unnamed"}</text>
      <text x="27" y="93" fontFamily="monospace" fontSize="6.2" fill="#9fb3c8">{developer?.role || "Developer"}</text>

      {[
        { label: "EXP", value: developer?.experience || "—" },
        { label: "PROJ", value: developer?.projects || "—" },
      ].map((row, i) => (
        <text key={i} x="27" y={108 + i * 10} fontFamily="monospace" fontSize="6" fill="#8B9BB4">
          {row.label} <tspan fill="#eaf6ff">{row.value}</tspan>
        </text>
      ))}

      <line x1="27" y1="132" x2="163" y2="132" stroke={accent} strokeWidth="0.5" opacity="0.3" />

      {(developer?.technologies || []).slice(0, 10).map((t, i) => (
        <text key={i} x="27" y={146 + i * 11} fontFamily="monospace" fontSize="6" fill={i === 2 ? "#ff5d6c" : "#9fb3c8"} opacity="0.9">
          {`[${String(i + 1).padStart(2, "0")}] `}<tspan fill={i === 2 ? "#ff5d6c" : "#cfe8ff"}>{t}</tspan>
        </text>
      ))}

      <circle cx="30" cy="252" r="2" fill={accent} style={{ animation: "ledPulse 1.2s ease-in-out infinite" }} />
      <text x="38" y="255" fontFamily="monospace" fontSize="5.5" fill={accent} opacity="0.8">LINK ESTABLISHED</text>

      {/* teal signal line from panel toward the car */}
      <path d="M170,150 C 200,150 210,120 240,120" fill="none" stroke={accent} strokeWidth="1.4" opacity="0.6" strokeDasharray="3 3">
        <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1s" repeatCount="indefinite" />
      </path>

      {/* ── center: wireframe car blueprint ── */}
      <g stroke={accent} strokeWidth="1" fill="none" opacity={active ? 0.95 : 0.75}>
        {/* body silhouette */}
        <path d="M230,175 L250,150 L300,138 L360,138 L392,150 L410,170 L410,185 L230,185 Z" />
        {/* roofline */}
        <path d="M270,150 L285,120 L340,120 L360,138" />
        <path d="M285,120 L300,138" />
        {/* window sections */}
        <path d="M295,138 L305,124 L336,124 L344,138" opacity="0.6" />
        <line x1="318" y1="124" x2="316" y2="138" opacity="0.5" />
        {/* wheels */}
        <circle cx="262" cy="185" r="15" />
        <circle cx="262" cy="185" r="6" />
        <circle cx="378" cy="185" r="15" />
        <circle cx="378" cy="185" r="6" />
        {/* underbody / chassis lines */}
        <line x1="240" y1="185" x2="400" y2="185" opacity="0.5" />
        <line x1="230" y1="175" x2="410" y2="175" opacity="0.35" />
        {/* headlight/taillight accents */}
        <circle cx="234" cy="172" r="2.2" fill={accent} stroke="none" opacity="0.9" />
        <circle cx="406" cy="172" r="2.2" fill="#ff5d6c" stroke="none" opacity="0.9" />
      </g>

      {/* dimension callouts */}
      <line x1="230" y1="196" x2="410" y2="196" stroke={accent} strokeWidth="0.5" opacity="0.4" />
      <line x1="230" y1="192" x2="230" y2="200" stroke={accent} strokeWidth="0.5" opacity="0.4" />
      <line x1="410" y1="192" x2="410" y2="200" stroke={accent} strokeWidth="0.5" opacity="0.4" />
      <text x="320" y="207" textAnchor="middle" fontFamily="monospace" fontSize="6" fill={accent} opacity="0.6">4820mm</text>

      {/* ── top-right: schematic thumbnail ── */}
      <rect x="392" y="54" width="100" height="66" rx="3" fill="rgba(0,0,0,0.25)" stroke={accent} strokeWidth="0.6" opacity="0.6" />
      <g stroke={accent} strokeWidth="0.7" fill="none" opacity="0.7">
        <rect x="410" y="70" width="30" height="34" />
        <line x1="410" y1="80" x2="440" y2="80" />
        <line x1="410" y1="92" x2="440" y2="92" />
        <circle cx="465" cy="87" r="12" />
        <line x1="465" y1="75" x2="465" y2="99" />
        <line x1="453" y1="87" x2="477" y2="87" />
      </g>

      {/* ── bottom-right: circular gauge ── */}
      <rect x="392" y="128" width="100" height="100" rx="3" fill="rgba(0,0,0,0.25)" stroke={accent} strokeWidth="0.6" opacity="0.6" />
      <circle cx="442" cy="178" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
      <circle
        cx="442" cy="178" r="34" fill="none" stroke={accent} strokeWidth="6"
        strokeDasharray={`${2 * Math.PI * 34 * 0.68} ${2 * Math.PI * 34}`}
        strokeLinecap="round"
        transform="rotate(-90 442 178)"
        opacity="0.9"
      />
      <text x="442" y="174" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#eaf6ff" fontWeight="700">68%</text>
      <text x="442" y="186" textAnchor="middle" fontFamily="monospace" fontSize="5.5" fill="#8B9BB4">BUILD RDY</text>

      {/* ── bottom toolbar ── */}
      <rect x="20" y="272" width="472" height="18" rx="3" fill="rgba(0,0,0,0.3)" stroke={accent} strokeWidth="0.5" opacity="0.5" />
      {[36, 56, 76, 96].map((x, i) => (
        <rect key={i} x={x} y="277" width="10" height="8" rx="1.5" fill="none" stroke={accent} strokeWidth="1" opacity="0.7" />
      ))}
      <text x="470" y="284" textAnchor="end" fontFamily="monospace" fontSize="6" fill={accent} opacity="0.7">STATUS: ONLINE</text>
    </svg>
  );
}

export { CarHUD as default };
