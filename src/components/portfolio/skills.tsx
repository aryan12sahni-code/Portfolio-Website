"use client";

import { skillGroups } from "@/data/content";
import { Reveal } from "./reveal";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-t border-[var(--ink)]/8 bg-[var(--paper)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-[var(--signal)] uppercase">
            04 — Skills
          </p>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--ink)] sm:text-5xl">
            Tools that keep signals clean.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:gap-x-16 lg:gap-y-12">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.05}>
              <div>
                <h3 className="border-b border-[var(--ink)]/15 pb-3 font-mono text-xs tracking-[0.22em] text-[var(--teal)] uppercase">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 text-[var(--ink)]"
                    >
                      <span className="font-mono text-[10px] text-[var(--signal)]">
                        ▸
                      </span>
                      <span className="text-base sm:text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
