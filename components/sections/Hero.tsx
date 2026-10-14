"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { MagneticLink } from "@/components/ui/MagneticLink";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const timeline = gsap.timeline({ delay: 1.55, defaults: { ease: "power4.out" } });
      timeline
        .from("[data-hero-line] > span", { yPercent: 112, duration: 1.15, stagger: 0.1 })
        .from("[data-hero-meta]", { y: 26, opacity: 0, duration: 0.75, stagger: 0.08 }, "<0.35")
        .from("[data-hero-orbit]", { scale: 0.72, opacity: 0, duration: 1.1 }, "<")
        .from("[data-scroll-cue]", { opacity: 0, y: 12, duration: 0.5 }, "<0.4");

      gsap.to("[data-hero-orbit]", {
        rotate: 360,
        duration: 40,
        ease: "none",
        repeat: -1,
      });

      gsap.to("[data-hero-glow]", {
        xPercent: 10,
        yPercent: -12,
        duration: 6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="hero section-shell" aria-labelledby="hero-title">
      <div className="hero__glow" data-hero-glow aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__topline" data-hero-meta>
        <span className="eyebrow"><i /> {portfolio.hero.eyebrow}</span>
        <span className="hero__coordinates">10.8231° N / 106.6297° E</span>
      </div>

      <div className="hero__title-wrap">
        <h1 id="hero-title" className="hero__title">
          {portfolio.hero.title.map((line, index) => (
            <span key={line} className={`hero__line hero__line--${index + 1}`} data-hero-line>
              <span>{line}</span>
            </span>
          ))}
        </h1>
        <div className="hero__orbit" data-hero-orbit aria-hidden="true">
          <svg viewBox="0 0 140 140">
            <defs>
              <path id="orbit-path" d="M70,70 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" />
            </defs>
            <text>
              <textPath href="#orbit-path">FRONTEND • DESIGN • MOTION • CODE • </textPath>
            </text>
          </svg>
          <span>↗</span>
        </div>
      </div>

      <div className="hero__bottom">
        <div className="hero__availability" data-hero-meta>
          <span className="availability-dot" />
          <span>{portfolio.person.availability}</span>
        </div>
        <div className="hero__intro" data-hero-meta>
          <p>{portfolio.hero.description}</p>
          <div className="hero__actions">
            <MagneticLink href="#projects" variant="primary" icon="down">View projects</MagneticLink>
            <MagneticLink href={`mailto:${portfolio.person.email}`} variant="outline" icon="up">Contact me</MagneticLink>
          </div>
        </div>
      </div>

      <a href="#about" className="hero__scroll-cue" data-scroll-cue aria-label="Cuộn đến phần giới thiệu">
        <span>Scroll to discover</span>
        <ArrowDown aria-hidden="true" size={18} />
      </a>
    </section>
  );
}
