"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/content";
import { HeroField } from "./hero-field";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      <HeroField />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32">
        <motion.div
          className="mb-8 inline-flex w-fit items-center gap-2 text-sm text-[var(--ink-soft)]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55 }}
        >
          <MapPin className="size-4 text-[var(--signal)]" aria-hidden />
          {profile.location}
        </motion.div>

        <motion.p
          className="font-[family-name:var(--font-display)] text-[clamp(3.4rem,12vw,8.5rem)] leading-[0.88] tracking-[-0.04em] text-[var(--ink)]"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {profile.firstName}
          <br />
          <span className="text-[var(--signal)]">{profile.lastName}</span>
        </motion.p>

        <div className="mt-8 grid max-w-3xl gap-6 sm:mt-10 sm:grid-cols-[1.2fr_0.8fr] sm:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h1 className="text-xl leading-snug text-[var(--ink)] sm:text-2xl">
              {profile.headline}
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
              {profile.summary}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3 sm:justify-end"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.55 }}
          >
            <Button
              asChild
              size="lg"
              className="h-12 rounded-md bg-[var(--signal)] px-5 text-base text-white hover:bg-[var(--signal)]/90"
            >
              <a href="#projects">
                View projects
                <ArrowDownRight data-icon="inline-end" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-md border-[var(--ink)]/20 bg-white/40 px-5 text-base text-[var(--ink)] backdrop-blur-sm hover:bg-white/70"
            >
              <a href="#contact">Get in touch</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
