import { useEffect, useRef } from 'react';

// ── BLACK PARTICLE FIELD ──
// Faithful port of the #stars-canvas script from full.html: a fixed,
// full-viewport, 3D-perspective star field that sits behind the whole page.
export default function StarfieldBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    let dots = [];
    let rafId = 0;
    const DOT_COUNT = 1200;
    const FOCAL_LENGTH = 320;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function createDots() {
      dots = [];
      for (let i = 0; i < DOT_COUNT; i++) {
        dots.push({
          x: (Math.random() - 0.5) * width * 1.4,
          y: (Math.random() - 0.5) * height * 1.4,
          z: Math.random() * 1800 + 200,
          size: Math.random() * 1.9 + 0.5,
          speed: Math.random() * 0.8 + 0.35,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      dots.forEach((dot) => {
        dot.z -= dot.speed;

        if (dot.z <= 60) {
          dot.z = 1800 + Math.random() * 500;
          dot.x = (Math.random() - 0.5) * width * 1.4;
          dot.y = (Math.random() - 0.5) * height * 1.4;
        }

        const scale = FOCAL_LENGTH / (FOCAL_LENGTH + dot.z);
        const x = centerX + dot.x * scale;
        const y = centerY + dot.y * scale;
        const radius = dot.size * scale;
        const opacity = Math.min(1, 0.25 + scale * 0.75);

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    }

    const handleResize = () => {
      resize();
      createDots();
    };

    window.addEventListener('resize', handleResize);

    resize();
    createDots();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas id="stars-canvas" ref={canvasRef} />;
}
