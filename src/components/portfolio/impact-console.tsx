"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { impactMetrics } from "@/data/content";
import { cn } from "@/lib/utils";

export function ImpactConsole() {
  const [active, setActive] = useState(impactMetrics[0].id);
  const current = impactMetrics.find((m) => m.id === active) ?? impactMetrics[0];

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--ink)]/10 bg-[var(--ink)] text-[var(--mist)] shadow-[0_24px_60px_-28px_rgba(12,20,32,0.55)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 font-mono text-[11px] tracking-widest uppercase text-white/50 sm:px-5">
        <span>impact_console · live</span>
        <span className="inline-flex items-center gap-2">
          <span className="size-1.5 animate-pulse rounded-full bg-[var(--signal)]" />
          ready
        </span>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-wrap gap-2 border-b border-white/10 p-4 sm:p-5 lg:border-b-0 lg:border-r">
          {impactMetrics.map((metric) => (
            <button
              key={metric.id}
              type="button"
              onClick={() => setActive(metric.id)}
              className={cn(
                "rounded-md border px-3 py-2 text-left text-sm transition-colors",
                active === metric.id
                  ? "border-[var(--signal)] bg-[var(--signal)]/15 text-white"
                  : "border-white/10 text-white/65 hover:border-white/25 hover:text-white"
              )}
            >
              <span className="font-mono text-[10px] tracking-wider text-white/40">
                query/{metric.id}
              </span>
              <span className="mt-1 block leading-snug">{metric.label}</span>
            </button>
          ))}
        </div>

        <div className="relative min-h-[180px] p-5 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              <p className="font-mono text-xs tracking-widest text-[var(--signal)] uppercase">
                result set
              </p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-5xl tracking-tight text-white sm:text-6xl">
                {current.value}
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">
                {current.detail}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
