import React, { useEffect, useRef } from 'react';
import './BackgroundEffects.css';

export default function BackgroundEffects() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive star and particle counts
    const isMobile = width < 768;
    const starCount = isMobile ? 65 : 120;
    const particleCount = isMobile ? 30 : 55;

    // Generate static/twinkling stars
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
      color: Math.random() > 0.4 ? '#E0F2FE' : (Math.random() > 0.5 ? '#93C5FD' : '#FFFFFF'),
    }));

    // Generate slow drifting magical floating particles
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      baseRadius: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.35 + 0.12),
      speedX: (Math.random() - 0.5) * 0.25,
      sinOffset: Math.random() * Math.PI * 2,
      sinSpeed: Math.random() * 0.02 + 0.008,
      opacity: Math.random() * 0.55 + 0.2,
      hue: Math.random() > 0.6 ? 210 : (Math.random() > 0.3 ? 220 : 195), // Beautiful shades of blue
    }));

    // Handle window resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars.forEach(s => {
        s.x = Math.random() * width;
        s.y = Math.random() * height;
      });
    };

    window.addEventListener('resize', handleResize);

    // Mouse movement subtle interaction
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('pointermove', handleMouseMove);

    let time = 0;

    const render = () => {
      time += 1;
      
      // Smooth mouse easing
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Draw Twinkling Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const currentAlpha =
          star.alpha + Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.28;
        const clampedAlpha = Math.max(0.08, Math.min(1, currentAlpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = clampedAlpha;
        ctx.shadowBlur = star.radius > 1 ? 6 : 2;
        ctx.shadowColor = '#BAE6FD';
        ctx.fill();
      }

      // Draw Floating Luminous Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += Math.sin(time * p.sinSpeed + p.sinOffset) * 0.4 + p.speedX;

        // Reset particle position when it drifts off screen
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Subtle interactive repulsion/glow near mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let extraGlow = 0;
        if (dist < 180) {
          extraGlow = (1 - dist / 180) * 0.4;
        }

        const currentOpacity = Math.min(0.9, p.opacity + extraGlow);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${currentOpacity})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsla(${p.hue}, 95%, 65%, 0.8)`;
        ctx.globalAlpha = currentOpacity;
        ctx.fill();
      }

      // Reset global context properties
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handleMouseMove);
    };
  }, []);

  return (
    <div className="background-container" aria-hidden="true">
      {/* Animated Deep Gradient Mesh Base */}
      <div className="gradient-base" />

      {/* Floating Ambient Glowing Blobs */}
      <div className="ambient-blob blob-midnight" />
      <div className="ambient-blob blob-royal" />
      <div className="ambient-blob blob-sky" />
      <div className="ambient-blob blob-pastel" />
      <div className="ambient-blob blob-center-light" />

      {/* Dynamic Star & Particle Canvas */}
      <canvas ref={canvasRef} className="particles-canvas" />

      {/* Dreamy Vignette & Radial Light Overlay */}
      <div className="dreamy-light-sweep" />
      <div className="vignette-overlay" />
    </div>
  );
}
