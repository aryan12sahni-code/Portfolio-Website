"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type IntroLoaderProps = {
  onComplete: () => void;
};

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const duration = 1600;
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 450);
        }, 180);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[var(--ink)] px-6 py-8 text-[var(--mist)] sm:px-10 sm:py-10"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          <div className="flex items-start justify-between gap-6">
            <p className="font-[family-name:var(--font-display)] text-sm tracking-[0.28em] uppercase text-[var(--signal)]">
              Aryan Sahni
            </p>
            <p className="font-mono text-xs tracking-widest text-[var(--mist)]/55">
              SIGNAL / 01
            </p>
          </div>

          <div className="mx-auto w-full max-w-4xl">
            <motion.p
              className="mb-6 font-[family-name:var(--font-display)] text-4xl leading-none tracking-tight sm:text-6xl md:text-7xl"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              Building clarity
              <span className="text-[var(--signal)]">.</span>
            </motion.p>
            <div className="h-px w-full overflow-hidden bg-[var(--mist)]/15">
              <motion.div
                className="h-full bg-[var(--signal)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-4 flex items-end justify-between font-mono text-sm text-[var(--mist)]/70">
              <span>boot · portfolio</span>
              <span className="text-3xl tabular-nums text-[var(--mist)] sm:text-4xl">
                {progress.toString().padStart(3, "0")}%
              </span>
            </div>
          </div>

          <p className="max-w-sm text-sm text-[var(--mist)]/50">
            Product operations · industrial AI · Nürnberg
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
