"use client";

import { education } from "@/data/content";
import { Reveal } from "./reveal";

export function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-24 border-t border-white/8 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-[var(--violet)] uppercase">
            05 — Education
          </p>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-3xl tracking-tight text-white sm:text-5xl">
            Training for{" "}
            <span className="text-gradient">industrial AI.</span>
          </h2>
        </Reveal>

        <div className="mt-12 space-y-0">
          {education.map((item, index) => (
            <Reveal key={item.school} delay={index * 0.06}>
              <article className="grid gap-3 border-t border-white/10 py-8 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl tracking-tight text-white sm:text-2xl">
                    {item.degree}
                  </h3>
                  <p className="mt-2 text-[var(--mist-soft)]">
                    {item.school}
                    <span className="mx-2 text-white/20">/</span>
                    {item.location}
                  </p>
                </div>
                <p className="font-mono text-sm tracking-wide text-[var(--violet)]">
                  {item.period}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
