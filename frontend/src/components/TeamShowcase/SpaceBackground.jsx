"use client";
import { useEffect, useRef } from "react";
function SpaceBackground() {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(0);
  const timeRef = useRef(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const starColors = ["#ffffff", "#cce8ff", "#e8d4ff", "#ffd4cc", "#d4ffe8"];
    starsRef.current = Array.from({ length: 280 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.8 + 0.3,
      opacity: Math.random() * 0.7 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 5e-3,
      twinkleOffset: Math.random() * Math.PI * 2,
      color: starColors[Math.floor(Math.random() * starColors.length)]
    }));
    const spawnParticle = () => {
      if (particlesRef.current.length < 60) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
          life: 0,
          maxLife: Math.random() * 300 + 150
        });
      }
    };
    const draw = () => {
      timeRef.current += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const spaceGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      spaceGrad.addColorStop(0, "#030308");
      spaceGrad.addColorStop(0.3, "#040510");
      spaceGrad.addColorStop(0.6, "#030308");
      spaceGrad.addColorStop(1, "#050310");
      ctx.fillStyle = spaceGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const nebula1 = ctx.createRadialGradient(
        canvas.width * 0.2,
        canvas.height * 0.4,
        0,
        canvas.width * 0.2,
        canvas.height * 0.4,
        canvas.width * 0.35
      );
      nebula1.addColorStop(0, "rgba(0, 40, 120, 0.12)");
      nebula1.addColorStop(0.5, "rgba(0, 20, 80, 0.06)");
      nebula1.addColorStop(1, "transparent");
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const nebula2 = ctx.createRadialGradient(
        canvas.width * 0.8,
        canvas.height * 0.3,
        0,
        canvas.width * 0.8,
        canvas.height * 0.3,
        canvas.width * 0.3
      );
      nebula2.addColorStop(0, "rgba(60, 0, 100, 0.08)");
      nebula2.addColorStop(1, "transparent");
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const nebula3 = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.8,
        0,
        canvas.width * 0.5,
        canvas.height * 0.8,
        canvas.width * 0.4
      );
      nebula3.addColorStop(0, "rgba(0, 60, 40, 0.06)");
      nebula3.addColorStop(1, "transparent");
      ctx.fillStyle = nebula3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(timeRef.current * star.twinkleSpeed * 60 + star.twinkleOffset) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity * twinkle;
        ctx.fill();
        if (star.size > 1.2) {
          ctx.globalAlpha = star.opacity * twinkle * 0.3;
          const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 4);
          glow.addColorStop(0, star.color);
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      });
      if (Math.random() < 0.3) spawnParticle();
      particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);
      particlesRef.current.forEach((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        const lifeRatio = p.life / p.maxLife;
        const alpha = lifeRatio < 0.2 ? lifeRatio / 0.2 : lifeRatio > 0.8 ? (1 - lifeRatio) / 0.2 : 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 180, 255, ${p.opacity * alpha * 0.4})`;
        ctx.fill();
      });
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);
  return <canvas
    ref={canvasRef}
    className="absolute inset-0 w-full h-full"
    style={{ zIndex: 0 }}
  />;
}
export {
  SpaceBackground as default
};
