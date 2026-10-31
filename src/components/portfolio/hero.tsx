"use client";

import { motion, useTransform } from "framer-motion";
import { ArrowDownRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/content";
import { HeroField } from "./hero-field";
import { Magnetic } from "./magnetic";
import { useMouse } from "./mouse-provider";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const { snx, sny } = useMouse();
  const textX = useTransform(snx, [-0.5, 0.5], [-18, 18]);
  const textY = useTransform(sny, [-0.5, 0.5], [-12, 12]);

  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-[var(--void)]">
      <HeroField />

      <motion.div
        className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32"
        variants={container}
        initial="hidden"
        animate="show"
        style={{ x: textX, y: textY }}
      >
        <motion.div
          variants={item}
          className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-[var(--mist-soft)] backdrop-blur-md"
        >
          <MapPin className="size-4 text-[var(--violet)]" aria-hidden />
          {profile.location}
          <span className="ml-1 size-1.5 animate-pulse rounded-full bg-[var(--magenta)]" />
        </motion.div>

        <motion.p
          variants={item}
          className="font-[family-name:var(--font-display)] text-[clamp(3.4rem,12vw,8.5rem)] leading-[0.88] tracking-[-0.04em] text-white"
        >
          {profile.firstName}
          <br />
          <span className="text-gradient">{profile.lastName}</span>
        </motion.p>

        <div className="mt-8 grid max-w-3xl gap-6 sm:mt-10 sm:grid-cols-[1.2fr_0.8fr] sm:items-end">
          <motion.div variants={item}>
            <h1 className="text-xl leading-snug text-white sm:text-2xl">
              {profile.headline}
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--mist-soft)] sm:text-lg">
              {profile.summary}
            </p>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap gap-3 sm:justify-end">
            <Magnetic className="magnetic-target">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--magenta)] px-5 text-base text-white shadow-[0_0_40px_rgba(168,85,247,0.35)] hover:opacity-95"
              >
                <a href="#projects">
                  View projects
                  <ArrowDownRight data-icon="inline-end" />
                </a>
              </Button>
            </Magnetic>
            <Magnetic className="magnetic-target">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-full border-white/20 bg-white/5 px-5 text-base text-white backdrop-blur-sm hover:bg-white/10"
              >
                <a href="#contact">Hire me</a>
              </Button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
