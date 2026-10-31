"use client";

import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/content";
import { Magnetic } from "./magnetic";
import { Reveal } from "./reveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/8 py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.25),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.18),transparent_40%)]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-[var(--violet)] uppercase">
            06 — Contact
          </p>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-3xl tracking-tight text-white sm:text-5xl md:text-6xl">
            Let’s talk product signals, dashboards, or{" "}
            <span className="text-gradient">industrial AI.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base text-white/55 sm:text-lg">
            Open to internships, collaborations, and roles where analytics and
            ML meet real operations.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Magnetic className="magnetic-target">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--magenta)] px-5 text-base text-white shadow-[0_0_40px_rgba(168,85,247,0.35)] hover:opacity-95"
              >
                <a href={`mailto:${profile.email}`}>
                  <Mail data-icon="inline-start" />
                  {profile.email}
                </a>
              </Button>
            </Magnetic>
            <Magnetic className="magnetic-target">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-full border-white/20 bg-white/5 px-5 text-base text-white hover:bg-white/10"
              >
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
                  <Phone data-icon="inline-start" />
                  {profile.phone}
                </a>
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
