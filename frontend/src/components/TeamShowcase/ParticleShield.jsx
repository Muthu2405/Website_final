"use client";
import { useEffect, useRef } from "react";
function ParticleShield({ visible }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animRef = useRef(0);
  const visibleRef = useRef(visible);
  const dissolveStartRef = useRef(null);
  useEffect(() => {
    visibleRef.current = visible;
    if (visible) {
      dissolveStartRef.current = null;
      particlesRef.current.forEach((p) => {
        p.dissolved = false;
        p.opacity = 1;
      });
    } else {
      dissolveStartRef.current = performance.now();
    }
  }, [visible]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = 520;
    const H = 280;
    const cols = 52;
    const rows = 28;
    const cellW = W / cols;
    const cellH = H / rows;
    const baseColors = ["#00D4FF", "#0088AA", "#004466", "#00AAFF", "#66DDFF"];
    const accentColors = ["#00FFC8", "#7DFFD0"];
    const colors = [...baseColors, ...baseColors, ...accentColors];
    const cx = W / 2;
    const cy = H / 2;
    const maxR = Math.hypot(cx, cy);
    const particles = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * cellW + cellW / 2 + (Math.random() - 0.5) * 3;
        const y = row * cellH + cellH / 2 + (Math.random() - 0.5) * 3;
        const radial = Math.min(1, Math.hypot(x - cx, y - cy) / maxR);
        const jitter = (Math.random() - 0.5) * 0.12;
        const dissolveDelay = Math.max(0, radial + jitter) * 800 + Math.random() * 100;
        particles.push({
          x,
          y,
          dissolveDelay,
          dissolved: false,
          opacity: 1,
          size: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    }
    particles.sort((a, b) => a.dissolveDelay - b.dissolveDelay);
    particlesRef.current = particles;
    let lastTime = 0;
    const draw = (timestamp) => {
      const delta = timestamp - lastTime;
      lastTime = timestamp;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      const dissolveStart = dissolveStartRef.current;
      let allDissolved = true;
      particlesRef.current.forEach((p) => {
        if (!visibleRef.current && dissolveStart !== null) {
          const elapsed = timestamp - dissolveStart;
          if (elapsed > p.dissolveDelay) {
            const dissolveProgress = Math.min(1, (elapsed - p.dissolveDelay) / 200);
            p.opacity = 1 - dissolveProgress;
            if (p.opacity <= 0) {
              p.dissolved = true;
              p.opacity = 0;
            }
          }
        } else if (visibleRef.current) {
          p.opacity = Math.min(1, p.opacity + delta * 3e-3);
          p.dissolved = false;
        }
        if (!p.dissolved) {
          allDissolved = false;
          if (p.opacity > 0.05) {
            const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
            const hex = p.color.replace("#", "");
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${p.opacity * 0.5})`);
            glow.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${p.opacity * 0.15})`);
            glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
            ctx.fillStyle = glow;
            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fill();
        }
      });
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);
  return <canvas
    ref={canvasRef}
    width={520}
    height={280}
    className="absolute inset-0 pointer-events-none rounded-lg"
    style={{ zIndex: 15 }}
  />;
}
export {
  ParticleShield as default
};
