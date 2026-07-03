"use client";

import { useEffect, useRef } from "react";

type ConfettiCelebrationProps = {
  active: boolean;
  burstKey: number;
  intensity?: "subtle" | "finale";
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  spin: number;
  color: string;
  shape: "rect" | "circle";
  life: number;
};

const COLORS = [
  "#F59E0B",
  "#3B82F6",
  "#10B981",
  "#A78BFA",
  "#F472B6",
  "#F8FAFC",
];

function createParticles(
  count: number,
  width: number,
  burst = false,
): Particle[] {
  return Array.from({ length: count }, () => {
    const angle = burst
      ? Math.random() * Math.PI * 2
      : Math.random() * Math.PI + Math.PI;
    const speed = burst ? 2 + Math.random() * 5 : 1 + Math.random() * 3;

    return {
      x: burst ? width * (0.2 + Math.random() * 0.6) : Math.random() * width,
      y: burst ? window.innerHeight * 0.55 : -20 - Math.random() * 80,
      vx: Math.cos(angle) * speed,
      vy: burst ? Math.sin(angle) * speed - 2 : 1.5 + Math.random() * 2.5,
      size: 4 + Math.random() * 6,
      rotation: Math.random() * 360,
      spin: (Math.random() - 0.5) * 8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: Math.random() > 0.5 ? "rect" : "circle",
      life: 1,
    };
  });
}

export function ConfettiCelebration({
  active,
  burstKey,
  intensity = "subtle",
}: ConfettiCelebrationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (!active) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

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

    const spawnCount = intensity === "finale" ? 120 : 60;
    particlesRef.current = [
      ...particlesRef.current,
      ...createParticles(spawnCount, canvas.width, intensity === "finale"),
      ...createParticles(Math.floor(spawnCount / 2), canvas.width, true),
    ];

    let frames = 0;
    const maxFrames = intensity === "finale" ? 420 : 260;

    const tick = () => {
      frames += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current
        .map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.04,
          rotation: particle.rotation + particle.spin,
          life: particle.life - 0.004,
        }))
        .filter(
          (particle) =>
            particle.life > 0 &&
            particle.y < canvas.height + 40 &&
            particle.x > -40 &&
            particle.x < canvas.width + 40,
        );

      if (frames % 18 === 0 && frames < maxFrames * 0.6) {
        particlesRef.current.push(
          ...createParticles(intensity === "finale" ? 8 : 4, canvas.width),
        );
      }

      for (const particle of particlesRef.current) {
        ctx.save();
        ctx.globalAlpha = Math.max(particle.life, 0);
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.fillStyle = particle.color;

        if (particle.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(
            -particle.size / 2,
            -particle.size / 3,
            particle.size,
            particle.size / 1.5,
          );
        }

        ctx.restore();
      }

      if (frames < maxFrames || particlesRef.current.length > 0) {
        frameRef.current = window.requestAnimationFrame(tick);
      }
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [active, burstKey, intensity]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90]"
    />
  );
}
