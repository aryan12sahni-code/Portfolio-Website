"use client";

import { experience } from "@/data/content";
import { Reveal } from "./reveal";

export function Experience() {
  return (
    <section id="work" className="scroll-mt-24 border-t border-[var(--ink)]/8 bg-[var(--paper)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-[var(--signal)] uppercase">
            02 — Experience
          </p>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--ink)] sm:text-5xl">
            Where the numbers moved.
          </h2>
        </Reveal>

        <ol className="mt-14 space-y-0">
          {experience.map((job, index) => (
            <Reveal key={`${job.company}-${job.role}`} delay={index * 0.06}>
              <li className="grid gap-6 border-t border-[var(--ink)]/12 py-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-10">
                <div>
                  <p className="font-mono text-xs tracking-widest text-[var(--ink-soft)] uppercase">
                    {job.period}
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl tracking-tight text-[var(--ink)] sm:text-3xl">
                    {job.role}
                  </h3>
                  <p className="mt-2 text-[var(--ink-soft)]">
                    {job.company}
                    <span className="mx-2 text-[var(--ink)]/25">/</span>
                    {job.location}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border-b border-[var(--teal)]/40 pb-0.5 text-sm text-[var(--teal)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <ul className="space-y-4 text-[15px] leading-relaxed text-[var(--ink-soft)] sm:text-base">
                  {job.highlights.map((item) => (
                    <li key={item} className="relative pl-5">
                      <span className="absolute top-[0.65em] left-0 size-1.5 rounded-full bg-[var(--signal)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
