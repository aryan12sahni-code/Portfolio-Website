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
    let value = 0;
    const timer = window.setInterval(() => {
      value = Math.min(100, value + 5);
      setProgress(value);
      if (value >= 100) {
        window.clearInterval(timer);
        window.setTimeout(() => {
          setVisible(false);
          window.setTimeout(onComplete, 420);
        }, 160);
      }
    }, 45);

    return () => window.clearInterval(timer);
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
            <p className="mb-6 font-[family-name:var(--font-display)] text-4xl leading-none tracking-tight sm:text-6xl md:text-7xl">
              Building clarity
              <span className="text-[var(--signal)]">.</span>
            </p>
            <div className="h-px w-full overflow-hidden bg-[var(--mist)]/15">
              <div
                className="h-full bg-[var(--signal)] transition-[width] duration-75 ease-linear"
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
