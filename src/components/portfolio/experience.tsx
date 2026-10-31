"use client";

import { experience } from "@/data/content";
import { Reveal } from "./reveal";

export function Experience() {
  return (
    <section
      id="work"
      className="scroll-mt-24 border-t border-white/8 bg-black/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-[var(--violet)] uppercase">
            02 — Experience
          </p>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-3xl tracking-tight text-white sm:text-5xl">
            Where the numbers{" "}
            <span className="text-gradient">moved.</span>
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <div className="absolute top-0 bottom-0 left-[11px] hidden w-px bg-gradient-to-b from-[var(--violet)] via-[var(--magenta)] to-transparent md:block" />

          <ol className="space-y-0">
            {experience.map((job, index) => (
              <Reveal key={`${job.company}-${job.role}`} delay={index * 0.06}>
                <li className="relative grid gap-6 border-t border-white/10 py-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-10 md:border-t-0 md:pl-12">
                  <span className="absolute top-12 left-0 hidden size-6 rounded-full border border-[var(--violet)] bg-black shadow-[0_0_20px_rgba(168,85,247,0.65)] md:block">
                    <span className="absolute inset-1.5 rounded-full bg-[var(--violet)]" />
                  </span>

                  <div>
                    <p className="font-mono text-xs tracking-widest text-[var(--mist-soft)] uppercase">
                      {job.period}
                    </p>
                    <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl tracking-tight text-white sm:text-3xl">
                      {job.role}
                    </h3>
                    <p className="mt-2 text-[var(--mist-soft)]">
                      <span className="text-[var(--magenta)]">{job.company}</span>
                      <span className="mx-2 text-white/20">/</span>
                      {job.location}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {job.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--cyan)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ul className="space-y-4 text-[15px] leading-relaxed text-[var(--mist-soft)] sm:text-base">
                    {job.highlights.map((item) => (
                      <li key={item} className="relative pl-5">
                        <span className="absolute top-[0.65em] left-0 size-1.5 rounded-full bg-[var(--violet)] shadow-[0_0_10px_var(--violet)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
