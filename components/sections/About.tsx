"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/data/portfolio";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from("[data-about-reveal]", {
        y: 42,
        opacity: 0,
        duration: 0.9,
        stagger: 0.11,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
      });
      gsap.from("[data-stat]", {
        yPercent: 45,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-stats]", start: "top 82%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about" className="about section-shell section-pad" aria-labelledby="about-title">
      <div className="section-index" data-about-reveal>
        <span>01</span>
        <span>About</span>
      </div>

      <div className="about__layout">
        <p className="eyebrow about__eyebrow" data-about-reveal>{portfolio.about.eyebrow}</p>
        <div className="about__content">
          <h2 id="about-title" className="display-heading" data-about-reveal>{portfolio.about.title}</h2>
          <div className="about__copy">
            {portfolio.about.paragraphs.map((paragraph) => <p key={paragraph} data-about-reveal>{paragraph}</p>)}
          </div>
        </div>
      </div>

      <div className="about__stats" data-stats>
        {portfolio.about.stats.map((stat) => (
          <div className="stat" key={stat.label} data-stat>
            <span className="stat__value">{stat.value}</span>
            <span className="stat__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
