"use client";
import React from "react";
function RocketSVG({ developer, isHovering, phase }) {
  const isDeparting = phase === "departing";
  const isActive = isHovering || phase === "revealing" || phase === "displaying";
  const engineIntensity = isDeparting ? 1.5 : isActive ? 1 : 1.1;
  const flameLength = isDeparting ? 180 : 110;
  return <div className="relative select-none" style={{ width: "620px", height: "200px" }}>
      <svg
    viewBox="0 0 620 200"
    width="620"
    height="200"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: "visible" }}
  >
        <defs>
          {
    /* Premium titanium gradients */
  }
          <linearGradient id="titaniumBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a8b8cc" />
            <stop offset="15%" stopColor="#8B9BB4" />
            <stop offset="40%" stopColor="#5a6a7d" />
            <stop offset="60%" stopColor="#4a5568" />
            <stop offset="80%" stopColor="#5e6e82" />
            <stop offset="100%" stopColor="#3d4a5c" />
          </linearGradient>
          <linearGradient id="titaniumTop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c0d0e0" />
            <stop offset="30%" stopColor="#9aabb8" />
            <stop offset="100%" stopColor="#6a7a8d" />
          </linearGradient>
          <linearGradient id="noseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5a6a7d" />
            <stop offset="35%" stopColor="#8B9BB4" />
            <stop offset="65%" stopColor="#9aabb8" />
            <stop offset="100%" stopColor="#3d4a5c" />
          </linearGradient>
          <linearGradient id="engineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a2535" />
            <stop offset="40%" stopColor="#2e3d50" />
            <stop offset="100%" stopColor="#0f1a28" />
          </linearGradient>
          <linearGradient id="engineNozzle" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3d4a5c" />
            <stop offset="50%" stopColor="#1a2535" />
            <stop offset="100%" stopColor="#0a1220" />
          </linearGradient>
          <linearGradient id="flameOuter" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={`rgba(255,210,80,${engineIntensity})`} />
            <stop offset="25%" stopColor={`rgba(255,140,20,${engineIntensity * 0.95})`} />
            <stop offset="55%" stopColor={`rgba(255,70,10,${engineIntensity * 0.75})`} />
            <stop offset="85%" stopColor={`rgba(220,30,0,${engineIntensity * 0.4})`} />
            <stop offset="100%" stopColor="rgba(180,20,0,0)" />
          </linearGradient>
          <linearGradient id="flameMid" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={`rgba(255,240,160,${engineIntensity})`} />
            <stop offset="35%" stopColor={`rgba(255,190,60,${engineIntensity * 0.9})`} />
            <stop offset="70%" stopColor={`rgba(255,120,20,${engineIntensity * 0.6})`} />
            <stop offset="100%" stopColor="rgba(255,80,0,0)" />
          </linearGradient>
          <linearGradient id="flameCore" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,220,1)" />
            <stop offset="50%" stopColor="rgba(255,240,180,0.9)" />
            <stop offset="100%" stopColor="rgba(255,200,100,0)" />
          </linearGradient>
          <radialGradient id="engineGlow" cx="0%" cy="50%" r="100%">
            <stop offset="0%" stopColor={`rgba(255,160,40,${engineIntensity * 0.7})`} />
            <stop offset="50%" stopColor={`rgba(255,100,10,${engineIntensity * 0.3})`} />
            <stop offset="100%" stopColor="rgba(255,60,0,0)" />
          </radialGradient>
          <radialGradient id="cockpitGlass" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="rgba(140,200,255,0.9)" />
            <stop offset="30%" stopColor="rgba(60,120,220,0.6)" />
            <stop offset="70%" stopColor="rgba(20,50,140,0.8)" />
            <stop offset="100%" stopColor="rgba(5,15,60,0.95)" />
          </radialGradient>
          <radialGradient id="cockpitReflect" cx="30%" cy="25%" r="50%">
            <stop offset="0%" stopColor="rgba(200,230,255,0.4)" />
            <stop offset="100%" stopColor="rgba(200,230,255,0)" />
          </radialGradient>
          <linearGradient id="finGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7a8a9d" />
            <stop offset="50%" stopColor="#4a5568" />
            <stop offset="100%" stopColor="#2a3545" />
          </linearGradient>
          <linearGradient id="finHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(139,155,180,0.5)" />
            <stop offset="100%" stopColor="rgba(139,155,180,0)" />
          </linearGradient>
          <linearGradient id={`rocketAccent${developer.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={developer.rocketColor} stopOpacity="0.9" />
            <stop offset="50%" stopColor={developer.rocketColor} stopOpacity="0.5" />
            <stop offset="100%" stopColor={developer.rocketColor} stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="panelSheen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(180,200,220,0.12)" />
            <stop offset="50%" stopColor="rgba(180,200,220,0.04)" />
            <stop offset="100%" stopColor="rgba(180,200,220,0.08)" />
          </linearGradient>
          {
    /* Horizontal cylindrical shading — dark on the edges, bright in the middle.
       Layered over the vertical titaniumBody gradient to fake rounded metal. */
  }
          <linearGradient id="bodyCylindrical" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.45)" />
            <stop offset="12%" stopColor="rgba(0,0,0,0.18)" />
            <stop offset="32%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="68%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="88%" stopColor="rgba(0,0,0,0.18)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.45)" />
          </linearGradient>
          {
    /* Top specular — strong highlight along the upper curvature. */
  }
          <linearGradient id="bodySpecular" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.32)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          {
    /* Lower-edge shadow — anchors the body. */
  }
          <linearGradient id="bodyUnderShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="70%" stopColor="rgba(0,0,0,0.1)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
          </linearGradient>
          {
    /* Ogive nose-cone shading — sharp top highlight, deep bottom shadow. */
  }
          <linearGradient id="noseShading" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.42)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0)" />
            <stop offset="60%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
          </linearGradient>
          {
    /* Diagonal micro-panel pattern (engine housing) — uses 2px diagonal lines
       for a subtle grip-plate / kevlar-weave look. */
  }
          <pattern id="hatchPattern" patternUnits="userSpaceOnUse" width="3" height="3">
            <path d="M0,3 L3,0" stroke="rgba(139,155,180,0.18)" strokeWidth="0.5" />
          </pattern>
          {
    /* Wide warm ambient glow behind the flame — extends the heat field. */
  }
          <radialGradient id="flameAmbient" cx="0%" cy="50%" r="100%">
            <stop offset="0%" stopColor="rgba(255,170,60,0.35)" />
            <stop offset="50%" stopColor="rgba(255,90,10,0.12)" />
            <stop offset="100%" stopColor="rgba(255,40,0,0)" />
          </radialGradient>
          <filter id="engineBlur">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <filter id="flameBlur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ledGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <clipPath id="bodyClip">
            <rect x="130" y="40" width="330" height="120" rx="6" />
          </clipPath>
        </defs>

        {
    /* === ENGINE GLOW HALO (behind everything) === */
  }
        <ellipse
    cx="490"
    cy="100"
    rx="80"
    ry="45"
    fill="url(#engineGlow)"
    filter="url(#engineBlur)"
    style={{ animation: "enginePulse 0.18s ease-in-out infinite alternate" }}
  />

        {
    /* === REAR STABILIZER FINS === */
  }
        {
    /* Top rear fin */
  }
        <path d="M460,50 L440,18 L490,38 Z" fill="url(#finGrad)" stroke="#2a3545" strokeWidth="0.8" />
        <path d="M460,50 L490,38 L485,50 Z" fill="url(#finHighlight)" />
        {
    /* Bottom rear fin */
  }
        <path d="M460,150 L440,182 L490,162 Z" fill="url(#finGrad)" stroke="#2a3545" strokeWidth="0.8" />
        <path d="M460,150 L490,162 L485,150 Z" fill="url(#finHighlight)" />

        {
    /* === FRONT STABILIZER FINS === */
  }
        {
    /* Top front fin */
  }
        <path d="M290,40 L270,10 L310,28 Z" fill="url(#finGrad)" stroke="#2a3545" strokeWidth="0.8" />
        {
    /* Bottom front fin */
  }
        <path d="M290,160 L270,190 L310,172 Z" fill="url(#finGrad)" stroke="#2a3545" strokeWidth="0.8" />

        {
    /* === MAIN ROCKET BODY === */
  }
        {
    /* Base titanium fill */
  }
        <rect x="130" y="40" width="330" height="120" rx="6" fill="url(#titaniumBody)" />
        {
    /* Cylindrical shading — adds dark edges / bright center to fake roundness */
  }
        <rect x="130" y="40" width="330" height="120" rx="6" fill="url(#bodyCylindrical)" />
        {
    /* Top specular highlight */
  }
        <rect x="130" y="40" width="330" height="40" rx="6" fill="url(#bodySpecular)" />
        {
    /* Body top highlight sheen (existing, lower opacity so it doesn't blow out) */
  }
        <rect x="130" y="40" width="330" height="22" rx="6" fill="url(#titaniumTop)" opacity="0.4" />
        {
    /* Panel sheen overlay */
  }
        <rect x="130" y="40" width="330" height="120" rx="6" fill="url(#panelSheen)" />
        {
    /* Under-shadow band — anchors the body bottom */
  }
        <rect x="130" y="100" width="330" height="60" rx="6" fill="url(#bodyUnderShadow)" />
        {
    /* Hairline top/bottom edges for the chamfer feel */
  }
        <line x1="132" y1="40.5" x2="458" y2="40.5" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
        <line x1="132" y1="159.5" x2="458" y2="159.5" stroke="rgba(0,0,0,0.55)" strokeWidth="0.6" />

        {
    /* Horizontal panel lines — paired hairline (light top, dark bottom) for chamfer */
  }
        <line x1="130" y1="100" x2="460" y2="100" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
        <line x1="130" y1="101" x2="460" y2="101" stroke="rgba(0,0,0,0.55)" strokeWidth="0.5" />
        <line x1="150" y1="72" x2="440" y2="72" stroke="rgba(255,255,255,0.08)" strokeWidth="0.4" />
        <line x1="150" y1="73" x2="440" y2="73" stroke="rgba(0,0,0,0.4)" strokeWidth="0.4" />
        <line x1="150" y1="128" x2="440" y2="128" stroke="rgba(0,0,0,0.4)" strokeWidth="0.4" />
        <line x1="150" y1="129" x2="440" y2="129" stroke="rgba(255,255,255,0.08)" strokeWidth="0.4" />

        {
    /* Vertical panel dividers — paired hairline for chamfer */
  }
        <line x1="200" y1="40" x2="200" y2="160" stroke="rgba(255,255,255,0.07)" strokeWidth="0.4" />
        <line x1="201" y1="40" x2="201" y2="160" stroke="rgba(0,0,0,0.45)" strokeWidth="0.4" />
        <line x1="290" y1="40" x2="290" y2="160" stroke="rgba(255,255,255,0.07)" strokeWidth="0.4" />
        <line x1="291" y1="40" x2="291" y2="160" stroke="rgba(0,0,0,0.45)" strokeWidth="0.4" />
        <line x1="370" y1="40" x2="370" y2="160" stroke="rgba(255,255,255,0.07)" strokeWidth="0.4" />
        <line x1="371" y1="40" x2="371" y2="160" stroke="rgba(0,0,0,0.45)" strokeWidth="0.4" />
        <line x1="430" y1="40" x2="430" y2="160" stroke="rgba(255,255,255,0.07)" strokeWidth="0.4" />
        <line x1="431" y1="40" x2="431" y2="160" stroke="rgba(0,0,0,0.45)" strokeWidth="0.4" />

        {
    /* Hatch micro-texture on the lower body band (between the two horizontal seams) */
  }
        <rect x="130" y="101" width="330" height="27" fill="url(#hatchPattern)" opacity="0.7" />

        {
    /* Rivets top row */
  }
        {[145, 168, 215, 240, 310, 335, 385, 410, 445].map((x) => <React.Fragment key={`rt-${x}`}>
            <circle cx={x} cy="46" r="2.2" fill="#3d4a5c" stroke="#7a8a9d" strokeWidth="0.6" />
            <circle cx={x} cy="154" r="2.2" fill="#3d4a5c" stroke="#7a8a9d" strokeWidth="0.6" />
          </React.Fragment>)}

        {
    /* Developer color accent stripe */
  }
        <rect x="130" y="95" width="330" height="10" fill={`url(#rocketAccent${developer.id})`} opacity="0.75" />

        {
    /* === NOSE CONE === */
  }
        {
    /* Ogive curve: cubic beziers produce a more dynamic, tapered profile than
       the original quadratic. The two sub-paths (upper/lower) are filled
       separately so we can add an inner highlight gradient and outer shadow. */
  }
        <path
    d="M130,40 C92,46 58,68 47,100 C58,132 92,154 130,160 Z"
    fill="url(#noseGrad)"
    stroke="#5a6a7d"
    strokeWidth="1"
  />
        {
    /* Inner nose shading (top highlight -> bottom shadow) */
  }
        <path
    d="M130,40 C92,46 58,68 47,100 C58,132 92,154 130,160 Z"
    fill="url(#noseShading)"
  />
        {
    /* Specular sliver along the upper curve */
  }
        <path
    d="M130,42 C95,48 62,70 53,98 C68,76 95,58 130,52 Z"
    fill="rgba(220,235,250,0.32)"
  />
        {
    /* Lower shadow lip */
  }
        <path
    d="M55,108 C72,138 100,156 130,158 C100,154 78,140 60,118 Z"
    fill="rgba(0,0,0,0.35)"
  />
        {
    /* Nose tip — small probe */
  }
        <circle cx="47" cy="100" r="4" fill="#9aabb8" stroke="#6b7a8d" strokeWidth="0.8" />
        <circle cx="46" cy="98.5" r="1.2" fill="rgba(255,255,255,0.7)" />
        {
    /* Nose panel lines (along the curve) */
  }
        <path d="M130,40 C95,55 65,75 56,95" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" fill="none" />
        <path d="M130,40 C95,55 65,75 56,95" stroke="rgba(0,0,0,0.4)" strokeWidth="0.4" fill="none" transform="translate(0,0.8)" />
        <path d="M130,160 C95,145 65,125 56,105" stroke="rgba(0,0,0,0.4)" strokeWidth="0.5" fill="none" />

        {
    /* === COCKPIT WINDOW === */
  }
        {
    /* Outer frame */
  }
        <ellipse cx="235" cy="78" rx="36" ry="26" fill="#1a2535" stroke="#6b7a8d" strokeWidth="2" />
        {
    /* Frame inner shadow (darkens the glass edge) */
  }
        <ellipse cx="235" cy="78" rx="34" ry="24" fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="1.5" />
        {
    /* Glass */
  }
        <ellipse cx="235" cy="78" rx="32" ry="22" fill="url(#cockpitGlass)" />
        {
    /* Inner ring */
  }
        <ellipse cx="235" cy="78" rx="32" ry="22" fill="none" stroke="rgba(100,160,255,0.35)" strokeWidth="1" />
        {
    /* Reflection */
  }
        <ellipse cx="235" cy="78" rx="32" ry="22" fill="url(#cockpitReflect)" />
        {
    /* Diagonal scratch highlight (top-left to mid) */
  }
        <path
    d="M210,68 Q220,60 240,62 L238,66 Q222,66 212,72 Z"
    fill="rgba(255,255,255,0.42)"
  />
        {
    /* Small bottom-right reflection */
  }
        <ellipse cx="252" cy="90" rx="6" ry="2" fill="rgba(255,255,255,0.18)" transform="rotate(-30 252 90)" />
        {
    /* Cockpit cross-hairs */
  }
        <line x1="205" y1="78" x2="265" y2="78" stroke="rgba(100,160,255,0.15)" strokeWidth="0.5" />
        <line x1="235" y1="58" x2="235" y2="98" stroke="rgba(100,160,255,0.15)" strokeWidth="0.5" />
        {
    /* Frame bolts */
  }
        <circle cx="203" cy="78" r="3" fill="#2a3545" stroke="#7a8a9d" strokeWidth="0.7" />
        <circle cx="267" cy="78" r="3" fill="#2a3545" stroke="#7a8a9d" strokeWidth="0.7" />
        <circle cx="235" cy="56" r="3" fill="#2a3545" stroke="#7a8a9d" strokeWidth="0.7" />
        <circle cx="235" cy="100" r="3" fill="#2a3545" stroke="#7a8a9d" strokeWidth="0.7" />

        {
    /* === STATUS INDICATOR PANEL === */
  }
        <rect x="310" y="60" width="52" height="30" rx="3" fill="#0a1220" stroke="#1e3a5f" strokeWidth="1" />
        <rect x="310" y="60" width="52" height="8" rx="3" fill="#1a2535" />
        <text x="336" y="67" textAnchor="middle" fill="#4a6a8a" fontSize="4.5" fontFamily="monospace">STATUS</text>
        {
    /* Status LEDs */
  }
        <circle cx="322" cy="80" r="4" fill={isActive ? "#00ff88" : "#003322"} filter={isActive ? "url(#ledGlow)" : void 0} style={{ animation: isActive ? "ledPulse 1.5s ease-in-out infinite" : void 0 }} />
        <circle cx="336" cy="80" r="4" fill={isActive ? "#00D4FF" : "#001a33"} filter={isActive ? "url(#ledGlow)" : void 0} style={{ animation: isActive ? "ledPulse 1.5s ease-in-out infinite 0.5s" : void 0 }} />
        <circle cx="350" cy="80" r="4" fill={isActive ? "#ffcc00" : "#332200"} filter={isActive ? "url(#ledGlow)" : void 0} style={{ animation: isActive ? "ledPulse 1.5s ease-in-out infinite 1s" : void 0 }} />

        {
    /* === CAUTION PANEL === */
  }
        <rect x="375" y="62" width="48" height="16" rx="2" fill="#0d1a2a" stroke="#cc8800" strokeWidth="0.8" />
        <rect x="375" y="62" width="48" height="5" rx="2" fill="#cc8800" opacity="0.3" />
        <text x="399" y="73" textAnchor="middle" fill="#ffaa00" fontSize="5" fontFamily="monospace" fontWeight="bold">⚠ CAUTION</text>

        {
    /* === ID BADGE === */
  }
        <rect x="150" y="80" width="44" height="36" rx="3" fill="#080e1a" stroke="#1e3a5f" strokeWidth="1.2" />
        <rect x="150" y="80" width="44" height="10" rx="3" fill={developer.rocketColor} opacity="0.8" />
        <text x="172" y="88" textAnchor="middle" fill="white" fontSize="5" fontFamily="monospace" fontWeight="bold">XJ-7</text>
        <text x="172" y="100" textAnchor="middle" fill="#8B9BB4" fontSize="4" fontFamily="monospace">CREW</text>
        <text x="172" y="109" textAnchor="middle" fill="#00D4FF" fontSize="4.5" fontFamily="monospace">MODULE</text>
        <text x="172" y="113" textAnchor="middle" fill="#4a6a8a" fontSize="3.5" fontFamily="monospace">SECURE</text>

        {
    /* === ENGINE SECTION === */
  }
        {
    /* Engine housing */
  }
        <rect x="455" y="52" width="35" height="96" rx="4" fill="url(#engineGrad)" stroke="#2a3545" strokeWidth="1.2" />
        {
    /* Hatch micro-texture for grip-plate feel */
  }
        <rect x="455" y="52" width="35" height="96" rx="4" fill="url(#hatchPattern)" opacity="0.6" />
        {
    /* Top edge highlight (catches light) */
  }
        <line x1="457" y1="52.5" x2="488" y2="52.5" stroke="rgba(180,200,220,0.25)" strokeWidth="0.6" />
        {
    /* Bottom edge shadow */
  }
        <line x1="457" y1="147.5" x2="488" y2="147.5" stroke="rgba(0,0,0,0.6)" strokeWidth="0.6" />
        {
    /* Engine rings detail */
  }
        {[65, 78, 91, 104, 117, 130].map((y) => <line key={y} x1="455" y1={y} x2="490" y2={y} stroke="rgba(80,100,130,0.6)" strokeWidth="0.8" />)}
        {
    /* Engine bolts */
  }
        <circle cx="458" cy="57" r="2.5" fill="#1a2535" stroke="#7a8a9d" strokeWidth="0.6" />
        <circle cx="458" cy="143" r="2.5" fill="#1a2535" stroke="#7a8a9d" strokeWidth="0.6" />
        <circle cx="487" cy="57" r="2.5" fill="#1a2535" stroke="#7a8a9d" strokeWidth="0.6" />
        <circle cx="487" cy="143" r="2.5" fill="#1a2535" stroke="#7a8a9d" strokeWidth="0.6" />

        {
    /* Nozzle bell */
  }
        <path d="M490,60 L515,52 L515,148 L490,140 Z" fill="url(#engineNozzle)" stroke="#1a2535" strokeWidth="0.8" />
        {
    /* Nozzle inner dark */
  }
        <path d="M515,55 L528,62 L528,138 L515,145 Z" fill="#080e1a" />
        {
    /* Nozzle rings */
  }
        {[68, 84, 100, 116, 132].map((y) => <line key={y} x1="490" y1={y} x2="528" y2={y} stroke="rgba(60,80,110,0.5)" strokeWidth="0.7" />)}

        {
    /* === EXHAUST FLAMES === */
  }
        {
    /* Wide ambient heat halo — sits behind the entire flame stack */
  }
        <ellipse
    cx="500"
    cy="100"
    rx={flameLength * 0.6}
    ry="55"
    fill="url(#flameAmbient)"
    style={{ animation: "enginePulse 0.2s ease-in-out infinite alternate" }}
  />
        <g style={{ animation: "flameFlicker 0.1s ease-in-out infinite alternate", transformOrigin: "528px 100px" }}>
          {
    /* Outer flame glow */
  }
          <path
    d={`M528,62 Q${560 + flameLength * 0.3},${80} ${528 + flameLength},100 Q${560 + flameLength * 0.3},${120} 528,138 Z`}
    fill="url(#flameOuter)"
    opacity={isDeparting ? 1 : 0.8}
    filter="url(#flameBlur)"
  />
          {
    /* Mid flame */
  }
          <path
    d={`M528,70 Q${555 + flameLength * 0.25},${88} ${528 + flameLength * 0.82},100 Q${555 + flameLength * 0.25},${112} 528,130 Z`}
    fill="url(#flameMid)"
    opacity={isDeparting ? 1 : 0.9}
  />
          {
    /* Core flame */
  }
          <path
    d={`M528,80 Q${548 + flameLength * 0.18},${93} ${528 + flameLength * 0.55},100 Q${548 + flameLength * 0.18},${107} 528,120 Z`}
    fill="url(#flameCore)"
    opacity={0.95}
  />
          {
    /* Bright core tip */
  }
          <ellipse
    cx={528 + flameLength * 0.15}
    cy={100}
    rx={flameLength * 0.08}
    ry={6}
    fill="rgba(255,255,240,0.9)"
  />
          {
    /* Inner core halo at nozzle exit — bright pin-prick to anchor the eye */
  }
          <ellipse
    cx={530}
    cy={100}
    rx="3.2"
    ry="11"
    fill="rgba(255,255,255,0.95)"
    style={{ animation: "flameFlicker 0.07s ease-in-out infinite alternate" }}
  />
          {
    /* Shock diamonds — the bright standing-wave nodes along the plume centerline.
       Drawn at three fixed offsets; opacity flickers so they pulse. */
  }
          {[0.35, 0.55, 0.75].map((t, i) => <ellipse
    key={`shock-${i}`}
    cx={528 + flameLength * t}
    cy={100}
    rx={4 - i * 0.6}
    ry={3.5 - i * 0.4}
    fill={i === 0 ? "rgba(255,255,255,0.85)" : "rgba(255,235,160,0.65)"}
    style={{
      animation: `flameFlicker ${0.08 + i * 0.02}s ease-in-out infinite alternate`,
      animationDelay: `${i * 0.025}s`
    }}
  />)}
        </g>

        {
    /* Smoke particles */
  }
        {[0, 1, 2, 3, 4, 5].map((i) => <circle
    key={i}
    cx={545 + i * 12}
    cy={100 + (i % 2 === 0 ? -12 : 12)}
    r={4 + i * 0.8}
    fill="rgba(140,120,90,0.12)"
    style={{
      animation: `smokeRise ${0.9 + i * 0.18}s ease-out infinite`,
      animationDelay: `${i * 0.14}s`
    }}
  />)}

        {
    /* === ROPE ATTACHMENT POINTS (bottom of rocket body) === */
  }
        {
    /* Left attachment bracket */
  }
        <rect x="218" y="157" width="24" height="10" rx="2" fill="#2a3545" stroke="#5a6a7d" strokeWidth="1" />
        <circle cx="230" cy="162" r="3.5" fill="#1a2535" stroke="#7a8a9d" strokeWidth="1" />
        <circle cx="230" cy="162" r="1.5" fill="#4a6a8a" />

        {
    /* Right attachment bracket */
  }
        <rect x="378" y="157" width="24" height="10" rx="2" fill="#2a3545" stroke="#5a6a7d" strokeWidth="1" />
        <circle cx="390" cy="162" r="3.5" fill="#1a2535" stroke="#7a8a9d" strokeWidth="1" />
        <circle cx="390" cy="162" r="1.5" fill="#4a6a8a" />

        {
    /* Center attachment bracket */
  }
        <rect x="298" y="157" width="24" height="10" rx="2" fill="#2a3545" stroke="#5a6a7d" strokeWidth="1" />
        <circle cx="310" cy="162" r="3.5" fill="#1a2535" stroke="#7a8a9d" strokeWidth="1" />
        <circle cx="310" cy="162" r="1.5" fill="#4a6a8a" />
      </svg>
    </div>;
}
export {
  RocketSVG as default
};
