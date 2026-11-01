import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#path", label: "Path" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

type Props = {
  dark: boolean;
  onToggleTheme: () => void;
};

export default function SiteNav({ dark, onToggleTheme }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`site-nav${scrolled ? " is-scrolled" : ""}`}>
        <div className="wrap">
          <a className="nav-brand" href="#top">
            Aryan Sahni
          </a>
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <button
              className="theme-toggle"
              type="button"
              aria-label="Toggle theme"
              onClick={onToggleTheme}
            >
              {dark ? "LT" : "DK"}
            </button>
            <a className="btn btn-primary nav-cta" href="mailto:aryan93sahni@gmail.com">
              Email
            </a>
            <button
              className="nav-burger"
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <nav className={`mobile-drawer${open ? " open" : ""}`} aria-label="Mobile">
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="mailto:aryan93sahni@gmail.com" onClick={() => setOpen(false)}>
          Email me
        </a>
      </nav>
    </>
  );
}
