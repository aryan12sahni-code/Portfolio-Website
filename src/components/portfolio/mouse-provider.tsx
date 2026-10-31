"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import {
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";

type MouseContextValue = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  nx: MotionValue<number>;
  ny: MotionValue<number>;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  snx: MotionValue<number>;
  sny: MotionValue<number>;
};

const MouseContext = createContext<MouseContextValue | null>(null);

export function MouseProvider({ children }: { children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 140, damping: 24, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 140, damping: 24, mass: 0.35 });
  const snx = useSpring(nx, { stiffness: 80, damping: 20, mass: 0.45 });
  const sny = useSpring(ny, { stiffness: 80, damping: 20, mass: 0.45 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      nx.set(e.clientX / window.innerWidth - 0.5);
      ny.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y, nx, ny]);

  const value = useMemo(
    () => ({ x, y, nx, ny, sx, sy, snx, sny }),
    [x, y, nx, ny, sx, sy, snx, sny]
  );

  return (
    <MouseContext.Provider value={value}>{children}</MouseContext.Provider>
  );
}

export function useMouse() {
  const ctx = useContext(MouseContext);
  if (!ctx) {
    throw new Error("useMouse must be used within MouseProvider");
  }
  return ctx;
}
