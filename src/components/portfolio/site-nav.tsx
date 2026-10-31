"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/data/content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,border,backdrop-filter,box-shadow] duration-300",
        scrolled || open
          ? "border-b border-white/10 bg-black/70 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.25rem] sm:px-8">
        <a
          href="#top"
          className="font-[family-name:var(--font-display)] text-lg tracking-tight text-white sm:text-xl"
        >
          {profile.firstName}
          <span className="text-[var(--violet)]">.</span>
          {profile.lastName}
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-white/60 uppercase transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <Button
            asChild
            className="h-10 rounded-full bg-white px-4 text-black hover:bg-white/90"
          >
            <a href={`mailto:${profile.email}`}>Email me</a>
          </Button>
        </nav>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md border border-white/15 text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-white/10 bg-black/95 md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-3 text-base text-white"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="mt-2 rounded-full bg-[var(--violet)] px-3 py-3 text-center text-white"
            onClick={() => setOpen(false)}
          >
            Email me
          </a>
        </nav>
      </div>
    </header>
  );
}
