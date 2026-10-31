"use client";

import { skillGroups } from "@/data/content";
import { Marquee } from "./marquee";
import { Reveal } from "./reveal";
import { TiltCard } from "./tilt-card";

export function Skills() {
  const allSkills = skillGroups.flatMap((g) => g.items);

  return (
    <section
      id="skills"
      className="scroll-mt-24 border-t border-white/8 bg-black/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-[var(--violet)] uppercase">
            04 — Skills
          </p>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-3xl tracking-tight text-white sm:text-5xl">
            Tools that keep{" "}
            <span className="text-gradient">signals clean.</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-12 border-y border-white/8 py-6">
        <Marquee items={allSkills.slice(0, 12)} />
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-10 px-5 sm:grid-cols-2 sm:px-8 lg:gap-x-16 lg:gap-y-12">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 0.05}>
            <TiltCard className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-[var(--violet)]/40 hover:bg-white/[0.05]">
              <h3 className="border-b border-white/10 pb-3 font-mono text-xs tracking-[0.22em] text-[var(--cyan)] uppercase">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 text-white"
                  >
                    <span className="font-mono text-[10px] text-[var(--violet)]">
                      ▸
                    </span>
                    <span className="text-base sm:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
