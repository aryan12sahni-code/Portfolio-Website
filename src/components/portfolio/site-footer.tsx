import { profile } from "@/data/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[var(--ink)] px-5 py-8 text-sm text-white/45 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © 2026 {profile.name}
        </p>
        <p className="font-mono text-xs tracking-wider uppercase">
          Nürnberg · AI for industry · product ops
        </p>
      </div>
    </footer>
  );
}
