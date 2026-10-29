import React, { useEffect, useRef } from 'react';

/**
 * MODERN AMBIENT CANVAS BACKGROUND
 * 
 * Luminous floating ambient gradient orbs + subtle interactive constellation particles.
 * Hardware-accelerated 60fps, sleek, luxury aesthetic.
 */
export default function BackgroundCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Subtle drifting particles
    let particles = [];
    const initParticles = () => {
      particles = [];
      const count = Math.min(35, Math.floor(width / 40));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.4 + 0.1,
          color: Math.random() > 0.5 ? 'rgba(99, 102, 241,' : 'rgba(52, 211, 153,'
        });
      }
    };
    initParticles();

    // Floating ambient glow orbs
    const orbs = [
      { x: width * 0.2, y: height * 0.25, vx: 0.2, vy: 0.15, r: 260, color: 'rgba(99, 102, 241, 0.045)' },
      { x: width * 0.8, y: height * 0.65, vx: -0.15, vy: -0.2, r: 320, color: 'rgba(16, 185, 129, 0.04)' },
      { x: width * 0.5, y: height * 0.85, vx: 0.1, vy: -0.15, r: 280, color: 'rgba(6, 182, 212, 0.035)' }
    ];

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw soft ambient orbs
      orbs.forEach((orb) => {
        if (!prefersReducedMotion) {
          orb.x += orb.vx;
          orb.y += orb.vy;
          if (orb.x < 0 || orb.x > width) orb.vx *= -1;
          if (orb.y < 0 || orb.y > height) orb.vy *= -1;
        }

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw subtle particle network
      const maxDist = width < 768 ? 110 : 150;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        if (!prefersReducedMotion) {
          p1.x += p1.vx;
          p1.y += p1.vy;

          if (p1.x < 0) p1.x = width;
          if (p1.x > width) p1.x = 0;
          if (p1.y < 0) p1.y = height;
          if (p1.y > height) p1.y = 0;
        }

        // Particle dot
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p1.color}${p1.alpha})`;
        ctx.fill();

        // Connected filaments
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
