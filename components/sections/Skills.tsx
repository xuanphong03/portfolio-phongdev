"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/data/portfolio";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Skills() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from("[data-skill-group]", {
        y: 55,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-skill-list]", start: "top 78%", once: true },
      });
    },
    { scope: root },
  );

  const marqueeItems = [...portfolio.skills.marquee, ...portfolio.skills.marquee];

  return (
    <section ref={root} id="skills" className="skills" aria-labelledby="skills-title">
      <div className="marquee" aria-label={portfolio.skills.marquee.join(", ")}>
        <div className="marquee__track" aria-hidden="true">
          {marqueeItems.map((item, index) => (
            <span key={`${item}-${index}`}>{item}<i>✦</i></span>
          ))}
        </div>
      </div>

      <div className="section-shell section-pad skills__inner">
        <div className="section-index section-index--light">
          <span>02</span>
          <span>Capabilities</span>
        </div>
        <div className="skills__heading">
          <p className="eyebrow">Selected stack / always evolving</p>
          <h2 id="skills-title" className="display-heading">Tools are temporary.<br /><em>Craft is permanent.</em></h2>
        </div>
        <div className="skills__groups" data-skill-list>
          {portfolio.skills.groups.map((group) => (
            <article className="skill-group" key={group.title} data-skill-group>
              <div className="skill-group__head"><span>{group.number}</span><h3>{group.title}</h3></div>
              <p>{group.description}</p>
              <ul>
                {group.items.map((item) => <li key={item}>{item}<span>↗</span></li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
