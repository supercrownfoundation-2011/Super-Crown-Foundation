"use client";

import React, { useEffect, useRef } from "react";

interface ParticlesProps {
  className?: string;
  particleColors?: string[];
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleBaseSize?: number;
  moveParticlesOnHover?: boolean;
  alphaParticles?: boolean;
  disableRotation?: boolean;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  targetAlpha: number;
  pulseSpeed: number;
}

/**
 * React Bits - Interactive Canvas Particles Background
 * Clean HTML5 Canvas particle system with cursor interaction and responsive resizing.
 */
export default function Particles({
  className = "",
  particleColors = ["#C9A227", "#3C2350", "#E5C158", "#7A4D94"],
  particleCount = 55,
  particleSpread = 10,
  speed = 0.6,
  particleBaseSize = 2.4,
  moveParticlesOnHover = true,
  alphaParticles = true,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Handle high DPI displays
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Initialize particles
    const particles: Particle[] = [];
    const colors = particleColors.length ? particleColors : ["#C9A227", "#3C2350"];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed - 0.15, // Gentle upward buoyant drift
        size: Math.random() * particleBaseSize + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.45 + 0.15,
        targetAlpha: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
      });
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);
    if (moveParticlesOnHover) {
      canvas.parentElement?.addEventListener("mousemove", handleMouseMove);
      canvas.parentElement?.addEventListener("mouseleave", handleMouseLeave);
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Standard drift
          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges smoothly
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;

          // Cursor interactive repulsion/attraction
          if (moveParticlesOnHover && mouseRef.current.active) {
            const dx = p.x - mouseRef.current.x;
            const dy = p.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 130;

            if (dist < maxDist && dist > 0) {
              const force = (1 - dist / maxDist) * 1.5;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;
            }
          }

          // Subtle alpha breathing
          if (alphaParticles) {
            p.alpha += (p.targetAlpha - p.alpha) * p.pulseSpeed;
            if (Math.abs(p.targetAlpha - p.alpha) < 0.05) {
              p.targetAlpha = Math.random() * 0.5 + 0.15;
            }
          }
        }

        // Draw particle with gentle glow
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle soft outer halo for gold particles
        if (p.color === "#C9A227" || p.color === "#E5C158") {
          ctx.globalAlpha = p.alpha * 0.3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // Draw subtle connecting lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const lineDistance = 90;

          if (dist < lineDistance) {
            ctx.save();
            const alpha = (1 - dist / lineDistance) * 0.12;
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = "#C9A227";
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.parentElement?.removeEventListener("mousemove", handleMouseMove);
      canvas.parentElement?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [particleColors, particleCount, speed, particleBaseSize, moveParticlesOnHover, alphaParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}

