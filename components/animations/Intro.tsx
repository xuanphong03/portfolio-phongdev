"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Intro() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(root.current, { display: "none" });
        return;
      }

      const counter = { value: 0 };
      const counterNode = root.current?.querySelector<HTMLElement>("[data-intro-counter]");
      const timeline = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      document.body.dataset.loading = "true";

      timeline
        .to(counter, {
          value: 100,
          duration: 0.9,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterNode) counterNode.textContent = String(Math.round(counter.value)).padStart(3, "0");
          },
        })
        .to("[data-intro-line]", { scaleX: 1, duration: 0.9 }, 0)
        .to("[data-intro-word]", { yPercent: -120, duration: 0.55, stagger: 0.04 }, ">-0.08")
        .to(root.current, {
          yPercent: -100,
          duration: 0.85,
          ease: "power3.inOut",
          onComplete: () => {
            document.body.dataset.loading = "false";
            gsap.set(root.current, { display: "none" });
            ScrollTrigger.refresh();
          },
        }, "<0.08");
    },
    { scope: root },
  );

  return (
    <div ref={root} className="intro" aria-hidden="true">
      <div className="intro__mark">
        <span className="intro__clip"><span data-intro-word>PHONG®</span></span>
        <span className="intro__clip intro__descriptor"><span data-intro-word>Creative Developer</span></span>
      </div>
      <div className="intro__progress">
        <span data-intro-counter>000</span>
        <div className="intro__track"><span data-intro-line /></div>
        <span>100</span>
      </div>
    </div>
  );
}
