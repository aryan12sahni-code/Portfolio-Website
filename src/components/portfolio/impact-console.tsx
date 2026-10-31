"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { impactMetrics } from "@/data/content";
import { cn } from "@/lib/utils";

export function ImpactConsole() {
  const [active, setActive] = useState(impactMetrics[0].id);
  const current = impactMetrics.find((m) => m.id === active) ?? impactMetrics[0];

  return (
    <div className="glow-border relative overflow-hidden rounded-2xl bg-[var(--panel)] text-white shadow-[0_0_60px_rgba(168,85,247,0.2)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 font-mono text-[11px] tracking-widest text-white/45 uppercase sm:px-5">
        <span>impact_console · live</span>
        <span className="inline-flex items-center gap-2">
          <span className="size-1.5 animate-pulse rounded-full bg-[var(--magenta)] shadow-[0_0_12px_var(--magenta)]" />
          ready
        </span>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-wrap gap-2 border-b border-white/10 p-4 sm:p-5 lg:border-b-0 lg:border-r lg:border-white/10">
          {impactMetrics.map((metric) => (
            <button
              key={metric.id}
              type="button"
              onClick={() => setActive(metric.id)}
              className={cn(
                "rounded-xl border px-3 py-2 text-left text-sm transition-all",
                active === metric.id
                  ? "border-[var(--violet)] bg-[var(--violet)]/20 text-white shadow-[0_0_24px_rgba(168,85,247,0.25)]"
                  : "border-white/10 text-white/60 hover:border-white/25 hover:text-white"
              )}
            >
              <span className="font-mono text-[10px] tracking-wider text-white/35">
                query/{metric.id}
              </span>
              <span className="mt-1 block leading-snug">{metric.label}</span>
            </button>
          ))}
        </div>

        <div className="relative min-h-[180px] overflow-hidden p-5 sm:p-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.2),transparent_55%)]" />
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.32 }}
              className="relative"
            >
              <p className="font-mono text-xs tracking-widest text-[var(--violet)] uppercase">
                result set
              </p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-5xl tracking-tight text-white sm:text-6xl">
                {current.value}
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
                {current.detail}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
