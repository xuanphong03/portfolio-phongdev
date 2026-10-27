"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/data/portfolio";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Skills() {
  const root = useRef<HTMLElement>(null);
  const marqueeContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const mm = gsap.matchMedia();

      // Desktop: Phản hồi độ nghiêng theo quán tính cuộn (không can thiệp vào track GPU)
      mm.add("(min-width: 900px) and (pointer: fine)", () => {
        if (marqueeContainerRef.current) {
          ScrollTrigger.create({
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              const velocity = self.getVelocity();
              const skew = gsap.utils.clamp(-5, 5, velocity / 350);
              gsap.to(marqueeContainerRef.current, {
                skewX: skew,
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto",
              });
            },
          });
        }

        // Parallax nhẹ giữa các cột trên Desktop
        const groups = gsap.utils.toArray<HTMLElement>("[data-skill-group]");
        groups.forEach((group, index) => {
          const offset = (index - 1) * 18;
          gsap.to(group, {
            y: offset,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-skill-list]",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        });
      });

      // Chung cho cả Desktop & Mobile: Xuất hiện mượt mà 1 lần khi cuộn tới
      gsap.from("[data-skill-group]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-skill-list]",
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: root },
  );

  const marqueeItems = [...portfolio.skills.marquee, ...portfolio.skills.marquee];

  return (
    <section ref={root} id="skills" className="skills" aria-labelledby="skills-title">
      <div
        ref={marqueeContainerRef}
        className="marquee"
        aria-label={portfolio.skills.marquee.join(", ")}
        style={{ willChange: "transform", transformOrigin: "center" }}
      >
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
