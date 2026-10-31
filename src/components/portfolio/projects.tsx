"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { projects } from "@/data/content";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Projects() {
  const [openId, setOpenId] = useState(projects[0].number);

  return (
    <section id="projects" className="scroll-mt-24 border-t border-[var(--ink)]/8 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-[var(--signal)] uppercase">
            03 — Projects
          </p>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--ink)] sm:text-5xl">
            Selected builds.
          </h2>
          <p className="mt-4 max-w-xl text-[var(--ink-soft)]">
            Numbered like a lab log — expand each entry for outcomes and stack.
          </p>
        </Reveal>

        <div className="mt-12 divide-y divide-[var(--ink)]/12 border-y border-[var(--ink)]/12">
          {projects.map((project, index) => {
            const isOpen = openId === project.number;
            return (
              <Reveal key={project.number} delay={index * 0.05}>
                <article>
                  <button
                    type="button"
                    className="group flex w-full items-start gap-4 py-7 text-left sm:gap-8 sm:py-9"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenId(isOpen ? "" : project.number)
                    }
                  >
                    <span className="font-mono text-sm tracking-widest text-[var(--signal)] sm:text-base">
                      {project.number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-[var(--ink)] transition-colors group-hover:text-[var(--signal)] sm:text-3xl">
                          {project.name}
                        </h3>
                        <ChevronDown
                          className={cn(
                            "mt-1 size-5 shrink-0 text-[var(--ink-soft)] transition-transform",
                            isOpen && "rotate-180"
                          )}
                        />
                      </div>
                      <p className="mt-3 max-w-2xl text-[var(--ink-soft)]">
                        {project.summary}
                      </p>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-6 pb-9 pl-10 sm:grid-cols-[1.1fr_0.9fr] sm:pl-16">
                          <ul className="space-y-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-[15px]">
                            {project.outcomes.map((outcome) => (
                              <li key={outcome} className="border-l-2 border-[var(--signal)] pl-4">
                                {outcome}
                              </li>
                            ))}
                          </ul>
                          <div>
                            <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--ink)]/45 uppercase">
                              Stack
                            </p>
                            <p className="mt-3 text-sm leading-7 text-[var(--ink)]">
                              {project.stack.join(" · ")}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
