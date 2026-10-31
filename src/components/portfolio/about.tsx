"use client";

import { about, profile } from "@/data/content";
import { ImpactConsole } from "./impact-console";
import { Reveal } from "./reveal";
import { TiltCard } from "./tilt-card";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-white/8 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-[var(--violet)] uppercase">
            01 — {about.title}
          </p>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-3xl tracking-tight text-white sm:text-5xl">
            Ops rigor meeting{" "}
            <span className="text-gradient">industrial AI.</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <Reveal delay={0.08}>
            <div className="space-y-5 text-base leading-relaxed text-[var(--mist-soft)] sm:text-lg">
              {about.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-white">
                {profile.languages.map((lang) => (
                  <li key={lang.name}>
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-[var(--mist-soft)]"> · {lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <TiltCard maxTilt={8} className="rounded-2xl">
              <ImpactConsole />
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
