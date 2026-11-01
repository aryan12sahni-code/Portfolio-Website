import { useEffect, useState } from "react";
import { config } from "../config";
import SiteNav from "./SiteNav";
import { useLenis } from "./useLenis";
import { useSiteMotion } from "./useSiteMotion";
import "./site.css";

const aboutParagraphs = config.about.description.split("\n\n").filter(Boolean);

const stats = [
  { value: "+15%", label: "Feature usage lift at DotPe" },
  { value: "40%", label: "Manual work cut via RPA" },
  { value: "8h", label: "Reporting saved weekly" },
];

export default function HomePage() {
  const [booting, setBooting] = useState(true);
  const [ready, setReady] = useState(false);
  const [dark, setDark] = useState(false);

  useLenis(!booting);
  useSiteMotion(ready);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setBooting(false);
      setReady(true);
    }, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("theme-dark", dark);
    return () => document.body.classList.remove("theme-dark");
  }, [dark]);

  return (
    <div className="site-shell" id="top">
      <div className={`boot${booting ? "" : " hide"}`} aria-hidden={!booting}>
        <div>
          <div className="boot-mark">Aryan Sahni</div>
          <div className="boot-bar">
            <i />
          </div>
        </div>
      </div>

      <div className="site-grain" aria-hidden />
      <div className="site-content">
        <SiteNav dark={dark} onToggleTheme={() => setDark((v) => !v)} />

        <section className="hero" aria-label="Hero">
          <div className="hero-stage" aria-hidden>
            <img
              className="hero-photo"
              src="/images/aryan-portrait.png"
              alt=""
              loading="eager"
              decoding="async"
            />
            <div className="hero-veil" />
            <div className="hero-grid" />
            <div className="hero-orb" />
          </div>
          <div className="hero-inner">
            <p className="eyebrow" style={{ color: "#3dd6bf" }}>
              Industrial AI · Nürnberg
            </p>
            <h1 className="hero-brand">
              ARYAN
              <span>SAHNI</span>
            </h1>
            <p className="hero-lead">
              Product operations and analytics, moving into industrial AI —
              turning messy product data into decisions teams actually ship.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#work">
                See selected work
              </a>
              <a className="btn btn-ghost" href="#contact">
                Get in touch
              </a>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="wrap about-grid">
            <div data-reveal>
              <p className="eyebrow">About</p>
              <h2 className="section-title">Data that moves products.</h2>
              <div className="about-stat-row">
                {stats.map((stat) => (
                  <div className="about-stat" key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-body" data-reveal>
              {aboutParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="experience" id="experience">
          <div className="wrap">
            <div className="experience-head" data-reveal>
              <p className="eyebrow">Experience</p>
              <h2 className="section-title">Where the work lives.</h2>
              <p className="section-copy">
                Product operations systems and RPA automation — the two tracks that
                shape how I build for industrial AI.
              </p>
            </div>
            <div className="xp-rail">
              <article className="xp-item">
                <p className="xp-kicker">{config.skills.develop.title}</p>
                <h3>{config.skills.develop.description}</h3>
                <p>{config.skills.develop.details}</p>
                <div className="xp-tags">
                  {config.skills.develop.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </article>
              <article className="xp-item">
                <p className="xp-kicker">{config.skills.design.title}</p>
                <h3>{config.skills.design.description}</h3>
                <p>{config.skills.design.details}</p>
                <div className="xp-tags">
                  {config.skills.design.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="path" id="path">
          <div className="wrap">
            <div data-reveal>
              <p className="eyebrow">Path</p>
              <h2 className="section-title">Bachelor → RPA → Product → AI.</h2>
              <p className="section-copy">
                A clear sequence from foundations to industrial applications —
                not a shuffled timeline.
              </p>
            </div>
            <ol className="path-list">
              {config.experiences.map((item) => (
                <li className="path-item" key={`${item.company}-${item.period}`}>
                  <p className="path-period">{item.period}</p>
                  <h3>{item.position}</h3>
                  <h4>
                    {item.company} · {item.location}
                  </h4>
                  <p>{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="works" id="work">
          <div className="wrap">
            <div className="works-head" data-reveal>
              <p className="eyebrow">Built in public</p>
              <h2 className="section-title">Selected systems.</h2>
              <p className="section-copy">
                Full-stack tools, time-series analysis, product dashboards, and
                assistive vision — shipped to solve real friction.
              </p>
            </div>
            <div className="work-stack">
              {config.projects.map((project, index) => (
                <article className="work-card" key={project.id}>
                  <div className="work-index">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3>{project.title}</h3>
                    <p className="work-cat">{project.category}</p>
                    <p>{project.description}</p>
                    <p className="work-tech">{project.technologies}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="skills" id="skills">
          <div className="wrap">
            <div data-reveal>
              <p className="eyebrow">Skills</p>
              <h2 className="section-title">Toolkit for decisions.</h2>
            </div>
            <div className="skill-grid">
              <article className="skill-panel">
                <h3>{config.skills.develop.title}</h3>
                <p>{config.skills.develop.description}</p>
                <div className="skill-cloud">
                  {config.skills.develop.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </article>
              <article className="skill-panel">
                <h3>{config.skills.design.title}</h3>
                <p>{config.skills.design.description}</p>
                <div className="skill-cloud">
                  {config.skills.design.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="wrap">
            <div className="contact-panel" data-reveal>
              <p className="eyebrow">Contact</p>
              <h2>Let’s build the next operating system for your product data.</h2>
              <p>
                Based in {config.social.location}. Open to industrial AI,
                product analytics, and automation collaborations.
              </p>
              <div className="contact-actions">
                <a className="btn btn-primary" href={`mailto:${config.contact.email}`}>
                  {config.contact.email}
                </a>
                <a className="btn btn-ghost" href={`tel:${config.contact.phone.replace(/\s+/g, "")}`}>
                  {config.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div className="wrap">
            <span>© {new Date().getFullYear()} Aryan Sahni</span>
            <span>{config.social.location}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
