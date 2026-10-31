"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

export function TiltCard({
  children,
  className,
  maxTilt = 10,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const sx = useSpring(rotateX, { stiffness: 220, damping: 18 });
  const sy = useSpring(rotateY, { stiffness: 220, damping: 18 });
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(168,85,247,0.28), transparent 55%)`;

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - py) * maxTilt);
    rotateY.set((px - 0.5) * maxTilt);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative transform-gpu ${className ?? ""}`}
      style={{
        rotateX: sx,
        rotateY: sy,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-80"
        style={{ background: glare }}
      />
      {children}
    </motion.div>
  );
}
