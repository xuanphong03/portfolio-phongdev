"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/data/portfolio";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function About() {
  const root = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const mm = gsap.matchMedia();

      // Xuất hiện nhẹ nhàng, dứt khoát
      gsap.from("[data-about-reveal]", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          once: true,
        },
      });

      // Desktop: Parallax nhẹ trên văn bản
      mm.add("(min-width: 900px) and (pointer: fine)", () => {
        gsap.to(".about__copy", {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Bộ đếm số: Tối ưu với 1 Trigger duy nhất, chỉ update DOM khi giá trị đổi
      const statNodes = gsap.utils.toArray<HTMLElement>("[data-stat]");
      const items = statNodes.map((statNode) => {
        const valNode = statNode.querySelector<HTMLElement>(".stat__value");
        if (!valNode) return null;
        const raw = valNode.dataset.target || valNode.textContent || "";
        const match = raw.match(/\d+/);
        return {
          node: valNode,
          target: match ? parseInt(match[0], 10) : 0,
          hasPlus: raw.includes("+"),
          hasPad: raw.startsWith("0"),
          lastVal: -1,
        };
      }).filter(Boolean);

      const counterObj = { progress: 0 };

      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(counterObj, {
            progress: 1,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              items.forEach((item) => {
                if (!item) return;
                const current = Math.round(item.target * counterObj.progress);
                if (current !== item.lastVal) {
                  item.lastVal = current;
                  const str = item.hasPad ? String(current).padStart(2, "0") : String(current);
                  item.node.textContent = item.hasPlus ? `${str}+` : str;
                }
              });
            },
          });
        },
      });

      gsap.from("[data-stat]", {
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
          once: true,
        },
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

      <div ref={statsRef} className="about__stats" data-stats>
        {portfolio.about.stats.map((stat) => (
          <div className="stat" key={stat.label} data-stat>
            <span className="stat__value" data-target={stat.value}>{stat.value}</span>
            <span className="stat__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
