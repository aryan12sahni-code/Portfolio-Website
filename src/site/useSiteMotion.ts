import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useSiteMotion(ready: boolean) {
  useEffect(() => {
    if (!ready) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-brand, .hero-lead, .hero-actions", {
        y: 36,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray<HTMLElement>(".xp-item, .work-card, .path-item, .skill-panel").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
          y: 28,
          opacity: 0,
          duration: 0.75,
          delay: (i % 2) * 0.06,
          ease: "power2.out",
        });
      });

      const photo = document.querySelector(".hero-photo");
      if (photo) {
        gsap.to(photo, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, [ready]);
}
