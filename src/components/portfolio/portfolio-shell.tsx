"use client";

import { useCallback, useEffect, useState } from "react";
import { About } from "./about";
import { Contact } from "./contact";
import { Education } from "./education";
import { Experience } from "./experience";
import { Hero } from "./hero";
import { IntroLoader } from "./intro-loader";
import { Projects } from "./projects";
import { SiteFooter } from "./site-footer";
import { SiteNav } from "./site-nav";
import { Skills } from "./skills";

export function PortfolioShell() {
  const [ready, setReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const onComplete = useCallback(() => setReady(true), []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("skip") === "1" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShowLoader(false);
      setReady(true);
    }
  }, []);

  // Safety net so the site never stays blocked behind the boot screen.
  useEffect(() => {
    if (!showLoader || ready) return;
    const failsafe = window.setTimeout(() => {
      setShowLoader(false);
      setReady(true);
    }, 4000);
    return () => window.clearTimeout(failsafe);
  }, [showLoader, ready]);

  return (
    <>
      {showLoader && !ready && <IntroLoader onComplete={onComplete} />}
      <div
        className={
          ready
            ? "opacity-100 transition-opacity duration-500"
            : "pointer-events-none opacity-0"
        }
      >
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
      </div>
    </>
  );
}
