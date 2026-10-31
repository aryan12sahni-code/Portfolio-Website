"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type IntroLoaderProps = {
  onComplete: () => void;
};

const MARQUEE = [
  "PRODUCT OPERATIONS",
  "INDUSTRIAL AI",
  "DATA SYSTEMS",
  "ANALYTICS",
  "AUTOMATION",
];

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let value = 0;
    const timer = window.setInterval(() => {
      value = Math.min(100, value + 4);
      setProgress(value);
      if (value >= 100) {
        window.clearInterval(timer);
        window.setTimeout(() => {
          setVisible(false);
          window.setTimeout(onComplete, 480);
        }, 200);
      }
    }, 38);

    return () => window.clearInterval(timer);
  }, [onComplete]);

  const loop = [...MARQUEE, ...MARQUEE, ...MARQUEE];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-black text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          <div className="absolute inset-0 flex items-center opacity-30">
            <div className="marquee-track gap-12">
              {loop.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className="font-[family-name:var(--font-display)] text-5xl tracking-tight whitespace-nowrap sm:text-7xl md:text-8xl"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          <div className="relative flex h-full flex-col justify-between px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex items-start justify-between gap-6">
              <p className="font-[family-name:var(--font-display)] text-sm tracking-[0.28em] text-[var(--violet)] uppercase">
                Aryan Sahni
              </p>
              <p className="font-mono text-xs tracking-widest text-white/45">
                SIGNAL / 01
              </p>
            </div>

            <div className="mx-auto w-full max-w-3xl">
              <div className="glow-border relative overflow-hidden rounded-full bg-white/5 p-1 backdrop-blur-sm">
                <div className="relative h-3 overflow-hidden rounded-full bg-black/60">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--violet)] via-[var(--magenta)] to-[var(--cyan)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="mt-5 flex items-end justify-between font-mono text-sm text-white/55">
                <span>boot · portfolio</span>
                <span className="text-4xl tabular-nums text-white sm:text-5xl">
                  {progress.toString().padStart(3, "0")}
                  <span className="text-[var(--violet)]">%</span>
                </span>
              </div>
            </div>

            <p className="max-w-sm text-sm text-white/40">
              Product operations · industrial AI · Nürnberg
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
