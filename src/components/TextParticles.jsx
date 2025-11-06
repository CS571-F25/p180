import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const TextParticles = ({
  text,
  fontSize = 80,
  onComplete,
  trigger = false
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw text
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const lines = text.split('\n');
    const lineHeight = fontSize * 1.2;
    const startY = rect.height / 2 - ((lines.length - 1) * lineHeight) / 2;

    lines.forEach((line, index) => {
      ctx.fillText(line, rect.width / 2, startY + index * lineHeight);
    });

    // Get pixel data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    // Create particles from text pixels
    const particles = [];
    const gap = 3; // Sampling gap for performance

    for (let y = 0; y < canvas.height; y += gap) {
      for (let x = 0; x < canvas.width; x += gap) {
        const index = (y * canvas.width + x) * 4;
        const alpha = pixels[index + 3];

        if (alpha > 128) { // Only create particles for visible pixels
          particles.push({
            x: x / dpr,
            y: y / dpr,
            originX: x / dpr,
            originY: y / dpr,
            vx: 0,
            vy: 0,
            color: `rgba(${pixels[index]}, ${pixels[index + 1]}, ${pixels[index + 2]}, 1)`,
            size: Math.random() * 2 + 1,
            life: 1
          });
        }
      }
    }

    particlesRef.current = particles;

  }, [text, fontSize]);

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    // Initialize particle velocities for explosion
    particlesRef.current.forEach(particle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      particle.vx = Math.cos(angle) * speed;
      particle.vy = Math.sin(angle) * speed;
    });

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);

      let allDead = true;

      particlesRef.current.forEach(particle => {
        if (particle.life > 0) {
          allDead = false;

          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Add gravity
          particle.vy += 0.2;

          // Fade out
          particle.life -= 0.015;

          // Draw particle
          ctx.globalAlpha = particle.life;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;

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
  }, [trigger, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    />
  );
};

export default TextParticles;
