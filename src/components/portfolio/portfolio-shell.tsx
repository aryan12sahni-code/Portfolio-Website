"use client";

import { useCallback, useEffect, useState } from "react";
import { About } from "./about";
import { Contact } from "./contact";
import { CursorOrb } from "./cursor-orb";
import { Education } from "./education";
import { Experience } from "./experience";
import { FloatingResume } from "./floating-resume";
import { Hero } from "./hero";
import { IntroLoader } from "./intro-loader";
import { MouseProvider } from "./mouse-provider";
import { Projects } from "./projects";
import { ScrollProgress } from "./scroll-progress";
import { SiteFooter } from "./site-footer";
import { SiteNav } from "./site-nav";
import { Skills } from "./skills";

export function PortfolioShell() {
  const [ready, setReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const onComplete = useCallback(() => setReady(true), []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (
      params.get("skip") === "1" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShowLoader(false);
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!showLoader || ready) return;
    const failsafe = window.setTimeout(() => {
      setShowLoader(false);
      setReady(true);
    }, 4500);
    return () => window.clearTimeout(failsafe);
  }, [showLoader, ready]);

  return (
    <MouseProvider>
      {showLoader && !ready && <IntroLoader onComplete={onComplete} />}
      <div
        className={
          ready
            ? "min-h-full bg-[var(--void)] text-white opacity-100 transition-opacity duration-700"
            : "pointer-events-none min-h-full bg-[var(--void)] opacity-0"
        }
      >
        <div className="noise-overlay" aria-hidden />
        <CursorOrb />
        <ScrollProgress />
        <SiteNav />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
        <SiteFooter />
        {ready && <FloatingResume />}
      </div>
    </MouseProvider>
  );
}
