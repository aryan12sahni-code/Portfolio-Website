"use client";

import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/content";
import { Reveal } from "./reveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-[var(--ink)]/8 bg-[var(--ink)] py-20 text-[var(--mist)] sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-[var(--signal)] uppercase">
            06 — Contact
          </p>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-5xl md:text-6xl">
            Let’s talk product signals, dashboards, or industrial AI.
          </h2>
          <p className="mt-5 max-w-xl text-base text-white/60 sm:text-lg">
            Open to internships, collaborations, and roles where analytics and
            ML meet real operations.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-md bg-[var(--signal)] px-5 text-base text-white hover:bg-[var(--signal)]/90"
            >
              <a href={`mailto:${profile.email}`}>
                <Mail data-icon="inline-start" />
                {profile.email}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-md border-white/20 bg-transparent px-5 text-base text-white hover:bg-white/10"
            >
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
                <Phone data-icon="inline-start" />
                {profile.phone}
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
