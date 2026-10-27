"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/data/portfolio";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      // Đường timeline dọc kéo dài mượt mà theo bước cuộn
      gsap.fromTo(
        "[data-timeline-line]",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: "[data-timeline]",
            start: "top 78%",
            end: "bottom 70%",
            scrub: 0.5,
          },
        },
      );

      // Các mục xuất hiện tuần tự mượt mà khi người dùng cuộn tới
      gsap.from("[data-experience-item]", {
        y: 30,
        opacity: 0,
        duration: 0.75,
        stagger: 0.14,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-timeline]",
          start: "top 76%",
          once: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="experience" className="experience section-shell section-pad" aria-labelledby="experience-title">
      <div className="section-index"><span>04</span><span>Experience</span></div>
      <div className="experience__layout">
        <div className="experience__heading">
          <p className="eyebrow">A short history of making</p>
          <h2 id="experience-title" className="display-heading">Where I&apos;ve<br /><em>made an impact.</em></h2>
        </div>
        <div className="timeline" data-timeline>
          <span className="timeline__line" data-timeline-line />
          {portfolio.experience.map((item) => (
            <article className="timeline__item" key={item.period} data-experience-item>
              <span className={`timeline__dot ${item.current ? "timeline__dot--current" : ""}`} />
              <p className="timeline__period">{item.period}</p>
              <div>
                <h3>{item.role}</h3>
                <p className="timeline__company">{item.company}</p>
              </div>
              <p className="timeline__description">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
