"use client";

export function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  const row = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden>
      <div className="marquee-track gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-[family-name:var(--font-display)] text-4xl tracking-tight text-white/15 sm:text-6xl md:text-7xl"
          >
            {item}
            <span className="mx-6 text-[var(--violet)]">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
