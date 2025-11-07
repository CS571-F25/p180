import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ButtonParticleExplosion = ({ x, y, onComplete }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas to full viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    const particleCount = 50;
    const colors = ['#ff6b35', '#ff8c42', '#ffa561', '#ffb87a', '#ffffff'];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 2 + Math.random() * 4;

      particlesRef.current.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        radius: 3 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: 0.015 + Math.random() * 0.015,
      });
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allDead = true;

      particlesRef.current.forEach((particle) => {
        if (particle.alpha > 0) {
          allDead = false;

          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Apply gravity
          particle.vy += 0.15;

          // Apply air resistance
          particle.vx *= 0.98;
          particle.vy *= 0.98;

          // Fade out
          particle.alpha -= particle.decay;

          // Draw particle
          ctx.save();
          ctx.globalAlpha = particle.alpha;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fill();

          // Add glow effect
          ctx.shadowBlur = 10;
          ctx.shadowColor = particle.color;
          ctx.fill();
          ctx.restore();
        }
      });

      if (allDead) {
        cancelAnimationFrame(animationId);
        if (onComplete) onComplete();
      } else {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    animationRef.current = animationId;

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [x, y, onComplete]);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default ButtonParticleExplosion;
