"use client";

import { useCallback, useState } from "react";
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
  const onComplete = useCallback(() => setReady(true), []);

  return (
    <>
      {!ready && <IntroLoader onComplete={onComplete} />}
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
