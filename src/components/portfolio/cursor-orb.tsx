"use client";

import { useEffect, useState } from "react";
import { motion, useMotionTemplate } from "framer-motion";
import { useMouse } from "./mouse-provider";

export function CursorOrb() {
  const { sx, sy } = useMouse();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest(
        "a, button, [role='button'], input, textarea, .magnetic-target"
      );
      setHovering(Boolean(interactive));
    };

    document.addEventListener("mouseover", onOver);
    return () => document.removeEventListener("mouseover", onOver);
  }, []);

  const glowTransform = useMotionTemplate`translate3d(${sx}px, ${sy}px, 0) translate(-50%, -50%)`;
  const ringTransform = useMotionTemplate`translate3d(${sx}px, ${sy}px, 0) translate(-50%, -50%)`;

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[80] hidden size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.22),rgba(236,72,153,0.1)_40%,transparent_68%)] blur-3xl md:block"
        style={{ transform: glowTransform }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[85] hidden mix-blend-difference md:block"
        style={{ transform: ringTransform }}
      >
        <motion.div
          className="rounded-full border border-white"
          animate={{
            width: hovering ? 56 : 18,
            height: hovering ? 56 : 18,
            opacity: hovering ? 0.9 : 0.7,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[86] hidden size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white md:block"
        style={{ x: sx, y: sy }}
      />
    </>
  );
}
